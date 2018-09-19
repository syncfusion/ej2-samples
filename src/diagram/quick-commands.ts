/**
 * UserHandle
 */

import {
    Diagram, DataBinding, MindMap, HierarchicalTree, NodeModel, ConnectorModel, UserHandleModel,
    Side, SelectorConstraints, SnapConstraints, MoveTool, MouseEventArgs, cloneObject, randomId,
    IElement, ToolBase
} from '@syncfusion/ej2-diagrams';
Diagram.Inject(DataBinding, MindMap, HierarchicalTree);

export interface EmployeeInfo {
    Role: string;
    color: string;
}

let diagram: Diagram;

//Defines the diagram content
// tslint:disable-next-line:max-func-body-length 
(window as any).default = (): void => {

    //Defines the nodes collection in diagram
    let nodes: NodeModel[] = [
        {
            id: 'NewIdea', width: 150, height: 60, offsetX: 300, offsetY: 60, shape: { type: 'Flow', shape: 'Terminator' },
            annotations: [{ content: 'New idea identified' }],
        }, {
            id: 'Meeting', width: 150, height: 60, offsetX: 300, offsetY: 155, shape: { type: 'Flow', shape: 'Process' },
            annotations: [{ content: 'Meeting with board' }]
        }, {
            id: 'BoardDecision', width: 150, height: 110, offsetX: 300, offsetY: 280, shape: { type: 'Flow', shape: 'Decision' },
            annotations: [{ content: 'Board decides \n whether to proceed' }]
        }, {
            id: 'Project', width: 150, height: 100, offsetX: 300, offsetY: 430, shape: { type: 'Flow', shape: 'Decision' },
            annotations: [{ content: 'Find Project manager' }]
        }, {
            id: 'End', width: 150, height: 60, offsetX: 300, offsetY: 555, shape: { type: 'Flow', shape: 'Process' },
            annotations: [{ content: 'Implement and Deliver' }]
        }, {
            id: 'Decision', width: 250, height: 60, offsetX: 550, offsetY: 60, shape: { type: 'Flow', shape: 'Card' },
            annotations: [{ content: 'Decision process for new software ideas' }]
        }, {
            id: 'Reject', width: 150, height: 60, offsetX: 550, offsetY: 280, shape: { type: 'Flow', shape: 'Process' },
            annotations: [{ content: 'Reject' }]
        }, {
            id: 'Resources', width: 150, height: 60, offsetX: 550, offsetY: 430, shape: { type: 'Flow', shape: 'Process' },
            annotations: [{ content: 'Hire new resources' }]
        }
    ];

    //Defines the connectors collection in diagram
    let connectors: ConnectorModel[] = [
        { id: 'connector1', type: 'Straight', sourceID: 'NewIdea', targetID: 'Meeting' },
        { id: 'connector2', type: 'Straight', sourceID: 'Meeting', targetID: 'BoardDecision' },
        { id: 'connector3', type: 'Straight', sourceID: 'BoardDecision', targetID: 'Project' },
        { id: 'connector4', type: 'Straight', sourceID: 'Project', targetID: 'End' },
        { id: 'connector5', type: 'Straight', sourceID: 'BoardDecision', targetID: 'Reject' },
        { id: 'connector6', sourceID: 'Project', targetID: 'Resources' }
    ];

    //Defines the user handle collection for nodes in diagram
    let handles: UserHandleModel[] = [{
        name: 'clone', pathData: 'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3,' +
            '0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z ' +
            'M68.5,72.5h-30V34.4h30V72.5z',
        visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    }];

    diagram = new Diagram({
        width: '100%', height: '600px', nodes: nodes, connectors: connectors,
        selectedItems: { constraints: SelectorConstraints.UserHandle, userHandles: handles },
        snapSettings: { constraints: SnapConstraints.None },
        //get Node default value 
        getNodeDefaults: getNodeDefaults,
        //get Node default value 
        getConnectorDefaults: getConnectorDefaults,
        //set CustomTool
        getCustomTool: getTool
    });
    diagram.appendTo('#diagram');
    diagram.select([diagram.nodes[0]]);
    diagram.fitToPage();
    document.getElementById('appearance').onclick = setHandleAppearance;
    document.getElementById('pattern').onclick = setHandlePattern;
};

//set Node default value 
function getNodeDefaults(node: NodeModel): NodeModel {
    let node1: NodeModel = {
        style: { fill: '#578CA9', strokeColor: 'none' },
        annotations : [{ style: { color: 'white' } }]
    };
    return node1;
}

//set Node default value
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    obj.type = 'Straight';
    return obj;
}

//Enable the clone Tool for UserHandle.
function getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (action === 'clone') {
        tool = new CloneTool(diagram.commandHandler);
    }
    return tool;
}

//set the position of the userhandle.
function setUserHandlePosition(offset: number, side: Side, target: HTMLElement): void {
    diagram.selectedItems.userHandles[0].offset = offset;
    diagram.selectedItems.userHandles[0].side = side;
    target.classList.add('e-selected-style');
}

//set the style of the userhandle.
function applyUserHandleStyle(bgcolor: string, target: HTMLElement): void {
    diagram.selectedItems.userHandles[0].backgroundColor = bgcolor;
    diagram.selectedItems.userHandles[0].pathColor = 'White';
    target.classList.add('e-selected-style');
}

//Change the postion of the UserHandle
function setHandleAppearance(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    let appearanceBlock: HTMLElement = document.getElementById('appearance');
    let selectedElement: HTMLCollectionOf<Element> =
        appearanceBlock.getElementsByClassName('e-selected-style') as HTMLCollectionOf<Element>;
    if (selectedElement.length) {
        selectedElement[0].classList.remove('e-selected-style');
    }
    if (target.className === 'image-pattern-style') {
        switch (target.id) {
            case 'left':
                setUserHandlePosition(0, 'Bottom', target);
                break;
            case 'right':
                setUserHandlePosition(1, 'Bottom', target);
                break;
            case 'topr':
                setUserHandlePosition(0, 'Right', target);
                break;
        }
    }
    diagram.dataBind();
}

//Change the Appearence of the UserHandle
function setHandlePattern(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    let patternBlock: HTMLElement = document.getElementById('pattern');
    let selectedElement: HTMLCollectionOf<Element> = patternBlock.getElementsByClassName('e-selected-style') as HTMLCollectionOf<Element>;
    if (selectedElement.length) {
        selectedElement[0].classList.remove('e-selected-style');
    }
    if (target.className === 'image-pattern-style') {
        switch (target.id) {
            case 'pattern1':
                applyUserHandleStyle('#1E90FF', target);
                break;
            case 'pattern2':
                applyUserHandleStyle('#3CB371', target);
                break;
            case 'pattern3':
                applyUserHandleStyle('#FF6347', target);
                break;
        }
    }
    diagram.dataBind();
}

//Defines the clone tool used to copy Node/Connector
class CloneTool extends MoveTool {
    public mouseDown(args: MouseEventArgs): void {
        let newObject: any;
        if (diagram.selectedItems.nodes.length > 0) {
            newObject = cloneObject(diagram.selectedItems.nodes[0]) as NodeModel;
        } else {
            newObject = cloneObject(diagram.selectedItems.connectors[0]) as ConnectorModel;
        }
        newObject.id += randomId();
        diagram.paste([newObject]);
        args.source = diagram.nodes[diagram.nodes.length - 1] as IElement;
        args.sourceWrapper = args.source.wrapper;
        super.mouseDown(args);
        this.inAction = true;
    }
}