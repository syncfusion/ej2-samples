import { loadCultureFiles } from '../common/culture-loader';
/**
 * UML activity sample
 */

// Importing needed dependencies for diagram
import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, SymbolPalette, DiagramContextMenu, StrokeStyleModel,
    DecoratorModel, PointModel, SymbolInfo, PortVisibility, SnapConstraints, PointPortModel
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
import { Shapes, UmlActivityShapes } from '@syncfusion/ej2/diagrams';

Diagram.Inject(UndoRedo, DiagramContextMenu);

let diagram: Diagram;
let palette: SymbolPalette;
let isMobile: boolean;

// Initializes an array of UML activity shapes for the symbol palette
const umlActivityShapes: NodeModel[] = [
    'Action', 'Decision', 'MergeNode', 'InitialNode', 'FinalNode', 'ForkNode',
    'JoinNode', 'TimeEvent', 'AcceptingEvent', 'SendSignal', 'ReceiveSignal',
    'StructuredNode', 'Note'
].map(shape => ({ id: shape, shape: { type: 'UmlActivity', shape } }));

// Defines a base connector symbol to standardize connector creation
const baseConnector: Partial<ConnectorModel> = {
    sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
    targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
    style: { strokeWidth: 2, strokeColor: '#757575' }
};

// Initializes connector symbols with varying styles for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    { ...baseConnector, id: 'Link1', type: 'Orthogonal' },
    { ...baseConnector, id: 'Link2', type: 'Orthogonal', style: { ...baseConnector.style, strokeDashArray: '4 4' } },
    { ...baseConnector, id: 'Link3', type: 'Straight' }
];

// Determines the port positions for a node based on its type.
function getNodePorts(node: NodeModel): PointPortModel[] {
    if (node.id === 'ForkNode' || node.id === 'JoinNode') {
        // Ports for ForkNode and JoinNode
        let node2Ports: PointPortModel[] = [
            { id: 'port1', offset: { x: 0.2, y: 1 } },
            { id: 'port2', offset: { x: 0.8, y: 1 } },
            { id: 'port3', offset: { x: 0.2, y: 0 } },
            { id: 'port4', offset: { x: 0.8, y: 0 } },
        ];
        return node2Ports;
    } else {
        // Default ports for other nodes
        let ports: PointPortModel[] = [
            { id: 'portLeft', offset: { x: 0, y: 0.5 } },
            { id: 'portRight', offset: { x: 1, y: 0.5 } },
            { id: 'portBottom', offset: { x: 0.5, y: 1 } },
            { id: 'portTop', offset: { x: 0.5, y: 0 } },
        ];
        return ports;
    }
}

// Sets the default values for the symbols in the symbol palette
function setPaletteNodeDefaults(symbol: NodeModel): NodeModel {
    if (symbol.id === 'JoinNode') {
        symbol.width = 20; symbol.height = 50;
    } else if (symbol.id === 'ForkNode') {
        symbol.width = 50; symbol.height = 20;
    } else if (symbol.id === 'Decision' || symbol.id === 'MergeNode') {
        symbol.width = 50; symbol.height = 40;
    } else {
        symbol.width = 50; symbol.height = 50;
    }
    if (symbol.id === 'InitialNode' || symbol.id === 'FinalNode' || symbol.id === 'JoinNode' || symbol.id === 'ForkNode') {
        symbol.style.fill = '#757575';
    }
    symbol.style.strokeColor = '#757575';
    return symbol;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let bounds: ClientRect = document.getElementById('diagram-space').getBoundingClientRect();
    let centerX: number = bounds.width / 2;
    let middle: number = centerX - 50;
    let left: number = middle - 120;
    let right: number = middle + 120;

    // Creates a UML activity node with specified properties
    const createNode = (
        id: string,
        offsetX: number,
        offsetY: number,
        shapeType: UmlActivityShapes,
        width: number = 40,
        height: number = 40,
        content: string = ''
    ): NodeModel => ({
        id,
        width,
        height,
        offsetX,
        offsetY,
        shape: { type: "UmlActivity", shape: shapeType },
        annotations: content ? [{ content }] : []
    });

    // Initializes nodes representing the flow of a customer service call process
    let nodes: NodeModel[] = [
        createNode("Start", 300, 20, "InitialNode"),
        createNode("ReceiveCall", 300, 100, "Action", 105, 40, "Receive Customer Call"),
        createNode("ForkNode", 300, 170, "ForkNode", 70, 10),
        createNode("Determine", 190, 250, "Action", 105, 40, "Determine Type of Call"),
        createNode("Log", 410, 250, "Action", 105, 40, "Customer Logging a Call"),
        createNode("Decision", 190, 350, "Decision", 50, 50),
        createNode("transfer_sales", 100, 450, "Action", 105, 40, "Transfer the Call to Sales"),
        createNode("transfer_desk", 280, 450, "Action", 105, 40, "Transfer the Call to Help Desk"),
        createNode("MergeNode", 190, 540, "MergeNode", 50, 50),
        createNode("JoinNode", 300, 630, "JoinNode", 70, 10),
        createNode("CloseCall", 300, 710, "Action", 105, 40, "Close Call"),
        createNode("FinalNode", 300, 800, "FinalNode")
    ];

    // Creates a UML activity diagram connector with specified properties
    const createConnector = (
        id: string,
        sourceID: string,
        targetID: string,
        sourcePortID: string = "",
        targetPortID: string = "",
        additionalProps: any = {}
    ): ConnectorModel => ({
        id,
        sourceID,
        targetID,
        sourcePortID,
        targetPortID,
        ...additionalProps
    });

    // Defines common segments for connectors
    const commonSegments = {
        orthogonalShort: [{ type: "Orthogonal", length: 20, direction: "Bottom" }],
        orthogonalLongLeft: [{ type: "Orthogonal", length: 50, direction: "Left" }],
        orthogonalLongRight: [{ type: "Orthogonal", length: 50, direction: "Right" }],
        orthogonalBottom: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
    };

    // Initializes connectors for transitions between activities
    let connectors: ConnectorModel[] = [
        createConnector("connector1", "Start", "ReceiveCall"),
        createConnector("connector2", "ReceiveCall", "ForkNode"),
        createConnector("connector3", "ForkNode", "Determine", "port1", "portTop", {
            segments: [...commonSegments.orthogonalShort, ...commonSegments.orthogonalLongLeft]
        }),
        createConnector("connector4", "ForkNode", "Log", "port2", "portTop", {
            segments: [...commonSegments.orthogonalShort, ...commonSegments.orthogonalLongRight]
        }),
        createConnector("connector5", "Determine", "Decision"),
        createConnector("connector6", "Decision", "transfer_sales", "portLeft", "portTop", {
            shape: { type: "UmlActivity", flow: "Association" },
            annotations: [{
                id: "connector6Label", content: "type=New Customer", offset: 0.715,
                style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
            }]
        }),
        createConnector("connector7", "Decision", "transfer_desk", "portRight", "portTop", {
            shape: { type: "UmlActivity", flow: "Association" },
            annotations: [{
                id: "connector7Label", content: "type=Existing Customer", offset: 0.75,
                style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
            }]
        }),
        createConnector("connector8", "transfer_sales", "MergeNode", "portBottom", "portLeft", {
            segments: commonSegments.orthogonalBottom
        }),
        createConnector("connector9", "transfer_desk", "MergeNode", "portBottom", "portRight", {
            segments: commonSegments.orthogonalBottom
        }),
        createConnector("connector10", "MergeNode", "JoinNode", "portBottom", "port3"),
        createConnector("connector11", "Log", "JoinNode", "portBottom", "port4", {
            segments: [
                { type: "Orthogonal", length: 265, direction: "Bottom" },
                ...commonSegments.orthogonalLongLeft
            ]
        }),
        createConnector("connector12", "JoinNode", "CloseCall"),
        createConnector("connector13", "CloseCall", "FinalNode")
    ];

    // Initializes diagram control
    diagram = new Diagram({
        // sets the height and width of the diagram
        width: '100%', height: '100%',
        // sets the nodes and connectors of the diagram
        nodes: nodes, connectors: connectors,
        // sets snap settings to the diagram
        snapSettings: { constraints: SnapConstraints.None },
        //Sets the default values of a node
        getNodeDefaults: (node: NodeModel): NodeModel => {
            node.ports = getNodePorts(node);
            if (node.ports) {
                for (let i: number = 0; i < node.ports.length; i++) {
                    node.ports[i].visibility = PortVisibility.Hidden;
                }
            }
            if (node.id === 'Start' || node.id === 'ForkNode' || node.id === 'JoinNode' || node.id === 'FinalNode') {
                node.style.fill = '#444';
            }
            node.style.strokeColor = '#444';
            return node;
        },
        //Sets the default values of a Connector.
        getConnectorDefaults: (connector: ConnectorModel): void => {
            if (connector.id.indexOf('connector') !== -1) {
                connector.type = 'Orthogonal'; connector.cornerRadius = 10;
                connector.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
            }
        },

        // Function to add event listeners for Symbol palette to Mobile device
        created: (): void => {
            addEvents();
        }

    });
    diagram.appendTo('#diagram');

    //Initializes the symbol palette
    palette = new SymbolPalette({
        // sets the expandable mode of the symbol palette
        expandMode: 'Multiple',
        // sets the height and wodth of the symbol palette
        width: '100%', height: '505px',
        // sets the default values for the symbols in the symbol palette
        getNodeDefaults: setPaletteNodeDefaults,
        // sets the height and width of the symbols
        symbolHeight: 55, symbolWidth: 55,
        // sets the margin for the symbol
        symbolMargin: { left: 10, right: 10, top: 10, bottom: 10 },
        // sets the palettes to be displayed in the symbol palette
        palettes: [
            { id: 'umlActivity', expanded: true, symbols: umlActivityShapes, title: 'UML Shapes' },
            { id: 'Connector', expanded: true, symbols: connectorSymbols, title: 'Connectors' }
        ],
        getSymbolInfo: (symbol: NodeModel): SymbolInfo => { return { fit: true }; }

    });
    palette.appendTo('#symbolPalette');
};