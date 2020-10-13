import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Toolbar, Selection } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';

TreeGrid.Inject(Page, Toolbar, Selection);

/**
 * TreeGrid clipboard sample
 */
(window as any).default = (): void => {
loadCultureFiles();
let treegrid: TreeGrid = new TreeGrid(
    {
        dataSource: sampleData,
        childMapping: 'subtasks',
        height: 350,
        treeColumnIndex: 1,
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        allowSelection: true,
        selectionSettings: { type: 'Multiple', mode: 'Row' },
        toolbar: [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
        { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }],
        columns: [
            { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
            { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
            { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
            { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
            { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
        ],
        toolbarClick: (args: ClickEventArgs) => {
            if (treegrid.getSelectedRecords().length > 0) {
                let withHeader: boolean = false;
                if (args.item.id === 'copyHeader') {
                    withHeader = true;
                }
                treegrid.copy(withHeader);
            } else {
                alertDialogObj.show();
            }
        }
    });
treegrid.appendTo('#TreeGrid');
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

let mode: { [key: string]: Object }[] = [
    { id: 'Parent', mode: 'Parent' },
    { id: 'Child', mode: 'Child' },
    { id: 'Both', mode: 'Both' },
    { id: 'None', mode: 'None' },
];
let dropDownMode: DropDownList = new DropDownList({
    dataSource: mode,
    fields: { text: 'mode', value: 'id' },
    value: 'Parent',
    change: (e: ChangeEventArgs) => {
        let mode: any = <string>e.value;
        treegrid.copyHierarchyMode = mode;
    }
});
dropDownMode.appendTo('#mode');
};