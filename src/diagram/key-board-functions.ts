import { loadCultureFiles } from '../common/culture-loader';
/**
 * Key Board Interaction sample
 */

import {
    Diagram, NodeModel, UndoRedo, Node, DataBinding, Keys, KeyModifiers, DiagramContextMenu,
    HierarchicalTree, CommandManagerModel, ConnectorModel, SnapConstraints, CommandModel
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
Diagram.Inject(UndoRedo, DiagramContextMenu, HierarchicalTree, DataBinding);
import * as Data from './diagram-data.json';

export interface DataInfo {
    [key: string]: string;
}

// Holds an instance of the DiagramComponent for global access within the class
let diagram: Diagram;

// Sets the default values of nodes
function setNodeDefaults(node: NodeModel): NodeModel {
    if (!node.children) {
        node.shape = { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 };
        node.width = 70;
        node.height = 70;
    }
    return node;
}

// Configures the command manager with custom and modified keyboard shortcuts
function getCommandManagerSettings(): CommandManagerModel {
    return {
        commands: [
            createCommand("customGroup", Keys.G, KeyModifiers.Control, () => groupSelectedItems(), canGroupItems),
            createCommand("customUnGroup", Keys.U, KeyModifiers.Control, () => unGroupItems(), canUnGroupItems),
            createCommand("navigationDown", Keys.Down, undefined, () => navigateLevels(true), alwaysTrue),
            createCommand("navigationUp", Keys.Up, undefined, () => navigateLevels(false), alwaysTrue),
            createCommand("navigationLeft", Keys.Left, undefined, () => navigateToSiblings(false), alwaysTrue),
            createCommand("navigationRight", Keys.Right, undefined, () => navigateToSiblings(true), alwaysTrue)
        ]
    };
}

// Creates a command with specified properties
function createCommand(name: string, key: Keys, keyModifiers: KeyModifiers, execute: () => void, canExecute: () => boolean): CommandModel {
    return { name, gesture: { key, keyModifiers }, canExecute, execute };
}

// Checks if grouping of selected items is possible
function canGroupItems(): boolean {
    return diagram.selectedItems.nodes.length > 0 || diagram.selectedItems.connectors.length > 0;
}

// Groups the selected items in the diagram
function groupSelectedItems(): void {
    diagram.group();
}

// Checks if ungrouping of selected items is possible
function canUnGroupItems(): boolean {
    return diagram.selectedItems.nodes[0]?.children !== undefined;
}

// Ungroups the selected items in the diagram
function unGroupItems(): void {
    diagram.unGroup();
}

// Always returns true, used as a default for command execution
function alwaysTrue(): boolean {
    return true;
}

// Navigates to the child or parent node of the selected node
function navigateLevels(isParent: boolean): void {
    let selectedNode: Node = diagram.selectedItems.nodes[0] as Node;
    if (selectedNode) {
        let connectorId: string = isParent ? selectedNode.outEdges[0] : selectedNode.inEdges[0];
        let altNode: NodeModel[] = isParent ? getChildNode(connectorId) : getParentNode(connectorId);
        selectNode(altNode);
    }
}

// Navigates to the sibling node of the selected node based on direction
function navigateToSiblings(isRightSibling: boolean): void {
    let selectedNode: Node = diagram.selectedItems.nodes[0] as Node;
    if (selectedNode) {
        let connectorId: string = selectedNode.inEdges[0];
        let altConnectorId: string = '';
        let parentNode: NodeModel = getParentNode(connectorId)[0];
        if (parentNode) {
            for (let i: number = 0; i < (parentNode as Node).outEdges.length; i++) {
                if ((parentNode as Node).outEdges[i] === connectorId) {
                    altConnectorId = isRightSibling ? (parentNode as Node).outEdges[i + 1] : (parentNode as Node).outEdges[i - 1];
                }
            }
            let siblingNode: NodeModel[] = getChildNode(altConnectorId);
            selectNode(siblingNode);
        }
    }
}

// Retrieves child node elements based on connector ID
function getChildNode(connectorId: string): NodeModel[] {
    let childNode: NodeModel[] = [];
    let connector: ConnectorModel = diagram.getObject(connectorId) as ConnectorModel;
    if (connector) {
        childNode.push(diagram.getObject(connector.targetID) as NodeModel);
    }
    return childNode;
}

// Retrieves parent node elements based on connector ID
function getParentNode(connectorId: string): NodeModel[] {
    let parentNode: NodeModel[] = [];
    let connector: ConnectorModel = diagram.getObject(connectorId) as ConnectorModel;
    if (connector) {
        parentNode.push(diagram.getObject(connector.sourceID) as NodeModel);
    }
    return parentNode;
}

// Selects the node
function selectNode(node: NodeModel[]): void {
    if (node && node.length > 0) {
        diagram.clearSelection();
        diagram.select(node);
    }
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    diagram = new Diagram({
        //Initializes diagram control
        width: '100%', height: 645,
        snapSettings: { constraints: SnapConstraints.None },
        contextMenuSettings: { show: true },
        //Sets the default values of nodes
        getNodeDefaults: setNodeDefaults,
        //Configrues hierarchical tree layout
        layout: { type: 'HierarchicalTree' },
        //Configures data source
        dataSourceSettings: {
            id: 'id', parentId: 'ancestor', dataSource: new DataManager((Data as any).keyBoardData),
            //binds the external data with node
            doBinding: (nodeModel: NodeModel, data: DataInfo) => {
                nodeModel.annotations = [
                    {
                        /* tslint:disable:no-string-literal */
                        content: data['id'],
                        style: { color: 'white' }
                    }
                ];
                nodeModel.style = {
                    strokeColor: 'transparent',
                    /* tslint:disable:no-string-literal */
                    fill: data['fill']
                };
            }
        },
        commandManager: getCommandManagerSettings()
    });
    diagram.appendTo('#diagram');
};
