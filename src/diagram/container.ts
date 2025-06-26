import { loadCultureFiles } from '../common/culture-loader';
import {
    Diagram, NodeModel, ConnectorModel, NodeConstraints, DiagramTools, SnapConstraints,
    ConnectorBridging, UndoRedo, Snapping,
    DiagramConstraints,
    PointPortModel,
    DecoratorModel,
    ISelectionChangeEventArgs
} from '@syncfusion/ej2-diagrams';
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs, ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

Diagram.Inject(UndoRedo, Snapping, ConnectorBridging);

let diagram: Diagram;

// Helper function to create a node
function createNode(
    id: string,
    x: number,
    y: number,
    height: number,
    width: number,
    content: string,
    marginX?: number,
    marginY?: number
): NodeModel {
    let ports: PointPortModel[] = [];

    switch (id) {
        case 'node5':
        case 'node6':
            ports = [{ id: 'port1', offset: { x: 0.9, y: 0 } }];
            break;
        case 'node13':
        case 'node15':
            ports = [{ id: 'port2', offset: { x: 1, y: 0.5 } }];
            break;
        case 'node3':
            ports = [
                { id: 'port3', offset: { x: 0.25, y: 1 } },
                { id: 'port4', offset: { x: 0.5, y: 1 } },
                { id: 'port5', offset: { x: 0.75, y: 1 } },
            ];
            break;
        case 'node7':
            ports = [
                { id: 'port1', offset: { x: 0, y: 0.5 } },
                { id: 'port2', offset: { x: 1, y: 0.5 } },
            ];
            break;
        case 'node8':
            ports = [
                { id: 'port3', offset: { x: 0.25, y: 1 } },
                { id: 'port5', offset: { x: 0.75, y: 1 } },
            ];
            break;
    }

    return {
        id: id,
        offsetX: x,
        offsetY: y,
        margin: { left: marginX || 0, top: marginY || 0 },
        width: width,
        height: height,
        style: { fill: 'white', strokeColor: '#2546BB', strokeWidth: 1 },
        shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 4 },
        annotations: [{ content: content, style: { color: '#343434' }, horizontalAlignment: 'Center' }],
        ports: ports
    };
}

// Nodes initialization
const nodes: NodeModel[] = [
    createNode("node1", 300, 300, 60, 100, "HTTP Traffic"),
    createNode("node2", 500, 300, 60, 100, "Ingestion service", 50, 30),
    createNode("node3", 650, 300, 60, 100, "Workflow service", 200, 30),
    createNode("node4", 500, 415, 60, 100, "Package service", 50, 150),
    createNode("node5", 650, 415, 60, 150, "Drone Scheduler service", 175, 150),
    createNode("node6", 800, 415, 60, 100, "Delivery service", 350, 150),
    createNode("node7", 580, 130, 60, 90, "Azure Service Bus"),
    createNode("node8", 815, 130, 60, 100, "Managed Identities"),
    createNode("node9", 1000, 130, 60, 100, "Azure Key Vault"),
    createNode("node10", 500, 550, 60, 100, "Azure Cosmos DB for MongoDB API"),
    createNode("node11", 650, 550, 60, 100, "Azure Cosmos DB"),
    createNode("node12", 800, 550, 60, 100, "Azure Cache for Redis"),
    createNode("node13", 1040, 255, 60, 100, "Azure Application Insights"),
    createNode("node14", 1140, 350, 60, 100, "Azure Monitor"),
    createNode("node15", 1040, 445, 60, 100, "Azure Log Analytics workspace"),
    {
        id: 'container', width: 520, height: 300, offsetX: 660, offsetY: 350,
        shape: {
            type: 'Container',
            header: {
                annotation: {
                    content: 'Azure Container Apps Environment',
                    style: { fontSize: 18, bold: true, fill: 'transparent', strokeColor: 'transparent' },
                },
                height: 40,
                style: { fontSize: 18, bold: true, fill: 'transparent', strokeColor: 'transparent' },
            },
            children: ["node2", "node3", "node4", "node5", "node6"]
        },
        style: { fill: '#E9EEFF', strokeColor: '#2546BB', strokeWidth: 1 }
    },
];

function createConnector(
    id: string,
    sourceID: string,
    targetID: string,
    sourcePortID?: string,
    targetPortID?: string,
    sourceDecorator?: DecoratorModel
): ConnectorModel {
    return {
        id: id,
        type: 'Orthogonal',
        sourceID: sourceID,
        targetID: targetID,
        sourcePortID: sourcePortID,
        targetPortID: targetPortID,
        style: { strokeColor: "#5E5E5E", strokeWidth: 1 },
        sourceDecorator: sourceDecorator,
        targetDecorator: { style: { fill: "#5E5E5E", strokeColor: "#5E5E5E", strokeWidth: 1 } }
    };
}

const sourceDecorator: DecoratorModel = {
    shape: 'Arrow',
    style: { fill: "#5E5E5E", strokeColor: "#5E5E5E", strokeWidth: 1 }
};
// Connectors initialization
const connectors: ConnectorModel[] = [
    createConnector('connector1', 'node1', 'node2'),
    createConnector("connector2", "node4", "node10"),
    createConnector("connector3", "node5", "node11"),
    createConnector("connector4", "node6", "node12"),
    createConnector("connector5", "node8", "node9"),
    createConnector("connector6", "container", "node13"),
    createConnector("connector7", "container", "node15"),
    createConnector("connector8", "node3", "node4", 'port3'),
    createConnector("connector9", "node3", "node5", 'port4'),
    createConnector("connector10", "node3", "node6", 'port5'),
    createConnector("connector11", "node2", "node7", "", 'port1'),
    createConnector("connector12", "node7", "node3", 'port2'),
    createConnector("connector13", "node13", "node14", 'port2'),
    createConnector("connector14", "node15", "node14", 'port2'),
    createConnector("connector16", "node8", "node5", 'port3', 'port1', sourceDecorator),
    createConnector("connector17", "node8", "node6", 'port5', 'port1', sourceDecorator)
];

// Initial setup of the diagram
(window as any).default = (): void => {
    loadCultureFiles();

    diagram = new Diagram({
        width: '100%',
        height: '700px',
        nodes: nodes,
        connectors: connectors,
        constraints: DiagramConstraints.Default | DiagramConstraints.Bridging,
        rulerSettings: { showRulers: true, dynamicGrid: true },
        selectionChange: onSelectionChange,
    });

    diagram.appendTo('#diagram');

    function onSelectionChange(args: ISelectionChangeEventArgs): void {
        if (args.state === 'Changed') {
            const selectedItems = [...diagram.selectedItems.nodes, ...diagram.selectedItems.connectors];
            let hasAnnotation: boolean = false;
            selectedItems.forEach(item => {
                if (item.shape.type === 'Container') {
                    hasAnnotation = (item.shape as any).header?.annotation ? true : false;
                } else {
                    hasAnnotation = selectedItems.some(item => item.annotations && item.annotations.length > 0);
                }
            });
            const toolbarItems = ['fontfamily', 'fontSize', 'Bold', 'Italic', 'Underline', 'fontColor'];
            toolbarItems.forEach(id => {
                const item = toolbarObject.items.find((item: any) => item.id === id);
                if (item) {
                    item.disabled = !hasAnnotation;
                }
            });
        }
    }

    const fontTypeList: { [key: string]: Object }[] = [
        { type: 'Arial', text: 'Arial' },
        { type: 'Aharoni', text: 'Aharoni' },
        { type: 'Bell MT', text: 'Bell MT' },
        { type: 'Fantasy', text: 'Fantasy' },
        { type: 'Segoe UI', text: 'Segoe UI' },
        { type: 'Times New Roman', text: 'Times New Roman' },
        { type: 'Verdana', text: 'Verdana' }
    ];

    // DropDownList for font family
    const fontType = new DropDownList({
        dataSource: fontTypeList,
        fields: { value: 'type', text: 'text' },
        popupWidth: 150,
        width: '100%',
        placeholder: 'Select a font type',
        index: 0,
        change: (args: any) => {
            updateAnnotationStyling('fontfamily', null, args.value.toString());
        },
    });
    fontType.appendTo('#fontfamily');

    // NumericTextBox for font size
    const fontSizeChange = new NumericTextBox({
        value: 12,
        min: 1,
        max: 30,
        width: '110px',
        format: '##.##',
        step: 2,
        change: (args: NumericChangeEventArgs) => {
            updateAnnotationStyling('fontsize', args.value);
        },
    });
    fontSizeChange.appendTo('#fontSize');

    // ColorPicker for font color
    const fontColorChange = new ColorPicker(
        {
            mode: 'Palette',
            value: '#000',
            change: function (arg: any) {
                const selectedItems = [...diagram.selectedItems.nodes, ...diagram.selectedItems.connectors];
                for (var i = 0; i < selectedItems.length; i++) {
                    var obj = selectedItems[i];
                    if (obj.shape.type === 'Container') {
                        (obj.shape as any).header.annotation.style.color = arg.currentValue.rgba;
                        diagram.dataBind();
                    } else {
                        for (var j = 0; j < obj.annotations.length; j++) {
                            obj.annotations[j].style.color = arg.currentValue.rgba;
                            diagram.dataBind();
                        }
                    }
                }
            }
        });
    fontColorChange.appendTo('#fontColor');

    const toolbarObject = new Toolbar({
        clicked: toolbarSelect,
        items: [
            {
                id: 'fontfamily',
                type: 'Input',
                tooltipText: 'Font Style',
                align: 'Left',
                template: fontType,
                disabled: true
            },
            {
                id: 'fontSize',
                type: 'Input',
                tooltipText: 'Font Size',
                align: 'Left',
                template: fontSizeChange,
                cssClass: 'margin-left-class',
                disabled: true
            },
            {
                id: 'Bold',
                type: 'Button',
                tooltipText: 'Bold',
                prefixIcon: 'e-icons e-bold',
                cssClass: 'tb-item-start',
                disabled: true
            },
            {
                id: 'Italic',
                type: 'Button',
                tooltipText: 'Italic',
                prefixIcon: 'e-icons e-italic',
                cssClass: 'tb-item-middle',
                disabled: true
            },
            {
                id: 'Underline',
                type: 'Button',
                tooltipText: 'Underline',
                prefixIcon: 'e-icons e-underline',
                cssClass: 'tb-item-end',
                disabled: true
            },
            {
                // Font Color picker
                id: 'fontColor',
                type: 'Input',
                tooltipText: 'Font Color',
                align: 'Left',
                template: fontColorChange,
                disabled: true
            },
        ],
    });
    toolbarObject.appendTo('#toolbarEditor');
};

// Function to update annotation properties
function updateAnnotationStyling(value: string, fontSizeChange?: number, fontType?: string, index?: number, isSelected?: boolean) {
    const toolbarElement = document.getElementById("toolbarEditor");
    const toolbar = toolbarElement ? (toolbarElement as any).ej2_instances[0] : null;
    const selectedItems = [...diagram.selectedItems.nodes, ...diagram.selectedItems.connectors];
    selectedItems.forEach(obj => {
        if (obj.shape.type === 'Container' && (obj.shape as any).header) {
            const annotation = (obj.shape as any).header.annotation;
            updateStyles(annotation, value, fontSizeChange, fontType, isSelected);
        } else {
            (obj.annotations || []).forEach((annotation: any) => {
                updateStyles(annotation, value, fontSizeChange, fontType, isSelected);
            });
        }
    });

    if (toolbar && index !== undefined) {
        const item = toolbar.items[index];
        updateToolbarClass(item, isSelected || false);
        toolbar.dataBind();
    }
    diagram.dataBind();
}

// Helper function to update styles
function updateStyles(annotation: any, value: string, fontSizeChange?: number, fontType?: string, isSelected?: boolean) {
    switch (value) {
        case 'fontsize':
            annotation.style.fontSize = fontSizeChange;
            break;
        case 'fontfamily':
            annotation.style.fontFamily = fontType;
            break;
        case 'bold':
            annotation.style.bold = !annotation.style.bold;
            isSelected = annotation.style.bold;
            break;
        case 'italic':
            annotation.style.italic = !annotation.style.italic;
            isSelected = annotation.style.italic;
            break;
        case 'underline':
            annotation.style.textDecoration = annotation.style.textDecoration === 'None' ? 'Underline' : 'None';
            isSelected = annotation.style.textDecoration === 'Underline';
            break;
    }
}

// Helper function to update toolbar class
function updateToolbarClass(item: any, isSelected: boolean) {
    const selectedClass = 'tb-item-selected';
    if (isSelected && !item.cssClass.includes(selectedClass)) {
        item.cssClass += ` ${selectedClass}`;
    } else if (!isSelected && item.cssClass.includes(selectedClass)) {
        item.cssClass = item.cssClass.replace(` ${selectedClass}`, '');
    }
}

// Toolbar selection handler
function toolbarSelect(args: ClickEventArgs) {
    switch (args.item.tooltipText) {
        case 'Bold':
            updateAnnotationStyling('bold', undefined, undefined, 0, true);
            break;
        case 'Italic':
            updateAnnotationStyling('italic', undefined, undefined, 1, true);
            break;
        case 'Underline':
            updateAnnotationStyling('underline', undefined, undefined, 2, true);
            break;
    }
    diagram.dataBind();
}