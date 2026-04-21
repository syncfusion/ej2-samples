import { loadCultureFiles } from '../common/culture-loader';
import { Kanban, ConstraintType } from '@syncfusion/ej2-kanban';
import { FormValidator, NumericTextBox } from '@syncfusion/ej2-inputs';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
import * as dataSource from './datasource.json';
/**
 * Kanban Columns Validation Sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // To maintain the property changes, extend the object.
    let data: Object[] = <Object[]>extend([], (dataSource as any).kanbanData, null, true);
    let kanbanObj: Kanban = new Kanban({ //Initialize Kanban component
        dataSource: data,
        keyField: 'Status',
        columns: [
            { headerText: 'To Do', keyField: 'Open', allowToggle: true, showItemCount: true, minCount: 6, maxCount: 8 },
            { headerText: 'In Progress', keyField: 'InProgress', showItemCount: true, allowToggle: true, minCount: 2 },
            { headerText: 'Done', keyField: 'Close', showItemCount: true, allowToggle: true, maxCount: 4 },
        ],
        cardSettings: {
            contentField: 'Summary',
            headerField: 'Id',
        },
        swimlaneSettings: {
            keyField: 'Assignee',
            allowDragAndDrop: true
        }
    });
    kanbanObj.appendTo('#Kanban'); //Render initialized Kanban component
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
    let colConstraint: DropDownList = new DropDownList({
        width: '100%',
        change: changeContraintType,
    });
    colConstraint.appendTo('#type');
    let minimum: NumericTextBox = new NumericTextBox({
        format: '###.##',
        min: 0
    });
    minimum.appendTo('#minIndex');
    let maximum: NumericTextBox = new NumericTextBox({
        format: '###.##',
        min: 0
    });
    maximum.appendTo('#maxIndex');
    let statusData: { [key: string]: Object }[] = [
        { Id: 0, text: 'To Do' },
        { Id: 1, text: 'In Progress' },
        { Id: 2, text: 'Done' }
    ];
    let keyObj: DropDownList = new DropDownList({
        width: '100%',
        dataSource: statusData,
        fields: { text: 'text', value: 'Id' },
        placeholder: 'Header Text ',
        change: changeColumns,
    });
    keyObj.appendTo('#dropdownHeader');
    function changeContraintType(args: DropDownChangeArgs): void {
        kanbanObj.constraintType = args.value as ConstraintType;
    }
    function changeColumns(args: DropDownChangeArgs): void {
        let changeIndex: number = args.value as number;
        if (changeIndex !== null) {
            minimum.value = kanbanObj.columns[changeIndex].minCount;
            maximum.value = kanbanObj.columns[changeIndex].maxCount;
        }
    }
    let addFormObj: FormValidator = new FormValidator('#column');

    document.getElementById('validate').onclick = (): void => {
        let colindex: number = keyObj.index;
        let colText: string = (<HTMLInputElement>document.getElementById('dropdownHeader')).value;
        let colmin: number = parseInt((<HTMLInputElement>document.getElementById('minIndex')).value, 10);
        let colmax: number = parseInt((<HTMLInputElement>document.getElementById('maxIndex')).value, 10);
        if (colText === '') {
            dialogObj.content = 'Select column Header Text';
            dialogObj.show();
        } else if (colText !== '' && minimum.value === null && maximum.value === null) {
            dialogObj.content = 'Enter column min-count or max-count';
            dialogObj.show();
        } else {
            kanbanObj.columns[colindex].headerText = colText;
            if (minimum.value !== null) {
                kanbanObj.columns[colindex].minCount = colmin;
            }
            if (minimum.value !== null) {
                kanbanObj.columns[colindex].maxCount = colmax;
            }
            addFormObj.reset();
        }
    };
    document.getElementById('column').addEventListener('submit', (e: Event) => e.preventDefault());
    function dlgButtonClick(): void {
        dialogObj.hide();
    }
};