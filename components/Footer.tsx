"use client";
import { MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <>
            <footer className="bg-[var(--secondary-bg)] border-t border-[var(--border-subtle)] py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                        <div>
                            <span className="font-display text-xl font-bold gradient-text">SmartFinder Maroc</span>
                            <span className="ml-2">🇲🇦</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm">Politique de retour</a>
                            <a href="#" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm">Confidentialité</a>
                            <a href="#" className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm">Contact</a>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                        <p className="text-xs text-[var(--text-muted)]">© 2025 SmartFinder Maroc. Tous droits réservés.</p>
                        <p className="text-xs text-[var(--text-muted)]">La technologie au service de votre quotidien</p>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
                aria-label="WhatsApp"
            >
                <MessageCircle size={26} fill="white" stroke="white" />
            </a>
        </>
    );
}
