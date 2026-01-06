import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  // Text branch
  {
    id: '1',
    data: { label: 'Raw Text Input' },
    position: { x: -75, y: 0 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#ffdab9', // peach
    },
  },
  {
    id: '2',
    data: { label: 'Text Preprocessing\n(Cleaning, Tokenization, Embedding)' },
    position: { x: -125, y: 100 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#edffb0', // yellow
        width: 250
    },
  },
  // Image branch
  {
    id: '3',
    data: { label: 'Raw Image Input' },
    position: { x: 225, y: 0 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#ffdab9', // peach
    },
  },
  {
    id: '4',
    data: { label: 'Image Preprocessing\n(Feature Extraction & Encoding)' },
    position: { x: 175, y: 100},
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#edffb0', // yellow
        width: 250
    },
  },
  // Fusion
  {
    id: '5',
    data: { label: 'Multimodal Fusion\n(Cross-Modal Attention)' },
    position: { x: 90, y: 250 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#f7a881', // orange
    },
  },
  // Core Transformer Backbone
  {
    id: '6',
    data: { label: 'Core Transformer Backbone\n(Multi-head Self-Attention, Feed-Forward,\nExtended Context up to 200K tokens)' },
    position: { x: 15, y: 400 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#81b6f7', // blue
        width: 300
    },
  },
  // Domain-Specific Fine-Tuning
  {
    id: '7',
    data: { label: 'Domain-Specific Fine-Tuning\n(Scientific, Legal, Financial Data)' },
    position: { x: -200, y: 250 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#d8bfd8', // lavender
        width: 250
    },
  },
  // Alignment layer
  {
    id: '8',
    data: { label: 'Alignment Layer\n(Constitutional AI)' },
    position: { x: 90, y: 500 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#d8bfd8', // lavender
    },
  },
  // Final Output
  {
    id: '9',
    data: { label: 'Final Text Output' },
    position: { x: 90, y: 600 },
    style: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '10px',
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        padding: '10px',
        border: '1px solid #aaa',
        borderRadius: '5px',
        backgroundColor: '#95e6af', // green
    },
  },
];

const initialEdges = [
  // Text branch flow
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  // Image branch flow
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  // Fusion step: merging text and image information
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  // Core transformer processing
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  // Domain-specific fine-tuning feeds into core processing
  { id: 'e7-6', source: '7', target: '6', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  // Alignment layer applied after processing
  { id: 'e6-8', source: '6', target: '8', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
  // Final output generation
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#ff0000' }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#ff0000' } },
];

function Claude3OpusFlow() {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Claude3OpusFlow;
