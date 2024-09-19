import { loadCultureFiles } from '../common/culture-loader';
/**
 * Getting started -  Html Node
 */

import {
    Diagram, UndoRedo, PortVisibility, SnapConstraints, ConnectorBridging, LineRouting, DiagramConstraints, NodeModel, ConnectorModel
} from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo, LineRouting, ConnectorBridging);

(window as any).default = (): void => {
    loadCultureFiles();

    let nodes: NodeModel[] = [
        {
            id: 'start', offsetX: 115, offsetY: 110, shape: { type: 'Flow', shape: 'Terminator' },
            ports: [{ id: 'port1', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden }],
            style: { fill: '#D5535D' }, annotations: [{ content: 'Start', style: { color: 'white' } }]
        },
        {
            id: 'process', offsetX: 115, offsetY: 255, shape: { type: 'Flow', shape: 'Process' },
            style: { fill: '#65B091' }, annotations: [{ content: 'Process', style: { color: 'white' } }]
        },
        {
            id: 'document', offsetX: 115, offsetY: 400, shape: { type: 'Flow', shape: 'Document' },
            ports: [{ id: 'port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden }],
            annotations: [{ content: 'Document', style: { color: 'white' } }], style: { fill: '#5BA5F0' }
        },
        {
            id: 'decision', offsetX: 390, offsetY: 110, shape: { type: 'Flow', shape: 'Decision' },
            style: { fill: '#9A8AF7' }, annotations: [{ content: 'Decision', style: { color: 'white' } }]
        },
        {
            id: 'document2', offsetX: 390, offsetY: 255, shape: { type: 'Flow', shape: 'Document' },
            style: { fill: '#5BA5F0' }, annotations: [{ content: 'Document', style: { color: 'white' } }]
        },
        {
            id: 'end', offsetX: 390, offsetY: 400, shape: { type: 'Flow', shape: 'Terminator' },
            style: { fill: '#D5535D' }, annotations: [{ content: 'End', style: { color: 'white' } }]
        },
        {
            id: 'process2', offsetX: 640, offsetY: 110, shape: { type: 'Flow', shape: 'Process' },
            style: { fill: '#65B091' }, annotations: [{ content: 'Process', style: { color: 'white' } }]
        },
        {
            id: 'card', offsetX: 640, offsetY: 255,
            shape: { type: 'Flow', shape: 'Card' },
            style: { fill: '#76C3F0' },
            annotations: [{ content: 'Card', style: { color: 'white' } }],
            ports: [
                { id: 'port1', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
                { id: 'port2', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden }
            ],
        }
    ];
    let connectors: ConnectorModel[] = [
        { id: 'Connector1', sourceID: 'start', targetID: 'process', },
        { id: 'Connector2', sourceID: 'process', targetID: 'document' },
        { id: 'Connector3', sourceID: 'document', targetID: 'end' },
        { id: 'Connector4', sourceID: 'start', targetID: 'decision' },
        { id: 'Connector5', sourceID: 'decision', targetID: 'process2' },
        { id: 'Connector6', sourceID: 'process2', targetID: 'card' },
        { id: 'Connector7', sourceID: 'process', targetID: 'document2' },
        { id: 'Connector8', sourceID: 'document2', targetID: 'card' },
        { id: 'Connector9', sourceID: 'start', sourcePortID: 'port1', targetID: 'card', targetPortID: 'port1' },
        { id: 'Connector10', sourceID: 'card', sourcePortID: 'port2', targetID: 'document', targetPortID: 'port1' }
    ];
    // Function to set default values for nodes in the diagram
    function getNodeDefaults(node: NodeModel): NodeModel {
        node.height = 50; // Default height for nodes
        if (node.id === 'decision') {
            node.height = 70; // Special height for nodes with id 'decision'
        }
        node.width = 120; // Default width for nodes
        node.style = { strokeColor: 'transparent' }; // Default style with transparent stroke color
        return node;
    }

    // Function to set default values for connectors in the diagram
    function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.type = 'Orthogonal'; // Connector type set to Orthogonal
        connector.style = { strokeColor: '#707070', strokeWidth: 1.25 }; // Connector style with specific stroke color and width
        connector.targetDecorator = { style: { fill: '#707070', strokeColor: '#707070' } }; // Target decorator style
        return connector;
    }

    // Initialize the diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', // Full width of the parent container
        height: '600px', // Height of the diagram
        nodes: nodes, // Array of nodes for the diagram (assumed to be defined elsewhere)
        connectors: connectors, // Array of connectors for the diagram (assumed to be defined elsewhere)
        constraints: DiagramConstraints.Default | DiagramConstraints.Bridging | DiagramConstraints.LineRouting,
        // Constraints including default, bridging, and line routing
        snapSettings: { constraints: SnapConstraints.None }, // Snap settings with snapping disabled
        getNodeDefaults: getNodeDefaults, // Callback function to customize node defaults
        getConnectorDefaults: getConnectorDefaults, // Callback function to customize connector defaults
        created: onCreated // Callback function called when diagram is created
    });

    // Append the diagram to the element with id 'diagram'
    diagram.appendTo('#diagram');

    // Function called when diagram is created
    function onCreated(): void {
        diagram.fitToPage(); // Fit the diagram to the page
    }
};

