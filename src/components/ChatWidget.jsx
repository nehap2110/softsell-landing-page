import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react'

const BOT_NAME = 'Aria'
const BOT_SUBTITLE = 'SoftSell AI · Typically replies instantly'

const FAQ_RESPONSES = {
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'howdy', 'sup', 'good morning', 'good evening'],
    response: "Hi there! 👋 I'm Aria, your SoftSell assistant. I can help you with questions about selling licenses, payouts, supported software, and more. What would you like to know?",
  },
  sell: {
    patterns: ['how do i sell', 'how to sell', 'sell license', 'selling licenses', 'get started', 'how does it work', 'start selling'],
    response: "Selling your unused licenses on SoftSell is easy:\n\n1. **Upload** — Submit your license details via our secure portal\n2. **Valuate** — Get an AI-powered market offer within minutes\n3. **Get Paid** — Accept the offer and receive payment the same day\n\nWant to get started? Fill out the contact form on this page and we'll reach out with a custom valuation! 🚀",
  },
  payout: {
    patterns: ['payout', 'payment', 'how long', 'when do i get paid', 'payment time', 'how fast', 'transfer time', 'same day'],
    response: "We're proud to offer **same-day payouts** for most transactions! ⚡\n\nHere's the timeline:\n• ACH transfer: Same business day\n• Wire transfer: Within 2-4 hours of approval\n• International wire: 1-2 business days\n\nOnce you approve an offer, we initiate payment immediately — no waiting, no delays.",
  },
  supported: {
    patterns: ['which software', 'supported software', 'what licenses', 'what software', 'what can i sell', 'adobe', 'microsoft', 'salesforce'],
    response: "We support 200+ major software vendors! 🎉 Some of our most popular:\n\n• **Adobe** — Creative Cloud, Acrobat\n• **Microsoft** — 365, Office, Azure, Dynamics\n• **Salesforce** — CRM, Marketing Cloud\n• **Atlassian** — Jira, Confluence\n• **Zoom, Slack, Teams**\n• **GitHub Enterprise**\n• **ServiceNow, Workday, SAP**\n\nNot sure if your license qualifies? Just ask us and we'll check!",
  },
  fees: {
    patterns: ['fee', 'fees', 'cost', 'pricing', 'how much do you charge', 'commission', 'cut'],
    response: "SoftSell operates on a **zero-fee model for sellers**. 💸\n\nThere are no:\n• Listing fees\n• Success fees\n• Transfer fees\n• Hidden charges\n\nWe earn our margin from the buyer side, which means you always receive your full valuation amount. Transparent pricing, always.",
  },
  security: {
    patterns: ['secure', 'security', 'safe', 'data protection', 'encryption', 'compliance', 'legal'],
    response: "Security is our #1 priority. 🔒 SoftSell is:\n\n• **SOC 2 Type II** certified\n• **AES-256** encrypted for all transfers\n• **GDPR & CCPA** compliant\n• Fully **legal license transfer** handled by our legal team\n\nEvery transaction is covered by our Transfer Guarantee — if anything goes wrong, you're protected.",
  },
  contact: {
    patterns: ['contact', 'talk to', 'human', 'speak to someone', 'email', 'phone', 'support'],
    response: "I'd love to connect you with our team! 📬\n\nYou can reach us:\n• **Contact form** — Fill it out on this page for fastest response\n• **Email** — hello@softsell.io\n• **Response time** — Under 2 business hours, guaranteed\n\nOr I can help answer more questions right here!",
  },
  default: {
    response: "That's a great question! I might not have the exact answer, but our team definitely does. 🤔\n\nI'd recommend:\n1. Filling out our **contact form** below for a personalized response\n2. Or asking me about: selling licenses, payouts, supported software, fees, or security\n\nIs there anything else I can help clarify?",
  },
}

function getBotResponse(input) {
  const lower = input.toLowerCase()
  for (const [, faq] of Object.entries(FAQ_RESPONSES)) {
    if (faq.patterns && faq.patterns.some(p => lower.includes(p))) {
      return faq.response
    }
  }
  return FAQ_RESPONSES.default.response
}

function formatMessage(text) {
  return text.split('\n').map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return (
      <span key={i} className="block" dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />
    )
  })
}

const QUICK_PROMPTS = [
  'How do I sell licenses?',
  'How long do payouts take?',
  'Which software is supported?',
  'Are there any fees?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Hi! I'm **Aria**, your SoftSell AI assistant. 👋\n\nI can answer questions about selling licenses, payouts, supported software, and more. How can I help?",
      time: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 300)
      setHasUnread(false)
    }
  }, [open, messages])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText) return

    const userMsg = { id: Date.now(), from: 'user', text: userText, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    await new Promise(r => setTimeout(r, 800 + Math.random() * 800))

    const botText = getBotResponse(userText)
    const botMsg = { id: Date.now() + 1, from: 'bot', text: botText, time: new Date() }
    setIsTyping(false)
    setMessages(prev => [...prev, botMsg])

    if (!open) setHasUnread(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" role="complementary" aria-label="Chat support">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[360px] sm:w-[380px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: '520px',
              background: '#0F1524',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.15)',
            }}
            role="dialog"
            aria-label="AI Chat Support"
            aria-modal="false"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-brand-sm">
                    <Bot size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F1524]" aria-label="Online" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{BOT_NAME}</p>
                  <p className="text-xs text-white/40">{BOT_SUBTITLE}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin" style={{ scrollbarWidth: 'thin' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.from === 'user'
                        ? 'text-white rounded-tr-sm'
                        : 'text-white/80 rounded-tl-sm'
                    }`}
                    style={{
                      background: msg.from === 'user'
                        ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                        : 'rgba(255,255,255,0.05)',
                      border: msg.from === 'user' ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {formatMessage(msg.text)}
                    <p className={`text-[10px] mt-1.5 ${msg.from === 'user' ? 'text-white/50 text-right' : 'text-white/30'}`}>
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2 items-start"
                    aria-label="Aria is typing"
                    aria-live="polite"
                  >
                    <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/50" />
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/50" />
                      <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/50" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs px-3 py-1.5 rounded-xl text-white/60 hover:text-white transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 py-3 flex items-end gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                rows={1}
                className="flex-1 resize-none rounded-xl px-3 py-2.5 text-xs text-white/90 placeholder-white/25 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  maxHeight: '80px',
                  lineHeight: '1.5',
                }}
                aria-label="Type your message"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-brand-sm"
                aria-label="Send message"
              >
                <Send size={14} className="text-white" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center shadow-brand-md hover:shadow-brand-lg transition-shadow duration-300"
        aria-label={open ? 'Close chat' : 'Open AI chat support'}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !open && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0B0F19] flex items-center justify-center"
              aria-label="New message"
            >
              <span className="text-[8px] font-bold text-white">1</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <div className="absolute inset-0 rounded-2xl animate-ping" style={{ background: 'rgba(99,102,241,0.3)', animationDuration: '2.5s' }} aria-hidden="true" />
        )}
      </motion.button>
    </div>
  )
}