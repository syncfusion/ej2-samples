import { TreeView } from '@syncfusion/ej2-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

/**
 * TreeView remote data sample
 */
this.default = () => {
    let data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor,
        crossDomain: true,
    });
    let query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    let query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);

    let treeObj: TreeView = new TreeView({
        fields: { dataSource: data, query: query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
            child: { dataSource: data, query: query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
        },
        created: show,
        dataBound: hide,
    });
    treeObj.appendTo('#tree');
    function show(): void {
        let popup: HTMLElement = document.getElementById('loading');
        popup.style.display = '';
    }
    function hide(): void {
        let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
        popup.style.display = 'none';
    }
};