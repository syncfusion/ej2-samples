import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar, ExcelExport, PdfExport} from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogUtility } from '@syncfusion/ej2-popups';

TreeGrid.Inject(Toolbar, ExcelExport, PdfExport);
/**
 * Exporting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 400,
            allowExcelExport: true,
            allowPdfExport: true,
            toolbar: ['ExcelExport', 'CsvExport', 'PdfExport'],
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 90 }
            ],
        });
    treegrid.appendTo('#TreeGrid');
    treegrid.toolbarClick = (args?: ClickEventArgs) => {
        if (args.item.id === treegrid.grid.element.id + '_excelexport') {
            treegrid.excelExport();
        } else if (args.item.id === treegrid.grid.element.id + '_pdfexport') {
         if (treegrid.enableRtl === true && treegrid.locale === 'ar') {
            let innercontent: any = 'You need custom fonts to export Arabic characters, refer this'
             + '<a target="_blank" href="https://ej2.syncfusion.com/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">'
             + 'documentation section</a>';
            DialogUtility.alert({content: innercontent});
         } else {
            treegrid.pdfExport(); }
        } else if (args.item.id === treegrid.grid.element.id + '_csvexport') {
            treegrid.csvExport();
        }
    };
};
