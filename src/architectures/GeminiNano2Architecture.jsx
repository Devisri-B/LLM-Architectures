// components/models/GeminiNano2Architecture.jsx
import React from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Complex Mobile Task' }, style: { background: '#fff', border: '1px solid #333' } },
  
  // Capacity Tier
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'High-Capacity Edge Tier\n[More layers than Nano-1]' }, style: { background: '#e8eaf6', border: '1px solid #3f51b5' } },

  // The 3.25B Block
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Nano-2 Transformer (3.25B)' }, style: { width: 350, height: 280, background: 'rgba(197, 202, 233, 0.3)', border: '1px dashed #3949ab' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 40 }, parentNode: '3', data: { label: 'Standard GQA\n[Better quality than MQA]' }, style: { background: '#fff', width: 250 } },
  { id: '3b', position: { x: 50, y: 100 }, parentNode: '3', data: { label: 'Deeper Network Depth' }, style: { background: '#c5cae9', width: 250 } },
  { id: '3c', position: { x: 50, y: 160 }, parentNode: '3', data: { label: 'Hybrid Quantization\n[Mixed Precision support]' }, style: { background: '#ffab91', border: '1px solid #d84315', width: 250 } },

  { id: '4', position: { x: 250, y: 480 }, data: { label: 'Output: Complex Summarization / Translation' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-4', source: '3c', target: '4' },
];

export default function GeminiNano2Architecture() {
  // 2. Initialize state for this specific model
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // 3. Return the isolated ReactFlow instance
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}