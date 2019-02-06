
import { PivotView, FieldList, IDataSet } from '@syncfusion/ej2-pivotview';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
PivotView.Inject(FieldList);

/**
 * PivotView Exporting Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            data: Pivot_Data,
            expandAll: false
        },
        width: '100%',
        height: 300,
        allowExcelExport: true,
        allowPdfExport: true,
        showFieldList: true,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

    let exportType: DropDownList = new DropDownList({
        index: 0,
        width: 160
    });
    exportType.appendTo('#mode');
    let exportBtn: Button = new Button({
        cssClass: 'e-flat', isPrimary: true,
    });
    exportBtn.appendTo('#export-btn');
    document.getElementById('export-btn').onclick = () => {
        if (exportType.value === 'excel') {
            pivotGridObj.excelExport();
        } else if (exportType.value === 'csv') {
            pivotGridObj.csvExport();
        } else {
            pivotGridObj.pdfExport();
        }
    };
};
