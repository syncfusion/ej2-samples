import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample for Zoom and Pan.
 */

// Importing needed dependencies for diagram
import {
    Diagram,
    ConnectorModel,
    NodeModel,
    SnapConstraints,
    GroupableView,
    TextElement,
    StackPanel,
    ImageElement,
    DataBinding,
    HierarchicalTree,
    TreeInfo,
    DiagramTools,
    ZoomOptions,
    ISelectionChangeEventArgs,
    UndoRedo
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import * as Data from './overview-data.json';

Diagram.Inject(DataBinding, HierarchicalTree, UndoRedo);

// Holds instances of DiagramComponent and ToolbarComponent.
let diagram: Diagram
let toolbarObj: Toolbar

// Sets the default values of Nodes.
function getNodeDefaults(node: NodeModel): NodeModel {
    node.height = 50;
    node.style = { fill: 'transparent', strokeWidth: 2 };
    return node;
}

// Sets the default values of connectors.
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.style.strokeColor = 'gray';
    return connector;
}

// Define a function to handle selection change event
function selectionChange(args: ISelectionChangeEventArgs) {
    if (args.state === 'Changed') {
        let selectedItems: any = diagram.selectedItems.nodes;
        const hasSelectedItems = selectedItems.length > 0;
        toolbarObj.items.forEach(item => {
            if (item.id === 'BringIntoView' || item.id === 'BringIntoCenter') {
                item.disabled = !hasSelectedItems;
            }
        });
    }
}

// Sets the visual template for a node.
function setNodeTemplate(node: NodeModel): GroupableView {
    // Create an outer stack panel as content to contain image and text elements
    let content: StackPanel = new StackPanel();
    content.id = node.id + '_outerstack';
    content.orientation = 'Horizontal';
    content.style.strokeColor = 'gray';
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

    // Create an image element to display employee image
    let image: ImageElement = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = 'none';
    image.source = (node.data as EmployeeInfo).ImageUrl;
    image.id = node.id + '_pic';

    // Create an inner stack panel to organize text elements
    let innerStack: StackPanel = new StackPanel();
    innerStack.style.strokeColor = 'none';
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = node.id + '_innerstack';

    // Create a text element for displaying employee name
    let text: TextElement = new TextElement();
    text.content = (node.data as EmployeeInfo).Name;
    text.style.color = 'black';
    text.style.bold = true;
    text.style.strokeColor = 'none';
    text.horizontalAlignment = 'Left';
    text.style.fill = 'none';
    text.id = node.id + '_text1';

    // Create a TextElement for the node's designation
    let desigText: TextElement = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = (node.data as EmployeeInfo).Designation;
    desigText.style.color = 'black';
    desigText.style.strokeColor = 'none';
    desigText.style.fontSize = 12;
    desigText.style.fill = 'none';
    desigText.horizontalAlignment = 'Left';
    desigText.style.textWrapping = 'Wrap';
    desigText.id = node.id + '_desig';

    // Add text elements to the inner StackPanel
    innerStack.children = [text, desigText];

    // Add image element and inner StackPanel to the outer StackPanel
    content.children = [image, innerStack];

    return content;
}

// Handles toolbar item clicks to perform zoom, pan, and other actions.
function handleToolbarClick(args: any) {
    const zoomFactor = 0.2;
    switch (args.item.tooltipText) {
        // Zoom in action
        case 'Zoom In':
            diagram.zoomTo({ type: 'ZoomIn', zoomFactor });
            break;

        // Zoom Out action
        case 'Zoom Out':
            diagram.zoomTo({ type: 'ZoomOut', zoomFactor });
            break;

        // Selection action
        case 'Select':
            diagram.clearSelection();
            diagram.drawingObject = {};
            diagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
            break;

        // Pan tool action
        case 'Pan Tool':
            diagram.tool = DiagramTools.ZoomPan;
            break;

        // Reset action
        case 'Reset':
            diagram.reset();
            break;

        // Fit to page action
        case 'Fit To Page':
            diagram.fitToPage();
            break;

        // Bring selected node into view action
        case 'Bring Into View':
            if (diagram.selectedItems.nodes.length > 0) {
                let bounds: any = diagram.selectedItems.nodes[0].wrapper.bounds;
                diagram.bringIntoView(bounds);
            }
            break;

        // Bring selected node into center action
        case 'Bring Into Center':
            if (diagram.selectedItems.nodes.length > 0) {
                let bounds: any = diagram.selectedItems.nodes[0].wrapper.bounds;
                diagram.bringToCenter(bounds);
            }
            break;
    }
}

// Interface for local data used in diagram layouts
export interface EmployeeInfo {
    Name: string;
    Designation: string;
    ImageUrl: string;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%',
        height: '590px',
        scrollSettings: { scrollLimit: 'Infinity' },
        // Sets the constraints of the SnapSettings
        snapSettings: { constraints: SnapConstraints.None },
        // Configrues organizational chart layout
        layout: {
            type: 'OrganizationalChart',
            margin: { top: 20 },
            getLayoutInfo: (tree: TreeInfo) => {
                if (!tree.hasSubTree) {
                    tree.orientation = 'Vertical';
                    tree.type = 'Right';
                }
            },
        },

        // Sets the parent and child relationship of DataSource.
        dataSourceSettings: {
            id: 'Id',
            parentId: 'ReportingPerson',
            dataSource: new DataManager((Data as any).data),
        },

        // Handles selection change event
        selectionChange: selectionChange,

        // Sets the default values of Nodes.
        getNodeDefaults: getNodeDefaults,

        // Sets the default values of connectors.
        getConnectorDefaults: getConnectorDefaults,

        // Customization of the node.
        setNodeTemplate: setNodeTemplate,
    });
    diagram.appendTo('#diagram');

    // Create a new instance of Toolbar functionality
    toolbarObj = new Toolbar({

        // Specify the function to handle item clicks
        clicked: handleToolbarClick,

        // Define the items to be displayed in the toolbar
        items: [
            { id: 'ZoomIn', type: 'Button', tooltipText: 'Zoom In', prefixIcon: 'e-icons e-zoom-in' },
            { id: 'ZoomOut', type: 'Button', tooltipText: 'Zoom Out', prefixIcon: 'e-icons e-zoom-out' },
            { type: 'Separator' },
            { id: 'Select', type: 'Button', tooltipText: 'Select', prefixIcon: 'e-icons e-mouse-pointer' },
            { id: 'PanTool', type: 'Button', tooltipText: 'Pan Tool', prefixIcon: 'e-icons e-pan' },
            { type: 'Separator' },
            { id: 'Reset', type: 'Button', tooltipText: 'Reset', prefixIcon: 'e-icons e-reset' },
            { id: 'FitToPage', type: 'Button', tooltipText: 'Fit To Page', prefixIcon: 'e-icons e-zoom-to-fit' },
            { type: 'Separator' },
            { id: 'BringIntoView', type: 'Button', tooltipText: 'Bring Into View', prefixIcon: 'e-icons e-bring-to-view', disabled: true },
            { id: 'BringIntoCenter', type: 'Button', tooltipText: 'Bring Into Center', prefixIcon: 'e-icons e-bring-to-center', disabled: true }
        ]
    });
    toolbarObj.appendTo('#toolbar');
};