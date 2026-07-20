"use client";

import React, { useEffect, useState } from "react";

export interface OutlineItem {
  id: string;
  label: string;
}

export interface DocsOutlineProps {
  items: OutlineItem[];
}

export function DocsOutline({ items = [] }: DocsOutlineProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = items.map((item) => document.getElementById(item.id));

    const observerOptions = {
      root: null, // window viewport
      rootMargin: "-100px 0px -70% 0px", // triggers when heading is in the upper portion of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      headingElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [items]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed top-24 bottom-0 right-8 w-60 py-4 px-4 overflow-y-auto z-10 select-none">
      <div className="space-y-4">
        <h5 className="font-body-md text-[10px] font-bold text-neutral-400 dark:text-text-muted tracking-[0.16em] uppercase">
          On this page
        </h5>

        <ul className="space-y-3 list-none p-0 m-0 border-l border-neutral-100 dark:border-outline-variant/10 relative">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="pl-4 relative">
                {/* Active Indicator Slider */}
                {isActive && (
                  <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-accent-green rounded-full shadow-[0_0_6px_rgba(46,92,68,0.4)]" />
                )}

                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`text-xs font-semibold block transition-colors duration-200 hover:text-neutral-800 dark:hover:text-text-main leading-normal ${
                    isActive
                      ? "text-accent-green font-bold"
                      : "text-neutral-400 dark:text-text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
export default DocsOutline;
