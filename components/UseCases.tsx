"use client";
import { motion } from "framer-motion";
import { Key, Briefcase, Luggage, Wallet, Bike, PawPrint } from "lucide-react";

const cases = [
    { Icon: Key, title: "Clés", desc: "Fini les retards à chercher les clés" },
    { Icon: Briefcase, title: "Cartable / Sac", desc: "Idéal pour les enfants à l'école" },
    { Icon: Luggage, title: "Valise", desc: "Tracez vos bagages en voyage" },
    { Icon: Wallet, title: "Portefeuille", desc: "Protégez vos cartes et espèces" },
    { Icon: Bike, title: "Vélo / Dabi", desc: "Anti-vol intelligent pour votre monture" },
    { Icon: PawPrint, title: "Animal de compagnie", desc: "Retrouvez votre chat ou chien" },
];

export default function UseCases() {
    return (
        <section className="py-24 md:py-36 bg-[var(--secondary-bg)]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                        Pour tout ce qui compte
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg">Attachez un Smart Finder à n&apos;importe quoi</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {cases.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="group rounded-2xl p-6 md:p-8 border border-[var(--border-glow)] cursor-default transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,255,197,0.1)] hover:-translate-y-1"
                            style={{ background: "rgba(78,255,197,0.04)" }}
                        >
                            <item.Icon size={32} className="text-[var(--accent-primary)] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-display text-lg font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
