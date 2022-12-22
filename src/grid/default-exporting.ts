import { loadCultureFiles } from '../common/culture-loader';
import {
    Grid, Toolbar, ExcelExport, PdfExport, Group, Sort,
    PdfQueryCellInfoEventArgs, ExcelQueryCellInfoEventArgs
} from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { employeeDetails } from './data-source';
import { CheckBox } from '@syncfusion/ej2-buttons';

Grid.Inject(Toolbar, ExcelExport, PdfExport, Group, Sort);
/**
 * Excel,PDF, CSV export sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let isInitial: Boolean = true;
    let grid: Grid = new Grid(
        {
            dataSource: employeeDetails,
            allowExcelExport: true,
            allowSorting: true,
            allowPdfExport: true,
            allowGrouping: true,
            toolbar: ['ExcelExport', 'PdfExport', 'CsvExport'],
            height: 350,
            columns: [
                { headerText: 'Employee Image', template: '#template1', textAlign: 'Center', width: 150 },
                { field: 'FirstName', headerText: 'Name', width: 130 },
                { field: 'Title', headerText: 'Designation', width: 180 },
                { headerText: 'Email ID', template: '#template2', width: 180 },
                { field: 'HireDate', headerText: 'Hire Date', textAlign: 'Right', width: 135, format: 'yMd' },
                { field: 'Address', width: 180, allowGrouping: false }
            ],
            dataBound: () => {
                if (isInitial) {
                    grid.toolbarModule.toolbar.hideItem(2, true);
                    isInitial = false;
                }
            }
        });
    grid.appendTo('#Grid');
    grid.toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === 'Grid_pdfexport') {
            grid.pdfExport();
        }
        if (args.item.id === 'Grid_excelexport') {
            grid.excelExport();
        }
        if (args.item.id === 'Grid_csvexport') {
            grid.csvExport();
        }
    };

    function exportQueryCellInfo(args: ExcelQueryCellInfoEventArgs | PdfQueryCellInfoEventArgs): any {
        if (args.column.headerText === 'Employee Image') {
            if ((args as any).name === 'excelQueryCellInfo') {
                args.image = { height: 75, base64: (args as any).data.EmployeeImage, width: 75 };
            } else {
                args.image = { base64: (args as any).data.EmployeeImage };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.EmailID,
                displayText: (args as any).data.EmailID
            };
        }
    }

    grid.excelQueryCellInfo = grid.pdfQueryCellInfo = exportQueryCellInfo;

    let templateExport: CheckBox = new CheckBox({ checked: true });
    templateExport.appendTo('#templateExport');

    let fields: string[] = ['Employee Image', 'Email ID'];
    document.getElementById('templateExport').onclick = () => {
        if (templateExport.checked) {
            grid.showColumns(fields, 'headerText');
            grid.toolbarModule.toolbar.hideItem(2, true);
        } else {
            grid.hideColumns(fields, 'headerText');
            grid.toolbarModule.toolbar.hideItem(2, false);
        }
    };
};
