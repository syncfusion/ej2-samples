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
    function CreateConnector(
        name: string, source: string, target: string, content: string, type?: Segments,
        direction?: Direction, targePort?: string, length?: number): ConnectorModel {
        let connector: ConnectorModel = {};
        connector.id = name;
        connector.sourceID = source;
        connector.targetID = target;
        connector.style = { strokeWidth: 2 };
        let annotation: PathAnnotationModel = {};
        annotation.content = content;
        annotation.style = { fill: 'white' };
        connector.annotations = [annotation];
        connector.style.strokeColor = '#8D8D8D';
        connector.targetDecorator = {};
        connector.targetDecorator.style = {};
        connector.targetDecorator.style.strokeColor = '#8D8D8D';
        connector.targetDecorator.style.fill = '#8D8D8D';
        if (targePort) {
            connector.targetPortID = targePort;
        }
        let segment: OrthogonalSegmentModel = {};
        if (type) {
            connector.type = type;
            segment.direction = direction;
            segment.type = type;
            segment.length = length;
            connector.segments = [segment];
        }
        return connector;
    }

    function CreateNodes(
        name: string, offsetX: number, offsetY: number, shape: FlowShapes, content: string,
        width: number, height: number, ports?: PointPortModel[]): NodeModel {
        let node: NodeModel = {};
        node.id = name;
        node.offsetX = offsetX;
        node.width = 150;
        node.height = 50;
        node.offsetY = offsetY;
        let annotations: ShapeAnnotationModel = {};
        annotations.content = content;
        node.annotations = [annotations];
        node.shape = { type: 'Flow', shape: shape };
        node.style = { fill: '#FBF6E1', strokeColor: '#E8DFB6', strokeWidth: 2 };
        if (ports) {
            node.ports = ports;
        }
        return node;
    }

    let selectedButton: string = 'LinksConnected';
    let nodes: NodeModel[] = [];
    let port1: PointPortModel = { id: 'port1', offset: { x: 0.5, y: 1 } };
    let port: PointPortModel = { id: 'port', offset: { x: 1, y: 0.5 } };
    nodes.push(CreateNodes('node1', 100, 125, 'Terminator', 'Begin', 100, 35));
    nodes.push(CreateNodes('node2', 300, 125, 'Process', 'Specify collection', 120, 25, [port]));
    nodes.push(CreateNodes('node3', 500, 125, 'Decision', 'Particulars \n required?', 100, 50, [port1]));
    nodes.push(CreateNodes('node4', 730, 125, 'Process', 'Specify particulars', 90, 25));
    nodes.push(CreateNodes('node5', 500, 225, 'Process', 'Design collection', 100, 25, [port]));
    nodes.push(CreateNodes('node6', 500, 320, 'Process', 'Cluster of events', 100, 25));
    nodes.push(CreateNodes('node7', 500, 420, 'Process', 'Start the process', 100, 25));
    nodes.push(CreateNodes('node8', 730, 320, 'Process', 'Record and analyze \n results', 170, 25, [port]));
    nodes.push(CreateNodes('node9', 730, 420, 'Terminator', 'End ', 100, 35));

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

    radioButton = new RadioButton({ label: 'Adjacent nodes', change: buttonChange, name: 'radio', value: 'NodesReachable' });
    radioButton.appendTo('#NodesReachable');


    function buttonChange(args: ChangeEventArgs): void {
        applyChanges((args.event.srcElement as HTMLElement).id );	
        selectedButton =(args.event.srcElement as HTMLElement).id;
    }

    function applyChanges(id: string): void {
        Unhighlight();
        switch (id) {
            case 'LinksInto':
                linkedIn();
                break;
            case 'LinksOutOf':
                LinksOut();
                break;
            case 'LinksConnected':
                LinksConnector();
                break;
            case 'NodesInto':
                NodesIn();
                break;
            case 'NodesOutOf':
                NodesOut();
                break;
            case 'NodesConnected':
                NodesConnect();
                break;
            case 'NodesReachable':
                NodeReachable();
                break;
        }
    }
    function linkedIn(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).inEdges;
            for (let i: number = 0; i < node.length; i++) {
                let index: number = diagram.connectors.indexOf(diagram.nameTable[node[i]]);
                highLightedObjects.push(node[i]);
                diagram.connectors[index].style.strokeColor = '#1413F8';
                diagram.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
                diagram.connectors[index].targetDecorator.style.fill = '#1413F8';
                diagram.dataBind();
            }
        }
    }

    function LinksOut(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).outEdges;
            for (let i: number = 0; i < node.length; i++) {
                let index: number = diagram.connectors.indexOf(diagram.nameTable[node[i]]);
                highLightedObjects.push(node[i]);
                diagram.connectors[index].style.strokeColor = '#1413F8';
                diagram.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
                diagram.connectors[index].targetDecorator.style.fill = '#1413F8';
                diagram.dataBind();
            }
        }
    }

    function LinksConnector(): void {
        LinksOut();
        linkedIn();
    }

    function NodesIn(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).inEdges;
            for (let i: number = 0; i < node.length; i++) {
                let nodeId: string = diagram.nameTable[node[i]].sourceID;
                highLightedObjects.push(nodeId);
                let index: number = diagram.nodes.indexOf(diagram.nameTable[nodeId]);
                diagram.nodes[index].style.strokeColor = '#1413F8';
                diagram.dataBind();
            }
        }
    }

    function NodesOut(): void {
        if (diagram.selectedItems.nodes.length) {
            let node: string[] = (diagram.selectedItems.nodes[0] as Node).outEdges;
            for (let i: number = 0; i < node.length; i++) {
                let nodeId: string = diagram.nameTable[node[i]].targetID;
                highLightedObjects.push(nodeId);
                let index: number = diagram.nodes.indexOf(diagram.nameTable[nodeId]);
                diagram.nodes[index].style.strokeColor = '#1413F8';
                diagram.dataBind();
            }
        }
    }


    function NodesConnect(): void {
        NodesOut();
        NodesIn();
    }


    function NodeReachable(): void {
        if (diagram.selectedItems.nodes.length) {
            let connectors: string[] = (diagram.selectedItems.nodes[0] as Node).outEdges;
            let nodeList: string[] = foundNode(connectors, []);
            for (let i: number = 0; i < nodeList.length; i++) {
                let index: number = diagram.connectors.indexOf(diagram.nameTable[nodeList[i]]);
                highLightedObjects.push(nodeList[i]);
                diagram.connectors[index].style.strokeColor = '#1413F8';
                diagram.connectors[index].targetDecorator.style.strokeColor = '#1413F8';
                diagram.connectors[index].targetDecorator.style.fill = '#1413F8';
                diagram.dataBind();
            }
        }
    }

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

    function Unhighlight(): void {
        for (let i: number = highLightedObjects.length - 1; i >= 0; i--) {
            if (diagram.nameTable[highLightedObjects[i]] instanceof Node) {
                let index: number = diagram.nodes.indexOf(diagram.nameTable[highLightedObjects[i]]);
                diagram.nodes[index].style.strokeColor = '#E8DFB6';
                diagram.dataBind();
            } else {
                let index: number = diagram.connectors.indexOf(diagram.nameTable[highLightedObjects[i]]);
                diagram.connectors[index].style.strokeColor = '#8D8D8D';
                diagram.connectors[index].targetDecorator.style.strokeColor = '#8D8D8D';
                diagram.connectors[index].targetDecorator.style.fill = '#8D8D8D';
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
