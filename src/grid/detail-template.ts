import { Grid, DetailRow, Sort, Filter } from '@syncfusion/ej2-grids';
import { employeeDetail, taskDetail } from './data-source';
import { Kanban } from '@syncfusion/ej2-kanban';
import { Tab } from '@syncfusion/ej2-navigations';
import {
    Category, Chart, ChartSeriesType, Legend, LineSeries,
    Tooltip
} from '@syncfusion/ej2-charts';

Grid.Inject(DetailRow, Sort, Filter);
Chart.Inject(Category, Legend, LineSeries, Tooltip);

/**
 * Detail row template sample
 */

(window as any).default = (): void => {
    let taskData: any = [];
    let salesData: any = [];
    let grid: Grid = new Grid({
        dataSource: employeeDetail,
        detailTemplate: '#detailtemplate',
        height: 600,
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'CheckBox' },
        columns: [
            { headerText: 'Image', textAlign: 'Center', width: 70, template: '#employeeImageTemplate' },
            { field: 'EmployeeID', headerText: 'ID', width: 70 },
            { field: 'Name', headerText: 'Name', width: 70 },
            { field: 'MailID', headerText: 'Email ID', width: 70, template: '#mailIDTemplate' },
            { field: 'Team', headerText: 'Team(s)', width: 70 },
            { field: 'ReportTo', headerText: 'Reporter', width: 70 }
        ],
        detailDataBound: (args: any) => {
            const rowData: any = args.data;
            taskData = taskDetail.filter((task: any) => task.Assignee === rowData.Name);
            salesData = generateData(taskData);

            const tabObj: Tab = new Tab({
                animation: {
                    previous: { effect: 'None', duration: 0, easing: '' },
                    next: { effect: 'None', duration: 0, easing: '' }
                }
            });
            tabObj.appendTo(args.detailElement.querySelector('#tab'));

            const kanbanObj: Kanban = new Kanban({
                dataSource: taskData,
                keyField: 'Status',
                columns: [
                    { headerText: 'Open', keyField: 'Open' },
                    { headerText: 'In Progress', keyField: 'InProgress' },
                    { headerText: 'Testing', keyField: 'Testing' },
                    { headerText: 'Done', keyField: 'Close' }
                ],
                cardSettings: {
                    template: '#cardTemplate',
                    headerField: 'Id',
                }
            });
            kanbanObj.appendTo(args.detailElement.querySelector('#taskTemplate')); 

            const chart: Chart = new Chart({
                primaryXAxis: {
                    valueType: 'Category',
                    title: 'Status'
                },
                height: '302px',
                title: 'Burndown Chart',
                tooltip: { enable: true },
                series: [
                    {
                        dataSource: salesData,
                        xName: 'taskid',
                        yName: 'estimatedHours',
                        type: 'Line' as ChartSeriesType,
                        name: 'Estimated Hours',
                        marker: { visible: true, width: 10, height: 10 }
                    },
                    {
                        dataSource: salesData,
                        xName: 'taskid',
                        yName: 'spentHours',
                        type: 'Line' as ChartSeriesType,
                        name: 'Spent Hours',
                        marker: { visible: true, width: 10, height: 10 }
                    }
                ],
                legendSettings: { visible: true }
            });
            let chartsContainer: any = args.detailElement.querySelector('#chartTemplate');
            if (chartsContainer) {
                taskData.forEach((data: any) => {
                    chartsContainer.id = 'chartTemplate_' + data.Assignee;
                    chart.appendTo(chartsContainer);
                });
            }
        },
    });
    grid.appendTo('#Grid');

    function generateData(taskData: any) {
        const statusCategories = ['Open', 'InProgress', 'Testing', 'Close'];
        const statusData = statusCategories.map((status) => {
          const filteredTasks = taskData.filter((task: any) => task.Status === status);
          const estimatedHours = filteredTasks.reduce((sum: any, task: any) => sum + task.Estimate, 0);
          const spentHours = filteredTasks.reduce((sum: any, task: any) => sum + task.Spent, 0);
          let taskid = '';
          if (filteredTasks.length) {
            taskid = filteredTasks[0].Id;
          }
          return { spentHours, estimatedHours, status, taskid };
        });
        return statusData;
    }

    (<{ employeeTemplate?: Function }>window).employeeTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'image';
        const imgElement = document.createElement('img');
        imgElement.src = 'src/grid/images/' + e.EmployeeID.replace('Emp100', '') + '.png';
        imgElement.alt = e.EmployeeID;
        divElement.appendChild(imgElement);
        return divElement.outerHTML;
    }
};