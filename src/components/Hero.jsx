import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function FloatingCard({ className, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute glass rounded-2xl p-4 shadow-glass ${className}`}
    >
      {children}
    </motion.div>
  )
}

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: '1000px' }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Main dashboard card */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]"
        style={{ background: 'rgba(15,21,36,0.95)', backdropFilter: 'blur(20px)' }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-4 h-6 rounded-md bg-white/5 flex items-center px-3">
            <span className="text-xs text-white/25 font-mono">app.softsell.io/dashboard</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Total Earned', value: '$48,200', delta: '+12%', color: 'text-emerald-400' },
              { label: 'Licenses Sold', value: '142', delta: '+8', color: 'text-emerald-400' },
              { label: 'Pending', value: '$3,400', delta: '2 offers', color: 'text-amber-400' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                <p className="text-lg font-bold font-display text-white">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.color}`}>{stat.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-white/60">Revenue — Last 6 months</span>
              <span className="text-xs text-brand-primary font-medium">+34% YTD</span>
            </div>
            {/* Mini chart bars */}
            <div className="flex items-end gap-2 h-16">
              {[40, 65, 48, 80, 58, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{ background: `linear-gradient(180deg, rgba(99,102,241,0.8) 0%, rgba(139,92,246,0.4) 100%)` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="space-y-2">
            {[
              { name: 'Adobe Creative Cloud', seats: '15 seats', amount: '$2,340', status: 'Paid' },
              { name: 'Microsoft 365 E3', seats: '30 seats', amount: '$5,100', status: 'In Review' },
              { name: 'Salesforce Enterprise', seats: '8 seats', amount: '$8,800', status: 'Paid' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="flex items-center justify-between py-2 px-3 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div>
                  <p className="text-xs font-medium text-white/80">{item.name}</p>
                  <p className="text-xs text-white/35">{item.seats}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white/90">{item.amount}</p>
                  <span className={`text-xs font-medium ${item.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <FloatingCard className="-top-6 -left-8 hidden lg:block animate-float" delay={1.0}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <TrendingUp size={14} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Payout Sent</p>
            <p className="text-xs text-white/50">$2,340 · Just now</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="-bottom-4 -right-8 hidden lg:block animate-float-delayed" delay={1.2}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
            <Shield size={14} className="text-brand-accent" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Verified Transfer</p>
            <p className="text-xs text-white/50">Buyer confirmed ✓</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="top-1/2 -right-12 -translate-y-1/2 hidden xl:block animate-float-slow" delay={1.4}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Zap size={14} className="text-amber-400" />
          </div>
          <p className="text-xs font-bold text-white">Fast</p>
          <p className="text-xs text-white/50">Same Day</p>
        </div>
      </FloatingCard>

      {/* Glow under card */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-primary/20 blur-3xl rounded-full pointer-events-none" />
    </motion.div>
  )
}

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 px-4 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-brand-secondary/8 blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top badge */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-8">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse-slow" />
            Now in public beta — Join 2,000+ companies
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.2)} className="text-center mb-6">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
            <span className="text-white">Turn Unused</span>
            <br />
            <span className="text-gradient">Software Licenses</span>
            <br />
            <span className="text-white">Into Instant Cash</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-center text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          Stop paying for software nobody uses. SoftSell connects you with verified buyers,
          handles secure transfers, and deposits your payout the same day — guaranteed.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <button
            onClick={() => handleScroll('#contact')}
            className="btn-primary text-base px-8 py-4 shadow-brand-sm hover:shadow-brand-md"
            aria-label="Start selling your licenses"
          >
            Start Selling Now
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => handleScroll('#how-it-works')}
            className="btn-secondary text-base px-8 py-4"
            aria-label="Learn how SoftSell works"
          >
            See How It Works
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.div {...fadeUp(0.45)} className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-white/35">
          {['No upfront fees', 'Bank-grade encryption', 'Same-day payouts', 'Verified buyers only'].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-primary">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <DashboardMockup />
      </div>
    </section>
  )
}