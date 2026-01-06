// src/architectures/FlowDiagram.jsx
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

// 🔁 Shared node style
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

// 🔴 Custom red edge with arrow tip
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

const nodes = [
  {
    id: 'node-text',
    type: 'input',
    data: { label: '[Text Input]' },
    position: { x: 50, y: 50 },
    style: { ...sharedStyle, backgroundColor: 'transparent' }, // peach
  },
  {
    id: 'node-image',
    type: 'input',
    data: { label: '[Image Input]' },
    position: { x: 250, y: 50 },
    style: { ...sharedStyle, backgroundColor: 'transparent' }, // peach
  },
  {
    id: 'node-audio',
    type: 'input',
    data: { label: '[Audio Input]' },
    position: { x: 450, y: 50 },
    style: { ...sharedStyle, backgroundColor: 'transparent' }, // peach
  },
  {
    id: 'node-preprocess',
    data: { label: '(Preprocessing/Tokenization for each modality)' },
    position: { x: 175, y: 150 },
    style: { ...sharedStyle, backgroundColor: '#edffb0', width: 300 }, // yellow
  },
  {
    id: 'node-encoder',
    data: { label: '[Multimodal Input Encoder]' },
    position: { x: 238, y: 250 },
    style: { ...sharedStyle, backgroundColor: '#bea9fc', width: 175 }, // blue
  },
  {
    id: 'node-backbone',
    data: {
      label:
        '[Shared Transformer Backbone]\n(Self-Attention, RBRMs, Multimodal Fusion)',
    },
    position: { x: 175, y: 350 },
    style: { ...sharedStyle, backgroundColor: '#81b6f7', width: 300 }, // blue
  },
  {
    id: 'node-output',
    data: {
      label:
        '[Modality-Specific Output Heads]\n(Text Generation, Image Generation, Audio Generation)',
    },
    position: { x: 150, y: 450 },
    style: { ...sharedStyle, backgroundColor: '#90EE90', width: 350 }, // green
  },
  {
    id: 'node-alignment',
    data: {
      label:
        '[Post-Training Alignment & Safety]\n(RLHF, Risk Mitigation, Ethical Filtering)',
    },
    position: { x: 175, y: 550 },
    style: { ...sharedStyle, backgroundColor: '#D8BFD8', width: 300 }, // purple
  },
];

const edges = [
  { id: 'e1', source: 'node-text', target: 'node-preprocess', type: 'redArrow', animated: true, label: 'Text Path' },
  { id: 'e2', source: 'node-image', target: 'node-preprocess', type: 'redArrow', animated: true, label: 'Image Path' },
  { id: 'e3', source: 'node-audio', target: 'node-preprocess', type: 'redArrow', animated: true, label: 'Audio Path' },
  { id: 'e4', source: 'node-preprocess', target: 'node-encoder', type: 'redArrow', animated: true },
  { id: 'e5', source: 'node-encoder', target: 'node-backbone', type: 'redArrow', animated: true },
  { id: 'e6', source: 'node-backbone', target: 'node-output', type: 'redArrow', animated: true },
  { id: 'e7', source: 'node-output', target: 'node-alignment', type: 'redArrow', animated: true },
];

const FlowDiagram = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={{ redArrow: RedArrowEdge }}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowDiagram;
