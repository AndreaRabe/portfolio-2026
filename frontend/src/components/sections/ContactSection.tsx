"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";
import { api } from "@/lib/api";

type FormState = {
  name: string;
  email: string;
  mission_type: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const MISSION_TYPES = [
  "Data Science & Analytics",
  "Développement Full Stack",
  "Reporting & Power BI",
  "Machine Learning",
  "Consulting",
  "Autre",
] as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/AndreaRabe",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nantenaina-andrea-rabemanantsoa-95658324b/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

function InputField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs text-[var(--color-muted)] tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass = `
  w-full glass rounded-xl px-4 py-3
  font-mono text-sm text-[var(--color-text)]
  placeholder:text-[var(--color-muted)]
  border border-[var(--color-border)]
  focus:border-[rgba(0,212,255,0.5)] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]
  outline-none transition-all duration-200
`;

export function ContactSection() {
  const { ref, isInView } = useScrollAnimation();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    mission_type: MISSION_TYPES[0],
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Requis";
    if (!form.email.trim()) e.email = "Requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.message.trim()) e.message = "Requis";
    else if (form.message.trim().length < 10) e.message = "Minimum 10 caractères";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await api.post("/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", mission_type: MISSION_TYPES[0], message: "" });
    } catch {
      setStatus("error");
    }
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Contact"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight"
          >
            Travaillons <span className="text-gradient-cyan">ensemble</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-mono text-[var(--color-muted)] text-sm mt-4 max-w-lg mx-auto"
          >
            Une mission freelance ou un poste ? Je réponds sous 24h.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Form — 3/5 */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3">
            <GlassCard className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <p className="font-display font-semibold text-lg text-[var(--color-text)]">
                    Message envoyé !
                  </p>
                  <p className="font-mono text-sm text-[var(--color-muted)]">
                    Je vous réponds dans les 24h.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="font-mono text-xs text-[var(--color-cyan)] hover:underline mt-2"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Nom *" id="name" error={errors.name}>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jean Dupont"
                        autoComplete="name"
                        className={`${inputClass} ${errors.name ? "border-red-400/50" : ""}`}
                      />
                    </InputField>

                    <InputField label="Email *" id="email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jean@entreprise.com"
                        autoComplete="email"
                        className={`${inputClass} ${errors.email ? "border-red-400/50" : ""}`}
                      />
                    </InputField>
                  </div>

                  <InputField label="Type de mission" id="mission_type">
                    <select
                      id="mission_type"
                      value={form.mission_type}
                      onChange={set("mission_type")}
                      className={`${inputClass} cursor-pointer`}
                    >
                      {MISSION_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#0d0d12]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </InputField>

                  <InputField label="Message *" id="message" error={errors.message}>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Décrivez votre projet ou besoin..."
                      className={`${inputClass} resize-none ${errors.message ? "border-red-400/50" : ""}`}
                    />
                  </InputField>

                  {status === "error" && (
                    <p className="font-mono text-xs text-red-400 text-center">
                      Une erreur est survenue. Réessayez ou contactez-moi directement.
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full mt-2"
                  >
                    {status === "loading" ? "Envoi en cours..." : "Envoyer le message →"}
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>

          {/* Info — 2/5 */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-2 flex flex-col gap-5">
            {/* Direct contact */}
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold text-sm text-[var(--color-text)] mb-4">
                Contact direct
              </h3>
              <a
                href="mailto:nantenainaandrea2@gmail.com"
                className="font-mono text-sm text-[var(--color-cyan)] hover:underline break-all"
                aria-label="Envoyer un email"
              >
                nantenainaandrea2@gmail.com
              </a>
              <div className="mt-4 flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (ouvre dans un nouvel onglet)`}
                    className="
                      w-10 h-10 rounded-xl glass flex items-center justify-center
                      text-[var(--color-muted)] hover:text-[var(--color-cyan)]
                      hover:border-[rgba(0,212,255,0.3)]
                      transition-all duration-200
                    "
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </GlassCard>

            {/* Availability */}
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold text-sm text-[var(--color-text)] mb-4">
                Disponibilité
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Freelance", value: "Disponible", ok: true },
                  { label: "CDI / CDD",  value: "Ouvert",     ok: true },
                  { label: "Localisation", value: "Antananarivo, Madagascar", ok: null },
                  { label: "Réponse",   value: "< 24h",      ok: null },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[var(--color-muted)]">{item.label}</span>
                    <span className={`
                      font-mono text-xs
                      ${item.ok === true ? "text-[#22c55e]" : "text-[var(--color-text)]"}
                    `}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Response time note */}
            <GlassCard className="p-5 border-[rgba(0,212,255,0.12)]">
              <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed">
                Je lis tous les messages personnellement et réponds toujours, même pour dire non.
                Pas de template, pas de bot.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
