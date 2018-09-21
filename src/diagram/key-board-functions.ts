/**
 * Key Board Interaction sample
 */

 import {
    Diagram, NodeModel, UndoRedo, Node, DataBinding, Keys, KeyModifiers, DiagramContextMenu,
    HierarchicalTree, CommandManagerModel, ConnectorModel, SnapConstraints
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { keyBoardData, DataInfo } from './diagram-data';
Diagram.Inject(UndoRedo, DiagramContextMenu, HierarchicalTree, DataBinding);

let diagram: Diagram;

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    diagram = new Diagram({
        //Initializes diagram control
        width: '100%', height: 645,
        snapSettings: { constraints: SnapConstraints.None },
        contextMenuSettings: { show: true },
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Configrues hierarchical tree layout
        layout: { type: 'HierarchicalTree' },
        //Configures data source
        dataSourceSettings: {
            id: 'id', parentId: 'ancestor', dataManager: new DataManager(keyBoardData as JSON[]),
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

//Sets the default values of nodes
function getNodeDefaults(obj: NodeModel): NodeModel {
    if (!obj.children) {
        obj.shape = { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 };
        obj.width = 70;
        obj.height = 70;
    }
    return obj;
}

//Custom command for Diagraming elements.
function getCommandManagerSettings(): CommandManagerModel {
    let commandManager: CommandManagerModel = {
        commands: [{
            name: 'customGroup',
            canExecute: (): boolean => {
                if (diagram.selectedItems.nodes.length > 0 || diagram.selectedItems.connectors.length > 0) {
                    return true;
                }
                return false;
            },
            execute: (): void => {
                diagram.group();
            },
            gesture: {
                key: Keys.G,
                keyModifiers: KeyModifiers.Control
            }
        },
        {
            name: 'customUnGroup',
            canExecute: (): boolean => {
                if (diagram.selectedItems.nodes[0].children) {
                    return true;
                }
                return false;
            },
            execute: (): void => {
                diagram.unGroup();
            },
            gesture: {
                key: Keys.U,
                keyModifiers: KeyModifiers.Control
            }
        },
        {
            name: 'navigationDown',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                navigateLevels(true);
            },
            gesture: { key: Keys.Down },
        },
        {
            name: 'navigationUp',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                navigateLevels(false);
            },
            gesture: { key: Keys.Up },
        },
        {
            name: 'navigationLeft',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                navigateToSiblings(true);
            },
            gesture: { key: Keys.Right },
        },
        {
            name: 'navigationRight',
            canExecute: (): boolean => {
                return true;
            },
            execute: (): void => {
                navigateToSiblings(false);
            },
            gesture: { key: Keys.Left },
        }]
    };
    return commandManager;
}

//Navigation for Child Node or parent Node
function navigateLevels(isParent: boolean): void {
    let node: Node = diagram.selectedItems.nodes[0] as Node;
    if (node) {
        let connectorId: string = isParent ? node.outEdges[0] : node.inEdges[0];
        let altNode: NodeModel[] = isParent ? getNode(connectorId, false) : getNode(connectorId, true);
        selectNode(altNode);
    }
}
//Navigate to left or right Sibling Node 
function navigateToSiblings(isRightSibling: boolean): void {
    let child: Node = diagram.selectedItems.nodes[0] as Node;
    if (child) {
        let connectorId: string = child.inEdges[0];
        let altConnectorId: string = '';
        let parent: NodeModel[] = getNode(connectorId, true);
        if (parent && parent.length > 0) {
            for (let i: number = 0; i < (parent[0] as Node).outEdges.length; i++) {
                if ((parent[0] as Node).outEdges[i] === connectorId) {
                    altConnectorId = isRightSibling ? (parent[0] as Node).outEdges[i + 1] : (parent[0] as Node).outEdges[i - 1];
                }
            }
            let sibling: NodeModel[] = getNode(altConnectorId, false);
            selectNode(sibling);
        }
    }
}
//Get node elements
function getNode(name: string, isParent: boolean): NodeModel[] {
    let node: NodeModel[] = [];
    let connector: ConnectorModel = diagram.getObject(name) as ConnectorModel;
    if (connector) {
        node.push(diagram.getObject(isParent ? (connector.sourceID) : (connector.targetID)) as NodeModel);
    }
    return node;
}
//draw selector.
function selectNode(node: NodeModel[]): void {
    if (node && node.length > 0) {
        diagram.clearSelection();
        diagram.select(node);
    }
}