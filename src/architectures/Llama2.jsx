// src/architectures/Llama2Architecture.jsx
import React, { memo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * Default node styling applied to every node.
 */
const defaultNodeStyle = {
  fontFamily: 'monospace',
  fontWeight: 'bold',
  fontSize: '10px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  padding: '10px',
  border: '1px solid #aaa',
  borderRadius: '5px',
  backgroundColor: '#ffdab9',
};

/**
 * Custom node for a Transformer Block (the repeated Nx block).
 * It shows:
 * - RMSNorm
 * - Self-Attention (Multi-Query with Rotary Positional Embeddings)
 * - RMSNorm
 * - Feed-Forward Network (SwiGLU)
 */
const transformerBlockStyles = {
  container: {
    width: 240,
    minHeight: 120,
    border: '2px dashed #888',
    borderRadius: 6,
    padding: '10px',
    backgroundColor: '#81b6f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    marginBottom: 8,
    fontSize: '12px',
    color: '#333',
  },
  subBlock: {
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '4px',
    width: '90%',
    marginBottom: '4px',
    fontSize: '10px',
    background: '#e8f3ff',
  },
};

const TransformerBlockNode = memo(() => {
  return (
    <div style={transformerBlockStyles.container}>
      <div style={transformerBlockStyles.title}>Transformer Block (Nx)</div>
      <div style={transformerBlockStyles.subBlock}>RMSNorm</div>
      <div style={transformerBlockStyles.subBlock}>
        Self-Attention
        <br />(Multi-Query, Rotary)
      </div>
      <div style={transformerBlockStyles.subBlock}>RMSNorm</div>
      <div style={transformerBlockStyles.subBlock}>
        FFN
        <br />(SwiGLU)
      </div>
    </div>
  );
});

// Register the custom node type.
const nodeTypes = {
  transformerBlock: TransformerBlockNode,
};

/**
 * Define initial nodes representing each component of the Llama 2.0 architecture.
 */
const initialNodes = [
  {
    id: 'input',
    type: 'input',
    position: { x: 250, y: 50 },
    data: { label: 'Input Tokens' },
    style: { ...defaultNodeStyle, backgroundColor: '#ffdab9' },
  },
  {
    id: 'embedding',
    position: { x: 250, y: 150 },
    data: { label: 'Embedding Layer' },
    style: { ...defaultNodeStyle, backgroundColor: '#edffb0' },
  },
  {
    id: 'transformer',
    type: 'transformerBlock',
    position: { x: 190, y: 210 },
    data: {},
    style: { ...defaultNodeStyle, width: 240, height: 150, backgroundColor: '#81b6f7' },
  },
  {
    id: 'finalRMSNorm',
    position: { x: 250, y: 420 },
    data: { label: 'Final RMSNorm' },
    style: { ...defaultNodeStyle, backgroundColor: '#d8bfd8' },
  },
  {
    id: 'linear',
    position: { x: 250, y: 500 },
    data: { label: 'Linear Projection' },
    style: { ...defaultNodeStyle, backgroundColor: '#d8bfd8' },
  },
  {
    id: 'softmax',
    position: { x: 250, y: 580 },
    data: { label: 'Softmax' },
    style: { ...defaultNodeStyle, backgroundColor: '#95e6af' },
  },
  {
    id: 'output',
    type: 'output',
    position: { x: 250, y: 660 },
    data: { label: 'Predicted Tokens' },
    style: { ...defaultNodeStyle, backgroundColor: '#95e6af' },
  },
];

/**
 * Define edges connecting the components.
 */
const initialEdges = [
  {
    id: 'e1-2',
    source: 'input',
    target: 'embedding',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'e2-3',
    source: 'embedding',
    target: 'finalRMSNorm',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'e3-4',
    source: 'transformer',
    target: 'finalRMSNorm',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'e4-5',
    source: 'finalRMSNorm',
    target: 'linear',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'e5-6',
    source: 'linear',
    target: 'softmax',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
  {
    id: 'e6-7',
    source: 'softmax',
    target: 'output',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' },
  },
];

/**
 * Main component rendering the Llama 2.0 architecture diagram.
 */
function Llama2Architecture() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes); // setNodes unused
  const [edges, , onEdgesChange] = useEdgesState(initialEdges); // setEdges unused

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default Llama2Architecture;
