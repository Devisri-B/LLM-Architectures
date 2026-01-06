import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Raw Text' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Tokenization
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Tokenizer (cl100k_base)\n[Converts to Token IDs]' }, style: { background: '#e3f2fd', border: '1px solid #2196f3' } },

  // The Transformer Stack
  { id: '3', position: { x: 150, y: 160 }, data: { label: 'Transformer Encoder Stack' }, style: { width: 500, height: 300, background: 'rgba(237, 231, 246, 0.5)', border: '1px dashed #673ab7' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Token + Positional Embeddings' }, style: { background: '#fff', width: 400 } },
  { id: '3b', position: { x: 50, y: 110 }, parentNode: '3', data: { label: 'Multi-Head Self-Attention\n[Captures Contextual Relationships]' }, style: { background: '#d1c4e9', border: '1px solid #512da8', width: 400 } },
  { id: '3c', position: { x: 50, y: 180 }, parentNode: '3', data: { label: 'Feed Forward Networks' }, style: { background: '#fff', width: 400 } },

  // The "Embedding" specific part
  { id: '4', position: { x: 250, y: 500 }, data: { label: 'Pooling Layer\n[Mean Pooling or [EOS] Token Extraction]' }, style: { background: '#ffccbc', border: '1px solid #d84315', fontWeight: 'bold' } },
  
  { id: '5', position: { x: 250, y: 580 }, data: { label: 'L2 Normalization' }, style: { background: '#fff', border: '1px solid #333', fontSize: '11px' } },

  { id: '6', position: { x: 250, y: 650 }, data: { label: 'Output: Dense Vector (e.g., 1536-dim)' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];

export default function EmbeddingModelsArchitecture() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
        <Controls /><MiniMap /><Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}