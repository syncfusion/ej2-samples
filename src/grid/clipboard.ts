import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Toolbar, Sort, Filter, Edit } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';

Grid.Inject(Page, Toolbar, Sort, Filter, Edit);

/**
 * Grid Clipboard sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let alertDialogObj: Dialog = new Dialog({
        header: 'Copy with Header',
        content: 'Atleast one row should be selected to copy with header',
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
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', { text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
            { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, validationRules: { required: true, minLength: 5 }},
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' }
            ],
            pageSettings: { pageCount: 5 },
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            toolbarClick: (args: ClickEventArgs) => {
                if (args.item.id === 'copy' || args.item.id === 'copyHeader'){
                    if ( grid.getSelectedRecords().length > 0) {
                        let withHeader: boolean = args.item.id === 'copyHeader' ? true : false;
                        grid.copy(withHeader);
                    } else {
                        alertDialogObj.content = args.item.id === 'copyHeader' ? 'Atleast one row should be selected to copy with header' : 'Atleast one row should be selected to copy';
                        alertDialogObj.header = args.item.id === 'copyHeader' ? 'Copy with Header' : 'Copy';
                        alertDialogObj.show();
                    }
                }
            }
        });
    grid.appendTo('#Grid');
};
