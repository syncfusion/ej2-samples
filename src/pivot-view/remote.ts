
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { DataManager, Query, ReturnOption, WebApiAdaptor } from '@syncfusion/ej2-data';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/**
 * PivotView sample for Remote data source.
 */

this.default = (): void => {
    let remoteData: IDataSet[];
    new DataManager({
        url: 'https://bi.syncfusion.com/northwindservice/api/orders',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    }).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
        remoteData = e.result as IDataSet[];
        let pivotGridObj: PivotView = new PivotView({
            dataSource: {
                data: remoteData as IDataSet[],
                expandAll: true,
                filters: [],
                columns: [{ name: 'ProductName', caption: 'Product Name' }],
                rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
                formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
                values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
            },
            height: 300,
            width: '100%',
            gridSettings: { columnWidth: 120 }
        });
        pivotGridObj.appendTo('#PivotView1');
    });
};
