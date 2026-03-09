"use client"

import { useState, type FormEvent } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"

const countries = ["Argentina", "Brasil", "Paraguay", "Otro"]
const budgets = [
  "USD 30k - 50k",
  "USD 50k - 100k",
  "USD 100k+",
  "Prefiero no indicar",
]

const i18n = {
  es: {
    tag: "Contacto",
    heading: "¿Querés invertir con criterio?",
    sub: "Completá el formulario y te contactamos dentro de las 24hs.",
    labelName: "Nombre completo",
    placeholderName: "Tu nombre",
    labelEmail: "Correo electrónico",
    placeholderEmail: "tu@email.com",
    labelCountry: "País de residencia",
    placeholderCountry: "Seleccionar",
    labelBudget: "Capital disponible para inversión",
    placeholderBudget: "Seleccionar (opcional)",
    labelMessage: "Mensaje / Consulta",
    placeholderMessage: "Tu consulta...",
    submit: "Enviar Consulta",
    sending: "Enviando...",
    success: "✓ Consulta enviada. Te enviamos una confirmación por correo.",
    successPopupTitle: "¡Consulta enviada!",
    successPopupSub: "Te enviamos una confirmación por correo. Nos pondremos en contacto con vos en menos de 24hs.",
    error: "Hubo un error. Por favor escribinos directamente.",
    privacy: "Tu información es confidencial. Nunca compartimos datos con terceros.",
  },
  en: {
    tag: "Contact",
    heading: "Ready to invest with criteria?",
    sub: "Fill out the form and we'll get back to you within 24 hours.",
    labelName: "Full name",
    placeholderName: "Your name",
    labelEmail: "Email address",
    placeholderEmail: "you@email.com",
    labelCountry: "Country of residence",
    placeholderCountry: "Select",
    labelBudget: "Available investment capital",
    placeholderBudget: "Select (optional)",
    labelMessage: "Message / Inquiry",
    placeholderMessage: "Your inquiry...",
    submit: "Send Inquiry",
    sending: "Sending...",
    success: "✓ Inquiry sent. We've sent you a confirmation email.",
    successPopupTitle: "Inquiry sent!",
    successPopupSub: "We've sent you a confirmation email. We will contact you within 24 hours.",
    error: "Something went wrong. Please contact us directly.",
    privacy: "Your information is confidential. We never share data with third parties.",
  },
  pt: {
    tag: "Contato",
    heading: "Quer investir com critério?",
    sub: "Preencha o formulário e entraremos em contato em até 24 horas.",
    labelName: "Nome completo",
    placeholderName: "Seu nome",
    labelEmail: "Endereço de e-mail",
    placeholderEmail: "voce@email.com",
    labelCountry: "País de residência",
    placeholderCountry: "Selecionar",
    labelBudget: "Capital disponível para investimento",
    placeholderBudget: "Selecionar (opcional)",
    labelMessage: "Mensagem / Consulta",
    placeholderMessage: "Sua consulta...",
    submit: "Enviar Consulta",
    sending: "Enviando...",
    success: "✓ Consulta enviada. Enviamos um e-mail de confirmação para você.",
    successPopupTitle: "Consulta enviada!",
    successPopupSub: "Enviamos um e-mail de confirmação. Entraremos em contato em até 24 horas.",
    error: "Ocorreu um erro. Por favor, entre em contato directamente.",
    privacy: "Suas informações são confidenciais. Nunca compartilhamos dados com terceiros.",
  },
  de: {
    tag: "Kontakt",
    heading: "Möchten Sie gezielt investieren?",
    sub: "Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden.",
    labelName: "Vollständiger Name",
    placeholderName: "Ihr Name",
    labelEmail: "E-Mail-Adresse",
    placeholderEmail: "sie@email.com",
    labelCountry: "Wohnsitzland",
    placeholderCountry: "Auswählen",
    labelBudget: "Verfügbares Investitionskapital",
    placeholderBudget: "Auswählen (optional)",
    labelMessage: "Nachricht / Anfrage",
    placeholderMessage: "Ihre Anfrage...",
    submit: "Anfrage senden",
    sending: "Wird gesendet...",
    success: "✓ Anfrage gesendet. Wir haben Ihnen eine Bestätigungs-E-Mail geschickt.",
    successPopupTitle: "Anfrage gesendet!",
    successPopupSub: "Wir haben Ihnen eine Bestätigungs-E-Mail geschickt. Wir melden uns innerhalb von 24 Stunden.",
    error: "Ein Fehler ist aufgetreten. Bitte kontaktieren Sie uns direkt.",
    privacy: "Ihre Daten sind vertraulich. Wir geben keine Daten an Dritte weiter.",
  },
}

type Lang = keyof typeof i18n

interface ContactFormProps {
  lang?: Lang
}

export function ContactForm({ lang = "es" }: ContactFormProps) {
  const t = i18n[lang]

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [budget, setBudget] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          country: country || "No indicado",
          budget: budget || "No indicado",
          message: message || "Sin mensaje",
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      setStatus("success")
      setShowSuccessDialog(true)
      setName("")
      setEmail("")
      setCountry("")
      setBudget("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  const inputBase =
    "w-full border-0 border-b border-gold/30 bg-transparent px-0 py-3 font-sans text-base font-[300] text-kc-white placeholder:text-kc-white/30 focus:border-gold focus:outline-none focus:ring-0 transition-colors"

  const labelClass =
    "mb-1 block font-sans text-[10px] font-[600] uppercase tracking-[0.25em] text-gold/60"

  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9B99A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 0 center",
  }

  return (
    <section id="contacto" className="bg-navy-deep px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[600px]">
        <ScrollReveal>
          <span className="mb-4 inline-block font-sans text-xs font-[600] uppercase tracking-[0.3em] text-gold">
            {t.tag}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="mb-3 font-sans text-[clamp(1.8rem,3.5vw,3rem)] font-[200] leading-[1.15] text-kc-white">
            {t.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="mb-12 font-sans text-base font-[300] text-kc-white/60 md:mb-14">
            {t.sub}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className={labelClass}>
                {t.labelName}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.placeholderName}
                className={inputBase}
                disabled={status === "loading"}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                {t.labelEmail}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholderEmail}
                className={inputBase}
                disabled={status === "loading"}
              />
            </div>

            {/* País */}
            <div>
              <label htmlFor="country" className={labelClass}>
                {t.labelCountry}
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${inputBase} cursor-pointer appearance-none`}
                disabled={status === "loading"}
                style={selectStyle}
              >
                <option value="" className="bg-navy-deep text-kc-white/50">
                  {t.placeholderCountry}
                </option>
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-navy-deep text-kc-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Capital */}
            <div>
              <label htmlFor="budget" className={labelClass}>
                {t.labelBudget}
              </label>
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`${inputBase} cursor-pointer appearance-none`}
                disabled={status === "loading"}
                style={selectStyle}
              >
                <option value="" className="bg-navy-deep text-kc-white/50">
                  {t.placeholderBudget}
                </option>
                {budgets.map((b) => (
                  <option key={b} value={b} className="bg-navy-deep text-kc-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="message" className={labelClass}>
                {t.labelMessage}
              </label>
              <textarea
                id="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholderMessage}
                className={`${inputBase} resize-none`}
                disabled={status === "loading"}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gold px-8 py-4 font-sans text-xs font-[600] uppercase tracking-[0.15em] text-navy-deep transition-all hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? t.sending : t.submit}
            </button>

            {status === "error" && (
              <p className="text-center font-sans text-sm font-[400] text-red-400">
                {t.error}
              </p>
            )}

            <p className="text-center font-sans text-[11px] font-[300] text-kc-white/40">
              {t.privacy}
            </p>
          </form>
        </ScrollReveal>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="border-gold/20 bg-navy-deep p-10 text-center sm:max-w-[450px]">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <Check className="h-8 w-8 text-gold" />
            </div>
            <DialogTitle className="font-sans text-2xl font-[200] tracking-tight text-kc-white">
              {t.successPopupTitle}
            </DialogTitle>
            <DialogDescription className="font-sans text-base font-[300] leading-relaxed text-kc-white/60">
              {t.successPopupSub}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-8">
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-gold px-8 py-3 font-sans text-[10px] font-[600] uppercase tracking-[0.2em] text-navy-deep transition-all hover:bg-gold-light"
            >
              Cerrar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}