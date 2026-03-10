"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const inclusions = [
    "✅ Smart Finder x1",
    "✅ 2 bumpers interchangeables",
    "✅ 2 piles CR-2032 incluses",
    "✅ Livraison rapide 2-4 jours",
    "✅ Paiement à la livraison",
    "✅ Support WhatsApp",
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !triggered.current) {
                triggered.current = true;
                const duration = 1500;
                const start = performance.now();
                const animate = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    setCount(Math.floor(progress * target));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function PricingCTA() {
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <section id="pricing-cta" className="py-24 md:py-36 relative">
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(123,92,245,0.08) 0%, transparent 60%)" }}
            />

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-mono font-bold text-[var(--accent-warm)] bg-[var(--accent-warm)]/10 border border-[var(--accent-warm)]/20 mb-6">
                        Offre limitée
                    </span>

                    <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                        Commandez maintenant
                    </h2>

                    {/* Price */}
                    <div className="mb-8">
                        <span className="text-2xl text-[var(--text-muted)] line-through mr-3">349 DHS</span>
                        <span className="font-mono font-bold text-[var(--gold)]" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
                            <CountUp target={249} /> DHS
                        </span>
                        <p className="text-sm text-[var(--accent-primary)] mt-2 font-semibold">Économisez 100 DHS</p>
                    </div>

                    {/* Inclusions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-10">
                        {inclusions.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="text-sm text-[var(--text-secondary)]"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => scrollTo("order-form")}
                        className="relative group px-10 py-5 rounded-full font-bold text-xl text-[var(--primary-bg)] overflow-hidden animate-pulse-glow mb-4"
                        style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                    >
                        <span className="relative z-10">Commander — Payer à la livraison</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>

                    <p className="text-sm text-[var(--text-secondary)]">🚚 Livraison partout au Maroc</p>

                    {/* Urgency */}
                    <div className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--accent-warm)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-warm)] animate-pulse" />
                        ⚡ Stock limité — Plus que quelques unités disponibles
                    </div>

                    <p className="text-xs text-[var(--text-muted)] mt-4">Des milliers de clients satisfaits au Maroc 🇲🇦</p>
                </motion.div>
            </div>
        </section>
    );
}
