import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Filter } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';
import { Button } from '@syncfusion/ej2-buttons';
import { Query } from '@syncfusion/ej2-data';
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';
import { Sidebar } from '@syncfusion/ej2-navigations';

/**
 * Advanced Filtering Gantt sample
 */
Gantt.Inject(Selection, Filter);

let searchQuery: any;
let sidebarToggle: boolean;
let create: any;
let isSideBar: boolean = false;
let predicatevalue: any;
let querybuilderevent: boolean = false;
let sidebarObj: Sidebar;
let queryBuilderObj: QueryBuilder;
let ganttChart: Gantt;

(window as any).default = (): void => {
    loadCultureFiles();
    ganttChart = new Gantt({
        dataSource: projectNewData,
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
            { field: 'TaskName', headerText: 'Name', width: 250 },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'EndDate' },
            { field: 'Progress' },
            { field: 'Predecessor' }
        ],
        treeColumnIndex: 0,
        allowFiltering: true,
        includeWeekend: true,
        height: '410px',
        splitterSettings: {
            columnIndex: 4
        },
        rowSelected: rowSelectEvent,
        labelSettings: {
            rightLabel: 'TaskName'
        },
        projectStartDate: new Date('04/01/2024'),
        projectEndDate: new Date('07/06/2024')
    });
    ganttChart.appendTo('#AdvancedFiltering');

    let clickBtn: Button = new Button();
    clickBtn.appendTo('#filter-btn');

    document.getElementById('filter-btn').addEventListener('click', function () {
        sidebarToggle = !sidebarToggle;
        isSideBar = true;
        initializeSidebar();
        if (querybuilderevent) {
            create = queryBuilderObj.getSqlFromRules();
        }
        sidebarObj.isOpen = true;
    });

    function initializeSidebar() {
        if (isSideBar) {
            if (!document.getElementById('ganttSidebar')) {
                var sidebarDiv = document.createElement('div');
                sidebarDiv.id = 'ganttSidebar';
                sidebarDiv.innerHTML = `
                    <div class="ganttsidebar-header">
                        <div class="title">Advanced Filters</div>
                        <button id="close" class="e-close"></button>
                    </div>
                    <div id="ganttquerybuilder"></div>
                    <div class="ganttbtn-container">
                        <button type="button" id="apply" class="e-control e-btn apply-btn">Apply</button>
                        <button type="button" id="clear" class="e-control e-btn clear-btn">Clear</button>
                    </div>
                `;
                document.querySelector('.content-wrapper').appendChild(sidebarDiv);
                document.getElementById('close').addEventListener('click', function () {
                    sidebarObj.destroy();
                    document.getElementById('ganttSidebar').remove();
                    sidebarObj.hide();
                    create = queryBuilderObj.getSqlFromRules();
                    sidebarToggle = false;
                    isSideBar = false;
                });
                // Initialize EJ2 buttons
                var applyBtn: Button = new Button({ isPrimary: true });
                applyBtn.appendTo('#apply');

                var clearBtn: Button = new Button();
                clearBtn.appendTo('#clear');

                applyBtn.element.addEventListener('click', function() {
                    if (predicatevalue != null) {
                        searchQuery = new Query().where(predicatevalue);
                    } else {
                        searchQuery = new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);
                    }
                    ganttChart.query = searchQuery;
                    ganttChart.refresh();
                });
                clearBtn.element.addEventListener('click', function() {
                    queryBuilderObj.reset();
                    predicatevalue = null;
                    searchQuery = new Query();
                    ganttChart.query = searchQuery;
                    ganttChart.refresh();
                });
                sidebarObj = new Sidebar({
                    width: '65%',
                    type: 'Over',
                    position: 'Right',
                    isOpen: sidebarToggle,
                    target: '#ganttsidebar-parent'
                });
                sidebarObj.appendTo('#ganttSidebar');
                queryBuilderObj = new QueryBuilder({
                    dataSource: projectNewData,
                    allowValidation: true,
                    columns: [
                        { field: 'TaskID', label: 'Task ID', type: 'number' },
                        { field: 'TaskName', label: 'Task Name', type: 'string' },
                        { field: 'StartDate', label: 'Start Date', type: 'date', format: 'MM/dd/yyyy' },
                        { field: 'Duration', label: 'Duration', type: 'number' },
                        { field: 'EndDate', label: 'End Date', type: 'date', format: 'MM/dd/yyyy' },
                        { field: 'Progress', label: 'Progress', type: 'number' },
                        { field: 'Predecessor', label: 'Predecessor', type: 'string' }
                    ],
                    ruleChange: updateRule,
                    created: created
                });
                queryBuilderObj.appendTo('#ganttquerybuilder');
            }
        }
    }

    function rowSelectEvent() {
        sidebarToggle = false;
        if (isSideBar) {
            create = queryBuilderObj.getSqlFromRules();
            isSideBar = false;
            sidebarObj.isOpen = false;
        }
    }

    function updateRule(args: any) {
        predicatevalue = queryBuilderObj.getPredicate(args.rule);
        if (args.type == "DeleteRule" && predicatevalue != null) {
            searchQuery = new Query().where(predicatevalue);
        } else if (predicatevalue == null && args.type == "DeleteRule") {
            searchQuery = new Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor']);
        }
    }

    function created() {
        querybuilderevent = true;
        if (create && create !== "") {
            queryBuilderObj.setRulesFromSql(create);
        }
    }
};
