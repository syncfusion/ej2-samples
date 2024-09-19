import { loadCultureFiles } from '../common/culture-loader';
/**
 * UserHandle
 */
//Importing necessary modules
import {
    Diagram, NodeModel, ConnectorModel, UserHandleModel,Node,Connector,
    Side, SelectorConstraints, SnapConstraints, MoveTool, MouseEventArgs, ISelectionChangeEventArgs,cloneObject, randomId,
    IElement, ToolBase
} from '@syncfusion/ej2-diagrams';

let diagram: Diagram;

//Enable the clone tool for UserHandle.
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
    // custom code start
    target.classList.add('e-selected-style');
    // custom code end
}

//set the style of the userhandle.
function applyUserHandleStyle(bgcolor: string, target: HTMLElement): void {
    diagram.selectedItems.userHandles[0].backgroundColor = bgcolor;
    diagram.selectedItems.userHandles[0].pathColor = 'White';
    // custom code start
    target.classList.add('e-selected-style');
    // custom code end
}

//Change the postion of the UserHandle
function setHandleAppearance(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    let appearanceBlock: HTMLElement = document.getElementById('appearance');
    // custom code start
    let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
    if (selectedElement.length) {
        selectedElement[0].classList.remove('e-selected-style');
    }
    // custom code end
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
    // custom code start
    let selectedElement: HTMLCollection = document.getElementsByClassName(
        "e-selected-style"
      );
    if (selectedElement.length) {
        selectedElement[0].classList.remove('e-selected-style');
    }
    // custom code end
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

//Defines the clone tool for copying Node or Connector objects.
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
        if(diagram.selectedItems.connectors.length > 0)
        {
            args.source = diagram.connectors[diagram.connectors.length - 1] as IElement;
        }
        else
        {
            args.source = diagram.nodes[diagram.nodes.length - 1] as IElement;
        }
        args.sourceWrapper = args.source.wrapper;
        super.mouseDown(args);
        this.inAction = true;
    }
}

//Defines the diagram content
// tslint:disable-next-line:max-func-body-length 
(window as any).default = (): void => {
    loadCultureFiles();
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
            annotations: [{ content: 'Decision process for new software ideas' }],
            fixedUserHandles: [{ padding: { left: 2, right: 2, top: 2, bottom: 2 }, offset:{x:1.1,y:0.5}, width: 20, height: 20,}],
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
    // Defines the content of the diagram.
    diagram = new Diagram({
        width: '100%', height: '600px', nodes: nodes, connectors: connectors,
        selectedItems: { constraints: SelectorConstraints.UserHandle, userHandles: handles },
        snapSettings: { constraints: SnapConstraints.None },
        fixedUserHandleTemplate: '#fixeduserhandletemplate',
        fixedUserHandleClick: function (args:any) {
            diagram.select([diagram.nameTable['Decision']]);
            diagram.remove();
        },
        //get Node default value 
        getNodeDefaults: function (node: NodeModel){
            let nodes: NodeModel = {
                style: { fill: '#578CA9', strokeColor: 'none' },
                annotations: [{ style: { color: 'white' } }]
            };
            return nodes;
        },
        //set CustomTool
        getCustomTool: getTool,
        selectionChange: selectionChange
    });
    // Enable or disable the property panel based on the selection.
    function selectionChange(arg: ISelectionChangeEventArgs): void {
        let PropertyAppearance: HTMLElement = document.getElementById('propertypanel');
        let getSelectedElement: HTMLCollection = document.getElementsByClassName('e-remove-selection');
        if (arg.newValue) {
            // Check if the item in newValue is either a Node or Connector
            if ((arg.newValue[0] instanceof Node)||(arg.newValue[0] instanceof Connector)) {
                if (getSelectedElement.length) {
                    getSelectedElement[0].classList.remove('e-remove-selection');
                }
            } 
            else {
                if (!PropertyAppearance.classList.contains('e-remove-selection')) {
                    PropertyAppearance.classList.add('e-remove-selection');
                }
            }
        }
    }
    diagram.appendTo('#diagram');
    diagram.select([diagram.nodes[0]]);
    diagram.fitToPage();
    document.getElementById('appearance').onclick = setHandleAppearance;
    document.getElementById('pattern').onclick = setHandlePattern;
};

