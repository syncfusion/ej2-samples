import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, RowDD, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Page, Selection, RowDD, Sort, Filter, Edit, Toolbar);

/**
 * DragAndDrop Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowPaging: true,
            allowRowDragAndDrop: true,
            selectionSettings: { type: 'Multiple' },
            rowDropSettings: { targetID: 'DestGrid' },
            pageSettings: { pageCount: 2 },
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            width: '49%',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 135, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }
            ],
            rowDragStart: (args: any) => {
                if (destGrid.isEdit) {
                    if (destGrid.editModule.formObj.validate()) {
                        destGrid.endEdit();
                    } else {
                        destGrid.closeEdit();
                    }
                }
            },
        });
    grid.appendTo('#Grid');

    let destGrid: Grid = new Grid(
        {
            dataSource: [],
            allowPaging: true,
            allowRowDragAndDrop: true,
            selectionSettings: { type: 'Multiple' },
            rowDropSettings: { targetID: 'Grid' },
            pageSettings: { pageCount: 2 },
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            width: '49%',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 135, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }
            ]
        });
    destGrid.appendTo('#DestGrid');
};