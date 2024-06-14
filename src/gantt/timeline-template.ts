import { loadCultureFiles } from '../common/culture-loader';

import { Gantt,Selection} from '@syncfusion/ej2-gantt';
import { timelineTemplateData } from './data-source';

/**
 * Tasklabel Template Gantt sample
 */
Gantt.Inject(Selection);
(<{ weekDate?: Function }>window).weekDate = (dateString: any) => {
    const date = new Date(dateString);
    const options:any = { weekday: 'short'}; // Include day of the week and day of the month
    return date.toLocaleDateString('en-US', options);
};
(<{ formatDate?: Function }>window).formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: any = { day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

(<{ imageString?: Function }>window).imageString = (value: string) => {
    return "src/gantt/images/"+ value.toLowerCase() +".svg" ;
};


(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: timelineTemplateData,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency:'Predecessor',
                child: 'subtasks'
            },
            splitterSettings: {
                columnIndex: 1
            },
            treeColumnIndex: 1,
            allowSelection: true,
            showColumnMenu: false,
            timelineSettings: {
                topTier: {
                    unit: 'Day',
                },
                timelineUnitSize: 200,
            },
            labelSettings: {
                leftLabel: 'TaskName',
                taskLabel: 'Progress'
            },
            columns: [
                { field: 'TaskID', headerText: 'Task ID' ,visible: false},
                { field: 'TaskName', headerText: 'Task Name', width: 300},
                { field: 'StartDate', headerText: 'Start Date'},
                { field: 'Duration', headerText: 'Duration'},
                { field: 'Progress', headerText: 'Progress'},
            ],
            height: '550px',
            allowUnscheduledTasks: true,
            projectStartDate: new Date('03/31/2024'),
            projectEndDate: new Date('04/23/2024'),
            timelineTemplate:"#TimelineTemplates"
        });
    gantt.appendTo('#Timeline');
};
