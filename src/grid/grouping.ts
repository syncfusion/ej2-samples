import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Page, Selection, Group, Edit, Toolbar, Filter } from '@syncfusion/ej2-grids';
import { inventoryData, orderDataSource } from './data-source';
import { Dialog } from '@syncfusion/ej2-popups';

Grid.Inject(Sort, Page, Selection, Group, Edit, Toolbar, Filter);

/**
 * Grouping sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let refresh: Boolean;
    let alertDialogObj: Dialog = new Dialog({
        header: 'Grouping',
        content: 'Grouping is disabled for this column',
        showCloseIcon: false,
        target: '.control-section',
        buttons: [{
            click: alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true }
        }],
        width: '300px',
        visible: false,
        animationSettings: { effect: 'None' }
    });
    alertDialogObj.appendTo('#alertDialog');
    function alertDlgBtnClick(): void {
        alertDialogObj.hide();
    }
    let grid: Grid = new Grid({
        dataSource: orderDataSource,
        editSettings: { allowEditing: true },
        toolbar: ['Edit', 'Update', 'Cancel'],
        allowPaging: true,
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'Excel' },
        allowGrouping: true,
        groupSettings: {columns: ['ShipCountry']},
        height: 400,
        columns: [
            {
                field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                validationRules: { required: true, number: true }, width: 140
            },
            {
                field: 'CustomerID', headerText: 'Customer ID',
                validationRules: { required: true }, width: 140
            },
            {
                field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit',
                width: 140, format: 'C2', validationRules: { required: true }
            },
            {
                field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', format: { type: 'dateTime', format: 'M/d/y hh:mm a' },
                width: 160, allowGrouping: false
            },
            {
                field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                edit: { params: { popupHeight: '300px' } }
            }
        ],
        pageSettings: { pageCount: 5 },
        load: () => {
            refresh = (<any>grid).refreshing;
        },
        dataBound: () => {
            if (refresh) {
                grid.groupColumn('ShipCountry');
                refresh = false;
            }
        },
        created: () => {
            grid.on('columnDragStart', columnDragStart, this);
        }
    });
    grid.appendTo('#Grid');
    function columnDragStart(args: any): void {
        if (args.column.field === 'OrderDate') {
            alertDialogObj.show();
       }
    }
};
