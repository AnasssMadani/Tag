"use client";
import { motion } from "framer-motion";
import { Link, Wifi, MapPin } from "lucide-react";

const steps = [
    { number: "01", title: "Attachez", desc: "Fixez le Smart Finder à vos clés, sac ou valise avec le porte-clés inclus.", Icon: Link },
    { number: "02", title: "Connectez", desc: "Ouvrez l'app Apple Find My sur votre iPhone et ajoutez votre Smart Finder en 30 secondes.", Icon: Wifi },
    { number: "03", title: "Retrouvez", desc: "Perdez quelque chose? Ouvrez l'app, voyez sa position sur la carte, ou faites-le sonner.", Icon: MapPin },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-36 relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                        3 étapes, c&apos;est tout
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Dashed line connector (desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[17%] right-[17%] h-px border-t border-dashed border-[var(--border-subtle)]" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-6 relative z-10">
                                <step.Icon size={28} className="text-[var(--accent-primary)]" />
                            </div>
                            <span className="font-mono text-4xl font-bold gradient-text block mb-3">{step.number}</span>
                            <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
