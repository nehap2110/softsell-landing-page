import { motion } from 'framer-motion'
import { Layers, Twitter, Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#' },
    { label: 'Supported Software', href: '#' },
    { label: 'Enterprise', href: '#' },
    { label: "What's New", href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#', badge: "We're hiring" },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'SOC 2 Report', href: '#' },
    { label: 'Security', href: '#' },
  ],
}

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@softsell.io' },
]

export default function Footer() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      aria-label="Site footer"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] to-[#080C14] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12"
        >
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a href="#" className="inline-flex items-center gap-2.5 mb-4" aria-label="SoftSell home" onClick={e => handleNavClick(e, '#')}>
              <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center">
                <Layers size={16} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Soft<span className="text-gradient">Sell</span>
              </span>
            </a>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs mb-6">
              The securest, fastest way for companies to recover value from unused software licenses. Trusted by 2,100+ finance and IT teams worldwide.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2" role="list" aria-label="Social media links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">{category}</h3>
                <ul className="space-y-3" role="list">
                  {links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={e => handleNavClick(e, link.href)}
                        className="group flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                        {link.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                            style={{ background: 'rgba(99,102,241,0.15)', color: '#A78BFA', border: '1px solid rgba(99,102,241,0.2)' }}>
                            {link.badge}
                          </span>
                        )}
                        {link.href.startsWith('http') && (
                          <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}
        >
          <div>
            <p className="text-sm font-semibold text-white">Stay in the loop</p>
            <p className="text-xs text-white/45 mt-0.5">Market insights & software license news, monthly.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="input-field text-xs py-2 flex-1 sm:w-56"
              aria-label="Email for newsletter"
            />
            <button className="btn-primary text-xs py-2 px-4 whitespace-nowrap" aria-label="Subscribe to newsletter">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} SoftSell, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <p className="text-xs text-white/30">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  )
}