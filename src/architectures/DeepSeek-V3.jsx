// src/architectures/DeepSeek-V3.jsx
import React from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  getBezierPath,
  MarkerType,
} from 'react-flow-renderer';



/* 
  Custom Node for Embedding Layers 
  Variants:
  - 'left': top, bottom, and right handle.
  - 'middle': handles on all four sides.
  - 'right': top, bottom, and left handle.
*/
const EmbeddingNode = ({ data }) => {
  const embeddingStyle = {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #000000', // Unified border for all embedding nodes
    borderRadius: '5px',
    backgroundColor: 'transparent', // Transparent background for all embedding nodes
    width: '120px', // Unified width for all embedding nodes
  };

  return (
    <div style={embeddingStyle}>
      {data.label}
      <Handle type="target" position="top" id="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" id="bottom" style={{ background: '#555' }} />
      <Handle type="source" position="left" id="left" style={{ background: '#555' }} />
      <Handle type="target" position="right" id="right" style={{ background: '#555' }} />
    </div>
  );
};

/* 
  Custom Node for Output Heads 
  Variants:
  - 'left': top, bottom, and right handle.
  - 'middle': handles on all four sides.
  - 'right': top, bottom, and left handle.
*/
const OutputNode = ({ data }) => {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'transparent',
        width: '110px',
      }}
    >
      {data.label}
      <Handle type="target" position="top" id="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" id="bottom" style={{ background: '#555' }} />
      <Handle type="source" position="left" id="left" style={{ background: '#555' }} />
      <Handle type="target" position="right" id="right" style={{ background: '#555' }} />
    </div>
  );
};

// Register the custom node types
const nodeTypes = {
  embedding: EmbeddingNode,
  output: OutputNode,
};

const initialNodes = [
  // === INPUT TOKENS & TARGET TOKENS ===
  {
    id: 'inputTokens',
    data: { label: 'Input Tokens' },
    position: { x: 60, y: 30 },
    style: { 
      width: 120, 
      textAlign: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#ffdab9', // peach for token embeddings
    },
  },
  {
    id: 'targetTokens',
    data: { label: 'Target Tokens' },
    position: { x: 60, y: 600 },
    style: { 
      width: 120, 
      textAlign: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#ffdab9', // peach for token embeddings
    },
  },

  // === MAIN MODEL (left) ===
  {
    id: 'embeddingLayerMain',
    type: 'embedding',
    data: { label: 'Embedding Layer (shared)', variant: 'shared' },
    position: { x: -150, y: 125 },
    style: { 
      width: 142, 
      textAlign: 'center', 
      backgroundColor: '#edffb0', // yellow for positional embeddings
    }
  },
  {
    id: 'transformerBlocks',
    data: { label: 'Transformer Block × L' },
    position: { x: -160, y: 250 },
    style: {
      width: 160,
      height: 80,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#81b6f7', // blue for transformer
    },
  },
  {
    id: 'outputHeadMain',
    type: 'output',
    data: { label: 'Output Head', variant: 'left' },
    position: { x: -155, y: 425 },
    style: {
      textAlign: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000', 
      borderRadius: '5px',
      backgroundColor: '#bea9fc', // purple for final layer
    },
  },
  {
    id: 'mainCrossEntropy',
    data: { label: 'Cross-Entropy Loss (Main)' },
    position: { x: -160, y: 500 },
    style: { 
      width: 160, 
      textAlign: 'center', 
      backgroundColor: '#95e6af', // green for softmax
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
    },
  },

  // === MTP MODULE 1 (middle) ===
  {
    id: 'embeddingLayerMTP1',
    type: 'embedding',
    data: { label: 'Embedding Layer (shared)', variant: 'middle' },
    position: { x: 50, y: 125 },
    style: { 
      width: 142, 
      textAlign: 'center', 
      backgroundColor: '#edffb0', // yellow for positional embeddings
    },
  },
  {
    id: 'transformerBlockMTP1',
    data: { label: 'Transformer Block' },
    position: { x: 61, y: 350 },
    style: { 
      width: 120, 
      textAlign: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#81b6f7', // blue for transformer
    },
  },
  {
    id: 'rmsNormMTP1',
    data: { label: 'RMSNorm' },
    position: { x: 71, y: 200 },
    style: { 
      width: 100, 
      textAlign: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#f7a881', // orange for add
    },
  },
  {
    id: 'linearProjectionMTP1',
    data: { label: 'Linear Projection' },
    position: { x: 61, y: 275 },
    style: { 
      width: 120, 
      textAlign: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#d8bfd8', // lavender for linear
    },
  },
  {
    id: 'outputHeadMTP1',
    type: 'output',
    data: { label: 'Output Head', variant: 'middle' },
    position: { x: 46, y: 425 },
    style: { 
      backgroundColor: '#bea9fc', // purple for final layer
    }
  },
  {
    id: 'mtp1CrossEntropy',
    data: { label: 'Cross-Entropy Loss (MTP1)' },
    position: { x: 41, y: 500 },
    style: { 
      width: 160, 
      textAlign: 'center', 
      backgroundColor: '#95e6af', // green for softmax
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
    },
  },

  // === MTP MODULE 2 (right) ===
  {
    id: 'embeddingLayerMTP2',
    type: 'embedding',
    data: { label: 'Embedding Layer (shared)', variant: 'right' },
    position: { x: 250, y: 125 },
    style: { 
      width: 142, 
      textAlign: 'center', 
      backgroundColor: '#edffb0', // yellow for positional embeddings
    },
  },
  {
    id: 'transformerBlockMTP2',
    data: { label: 'Transformer Block' },
    position: { x: 261, y: 350 },
    style: { 
      width: 120, 
      textAlign: 'center', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#81b6f7', // blue for transformer
    },
  },
  {
    id: 'linearProjectionMTP2',
    data: { label: 'Linear Projection' },
    position: { x: 261, y: 275 },
    style: { 
      width: 120, 
      textAlign: 'center', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#d8bfd8', // lavender for linear
    },
  },
  {
    id: 'rmsNormMTP2',
    data: { label: 'RMSNorm' },
    position: { x: 271, y: 200 },
    style: { 
      width: 100, 
      textAlign: 'center', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
      backgroundColor: '#f7a881', // orange for add
    },
  },
  {
    id: 'outputHeadMTP2',
    type: 'output',
    data: { label: 'Output Head', variant: 'right' },
    position: { x: 246, y: 425 },
    style: { 
      backgroundColor: '#bea9fc', // purple for final layer
    }
  },
  {
    id: 'mtp2CrossEntropy',
    data: { label: 'Cross-Entropy Loss (MTP2)' },
    position: { x: 241, y: 500 },
    style: { 
      width: 160, 
      textAlign: 'center', 
      backgroundColor: '#95e6af', // green for softmax
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '10px',
      whiteSpace: 'pre-wrap',
      padding: '10px',
      border: '1px solid #000000',
      borderRadius: '5px',
    },
  },
];

const initialEdges = [
  // Main flow edges
  {
    id: 'input-to-embedding-main',
    source: 'inputTokens',
    target: 'embeddingLayerMain',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'embedding-to-transformer-main',
    source: 'embeddingLayerMain',
    target: 'transformerBlocks',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'transformer-to-output-main',
    source: 'transformerBlocks',
    target: 'outputHeadMain',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'output-to-loss-main',
    source: 'outputHeadMain',
    target: 'mainCrossEntropy',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'loss-to-target',
    source: 'mainCrossEntropy',
    target: 'targetTokens',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  // MTP Module 1 edges
  {
    id: 'input-to-embedding-mtp1',
    source: 'inputTokens',
    target: 'embeddingLayerMTP1',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'embedding-to-rms-mtp1',
    source: 'embeddingLayerMTP1',
    target: 'rmsNormMTP1',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'rms-to-linear-mtp1',
    source: 'rmsNormMTP1',
    target: 'linearProjectionMTP1',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'linear-to-transformer-mtp1',
    source: 'linearProjectionMTP1',
    target: 'transformerBlockMTP1',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'transformer-to-output-mtp1',
    source: 'transformerBlockMTP1',
    target: 'outputHeadMTP1',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'output-to-loss-mtp1',
    source: 'outputHeadMTP1',
    target: 'mtp1CrossEntropy',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'loss-to-target-mtp1',
    source: 'mtp1CrossEntropy',
    target: 'targetTokens',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  // MTP Module 2 edges
  {
    id: 'input-to-embedding-mtp2',
    source: 'inputTokens',
    target: 'embeddingLayerMTP2',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'embedding-to-rms-mtp2',
    source: 'embeddingLayerMTP2',
    target: 'rmsNormMTP2',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'rms-to-linear-mtp2',
    source: 'rmsNormMTP2',
    target: 'linearProjectionMTP2',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'linear-to-transformer-mtp2',
    source: 'linearProjectionMTP2',
    target: 'transformerBlockMTP2',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'transformer-to-output-mtp2',
    source: 'transformerBlockMTP2',
    target: 'outputHeadMTP2',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'output-to-loss-mtp2',
    source: 'outputHeadMTP2',
    target: 'mtp2CrossEntropy',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
  {
    id: 'loss-to-target-mtp2',
    source: 'mtp2CrossEntropy',
    target: 'targetTokens',
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#ff0000',
    },
  },
];

// Custom edge with red color and arrow marker
const RedArrowEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={{ ...style, stroke: '#ff0000', strokeWidth: 2 }}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

// Register custom edge type
const edgeTypes = {
  redArrow: RedArrowEdge,
};

const DeepSeekV3 = () => {
  // Use React Flow's hooks to manage nodes and edges state
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [, , onEdgesChange] = useEdgesState(initialEdges);

  // Process edges to use the custom red arrow edge
  const processedEdges = initialEdges.map(edge => ({
    ...edge,
    animated: true,
    type: !edge.id.includes('info') ? 'redArrow' : undefined,
    style: edge.id.includes('info') ? { stroke: '#4D6BFE' } : undefined,
    markerEnd: !edge.id.includes('info') ? {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#ff0000',
    } : undefined
  }));

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={processedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default DeepSeekV3;
