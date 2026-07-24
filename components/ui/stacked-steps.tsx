'use client';

import ScrollStack, { ScrollStackItem } from './ScrollStack';

const steps = [
  {
    num: '01',
    label: 'Install & Connect',
    desc: 'Deploy our lightweight agent across your cloud stack in minutes. No migration, no downtime — just plug in and go.',
    stat: '< 5 min',
    statLabel: 'Setup time',
    icon: 'bolt',
    accentClass: 'text-accent-green',
    bgClass: 'bg-white',
    borderClass: 'border-outline-variant/10',
  },
  {
    num: '02',
    label: 'Discover Tools',
    desc: 'AI automatically maps every software tool, cloud service, and API to its energy and carbon footprint — with zero manual tagging.',
    stat: '4,000+',
    statLabel: 'Tools mapped',
    icon: 'manage_search',
    accentClass: 'text-accent-green',
    bgClass: 'bg-white',
    borderClass: 'border-outline-variant/10',
  },
  {
    num: '03',
    label: 'Calculate Emissions',
    desc: 'Compute real-time Scope 1, 2, and 3 data with certified accuracy across all workloads — powered by live emission factors.',
    stat: '24 ms',
    statLabel: 'Signal latency',
    icon: 'query_stats',
    accentClass: 'text-accent-green',
    bgClass: 'bg-white',
    borderClass: 'border-outline-variant/10',
  },
  {
    num: '04',
    label: 'Store in Ledger',
    desc: 'Immutable audit logs saved to our carbon ledger — ready for CSRD, SEC and stakeholder reporting. Every byte verifiable.',
    stat: '12k+',
    statLabel: 'Audits verified',
    icon: 'verified_user',
    accentClass: 'text-white',
    bgClass: 'bg-primary',
    borderClass: 'border-transparent',
  },
];

export function StackedSteps() {
  return (
    <section id="how-it-works" className="px-grid-margin py-12 md:py-20 max-w-container-max mx-auto">
      {/* Heading */}
      <div className="text-center space-y-4 mb-4">
        <p className="font-label-caps text-label-caps text-accent-green uppercase">
          The Path To Zero
        </p>
        <h2 className="gsap-title font-headline-xl text-headline-xl">
          Simplicity in every step
        </h2>
      </div>

      {/* ScrollStack — props tuned for ZeroCarbon card height + page rhythm */}
      <ScrollStack
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={24}
        stackPosition="18%"
        baseScale={0.84}
      >
        {steps.map((step, i) => (
          <ScrollStackItem key={step.num}>
            <div
              className={`
                rounded-[40px] border ${step.borderClass} ${step.bgClass} ${step.bgClass === 'bg-white' ? 'dark:bg-surface-container' : ''}
                shadow-[0_12px_48px_rgba(3,36,22,0.08)]
                p-10 md:p-14 max-w-5xl mx-auto
                grid md:grid-cols-[1fr_2.2fr_0.8fr] gap-10 md:gap-16 items-center
              `}
            >
              {/* Left — step number + icon */}
              <div className="flex flex-col gap-5">
                <div
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                    ${i === steps.length - 1 ? 'bg-white/15' : 'bg-surface-mint'}
                  `}
                >
                  <span
                    className={`material-symbols-outlined text-[26px] ${
                      i === steps.length - 1 ? 'text-white' : 'text-accent-green'
                    }`}
                  >
                    {step.icon}
                  </span>
                </div>
                <div>
                  <p
                    className={`font-label-caps text-[11px] uppercase tracking-[0.2em] mb-1 ${
                      i === steps.length - 1 ? 'text-white/50' : 'text-text-muted'
                    }`}
                  >
                    Step
                  </p>
                  <p
                    className={`font-display-md text-5xl font-bold italic leading-none ${
                      i === steps.length - 1 ? 'text-white/20' : 'text-primary/10'
                    }`}
                  >
                    {step.num}
                  </p>
                </div>
              </div>

              {/* Center — title + description */}
              <div className="space-y-4">
                <h4
                  className={`font-headline-xl text-[28px] md:text-[32px] leading-tight ${
                    i === steps.length - 1 ? 'text-white' : 'text-primary'
                  }`}
                >
                  {step.label}
                </h4>
                <p
                  className={`font-body-xl text-body-xl leading-relaxed max-w-lg ${
                    i === steps.length - 1 ? 'text-white/70' : 'text-text-muted'
                  }`}
                >
                  {step.desc}
                </p>

                {/* Progress indicator */}
                <div className="flex gap-2 pt-2">
                  {steps.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        dotIdx <= i
                          ? i === steps.length - 1
                            ? 'bg-white/70 w-8'
                            : 'bg-accent-green w-8'
                          : i === steps.length - 1
                          ? 'bg-white/20 w-3'
                          : 'bg-outline-variant/30 w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right — live stat */}
              <div
                className={`hidden md:flex flex-col items-end gap-1 ${
                  i === steps.length - 1 ? 'text-white' : 'text-primary'
                }`}
              >
                <p className="font-display-md text-4xl md:text-5xl font-bold italic leading-none">
                  {step.stat}
                </p>
                <p
                  className={`font-label-caps text-[11px] uppercase tracking-[0.18em] ${
                    i === steps.length - 1 ? 'text-white/50' : 'text-text-muted'
                  }`}
                >
                  {step.statLabel}
                </p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
