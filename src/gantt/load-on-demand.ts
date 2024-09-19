import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, VirtualScroll, Selection } from '@syncfusion/ej2-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


/**

 * Default Gantt sample

 */


Gantt.Inject(Selection, VirtualScroll);

(window as any).default = (): void => {

    loadCultureFiles();

    let dataSource: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/js/production/api/GanttLoadOnDemand',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });

    let gantt: Gantt = new Gantt({
        dataSource: dataSource,
        loadChildOnDemand: true,
        taskFields: {
            id: 'taskId',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            hasChildMapping: 'isParent',
            parentID: 'parentID'
        },
        columns: [
            { field: 'taskId', headerText: 'Task ID' },
            { field: 'taskName', headerText: 'Task Name', allowReordering: false },
            { field: 'startDate', headerText: 'Start Date', allowSorting: false },
            { field: 'duration', headerText: 'Duration', allowEditing: false },
            { field: 'progress', headerText: 'Progress', allowFiltering: false },
        ],
        allowSelection: true,
        enableVirtualization: true,
        splitterSettings: {
            columnIndex: 3,
        },
        tooltipSettings: {
            showTooltip: true
        },
        highlightWeekends: true,
        timelineSettings: {
            showTooltip: true,
            topTier: {
                unit: 'Week',
                format: 'dd/MM/yyyy'
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            }
        },
        treeColumnIndex: 1,
        taskbarHeight: 20,
        rowHeight: 40,
        height: '460px',
        projectStartDate: new Date('01/02/2000'),
        projectEndDate: new Date('12/01/2002'),
        });
    gantt.appendTo('#LoadonDemand');
};