import { loadCultureFiles } from '../common/culture-loader';
/**
 * Virtualization
 */
import { virtualizationData } from './complexShapes.data';
import { DataManager } from '@syncfusion/ej2-data';
import {
    Diagram, ConnectorModel, DataBinding, ZoomOptions, HierarchicalTree, NodeModel, SnapConstraints,
    DiagramConstraints, Rect, DiagramTools
} from '@syncfusion/ej2-diagrams';
Diagram.Inject(DataBinding, HierarchicalTree);
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
let bound: Rect = new Rect(100, 100, 500, 100);
let virtualData: any = new DataManager(dataVirtualization());

/**
 * Generates virtualized data based on the provided virtualizationData.
 * @returns An array of virtualized data objects.
 */
function dataVirtualization(): any {
    let i: number = 0;
    let data: any = [];
    // Get the parent name from the first element of virtualizationData
    let parentName: string = virtualizationData[0].Name;
    data.push({ 'Name': parentName, 'Parent': '' });
    // Iterate to generate virtualized data
    i++;
    for (let j: number = 1; j < 100; j++) {
        // Get the name for the current iteration
        let name: string = virtualizationData[i].Name;
        // Add the current data object to the array with its parent
        data.push({ 'Name': name, 'Parent': parentName });
        i++;
        // Add child data objects for the current iteration
        for (let k: number = 0; k < 2; k++) {
            data.push({ 'Name': virtualizationData[i].Name, 'Parent': name });
            i++;
        }
    }
    return data;
}

// Sets default properties for nodes in the diagram
function getNodeDefaults(node: any): NodeModel {
    node.shape = { type: 'Text', content: node.data.Name, shape: 'Rectangle', cornerRadius: 5 };
    node.style = { fill: '#659be5', strokeColor: 'none', color: 'white', strokeWidth: 2 };
    node.backgroundColor = '#659be5';
    node.margin = { left: 5, right: 5, bottom: 5, top: 5 };
    node.width = 80;
    node.height = 30;
    return node;
}

// Sets default properties for connectors in the diagram
function getConnectorDefaults(connector: ConnectorModel): void {
    connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = '#6d6d6d';
}

(window as any).default = (): void => {
    loadCultureFiles();
    // Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: 500,
        // Configrues hierarchical tree layout
        layout: {
            type: 'HierarchicalTree',
            margin: { left: 10, top: 10 },
            horizontalSpacing: 40.0,
            verticalSpacing: 50.0,
            orientation: 'TopToBottom',
        },
        getNodeDefaults: getNodeDefaults,
        getConnectorDefaults: getConnectorDefaults,

        // Configures data source
        dataSourceSettings: {
            dataSource: virtualData,
            parentId: 'Parent',
            id: 'Name'
        },
        // Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        // Enables the virtualization constraint
        constraints: DiagramConstraints.Default | DiagramConstraints.Virtualization,
        snapSettings: { constraints: SnapConstraints.None },
        created: () => {
            // Fits the diagram to the page with respect to mode and region
            diagram.fitToPage(
                {
                    mode: 'Page',
                    region: 'CustomBounds',
                    margin: { left: 50, right: 50 },
                    customBounds: bound
                });
        },
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage();

    // Create a new Toolbar instance
    let toolbarObj: Toolbar = new Toolbar({
        // Define the function to handle item clicks
        clicked: handleToolbarItemClick,
        // Define the items for the toolbar
        items: [
            { type: 'Button', tooltipText: 'ZoomIn', text: 'Zoom In', prefixIcon: 'e-ddb-icons e-zoomin' }, { type: 'Separator' },
            { type: 'Button', tooltipText: 'ZoomOut', text: 'Zoom Out', prefixIcon: 'e-ddb-icons e-zoomout' }, { type: 'Separator' },
            { type: 'Button', tooltipText: 'Reset', text: 'Reset', prefixIcon: 'e-diagram-icons e-diagram-reset' }
        ]
    });
    toolbarObj.appendTo('#toolbar');

    // Handles click events on toolbar items and performs actions like zoom in, zoom out, and reset
    function handleToolbarItemClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case "Zoom In":
                let zoomInOptions: ZoomOptions = { type: "ZoomIn", zoomFactor: 0.2 };
                diagram.zoomTo(zoomInOptions);
                break;
            case "Zoom Out":
                let zoomOutOptions: ZoomOptions = { type: "ZoomOut", zoomFactor: 0.2 };
                diagram.zoomTo(zoomOutOptions);
                break;
            case "Reset":
                diagram.reset();
                diagram.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: bound });
                break;
        }
    }
};