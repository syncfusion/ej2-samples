import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, GridLine, DayMarkers, Selection  } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

/**
 * GridLines Gantt sample
 */
Gantt.Inject(DayMarkers, Selection );
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
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
            ],
            gridLines: 'Both',
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#GridLines');

    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: [
            { id: 'Both', type: 'Both' },
            { id: 'Vertical', type: 'Vertical' },
            { id: 'Horizontal', type: 'Horizontal' },
            { id: 'None', type: 'None' }
        ],
        popupWidth: '125px',
        fields: { text: 'type', value: 'id' },
        value: 'Both',
        change: (e: ChangeEventArgs) => {
            let lines: GridLine = <GridLine>e.value;
            gantt.gridLines = lines;
            gantt.refresh();
        },
    });
    dropDownListObject.appendTo('#lines');
};
