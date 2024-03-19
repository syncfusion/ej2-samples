import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Toolbar, Sort } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';

Grid.Inject(Page, Toolbar, Sort);

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
            toolbar: [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
            { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150},
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ],
            pageSettings: { pageCount: 5 },
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            toolbarClick: (args: ClickEventArgs) => {
                if ( grid.getSelectedRecords().length > 0) {
                    let withHeader: boolean = args.item.id === 'copyHeader' ? true : false;
                    grid.copy(withHeader);
                } else {
                    alertDialogObj.show();
                }
            }
        });
    grid.appendTo('#Grid');
};
