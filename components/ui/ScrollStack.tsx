'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

// ─── ScrollStackItem ─────────────────────────────────────────────────────────

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>
    <div className="scroll-stack-card-inner w-full h-full transform-gpu">
      {children}
    </div>
  </div>
);

// ─── ScrollStack ─────────────────────────────────────────────────────────────

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.03,
  itemStackDistance = 24,
  stackPosition = '18%',
  baseScale = 0.85,
  rotationAmount = 0.5,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.scroll-stack-card'));
    const innerCards = Array.from(container.querySelectorAll<HTMLElement>('.scroll-stack-card-inner'));

    if (!cards.length) return;

    // Position cards absolute inside the stack container for stacking
    cards.forEach((card, i) => {
      card.style.position = 'absolute';
      card.style.top = '0';
      card.style.left = '0';
      card.style.width = '100%';
      card.style.zIndex = String(i + 1);
    });

    const ctx = gsap.context(() => {
      const cardHeight = cards[0].offsetHeight;
      const stackOffset = itemStackDistance * (cards.length - 1);
      
      // Dynamically set the container height to fit the cards + offset
      container.style.height = `${cardHeight + stackOffset}px`;

      // Single timeline that pins the whole container
      const tl = gsap.timeline({
        onComplete: onStackComplete,
        scrollTrigger: {
          trigger: container,
          start: `top top+=${stackPosition}`,
          // Scroll length matches number of cards
          end: () => `+=${window.innerHeight * (cards.length - 1) * 0.55}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        },
      });

      // Animate cards stacking
      cards.forEach((card, i) => {
        if (i > 0) {
          // Slide in the card from bottom
          tl.fromTo(card,
            { y: window.innerHeight * 0.9, opacity: 0.8 },
            { 
              y: i * itemStackDistance, 
              opacity: 1,
              duration: 1 
            },
            `card-${i}`
          );

          // Simultaneously scale and blur previous cards in the stack
          for (let j = 0; j < i; j++) {
            const depth = i - j;
            const targetScale = 1 - depth * itemScale;
            
            tl.to(innerCards[j], {
              scale: targetScale,
              rotation: rotationAmount ? -depth * rotationAmount : 0,
              filter: blurAmount && depth * blurAmount > 0 ? `blur(${depth * blurAmount}px)` : 'none',
              duration: 0.8,
            }, `card-${i}-=-0.8`);
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
  ]);

  return (
    <div ref={containerRef} className={`scroll-stack-scroller relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner w-full relative">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
