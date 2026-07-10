"use client";

import React from "react";
import {
  ReactFlow,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Custom Node Component
const McpCustomNode = ({ data }: any) => {
  const isPill = data.shape === "pill";
  const isDatabase = data.shape === "database";

  return (
    <div
      className={`shadow-[0_8px_32px_rgba(3,36,22,0.15)] transition-all duration-300 hover:border-accent-green hover:shadow-[0_8px_32px_rgba(46,92,68,0.25)] flex items-center justify-center gap-2 backdrop-blur-md ${
        isPill
          ? "rounded-full px-6 py-2.5 bg-neutral-950 border border-neutral-800 text-white font-medium text-xs sm:text-sm"
          : isDatabase
          ? "rounded-2xl px-5 py-4 bg-[#032416] border-[2px] border-accent-green text-[#e9f2ea] flex-col text-center min-w-[140px] text-xs sm:text-sm"
          : "rounded-xl px-4 py-3 bg-[#051c11]/95 border border-[#2E5C44]/40 text-[#e9f2ea] text-xs sm:text-sm font-semibold"
      }`}
    >
      {data.handles?.map((h: any, i: number) => (
        <Handle
          key={i}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            background: "#2E5C44",
            border: "1.5px solid #e9f2ea",
            width: 8,
            height: 8,
            ...h.style,
          }}
        />
      ))}
      {data.icon && <span className="text-base select-none">{data.icon}</span>}
      <span className="font-body-md select-none font-medium leading-tight whitespace-pre-line text-center block">
        {data.label}
      </span>
    </div>
  );
};

const initialNodes: Node[] = [
  // Row 1 (X: 20 to 680, Y: 50)
  {
    id: "user",
    type: "custom",
    position: { x: 20, y: 60 },
    data: {
      label: "User",
      icon: "👤",
      shape: "pill",
      handles: [
        { type: "source", position: Position.Right, id: "user-out" },
        { type: "target", position: Position.Right, id: "user-in" },
      ],
    },
  },
  {
    id: "client",
    type: "custom",
    position: { x: 160, y: 50 },
    data: {
      label: "AI Client",
      icon: "🤖",
      handles: [
        { type: "target", position: Position.Left, id: "client-in-user" },
        { type: "source", position: Position.Right, id: "client-out" },
        { type: "target", position: Position.Bottom, id: "client-in-loop" },
      ],
    },
  },
  {
    id: "api",
    type: "custom",
    position: { x: 320, y: 50 },
    data: {
      label: "API",
      handles: [
        { type: "target", position: Position.Left, id: "api-in" },
        { type: "source", position: Position.Right, id: "api-out" },
      ],
    },
  },
  {
    id: "router",
    type: "custom",
    position: { x: 480, y: 50 },
    data: {
      label: "MCP Tool Router",
      icon: "⚙️",
      handles: [
        { type: "target", position: Position.Left, id: "router-in" },
        { type: "source", position: Position.Right, id: "router-out" },
      ],
    },
  },
  // Split middle-right
  {
    id: "calculators",
    type: "custom",
    position: { x: 680, y: -10 },
    data: {
      label: "Calculators",
      icon: "🧮",
      handles: [
        { type: "target", position: Position.Left, id: "calc-in" },
        { type: "source", position: Position.Right, id: "calc-out" },
      ],
    },
  },
  {
    id: "parser",
    type: "custom",
    position: { x: 680, y: 110 },
    data: {
      label: "Parser",
      handles: [
        { type: "target", position: Position.Left, id: "parser-in" },
        { type: "source", position: Position.Right, id: "parser-out" },
      ],
    },
  },
  // Row 2 (X: 160 to 680, Y: 230)
  {
    id: "ledger",
    type: "custom",
    position: { x: 680, y: 230 },
    data: {
      label: "Corporate Carbon Ledger",
      icon: "🌱",
      shape: "database",
      handles: [
        { type: "target", position: Position.Top, id: "ledger-in" },
        { type: "source", position: Position.Left, id: "ledger-out" },
      ],
    },
  },
  {
    id: "sitemap",
    type: "custom",
    position: { x: 480, y: 245 },
    data: {
      label: "Dynamic Sitemap",
      icon: "📁",
      handles: [
        { type: "target", position: Position.Right, id: "sitemap-in" },
        { type: "source", position: Position.Left, id: "sitemap-out" },
      ],
    },
  },
  {
    id: "verify",
    type: "custom",
    position: { x: 320, y: 245 },
    data: {
      label: "Verify",
      handles: [
        { type: "target", position: Position.Right, id: "verify-in" },
        { type: "source", position: Position.Left, id: "verify-out" },
      ],
    },
  },
  {
    id: "insights",
    type: "custom",
    position: { x: 160, y: 230 },
    data: {
      label: "Carbon Insights\nReports\nCalculations",
      icon: "📊",
      handles: [
        { type: "target", position: Position.Right, id: "insights-in" },
        { type: "source", position: Position.Top, id: "insights-out-loop" },
      ],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-user-client",
    source: "user",
    sourceHandle: "user-out",
    target: "client",
    targetHandle: "client-in-user",
    animated: true,
  },
  {
    id: "e-client-user",
    source: "client",
    sourceHandle: "client-out",
    target: "user",
    targetHandle: "user-in",
    animated: true,
  },
  {
    id: "e-client-api",
    source: "client",
    sourceHandle: "client-out",
    target: "api",
    targetHandle: "api-in",
    animated: true,
  },
  {
    id: "e-api-router",
    source: "api",
    sourceHandle: "api-out",
    target: "router",
    targetHandle: "router-in",
    animated: true,
  },
  {
    id: "e-router-calc",
    source: "router",
    sourceHandle: "router-out",
    target: "calculators",
    targetHandle: "calc-in",
    animated: true,
  },
  {
    id: "e-router-parser",
    source: "router",
    sourceHandle: "router-out",
    target: "parser",
    targetHandle: "parser-in",
    animated: true,
  },
  {
    id: "e-calc-ledger",
    source: "calculators",
    sourceHandle: "calc-out",
    target: "ledger",
    targetHandle: "ledger-in",
    animated: true,
  },
  {
    id: "e-parser-ledger",
    source: "parser",
    sourceHandle: "parser-out",
    target: "ledger",
    targetHandle: "ledger-in",
    animated: true,
  },
  {
    id: "e-ledger-sitemap",
    source: "ledger",
    sourceHandle: "ledger-out",
    target: "sitemap",
    targetHandle: "sitemap-in",
    animated: true,
  },
  {
    id: "e-sitemap-verify",
    source: "sitemap",
    sourceHandle: "sitemap-out",
    target: "verify",
    targetHandle: "verify-in",
    animated: true,
  },
  {
    id: "e-verify-insights",
    source: "verify",
    sourceHandle: "verify-out",
    target: "insights",
    targetHandle: "insights-in",
    animated: true,
  },
  {
    id: "e-insights-loop",
    source: "insights",
    sourceHandle: "insights-out-loop",
    target: "client",
    targetHandle: "client-in-loop",
    animated: true,
    style: { strokeDasharray: "4,4", stroke: "#2E5C44" },
  },
];

export default function McpFlow() {
  const nodeTypes = React.useMemo(
    () => ({
      custom: McpCustomNode,
    }),
    []
  );
  return (
    <div className="w-full h-[520px] relative bg-neutral-950/20 rounded-[32px] overflow-hidden border border-outline-variant/10">
      <style>{`
        .react-flow__background {
          background-color: transparent !important;
        }
        .react-flow__edge-path {
          stroke: #2E5C44 !important;
          stroke-width: 2px !important;
          transition: stroke 0.3s;
        }
        .react-flow__edge.animated .react-flow__edge-path {
          stroke: #accent-green !important;
          stroke-dasharray: 6;
          animation: flow-dash 1.2s linear infinite;
        }
        @keyframes flow-dash {
          from {
            stroke-dashoffset: 12;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .react-flow__handle {
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          transition: transform 0.2s;
        }
        .react-flow__handle:hover {
          transform: scale(1.3);
        }
      `}</style>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={true}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#2E5C44" className="opacity-15" />
      </ReactFlow>
    </div>
  );
}
