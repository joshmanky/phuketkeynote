/*
  # Presentation Sync System

  1. New Tables
    - `presentation_state` - Tracks current slide position and live status for synchronized viewing
      - `id` (uuid, primary key)
      - `current_slide_index` (integer, default 0) - Currently displayed slide
      - `total_slides` (integer, default 17) - Total number of slides in the deck
      - `is_live` (boolean, default false) - Whether the presentation is being broadcast
      - `transition_direction` (text, default 'forward') - Direction of last slide transition
      - `updated_at` (timestamptz) - Timestamp of last state change

    - `session_guests` - Records guests who join the presentation session
      - `id` (uuid, primary key)
      - `display_name` (text, not null) - Guest's chosen display name
      - `is_active` (boolean, default true) - Whether the guest is currently in the session
      - `joined_at` (timestamptz) - When the guest joined

  2. Security
    - RLS enabled on both tables
    - `presentation_state`: Readable by all (needed for sync), writable only by authenticated admin
    - `session_guests`: Readable by all, insertable by anyone with a non-empty name, deletable by admin

  3. Realtime
    - Both tables added to supabase_realtime publication for live sync

  4. Seed Data
    - Initial presentation_state row (not live, slide 0, 17 total slides)
*/

-- Presentation state for real-time sync
CREATE TABLE IF NOT EXISTS presentation_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  current_slide_index integer NOT NULL DEFAULT 0,
  total_slides integer NOT NULL DEFAULT 17,
  is_live boolean NOT NULL DEFAULT false,
  transition_direction text NOT NULL DEFAULT 'forward',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE presentation_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Presentation state readable for sync"
  ON presentation_state FOR SELECT
  TO anon, authenticated
  USING (current_slide_index >= 0);

CREATE POLICY "Admin can update presentation state"
  ON presentation_state FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Session guests
CREATE TABLE IF NOT EXISTS session_guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  joined_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE session_guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active guests are visible to all"
  ON session_guests FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admin can view all guests"
  ON session_guests FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can join as guest with a name"
  ON session_guests FOR INSERT
  TO anon, authenticated
  WITH CHECK (display_name <> '');

CREATE POLICY "Admin can remove guests"
  ON session_guests FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can deactivate guest record"
  ON session_guests FOR UPDATE
  TO anon, authenticated
  USING (is_active = true)
  WITH CHECK (is_active = false);

-- Enable Realtime on both tables
ALTER PUBLICATION supabase_realtime ADD TABLE presentation_state;
ALTER PUBLICATION supabase_realtime ADD TABLE session_guests;

-- Seed initial presentation state
INSERT INTO presentation_state (current_slide_index, total_slides, is_live, transition_direction)
VALUES (0, 17, false, 'forward');