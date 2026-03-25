// Type definitions for the presentation system

export type TransitionType = 'mindflow' | 'flip' | 'cube' | 'rise' | 'fade-scale';

export type SlideType =
  | 'title'
  | 'statement'
  | 'timezone'
  | 'infocard'
  | 'warning'
  | 'schedule'
  | 'metrics'
  | 'closing';

export interface SlideDefinition {
  id: number;
  type: SlideType;
  transition: TransitionType;
  data: Record<string, unknown>;
}

export interface PresentationState {
  id: string;
  current_slide_index: number;
  total_slides: number;
  is_live: boolean;
  transition_direction: 'forward' | 'backward';
  updated_at: string;
}

export interface SessionGuest {
  id: string;
  display_name: string;
  is_active: boolean;
  joined_at: string;
}

export type EventType =
  | 'checkin'
  | 'hint'
  | 'activity'
  | 'pickup'
  | 'dinner'
  | 'free_day'
  | 'mastermind'
  | 'checkout'
  | 'opening';

export interface ScheduleEvent {
  type: EventType;
  name: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationUrl?: string;
  isPickupCritical?: boolean;
  benefits?: string[];
  timeSlot?: string;
  category?: string;
  guideIncluded?: boolean;
}

export interface TripDayData {
  date: string;
  dayNumber: number;
  month: string;
  dayOfWeek: string;
  dayOfWeekFull: string;
  events: ScheduleEvent[];
}

export interface StatementSlideData {
  heading: string;
  subheading?: string;
  body: string[];
  accent?: string;
  icon?: string;
}

export interface InfoCardItem {
  icon: string;
  title: string;
  description: string;
  accent?: string;
}

export interface InfoCardSlideData {
  heading: string;
  subheading?: string;
  items: InfoCardItem[];
}
