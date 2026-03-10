"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const lastY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
        if (latest > lastY.current && latest > 100) setHidden(true);
        else setHidden(false);
        lastY.current = latest;
    });

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: hidden ? -80 : 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-[#2A2A3A]"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    <button onClick={() => scrollTo("hero")} className="font-display text-lg font-bold tracking-tight">
                        <span className="gradient-text">SmartFinder</span>
                        <span className="ml-1 text-sm">🇲🇦</span>
                    </button>

                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollTo("products")} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Nos produits</button>
                        <button onClick={() => scrollTo("how-it-works")} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Comment ça marche?</button>
                        <button onClick={() => scrollTo("social-proof")} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Avis clients</button>
                        <button onClick={() => scrollTo("faq")} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">FAQ</button>
                        <button
                            onClick={() => scrollTo("products")}
                            className="relative px-5 py-2 rounded-full text-sm font-semibold text-[var(--primary-bg)] overflow-hidden"
                            style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                        >
                            <span className="relative z-10">Commander</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
                        </button>
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-1 p-2 z-[60]"
                        aria-label="Menu"
                    >
                        <span className={`block w-5 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                >
                    <button onClick={() => scrollTo("products")} className="text-xl font-semibold">Nos produits</button>
                    <button onClick={() => scrollTo("how-it-works")} className="text-xl font-semibold">Comment ça marche?</button>
                    <button onClick={() => scrollTo("social-proof")} className="text-xl font-semibold">Avis clients</button>
                    <button onClick={() => scrollTo("faq")} className="text-xl font-semibold">FAQ</button>
                    <button
                        onClick={() => scrollTo("products")}
                        className="px-8 py-3 rounded-full font-bold text-[var(--primary-bg)]"
                        style={{ background: "linear-gradient(90deg, #4EFFC5, #7B5CF5)" }}
                    >
                        Commander
                    </button>
                </motion.div>
            )}
        </>
    );
}
