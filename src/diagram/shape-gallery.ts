import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample for Shape gallery.
 */

import {
    Diagram, NodeModel, BpmnDiagrams, FlowShape, TextModel, FlowShapes, NodeConstraints, SnapConstraints
} from '@syncfusion/ej2-diagrams';

export interface GalleryInfo {
    type: string;
    shape: string;
    text: string;
}

Diagram.Inject(BpmnDiagrams);

// Function to create a basic shape object
function getBasicShape(shapeType: string, annotations: { content: string }[]): any {
    return {
        shape: {
            type: 'Basic',
            shape: shapeType
        },
        annotations
    };
}

// Define basic shape models
let basicShapeModel: any[] = [
    { 
        shape: { type: 'Text', content: 'Basic Shapes' },
        constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 16, fill: 'None', fontFamily: 'sans-serif', bold: true, strokeWidth: 0 },
    },
    getBasicShape('Rectangle', [{ content: 'Rectangle' }]),
    getBasicShape('Ellipse', [{ content: 'Ellipse' }]),
    getBasicShape('Triangle', [{ content: 'Triangle' }]),
    getBasicShape('Plus', [{ content: 'Plus' }]),
    getBasicShape('Star', [{ content: 'Star' }]),
    getBasicShape('Pentagon', [{ content: 'Pentagon' }]),
    getBasicShape('Heptagon', [{ content: 'Heptagon' }]),
    getBasicShape('Octagon', [{ content: 'Octagon' }]),
    getBasicShape('Trapezoid', [{ content: 'Trapezoid' }]),
    getBasicShape('Decagon', [{ content: 'Decagon' }]),
    getBasicShape('RightTriangle', [{ content: 'Right Triangle' }]),
    getBasicShape('Parallelogram', [{ content: 'Parallelogram' }])
];


//Function to get flowshapes.
function createFlowShape(shapeType: any,content: string): NodeModel {
    let flowshape: NodeModel = {
        shape: { type: 'Flow', shape: shapeType },
    annotations:[{content:content}] };
    return flowshape;
  }

  //Initialize the flowshapes for the symbol palatte
  let flowShapes: NodeModel[] = [
    { shape: { type: 'Text', content: 'Flow Shapes' }, constraints: NodeConstraints.PointerEvents,
    style: { fontSize: 16, fill: 'None', fontFamily: 'sans-serif', bold: true, strokeWidth: 0 }
  },
  createFlowShape('Terminator', 'Terminator'),
  createFlowShape('Process', 'Process'),
  createFlowShape('Decision', 'Decision'),
  createFlowShape('Document', 'Document'),
  createFlowShape('PreDefinedProcess', 'Predefined Process'),
  createFlowShape('PaperTap', 'Paper Tape'),
  createFlowShape('DirectData', 'Direct Data'),
  createFlowShape('SequentialData', 'Direct Data'),
  createFlowShape('Sort', 'Sort'),
  createFlowShape('MultiDocument', 'Multi-Document'),
  createFlowShape('Collate', 'Collate'),
  createFlowShape('SummingJunction', 'Summing Junction'),
  createFlowShape('Or', 'Or'),
  createFlowShape('InternalStorage', 'Internal Storage'),
  createFlowShape('Extract', 'Extract'),
  createFlowShape('ManualOperation', 'Manual Operation'),
  createFlowShape('Merge', 'Merge'),
  createFlowShape('OffPageReference', 'Off-Page Reference'),
  createFlowShape('SequentialAccessStorage', 'Sequential Access Storage'),
  createFlowShape('Data', 'Data'),
  createFlowShape('Card', 'Card')
  ];

// Function to create BPMN shape
function getBpmnShape(shapeType: string, annotations: { content: string }[], event?: { event: string, trigger: string }): any {
  const shape: any = {
      type: 'Bpmn',
      shape: shapeType
  };
  if (event) {
      shape.event = event;
  }
  return {
      shape,
      annotations
  };
}

// Define BPMN shape models
let bpmnShapeModel: any[] = [
  { 
      shape: { type: 'Text', content: 'BPMN Shapes' },
      constraints: NodeConstraints.PointerEvents,
      style: { fontSize: 16, fill: 'none', fontFamily: 'sans-serif', bold: true, strokeWidth: 0 },
  },
  getBpmnShape('Event', [{ content: 'Start Event' }], { event: 'Start', trigger: 'None' }),
  getBpmnShape('Event', [{ content: 'Intermediate Event' }], { event: 'Intermediate', trigger: 'None' }),
  getBpmnShape('Event', [{ content: 'End Event' }], { event: 'End', trigger: 'None' }),
  getBpmnShape('Gateway', [{ content: 'Gateway' }]),
  {
    shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
    annotations: [{ content: 'Task' }]
  },
  {
    shape: {type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'SubProcess',
            subProcess: {
                type: 'Transaction', transaction: {
                    success: { visible: false }, failure: { visible: false }, cancel: { visible: false }}
            }}},
    annotations: [{ content: 'Transaction' }]
  },
  getBpmnShape('Message', [{ content: 'Message' }]),
  getBpmnShape('DataObject', [{ content: 'Data Object' }]),
  getBpmnShape('DataSource', [{ content: 'Data Source' }]),
  getBpmnShape('Group', [{ content: 'Group' }]),
  getBpmnShape('TextAnnotation', [{ content: 'Text Annotation' }])
];


//create and return the Nodes collection.
function getNodes(): NodeModel[] {
    let nodes1: NodeModel[] = basicShapeModel.concat(flowShapes).concat(bpmnShapeModel);
    let offsetx: number = 60;
    let offsety: number = 50;
    let count: number = 1;
    for (let i: number = 0; i < nodes1.length; i++) {
        let node: NodeModel = nodes1[i];
        node.width = 40;
        node.height = 40;
        if (node.shape.type === 'Flow') {
            let shapeType: FlowShapes = (node.shape as FlowShape).shape;
            if (shapeType === 'Process' || shapeType === 'Terminator') {
                node.height = 20;
            } else if (shapeType === 'Decision') {
                node.height = 35;
            } else if (shapeType === 'Document' || shapeType === 'DirectData' ||
                shapeType === 'MultiDocument' || shapeType === 'PreDefinedProcess') {
                node.height = 30;
            }
        }
        node.offsetX = offsetx;
        node.offsetY = offsety;
        if (!(node.shape.type === 'Text')) {
            let label = node.annotations[0];
            label.verticalAlignment = 'Top';
            label.offset = { y: 1 };
            label.margin = { top: 10 };
            offsetx += 90;
            if (count % 10 === 0) {
                offsety = offsety + 100;
                offsetx = 60;
            }
            count++;
        }
        if (node.shape.type === 'Text') {
            offsetx = 60;
            offsety +=50;
            count = 1;
            node.width = 150;
            node.height = 100;
            node.offsetX = 90;
            if (!((node.shape as TextModel).content === 'Basic Shapes')) {
                node.offsetX = 90;
                node.offsetY = offsety + 50;
                offsety = offsety + 100;
            }
        }
    }
    return nodes1;
}

(window as any).default = (): void => {
    loadCultureFiles();
    let objects: NodeModel[] = getNodes();
    //Initialize diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '800px', snapSettings: { constraints: SnapConstraints.None },
        nodes: objects,
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage({ mode: 'Height' });
};
