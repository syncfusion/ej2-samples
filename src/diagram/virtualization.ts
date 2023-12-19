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
function dataVirtualization(): any {
    let i: number = 0;
    let j: number;
    let k: number;
    let name: string;
    let parentName: string;

    let data: any = [];
    parentName = virtualizationData[0].Name;
    data.push({ 'Name': parentName, 'Parent': '' });
    i++;
    for (j = 1; j < 100; j++) {
        name = virtualizationData[i].Name;
        data.push({ 'Name': name, 'Parent': parentName });
        i++;
        for (k = 0; k < 2; k++) {
            data.push({ 'Name': virtualizationData[i].Name, 'Parent': name });
            i++;
        }
    }
    return data;
}
function getNodeDefaults(obj: any): NodeModel {
    obj.shape = { type: 'Text', content: obj.data.Name, shape: 'Rectangle', cornerRadius: 5 };
    obj.style = { fill: '#659be5', strokeColor: 'none', color: 'white', strokeWidth: 2 };
    obj.backgroundColor = '#659be5';
    obj.margin = { left: 5, right: 5, bottom: 5, top: 5 };
    obj.width = 80;
    obj.height = 30;
    return obj;
}

function getConnectorDefaults(connector: ConnectorModel): void {
    connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = '#6d6d6d';
}
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: 500,
        //Configrues hierarchical tree layout
        layout: {
            type: 'HierarchicalTree',
            margin: { left: 10, top: 10 },
            horizontalSpacing: 40.0,
            verticalSpacing: 50.0,
            orientation: 'TopToBottom',
        },
        getNodeDefaults: getNodeDefaults,
        getConnectorDefaults: getConnectorDefaults,

        //Configures data source
        dataSourceSettings: {
            dataSource: virtualData,
            parentId: 'Parent',
            id: 'Name'
        },
        //Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        //Enables the virtualization constraint
        constraints: DiagramConstraints.Default | DiagramConstraints.Virtualization,
        snapSettings: { constraints: SnapConstraints.None },
        created: () => {
            //fit the diagram to the page with respect to mode and region
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
    let toolbarObj: Toolbar = new Toolbar({
        clicked: onItemClick,
        items: [
            { type: 'Button', tooltipText: 'ZoomIn', text: 'Zoom In', prefixIcon: 'e-ddb-icons e-zoomin' }, { type: 'Separator' },
            { type: 'Button', tooltipText: 'ZoomOut', text: 'Zoom Out', prefixIcon: 'e-ddb-icons e-zoomout' }, { type: 'Separator' },
            { type: 'Button', tooltipText: 'Reset', text: 'Reset', prefixIcon: 'e-diagram-icons e-diagram-reset' }
        ]
    });
    toolbarObj.appendTo('#toolbar');
    function onItemClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'Zoom In':
                let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
                diagram.zoomTo(zoomin);
                break;
            case 'Zoom Out':
                let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
                diagram.zoomTo(zoomout);
                break;
            case 'Reset':
                diagram.reset();
                diagram.fitToPage({ mode: 'Page', region: 'CustomBounds', margin: { left: 50, right: 50 }, customBounds: bound });
                break;
        }
    }



};