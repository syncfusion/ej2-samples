import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample for Grouping and Ordering.
 */

// Importing needed dependencies for diagram
import {
    NodeModel, Diagram, ISelectionChangeEventArgs, SelectorConstraints, UserHandleModel, BasicShapes,
    SymbolPalette, UndoRedo, Node
} from '@syncfusion/ej2-diagrams';
import { ColorPicker, ColorPickerEventArgs, NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ClickEventArgs, Toolbar } from '@syncfusion/ej2-navigations';
Diagram.Inject(UndoRedo);

// Holds instances of DiagramComponent, ToolbarComponent, and HTMLElements for palette icons and spaces.
let diagram: Diagram;
let toolbarEditor: Toolbar;
let drawingNode: any;

// Creates a basic shape node for the diagram.
const createNode = (id: string, offsetX: number, offsetY: number, width: number, height: number, shape: BasicShapes,
    annotations: any[] = [], cornerRadius: number = 0): NodeModel => (
    {
        id: id,
        offsetX: offsetX,
        offsetY: offsetY,
        width: width,
        height: height,
        shape: { type: "Basic", shape, cornerRadius: cornerRadius },
        annotations: annotations,
    });

// Creates a group node for organizing multiple nodes.
const createGroupNode = (id: string, children: any[], padding: any, annotations: any[]): NodeModel => (
    {
        id: id,
        children: children,
        padding: padding,
        annotations: annotations
    }
)

// Initializes nodes representing key elements in a diagram.
let nodes: NodeModel[] = [
    createNode('Diamond', 350, 250, 100, 100, 'Diamond', [{ content: 'Decision' }]),
    createNode('ellipse', 150, 250, 100, 60, 'Ellipse', [{ content: 'Start/Stop' }]),
    createNode('rectangle', 150, 400, 100, 60, 'Rectangle', [{ content: 'Process' }]),
    createNode('node1', 150, 100, 100, 55, 'Rectangle'),
    createNode('node2', 350, 100, 90, 55, 'Rectangle', [], 5),
    createGroupNode('group', ['node1', 'node2'], { left: 10, right: 10, top: 10, bottom: 10 }, [{ content: 'Group 1' }])
];

// Creates basic shapes for the symbol palette.
const createBasicShape = (id: string, shape: BasicShapes): NodeModel => ({
    id: id,
    shape: { type: "Basic", shape },
    style: { strokeWidth: 2 }
});

// Initializes basic shapes for use in the symbol palette.
let basicShapes: NodeModel[] = [
    createBasicShape('Rectangle', 'Rectangle'),
    createBasicShape('Ellipse', 'Ellipse'),
    createBasicShape('Hexagon', 'Hexagon'),
    createBasicShape('Parallelogram', 'Parallelogram'),
    createBasicShape('Triangle', 'Triangle'),
    createBasicShape('Plus', 'Plus'),
    createBasicShape('Star', 'Star'),
    createBasicShape('Pentagon', 'Pentagon'),
    createBasicShape('Heptagon', 'Heptagon'),
    createBasicShape('Octagon', 'Octagon'),
    createBasicShape('Trapezoid', 'Trapezoid'),
    createBasicShape('Decagon', 'Decagon'),
    createBasicShape('RightTriangle', 'RightTriangle'),
    createBasicShape('Cylinder', 'Cylinder'),
    createBasicShape('Diamond', 'Diamond')
];

// Initializes user handles for interaction with diagram elements.
let handles: UserHandleModel[] = [
    {
        name: 'Clone',
        pathData:
            'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        tooltip: { content: 'Clone' },
        visible: true,
        offset: 1,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Delete',
        pathData:
            'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        tooltip: { content: 'Delete' },
        visible: true,
        offset: 0,
        side: 'Bottom',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    {
        name: 'Draw',
        pathData:
            'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        tooltip: { content: 'Draw' },
        visible: true,
        offset: 0.5,
        side: 'Right',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
];

// Updates toolbar items based on diagram selection changes.
function selectionChange(args: ISelectionChangeEventArgs) {
    if (args.state === 'Changed') {
        let selectedItems: any = diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(diagram.selectedItems.connectors);

        // Define toolbar item IDs for easy management
        const toolbarItemIds = ['Group', 'UnGroup', 'BringForward', 'BringToFront', 'SendBackward', 'SendToBack', 'FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];

        // Disabling toolbar items when no items are selected
        if (selectedItems.length === 0) {
            updateToolbarItems(toolbarItemIds, true);
        }
        // Handling single item selection
        else if (selectedItems.length === 1) {
            enableToolbarItems();
            disableToolbarItemsForMultiSelection(selectedItems);

            // Enabling or disabling specific toolbar items based on selection type
            const isGroup = selectedItems[0].children !== undefined && selectedItems[0].children.length > 0;
            updateToolbarItems(['UnGroup'], !isGroup);
        }
        // Handling multiple items selection
        else if (selectedItems.length > 1) {
            enableToolbarItems();
            updateToolbarItems(['Group'], false);
            updateToolbarItems(['UnGroup'], true);
            disableToolbarItemsForMultiSelection(selectedItems);
        }

        // Handling specific scenarios when nodes are selected
        if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
            diagram.selectedItems = {
                constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
                userHandles: handles,
            };

            // Manipulating selected nodes and their properties
            if (diagram.selectedItems.nodes.length > 0) {
                drawingNode = diagram.selectedItems.nodes[diagram.selectedItems.nodes.length - 1];
            }
        } else {
            // Resetting selection constraints when other types are selected
            diagram.selectedItems = {
                constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
            };
        }
    }
}

// Enable or disable specific toolbar items
function updateToolbarItems(itemIds: string[], disabled: boolean) {
    itemIds.forEach(itemId => {
        const item = toolbarEditor.items.find(item => item.id === itemId);
        if (item) {
            item.disabled = disabled;
        }
    });
}

// Enables specific toolbar items.
function enableToolbarItems() {
    updateToolbarItems(['BringForward', 'BringToFront', 'SendBackward', 'SendToBack'], false);
}

// Disables toolbar items for multi-selected elements without annotations.
function disableToolbarItemsForMultiSelection(selectedItems: any) {
    const annotationRelatedItems = ['FontStyle', 'FontSize', 'Bold', 'Italic', 'Underline', 'FontColor'];

    // Iterate through selected items
    for (let i: number = 0; i < selectedItems.length; i++) {
        // Check if the selected item has annotations
        if (selectedItems[i].annotations[0] !== undefined) {
            // Enable toolbar items for annotation-related functionalities
            updateToolbarItems(annotationRelatedItems, false);
        } else {
            // Disable toolbar items for annotation-related functionalities
            updateToolbarItems(annotationRelatedItems, true);
        }
    }
}

// Handles custom user interactions with diagram elements.
function userHandleClick(args: any) {
    switch (args.element.name) {
        case 'Delete':
            // Remove selected elements
            diagram.remove();
            break;
        case 'Clone':
            // Clone selected elements
            diagram.paste(diagram.selectedItems.selectedObjects);
            break;
        case 'Draw':
            // Sets drawing mode and source ID for drawing elements
            const drawingObject = diagram.drawingObject;
            drawingObject.shape = {};
            (drawingObject as any).type = (drawingObject as any).type || 'Orthogonal';
            (drawingObject as any).sourceID = drawingNode.id;
            diagram.dataBind();
            break;
    }
}

// Updates annotation style attributes based on the provided value.
function updateAnnotationValue(value: any, fontSize?: any, fontFamily?: any) {
    // Iterate through selected nodes in the diagram
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
        let node = diagram.selectedItems.nodes[i];

        // Iterate through annotations of each node
        for (let j: number = 0; j < node.annotations.length; j++) {
            let annotationStyle: any = node.annotations[j].style;

            // Update style attributes based on the provided value
            if (value === 'fontsize') {
                annotationStyle.fontSize = fontSize;
            } else if (value === 'fontfamily') {
                annotationStyle.fontFamily = fontFamily.toString();
            } else if (value === 'bold') {
                annotationStyle.bold = !annotationStyle.bold;
            } else if (value === 'italic') {
                annotationStyle.italic = !annotationStyle.italic;
            } else if (value === 'underline') {
                annotationStyle.textDecoration = annotationStyle.textDecoration === 'None' ? 'Underline' : 'None';
            }
        }
    }

    diagram.dataBind();
}

// Executes actions based on the toolbar item clicked.
function handleToolbarClick(args: any) {
    // Switch based on the tooltip text of the item
    switch (args.item.tooltipText) {
        // Group selected items
        case 'Group':
            diagram.group();
            updateToolbarItems(['Group'], true);
            updateToolbarItems(['UnGroup'], false);
            break;

        // Ungroup selected items
        case 'UnGroup':
            diagram.unGroup();
            break;

        // Bring selected item(s) forward
        case 'Bring Forward':
            diagram.moveForward();
            break;

        // Bring selected item(s) to front
        case 'Bring To Front':
            diagram.bringToFront();
            break;

        // Send selected item(s) backward
        case 'Send Backward':
            diagram.sendBackward();
            break;

        // Send selected item(s) to back
        case 'Send To Back':
            diagram.sendToBack();
            break;

        // Toggle bold style for selected annotation(s)
        case 'Bold':
            updateAnnotationValue('bold', args.value, null);
            break;

        // Toggle italic style for selected annotation(s)
        case 'Italic':
            updateAnnotationValue('italic', args.value, null);
            break;

        // Toggle underline style for selected annotation(s)
        case 'Underline':
            updateAnnotationValue('underline', args.value, null);
            break;
    }
    diagram.dataBind();
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%',
        height: 500,
        nodes: nodes,
        rulerSettings: { showRulers: true },
        drawingObject: { type: 'Orthogonal' },
        onUserHandleMouseDown: userHandleClick,
        selectionChange: selectionChange,
    });
    diagram.appendTo('#diagram');

    // Initialize a SymbolPalette control
    let palette: SymbolPalette = new SymbolPalette({
        expandMode: 'Multiple',
        symbolMargin: { left: 5, right: 5, top: 5, bottom: 10 },
        symbolHeight: 50,
        symbolWidth: 50,

        // Define the palettes to be displayed
        palettes: [
            {
                id: 'basicShapes',
                expanded: true,
                symbols: basicShapes,
                iconCss: 'e-ddb-icons e-flow',
                title: 'Basic Shapes',
            },
        ],
        width: '100%',
        height: '100%',
    });
    palette.appendTo('#symbolpalette');

    //FontType Collection
    let fontTypeList: { [key: string]: Object }[] = [
        { type: 'Arial', text: 'Arial' },
        { type: 'Aharoni', text: 'Aharoni' },
        { type: 'Bell MT', text: 'Bell MT' },
        { type: 'Fantasy', text: 'Fantasy' },
        { type: 'Times New Roman', text: 'Times New Roman' },
        { type: 'Segoe UI', text: 'Segoe UI' },
        { type: 'Verdana', text: 'Verdana' },
    ];

    //DropDownList used to apply for fontFamily of the Annotation
    let fontFamily: DropDownList = new DropDownList({
        dataSource: fontTypeList,
        fields: { value: 'type', text: 'text' },
        popupWidth: 150,
        width: '100%',
        placeholder: 'select a font type',
        index: 0,
        change: (args: any) => {
            updateAnnotationValue('fontfamily', null, args.value.toString());
        },
    });
    fontFamily.appendTo('#fontfamily');

    //NumericTextBox used to apply for Fontsize of the Annotation
    let fontSize: NumericTextBox = new NumericTextBox({
        value: 12,
        min: 1,
        max: 30,
        width: '110px',
        format: '##.##',
        step: 2,
        change: (args: NumericChangeEventArgs) => {
            updateAnnotationValue('fontsize', args.value);
        },
    });
    fontSize.appendTo('#fontSize');

    //Colorpicker used to apply for Color of the Annotation
    let fontColor: ColorPicker = new ColorPicker({
        mode: 'Palette',
        value: '#000',
        change: (arg: ColorPickerEventArgs) => {
            diagram.selectedItems.nodes.forEach(node => {
                node.annotations.forEach(annotation => {
                    annotation.style.color = arg.currentValue.rgba;
                });
            });
            diagram.dataBind();
        },
    });
    fontColor.appendTo('#fontColor');

    //create the Toolbar and adding items in ToolBar.
    toolbarEditor = new Toolbar({
        clicked: handleToolbarClick,
        items: [
            // Grouping/UnGrouping buttons
            {
                id: 'Group',
                type: 'Button',
                tooltipText: 'Group',
                prefixIcon: 'e-icons e-group-1',
                disabled: true
            },
            {
                id: 'UnGroup',
                type: 'Button',
                tooltipText: 'UnGroup',
                prefixIcon: 'e-icons e-ungroup-1',
                disabled: true
            },
            { id: 'Separator1', type: 'Separator' },
            {
                id: 'BringForward',
                type: 'Button',
                tooltipText: 'Bring Forward',
                prefixIcon: 'e-icons e-bring-forward',
                disabled: true
            },
            {
                id: 'BringToFront',
                type: 'Button',
                tooltipText: 'Bring To Front',
                prefixIcon: 'e-icons e-bring-to-front',
                disabled: true
            },
            {
                id: 'SendBackward',
                type: 'Button',
                tooltipText: 'Send Backward',
                prefixIcon: 'e-icons e-send-backward',
                disabled: true
            },
            {
                id: 'SendToBack',
                type: 'Button',
                tooltipText: 'Send To Back',
                prefixIcon: 'e-icons e-send-to-back',
                disabled: true
            },
            {
                id: 'Separator2', type: 'Separator',
                template: '<div style="margin-left:1px;"></div>'
            },
            {
                // Custom font family dropdown template
                id: 'FontStyle',
                type: 'Input',
                tooltipText: 'Font Style',
                align: 'Left',
                template: fontFamily,
                disabled: true
            },
            {
                id: 'Separator3', type: 'Separator',
                template: '<div style="margin-left:5px;"></div>'
            },
            {
                // Custom font size numeric text box template
                id: 'FontSize',
                type: 'Input',
                tooltipText: 'Font Size',
                align: 'Left',
                template: fontSize,
                disabled: true,
            },
            // Font styling buttons (Bold, Italic, Underline)
            {
                id: 'Bold',
                type: 'Button',
                tooltipText: 'Bold',
                prefixIcon: 'e-icons e-bold',
                disabled: true,
                cssClass: 'tb-item-start'
            },
            {
                id: 'Italic',
                type: 'Button',
                tooltipText: 'Italic',
                prefixIcon: 'e-icons e-italic',
                disabled: true,
                cssClass: 'tb-item-middle'
            },
            {
                id: 'Underline',
                type: 'Button',
                tooltipText: 'Underline',
                prefixIcon: 'e-icons e-underline',
                disabled: true,
                cssClass: 'tb-item-end'
            },
            {
                // Font Color picker
                id: 'FontColor',
                type: 'Input',
                tooltipText: 'Font Color',
                align: 'Left',
                template: fontColor,
                disabled: true
            },
        ],
    });
    toolbarEditor.appendTo('#toolbarEditor');
};