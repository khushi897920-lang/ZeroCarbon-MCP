"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { motion } from "framer-motion";

interface CustomNodeData {
  label: string;
  icon: string;
  isCore?: boolean;
}

function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const isCore = data.isCore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        flex items-center gap-3 px-4 py-3 min-w-[150px] rounded-xl transition-all duration-300
        ${isCore 
          ? "bg-gradient-to-br from-emerald-50 dark:from-emerald-950/20 to-emerald-100/50 dark:to-emerald-900/10 border-2 border-emerald-300 dark:border-emerald-700/50 shadow-md shadow-emerald-100 dark:shadow-none" 
          : "bg-white dark:bg-surface-container border border-emerald-100 dark:border-outline-variant/15 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-accent-green/30"
        }
        ${selected ? "ring-2 ring-emerald-400 ring-offset-2" : ""}
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-white"
        style={{ left: -6 }}
      />

      <div className={`material-symbols-outlined ${isCore ? "text-emerald-600 dark:text-accent-green" : "text-emerald-500"} text-[20px] shrink-0`}>
        {data.icon}
      </div>

      <span className={`text-xs font-medium ${isCore ? "text-emerald-700 dark:text-accent-green" : "text-slate-700 dark:text-text-main"}`}>
        {data.label}
      </span>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-white"
        style={{ right: -6 }}
      />
    </motion.div>
  );
}

export default memo(CustomNode);