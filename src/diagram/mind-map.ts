import { loadCultureFiles } from '../common/culture-loader';
/**
 * Mind-map sample
 */

// Importing necessary modules from '@syncfusion/ej2-diagrams' package
import {
    Diagram, ConnectorModel, Connector, Node, ConnectorConstraints, DataBinding,
    PointPortModel, PointPort, randomId, TextModel,
    PortVisibility, UserHandleModel, SelectorConstraints, ToolBase, MouseEventArgs, SnapConstraints,
    NodeModel, MindMap, HierarchicalTree, ISelectionChangeEventArgs, DiagramTools,
    NodeConstraints, Side, MarginModel, HorizontalAlignment, VerticalAlignment
} from '@syncfusion/ej2-diagrams';
import * as Data from './diagram-data.json';
import { DataManager, Query } from '@syncfusion/ej2-data';
// Injecting required modules
Diagram.Inject(DataBinding, MindMap, HierarchicalTree);

let items: DataManager = new DataManager((Data as any).mindMap, new Query().take(7));

let diagram: Diagram;


//sets node default value
function getNodeDefaults(obj: Node): Node {
    obj.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
    let empInfo: EmployeeInfo = obj.data as EmployeeInfo;
    if (empInfo.branch === 'Left' || empInfo.branch === 'Right'
        || empInfo.branch === 'Root') {
        obj.shape = { type: 'Basic', shape: 'Ellipse' }; obj.borderColor = 'black'; /* tslint:disable:no-string-literal */
        obj.style = {
            fill: empInfo.branch === 'Root' ? '#E74C3C' : '#F39C12', strokeColor: 'none',
            strokeWidth: 2
        };
        obj.annotations = [{
            content: empInfo.Label, margin: { left: 10, right: 10, top: 10, bottom: 10 },
            style: { color: 'white' }
        }];
        let port: PointPortModel[] = getPort();
        for (let i: number = 0; i < port.length; i++) {
            obj.ports.push(new PointPort(obj, 'ports', port[i], true));
        }
        hideUserHandle('Top');
    } else {
        let color: string; /* tslint:disable:no-string-literal */
        if (empInfo.branch === 'Right' || empInfo.branch === 'subRight') {
            color = '#8E44AD';
        } else {
            color = '#3498DB';
        }
        obj.shape = { type: 'Basic', shape: 'Rectangle' };
        obj.style = { fill: color, strokeWidth: 0 };
        obj.minWidth = 100;
        obj.height = 4;
        let port: PointPortModel[] = getPort();
        for (let i: number = 0; i < port.length; i++) {
            obj.ports.push(new PointPort(obj, 'ports', port[i], true));
        }
        obj.annotations = [{
            content: empInfo.Label, offset: { x: .5, y: 0 }, verticalAlignment: 'Bottom'
        }];
        (obj.shape as TextModel).margin = { left: 0, right: 0, top: 0, bottom: 0 };
    }
    return obj;
}
//sets connector default value
function getConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
    connector.type = 'Bezier';
    connector.targetDecorator = { shape: 'None' };
    connector.constraints &= ~ConnectorConstraints.Select;
    let sourceNode: Node = diagram.getObject(connector.sourceID) as Node;
    let targetNode: Node = diagram.getObject(connector.targetID) as Node;
    let nodeInfo: EmployeeInfo = (targetNode.data as EmployeeInfo);
    if (nodeInfo.branch === 'Right' || nodeInfo.branch === 'subRight') {
        connector.sourcePortID = sourceNode.ports[0].id;
        connector.targetPortID = targetNode.ports[1].id;
        connector.style = { strokeWidth: 5, strokeColor: '#8E44AD' };
    } else if (nodeInfo.branch === 'Left' || nodeInfo.branch === 'subLeft') {
        connector.sourcePortID = sourceNode.ports[1].id;
        connector.targetPortID = targetNode.ports[0].id;
        connector.style = { strokeWidth: 5, strokeColor: '#3498DB' };
    }
    return connector;
}
//creation of the Ports
function getPort(): PointPortModel[] {
    let port: PointPortModel[] = [
        {
            id: 'port1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'port2', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden,
            style: { fill: 'black' }
        }
    ];
    return port;
}

//Selectionchange event for Node and connector
function selectionChange(arg: ISelectionChangeEventArgs): void {
    if (arg.state === 'Changing') {
        if (arg.newValue[0] instanceof Node) {
            let empInfo: EmployeeInfo = ((arg.newValue[0] as Node).data as EmployeeInfo);
            for (let handle of diagram.selectedItems.userHandles) {
                handle.visible = true;
            }
            if (empInfo.branch === 'Left' || empInfo.branch === 'subLeft') {
                hideUserHandle('leftHandle');
                changeUserHandlePosition('leftHandle');
            } else if (empInfo.branch === 'Right' || empInfo.branch === 'subRight') {
                hideUserHandle('rightHandle');
                changeUserHandlePosition('rightHandle');
            } else if (empInfo.branch === 'Root') {
                hideUserHandle('delete');
            }
        } else {
            hideUserHandle('leftHandle');
            hideUserHandle('rightHandle');
            hideUserHandle('delete');
        }
    }
}

// Function to add a new node
function addNode(): NodeModel {
    let obj: NodeModel = {};
    obj.id = randomId();
    obj.data = {};
    (obj.data as EmployeeInfo).Label = 'Node';
    return obj;
}

// Function to add a new connector
function addConnector(source: NodeModel, target: NodeModel): ConnectorModel {
    let connector: ConnectorModel = {};
    connector.id = randomId();
    connector.sourceID = source.id; connector.targetID = target.id;
    return connector;
}

//Tool for Userhandles.
function getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (action === 'leftHandle') {
        tool = new LeftExtendTool(diagram.commandHandler);
    } else if (action === 'rightHandle') {
        tool = new RightExtendTool(diagram.commandHandler);
    } else if (action === 'delete') {
        tool = new DeleteClick(diagram.commandHandler);
    }
    return tool;
}


// Class definition for handling left extension tool
class LeftExtendTool extends ToolBase {
    //mouseDown event
    public mouseDown(args: MouseEventArgs): void {
        super.mouseDown(args);
        this.inAction = true;
    }
    //mouseUp event
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            let selectedObject: any = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    let node: NodeModel = addNode();
                    let empInfo: EmployeeInfo = selectedObject[0].data as EmployeeInfo;
                    if (empInfo.branch === 'Root') {
                        (node.data as EmployeeInfo).branch = 'Right';
                    } else if (empInfo.branch === 'Right' || empInfo.branch === 'subRight') {
                        (node.data as EmployeeInfo).branch = 'subRight';
                    }
                    let connector: ConnectorModel = addConnector(selectedObject[0], node);
                    diagram.clearSelection();
                    let newNode : Node = diagram.add(node) as Node;
                    diagram.add(connector);
                    diagram.doLayout();
                    diagram.bringIntoView(newNode.wrapper.bounds);
                    diagram.select([diagram.nameTable[newNode.id]]);
                    diagram.startTextEdit(diagram.selectedItems.nodes[0]);
                }
            }
        }
    }
}

// Class definition for handling right extension tool
class RightExtendTool extends ToolBase {
    //mouseDown event
    public mouseDown(args: MouseEventArgs): void {
        super.mouseDown(args);
        this.inAction = true;
    }
    //mouseUp event
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            let selectedObject: any = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    let node: NodeModel = addNode();
                    if ((selectedObject[0].data as EmployeeInfo).branch === 'Root') {
                        (node.data as EmployeeInfo).branch = 'Left';
                    } else if ((selectedObject[0].data as EmployeeInfo).branch === 'Left' ||
                        (selectedObject[0].data as EmployeeInfo).branch === 'subLeft') {
                        (node.data as EmployeeInfo).branch = 'subLeft';
                    }
                    let connector: ConnectorModel = addConnector(selectedObject[0], node);
                    diagram.clearSelection();
                    let newNode: Node = diagram.add(node) as Node;
                    diagram.add(connector);
                    diagram.doLayout();
                    diagram.bringIntoView(newNode.wrapper.bounds);
                    diagram.select([diagram.nameTable[newNode.id]]);
                    diagram.startTextEdit(diagram.selectedItems.nodes[0]);
                }
            }
        }
    }
}

// Class definition for handling delete tool
class DeleteClick extends ToolBase {
    //mouseDown event
    public mouseDown(args: MouseEventArgs): void {
        super.mouseDown(args);
        this.inAction = true;
    }
    //mouseup event
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            let selectedObject: any = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    let node: Node = selectedObject[0] as Node;
                    diagram.startGroupAction();
                    this.removeSubChild(node);
                    diagram.endGroupAction();
                }
                diagram.doLayout();
            }
        }
    }
    //Remove the subchild Elements
    private removeSubChild(node: Node): void {
        for (let i: number = node.outEdges.length - 1; i >= 0; i--) {
            let connector: Connector = diagram.getObject(node.outEdges[i]) as Connector;
            let childNode: Node = diagram.getObject(connector.targetID) as Node;
            if (childNode.outEdges.length > 0) {
                this.removeSubChild(childNode);
            } else {
                diagram.remove(childNode);
            }
        }
        diagram.remove(node);
    }
}
//hide the require userhandle.
function hideUserHandle(name: string): void {
    for (let handle of diagram.selectedItems.userHandles) {
        if (handle.name === name) {
            handle.visible = false;
        }
    }
}
let leftarrow: string = 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z';
let rightarrow: string = 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z';
let deleteicon: string = 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
    '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
    '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z';

let leftuserhandle: UserHandleModel = setUserHandle(//it is in dedicated line here.
    'leftHandle', leftarrow, 'Left', 1,
    { top: 0, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');
let rightuserhandle: UserHandleModel = setUserHandle(//it is in dedicated line here.
    'rightHandle', rightarrow, 'Right', 1,
    { top: 0, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
let deleteuserhandle: UserHandleModel = setUserHandle(//it is in dedicated line here.
    'delete', deleteicon, 'Top', 0.5,
    { top: 0, bottom: 10, left: 0, right: 0 }, 'Center', 'Center');
let handle: UserHandleModel[] = [leftuserhandle, rightuserhandle, deleteuserhandle];
//set and creation of the Userhandle.
function setUserHandle(//it is in dedicated line here.
    name: string, pathData: string, side: Side, offset: number, margin: MarginModel,
    HorizontalAlignment: HorizontalAlignment, VerticalAlignment: VerticalAlignment): UserHandleModel {
    let userhandle: UserHandleModel = {
        name: name, pathData: pathData, backgroundColor: 'black', pathColor: 'white', side: side,
        offset: offset, margin: margin, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment
    };
    return userhandle;
}
//Change the Position of the UserHandle.
function changeUserHandlePosition(change: string): void {
    for (let handle of diagram.selectedItems.userHandles) {
        if (handle.name === 'delete' && change === 'leftHandle') {
            applyHandle(handle, 'Left', { top: 0, bottom: 0, left: 0, right: 10 }, 'Left');

        } else if (handle.name === 'delete' && change === 'rightHandle') {
            applyHandle(handle, 'Right', { top: 0, bottom: 0, left: 10, right: 0 }, 'Right');
        }
    }
}
//set the value for UserHandle element.
function applyHandle(//it is in dedicated line here.
    handle: UserHandleModel, side: Side, margin: MarginModel, HorizontalAlignment: HorizontalAlignment): void {
    handle.side = side;
    handle.offset = 1;
    handle.margin = margin;
    handle.horizontalAlignment = HorizontalAlignment;
    handle.verticalAlignment = 'Top';
}

export interface EmployeeInfo {
    branch: string;
    color: string;
    Left: string;
    Right: string;
    Root: string;
    Label: string;
}
(window as any).default = (): void => {
    loadCultureFiles();
    //initialization of the Diagram.
    diagram = new Diagram({
        width: '100%', height: '550px',
        snapSettings: { constraints: SnapConstraints.None }, tool: DiagramTools.SingleSelect,
        layout: {
            type: 'MindMap',orientation:'Horizontal', getBranch: (node: Node) => {
                return ((node as Node).data as EmployeeInfo).branch;
            }, horizontalSpacing: 50
        },
        //Selectionchange event for Node and connector
        selectionChange: selectionChange,
        selectedItems: { constraints: SelectorConstraints.UserHandle, userHandles: handle },
        dataSourceSettings: { id: 'id', parentId: 'parentId', dataSource: items, root: String(1) },
        //sets node default value
        getNodeDefaults: getNodeDefaults,
        //sets connector default value 
        getConnectorDefaults: getConnectorDefaults,
        getCustomTool: getTool,
        scrollSettings:{
            padding: { left:50 ,right: 50 }
        },
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage();

};