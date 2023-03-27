import { loadCultureFiles } from '../common/culture-loader';
/**
 * hierarchical-model
 */

import {
    Diagram, NodeModel, ConnectorModel, LayoutAnimation, LayoutOrientation,
    TextModel, DataBinding, HierarchicalTree, SnapConstraints, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DataManager } from '@syncfusion/ej2-data';
Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);
import * as Data from './diagram-data.json';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2/buttons';

export interface EmployeeInfo {
    Name: string;
}

//sets node default value
function nodeDefaults(obj: NodeModel): NodeModel {
    obj.style = { fill: '#659be5', strokeColor: 'none', color: 'white', strokeWidth: 2 };
    obj.borderColor = '#3a6eb5';
    obj.backgroundColor = '#659be5';
    (obj.shape as TextModel).margin = { left: 5, right: 5, bottom: 5, top: 5 };
    obj.expandIcon = { height: 10, width: 10, shape: 'None', fill: 'lightgray', offset: { x: .5, y: 1 } };
    obj.expandIcon.verticalAlignment = 'Auto';
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.offset = { x: .5, y: 1 };
    obj.collapseIcon.verticalAlignment = 'Auto';
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.height = 10;
    obj.collapseIcon.width = 10;
    obj.collapseIcon.padding.top = 5;
    obj.collapseIcon.shape = 'None';
    obj.collapseIcon.fill = 'lightgray';
    return obj;
}

function connectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.style.strokeColor = '#6d6d6d';
    connector.constraints = 0;
    connector.cornerRadius = 5;
    return connector;
}


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes the nodes for the diagram
    let diagram: Diagram = new Diagram({
        width: '100%', height: '499px', snapSettings: { constraints: SnapConstraints.None },
        //configures data source settings
        dataSourceSettings: {
            //sets the fields to bind
            id: 'Name', parentId: 'Category',
            dataSource: new DataManager((Data as any).hierarchicalTree),
            //binds the data with the nodes
            doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
                nodeModel.shape = { type: 'Text', content: (data as EmployeeInfo).Name };
            }
        },
        //Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        //Configures automatic layout
        layout: {
            type: 'HierarchicalTree', verticalSpacing: 30, horizontalSpacing: 40,
            enableAnimation: true
        },
        //Defines the default node and connector properties
        getNodeDefaults: nodeDefaults,
        getConnectorDefaults: connectorDefaults
    });
    diagram.appendTo('#diagram');

    //Click event for Appearance of the Property Panel.
    document.getElementById('appearance').onclick = (args: MouseEvent) => {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (target.className === 'image-pattern-style') {
            let id: string = target.id;
            let orientation1: string = id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
            diagram.layout.orientation = orientation1 as LayoutOrientation;
            diagram.dataBind();
            diagram.doLayout();
        }
    };
    let hSpacing: NumericTextBox = new NumericTextBox({
        format: '###.##',
        change: () => {
            diagram.layout.horizontalSpacing = Number(hSpacing.value);
            diagram.dataBind();
        }
    });
    hSpacing.appendTo('#hSpacing');

    let vSpacing: NumericTextBox = new NumericTextBox({
        format: '###.##',
        change: () => {
            diagram.layout.verticalSpacing = Number(vSpacing.value);
            diagram.dataBind();
        }
    });
    vSpacing.appendTo('#vSpacing');
    let checkBoxObj: CheckBox = new CheckBox({ change: onChange });
    checkBoxObj.appendTo('#expand');
        function onChange (args : ChangeEventArgs): void {
            for (let node of diagram.nodes) {
                if (args.checked) {
                    node.expandIcon.shape = 'Minus';
                    node.collapseIcon.shape = 'Plus';
                } else {
                    node.expandIcon.shape = 'None';
                    node.collapseIcon.shape = 'None';
                }
            }
        diagram.dataBind();
        diagram.doLayout();
    }; 
};
