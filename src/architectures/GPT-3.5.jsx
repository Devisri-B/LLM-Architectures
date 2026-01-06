// src/architectures/GPT-3.5.jsx
import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import { BaseEdge, getBezierPath } from 'reactflow';
import 'reactflow/dist/style.css';

// Custom red animated arrow edge
const RedArrowEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <defs>
        <marker
          id="arrow-red"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="red" />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd="url(#arrow-red)"
        style={{ stroke: 'red' }}
      />
    </>
  );
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Tokens' },
    position: { x: 50, y: 0 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: 'transparent',
    },
  },
  {
    id: '2',
    data: { label: 'Token Embeddings' },
    position: { x: 50, y: 80 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#FFDAB9', // peach
    },
  },
  {
    id: '3',
    data: { label: 'Positional Embeddings' },
    position: { x: 50, y: 160 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#edffb0',
    },
  },
  {
    id: '4',
    data: { label: 'Add: Token + Positional Embeddings' },
    position: { x: 50, y: 240 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#FFA500', // orange
    },
  },
  {
    id: '5',
    data: {
      label: (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          Enhanced Transformer Blocks (x96)
          {'\n'}[Enhanced Masked Multi-Head Self-Attention]
          {'\n'}[Optimized Feed-Forward Network]
          {'\n'}[Improved Residual Connections & Layer Norm]
        </div>
      ),
    },
    position: { x: -25, y: 320 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#81b6f7', // blue
      width: '300px',
    },
  },
  {
    id: '5-details',
    data: {
      label: (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          - 96 Layers
          {'\n'}- 96 Enhanced Attention Heads
          {'\n'}- 12,288 Hidden Dimensions
          {'\n'}- Extended Context Window: 4096 Tokens
        </div>
      ),
    },
    position: { x: 300, y: 320 },
    style: {
      fontFamily: 'serif',
      width: 250,
      textAlign: 'center',
      border: '1px solid #ccc',
      background: '#f9f9f9',
      padding: 10,
    },
  },
  {
    id: '6',
    data: { label: 'Final Layer Normalization' },
    position: { x: 50, y: 450 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#bea9fc',
    },
  },
  {
    id: '6.5',
    data: { label: 'Instruction Fine-Tuning (RLHF)' },
    position: { x: 50, y: 530 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#fff1cc',
    },
  },
  {
    id: '7',
    data: { label: 'Linear Projection to Vocabulary' },
    position: { x: 50, y: 610 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#D8BFD8', // purple
    },
  },
  {
    id: '8',
    data: { label: 'Softmax' },
    position: { x: 50, y: 710 },
    style: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #aaa',
      borderRadius: '5px',
      backgroundColor: '#90EE90', // green
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'redArrow', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'redArrow', animated: true },
  { id: 'e3-4', source: '3', target: '4', type: 'redArrow', animated: true },
  { id: 'e4-5', source: '4', target: '5', type: 'redArrow', animated: true },
  {
    id: 'edge-5-5-details',
    source: '5',
    target: '5-details',
    type: 'redArrow',
    animated: true,
  },
  { id: 'e5-6', source: '5', target: '6', type: 'redArrow', animated: true },
  { id: 'e6-6.5', source: '6', target: '6.5', type: 'redArrow', animated: true },
  { id: 'e6.5-7', source: '6.5', target: '7', type: 'redArrow', animated: true },
  { id: 'e7-8', source: '7', target: '8', type: 'redArrow', animated: true },
];

function GPT35ArchitectureFlow() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          edgeTypes={{ redArrow: RedArrowEdge }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default GPT35ArchitectureFlow;
