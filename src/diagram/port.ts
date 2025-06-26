import { loadCultureFiles } from '../common/culture-loader';
/**
 * Ports sample
 */
import {
    Diagram, NodeModel, ConnectorModel, PointPortModel, PortVisibility, Node, Connector, PortShapes
} from '@syncfusion/ej2-diagrams';
import { DropDownList, ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { MultiSelect, MultiSelectChangeEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs, ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
MultiSelect.Inject(CheckBoxSelection);

// Creates a node with specified properties and ports.
function createNode(id: string, offsetX: number, offsetY: number, annotationContent: string, ports: CustomPort[]): NodeModel {
    return {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        annotations: [{ content: annotationContent }],
        ports: ports
    };
}

// Creates a connector linking two ports of different nodes.
function createConnector(id: string, sourceID: string, sourcePortID: string, targetID: string, targetPortID: string): ConnectorModel {
    return {
        id: id,
        sourceID: sourceID,
        sourcePortID: sourcePortID,
        targetID: targetID,
        targetPortID: targetPortID
    };
}

// Creates a port with specified properties.
function createPort(id: string, shape: PortShapes, offsetX: number, offsetY: number, text: string): CustomPort {
    return {
        id: id,
        shape: shape,
        offset: { x: offsetX, y: offsetY },
        height: 8,
        width: 8,
        visibility: PortVisibility.Visible,
        text: text
    };
}

// Predefined ports for nodes.
let node1Port: CustomPort[] = [
    createPort('port1', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port2', 'Circle', 1, 0.5, 'OUT - 1'),
    createPort('port3', 'Circle', 0.25, 1, 'In - 2'),
    createPort('port4', 'Circle', 0.5, 1, 'OUT - 2'),
    createPort('port5', 'Circle', 0.75, 1, 'In - 3')
];

let node2Port: CustomPort[] = [
    createPort('port6', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port7', 'Circle', 1, 0.35, 'OUT - 1'),
    createPort('port8', 'Circle', 1, 0.70, 'In - 2'),
    createPort('port9', 'Circle', 0.5, 1, 'OUT - 2')
];

let node3Port: CustomPort[] = [
    createPort('port10', 'Circle', 0, 0.5, 'Out - 1'),
    createPort('port11', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port12', 'Circle', 0.5, 1, 'OUT - 2')
];

let node4Port: CustomPort[] = [
    createPort('port13', 'Circle', 0, 0.5, 'In - 1'),
    createPort('port14', 'Circle', 0.5, 0, 'In - 2'),
    createPort('port15', 'Circle', 0.5, 1, 'OUT - 1')
];

let node5Port: CustomPort[] = [
    createPort('port16', 'Circle', 0, 0.5, 'out - 1'),
    createPort('port17', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port18', 'Circle', 1, 0.5, 'OUT - 2')
];

let node6Port: CustomPort[] = [
    createPort('port19', 'Circle', 0, 0.35, 'In - 1'),
    createPort('port20', 'Circle', 0.5, 1, 'Out - 1')
];

let node7Port: CustomPort[] = [
    createPort('port21', 'Circle', 0.5, 0, 'In - 1'),
    createPort('port22', 'Circle', 0.5, 1, 'Out - 1')
];

export interface CustomPort extends PointPortModel {
    text: string;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let bounds: ClientRect = document.getElementsByClassName('control-section')[0].getBoundingClientRect();
    let centerX: number = bounds.width / 2;

    // Node definitions for the diagram.
    let nodes: NodeModel[] = [
        createNode('node1', centerX - 200, 100, 'Publisher', node1Port),
        createNode('node2', centerX, 100, 'Completed Book', node2Port),
        createNode('node3', centerX, 200, '1st Review', node3Port),
        createNode('node4', centerX, 300, 'Legal Terms', node4Port),
        createNode('node5', centerX, 400, '2nd Review', node5Port),
        createNode('node6', centerX + 200, 100, 'Board', node6Port),
        createNode('node7', centerX + 200, 200, 'Approval', node7Port)
    ];

    // Connector definitions for the diagram.
    let connectors: ConnectorModel[] = [
        createConnector('connector1', 'node1', 'port2', 'node2', 'port6'),
        createConnector('connector2', 'node1', 'port4', 'node4', 'port13'),
        createConnector('connector3', 'node2', 'port9', 'node3', 'port11'),
        createConnector('connector4', 'node2', 'port7', 'node6', 'port19'),
        createConnector('connector5', 'node3', 'port10', 'node1', 'port5'),
        createConnector('connector6', 'node3', 'port12', 'node4', 'port14'),
        createConnector('connector7', 'node4', 'port15', 'node5', 'port17'),
        createConnector('connector8', 'node5', 'port18', 'node2', 'port8'),
        createConnector('connector9', 'node5', 'port16', 'node1', 'port3'),
        createConnector('connector10', 'node6', 'port20', 'node7', 'port21'),
        createConnector('connector11', 'node7', 'port22', 'node1', 'port1')
    ];

    // Initialize diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: 580,
        nodes: nodes, connectors: connectors, selectionChange: onSelectionChange,
        snapSettings: { constraints: 0 },
        //Sets the default values of nodes
        getNodeDefaults: (node: Node) => {
            // Initialize shape based on node ID.
            if (node.id === "node1" || node.id === "node2" ||
                node.id === "node4" || node.id === "node6") {
                node.shape = { type: "Basic", shape: "Rectangle" };
            } else if (node.id === "node3" || node.id === "node5" ||
                node.id === "node7") {
                node.shape = { type: "Basic", shape: "Diamond" };
            }
            // Sets height, width, and style for nodes.
            node.height = 65;
            node.width = 100;
            node.style = { fill: "#ebf8fb", strokeColor: "#baeaf5" };
            // Sets styles for the ports of the node.
            node.ports.forEach(port => {
                port.style = {
                    fill: "#366f8c",
                    strokeColor: "#366f8c"
                };
                port.width = 6;
                port.height = 6;
            });
            // Sets style for the node annotations.
            node.annotations[0].style = {
                bold: true,
                fontSize: 13,
                color: "black"
            };
        },
        //Sets the default values of connector
        getConnectorDefaults: (connector: Connector) => {
            //defines type of the connectors
            connector.type = 'Orthogonal';
            connector.style = { strokeColor: '#8cdcef', strokeWidth: 1 };
            connector.targetDecorator = { width: 5, height: 5, style: { fill: '#8cdcef', strokeColor: '#8cdcef' } };
        },
    });
    diagram.appendTo('#diagram');

    // Port visibility options for the dropdown.
    let visibility: { [key: string]: Object }[] = [
        { PortVisibility: PortVisibility.Visible, text: "Visible" },
        { PortVisibility: PortVisibility.Hidden, text: "Hidden" },
        { PortVisibility: PortVisibility.Hover, text: "Hover" },
        { PortVisibility: PortVisibility.Connect, text: "Connect" }
    ];

    // Enable or disable the visibility of the Port
    let portVisibilityDrop: DropDownList = new DropDownList({
        enabled: true, dataSource: visibility,
        fields: { value: 'PortVisibility', text: 'text' },
        value: 'Visible',
        change: onPortVisibilityChange,
    });
    portVisibilityDrop.appendTo('#portsVisiblity');

    // Colorpicker used to apply for fill color of the Port.
    let portFillColor: ColorPicker = new ColorPicker({
        value: '#000', disabled: false, change: (arg: ColorPickerEventArgs) => {
            let port: PointPortModel[] = getSelectedPort();
            for (let j: number = 0; j < port.length; j++) {
                port[j].style.fill = arg.currentValue.rgba;
            }
        }
    });
    portFillColor.appendTo('#fill');

    // Colorpicker used to apply for stroke color of the Port.
    let portBorderColor: ColorPicker = new ColorPicker({
        value: '#000', disabled: false, change: (arg: ColorPickerEventArgs) => {
            let port: PointPortModel[] = getSelectedPort();
            for (let j: number = 0; j < port.length; j++) {
                port[j].style.strokeColor = arg.currentValue.rgba;
            }
        }
    });
    portBorderColor.appendTo('#border');

    // Shape collection of the Port.
    let shape: { [key: string]: Object }[] = [
        { shape: 'X', text: 'X' },
        { shape: 'Circle', text: 'Circle' },
        { shape: 'Square', text: 'Square' },
        { shape: 'Custom', text: 'Custom' }
    ];

    // DropDownList is used to apply the shape of the Port.
    let portShapeDrop: DropDownList = new DropDownList({
        enabled: true, placeholder: 'Select a Shape', value: 'Circle',
        dataSource: shape, fields: { value: 'shape', text: 'text' },
        change: onPortShapeChange
    });
    portShapeDrop.appendTo('#shape');

    // NumericTextBox is used to apply the size of the Port.
    let portSizeNum: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 6, min: 1, max: 30, step: 1,
        change: (args: NumericChangeEventArgs) => {
            applyPortStyle('size');
        }
    });
    portSizeNum.appendTo('#size');

    // NumericTextBox is used to apply the StrokeWidth of the Port.
    let portWidthNum: NumericTextBox = new NumericTextBox({
        enabled: true, format: '###.##',
        value: 1, step: 0.5, min: 1, max: 15,
        change: (args: NumericChangeEventArgs) => {
            applyPortStyle('strokewidth');
        }
    });
    portWidthNum.appendTo('#width');

    diagram.select([diagram.nodes[0]]);

    // Retrieves the ports of the currently selected node in the diagram.
    function getSelectedPort(): PointPortModel[] {
        let node: NodeModel = diagram.selectedItems.nodes[0];
        let ports: PointPortModel[] = node.ports;
        return ports;
    }

    // Handles changes in selection within the diagram.
    // It updates the property panel based on the selected node's port properties.
    function onSelectionChange(args: any): void {
        if (args.state === 'Changed') {
            let propertypanelInstance: HTMLElement = document.getElementById('propertypanel');
            let selectedElement: HTMLCollection = document.getElementsByClassName('e-remove-selection');
            if (args.newValue) {
                // custom code start
                if (!propertypanelInstance.classList.contains('e-remove-selection')) {
                    propertypanelInstance.classList.add('e-remove-selection');
                }
                // custom code end
                if (args.newValue[0] instanceof Node && selectedElement.length) {
                    selectedElement[0].classList.remove('e-remove-selection');
                    let port: PointPortModel = getSelectedPort()[0];
                    portVisibilityDrop.value = port.visibility;
                    portVisibilityDrop.dataBind();
                    portFillColor.value = port.style.fill;
                    portFillColor.dataBind();
                    portBorderColor.value = port.style.strokeColor;
                    portBorderColor.dataBind();
                    portShapeDrop.value = port.shape;
                    portShapeDrop.dataBind();
                    portSizeNum.value = port.height;
                    portSizeNum.dataBind();
                    portWidthNum.value = port.style.strokeWidth;
                    portWidthNum.dataBind();
                }
            }
        }
    }

    // Applies the selected style (size or stroke width) to the selected port(s).
    function applyPortStyle(value: string): void {
        let port: PointPortModel[] = getSelectedPort();
        for (let j: number = 0; j < port.length; j++) {
            if (value === 'size' && portSizeNum) {
                port[j].height = portSizeNum.value;
                port[j].width = portSizeNum.value;
            } else if (value === 'strokewidth' && portWidthNum) {
                port[j].style.strokeWidth = portWidthNum.value;
            }
        }
        diagram.dataBind();
    }

    // Updates the visibility of the selected port(s) based on the user's selection in the dropdown.
    function onPortVisibilityChange(args: MultiSelectChangeEventArgs): void {
        let port: PointPortModel[] = getSelectedPort();
        if (port) {
            for (let j: number = 0; j < port.length; j++) {
                port[j].visibility = portVisibilityDrop.value as PortVisibility;
                diagram.dataBind();
            }
        }
    }

    // Updates the shape of the selected port(s) based on the user's selection in the dropdown.
    function onPortShapeChange(args: DropDownChangeEventArgs): void {
        let port: PointPortModel[] = getSelectedPort();
        for (let j: number = 0; j < port.length; j++) {
            switch (portShapeDrop.value) {
                case 'X':
                    port[j].shape = 'X';
                    break;
                case 'Circle':
                    port[j].shape = 'Circle';
                    break;
                case 'Square':
                    port[j].shape = 'Square';
                    break;
                case 'Custom':
                    port[j].shape = 'Custom';
                    port[j].pathData = 'M6.805,0L13.61,10.703L0,10.703z';
                    break;
            }
            diagram.dataBind();
        }

    }
};

