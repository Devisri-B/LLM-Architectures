import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, MarkerType } from 'react-flow-renderer';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Text Input' }, position: { x: -50, y: 0 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#ffdab9',
}, },


  { id: '2', type: 'input', data: { label: 'Image Input' }, position: { x: 125, y: 0 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#ffdab9',
}, },


  { id: '3', type: 'default', data: { label: 'Text Encoder' }, position: { x: -50, y: 125 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#edffb0',
}, },
  
  
  { id: '4', type: 'default', data: { label: 'Image Encoder' }, position: { x: 125, y: 125 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#edffb0',
}, },
  
  
  { id: '5', type: 'default', data: { label: 'Multimodal Integration' }, position: { x: 50, y: 250 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#f7a881',
}, },
  
  
  { id: '6', type: 'default', data: { label: 'Transformer Backbone\n(with Mixture-of-Experts)' }, position: { x: 25, y: 350 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#81b6f7',
    width: 200
}, },
  
  
  { id: '7', type: 'default', data: { label: 'Retrieval-Augmented Module' }, position: { x: 50, y: 450 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#d8bfd8',
}, },
  
  
  { id: '8', type: 'default', data: { label: 'Response Decoder' }, position: { x: 50, y: 550 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#d8bfd8',
}, },
  
  
  { id: '9', type: 'output', data: { label: 'Output' }, position: { x: 50, y: 650 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#95e6af',
}, },
  
  
  { id: '10', type: 'default', data: { label: 'Feedback Loop\n(Reinforcement Learning)' }, position: { x: 300, y: 550 }, 
  style: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    backgroundColor: '#d8bfd8',
    width: 200
}, },
];

const initialEdges = [
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e3-5a', 
    source: '3', 
    target: '5', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e4-5b', 
    source: '4', 
    target: '5', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e5-6', 
    source: '5', 
    target: '6', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e6-7', 
    source: '6', 
    target: '7', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e7-8', 
    source: '7', 
    target: '8', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e8-9', 
    source: '8', 
    target: '9', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  // Feedback loop edges
  { 
    id: 'e9-10', 
    source: '8', 
    target: '10', 
    animated: true,
    style: { stroke: '#ff0000' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
  { 
    id: 'e10-8', 
    source: '10', 
    target: '8', 
    animated: true, 
    style: { stroke: '#ff0000', strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' }
  },
];

const ArchitectureFlow = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

export default ArchitectureFlow;
