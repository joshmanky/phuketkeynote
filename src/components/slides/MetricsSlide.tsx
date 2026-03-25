// Metrics slide - Template D: large stat boxes with count-up animation
import { motion } from 'framer-motion';
import { Ticket, Target, TrendingUp } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';
import { useCountUp } from '../../hooks/useCountUp';

const ICON_MAP: Record<string, React.ReactNode> = {
  ticket: <Ticket size={20} />,
  target: <Target size={20} />,
  'trending-up': <TrendingUp size={20} />,
};

export interface MetricItem {
  icon: string;
  label: string;
  value: string;
  subtitle?: string;
  accent?: string;
  highlight?: boolean;
}

export interface MetricsSlideData {
  heading: string;
  subheading?: string;
  metrics: MetricItem[];
  body?: string[];
}

interface Props {
  data: MetricsSlideData;
}

const ACCENT_MAP: Record<string, { icon: string; value: string }> = {
  teal: { icon: 'text-teal-400 bg-teal-500/10 border-teal-500/20', value: 'text-teal-400' },
  amber: { icon: 'text-amber-400 bg-amber-500/10 border-amber-500/20', value: 'text-amber-400' },
  green: { icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', value: 'text-emerald-400' },
};

function parseNumericValue(val: string): number {
  return parseInt(val.replace(/\./g, '').replace(/\+/g, '').trim()) || 0;
}

function formatValue(num: number, original: string): string {
  const hasPlus = original.includes('+');
  const formatted = num >= 1000 ? num.toLocaleString('de-DE') : num.toString();
  return hasPlus ? `${formatted}+` : formatted;
}

function MetricCounter({ value, accent, original }: { value: string; accent: string; original: string }) {
  const target = parseNumericValue(value);
  const current = useCountUp(target, 2000);
  const accentStyle = ACCENT_MAP[accent || 'teal'] || ACCENT_MAP.teal;

  return (
    <span className={`text-3xl md:text-4xl lg:text-5xl font-black tabular-nums ${accentStyle.value}`}>
      {formatValue(current, original)}
    </span>
  );
}

export function MetricsSlide({ data }: Props) {
  return (
    <div className="slide-base">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/[0.05] blur-[100px] top-[30%] left-[50%] -translate-x-1/2" />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-16 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{data.heading}</h2>
          {data.subheading && (
            <p className="text-white/35 text-sm md:text-base">{data.subheading}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {data.metrics.map((metric, i) => {
            const accentStyle = ACCENT_MAP[metric.accent || 'teal'] || ACCENT_MAP.teal;
            const icon = ICON_MAP[metric.icon];

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`bg-white/[0.03] border rounded-2xl p-5 md:p-6 text-center ${
                  metric.highlight
                    ? 'border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)]'
                    : 'border-white/[0.06]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl border ${accentStyle.icon} flex items-center justify-center mx-auto mb-3`}>
                  {icon}
                </div>
                <p className="text-white/40 text-[10px] font-bold tracking-[0.15em] uppercase mb-2">
                  {metric.label}
                </p>
                <div className="mb-2">
                  <MetricCounter value={metric.value} accent={metric.accent || 'teal'} original={metric.value} />
                </div>
                {metric.subtitle && (
                  <p className="text-white/30 text-xs leading-relaxed">{metric.subtitle}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {data.body && data.body.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-3">
            {data.body.map((text, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-white/40 text-sm md:text-base leading-relaxed text-center"
              >
                {text}
              </motion.p>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
