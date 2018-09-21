/**
 * Default FlowShape sample
 */

import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, SymbolPalette,
    SymbolInfo, IDragEnterEventArgs, GridlinesModel, PaletteModel, FlowShapes, Node
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
//import { openPalette, closePalette, getClassList } from './styles/html-class';
Diagram.Inject(UndoRedo);

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    let bounds: ClientRect = document.getElementById('diagram-space').getBoundingClientRect();
    let centerX: number = bounds.width / 2;
    let interval: number[] = [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ];

    let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };
    // Initializes the nodes for the diagram
    let nodes: NodeModel[] = [
        {
            id: 'NewIdea', height: 60, offsetX: centerX - 50, offsetY: 80,
            shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{ content: 'Place Order' }]
        }, {
            id: 'Meeting', height: 60, offsetX: centerX - 50, offsetY: 160,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Start Transaction' }]
        }, {
            id: 'BoardDecision', height: 60, offsetX: centerX - 50, offsetY: 240,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Verification' }]
        }, {
            id: 'Project', height: 60, offsetX: centerX - 50, offsetY: 330,
            shape: { type: 'Flow', shape: 'Decision' }, annotations: [{ content: 'Credit card valid?' }]
        }, {
            id: 'End', height: 60, offsetX: centerX - 50, offsetY: 430,
            shape: { type: 'Flow', shape: 'Decision' }, annotations: [{ content: 'Funds available?' }]
        }, {
            id: 'node11', height: 60, offsetX: (centerX - 50) + 230, offsetY: 330,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Enter payment method' }]
        }, {
            id: 'transaction_entered', height: 60, offsetX: (centerX - 50), offsetY: 630,
            shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{ content: 'Log transaction' }]
        }, {
            id: 'node12', height: 60, offsetX: (centerX - 50) + 180, offsetY: 630,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Reconcile the entries' }]
        }, {
            id: 'transaction_completed', height: 60, offsetX: (centerX - 50), offsetY: 530,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Complete Transaction' }]
        }, {
            id: 'Data', height: 45, offsetX: (centerX - 50) - 190, offsetY: 530,
            shape: { type: 'Flow', shape: 'Data' }, annotations: [{ content: 'Send e-mail', margin: { left: 25, right: 25 } }]
        }, {
            id: 'node10', height: 70, offsetX: (centerX - 50) + 175, offsetY: 530,
            shape: { type: 'Flow', shape: 'DirectData' }, annotations: [{ content: 'Customer Database', margin: { left: 25, right: 25 } }]
        }
    ];

    //Initializes the connector for the diagram
    let connectors: ConnectorModel[] = [
        { id: 'connector1', sourceID: 'NewIdea', targetID: 'Meeting' },
        { id: 'connector2', sourceID: 'Meeting', targetID: 'BoardDecision' },
        { id: 'connector3', sourceID: 'BoardDecision', targetID: 'Project' },
        { id: 'connector4', sourceID: 'Project', annotations: [{ content: 'Yes', style: { fill: 'white' } }], targetID: 'End' },
        {
            id: 'connector5', sourceID: 'End',
            annotations: [{ content: 'Yes', style: { fill: 'white' } }], targetID: 'transaction_completed'
        },
        { id: 'connector6', sourceID: 'transaction_completed', targetID: 'transaction_entered' },
        { id: 'connector7', sourceID: 'transaction_completed', targetID: 'Data' },
        { id: 'connector8', sourceID: 'transaction_completed', targetID: 'node10' },
        { id: 'connector9', sourceID: 'node11', targetID: 'Meeting', segments: [{ direction: 'Top', type: 'Orthogonal', length: 120 }] },
        {
            id: 'connector10', sourceID: 'End', annotations: [{ content: 'No', style: { fill: 'white' } }],
            targetID: 'node11', segments: [{ direction: 'Right', type: 'Orthogonal', length: 100 }]
        },
        { id: 'connector11', sourceID: 'Project', annotations: [{ content: 'No', style: { fill: 'white' } }],  targetID: 'node11'  },
        { id: 'connector12', style: { strokeDashArray: '2,2' }, sourceID: 'transaction_entered', targetID: 'node12' }
    ];

    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '700px', nodes: nodes, connectors: connectors,
        snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines },
        //Sets the default values of a node
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of a connector
        getConnectorDefaults: getConnectorDefaults,
        //Sets the Node style for DragEnter element.
        dragEnter: dragEnter
    });
    diagram.appendTo('#diagram');

    //Initialize the flowshapes for the symbol palatte
    let flowShapes: NodeModel[] = [
        getFlowShape('Terminator', 'Terminator'),
        getFlowShape('Process', 'Process'),
        getFlowShape('Decision', 'Decision'),
        getFlowShape('Document', 'Document'),
        getFlowShape('PreDefinedProcess', 'PreDefinedProcess'),
        getFlowShape('PaperTap', 'PaperTap'),
        getFlowShape('DirectData', 'DirectData'),
        getFlowShape('SequentialData', 'SequentialData'),
        getFlowShape('Sort', 'Sort'),
        getFlowShape('MultiDocument', 'MultiDocument'),
        getFlowShape('Collate', 'Collate'),
        getFlowShape('Or', 'Or'),
        getFlowShape('Extract', 'Extract'),
        getFlowShape('Merge', 'Merge'),
        getFlowShape('OffPageReference', 'OffPageReference'),
        getFlowShape('SequentialAccessStorage', 'SequentialAccessStorage'),
        getFlowShape('Annotation', 'Annotation'),
        getFlowShape('Annotation2', 'Annotation2'),
        getFlowShape('Data', 'Data'),
        getFlowShape('Card', 'Card'),
        getFlowShape('Delay', 'Delay'),
    ];

    //Initializes connector symbols for the symbol palette
    let connectorSymbols: ConnectorModel[] = [
        {
            id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
        },
        {
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
        },
    ];

    let palettes: PaletteModel[] = [
        { id: 'flow', expanded: true, symbols: flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
        { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' }
    ];
    //Initializes the symbol palette

    let palette: SymbolPalette = new SymbolPalette({
        expandMode: 'Multiple', palettes: palettes,
        width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60,
        symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
        getNodeDefaults: getSymbolDefaults, getSymbolInfo: getSymbolInfo
    });
    palette.appendTo('#symbolpalette');

    addEvents();
};
//Sets the default values of a node
function getNodeDefaults(node: NodeModel): NodeModel {
    let obj: NodeModel = {};
    if (obj.width === undefined) {
        obj.width = 145;
    } else {
        let ratio: number = 100 / obj.width;
        obj.width = 100; obj.height *= ratio;
    }
    obj.style = { fill: '#357BD2', strokeColor: 'white' };
    obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
    //Set ports
    obj.ports = getPorts();
    return obj;
}

//Sets the default values of a connector
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    if (obj.id.indexOf('connector') !== -1) {
        obj.type = 'Orthogonal';
        obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
    }
    return obj;
}

//Sets the Node style for DragEnter element.
function dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
        let oWidth: number = obj.width;
        let oHeight: number = obj.height;
        let ratio: number = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
        obj.offsetX += (obj.width - oWidth) / 2;
        obj.offsetY += (obj.height - oHeight) / 2;
        obj.style = { fill: '#357BD2', strokeColor: 'white' };
    }
}

function getFlowShape(id: string, shapeType: FlowShapes): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
}

function getSymbolDefaults(symbol: NodeModel): void {
    if (symbol.id === 'Terminator' || symbol.id === 'Process' || symbol.id === 'Delay') {
        symbol.width = 80;
        symbol.height = 40;
    } else if (symbol.id === 'Decision' || symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
        symbol.id === 'PaperTap' || symbol.id === 'DirectData' || symbol.id === 'MultiDocument' || symbol.id === 'Data') {
        symbol.width = 50;
        symbol.height = 40;
    } else {
        symbol.width = 50;
        symbol.height = 50;
    }
}

function getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
}

//Create and add ports for node.
function getPorts(): PointPortModel[] {
    let ports: PointPortModel[] = [
        { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
        { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
        { id: 'port3', shape: 'Circle', offset: { x: 1, y: .5 } },
        { id: 'port4', shape: 'Circle', offset: { x: .5, y: 0 } }
    ];
    return ports;
}