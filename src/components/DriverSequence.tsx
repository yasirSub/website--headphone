'use client';

import { useEffect, useRef } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 240;

const currentFrame = (index: number) =>
    `/driver-sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

interface DriverSequenceProps {
    progress: MotionValue<number>;
}

export default function DriverSequence({ progress }: DriverSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Load first frame immediately
        const img0 = new Image();
        img0.src = currentFrame(0);
        imagesRef.current[0] = img0;

        img0.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                contextRef.current = canvas.getContext('2d');
                handleResize(); // Initial draw
            }
        };

        // Lazy load the rest
        for (let i = 1; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            imagesRef.current[i] = img;
        }

        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress.get() * FRAME_COUNT)
            );
            renderImage(frameIndex);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderImage = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        if (!canvas || !ctx) return;

        const img = imagesRef.current[index];
        if (!img || !img.complete) return;

        // Calculate object-cover aspect ratio
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        // We fill with #FAFAFA. When CSS inverted, #FAFAFA becomes #050505 (our background color)
        ctx.fillStyle = '#FAFAFA';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw scaled image
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    useMotionValueEvent(progress, 'change', (latest) => {
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );
        renderImage(frameIndex);
    });

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover invert"
            />
            {/* Blend edges to match #050505 since we inverted it. The layers above the canvas are not inverted, so they can just use normal dark gradients. */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none"></div>
        </>
    );
}
