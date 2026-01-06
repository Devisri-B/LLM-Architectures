// src/architectures/O1PreviewExpandedFlow.jsx
import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  BaseEdge,
  getBezierPath,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 🔁 Shared style for nodes
const sharedStyle = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '10px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  padding: '10px',
  border: '1px solid #aaa',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
};

// 🔴 Red animated arrow with red tip
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
      <BaseEdge id={id} path={edgePath} markerEnd="url(#arrow-red)" style={{ stroke: 'red' }} />
    </>
  );
};

const nodes = [
  {
    id: 'node-text',
    type: 'input',
    data: { label: '[Text Input]' },
    position: { x: 150, y: 50 },
    style: { ...sharedStyle, backgroundColor: '#FFDAB9' },
  },
  {
    id: 'node-preprocess',
    data: { label: '(Preprocessing/Tokenization)' },
    position: { x: 125, y: 120 },
    style: { ...sharedStyle, backgroundColor: '#edffb0', width: 200 },
  },
  {
    id: 'node-embedding',
    data: { label: '[Input Embedding & Positional Encoding]' },
    position: { x: 150, y: 190 },
    style: { ...sharedStyle, backgroundColor: '#edffb0' },
  },

// Block 1 (Light Blue)
{
  id: 'node-attention1',
  data: { label: 'Block 1: Multi-Head Self-Attention' },
  position: { x: -25, y: 260 },
  style: { ...sharedStyle, backgroundColor: '#d0e7ff' },
},
{
  id: 'node-ffn1',
  data: { label: 'Block 1: Feed-Forward Network' },
  position: { x: 150, y: 260 },
  style: { ...sharedStyle, backgroundColor: '#d0e7ff' },
},
{
  id: 'node-cot1',
  data: { label: 'Block 1: Chain-of-Thought Reasoning' },
  position: { x: 325, y: 260 },
  style: { ...sharedStyle, backgroundColor: '#d0e7ff' },
},

// Block 2 (Medium Blue)
{
  id: 'node-attention2',
  data: { label: 'Block 2: Multi-Head Self-Attention' },
  position: { x: -25, y: 340 },
  style: { ...sharedStyle, backgroundColor: '#a3cdfc' },
},
{
  id: 'node-ffn2',
  data: { label: 'Block 2: Feed-Forward Network' },
  position: { x: 150, y: 340 },
  style: { ...sharedStyle, backgroundColor: '#a3cdfc' },
},
{
  id: 'node-cot2',
  data: { label: 'Block 2: Chain-of-Thought Reasoning' },
  position: { x: 325, y: 340 },
  style: { ...sharedStyle, backgroundColor: '#a3cdfc' },
},

  // Block 3
  { id: 'node-attention3', data: { label: 'Block 3: Multi-Head Self-Attention' }, position: { x: -25, y: 420 }, style: { ...sharedStyle, backgroundColor: '#81b6f7' } },
  { id: 'node-ffn3', data: { label: 'Block 3: Feed-Forward Network' }, position: { x: 150, y: 420 }, style: { ...sharedStyle, backgroundColor: '#81b6f7' } },
  { id: 'node-cot3', data: { label: 'Block 3: Chain-of-Thought Reasoning' }, position: { x: 325, y: 420 }, style: { ...sharedStyle, backgroundColor: '#81b6f7' } },

  {
  id: 'node-backbone-output',
  data: { label: '[Aggregated Transformer Output]' },
  position: { x: 150, y: 500 },
  style: { ...sharedStyle, backgroundColor: '#b6f5b6' },
},
{
  id: 'node-output',
  data: { label: '[Text Output Head]' },
  position: { x: 150, y: 580 },
  style: { ...sharedStyle, backgroundColor: '#90EE90' }, 
},

  {
    id: 'node-alignment',
    data: { label: '[Post-Training Alignment & Safety]' },
    position: { x: 100, y: 660 },
    style: { ...sharedStyle, backgroundColor: '#D8BFD8', width: 250 },
  },
];

const edges = [
  { id: 'e1', source: 'node-text', target: 'node-preprocess', type: 'redArrow', animated: true },
  { id: 'e2', source: 'node-preprocess', target: 'node-embedding', type: 'redArrow', animated: true },

  // Transformer Block 1
  { id: 'e3', source: 'node-embedding', target: 'node-attention1', type: 'redArrow', animated: true },
  { id: 'e4', source: 'node-attention1', target: 'node-ffn1', type: 'redArrow', animated: true },
  { id: 'e5', source: 'node-ffn1', target: 'node-cot1', type: 'redArrow', animated: true },

  // Block 1 → Block 2
  { id: 'e6', source: 'node-cot1', target: 'node-attention2', type: 'redArrow', animated: true },
  { id: 'e7', source: 'node-attention2', target: 'node-ffn2', type: 'redArrow', animated: true },
  { id: 'e8', source: 'node-ffn2', target: 'node-cot2', type: 'redArrow', animated: true },

  // Block 2 → Block 3
  { id: 'e9', source: 'node-cot2', target: 'node-attention3', type: 'redArrow', animated: true },
  { id: 'e10', source: 'node-attention3', target: 'node-ffn3', type: 'redArrow', animated: true },
  { id: 'e11', source: 'node-ffn3', target: 'node-cot3', type: 'redArrow', animated: true },

  // Final stack
  { id: 'e12', source: 'node-cot3', target: 'node-backbone-output', type: 'redArrow', animated: true },
  { id: 'e13', source: 'node-backbone-output', target: 'node-output', type: 'redArrow', animated: true },
  { id: 'e14', source: 'node-output', target: 'node-alignment', type: 'redArrow', animated: true },
];

const O1PreviewExpandedFlow = () => {
  return (
    <div style={{ height: '1000px', width: '100%', overflow: 'auto' }}>
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} edgeTypes={{ redArrow: RedArrowEdge }} fitView>
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default O1PreviewExpandedFlow;
