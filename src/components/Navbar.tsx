'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    // Opacity of inner content and blur
    const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const navY = useTransform(scrollY, [0, 50], [-20, 0]);

    // Keep track of scroll direction to optionally hide nav when scrolling down
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            className="fixed top-0 inset-x-0 z-50 h-14"
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
            <motion.div
                className="w-full h-full flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-black/50 backdrop-blur-xl transition-all"
                style={{ opacity: navOpacity, y: navY }}
            >
                <div className="font-medium text-lg tracking-tight hover:text-white transition-colors cursor-pointer text-white/90">
                    WH-1000XM6
                </div>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/60">
                    {['Overview', 'Technology', 'Noise Cancelling', 'Specs'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors relative group">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <button className="text-sm font-medium text-white/90 hover:text-white transition-colors relative group overflow-hidden px-4 md:px-6 py-1.5 rounded-full border border-white/10 hover:border-[#00D6FF]/50 bg-gradient-to-r from-transparent to-transparent hover:from-[#0050FF]/20 hover:to-[#00D6FF]/20">
                        <span className="relative z-10 transition-colors hidden md:block">Experience WH-1000XM6</span>
                        <span className="relative z-10 transition-colors md:hidden">Buy</span>
                    </button>
                </div>
            </motion.div>
        </motion.nav>
    );
}
