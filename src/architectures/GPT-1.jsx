import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
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
        <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          Transformer Blocks (xN, <strong>117M parameters</strong>)
          {"\n"}[Masked Self-Attention + Feed Forward] + Residual & Norm
        </div>
      )
    },
    position: { x: -125, y: 320 },
    style: { width: 500, textAlign: 'center' }
  },
  { id: '6', data: { label: 'Layer Normalization' }, position: { x: 50, y: 420 } },
  { id: '7', data: { label: 'Linear Projection to Vocabulary' }, position: { x: 50, y: 500 } },
  { id: '8', data: { label: 'Softmax' }, position: { x: 50, y: 580 } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' }
];

const GPT1ArchitectureFlow = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default GPT1ArchitectureFlow;
