import { motion } from 'framer-motion'
import { Shield, Zap, BadgeCheck, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description:
      'Every transfer is protected with AES-256 encryption, SOC 2 Type II compliance, and multi-party authentication. Your licenses and data are always safe.',
    stat: '100%',
    statLabel: 'Secure transfers',
    gradient: 'from-blue-600/30 to-cyan-600/20',
    border: 'rgba(59,130,246,0.2)',
    glow: 'rgba(59,130,246,0.15)',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Payouts',
    description:
      'Same-day ACH or next-business-day wire for all approved transactions. No waiting weeks — we move at the speed your business demands.',
    stat: '<24h',
    statLabel: 'Average payout time',
    gradient: 'from-amber-600/30 to-orange-600/20',
    border: 'rgba(245,158,11,0.2)',
    glow: 'rgba(245,158,11,0.15)',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Buyer Network',
    description:
      'Every buyer in our network undergoes KYB verification, legal vetting, and credit assessment. You never deal with unqualified or fraudulent buyers.',
    stat: '4,800+',
    statLabel: 'Verified buyers',
    gradient: 'from-violet-600/30 to-purple-600/20',
    border: 'rgba(139,92,246,0.2)',
    glow: 'rgba(139,92,246,0.15)',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    icon: TrendingUp,
    title: 'Best Market Rates',
    description:
      'Our real-time market intelligence ensures you always get top dollar. We benchmark across 50+ resale channels to maximize your return.',
    stat: '94%',
    statLabel: 'Of market value returned',
    gradient: 'from-emerald-600/30 to-teal-600/20',
    border: 'rgba(16,185,129,0.2)',
    glow: 'rgba(16,185,129,0.15)',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
]

function FeatureCard({ feature, index }) {
  const Icon = feature.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
      whileHover={{ y: -4 }}
      aria-label={feature.title}
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${feature.glow}, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: `1px solid ${feature.border}`, borderRadius: '1rem' }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
          style={{ border: `1px solid ${feature.border}` }}>
          <Icon size={20} className={feature.iconColor} strokeWidth={1.75} aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-white mb-3">{feature.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-6">{feature.description}</p>

        {/* Stat */}
        <div
          className={`inline-flex flex-col p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}
          style={{ border: `1px solid ${feature.border}` }}
        >
          <span className="font-display text-2xl font-bold text-white leading-none">{feature.stat}</span>
          <span className="text-xs text-white/50 mt-1">{feature.statLabel}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="why-us-title"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'rgba(15,21,36,0.5)' }} aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">Why SoftSell</span>
          <h2
            id="why-us-title"
            className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Built for{' '}
            <span className="text-gradient">finance teams</span>
            {' '}who<br className="hidden sm:block" /> demand reliability
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            We're not a marketplace. We're an end-to-end platform that handles compliance, escrow, and legal transfers so you don't have to.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: '$48M+', label: 'Paid out to sellers' },
            { value: '2,100+', label: 'Companies served' },
            { value: '99.8%', label: 'Transfer success rate' },
            { value: '4.9/5', label: 'Customer satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}