import { loadCultureFiles } from '../common/culture-loader';
/**
 * Remote Data binding sample
 */

import {
    Diagram, NodeModel, ConnectorModel, DataBinding, HierarchicalTree, TreeInfo, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager, Query } from '@syncfusion/ej2-data';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree);


//Sets the default values of nodes
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 80;
    obj.height = 40;
    //Initialize shape
    obj.shape = { type: 'Basic', shape: 'Rectangle' };
    obj.style = { fill: '#048785', strokeColor: 'Transparent' };
    return obj;
}

//Sets the default values of connector
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';
    connector.style.strokeColor = '#048785';
    connector.targetDecorator.shape = 'None';
    return connector;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: 490,
        //Configrues hierarchical tree layout
        layout: {
            type: 'HierarchicalTree', margin: { left: 0, right: 0, top: 100, bottom: 0 },
            verticalSpacing: 40,
            getLayoutInfo: (node: NodeModel, options: TreeInfo) => {
                if (options.level === 3) {
                    node.style.fill = '#3c418d';
                }
                if (options.level === 2) {
                    node.style.fill = '#108d8d';
                    options.type = 'Center';
                    options.orientation = 'Horizontal';
                }
                if (options.level === 1) {
                    node.style.fill = '#822b86';
                }
            }
        },
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of connector
        getConnectorDefaults: getConnectorDefaults,
        //Configures data source
        dataSourceSettings: {
            id: 'EmployeeID', parentId: 'ReportsTo',
            dataSource: new DataManager(
                { url: 'https://mvc.syncfusion.com/Services/Northwnd.svc/', crossDomain: true },
                new Query().from('Employees').select('EmployeeID,ReportsTo,FirstName').take(9),
            ),
            //binds the external data with node
            doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
                nodeModel.annotations = [{
                    /* tslint:disable:no-string-literal */
                    content: data['FirstName'],
                    style: { color: 'white' }
                }];
            }
        },
        //Disables all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        snapSettings: { constraints: 0 }
    });
    diagram.appendTo('#diagram');
};
