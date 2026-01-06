import React from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background, Handle } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Input Tokens' }, position: { x: 50, y: 0 } },
  { id: '2', data: { label: 'Token Embeddings' }, position: { x: 50, y: 80 } },
  { id: '3', data: { label: 'Positional Embeddings' }, position: { x: 50, y: 160 } },
  { id: '4', data: { label: 'Add: Token + Positional Embeddings' }, position: { x: 50, y: 240 } },
  {
    id: '5',
    data: {
      label: (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center', position: 'relative' }}>
          <Handle type="source" position="top" id="top-handle" style={{ background: '#555' }} />
          Transformer Blocks (x96, <strong>175B parameters</strong>)
          {"\n"}[Masked Multi-Head Self-Attention]
          {"\n"}[Feed-Forward Network]
          {"\n"}[Residual Connections & Layer Norm]
        </div>
      )
    },
    position: { x: -25, y: 320 },
    style: { width: 300, textAlign: 'center' }
  },
  {
    id: '5-details',
    data: {
      label: (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          - 96 Layers
          {"\n"}- 96 Attention Heads
          {"\n"}- 12,288 Hidden Dimensions
          {"\n"}- Context Window: 2048 Tokens
        </div>
      )
    },
    position: { x: 300, y: 320 },
    style: { width: 250, textAlign: 'center', border: '1px solid #ccc', background: '#f9f9f9', padding: 10 }
  },
  { id: '6', data: { label: 'Final Layer Normalization' }, position: { x: 50, y: 450 } },
  { id: '7', data: { label: 'Linear Projection to Vocabulary' }, position: { x: 50, y: 550 } },
  { id: '8', data: { label: 'Softmax' }, position: { x: 50, y: 650 } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'edge-5-5-details', source: '5', target: '5-details', sourceHandle: 'top-handle', animated: true },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' }
];

const GPT3ArchitectureFlow = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlowProvider>
        <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default GPT3ArchitectureFlow;
