import { loadCultureFiles } from '../common/culture-loader';
import { Kanban } from '@syncfusion/ej2-kanban';
import { FormValidator, NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
/**
 * Kanban API Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban control
        dataSource: data,
        keyField: 'Status',
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban control
    let dialogObj: Dialog = new Dialog({
        header: 'Validation',
        isModal: true,
        width: 350,
        showCloseIcon: true,
        visible: false,
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'OK', isPrimary: true }
        }]
    });
    dialogObj.appendTo('#Dialog');
    let addIndex: NumericTextBox = new NumericTextBox({
        format: '###.##',
        value: 0,
        min: 0
    });
    addIndex.appendTo('#index');
    addIndex.max = kanbanObj.columns.length;
    let deleteIndex: NumericTextBox = new NumericTextBox({
        format: '###.##',
        value: 0,
        min: 0
    });
    deleteIndex.appendTo('#deteteIndex');
    deleteIndex.max = kanbanObj.columns.length - 1;
    let statusData: string[] = ['Testing', 'Review', 'Validate'];
    let keyObj: DropDownList = new DropDownList({
        width: '100%',
        dataSource: statusData,
        fields: { text: 'Status', value: 'Status' },
        placeholder: 'Key Field'
    });
    keyObj.appendTo('#key');
    let addFormObj: FormValidator = new FormValidator('#addForm');
    let deleteFormObj: FormValidator = new FormValidator('#deleteForm');
    document.getElementById('add').onclick = (): void => {
        let key: string = (<HTMLInputElement>document.getElementById('key')).value;
        let text: string = (<HTMLInputElement>document.getElementById('text')).value;
        let index: number = parseInt((<HTMLInputElement>document.getElementById('index')).value, 10);
        if (kanbanObj.columns.length >= index && key !== '' && text !== '') {
            kanbanObj.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            addIndex.max = kanbanObj.columns.length;
            deleteIndex.max = kanbanObj.columns.length - 1;
            addFormObj.reset();
        } else if (text === '') {
            dialogObj.content = 'Enter Column Header Text';
            dialogObj.show();
        } else if (key === '') {
            dialogObj.content = 'Enter Column Key Field';
            dialogObj.show();
        } else if (!index) {
            dialogObj.content = 'Enter Column Index';
            dialogObj.show();
        }
    };
    document.getElementById('delete').onclick = (): void => {
        let index: number = parseInt((<HTMLInputElement>document.getElementById('deteteIndex')).value, 10);
        if (kanbanObj.columns.length > 1) {
            if (kanbanObj.columns.length >= (index + 1)) {
                kanbanObj.deleteColumn(index);
                addIndex.max = kanbanObj.columns.length;
                deleteIndex.max = kanbanObj.columns.length - 1;
                deleteFormObj.reset();
            } else {
                dialogObj.content = 'Enter Column Index';
                dialogObj.show();
            }
        } else {
            dialogObj.content = 'Atleast one column must be displayed in kanban';
            dialogObj.show();
        }
    };
    document.getElementById('addForm').addEventListener('submit', (e: Event) => e.preventDefault());
    document.getElementById('deleteForm').addEventListener('submit', (e: Event) => e.preventDefault());
    function dlgButtonClick(): void {
        dialogObj.hide();
    }
};