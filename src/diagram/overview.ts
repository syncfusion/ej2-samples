import { loadCultureFiles } from '../common/culture-loader';
/**
 * OverView
 */

import {
    Diagram, ConnectorModel, NodeModel, Overview, SnapConstraints,
    Container, TextElement, StackPanel, ImageElement, DataBinding, HierarchicalTree,
    TreeInfo, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './overview-data.json';

Diagram.Inject(DataBinding, HierarchicalTree);

// Sets the default values of Nodes.
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.height = 50;
    obj.style = { fill: 'transparent', strokeWidth: 2 };
    return obj;
}
// Sets the default values of connectors.
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.style.strokeColor = 'gray';
    return connector;
}

// Funtion to add the Template of the Node.
function setNodeTemplate(obj: NodeModel): Container {
    let content: StackPanel = new StackPanel();
    content.id = obj.id + '_outerstack';
    content.orientation = 'Horizontal';
    content.style.strokeColor = 'gray';
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

    let image: ImageElement = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = 'none';
    image.source = (obj.data as EmployeeInfo).ImageUrl;
    image.id = obj.id + '_pic';

    let innerStack: StackPanel = new StackPanel();
    innerStack.style.strokeColor = 'none';
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + '_innerstack';

    let text: TextElement = new TextElement();
    text.content = (obj.data as EmployeeInfo).Name;
    text.style.color = 'black';
    text.style.bold = true;
    text.style.strokeColor = 'none';
    text.horizontalAlignment = 'Left';
    text.style.fill = 'none';
    text.id = obj.id + '_text1';

    let desigText: TextElement = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = (obj.data as EmployeeInfo).Designation;
    desigText.style.color = 'black';
    desigText.style.strokeColor = 'none';
    desigText.style.fontSize = 12;
    desigText.style.fill = 'none';
    desigText.horizontalAlignment = 'Left';
    desigText.style.textWrapping = 'Wrap';
    desigText.id = obj.id + '_desig';
    innerStack.children = [text, desigText];

    content.children = [image, innerStack];

    return content;
}

export interface EmployeeInfo {
    Name: string;
    Designation: string;
    ImageUrl: string;
}
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    let diagram: Diagram = new Diagram({
        width: '100%', height: '590px', scrollSettings: { scrollLimit: 'Infinity' },
        // Sets the constraints of the SnapSettings
        snapSettings: { constraints: SnapConstraints.None },
        // Configrues organizational chart layout
        layout: {
            type: 'OrganizationalChart', margin: { top: 20 },
            getLayoutInfo: (tree: TreeInfo) => {
                if (!tree.hasSubTree) {
                    tree.orientation = 'Vertical';
                    tree.type = 'Right';
                }
            }
        },
        // Sets the parent and child relationship of DataSource.
        dataSourceSettings: {
            id: 'Id', parentId: 'ReportingPerson', dataSource: new DataManager((Data as any).data)
        },
        // Sets the default values of Nodes.
        getNodeDefaults: getNodeDefaults,
        // Sets the default values of connectors.
        getConnectorDefaults: getConnectorDefaults,
        // Customization of the node.
        setNodeTemplate: setNodeTemplate,
        tool: DiagramTools.ZoomPan,
    });
    diagram.appendTo('#diagram');

    // Initializtion of the Overview.
    let overview: Overview = new Overview({
        width: '100%', height: '150ppx',
        sourceID: 'diagram'
    });
    overview.appendTo('#overview');
};
