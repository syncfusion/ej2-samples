import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection  } from '@syncfusion/ej2-gantt';
import { Button } from '@syncfusion/ej2-buttons';
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
            height: '450px',
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
                child: 'subtasks'
            },
            selectionSettings: {
                mode: 'Row',
                type: 'Single',
                enableToggle: false
            },
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/27/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#Selection');

    let selectionModeList: DropDownList = new DropDownList({
        dataSource: [
            { id: 'Row', type: 'Row' },
            { id: 'Cell', type: 'Cell' }
        ],
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
};
