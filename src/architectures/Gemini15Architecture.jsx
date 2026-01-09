// components/models/Gemini15Architecture.jsx
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
  // 1. Natively Multimodal Input (Strictly from text)
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Natively Multimodal Input\n(Text, Code, Images, Audio, Video)' }, style: { background: '#fff', border: '1px solid #333', width: 280 } },
  
  // 2. Efficient Attention (Replaces "Ring Attention" based on your text)
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Efficient Attention Mechanisms\n(e.g., Multi-Query Attention)\n[Handles 1M+ Context]' }, style: { background: '#e1bee7', border: '1px solid #7b1fa2', width: 300 } },

  // 3. The MoE Transformer (Core Innovation)
  { id: '3', position: { x: 200, y: 160 }, data: { label: 'Gemini 1.5 Transformer (MoE)' }, style: { width: 400, height: 350, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  { id: '3a', position: { x: 50, y: 30 }, parentNode: '3', data: { label: 'Learned Routing Function\n[Interleaves Data types]' }, style: { background: '#fff', width: 300 } },
  
  // 4. Multimodal Experts (Restored to show "Natively Multimodal" capability)
  { id: '3b', position: { x: 20, y: 100 }, parentNode: '3', data: { label: 'Text/Code Expert' }, style: { background: '#c8e6c9', width: 100, fontSize: '11px' } },
  { id: '3c', position: { x: 135, y: 100 }, parentNode: '3', data: { label: 'Vision Expert' }, style: { background: '#c8e6c9', width: 100, fontSize: '11px' } },
  { id: '3d', position: { x: 250, y: 100 }, parentNode: '3', data: { label: 'Audio/Video Expert' }, style: { background: '#c8e6c9', width: 110, fontSize: '11px' } },
  
  { id: '3e', position: { x: 50, y: 180 }, parentNode: '3', data: { label: 'Sparse Output Aggregation' }, style: { background: '#fff', width: 300 } },
  { id: '3f', position: { x: 50, y: 250 }, parentNode: '3', data: { label: 'RMSNorm & Residuals' }, style: { background: '#e8f5e9', width: 300 } },

  { id: '4', position: { x: 250, y: 550 }, data: { label: 'Output Generation' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  // Routing to specific modality experts
  { id: 'e3a-3b', source: '3a', target: '3b', animated: true, style: { stroke: '#2e7d32' } },
  { id: 'e3a-3c', source: '3a', target: '3c', animated: true, style: { stroke: '#2e7d32' } },
  { id: 'e3a-3d', source: '3a', target: '3d', animated: true, style: { stroke: '#2e7d32' } },
  // Aggregation
  { id: 'e3b-3e', source: '3b', target: '3e' },
  { id: 'e3c-3e', source: '3c', target: '3e' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  // Internal Flow
  { id: 'e3e-3f', source: '3e', target: '3f' },
  { id: 'e3f-4', source: '3f', target: '4' },
];

export default function Gemini15Architecture() {
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