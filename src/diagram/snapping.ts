import { loadCultureFiles } from '../common/culture-loader';
import {
    NodeModel,
    Node,
    Connector,
    Diagram,
    ISelectionChangeEventArgs,
    SelectorConstraints,
    UserHandleModel,
    UserHandleEventsArgs,
    ConnectorConstraints,
    SnapConstraints,
    PortConstraints,
    PortVisibility,
    ConnectorEditing,
    DiagramContextMenu,
    Snapping,
    UndoRedo,
    ConnectorModel,
    IRotationEventArgs,
    Gridlines,
} from '@syncfusion/ej2-diagrams';
import { CheckBox, RadioButton } from '@syncfusion/ej2-buttons';
import { ColorPicker, NumericTextBox } from '@syncfusion/ej2-inputs';

// Inject necessary diagram modules for snapping and editing features
Diagram.Inject(DiagramContextMenu, UndoRedo, Snapping, ConnectorEditing);

// Declaration of global variables for diagram instance and UI components
let diagram: Diagram;
let showGridlines: CheckBox;
let snapToObject: CheckBox;
let drawingNode: any;
let snappingInterval: NumericTextBox

// Creates a node with specified parameters and returns the NodeModel
function createNode(id: string, offsetX: number, offsetY: number, content: string, width: number = 100, height: number = 100, ports: any[] = []): NodeModel {
    return {
        id: `node_${id}`,
        width,
        height,
        offsetX,
        offsetY,
        ports: ports.map(port => ({
            ...port,
            visibility: PortVisibility.Visible,
            style: { fill: 'black' },
            constraints: PortConstraints.Default | PortConstraints.Draw,
        })),
        annotations: [{
            content,
            offset: { x: 0.5, y: 1.2 },
            style: { bold: true },
        }],
    };
}

// Initializes the nodes to be used in the diagram
let nodes: NodeModel[] = [
    createNode('1', 350, 250, 'Shape 1', 100, 100, [
        { id: 'port1', offset: { x: 0.5, y: 0.5 } }
    ]),
    createNode('2', 650, 250, 'Shape 2', 100, 100, [
        { id: 'port11', offset: { x: 0.5, y: 0.5 } },
        { id: 'port2', offset: { x: 0, y: 0.5 }, height: 100, width: 7 }
    ]),
    createNode('3', 500, 400, 'Shape 3'),
];

// Initializes the connectors to be used in the diagram
let connectors: ConnectorModel[] = [
    {
        id: 'connector_1', sourceID: 'node_1', targetID: 'node_3', type: 'Orthogonal',
    }
];

// Define context menu settings
let contextMenu: any = {
    show: true,
    showCustomMenuOnly: false,
};

// Defines custom user handles for interaction
let handles: UserHandleModel[] = [
    {
        name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
];

// Function to handle diagram creation
function created() {
    diagram.fitToPage({ mode: 'Width' });
}

// Function to handle selection change in the diagram
function selectionChange(args: ISelectionChangeEventArgs) {
    if (args.state === 'Changed') {
        let selectedNodes: NodeModel[] = diagram.selectedItems.nodes;
        let selectedConnectors: ConnectorModel[] = diagram.selectedItems.connectors;
        let selectedItems: Array<NodeModel | ConnectorModel> = [...selectedNodes, ...selectedConnectors];
        if (selectedItems.length > 0) {
            if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
                diagram.selectedItems = {
                    constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
                    userHandles: handles,
                };
                if (selectedNodes.length > 0) {
                    drawingNode = selectedNodes[selectedNodes.length - 1];
                }
            } else {
                diagram.selectedItems = {
                    constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
                };
            }
        }
    }
}

// Sets default constraints for connectors.
function getConnectorDefaults(connector: Connector) {
    connector.constraints = ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb;
}

// Sets default styles for nodes.
function getNodeDefaults(node: Node) {
    node.style = { fill: 'orange', strokeColor: 'orange' };
}

// Handles rotation changes for diagram elements.
function rotateChange(args: IRotationEventArgs) {
    if (args.state === 'Start' || args.state === 'Progress') {
        diagram.selectedItems = { constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle };
    }
    if (args.state === 'Completed') {
        diagram.selectedItems = { constraints: SelectorConstraints.All | SelectorConstraints.UserHandle, userHandles: handles };
    }
}

// Defines custom actions for user handles.
function userHandelClick(args: UserHandleEventsArgs) {
    switch (args.element.name) {
        case 'Delete':
            diagram.remove();
            break;
        case 'Clone':
            diagram.paste(diagram.selectedItems.selectedObjects);
            break;
        case 'Draw':
            diagram.drawingObject.shape = {};
            (diagram.drawingObject as any).type = (diagram.drawingObject as any).type || 'Orthogonal';
            (diagram.drawingObject as any).sourceID = drawingNode.id;
            diagram.dataBind();
            break;
    }
}

// Adjusts the scale of the diagram's gridlines based on the selected snapping interval.
function adjustGridlineScale() {
    (diagram.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] =
    snappingInterval.value;
    (diagram.snapSettings.verticalGridlines as Gridlines).scaledIntervals[0] =
    snappingInterval.value;
    diagram.dataBind();
}
// Handle the snap constraints by checking whether the checkbox are checked or not
function checkbox(){
    diagram.snapSettings.constraints = SnapConstraints.All;
    if (!showGridlines.checked) {
        diagram.snapSettings.constraints &= ~SnapConstraints.ShowLines;
    }
    if (!snapToObject.checked) {
        diagram.snapSettings.constraints &= ~SnapConstraints.SnapToObject;
    }
}
// Handles changes in snapping options based on user input.
function handleSnapToLinesChange(args: any) {
    checkbox();
      switch (args.value) {
        case 'Snap To Gridlines':
            // Enable SnapToLines constraint and adjust based on checkbox states
            diagram.snapSettings.constraints |=SnapConstraints.SnapToLines;
            break;
        case 'Snap To Horizontal Gridlines':
            // Toggle SnapToHorizontalLines constraint
            diagram.snapSettings.constraints ^=
            SnapConstraints.SnapToVerticalLines;
            break;
        case 'Snap To Vertical Gridlines':
            // Toggle SnapToVerticalLines constraint
            diagram.snapSettings.constraints ^=
            SnapConstraints.SnapToHorizontalLines;
            break;
        case 'None':
            // Disable all snap to line constraints
            diagram.snapSettings.constraints &=
            ~(
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
            break;
      }
      diagram.dataBind();
      adjustGridlineScale();
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%', height: '645px', nodes: nodes,
        scrollSettings: { scrollLimit: 'Infinity' },
        drawingObject: { type: 'Orthogonal' },
        contextMenuSettings: contextMenu,
        onUserHandleMouseDown: userHandelClick,
        connectors: connectors,
        snapSettings: { snapAngle: 5 },
        getNodeDefaults: getNodeDefaults,
        getConnectorDefaults: getConnectorDefaults,
        created: created,
        selectionChange: selectionChange,
        rotateChange: rotateChange
    });
    diagram.appendTo('#diagram');

    // Creating a NumericTextBox instance for adjusting snapping intervals
    snappingInterval = new NumericTextBox({
        min: 1,
        step: 1,
        width: 150,
        value: 20,
        format: 'n0',
        change: function (args: any) {
            diagram.snapSettings.horizontalGridlines.snapIntervals[0] = args.value;
            diagram.snapSettings.verticalGridlines.snapIntervals[0] = args.value;
            (diagram.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] = args.value;
            (diagram.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] = args.value;
            diagram.dataBind();
        }
    });
    snappingInterval.appendTo('#snappingInterval');

    // Creating a NumericTextBox instance for adjusting snapping angle
    let snappingAngle: NumericTextBox = new NumericTextBox({
        min: 1,
        step: 1,
        value: 5,
        format: 'n0',
        change: function (args: any) {
            diagram.snapSettings.snapAngle = args.value;
            diagram.dataBind();
        }
    });
    snappingAngle.appendTo('#snappingAngle');

    // Creating a ColorPicker instance for choosing snapping line color
    let snappingLineColor: ColorPicker = new ColorPicker({
        mode: 'Palette',
        showButtons: false,
        value: '#07EDE1',
        change: function (args: any) {
            diagram.snapSettings.snapLineColor = args.value;
            diagram.dataBind();
        }
    });
    snappingLineColor.appendTo('#snappingLineColor');

    // Creating a CheckBox instance for toggling gridline visibility
    showGridlines = new CheckBox({
        label: 'Show Gridline', checked: true,
        change: function () {
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
            diagram.dataBind();
            adjustGridlineScale();
        }
    });
    showGridlines.appendTo('#showGridlines');

    // Creating a CheckBox instance for toggling object snapping
    snapToObject = new CheckBox({
        label: 'Snapping To Objects', checked: true,
        change: function () {
            diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
            diagram.dataBind();
            adjustGridlineScale();
        }
    });
    snapToObject.appendTo('#snapToObject');

    // Creating a RadioButton instance for 'Snap To Gridlines'
    let radioButton: RadioButton = new RadioButton({ label: 'Snap To Gridlines', name: 'snapToLines', value: 'Snap To Gridlines', checked: true, change: handleSnapToLinesChange });
    radioButton.appendTo('#radio1');

    // Creating a RadioButton instance for 'Snap To Horizontal Gridlines'
    let radioButton1: RadioButton = new RadioButton({ label: 'Snap To Horizontal Gridlines', name: 'snapToLines', value: 'Snap To Horizontal Gridlines', change: handleSnapToLinesChange });
    radioButton1.appendTo('#radio2');

    // Creating a RadioButton instance for 'Snap To Vertical Gridlines'
    let radioButton2: RadioButton = new RadioButton({ label: 'Snap To Vertical Gridlines', name: 'snapToLines', value: 'Snap To Vertical Gridlines', change: handleSnapToLinesChange });
    radioButton2.appendTo('#radio3');

    // Creating a RadioButton instance for 'None'
    let radioButton3: RadioButton = new RadioButton({ label: 'None', name: 'snapToLines', value: 'None', change: handleSnapToLinesChange });
    radioButton3.appendTo('#radio4');
};
