import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Input: Multimodal Tokens (Text/Image/Audio)' }, style: { background: '#fff', border: '1px solid #333', width: 250 } },
  
  // Embedding Layer
  { id: '2', position: { x: 250, y: 80 }, data: { label: 'Unified Latent Embedding + Learned Positional Encoding' }, style: { background: '#e1bee7', width: 250 } },

  // GPT-4 Decoder Block (Grouped for clarity)
  { id: '3', position: { x: 100, y: 160 }, data: { label: 'GPT-4 Transformer Block (Repeated Nx times)' }, style: { width: 550, height: 380, background: 'rgba(232, 245, 233, 0.5)', border: '1px dashed #2e7d32' }, type: 'group' },
  
  { id: '3a', position: { x: 75, y: 40 }, parentNode: '3', data: { label: 'Masked Multi-Query Attention (MQA)\n[Long Context Support]' }, style: { background: '#fff', width: 400 } },
  
  { id: '3b', position: { x: 75, y: 110 }, parentNode: '3', data: { label: 'LayerNorm (Pre-Norm Configuration)' }, style: { background: '#f5f5f5', width: 400 } },

  // The Mixture of Experts (MoE) - The "Secret Sauce" of GPT-4
  { id: '3c', position: { x: 50, y: 180 }, parentNode: '3', data: { label: 'Sparse Mixture of Experts (MoE) MLP\n[Router selects 2 out of 16 Experts]' }, style: { background: '#fff9c4', border: '2px solid #fbc02d', width: 450, fontWeight: 'bold' } },
  
  { id: '3d', position: { x: 75, y: 260 }, parentNode: '3', data: { label: 'Residual Connections' }, style: { background: '#fff', width: 400 } },
  { id: '3e', position: { x: 75, y: 310 }, parentNode: '3', data: { label: 'SwiGLU Activation Function' }, style: { background: '#e1bee7', width: 400 } },

  // Output
  { id: '4', position: { x: 250, y: 580 }, data: { label: 'Linear Layer' }, style: { background: '#fff', width: 150 } },
  { id: '5', position: { x: 250, y: 640 }, data: { label: 'Softmax' }, style: { background: '#fff', width: 150 } },
  { id: '6', position: { x: 250, y: 700 }, data: { label: 'Output: Next Token Probability' }, style: { background: '#ccffcc', border: '1px solid #333' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3a', source: '2', target: '3a' },
  { id: 'e3a-3b', source: '3a', target: '3b' },
  { id: 'e3b-3c', source: '3b', target: '3c' },
  { id: 'e3c-3d', source: '3c', target: '3d' },
  { id: 'e3d-3e', source: '3d', target: '3e' },
  { id: 'e3e-4', source: '3e', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];

const GPT4ArchitectureFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default GPT4ArchitectureFlow;
