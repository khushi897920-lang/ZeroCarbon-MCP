"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DocLink {
  id: string;
  label: string;
}

export interface DocCategory {
  title: string;
  items: DocLink[];
}

export interface DocsSidebarProps {
  categories: DocCategory[];
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSidebar({
  categories = [],
  activeId,
  onSelect,
  isOpen,
  onClose,
}: DocsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    // Expand all by default
    const states: Record<string, boolean> = {};
    categories.forEach((cat) => {
      states[cat.title] = true;
    });
    return states;
  });

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Filter categories and links based on search
  const filteredCategories = categories
    .map((category) => {
      const filteredItems = category.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => category.items.length > 0);

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-[#0B0F0D]/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 border-r border-neutral-200/50 dark:border-outline-variant/10 bg-white dark:bg-background pt-24 px-6 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Search Input */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-9 py-2 text-xs rounded-xl bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 text-neutral-800 dark:text-text-main focus:outline-none focus:border-accent-green dark:focus:border-accent-green focus:ring-2 focus:ring-accent-green/5 transition-all"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-neutral-400 text-[16px] pointer-events-none">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-text-main cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto pr-1 pb-8 space-y-5 select-none scrollbar-thin">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => {
              const isExpanded = expandedCategories[category.title] ?? true;

              return (
                <div key={category.title} className="space-y-1">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="flex items-center justify-between w-full text-left py-1 text-[11px] font-bold text-neutral-400 dark:text-text-muted hover:text-neutral-600 dark:hover:text-text-main tracking-wider uppercase cursor-pointer"
                  >
                    <span>{category.title}</span>
                    <span
                      className={`material-symbols-outlined text-xs transition-transform duration-200 ${
                        isExpanded ? "" : "-rotate-90"
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Category Items Accordion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex flex-col gap-0.5"
                      >
                        {category.items.map((item) => {
                          const isActive = activeId === item.id;

                          return (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                onSelect(item.id);
                                onClose(); // Close drawer on mobile
                              }}
                              onMouseEnter={() => setHoveredId(item.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              className={`relative px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? "text-accent-green dark:text-accent-green"
                                  : "text-neutral-500 dark:text-text-muted hover:text-neutral-800 dark:hover:text-text-main"
                              }`}
                            >
                              {/* Vercel-style Moving Highlight Pill */}
                              {hoveredId === item.id && (
                                <motion.div
                                  layoutId="sidebar-hover-pill"
                                  className="absolute inset-0 bg-neutral-100/70 dark:bg-surface-mint/8 rounded-xl -z-10"
                                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                              )}

                              {/* Active indicator dot */}
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                                  isActive
                                    ? "bg-accent-green scale-100 shadow-[0_0_6px_rgba(46,92,68,0.4)]"
                                    : "bg-transparent scale-0"
                                }`}
                              />
                              {item.label}
                            </a>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-text-muted leading-relaxed">
                No matching topics found.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
