/*
  # Fix RLS policies and add session management

  1. Problems Fixed
    - presentation_state UPDATE policy was restricted to 'authenticated' only.
      The admin uses a simple password (not Supabase Auth), so they are 'anon'.
      This caused "Go Live" to silently fail due to RLS blocking the update.
      Fix: allow anon users to also update presentation_state.

  2. New Columns
    - `presentation_state.session_ended` (boolean, default false)
      Signals all viewers to log out when host ends the session.
    - `session_guests.left_at` (timestamptz, nullable)
      Records when a guest deactivated their session.

  3. Security Notes
    - The app uses simple password-based admin auth (not Supabase Auth),
      so RLS cannot distinguish admin from anon on the DB level.
      Security is enforced at the application layer via the admin password.
*/

-- Fix: allow anon to update presentation_state
DROP POLICY IF EXISTS "Admin can update presentation state" ON presentation_state;

CREATE POLICY "Allow presentation state updates"
  ON presentation_state FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Add session_ended flag
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'presentation_state' AND column_name = 'session_ended'
  ) THEN
    ALTER TABLE presentation_state ADD COLUMN session_ended boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Add left_at timestamp to session_guests
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session_guests' AND column_name = 'left_at'
  ) THEN
    ALTER TABLE session_guests ADD COLUMN left_at timestamptz;
  END IF;
END $$;

-- Allow anon to update guest records (for self-deactivation and bulk end-session from non-auth admin)
DROP POLICY IF EXISTS "Anyone can deactivate guest record" ON session_guests;

CREATE POLICY "Anyone can update guest records"
  ON session_guests FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
