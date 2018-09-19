/**
 * Multiple Parent sample
 */

import {
    Diagram, NodeModel, DataBinding, DiagramTools,
    ComplexHierarchicalTree, LayoutOrientation, ConnectorModel
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { multiParentData, DataInfo } from './diagram-data';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';

Diagram.Inject(DataBinding, ComplexHierarchicalTree);

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: 580,
        //Configrues hierarchical tree layout
        layout: {
            type: 'ComplexHierarchicalTree',
            horizontalSpacing: 40, verticalSpacing: 40, orientation: 'TopToBottom',
            margin: { left: 10, right: 0, top: 50, bottom: 0 }
        },
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of connectors
        getConnectorDefaults: getConnectorDefaults,
        //Configures data source
        dataSourceSettings: {
            id: 'Name', parentId: 'ReportingPerson',
            dataManager: new DataManager(multiParentData as JSON[]),
            //binds the external data with node
            doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
                /* tslint:disable:no-string-literal */
                nodeModel.style = { fill: data['fillColor'], strokeWidth: 1, strokeColor: data['border'] };
            }
        },
        //Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        snapSettings: { constraints: 0 }
    });
    diagram.appendTo('#diagram');
    //Click Event for Appearance of the layout.
    document.getElementById('appearance').onclick = (args: MouseEvent) => {
        let target: HTMLElement = args.target as HTMLElement;
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        if (target.className === 'image-pattern-style') {
            let id: string = target.id;
            let orientation1: string = id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
            diagram.layout.orientation = orientation1 as LayoutOrientation;
            diagram.dataBind();
            diagram.doLayout();
            target.classList.add('e-selected-style');
        }
    };
    //used NumericTextBox for left margin of the layout.
    let marginLeftObj: NumericTextBox = new NumericTextBox({
        value: diagram.layout.margin.left, step: 1, format: '##.##',
        change: (args: NumericChangeEventArgs) => {
            diagram.layout.margin.left = args.value;
            diagram.dataBind();
        }
    });
    marginLeftObj.appendTo('#marginLeft');
    //used NumericTextBox for top margin of the layout.
    let marginTopObj: NumericTextBox = new NumericTextBox({
        value: diagram.layout.margin.top, step: 1, format: '##.##',
        change: (args: NumericChangeEventArgs) => {
            diagram.layout.margin.top = args.value;
            diagram.dataBind();
        }
    });
    marginTopObj.appendTo('#marginTop');
    //used NumericTextBox for horizontalspacing of the layout.
    let horizontalSpacingObj: NumericTextBox = new NumericTextBox({
        value: diagram.layout.horizontalSpacing, step: 1, format: '##.##',
        change: (args: NumericChangeEventArgs) => {
            diagram.layout.horizontalSpacing = Number(args.value);
            diagram.dataBind();
        }
    });
    horizontalSpacingObj.appendTo('#horiontal');
    //used NumericTextBox for verticalspacing of the layout.    
    let verticalSpacingObj: NumericTextBox = new NumericTextBox({
        value: diagram.layout.verticalSpacing, step: 1, format: '##.##',
        change: (args: NumericChangeEventArgs) => {
            diagram.layout.verticalSpacing = Number(args.value);
            diagram.dataBind();
        }
    });
    verticalSpacingObj.appendTo('#vertical');
};


//Sets the default values of nodes
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 40; obj.height = 40;
    //Initialize shape
    obj.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 7 };
    return obj;
}
//Sets the default values of connectors
function  getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.cornerRadius = 7;
    connector.targetDecorator.height = 7;
    connector.targetDecorator.width = 7;
    connector.style.strokeColor = '#6d6d6d';
    return connector;
}