import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react'

const LICENSE_TYPES = [
  'Adobe Creative Cloud',
  'Microsoft 365 / Office',
  'Salesforce CRM',
  'Zoom / Video Conferencing',
  'Slack / Collaboration',
  'GitHub Enterprise',
  'Atlassian (Jira/Confluence)',
  'ServiceNow',
  'Workday',
  'SAP / Oracle ERP',
  'Other',
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  licenseType: '',
  message: '',
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'

  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'

  if (!form.company.trim()) errors.company = 'Company name is required'

  if (!form.licenseType) errors.licenseType = 'Please select a license type'

  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 20) errors.message = 'Please provide at least 20 characters'

  return errors
}

function FormField({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-white/70">
        {label} <span className="text-brand-primary" aria-hidden="true">*</span>
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value })
      setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate(form)
    setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = Object.keys(initialForm).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.values(validationErrors).some(Boolean)) return

    setStatus('loading')
    // Simulate API call
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
  }

  const inputClass = (name) =>
    `input-field ${errors[name] && touched[name] ? 'border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''}`

  if (status === 'success') {
    return (
      <section id="contact" className="relative py-28 px-4" aria-label="Contact form success">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-2xl p-12 text-center"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
            }}
            role="status"
            aria-live="polite"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={32} className="text-emerald-400" aria-hidden="true" />
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">Message Received!</h3>
            <p className="text-white/55 mb-8 leading-relaxed">
              Thanks for reaching out. Our team will review your license details and get back to you
              with a valuation within <strong className="text-white">2 business hours</strong>.
            </p>
            <button
              onClick={() => { setForm(initialForm); setErrors({}); setTouched({}); setStatus('idle') }}
              className="btn-secondary"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="contact-title"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-secondary/8 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-6 inline-flex">Get in Touch</span>
            <h2
              id="contact-title"
              className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Ready to unlock{' '}
              <span className="text-gradient">your license value?</span>
            </h2>
            <p className="text-lg text-white/55 leading-relaxed mb-10">
              Tell us about your unused licenses. Our team will respond with a detailed
              valuation and a no-obligation offer within 2 business hours.
            </p>

            {/* Info cards */}
            <div className="space-y-4">
              {[
                { icon: '⚡', title: 'Fast Response', desc: 'Valuations within 2 business hours' },
                { icon: '🔒', title: 'Confidential', desc: 'All inquiries are strictly confidential' },
                { icon: '💸', title: 'Zero Obligation', desc: 'Accept or decline — no pressure' },
              ].map(item => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/45 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl p-6 sm:p-8 space-y-5"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
              }}
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Full Name" id="name" error={touched.name ? errors.name : ''}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jane Smith"
                    className={inputClass('name')}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  />
                </FormField>

                <FormField label="Work Email" id="email" error={touched.email ? errors.email : ''}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jane@company.com"
                    className={inputClass('email')}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!(touched.email && errors.email)}
                  />
                </FormField>
              </div>

              <FormField label="Company Name" id="company" error={touched.company ? errors.company : ''}>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Acme Corporation"
                  className={inputClass('company')}
                  autoComplete="organization"
                  aria-required="true"
                  aria-invalid={!!(touched.company && errors.company)}
                />
              </FormField>

              <FormField label="License Type" id="licenseType" error={touched.licenseType ? errors.licenseType : ''}>
                <select
                  id="licenseType"
                  name="licenseType"
                  value={form.licenseType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass('licenseType')} cursor-pointer`}
                  style={{ colorScheme: 'dark' }}
                  aria-required="true"
                  aria-invalid={!!(touched.licenseType && errors.licenseType)}
                >
                  <option value="" disabled>Select software type…</option>
                  {LICENSE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Tell Us More" id="message" error={touched.message ? errors.message : ''}>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder="Describe your licenses — number of seats, expiry date, purchase price, etc."
                  className={`${inputClass('message')} resize-none`}
                  aria-required="true"
                  aria-invalid={!!(touched.message && errors.message)}
                />
              </FormField>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Submit license inquiry"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Get My Valuation
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/30">
                By submitting, you agree to our{' '}
                <a href="#" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>
                {' '}and{' '}
                <a href="#" className="underline hover:text-white/60 transition-colors">Terms of Service</a>.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}