import { TreeView } from '@syncfusion/ej2-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

/**
 * TreeView remote data sample
 */
this.default = () => {
    // Use data manager to get tree data from remote source
    let data: DataManager = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor,
        crossDomain: true,
    });
    // Set queries to filter and fetch remote data
    let query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    let query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);

    // Render the TreeView with remote data source
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: data, query: query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
            child: { dataSource: data, query: query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
        },
        created: show,
        dataBound: hide,
    });
    treeObj.appendTo('#tree');
    // Show loading message, while loading tree data
    function show(): void {
        let popup: HTMLElement = document.getElementById('loading');
        popup.style.display = '';
    }
    // Hide loading message, after tree data has been loaded
    function hide(): void {
        let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
        popup.style.display = 'none';
    }
};