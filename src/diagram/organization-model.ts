import { loadCultureFiles } from '../common/culture-loader';
/**
 * organization-model
 */

import {
    Diagram, NodeModel, ConnectorModel, LayoutOrientation, LayoutAnimation, TreeInfo, SubTreeOrientation,
    SubTreeAlignments, DiagramTools, DataBinding, HierarchicalTree, SnapConstraints, ConnectorConstraints
} from '@syncfusion/ej2-diagrams';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';

Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

//sets default value for Node.
function nodeDefaults(obj: NodeModel): NodeModel {
    obj.backgroundColor = (obj.data as EmployeeInfo).color;
    obj.style = { fill: 'none', strokeColor: 'none', color: 'white' };
    obj.expandIcon = { height: 10, width: 10, shape: 'None', fill: 'lightgray', offset: { x: .5, y: 1 } };
    obj.expandIcon.verticalAlignment = 'Center';
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon = { height: 10, width: 10, shape: 'None', fill: 'lightgray', offset: { x: 0.5, y: 1 } };
    obj.collapseIcon.verticalAlignment = 'Center';
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.width = 120;
    obj.height = 30;
    return obj;
}

//sets default value for Connector.
function connectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.constraints = ConnectorConstraints.None;
    connector.cornerRadius = 0;
    return connector;
}

export interface DataInfo {
    [key: string]: string;
}

export interface EmployeeInfo {
    Role: string;
    color: string;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes the nodes for the diagram
    let diagram: Diagram = new Diagram({
        width: '100%', height: '700px', snapSettings: { constraints: SnapConstraints.None },
        //configures data source settings
        dataSourceSettings: {
            id: 'Id', parentId: 'Manager',
            dataSource: new DataManager((Data as any).localBindData as JSON[]),
            doBinding: (nodeModel: NodeModel, data: object) => {
                nodeModel.shape = {
                    type: 'Text', content: (data as EmployeeInfo).Role,
                    margin: { left: 10, right: 10, top: 10, bottom: 10 }
                };
            }
        },
        //Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        //Configures automatic layout
        layout: {
            type: 'OrganizationalChart',
            getLayoutInfo: (node: NodeModel, options: TreeInfo) => {
                /* tslint:disable:no-string-literal */
                if ((node.data as DataInfo)['Role'] === 'General Manager') {
                    options.assistants.push(options.children[0]);
                    options.children.splice(0, 1);
                }
                if (!options.hasSubTree) {
                    options.type = 'Right';
                }
            }
        },
        //Defines the default node and connector properties
        getNodeDefaults: nodeDefaults,
        getConnectorDefaults: connectorDefaults
    });
    diagram.appendTo('#diagram');

    //NumericTextBox used to increase/decrease horizontalSpacing of the layout.
    let horizontalSpacing: NumericTextBox = new NumericTextBox({
        format: '###.##',
        change: () => {
            diagram.layout.horizontalSpacing = Number(horizontalSpacing.value);
            diagram.dataBind();
        }
    });
    horizontalSpacing.appendTo('#horizontalSpacing');

    //NumericTextBox used to increase/decrease verticalSpacing of the layout. 
    let verticalSpacing: NumericTextBox = new NumericTextBox({
        format: '###.##',
        change: () => {
            diagram.layout.verticalSpacing = Number(verticalSpacing.value);
            diagram.dataBind();
        }
    });
    verticalSpacing.appendTo('#verticalSpacing');

    //Click Event for orientation of the PropertyPanel.
    document.getElementById('orientation').onclick = (args: MouseEvent) => {
        let target: HTMLElement = args.target as HTMLElement;
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-orientation-style');
        // custom code start
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-orientation-style');
        }
        if (!target.classList.contains('e-selected-orientation-style')) {
            target.classList.add('e-selected-orientation-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style e-selected-orientation-style') {
            let id: string = target.id;
            let orientation1: string = id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
            diagram.layout.orientation = orientation1 as LayoutOrientation;
            diagram.dataBind();
            diagram.doLayout();
        }
    };
    //Click Event for pattern of the PropertyPanel.
    document.getElementById('pattern').onclick = (args: MouseEvent) => {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedpatternElement: HTMLCollection = document.getElementsByClassName('e-selected-pattern-style');
        if (selectedpatternElement.length) {
            selectedpatternElement[0].classList.remove('e-selected-pattern-style');
        }
        if (!target.classList.contains('e-selected-pattern-style')) {
            target.classList.add('e-selected-pattern-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style e-selected-pattern-style') {
            let subTreeOrientation: SubTreeOrientation;
            let subTreeAlignment: SubTreeAlignments;
            switch (target.id) {
                case 'pattern1':
                    subTreeOrientation = 'Vertical';
                    subTreeAlignment = 'Alternate';
                    break;
                case 'pattern2':
                    subTreeOrientation = 'Vertical';
                    subTreeAlignment = 'Left';
                    break;
                case 'pattern5':
                    subTreeOrientation = 'Vertical';
                    subTreeAlignment = 'Right';
                    break;
                case 'pattern6':
                    subTreeOrientation = 'Horizontal';
                    subTreeAlignment = 'Balanced';
                    break;
                case 'pattern7':
                    subTreeOrientation = 'Horizontal';
                    subTreeAlignment = 'Center';
                    break;
                case 'pattern8':
                    subTreeOrientation = 'Horizontal';
                    subTreeAlignment = 'Left';
                    break;
                case 'pattern9':
                    subTreeOrientation = 'Horizontal';
                    subTreeAlignment = 'Right';
                    break;
                default:
                    if (selectedpatternElement.length) {
                        selectedpatternElement[0].classList.remove('e-selected-pattern-style');
                    }
            }

            diagram.layout.getLayoutInfo = (node: NodeModel, options: TreeInfo) => {
                if (target.id === 'pattern4' || target.id === 'pattern3') {
                    options.offset = -50;
                }
                if ((node.data as DataInfo)['Role'] === 'General Manager') {
                    options.assistants.push(options.children[0]);
                    options.children.splice(0, 1);
                }
                if (!options.hasSubTree) {
                    options.orientation = subTreeOrientation;
                    options.type = subTreeAlignment;
                }
            };
            diagram.dataBind();
            diagram.doLayout();
        }
    };

    //Enable of disable the expandable option for Node.
    let checkBoxExpand: CheckBox = new CheckBox({
        label: 'Expandable',
        checked: false, change: () => {
            for (let node of diagram.nodes) {
                if (checkBoxExpand.checked) {
                    node.expandIcon.shape = 'Minus';
                    node.collapseIcon.shape = 'Plus';
                } else {
                    node.expandIcon.shape = 'None';
                    node.collapseIcon.shape = 'None';
                }
            }
            diagram.dataBind();
            diagram.doLayout();
        }
    });
    checkBoxExpand.appendTo('#checked');
};
