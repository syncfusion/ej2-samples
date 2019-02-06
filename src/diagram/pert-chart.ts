import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample for PERT Chart
 */

import {
    Diagram, NodeModel, DataBinding, DiagramElement, StackPanel, VerticalAlignment, randomId,
    SnapConstraints, TextStyleModel, TextElement, HorizontalAlignment, DiagramTools,
    HierarchicalTree, ComplexHierarchicalTree, ConnectorModel
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree, ComplexHierarchicalTree);


function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Straight';
    connector.style.strokeColor = '#979797';
    connector.targetDecorator.width = 10;
    connector.targetDecorator.height = 10;
    connector.targetDecorator.style = { fill: '#979797', strokeColor: '#979797' };
    return connector;
}

//customization of the node template.
function setNodeTemplate(node: NodeModel): StackPanel {
    let table: StackPanel = new StackPanel();
    table.id = randomId();
    table.style.fill = '#0069d9';
    table.orientation = 'Vertical';
    let nameKey: string = 'id';
    let stack: StackPanel = new StackPanel();
    stack.id = randomId();
    stack.children = [];
    stack.height = 25;
    stack.orientation = 'Horizontal';
    stack.style.fill = 'white';
    stack.horizontalAlignment = 'Stretch';
    addRows(stack, node);
    table.children = [(getTextElement((node.data as DataInfo)[nameKey], 'Stretch', 170, 'Stretch')), stack];
    (table.children[0].style as TextStyleModel).color = 'white';
    (table.children[0].style as TextStyleModel).fontSize = 14;
    return table;
}

function getTextElement(
    text: string, alignment: HorizontalAlignment,
    width?: number, valignment?: VerticalAlignment
): DiagramElement {
    let textElement: TextElement = new TextElement();
    textElement.id = randomId();
    textElement.content = text;
    textElement.width = width;
    textElement.height = 25;
    textElement.horizontalAlignment = alignment;
    textElement.verticalAlignment = valignment;
    textElement.style.strokeWidth = 1;
    textElement.style.strokeColor = '#b5b5b5';
    textElement.style.fill = 'transparent';
    textElement.style.color = '#3c3c3c';
    textElement.relativeMode = 'Object';
    return textElement;
}

function addRows(column: StackPanel, node: NodeModel): void {
    let nodeInfo: DataInfo = node.data as DataInfo;
    column.children.push(getTextElement(nodeInfo.startDate, 'Left', 70));
    column.children.push(getTextElement(nodeInfo.duration, 'Center', 30));
    column.children.push(getTextElement(nodeInfo.endDate, 'Right', 70));
}

(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '499px', snapSettings: { constraints: SnapConstraints.None },
        dataSourceSettings: {
            id: 'id', parentId: 'Category',
            dataManager: new DataManager((Data as any).pertChartData),
            //binds the external data with node
            doBinding: (nodeModel: NodeModel) => {
                /* tslint:disable:no-string-literal */
                nodeModel['shape'] = { type: 'Text' };
            }
        },
        layout: {
            type: 'ComplexHierarchicalTree', orientation: 'LeftToRight',
            verticalSpacing: 100, horizontalSpacing: 70
        },
        //Sets the default values of connector
        getConnectorDefaults: getConnectorDefaults,
        //used to customize template of the node.
        setNodeTemplate: setNodeTemplate,
        tool: DiagramTools.ZoomPan
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage();
};
