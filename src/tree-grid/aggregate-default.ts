import { TreeGrid, Page, Aggregate, ExcelExport, PdfExport, Toolbar } from '@syncfusion/ej2-treegrid';
import { summaryRowData } from './data-source';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

TreeGrid.Inject(Page, Aggregate, ExcelExport, PdfExport, Toolbar);
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * Aggregates
 */
(window as any).default = (): void => {
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: summaryRowData,
            childMapping: 'children',
            treeColumnIndex: 0,
            allowExcelExport: true,
            allowPdfExport: true,
            toolbar: ['PdfExport', 'ExcelExport', 'CsvExport'],
            height: 400,
            columns: [
                { field: 'FreightID', headerText: 'Freight ID', width: 130 },
                { field: 'FreightName', width: 200, headerText: 'Freight Name' },
                { field: 'UnitWeight', headerText: 'Weight Per Unit', type: 'number', width: 140, textAlign: 'Right' },
                { field: 'TotalUnits', headerText: 'Total Units', type: 'number', width: 140, textAlign: 'Right' }
            ],
            aggregates: [{
                    columns: [
                        {
                            type: 'Max',
                            field: 'UnitWeight',
                            columnName: 'UnitWeight',
                            footerTemplate: 'Maximum: ${Max}'
                        },
                        {
                        type: 'Min',
                        field: 'TotalUnits',
                        columnName: 'TotalUnits',
                        footerTemplate: 'Minimum: ${Min}'
                    }]
            }]
        });
    treegrid.appendTo('#Grid');

    let checkBoxObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    checkBoxObj.appendTo('#checked');

    function onChange( args: ChangeEventArgs): void {
        if (args.checked) {
            treegrid.aggregates[0].showChildSummary = true;
            treegrid.refresh();
         } else {
            treegrid.aggregates[0].showChildSummary = false;
            treegrid.refresh();
        }
    }

    treegrid.toolbarClick = function (args) {
        if (args.item.id === treegrid.grid.element.id + '_excelexport') {
            treegrid.excelExport();
        } else if (args.item.id === treegrid.grid.element.id + '_pdfexport') {
            if (treegrid.enableRtl === true && treegrid.locale === 'ar') {
                let innercontent: any = 'You need custom fonts to export Arabic characters, refer this'
                    + '<a target="_blank" href="https://ej2.syncfusion.com/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">'
                    + 'documentation section</a>';
                DialogUtility.alert({ content: innercontent });
            }
            else{
                treegrid.pdfExport();
            } 
        } else if (args.item.id === treegrid.grid.element.id + '_csvexport') {
            treegrid.csvExport();
        }
    };
};



