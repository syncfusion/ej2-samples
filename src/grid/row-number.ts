import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Filter, Edit, Toolbar, VirtualScroll, PdfExport, ExcelExport, LoadEventArgs } from '@syncfusion/ej2-grids';
import { groceryProducts } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(Sort, Filter, Edit, Toolbar, VirtualScroll, PdfExport, ExcelExport);

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: groceryProducts,
            allowSorting: true,
            allowFiltering: true,
            allowPdfExport: true,
            allowExcelExport: true,
            enableVirtualization: true,
            rowHeight: 45,
            load: function (args: LoadEventArgs) {
                if (args) {
                    args.enableSeamlessScrolling = true;
                }
            },
            pageSettings: { pageSize: 50 },
            filterSettings: { type: 'CheckBox' },
            toolbar: ['Delete', 'Update', 'Cancel', 'ExcelExport', 'PdfExport'],
            toolbarClick: toolbarClick,
            editSettings: { allowEditing: true, allowDeleting: true, mode: 'Cell' },
            height: 365,
            actionBegin: actionBegin,
            columns: [
                { type: 'RowNumber', textAlign: 'Center'},
                { field: 'ProductID', headerText: 'Product ID', width: 120, visible: false, textAlign: 'Right', isPrimaryKey: true, type: 'number' },
                { field: 'ProductName', headerText: 'Products', width: 160, validationRules: { required: true },allowEditing: false },
                { field: 'Category', headerText: 'Category', width: 140, validationRules: { required: true },allowEditing: false },
                { field: 'SellingPrice', headerText: 'Price', width: 130, format: 'C', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 },filter: { type: 'Menu' }, edit: { params: { showSpinButton: false } } },
                { field: 'AvailableStock', headerText: 'In-Stock', width: 120, textAlign: 'Right', template: '#availableStockTemplate', editType: 'numericedit', validationRules: { required: true, min: 0 }, filter: { type: 'Menu' }, edit: { params: { showSpinButton: false } } },
                { field: 'SoldStock', headerText: 'Sold', width: 120, textAlign: 'Right', template: '#soldStockTemplate', editType: 'numericedit', validationRules: { required: true, min: 0 }, filter: { type: 'Menu' }, edit: { params: { showSpinButton: false } } }
            ],

        });
    grid.appendTo('#Grid');
    function toolbarClick(args: ClickEventArgs): void {
        if (args.item.id === 'Grid_excelexport') {
            grid.excelExport();
        }
        if (args.item.id === 'Grid_pdfexport') {
            grid.pdfExport();
        }
    }

   function actionBegin(args: any) {
                if (args.requestType === 'save' && args.action === 'add') {

                    if (args.data.Category === 'Beverages' ||
                        args.data.Category === 'Dairy Products') {
                        args.data.Unit = 'Litre';
                    }
                    else if (
                        args.data.Category === 'Fruits' ||
                        args.data.Category === 'Vegetables' ||
                        args.data.Category === 'Nuts' ||
                        args.data.Category === 'Rices'
                    ) {
                        args.data.Unit = 'Kg';
                    }
                    else {
                        args.data.Unit = 'Pack';
                    }
                }
            }
    
};
