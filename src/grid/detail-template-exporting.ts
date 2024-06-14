import { loadCultureFiles } from '../common/culture-loader';

import { Grid, DetailRow, Toolbar, PdfExport, ExcelExport, ExportDetailTemplateEventArgs, Sort, Filter } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

Grid.Inject(DetailRow, Toolbar, PdfExport, ExcelExport, Sort, Filter);
/**
 * Detail row template Sample
 */


(window as DateFormat).format = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
};

interface DateFormat extends Window {
    format?: Function;
}

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: employeeData,
        detailTemplate: '#detailtemplate',
        width: 'auto',
        toolbar: ['ExcelExport', 'PdfExport'],
        allowPdfExport: true,
        allowExcelExport : true,
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'Excel' },
        toolbarClick: toolbarClick,
        exportDetailTemplate: exportDetailTemplate,
        columns: [
            { field: 'FirstName', headerText: 'First Name', width: 110 },
            { field: 'LastName', headerText: 'Last Name', width: 110 },
            { field: 'Title', headerText: 'Title', width: 240 },
            { field: 'Country', headerText: 'Country', width: 180 }
        ]
    });
    grid.appendTo('#Grid');

    function toolbarClick(args: ClickEventArgs) {
        if (args.item.id === 'Grid_excelexport') {
            grid.excelExport({hierarchyExportMode: 'All'});
        }
        if (args.item.id === 'Grid_pdfexport') {
            grid.pdfExport({hierarchyExportMode: 'All'});
        }
    }

    function exportDetailTemplate(args: ExportDetailTemplateEventArgs) {
        args.value = {
            columnCount: 3,
            rows: [
                {
                    cells: [
                        {
                            index: 0, rowSpan: 4, image: args.action === 'excelexport' ? {
                                base64: args.parentRow.data['EmployeeImage'],
                                height: 80, width: 80
                            } : { base64: args.parentRow.data['EmployeeImage'], width: 80 }
                        },
                        { index: 1, value: 'First Name: ' + args.parentRow.data['FirstName'] },
                        { index: 2, value: 'Postal Code: ' + args.parentRow.data['PostalCode'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Last Name: ' + args.parentRow.data['LastName'] },
                        { index: 2, value: 'City: ' + args.parentRow.data['City'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Title: ' + args.parentRow.data['Title'] },
                        { index: 2, value: 'Phone: ' + args.parentRow.data['HomePhone'] }
                    ]
                },
                {
                    cells: [
                        { index: 1, value: 'Address: ' + args.parentRow.data['Address'] },
                        { index: 2, value: 'HireDate: ' + (window as DateFormat).format(args.parentRow.data['HireDate']) }
                    ]
                }
            ]
        };
    }
};