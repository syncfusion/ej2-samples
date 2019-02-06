import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Edit, Toolbar, Page, DialogEditEventArgs } from '@syncfusion/ej2-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { orderData } from './data-source';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { Browser } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';

/**
 * Dialog Template Editing sample
 */
Grid.Inject(Edit, Toolbar, Page);
(window as any).default = (): void => {
    loadCultureFiles();
    let countryData: {}[] = DataUtil.distinct(orderData, 'ShipCountry', true);
    let shipCityData: {}[] = DataUtil.distinct(orderData, 'ShipCity', true);

    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 60),
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: '#dialogtemplate' },
            allowPaging: true,
            pageSettings: {pageCount: 5},
            toolbar: ['Add', 'Edit', 'Delete'],
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                    validationRules: { required: true }, width: 120, defaultValue: ''
                },
                {
                    field: 'CustomerID', headerText: 'Customer ID',
                    validationRules: { required: true }, width: 140, defaultValue: ''
                },
                {
                    field: 'Freight', headerText: 'Freight', textAlign: 'Right',
                    width: 120, format: 'C2', validationRules: { required: true }
                },
                {
                    field: 'OrderDate', headerText: 'Order Date',
                    format: 'yMd', width: 170, validationRules: { date:  [true, 'Enter valid date'] }
                },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', width: 150, defaultValue: ''
                }],
                actionComplete: actionComplete
        });
    grid.appendTo('#Grid');

    function actionComplete(args: DialogEditEventArgs): void {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            let data: IOrderModel = args.rowData;
            // Convert Widget for the Freight field
            new NumericTextBox({value: data.Freight, format: 'C2', placeholder: 'Freight', floatLabelType: 'Always' },
                               args.form.elements.namedItem('Freight') as HTMLInputElement );

            // Convert Widget for the ShipCountry field
            new DropDownList({value: data.ShipCountry, popupHeight: '300px', floatLabelType: 'Always',
                             dataSource: countryData, fields: {text: 'ShipCountry', value: 'ShipCountry'}, placeholder: 'Ship Country'},
                             args.form.elements.namedItem('ShipCountry') as HTMLInputElement);

            // Convert Widget for the OrderDate field
            new DatePicker({value: data.OrderDate, placeholder: 'Order Date', floatLabelType: 'Always' },
                           args.form.elements.namedItem('OrderDate') as HTMLInputElement);

            // Convert Widget for the ShipCity field
            new DropDownList({value: data.ShipCity, dataSource: shipCityData, floatLabelType: 'Always',
                             popupHeight: '300px', fields: {text: 'ShipCity', value: 'ShipCity' }, placeholder: 'Ship City' },
                             (args.form.elements.namedItem('ShipCity')as HTMLInputElement));

            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                (<Dialog>args.dialog).dataBind();
            }
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('CustomerID')as HTMLInputElement).focus();
            } else {
                (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
            }
        }
    }
};

export interface IOrderModel {
    CustomerID?: string;
    ShipCity?: string;
    OrderDate?: Date;
    Freight?: number;
    ShipCountry?: string;
}