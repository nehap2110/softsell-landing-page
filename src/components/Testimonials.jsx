import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of Finance',
    company: 'NovaTech Systems',
    avatar: 'SC',
    avatarColor: 'from-blue-500 to-indigo-600',
    review:
      'SoftSell recovered $120K from unused Salesforce and Adobe licenses we were still paying for. The valuation was spot-on and the payout hit our account within 6 hours of approval. Genuinely the easiest financial win our team has had this quarter.',
    rating: 5,
    amount: '$120,000',
    software: 'Salesforce + Adobe',
  },
  {
    name: 'Marcus Webb',
    role: 'IT Asset Manager',
    company: 'Bridgepoint Capital',
    avatar: 'MW',
    avatarColor: 'from-violet-500 to-purple-600',
    review:
      "We had 40 Microsoft 365 E5 licenses sitting idle after a round of layoffs. SoftSell had buyers lined up in under an hour. The legal transfer was seamless — our compliance team was impressed. We've now made this part of our standard offboarding process.",
    rating: 5,
    amount: '$67,400',
    software: 'Microsoft 365 E5',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Operations',
    company: 'Luminary Health Co.',
    avatar: 'PN',
    avatarColor: 'from-emerald-500 to-teal-600',
    review:
      'I was skeptical at first — selling software licenses sounds complicated. But SoftSell made it dead simple. Upload, approve the offer, get paid. No jargon, no hidden fees, no delays. We recovered 94% of what we originally paid for 3 years of unused seats.',
    rating: 5,
    amount: '$31,200',
    software: 'Zoom + Slack',
  },
  {
    name: 'James Okafor',
    role: 'CFO',
    company: 'Meridian Logistics',
    avatar: 'JO',
    avatarColor: 'from-amber-500 to-orange-600',
    review:
      'Our CTO flagged $200K in underutilized SaaS spend. SoftSell helped us liquidate the bulk of it. The reporting dashboard is excellent — I could see every step of the transfer in real time. Its the kind of transparency you rarely get in B2B finance tools.',
    rating: 5,
    amount: '$184,000',
    software: 'Multiple SaaS',
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-amber-400 fill-amber-400" aria-hidden="true" />
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-2xl p-6 flex flex-col gap-5 card-hover group"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      aria-label={`Testimonial from ${t.name} at ${t.company}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

      {/* Quote icon */}
      <Quote size={24} className="text-brand-primary/30" aria-hidden="true" />

      {/* Stars */}
      <StarRating count={t.rating} />

      {/* Review text */}
      <p className="text-sm text-white/60 leading-relaxed flex-1">"{t.review}"</p>

      {/* Recovery amount badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl self-start"
        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs font-semibold text-white/70">Recovered {t.amount}</span>
        <span className="text-xs text-white/35">· {t.software}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center flex-shrink-0`}
          aria-hidden="true"
        >
          <span className="text-xs font-bold text-white">{t.avatar}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-white/40">{t.role} · {t.company}</p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/3 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">Customer Stories</span>
          <h2
            id="testimonials-title"
            className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Real companies,{' '}
            <span className="text-gradient">real results</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Join thousands of finance and IT teams who've turned stranded software assets into working capital.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="text-amber-400 fill-amber-400" aria-hidden="true" />
            ))}
          </div>
          <p className="text-white/60 text-sm">
            Rated <strong className="text-white">4.9 out of 5</strong> from 2,100+ reviews on G2 and Capterra
          </p>
        </motion.div>
      </div>
    </section>
  )
}