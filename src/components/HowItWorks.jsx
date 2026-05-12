import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Upload, BarChart2, DollarSign } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your License',
    description:
      'Securely submit your unused software license details through our encrypted portal. We support 200+ major software vendors including Adobe, Microsoft, Salesforce, and more.',
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(59,130,246,0.2)',
    tags: ['Adobe', 'Microsoft', 'Salesforce', '+197 more'],
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Get Instant Valuation',
    description:
      'Our AI-powered pricing engine analyzes real-time market demand, license terms, and buyer appetite to generate the best possible valuation within minutes — not days.',
    color: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
    glowColor: 'rgba(139,92,246,0.2)',
    tags: ['AI-Powered', 'Real-time', 'Best Price'],
  },
  {
    icon: DollarSign,
    step: '03',
    title: 'Get Paid Today',
    description:
      'Accept your offer and we handle everything — legal transfer, buyer verification, escrow, and compliance. Your payout lands in your bank account the same day you approve.',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(16,185,129,0.2)',
    tags: ['Same-day ACH', 'Wire Transfer', 'Zero Fees'],
  },
]

function StepCard({ step, index }) {
  const Icon = step.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl p-6 card-hover group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      aria-label={`Step ${index + 1}: ${step.title}`}
    >
      {/* Step number background */}
      <div
        className="absolute top-4 right-4 font-display text-7xl font-bold select-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
        aria-hidden="true"
      >
        {step.step}
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${step.glowColor}, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Icon size={22} className={step.iconColor} strokeWidth={1.75} aria-hidden="true" />
      </div>

      {/* Step label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono font-medium text-white/30">Step {step.step}</span>
        <span className="flex-1 h-px bg-white/5" />
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-5">{step.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {step.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-white/50"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export default function HowItWorks() {
  const { ref, inView } = useInView(0.1)

  return (
    <section
      id="how-it-works"
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">How It Works</span>
          <h2
            id="how-it-works-title"
            className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            From upload to payout{' '}
            <span className="text-gradient">in 3 steps</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            The entire process takes under 24 hours. Most customers receive their first offer within minutes.
          </p>
        </motion.div>

        {/* Connector line (desktop) */}
        <div className="relative" aria-hidden="true">
          <div
            className="absolute top-[3.5rem] left-1/2 -translate-x-1/2 hidden lg:block"
            style={{ width: 'calc(66.66% - 64px)', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(139,92,246,0.3), transparent)' }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/40">
            Ready to get started?{' '}
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
              }}
              className="text-brand-accent hover:text-white underline underline-offset-4 transition-colors duration-200 font-medium"
            >
              Submit your first license free →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}