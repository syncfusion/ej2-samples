import { loadCultureFiles } from '../common/culture-loader';
/**
 * Print and Export
 */

import { Diagram, NodeModel, ConnectorModel, ShapeAnnotationModel, Segments, Node, SnapConstraints } from '@syncfusion/ej2-diagrams';
import {
    Direction,
    PathAnnotationModel,
    OrthogonalSegmentModel,
    PointPortModel,
    ISelectionChangeEventArgs
} from '@syncfusion/ej2-diagrams';
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { FlowShapes } from '@syncfusion/ej2/diagrams';

enableRipple(true);

let diagram: Diagram;


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize the connectors object with basic properties.
    function CreateConnector(
        name: string, source: string, target: string, content: string, type?: Segments,
        direction?: Direction, targePort?: string, length?: number): ConnectorModel {
        let connector: ConnectorModel = {};
        connector.id = name;
        connector.sourceID = source;
        connector.targetID = target;
        if (targePort) {
            connector.targetPortID = targePort;
        }
        connector.style = { strokeWidth: 2,strokeColor: '#8D8D8D' };
        let annotation: PathAnnotationModel = {};
        annotation.content = content;
        annotation.style = { fill: 'white' };
        connector.annotations = [annotation];
        connector.targetDecorator = { style: { strokeColor: '#8D8D8D', fill: '#8D8D8D' } };
       
        if (type) {
            connector.type = type;
            let segment: OrthogonalSegmentModel = { type: type, direction: direction, length: length };
            connector.segments = [segment];
        }
        return connector;
    }

    //Initialize the node object with basic properties.
    function CreateNodes(
        name: string, offsetX: number, offsetY: number, shape: FlowShapes, content: string,
        width: number, height: number, ports?: PointPortModel[]): NodeModel {
        let node: NodeModel = {};
        node.id = name;
        node.offsetX = offsetX;
        node.width = 150;
        node.height = 50;
        node.offsetY = offsetY;
        node.shape = { type: 'Flow', shape: shape };
        node.style = { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 };
        let annotations: ShapeAnnotationModel = {};
        node.annotations = [annotations];
        annotations.content = content;
        if (ports) {
            node.ports = ports;
        }
        return node;
    }

    let port1: PointPortModel = { id: 'port1', offset: { x: 0.5, y: 1 } };
    let port: PointPortModel = { id: 'port', offset: { x: 1, y: 0.5 } };
    let selectedButton: string = 'LinksConnected';

    // Initialize Diagram Nodes
    let nodes: NodeModel[] = [];
    nodes.push(CreateNodes('node1', 100, 125, 'Terminator', 'Begin', 100, 35));
    nodes.push(CreateNodes('node2', 300, 125, 'Process', 'Specify collection', 120, 25, [port]));
    nodes.push(CreateNodes('node3', 500, 125, 'Decision', 'Particulars \n required?', 100, 50, [port1]));
    nodes.push(CreateNodes('node4', 730, 125, 'Process', 'Specify particulars', 90, 25));
    nodes.push(CreateNodes('node5', 500, 225, 'Process', 'Design collection', 100, 25, [port]));
    nodes.push(CreateNodes('node6', 500, 320, 'Process', 'Cluster of events', 100, 25));
    nodes.push(CreateNodes('node7', 500, 420, 'Process', 'Start the process', 100, 25));
    nodes.push(CreateNodes('node8', 730, 320, 'Process', 'Record and analyze \n results', 170, 25, [port]));
    nodes.push(CreateNodes('node9', 730, 420, 'Terminator', 'End ', 100, 35));

    // Initialize diagram connectors
    let connectors: ConnectorModel[] = [];
    connectors.push(CreateConnector('connector1', 'node1', 'node2', ''));
    connectors.push(CreateConnector('connector2', 'node2', 'node3', ''));
    connectors.push(CreateConnector('connector3', 'node3', 'node4', 'Yes'));
    connectors.push(CreateConnector('connector4', 'node3', 'node5', 'No'));
    connectors.push(CreateConnector('connector5', 'node5', 'node6', ''));
    connectors.push(CreateConnector('connector6', 'node6', 'node7', ''));
    connectors.push(CreateConnector('connector7', 'node8', 'node6', ''));
    connectors.push(CreateConnector('connector8', 'node7', 'node9', ''));
    connectors.push(CreateConnector('connector10', 'node4', 'node5', '', 'Orthogonal', 'Bottom', 'port', 220));

    //initialization of the Diagram.
    diagram = new Diagram({
        width: '100%', height: '600px', nodes: nodes, connectors: connectors,
        snapSettings: { constraints: SnapConstraints.None }
    });
    diagram.appendTo('#diagram');

    let highLightedObjects: string[] = [];
    let radioButton: RadioButton = new RadioButton({
        label: 'None', name: 'radio', value: 'UnhighlightAll', change: buttonChange,
    });
    radioButton.appendTo('#UnhighlightAll');

    radioButton = new RadioButton({ label: 'Incoming connections', change: buttonChange, name: 'radio', value: 'LinksInto' });
    radioButton.appendTo('#LinksInto');

    radioButton = new RadioButton({ label: 'Outgoing connections', change: buttonChange, name: 'radio', value: 'LinksOutOf' });
    radioButton.appendTo('#LinksOutOf');

    radioButton = new RadioButton({
        label: 'Incoming and outgoing connections', change: buttonChange, name: 'radio',
        value: 'LinksConnected', checked: true
    });
    radioButton.appendTo('#LinksConnected');

    radioButton = new RadioButton({ label: 'Incoming nodes', change: buttonChange, name: 'radio', value: 'NodesInto' });
    radioButton.appendTo('#NodesInto');

    radioButton = new RadioButton({ label: 'Outgoing nodes', change: buttonChange, name: 'radio', value: 'NodesOutOf' });
    radioButton.appendTo('#NodesOutOf');

    radioButton = new RadioButton({ label: 'Incoming and outgoing nodes', change: buttonChange, name: 'radio', value: 'NodesConnected' });
    radioButton.appendTo('#NodesConnected');

    radioButton = new RadioButton({ label: 'Flow of Execution', change: buttonChange, name: 'radio', value: 'NodesReachable' });
    radioButton.appendTo('#NodesReachable');


    function buttonChange(args: ChangeEventArgs): void {
        applyChanges((args.event.srcElement as HTMLElement).id );	
        selectedButton =(args.event.srcElement as HTMLElement).id;
    }

    //Function to apply changes based on selection.
    function applyChanges(id: string): void {
        Unhighlight();
        switch (id) {
            case 'LinksInto':
                highlightIncomingConnections();
                break;
            case 'LinksOutOf':
                highlightOutgoingConnections();
                break;
            case 'LinksConnected':
                highlightIncomingConnections();
                highlightOutgoingConnections();
                break;
            case 'NodesInto':
                highlightIncomingNodes();
                break;
            case 'NodesOutOf':
                highlightOutgoingNodes();
                break;
            case 'NodesConnected':
                highlightIncomingNodes();
                highlightOutgoingNodes();
                break;
            case 'NodesReachable':
                highlightReachableNodes();
                break;
        }
    }

    // Highlight connectors
    function highlightConnectors(edges: string[]): void {
        edges.forEach(edge => {
            let index = diagram.connectors.indexOf(diagram.nameTable[edge]);
            highLightedObjects.push(edge);
            let connector = diagram.connectors[index];
            connector.style.strokeColor = '#1413F8';
            connector.targetDecorator.style.strokeColor = '#1413F8';
            connector.targetDecorator.style.fill = '#1413F8';
            diagram.dataBind();
        });
    };

    // Function to display Incoming connectors.
    function highlightIncomingConnections(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).inEdges;
            highlightConnectors(node);
        }
    }

    // Function to display outgoing connectors.
    function highlightOutgoingConnections(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).outEdges;
            highlightConnectors(node);
        }
    }

    // Highlight Nodes
    function highlightNodes(edges: string[], edgeType: 'sourceID' | 'targetID'): void {
        edges.forEach(edge => {
            let nodeId: string = diagram.nameTable[edge][edgeType];
            highLightedObjects.push(nodeId);
            let index: number = diagram.nodes.indexOf(diagram.nameTable[nodeId]);
            diagram.nodes[index].style.strokeColor = '#1413F8';
            diagram.dataBind();
        });
    };

    // Function to display incoming nodes.
    function highlightIncomingNodes(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).inEdges;
            highlightNodes(node, 'sourceID');
        }
    }

    // Function to display the outgoing nodes.
    function highlightOutgoingNodes(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).outEdges;
            highlightNodes(node, 'targetID');
        }
    }

    //Function to display the flow of execution.
    function highlightReachableNodes(): void {
        if (diagram.selectedItems.nodes.length) {
            let connectors: string[] = (diagram.selectedItems.nodes[0] as Node).outEdges;
            let nodeList: string[] = foundNode(connectors, []);
            highlightConnectors(nodeList);
        }
    }

    //Function to find the connected nodes.
    function foundNode(list: string[], nodeList: string[]): string[] {
        for (let i: number = 0; i < list.length; i++) {
            let connector: ConnectorModel = diagram.nameTable[list[i]];
            if (nodeList.indexOf(connector.id) > -1) {
                break;
            }
            if (!connector.annotations[0] || (connector.annotations[0] && connector.annotations[0].content !== 'No')) {
                nodeList.push(connector.id);
            }
            if (diagram.nameTable[connector.targetID].outEdges.length) {
                if (list.indexOf(connector.targetID) === -1) {
                    foundNode(diagram.nameTable[connector.targetID].outEdges, nodeList);
                }
            }

        }
        return nodeList;
    }

    //Function to unhighlight the highlighted objects.
    function Unhighlight(): void {
        for (let i: number = highLightedObjects.length - 1; i >= 0; i--) {
            if (diagram.nameTable[highLightedObjects[i]] instanceof Node) {
                let index: number = diagram.nodes.indexOf(diagram.nameTable[highLightedObjects[i]]);
                diagram.nodes[index].style.strokeColor = '#E8DFB6';
                diagram.dataBind();
            } else {
                let index: number = diagram.connectors.indexOf(diagram.nameTable[highLightedObjects[i]]);
                var connector=diagram.connectors[index];
                connector.style.strokeColor = '#8D8D8D';
                connector.targetDecorator.style.strokeColor = '#8D8D8D';
                connector.targetDecorator.style.fill = '#8D8D8D';
                diagram.dataBind();
            }
        }
        highLightedObjects = [];
    }

    diagram.selectionChange = (arg: ISelectionChangeEventArgs) => {
        applyChanges(selectedButton);
    };
    diagram.select([diagram.nodes[2]]);
};
