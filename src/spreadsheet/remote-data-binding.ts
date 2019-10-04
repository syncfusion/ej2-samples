import { loadCultureFiles } from '../common/culture-loader';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

/**
 * Remote Data Binding sample.
 */
(window as any).default = (): void => {
    loadCultureFiles();

    class CustomAdaptor extends ODataAdaptor {
        public processResponse(): Object {
            let result: Object[] = [];
            let original: { result: Object[], count: number } = super.processResponse.apply(this, arguments);
            original.result.forEach((item: { SNo: number }, idx: number) => {
                result[idx] = {};
                Object.keys(item).forEach((key: string) => {
                    if (['OrderID', 'CustomerID', 'ShipName', 'ShipCity', 'ShipCountry'].indexOf(key) > -1) {
                        result[idx][key] = item[key];
                    }
                });
            });
            return { result: result, count: original.count };
        }
    }

    //Initialize DataManager.
    let data: DataManager = new DataManager({
        // Remote service url
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders',
        adaptor: new CustomAdaptor,
        crossDomain: true
    });

    //Initialize Spreadsheet component.
    let spreadsheet: Spreadsheet = new Spreadsheet({
        sheets: [
            {
                name: 'Shipment Details',
                rows: [{
                    cells: [{ value: 'Order ID' }, { value: 'Customer Name' }, { value: 'Ship Name' },
                    { value: 'Ship City' }, { value: 'Ship Country' }]
                }],
                rangeSettings: [{ dataSource: data, showFieldAsHeader: false, startCell: 'A2' }],
                columns: [{ width: 100 }, { width: 130 }, { width: 150 }, { width: 200 }, { width: 180 }]
            }],
        openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open',
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
        dataBound: (): void => {
            if (spreadsheet.activeSheetTab === 1 && !spreadsheet.isOpen) {
                spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
            }
        }
    });

    //Render initialized Spreadsheet component.
    spreadsheet.appendTo('#spreadsheet');

};