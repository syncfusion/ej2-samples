import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, RowSelectEventArgs, Toolbar, ExcelExport, PdfExport, ExcelExportProperties, PdfExportProperties } from '@syncfusion/ej2-grids';
import { data, customerData } from './data-source';
import { Button, CheckBox } from '@syncfusion/ej2/buttons';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(Selection, Toolbar, ExcelExport, PdfExport);

/**
 * Multiple Exporting Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    type carType = { CustomerID: string, CustomerName: string, ContactName: string };
    let names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
    let masterdata: Object = customerData.filter((e: carType) => names.indexOf(e.CustomerID) !== -1);
    let mastergrid: Grid = new Grid({
        dataSource: masterdata,
        allowExcelExport: true,
        allowPdfExport: true,
        exportGrids: ['MasterGrid', 'DetailGrid'],
        toolbar: ['ExcelExport', 'PdfExport'],
        selectedRowIndex: 1,
        columns: [
            { field: 'ContactName', headerText: 'Customer Name', width: 150 },
            { field: 'CompanyName', headerText: 'Company Name', width: 150 },
            { field: 'Address', headerText: 'Address', width: 150 },
            { field: 'Country', headerText: 'Country', width: 150 }
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
        allowExcelExport: true,
        allowPdfExport: true,
        columns: [
            { field: 'OrderID', headerText: 'Order ID', width: 150, textAlign: 'Right' },
            { field: 'Freight', headerText: 'Freight', width: 150, format: 'C2', textAlign: 'Right' },
            { field: 'ShipName', headerText: 'Ship Name', width: 150 },
            { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
        ]
    });
    grid.appendTo('#DetailGrid');
    let exportCheckbox: CheckBox = new CheckBox({ checked: true });
    exportCheckbox.appendTo('#multipleExport');
    let newSheetExcelProperties: ExcelExportProperties = {
        multipleExport: { type: 'NewSheet' }
    };
    let sameSheetPdfProperties: PdfExportProperties = {
        multipleExport: { type: "AppendToPage", blankSpace: 10 }
    };
    mastergrid.toolbarClick = function (args: ClickEventArgs) {
        if (exportCheckbox.checked) {
            if (args.item.id === 'MasterGrid_excelexport') {
                mastergrid.excelExport({}, true);
            }
            if (args.item.id === 'MasterGrid_pdfexport') {
                mastergrid.pdfExport(sameSheetPdfProperties, true);
            }
        }
        else {
            if (args.item.id === 'MasterGrid_excelexport') {
                mastergrid.excelExport(newSheetExcelProperties, true);
            }
            if (args.item.id === 'MasterGrid_pdfexport') {
                mastergrid.pdfExport({}, true);
            }
        }
    };
};
