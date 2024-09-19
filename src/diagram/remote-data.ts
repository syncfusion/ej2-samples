import { loadCultureFiles } from '../common/culture-loader';
/**
 * Remote Data binding sample
 */

import {
    Diagram, NodeModel, ConnectorModel, DataBinding, HierarchicalTree, DiagramTools
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';

export interface DataInfo {
    [key: string]: string;
}

Diagram.Inject(DataBinding, HierarchicalTree);

// Sets the default values of nodes
function getNodeDefaults(node: NodeModel): NodeModel {
    node.width = 80;
    node.height = 40;
    // Initialize shape
    node.shape = { type: 'Basic', shape: 'Rectangle' };
    node.style = { fill: '#048785', strokeColor: 'Transparent' };
    return node;
}

// Sets the default values of connector
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
        },
        // Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        // Sets the default values of connector
        getConnectorDefaults: getConnectorDefaults,
        // Configure the data source for the diagram
        dataSourceSettings: {
            id: 'Id', parentId: 'ParentId',
            dataSource: new DataManager({
                url: 'https://services.syncfusion.com/js/production/api/RemoteData',
                crossDomain: true
            }),
            // Bind external data to node properties
            doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
                nodeModel.annotations = [{
                    /* tslint:disable:no-string-literal */
                    content: data['Label'],
                    style: { color: 'white' }
                }];
            }
        },
        // Disable all interactions except zoom/pan
        tool: DiagramTools.ZoomPan,
        snapSettings: { constraints: 0 }
    });
    diagram.appendTo('#diagram');
};
