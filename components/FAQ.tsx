"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
    { q: "Est-ce que ça marche avec Android?", a: "Non, le Smart Finder fonctionne exclusivement avec les appareils Apple (iPhone, iPad, Mac, Apple Watch) via l'application Find My. Vous avez besoin d'un Apple ID et d'iOS 14.5 minimum." },
    { q: "Comment se passe la livraison au Maroc?", a: "Nous livrons partout au Maroc en 2 à 4 jours ouvrables. Vous payez uniquement à la réception — zéro risque pour vous. Un SMS de confirmation vous sera envoyé." },
    { q: "Et si le produit ne me convient pas?", a: "Vous avez 7 jours pour retourner le produit si vous n'êtes pas satisfait. Contactez-nous sur WhatsApp et on s'occupe du reste." },
    { q: "La pile dure vraiment 8 mois?", a: "Oui! La pile CR-2032 pré-installée dure environ 8 mois selon l'utilisation. Une pile de rechange est incluse dans la boîte — donc 16 mois au total. Disponible partout au Maroc pour quelques dirhams." },
    { q: "Puis-je attacher plusieurs Smart Finders à un seul iPhone?", a: "Absolument! Vous pouvez connecter jusqu'à 16 Smart Finders par Apple ID. Parfait pour tracker clés + sac + valise en même temps." },
    { q: "Le Smart Finder est-il vraiment étanche?", a: "Oui, certifié IP67. Ça signifie qu'il supporte l'immersion dans 1 mètre d'eau pendant 30 minutes. Idéal pour la plage, la pluie ou les sorties outdoor." },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 md:py-36">
            <div className="max-w-3xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display font-bold text-center mb-12"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                    Questions fréquentes
                </motion.h2>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-xl border transition-colors ${open === i ? "border-[var(--accent-primary)]/30 bg-[var(--card-bg)]" : "border-[var(--border-subtle)] bg-[var(--surface)]"}`}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-semibold pr-4">{faq.q}</span>
                                {open === i ? (
                                    <X size={18} className="text-[var(--accent-primary)] flex-shrink-0" />
                                ) : (
                                    <Plus size={18} className="text-[var(--text-muted)] flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--accent-primary)] ml-5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
