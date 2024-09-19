import { Gantt, Selection, Toolbar, DayMarkers, Edit, Filter, Reorder, Resize, ColumnMenu, VirtualScroll, Sort, RowDD, ContextMenu, ExcelExport, PdfExport, PdfExportProperties, CriticalPath } from '@syncfusion/ej2-gantt';
import { loadCultureFiles } from '../common/culture-loader';
import { editingResources, overviewData } from './data-source';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Sidebar, SidebarType } from '@syncfusion/ej2-navigations';
import { Slider } from '@syncfusion/ej2-inputs';
import { Button, Switch } from '@syncfusion/ej2-buttons';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';

/**
 * Overview sample
 */
Gantt.Inject(Selection, Toolbar, DayMarkers, Edit, Filter, Reorder, Resize, ColumnMenu, VirtualScroll, Sort, RowDD, ContextMenu, ExcelExport, PdfExport, CriticalPath);
MultiSelect.Inject(CheckBoxSelection);

let theme: any;
let style: any;
let CurrentTheme: any;
let statusStyleColor: any;
let priorityStyle: any;
let priorityContentStyle: any;
let statusContentstyleColor: any;
let sidebarToggle: boolean;
let isSideBar: boolean = false;
let sidebarObj: Sidebar;
let isChecked: boolean;
let dependency: Switch | undefined;

(<{ Status?: Function }>window).Status = (status: any) => {
    switch (status) {
        case "In Progress":
            statusStyleColor = (CurrentTheme) ? "#DFECFF" : "#2D3E57";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 96px; height: 24px; border-radius: 24px; background:" + statusStyleColor;
            break;
        case "Open":
            style = "background-color: red; color: white; border-radius: 15px; padding:6px";
            break;
        case "On Hold":
            statusStyleColor = (CurrentTheme) ? "#E4E4E7" : "#3C3B43";
            style = "display: flex; border-radius: 24px; padding: 0px 12px; gap: 10px; width: 78px; height: 24px; background:" + statusStyleColor;
            break;
        case "Completed":
            statusStyleColor = (CurrentTheme) ? "#DFFFE2" : "#16501C";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 98px; height: 24px; border-radius: 24px;background:" + statusStyleColor;
            break;
        case "High":
            statusStyleColor = (CurrentTheme) ? "#FFEBE9" : "#48211D";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 55px; height: 24px; border-radius: 24px; background:" + statusStyleColor;
            break;
    }
    return style;
};

(<{ StatusContent?: Function }>window).StatusContent = (status: any) => {
    switch (status) {
        case "In Progress":
            statusContentstyleColor = (CurrentTheme) ? "#006AA6" : "#34B6FF";
            style = "width: 72px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
        case "Open":
            style = "background-color: red; color: white; border-radius: 15px; padding:6px";
            break;
        case "On Hold":
            statusContentstyleColor = (CurrentTheme) ? "#766B7C" : "#CDCBD7";
            style = "width: 54px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
        case "Completed":
            statusContentstyleColor = (CurrentTheme) ? "#00A653" : "#92FFC8";
            style = "width: 74px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
        case "High":
            statusContentstyleColor = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
            style = "width: 31px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
    }
    return style;
};

(<{ Priority?: Function }>window).Priority = (priority: any) => {
    switch (priority) {
        case "Low":
            priorityStyle = (CurrentTheme) ? "#FFF6D1" : "#473F1E";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 52px; height: 24px; border-radius: 24px; background: " + priorityStyle;
            break;
        case "Normal":
            priorityStyle = (CurrentTheme) ? "#F5DFFF" : "#4D2F5A";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 73px; height: 24px; border-radius: 24px; background: " + priorityStyle;
            break;
        case "Critical":
            priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 72px; height: 24px; border-radius: 24px; background: " + priorityStyle;
            break;
        case "High":
            priorityStyle = (CurrentTheme) ? "#FFEBE9" : "#48211D";
            style = "display: flex; padding: 0px 12px; gap: 10px; width: 55px; height: 24px; border-radius: 24px; background: " + priorityStyle;
            break;
    }
    return style;
};

(<{ PriorityContent?: Function }>window).PriorityContent = (priority: any) => {
    switch (priority) {
        case "Low":
            priorityContentStyle = (CurrentTheme) ? "#70722B" : "#FDFF88";
            style = "width: 28px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
        case "Normal":
            priorityContentStyle = (CurrentTheme) ? "#7100A6" : "#E3A9FF";
            style = "width: 49px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
        case "Critical":
            priorityContentStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
            style = "width: 48px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
        case "High":
            priorityContentStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
            style = "width: 31px; height: 22px; font-style: normal; font-weight: 500; font-size: 14px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
    }
    return style;
};

(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt({
        dataSource: overviewData,
        resources: editingResources,
        height: '500px',
        width: "100%",
        highlightWeekends: true,
        allowSelection: true,
        treeColumnIndex: 1,
        allowSorting: true,
        viewType: 'ProjectView',
        taskFields: {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'TimeLog',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentId',
            resourceInfo: 'Assignee',
        },
        resourceFields: {
            id: 'resourceId',
            name: 'resourceName'
        },
        pdfQueryCellInfo: pdfQueryCellInfo,
        columns: [
            { field: 'TaskId', width: 60, visible: false },
            { field: 'TaskName', width: 250, headerText: 'Product Release' },
            { field: 'Assignee', width: 135, allowSorting: false, headerText: 'Assignee', template: '#columnTemplate' },
            { field: 'Status', minWidth: 100, width: 120, headerText: 'Status', template: '#columnTemplate1' },
            { field: 'Priority', minWidth: 80, width: 100, headerText: 'Priority', template: '#columnTemplate2' },
            { field: 'Work', width: 120, headerText: 'Planned Hours' },
            { field: 'TimeLog', width: 120, headerText: 'Work Log' }
        ],
        toolbar: ['ExpandAll', 'CollapseAll', 'ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExcelExport', 'CsvExport', 'PdfExport'],
        allowExcelExport: true,
        allowPdfExport: true,
        toolbarClick: (args?: ClickEventArgs) => {
            if (args?.item.id === 'overviewSample_excelexport') {
                gantt.excelExport();
            } else if (args?.item.id === 'overviewSample_csvexport') {
                gantt.csvExport();
            } else if (args?.item.id === 'overviewSample_pdfexport') {
                gantt.pdfExport();
            }
        },
        splitterSettings: {
            position: "55%",
            // columnIndex: 4
        },
        load: function (args: any) {
            let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind'];
            let check: any = themeCollection.indexOf(theme);
            let cls: any = document.body.className.split(' ');
            theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
                cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                    cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                        cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : ''
            if (check >= 0) {
                CurrentTheme = true;
            }
            else {
                CurrentTheme = false;
            }
        },
        selectionSettings: {
            mode: 'Row',
            type: 'Single',
            enableToggle: true
        },
        tooltipSettings: {
            showTooltip: true
        },
        filterSettings: {
            type: 'Menu'
        },
        allowFiltering: true,
        gridLines: "Vertical",
        showColumnMenu: true,
        timelineSettings: {
            showTooltip: true,
            topTier: {
                unit: 'Month',
                format: 'MMM yyyy'
            },
            bottomTier: {
                unit: 'Day',
                count: 4,
                format: 'dd'
            }
        },
        eventMarkers: [
            {
                day: '04/04/2024',
                cssClass: 'e-custom-event-marker',
                label: 'Q-1 Release'
            },
            {
                day: '06/30/2024',
                cssClass: 'e-custom-event-marker',
                label: 'Q-2 Release'
            },
            {
                day: '09/29/2024',
                cssClass: 'e-custom-event-marker',
                label: 'Q-3 Release'
            }
        ],
        holidays: [{
            from: "01/01/2024",
            to: "01/01/2024",
            label: "New Year holiday",
            cssClass: "e-custom-holiday"
        },
        {
            from: "12/25/2023",
            to: "12/26/2023",
            label: "Christmas holidays",
            cssClass: "e-custom-holiday"
        }],
        labelSettings: {
            rightLabel: 'Assignee',
            taskLabel: '${Progress}%'
        },
        allowResizing: true,
        taskbarHeight: 24,
        rowHeight: 36,
        projectStartDate: new Date('12/17/2023'),
        projectEndDate: new Date('10/26/2024'),
    });
    gantt.appendTo('#overviewSample');
    function pdfQueryCellInfo(args: any) {
        if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
            {
                args.image = { height:25,width:25, base64: args.data.taskData.resourcesImage };
            }
        }
    }
    function initializeSidebar() {
        if (isSideBar) {
            if (!document.getElementById('sidebar')) {
                var sidebarDiv = document.createElement('div');
                sidebarDiv.id = 'sidebar';
                sidebarDiv.innerHTML = `
                <div class="ganttoverview-title-header">
                <div class="ganttoverview-title">Project Settings</div>
                    <button id="close" class="e-ganttoverview-close" aria-label="Close settings"></button>
                </div>
                <ul class="ganttoverview-settings-list">
                    <li class="ganttoverview-list-fields">
                        <label for="default" class="ganttoverview-labels-style">Row height :</label>
                        <div id="default" style="left: 20px;"></div>
                    </li>
                    <li class="ganttoverview-list-fields-labels ganttoverview-side-by-side-container">
                        <label for="showGridLines" class="ganttoverview-labels">Show grid lines :</label>
                        <input id="showGridLines" type="checkbox" class="ganttoverview-right-aligned-input">
                    </li>
                    <li class="ganttoverview-list-fields-labels ganttoverview-side-by-side-container">
                        <label for="showEventMarkers" class="ganttoverview-labels">Show event markers :</label>
                        <input id="showEventMarkers" type="checkbox" class="ganttoverview-right-aligned-input">
                    </li>
                    <li class="ganttoverview-list-fields-labels ganttoverview-side-by-side-container">
                        <label for="dependencyLines" class="ganttoverview-labels">Show dependencies :</label>
                        <input id="dependencyLines" type="checkbox" class="ganttoverview-right-aligned-input">
                    </li>
                    <li class="ganttoverview-list-fields-labels ganttoverview-side-by-side-container">
                        <label for="taskLabelChange" class="ganttoverview-labels">Show task labels :</label>
                        <input id="taskLabelChange" type="checkbox" class="ganttoverview-right-aligned-input">
                    </li>
                    <li class="ganttoverview-list-fields ganttoverview-section-header">
                        <label id="scheduling" class="ganttoverview-section-header-label">Scheduling Settings</label>
                    </li>
                    <li class="ganttoverview-list-fields">
                        <label for="WorkingDays" class="ganttoverview-labels-style">Working days:</label>
                        <div class="ganttoverview-container">
                            <input id="WorkingDays" type="checkbox" class="ganttoverview-right-aligned-input">
                        </div>
                    </li>
                    <li class="ganttoverview-list-fields ganttoverview-stack-container">
                        <label for="DurationUnit" class="ganttoverview-labels-style">Duration unit:</label>
                        <div class="ganttoverview-container">
                            <input id="DurationUnit" type="text" class="ganttoverview-right-aligned-input">
                        </div>
                    </li>
                    <li class="ganttoverview-list-fields ganttoverview-stack-container">
                        <label for="unitWidth" class="ganttoverview-labels-style">Timeline width:</label>
                        <div class="ganttoverview-container">
                            <input id="unitWidth" type="text" class="ganttoverview-right-aligned-input">
                        </div>
                    </li>
                    <li class="ganttoverview-list-fields ganttoverview-section-header">
                        <label id="viewSettings" class="ganttoverview-section-header-label">View Settings</label>
                    </li>
                    <li class="ganttoverview-list-fields ganttoverview-stack-container">
                        <label for="viewType" class="ganttoverview-labels-style">View type:</label>
                        <div class="ganttoverview-container">
                            <input id="viewType" type="text" class="ganttoverview-right-aligned-input">
                        </div>
                    </li>
                    <li class="ganttoverview-list-fields ganttoverview-stack-container">
                        <label for="viewMode" class="ganttoverview-labels-style">View mode:</label>
                        <div class="ganttoverview-container">
                            <input id="viewMode" type="text" class="ganttoverview-right-aligned-input">
                        </div>
                    </li>
                </ul>
                `;
                document.querySelector('#gantt-sidebar-parent').appendChild(sidebarDiv);
                document.getElementById('close').addEventListener('click', function () {
                    document.getElementById('sidebar').remove();
                    sidebarObj.hide();
                    sidebarToggle = false;
                    isSideBar = false;
                });

                sidebarObj = new Sidebar({
                    width: '280px',
                    type: 'Over',
                    position: 'Right',
                    target: '#sidebar-gantt',
                    isOpen: sidebarToggle
                });
                sidebarObj.appendTo('#sidebar');

                const viewType: any = [
                    { id: "ResourceView", Text: "Resource View" },
                    { id: "ProjectView", Text: "Project View" }
                ];
                let checkListView: DropDownList = new DropDownList({
                    dataSource: viewType,
                    change: typeChange,
                    value: 'Day',
                    fields: { text: 'Text', value: 'id' },
                    placeholder: 'View type',
                    popupHeight: '350px'
                });
                checkListView.appendTo('#viewType');

                let defaultObj: Slider = new Slider({
                    min: 40,
                    value: 30,
                    max: 60,
                    step: 5,
                    width: '180px',
                    tooltip: { placement: 'Before', isVisible: true },
                    ticks: { placement: 'Before', largeStep: 10, smallStep: 10, showSmallTicks: true },
                    changed: onChanged
                });
                defaultObj.appendTo('#default');

                let gridLines: Switch = new Switch({ checked: gantt.gridLines === 'Both', change: gridLinesChange });
                gridLines.appendTo('#showGridLines');

                let eventMarkers: Switch = new Switch({ checked: gantt.eventMarkers && gantt.eventMarkers.length > 0, change: eventMarkersChange });
                eventMarkers.appendTo('#showEventMarkers');

                const ganttDependencyViewContainer = document.querySelector<HTMLElement>('.e-gantt-dependency-view-container');
                const isVisible = ganttDependencyViewContainer?.style.visibility !== 'hidden';
                dependency = new Switch({
                    checked: isVisible || isChecked,
                    change: dependencyChange
                });
                dependency.appendTo('#dependencyLines');

                let taskLabel: Switch = new Switch({ checked: gantt.labelSettings.rightLabel && gantt.labelSettings.rightLabel.length > 0, change: taskLabelChange });
                taskLabel.appendTo('#taskLabelChange');

                let workDays: any = [
                    { id: 'Sunday', day: 'Sunday' },
                    { id: 'Monday', day: 'Monday' },
                    { id: 'Tuesday', day: 'Tuesday' },
                    { id: 'Wednesday', day: 'Wednesday' },
                    { id: 'Thursday', day: 'Thursday' },
                    { id: 'Friday', day: 'Friday' },
                    { id: 'Saturday', day: 'Saturday' },
                ];
                let checkList: MultiSelect = new MultiSelect({
                    dataSource: workDays,
                    select: select,
                    removed: removed,
                    value: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    fields: { text: 'day', value: 'id' },
                    mode: 'CheckBox',
                    showDropDownIcon: true,
                    popupHeight: '350px'
                });
                checkList.appendTo('#WorkingDays');

                const durationUnit: any = [
                    { id: "Minute", Text: "Minute" },
                    { id: "Hour", Text: "Hour" },
                    { id: "Day", Text: "Day" }
                ];
                let input: DropDownList = new DropDownList({
                    dataSource: durationUnit,
                    change: durationChange,
                    placeholder: 'Day',
                    fields: { text: 'Text', value: 'id' },
                    popupHeight: '350px'
                });
                input.appendTo('#DurationUnit');

                let unitWidthNumObj: NumericTextBox = new NumericTextBox({
                    min: 10,
                    format: 'n',
                    value: 33,
                    change: unitChange
                });
                unitWidthNumObj.appendTo('#unitWidth');

                const viewmode: any = [
                    { ID: "Default", Text: "Default" },
                    { ID: "Grid", Text: "Grid" },
                    { ID: "Chart", Text: "Chart" },
                ];
                let checkListViewMode: DropDownList = new DropDownList({
                    dataSource: viewmode,
                    placeholder: 'View',
                    fields: { value: 'ID', text: 'Text' },
                    change: viewChange,
                    popupHeight: '350px'
                });
                checkListViewMode.appendTo('#viewMode');
            }
        }
    }
    var clickBtn = new Button();
    clickBtn.appendTo('#settings-btn');
    document.getElementById('settings-btn').addEventListener('click', function () {
        sidebarToggle = !sidebarToggle;
        isSideBar = true;
        initializeSidebar();
        sidebarObj.isOpen = true;
    });
    // Row Height
    function onChanged(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.rowHeight = args.value;
    }

    // gridLines.appendTo('#checked');
    function gridLinesChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];

        if (args.checked) {
            gantt.gridLines = 'Both';
        } else {
            gantt.gridLines = 'Vertical';
        }
    }

    // Event Markers
    let temp: any;
    function eventMarkersChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.eventMarkers = temp;
        } else {
            temp = gantt.eventMarkers;
            gantt.eventMarkers = null;
        }
    }

    // Dependency
    function dependencyChange(args: any): void {
        const ganttDependencyViewContainer = document.querySelector('.e-gantt-dependency-view-container') as HTMLElement | null;
        if (ganttDependencyViewContainer) {
            ganttDependencyViewContainer.style.visibility = args.checked ? 'visible' : 'hidden';
        }
    }

    // Function to initialize the Switch component
    function initializeDependencySwitch(): void {
        const ganttDependencyViewContainer = document.querySelector('.e-gantt-dependency-view-container') as HTMLElement | null;
        if (!dependency) {
            dependency = new Switch({
                checked: (ganttDependencyViewContainer && ganttDependencyViewContainer.style.visibility !== 'hidden') || isChecked,
                change: dependencyChange
            });
            dependency.appendTo('#dependencyLines');
        } else {
            dependency.checked = (ganttDependencyViewContainer && ganttDependencyViewContainer.style.visibility !== 'hidden') || isChecked;
        }
    }

    // TaskLabel
    let tempRightLabel: any;
    function taskLabelChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = tempRightLabel;
        } else {
            tempRightLabel = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = null;
        }
    }

    //  Working days
    function select(args: any) {
        let workingDays: any = Object[7];
        let fieldInstance: MultiSelect = ((<any>document.getElementById('WorkingDays'))).ej2_instances[0] as MultiSelect;
        workingDays = extend([], fieldInstance.value, [], true);
        workingDays.push(args.item.innerText);
        gantt.workWeek = workingDays;
    };
    function removed(args: any) {
        let index: number = gantt.workWeek.indexOf(args.item.innerText);
        let fieldInstance: MultiSelect = ((<any>document.getElementById('WorkingDays'))).ej2_instances[0] as MultiSelect;
        let workingDays: any = Object[7];
        if (index !== -1) {
            workingDays = fieldInstance.value;
            gantt.workWeek = workingDays;
        }
    };
    // Duration Unit
    function durationChange(args: any) {
        var gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        gantt.durationUnit = args.value;
    }

    // timeline width
    function unitChange(args: any) {
        var gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        var width = args.value;
        gantt.timelineSettings.timelineUnitSize = width;
    }

    // View Type
    function typeChange(args: any) {
        gantt.viewType = args.value;
        setTimeout(() => {
            isChecked = true;
            initializeDependencySwitch();
        }, 0);
    }

    // View Mode
    function viewChange(args: any) {
        var gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.value == 'Grid') {
            gantt.setSplitterPosition('100%', 'position');
        }
        else if (args.value == 'Chart') {
            gantt.setSplitterPosition('0%', 'position');
        }
        else {
            gantt.setSplitterPosition('50%', 'position');
        }
    }
};
