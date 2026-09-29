import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, VirtualScroll } from '@syncfusion/ej2-gantt';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { generateVirtualData } from './data-source';

Gantt.Inject(Selection, VirtualScroll);

(window as any).default = (): void => {
    loadCultureFiles();

    let count: number = 5000;
    let startLoadTime: Date = new Date();
    let shouldCalculateLoadTime: boolean = true;
    const updateLoadTime = (): void => {
        if (shouldCalculateLoadTime) {
            shouldCalculateLoadTime = false;
            const endLoadTime: Date = new Date();
            const diff: number = endLoadTime.getTime() - startLoadTime.getTime();
            document.getElementById('loadTime')!.innerHTML = (diff / 1000).toFixed(2);
        }
    };
    const gantt: Gantt = new Gantt({
        dataSource: generateVirtualData(count),
        enablePredecessorValidation: false,
        autoCalculateDateScheduling: false,
        enableVirtualization: true,
        allowSelection: true,
        highlightWeekends: true,
        height: '650px',
        width: '100%',
        rowHeight: 46,
        taskbarHeight: 25,
        treeColumnIndex: 1,
        projectStartDate: new Date('03/29/2026'),
        projectEndDate: new Date('09/20/2026'),
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'parentID',
            dependency: 'Predecessor'
        },
        columns: [
            { field: 'TaskID' },
            { field: 'TaskName', headerText: 'Task Name', width: 300 },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' }
        ],
        labelSettings: {
            taskLabel: 'Progress'
        },
        splitterSettings: {
            columnIndex: 2
        },
        dataBound: () => {
            updateLoadTime();
        }
    });
    gantt.appendTo('#RenderOptimization');

    const ddl: DropDownList = new DropDownList({
        dataSource: [
            { Text: '5,000 Rows', Value: 5000 },
            { Text: '10,000 Rows', Value: 10000 }
        ],
        fields: {
            text: 'Text',
            value: 'Value'
        },
        value: count,
        placeholder: '5,000 Rows',
        change: (args: ChangeEventArgs) => {
            count = Number(args.value);
            startLoadTime = new Date();
            shouldCalculateLoadTime = true;
            gantt.dataSource = generateVirtualData(count);
            gantt.refresh();
        }
    });
    ddl.appendTo('#rowCount');
};