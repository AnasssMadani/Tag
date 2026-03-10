"use client";
import { motion } from "framer-motion";
import { Droplets, Smartphone, BatteryFull } from "lucide-react";
import dynamic from "next/dynamic";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { SuccessIcon, LockUnlockIcon, NotificationIcon } from "@/components/ui/animated-state-icons";

const AirtagModel3D = dynamic(() => import("@/components/AirtagModel3D"), { ssr: false });

const badges = [
    { text: "IP67 Étanche", Icon: Droplets, AnimIcon: LockUnlockIcon },
    { text: "Apple Find My", Icon: Smartphone, AnimIcon: SuccessIcon },
    { text: "8 mois batterie", Icon: BatteryFull, AnimIcon: NotificationIcon },
];

export default function Hero() {
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Shader background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <ShaderAnimation />
            </div>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]" />

            <div className="max-w-6xl mx-auto px-6 w-full pt-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--border-glow)] mb-6">
                                🇲🇦 Livraison partout au Maroc
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-display font-extrabold leading-[1.05] tracking-tight mb-6"
                            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                        >
                            Ne perdez plus<br />
                            <span className="gradient-text">jamais rien.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0"
                        >
                            Le Smart Finder se connecte à votre iPhone via Apple Find My. Clés, sac, valise — retrouvez tout en quelques secondes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 mb-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => scrollTo("order-form")}
                                className="relative group px-8 py-4 rounded-full font-bold text-lg text-[var(--primary-bg)] overflow-hidden animate-pulse-glow"
                                style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                            >
                                <span className="relative z-10">Commander maintenant — 249 DHS</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 justify-center lg:justify-start mb-8"
                        >
                            <span className="text-sm text-[var(--text-secondary)]">Paiement à la livraison 🚚</span>
                            <span className="text-sm text-[var(--text-muted)]">|</span>
                            <span className="font-arabic text-sm text-[var(--accent-primary)]">الدفع عند الاستلام</span>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => scrollTo("how-it-works")}
                            className="text-[var(--accent-primary)] text-sm flex items-center gap-2 mx-auto lg:mx-0 hover:underline"
                        >
                            Voir comment ça marche ↓
                        </motion.button>
                    </div>

                    {/* 3D Model Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex-1 flex justify-center relative w-full h-[600px] md:h-[700px] lg:h-[800px]"
                    >
                        {/* Orbital Ring */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[520px] md:h-[520px] rounded-full border border-[var(--border-glow)] orbital-ring" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(78,255,197,0.15) 0%, transparent 60%)" }}
                        />

                        {/* 3D Canvas */}
                        <div className="relative z-10 w-full h-full">
                            <AirtagModel3D />
                        </div>
                    </motion.div>
                </div>

                {/* Floating Badges with Animated Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12"
                >
                    {badges.map(({ text, AnimIcon }, i) => (
                        <div key={i} className="glass px-4 py-2.5 rounded-full flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                            <AnimIcon size={22} color="var(--accent-primary)" />
                            {text}
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx>{`
        .orbital-ring {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
      `}</style>
        </section>
    );
}
