import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection  } from '@syncfusion/ej2-gantt';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { projectNewData } from './data-source';

/**
 * Selection Gantt sample
 */

Gantt.Inject(Selection);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            allowSelection: true,
            treeColumnIndex: 1,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId'
            },
            selectionSettings: {
                mode: 'Row',
                type: 'Single',
                enableToggle: false
            },
            allowResizing: true,
            columns: [
                { field: 'TaskID', width: 70 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate'},
                { field: 'EndDate'},
                { field: 'Duration'},
                { field: 'Predecessor'},
                { field: 'Progress'},
            ],
            enableHover: true,
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#Selection');

    let selectionModeList: DropDownList = new DropDownList({
        dataSource: [
            { id: 'Row', type: 'Row' },
            { id: 'Cell', type: 'Cell' }
        ],
        width: '125px',
        popupWidth: '100px',
        value: 'Row',
        fields: { text: 'type', value: 'id' },
    });
    selectionModeList.appendTo('#mode');

    let selectionTypeList: DropDownList = new DropDownList({
        dataSource: [
            { id: 'Single', type: 'Single' },
            { id: 'Multiple', type: 'Multiple' }
        ],
        width: '125px',
        popupWidth: '100px',
        value: 'Single',
        fields: { text: 'type', value: 'id' },
    });
    selectionTypeList.appendTo('#type');

    let toggleList: DropDownList = new DropDownList({
        dataSource: [
            { id: true, type: 'Enable' },
            { id: false, type: 'Disable' }
        ],
        width: '125px',
        popupWidth: '100px',
        value: false,
        fields: { text: 'type', value: 'id' },
    });
    toggleList.appendTo('#toggle');

    let perform: Button = new Button();
    perform.appendTo('#perform');

    document.getElementById('perform').onclick = () => {
        let mode: any = selectionModeList.value;
        let type: any = selectionTypeList.value;
        let toggle: boolean = toggleList.value as boolean;
        gantt.selectionSettings.mode = mode;
        gantt.selectionSettings.type = type;
        gantt.selectionSettings.enableToggle = toggle;
    };

    let hover: CheckBox = new CheckBox({ checked: true });
    hover.appendTo('#hover');
    document.getElementById('hover').onclick = function () {
        if (hover.checked) {
            gantt.enableHover = true;
        } else {
             gantt.enableHover = false;
        }
    };

};
