import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page, Selection);

/**
 * RemoteData sample
 */
this.default = (): void => {
    let data: Object = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    let grid: Grid = new Grid(
        {
            dataSource: data,
            allowPaging: true,
            columns: [
                { field: 'ProductID', headerText: 'Product ID', width: 130, textAlign: 'right' },
                { field: 'ProductName', headerText: 'Product Name', width: 170 },
                { field: 'UnitPrice', headerText: 'Unit Price', width: 135, textAlign: 'right', format: 'C2', },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 160, textAlign: 'right' },
                {
                    field: 'Discontinued', headerText: 'Discontinued', width: 150, textAlign: 'center', type: 'boolean',
                    displayAsCheckBox: true
                },
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
};

