import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Page, Selection, Group } from '@syncfusion/ej2-grids';
import { inventoryData } from './data-source';
import { Dialog } from '@syncfusion/ej2-popups';

Grid.Inject(Sort, Page, Selection, Group);

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
        dataSource: inventoryData,
        allowPaging: true,
        allowSorting: true,
        allowGrouping: true,
        groupSettings: {columns: ['Country']},
        height: 400,
        columns: [
            { field: 'Inventor', headerText: 'Inventor Name', width: 160 },
            { field: 'NumberofPatentFamilies', headerText: 'No of Patent Families', width: 195, textAlign: 'Right' },
            { field: 'Country', headerText: 'Country', width: 120 },
            { field: 'Active', headerText: 'Active', width: 120 },
            { field: 'Mainfieldsofinvention', headerText: 'Main fields of invention', allowGrouping: false, width: 200 },
        ],
        pageSettings: { pageCount: 5 },
        load: () => {
            refresh = (<any>grid).refreshing;
        },
        dataBound: () => {
            if (refresh) {
                grid.groupColumn('Country');
                refresh = false;
            }
        },
        created: () => {
            grid.on('columnDragStart', columnDragStart, this);
        }
    });
    grid.appendTo('#Grid');
    function columnDragStart(args: any): void {
        if (args.column.field === 'Mainfieldsofinvention') {
            alertDialogObj.show();
       }
    }
};
