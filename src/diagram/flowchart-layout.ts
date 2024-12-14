import { loadCultureFiles } from '../common/culture-loader';
import {
    Diagram,
    NodeModel,
    ConnectorModel,
    DiagramTools,DataBinding, FlowchartLayout, FlowShapeModel
} from '@syncfusion/ej2-diagrams';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
Diagram.Inject(FlowchartLayout, DataBinding);

let diagram: Diagram;

//Initializes the data source for the layout
const flowchartData = [
    { id: "A", name: "Start", shape: "Terminator", color: "#90EE90", parentId: null as any, stroke: "#333", strokeWidth: 1 },
    { id: "B", name: "Open the browser and go to Amazon site", shape: "Rectangle", color: "#1759B7", parentId: ["A"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "C", name: "Already a customer?", shape: "Decision", color: "#2F95D8", parentId: ["B"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "D", name: "Create an account", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "E", name: "Enter login information", shape: "Rectangle", color: "#70AF16", parentId: ["C"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "F", name: "Search for the book in the search bar", shape: "Predefined Process", color: "#1759B7", parentId: ["E", "D"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "G", name: "Select the preferred book", shape: "Rectangle", color: "#1759B7", parentId: ["F"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "H", name: "Is the book new or used?", shape: "Rectangle", color: "#2F95D8", parentId: ["G"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "I", name: "Select the new book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["Yes"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "J", name: "Select the used book", shape: "Rectangle", color: "#70AF16", parentId: ["H"], label: ["No"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "K", name: "Add to Cart & Proceed to Checkout", shape: "Rectangle", color: "#1759B7", parentId: ["I", "J"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "L", name: "Enter shipping and payment details", shape: "Rectangle", color: "#1759B7", parentId: ["K", "M"], arrowType: "single-line-arrow", label: ["", ""], stroke: "#333", strokeWidth: 1 },
    { id: "M", name: "Is the information correct?", shape: "Decision", color: "#2F95D8", parentId: ["L"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "N", name: "Review and place the order", shape: "Rectangle", color: "#1759B7", parentId: ["M"], label: ["True"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 },
    { id: "O", name: "End", shape: "Terminator", color: "#8E44CC", parentId: ["N"], arrowType: "single-line-arrow", stroke: "#333", strokeWidth: 1 }
];
// Function to define default properties for nodes
function nodeDefaults(node: NodeModel) {
    node.width = 150;
    node.height = 50;
    if ((node.shape as FlowShapeModel).shape === 'Decision') {
        node.width = 120;
        node.height = 100;
    }
    return node;
}
// Function to define default properties for connectors
function connectorDefaults(connector: ConnectorModel) {
    // Set default type for connectors
    connector.type = 'Orthogonal';
    if(connector.annotations && connector.annotations.length > 0) {
        connector.annotations[0].style.fill = 'white';
        connector.annotations[0].style.color = 'black';
    }
    return connector;
}
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
//Initializes the diagram
diagram = new Diagram({
    width: '100%',
    height: '750px',
    //Disables all interactions except zoom/pan
    tool: DiagramTools.ZoomPan,
    scrollSettings: { scrollLimit: 'Infinity' },
    layout: {
        type: 'Flowchart',
        orientation: 'TopToBottom',
        flowchartLayoutSettings: {
            yesBranchDirection: 'LeftInFlow',
            noBranchDirection: 'RightInFlow',
            yesBranchValues: ['Yes', 'True'],
            noBranchValues: ['No', 'False']
        },
        verticalSpacing: 50,
        horizontalSpacing: 50
    },
    dataSourceSettings: {
        id: 'id',
        parentId: 'parentId',
        dataSource: new DataManager(flowchartData)
    },
    // Settings to display rulers in the diagram
    rulerSettings: { showRulers: true },
    //Defines the default node and connector properties
    getNodeDefaults: nodeDefaults,
    getConnectorDefaults: connectorDefaults,
});
diagram.appendTo('#diagram');

// Property panel functionalities

// Orientation
let orientation: DropDownList = new DropDownList({
    index: 0,
    width: '60%',
    dataSource:[{text: 'Top to bottom', value: 'TopToBottom'},{text:'Left to right', value: 'LeftToRight'}],
    change: (args:ChangeEventArgs) => {
        let value: string = args.value as string;
        diagram.layout.orientation = value === 'Top to bottom' ? 'TopToBottom' : 'LeftToRight';
        diagram.dataBind();
    }
});
orientation.appendTo('#orientation');

// Vertical spacing
let verticalSpacing: NumericTextBox = new NumericTextBox({
    value: 50,
    width: '60%',
    min:30,max:120,
    format:'###.##',
    change: (args:ChangeEventArgs) => {
        let value: number = args.value as number;
        diagram.layout.verticalSpacing = value;
        diagram.dataBind();
    }
});
verticalSpacing.appendTo('#verticalSpacing');

// Horizontal spacing
let horizontalSpacing: NumericTextBox = new NumericTextBox({
    value: 50,
    width: '60%',
    format:'###.##',
    min:20,max:120,
    change: (args:ChangeEventArgs) => {
        let value: number = args.value as number;
        diagram.layout.horizontalSpacing = value;
        diagram.dataBind();
    }
});
horizontalSpacing.appendTo('#horizontalSpacing');

// Yes branch direction
let yesBranchDirection: DropDownList = new DropDownList({
    index: 0,
    width: '60%',
    dataSource:[{text: 'Left in flow', value: 'LeftInFlow'},{text:'Right in flow', value: 'RightInFlow'},{text:'Same as flow', value: 'SameAsFlow'}],
    change: (args:ChangeEventArgs) => {
        let value: string = args.value as string;
        diagram.layout.flowchartLayoutSettings.yesBranchDirection = value === 'Same as flow' ? 'SameAsFlow' :  value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
        diagram.doLayout();
    }
});
yesBranchDirection.appendTo('#yesBranchDirection');

// No branch direction
let noBranchDirection: DropDownList = new DropDownList({
    index: 1,
    width: '60%',
     dataSource:[{text: 'Left in flow', value: 'LeftInFlow'},{text:'Right in flow', value: 'RightInFlow'},{text:'Same as flow', value: 'SameAsFlow'}],
    change: (args:ChangeEventArgs) => {
        let value: string = args.value as string;
        diagram.layout.flowchartLayoutSettings.noBranchDirection = value === 'Same as flow' ? 'SameAsFlow' :  value === 'Right in flow' ? 'RightInFlow' : 'LeftInFlow';
        diagram.doLayout();
    }
});
noBranchDirection.appendTo('#noBranchDirection');

};

