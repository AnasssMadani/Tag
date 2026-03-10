"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const goTo = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const prev = () => {
        setDirection(-1);
        setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    };

    const next = () => {
        setDirection(1);
        setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
    };

    return (
        <div className="relative w-full">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[var(--surface)] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center p-8"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${alt} - ${currentIndex + 1}`}
                            width={600}
                            height={600}
                            className="object-contain w-full h-full"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Nav Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-[var(--accent-primary)]/40 transition-colors"
                            aria-label="Image précédente"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-[var(--accent-primary)]/40 transition-colors"
                            aria-label="Image suivante"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex items-center justify-center gap-3 mt-4">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === currentIndex
                                    ? "border-[var(--accent-primary)] shadow-[0_0_12px_rgba(78,255,197,0.3)]"
                                    : "border-[var(--border-subtle)] opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${alt} thumbnail ${i + 1}`}
                                width={64}
                                height={64}
                                className="object-contain w-full h-full bg-[var(--surface)] p-1"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
