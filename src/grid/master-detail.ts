import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { data, customerData } from './data-source';

Grid.Inject(Selection);

/**
 * Master/Detail Grid sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    type carType = { CustomerID: string, CustomerName: string, ContactName: string };
    let names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
    let masterdata: Object = customerData.filter((e: carType) => names.indexOf(e.CustomerID) !== -1);
    let mastergrid: Grid = new Grid({
        dataSource: masterdata,
        selectedRowIndex: 1,
        columns: [
            { field: 'ContactName', headerText: 'Customer Name', width: 150 },
            { field: 'CompanyName', headerText: 'Company Name', width: 150 },
            { field: 'Address', headerText: 'Address', width: 150 },
            { field: 'Country', headerText: 'Country', width: 130 }
        ],
        rowSelected: rowSelected
    });
    mastergrid.appendTo('#MasterGrid');
    function rowSelected(args: RowSelectEventArgs): void {
        let selRecord: carType = args.data as carType;
        grid.dataSource = data.filter((record: carType) => record.CustomerName === selRecord.ContactName).slice(0, 5);
        document.getElementById('key').innerHTML = selRecord.ContactName;
   }
    let grid: Grid = new Grid({
        allowSelection: false,
        columns: [
            { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
            { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2', type: 'number' },
            { field: 'ShipName', headerText: 'Ship Name', width: 200},
            { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
            { field: 'ShipAddress', headerText: 'Ship Address', width: 200 },
        ]
    });
    grid.appendTo('#DetailGrid');
};
