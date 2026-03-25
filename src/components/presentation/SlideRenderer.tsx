// Routes slide index to the correct slide component with React.memo optimization
import { memo } from 'react';
import { SLIDES } from '../../data/slides';
import { TRIP_DAYS } from '../../data/schedule';
import { TitleSlide } from '../slides/TitleSlide';
import { StatementSlide } from '../slides/StatementSlide';
import { TimeZoneSlide } from '../slides/TimeZoneSlide';
import { InfoCardSlide } from '../slides/InfoCardSlide';
import { WarningSlide } from '../slides/WarningSlide';
import { ScheduleDaySlide } from '../slides/ScheduleDaySlide';
import { ClosingSlide } from '../slides/ClosingSlide';
import { MetricsSlide } from '../slides/MetricsSlide';
import type { MetricsSlideData } from '../slides/MetricsSlide';
import type { StatementSlideData, InfoCardSlideData } from '../../types';

interface Props {
  slideIndex: number;
}

export const SlideRenderer = memo(function SlideRenderer({ slideIndex }: Props) {
  const slide = SLIDES[slideIndex];
  if (!slide) return null;

  switch (slide.type) {
    case 'title':
      return (
        <TitleSlide
          title={slide.data.title as string}
          subtitle={slide.data.subtitle as string}
          location={slide.data.location as string}
          dateRange={slide.data.dateRange as string}
        />
      );

    case 'statement':
      return <StatementSlide data={slide.data as unknown as StatementSlideData} />;

    case 'timezone':
      return (
        <TimeZoneSlide
          phuketTime={slide.data.phuketTime as string}
          germanyTime={slide.data.germanyTime as string}
          keyPoints={slide.data.keyPoints as string[]}
          subtitle={slide.data.subtitle as string | undefined}
        />
      );

    case 'infocard':
      return <InfoCardSlide data={slide.data as unknown as InfoCardSlideData} />;

    case 'warning':
      return (
        <WarningSlide
          heading={slide.data.heading as string}
          body={slide.data.body as string[]}
        />
      );

    case 'schedule': {
      const dayIndex = slide.data.dayIndex as number;
      const day = TRIP_DAYS[dayIndex];
      if (!day) return null;
      return <ScheduleDaySlide day={day} dayIndex={dayIndex} totalDays={TRIP_DAYS.length} />;
    }

    case 'metrics':
      return <MetricsSlide data={slide.data as unknown as MetricsSlideData} />;

    case 'closing':
      return (
        <ClosingSlide
          title={slide.data.title as string}
          subtitle={slide.data.subtitle as string}
        />
      );

    default:
      return null;
  }
});
