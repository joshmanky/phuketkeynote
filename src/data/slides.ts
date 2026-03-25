// Slide definitions for the Phuket 2026 presentation
import type { SlideDefinition } from '../types';

export const SLIDES: SlideDefinition[] = [
  {
    id: 0,
    type: 'title',
    transition: 'mindflow',
    data: {
      title: 'Leader Trip 2026',
      subtitle: 'PLATINUM STAR & ABOVE',
      location: 'Phuket, Thailand',
      dateRange: '25. Marz \u2013 1. April 2026',
    },
  },
  {
    id: 1,
    type: 'statement',
    transition: 'mindflow',
    data: {
      heading: 'Warum Phuket?',
      body: [
        'Phuket ist nicht Dubai. Phuket ist nicht irgendein Ort, an den man fliegt, um etwas zu sehen.',
        'Phuket ist eine Insel, auf die man kommt, um etwas zu bekommen.',
        'Was genau du dort bekommen willst, kannst du dir selbst aussuchen.',
      ],
      accent: 'teal',
      icon: 'compass',
    },
  },
  {
    id: 2,
    type: 'timezone',
    transition: 'cube',
    data: {
      phuketTime: '18:00',
      germanyTime: '12:00',
      subtitle: 'Zeit fuer dich. Keine Ablenkungen. Kein Rauschen \u2013 nutze die Zeitverschiebung, um persoenlich zu wachsen.',
      keyPoints: [
        'Morgenroutine bis 18:00 Uhr Ortszeit durchstrecken',
        'Danach \u2013 Arbeit leisten, um voranzukommen',
        'Theoretisch bis 6 Uhr morgens wach bleiben',
        'Das gilt aber nur, wenn man nicht die Arbeit macht und nicht wirklich in die Vorbereitung reingeht.',
        'Tage voll und effizient packen, aber flexibel aufbauen',
      ],
    },
  },
  {
    id: 3,
    type: 'statement',
    transition: 'mindflow',
    data: {
      heading: 'Selbststaendigkeit & Leadership',
      body: [
        'Selbststaendiges Denken und selbststaendiges Arbeiten ist sehr wichtig. Offene Zentren solltest du natuerlich geniessen \u2013 aber du bist in einer Rolle, in der die meisten nicht ohne dich arbeiten koennen.',
        'Deswegen solltest du dich nicht zu weit aus dem Fenster lehnen. Versteh diese Freiheit als Chance, das Team aufzubauen und die Zentren gezielt dafuer zu nutzen.',
        'Wir arbeiten nicht, um zu chillen \u2013 sondern damit dieser Lifestyle und die Arbeit angenehmer werden: besseres Equipment, bessere Tools, bessere Locations.',
        'Wie Mac immer sagt: Lieber im Luxus hustlen \u2013 also arbeiten \u2013 als in der Armut zu chillen.',
      ],
      accent: 'red',
      icon: 'shield',
    },
  },
  {
    id: 4,
    type: 'infocard',
    transition: 'rise',
    data: {
      heading: 'Mobilitaet vor Ort',
      subheading: 'Wie ihr euch auf der Insel bewegt',
      items: [
        {
          icon: 'car',
          title: 'Bolt (wie Uber)',
          description: 'Gefahren werden oder selbst fahren. Verfuegbar ueberall auf der Insel.',
          accent: 'teal',
        },
        {
          icon: 'bike',
          title: 'Roller / Scooter',
          description: 'Wer es sich zutraut, soll es machen. Wer sich unsicher ist, sollte es auf gar keinen Fall tun.',
          accent: 'amber',
        },
        {
          icon: 'alert-triangle',
          title: 'Wichtig',
          description: 'Sicherheit geht vor. Entscheide selbst, was fuer dich passt \u2013 aber sei ehrlich zu dir.',
          accent: 'red',
        },
      ],
    },
  },
  {
    id: 5,
    type: 'warning',
    transition: 'fade-scale',
    data: {
      heading: 'Wichtiger Hinweis zu Abholzeiten',
      body: [
        'Wir haben 3\u20134 Aktivitaeten, bei denen ihr abgeholt werdet. Der Rest ist eigenstaendiger Transfer.',
        'Bei Verspaetungen wird nicht gewartet. Ihr muesst in diesem Fall eigenstaendig nachkommen und selbst dafuer sorgen, dass ihr rechtzeitig zur Aktivitaet erscheint.',
        'Die rot markierten Abholzeiten im Zeitplan sind verbindlich \u2013 plant genuegend Puffer ein.',
      ],
    },
  },
  {
    id: 6,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 1 },
  },
  {
    id: 7,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 2 },
  },
  {
    id: 8,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 3 },
  },
  {
    id: 9,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 4 },
  },
  {
    id: 10,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 5 },
  },
  {
    id: 11,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 6 },
  },
  {
    id: 12,
    type: 'schedule',
    transition: 'flip',
    data: { dayIndex: 7 },
  },
  {
    id: 13,
    type: 'infocard',
    transition: 'rise',
    data: {
      heading: 'Unser Kameramann',
      subheading: 'Harman begleitet uns auf dem Trip',
      items: [
        {
          icon: 'video',
          title: 'Vlog & Content',
          description: 'Harman ist unser Kameramann und wird einen professionellen Vlog von der gesamten Reise drehen.',
          accent: 'teal',
        },
        {
          icon: 'camera',
          title: 'Content fuer euch',
          description: 'Damit sind wir in der Lage, den Content wirklich fuer uns zu gestalten \u2013 authentisch und auf den Punkt.',
          accent: 'amber',
        },
        {
          icon: 'heart',
          title: 'Grosses Dankeschoen',
          description: 'Er ist dafuer zustaendig, die Momente einzufangen. Ihr koennt euch entspannt darauf einlassen \u2013 er kuemmert sich um den Rest.',
          accent: 'teal',
        },
      ],
    },
  },
  {
    id: 14,
    type: 'statement',
    transition: 'mindflow',
    data: {
      heading: 'Social Media & Content',
      body: [
        'Wir wollen den Partnern Impulse geben, selbst aktiv zu werden \u2013 Content erstellen, Stories posten, die Reise sichtbar machen.',
        'Es geht darum, die Zeit vor Ort nicht nur zum Entspannen zu nutzen, sondern auch dazu, euren Content gezielt aufzubauen.',
        'Nutzt die Momente, teilt eure Erfahrungen und zeigt, was moeglich ist.',
      ],
      accent: 'teal',
      icon: 'share-2',
    },
  },
  {
    id: 15,
    type: 'metrics',
    transition: 'rise',
    data: {
      heading: 'Convention Tickets',
      subheading: 'Das Incentive als Sprungbrett fuer die Convention',
      metrics: [
        {
          icon: 'ticket',
          label: 'Aktueller Stand',
          value: '181',
          subtitle: 'Tickets verkauft \u2013 VIP ist ausverkauft',
          accent: 'teal',
        },
        {
          icon: 'target',
          label: 'Ziel waehrend des Trips',
          value: '300',
          subtitle: 'Tickets innerhalb des Incentive-Trips erreichen',
          accent: 'amber',
        },
        {
          icon: 'trending-up',
          label: 'Potential Deutschland',
          value: '1.000+',
          subtitle: 'Personen, die wir in Deutschland erreichen koennen',
          accent: 'green',
          highlight: true,
        },
      ],
      body: [
        'Normalerweise gibt es einen Call, dann werden 20% verkauft \u2013 dann passiert 3\u20134 Wochen nichts, und erst kurz vor dem Event steigen die Zahlen.',
        'Wir nutzen das Incentive, um diese Luecke zu schliessen und die Convention von Anfang an stark aufzubauen.',
      ],
    },
  },
  {
    id: 16,
    type: 'closing',
    transition: 'mindflow',
    data: {
      title: 'Enjoy in Phuket',
      subtitle: '25. Marz \u2013 1. April 2026',
    },
  },
];

export const TOTAL_SLIDES = SLIDES.length;

export const TRANSITION_DURATION: Record<string, number> = {
  mindflow: 800,
  flip: 800,
  cube: 900,
  rise: 800,
  'fade-scale': 700,
};
