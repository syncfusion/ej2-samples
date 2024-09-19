import { loadCultureFiles } from '../common/culture-loader';
/**
 * Local Data Binding sample
 */

import {
    Diagram, NodeModel, ConnectorModel, DataBinding, HierarchicalTree, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree);

//Sets the default values of nodes
function getNodeDefaults(obj: NodeModel): NodeModel {
    //Initialize shape
    obj.shape = { type: 'Basic', shape: 'Rectangle' };
    obj.style = { strokeWidth: 1 };
    obj.width = 95;
    obj.height = 30;
    return obj;
}

//Sets the default values of connectors
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style.strokeColor = '#4d4d4d';
    connector.targetDecorator.shape = 'None';
    return connector;
}

export interface EmployeeInfo {
    Role: string;
    color: string;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '350px',
        //Configures data source
        dataSourceSettings: {
            id: 'Name', parentId: 'Category', dataSource: new DataManager((Data as any).species),
            //binds the external data with node
            doBinding: (nodeModel: NodeModel, data: DataInfo) => {
                nodeModel.annotations = [
                    {
                        /* tslint:disable:no-string-literal */
                        content: data['Name'],
                        style: { color: 'black' }
                    }
                ];
                nodeModel.style = { fill: '#ffeec7', strokeColor: '#f5d897', strokeWidth: 1 };
            }
        },
        //Configrues HierarchicalTree layout
        layout: {
            type: 'HierarchicalTree', horizontalSpacing: 15, verticalSpacing: 50,
            margin: { top: 10, left: 10, right: 10, bottom: 0 },
        },
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of connectors
        getConnectorDefaults: getConnectorDefaults,
        //Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        snapSettings: { constraints: 0 }
    });
    diagram.appendTo('#diagram');
};

