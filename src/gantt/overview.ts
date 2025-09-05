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
import { PdfColor, } from '@syncfusion/ej2-pdf-export';

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
var IconClass: any;
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
            statusStyleColor = (CurrentTheme) ? "#006AA6" : "#34B6FF";
            style = "display: flex; padding: 2px 10px; gap: 10px; width: 96px; height: 24px; border: solid 1px" + statusStyleColor;
            break;
        case "Open":
            style = "display: flex; justify-content:center; gap: 10px; width: 96px; height: 24px; border: solid 1px red";
            break;
        case "On Hold":
            statusStyleColor = (CurrentTheme) ? "#766B7C" : "#CDCBD7";
            style = "display: flex; justify-content:center; gap: 10px; width: 96px; height: 24px; border: solid 1px" + statusStyleColor;
            break;
        case "Completed":
            statusStyleColor = (CurrentTheme) ? "#00A653" : "#92FFC8";
            style = "display: flex; padding: 2px 10px; gap: 10px; width: 96px; height: 24px; border: solid 1px" + statusStyleColor;
            break;
        case "High":
            statusStyleColor = (CurrentTheme) ? "#00A653" : "#92FFC8";
            style = "display: flex; padding: 2px 10px; gap: 10px; width: 96px; height: 24px; border: solid 1px" + statusStyleColor;
            break;
    }
    return style;
};

(<{ StatusContent?: Function }>window).StatusContent = (status: any) => {
    switch (status) {
        case "In Progress":
            statusContentstyleColor = (CurrentTheme) ? "rgb(0, 106, 166)" : "rgb(52, 182, 255)";
            style = "width: 72px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
        case "Open":
            style = "width: 54px; height: 22px; font-style: normal;  font-weight: 400; font-size: 14px; line-height: 22px; text-align: center; color:  rgb(255, 0, 0); ";
            break;
        case "On Hold":
            statusContentstyleColor = (CurrentTheme) ? "rgb(118, 107, 124)" : "rgb(205, 203, 215)";
            style = "width: 54px; height: 22px; font-style: normal;  font-weight: 400; font-size: 14px; line-height: 22px; text-align: center; color: " + statusContentstyleColor;
            break;
        case "Completed":
            statusContentstyleColor = (CurrentTheme) ? "rgb(0, 166, 83)" : "rgb(146, 255, 200)";
            style = "width: 74px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
        case "High":
            statusContentstyleColor = (CurrentTheme) ? "rgb(243, 86, 32)" : "rgb(255, 181, 184)";
            style = "width: 31px; height: 22px; font-style: normal; font-weight: 400; font-size: 14px; line-height: 20px; text-align: center; color: " + statusContentstyleColor;
            break;
    }
    return style;
};

(<{ PriorityIconStyle?: Function }>window).PriorityIconStyle = (priority: any) => {
    switch (priority) {
        case "Low":
            priorityStyle = (CurrentTheme) ? "#00A653" : "#FDFF88";
            style = " margin-top:2px; color: " + priorityStyle + "!important";
            break;
        case "Normal":
            priorityStyle = (CurrentTheme) ? "#7100A6" : "#E3A9FF";
            style = " margin-top:2px; !important; color: " + priorityStyle + "!important";
            break;
        case "Critical":
            priorityStyle = (CurrentTheme) ? "#FF3740" : "#FFB5B8";
            style = "margin-top:2px; color: " + priorityStyle + "!important";
            break;
        case "High":
            priorityStyle = (CurrentTheme) ? "#f35620" : "#FFB5B8";
            style = "margin-top:2px; color: " + priorityStyle + "!important";
            break;
    }
    return style;
};

(<{ PriorityContent?: Function }>window).PriorityContent = (priority: any) => {
    switch (priority) {
        case "Low":
            priorityContentStyle = (CurrentTheme) ? "rgb(0, 166, 83)" : "rgb(253, 255, 136)";
            style = "width: 28px; height: 22px; font-style: normal;  font-size: 14px; margin-left:3px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
        case "Normal":
            priorityContentStyle = (CurrentTheme) ? "rgb(113, 0, 166)" : "#rgb(227, 169, 255)";
            style = "width: 28px; height: 22px; font-style: normal;  margin-left:3px; font-size: 14px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
        case "Critical":
            priorityContentStyle = (CurrentTheme) ? "rgb(255, 55, 64)" : "rgb(255, 181, 184)";
            style = "width: 48px; height: 22px; font-style: normal;  font-size: 14px; margin-left:3px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
        case "High":
            priorityContentStyle = (CurrentTheme) ? "rgb(235, 99, 67)" : "rgb(255, 181, 184)";
            style = "width: 31px; height: 22px; font-style: normal; font-size: 14px; margin-left:3px; line-height: 20px; text-align: center; color: " + priorityContentStyle;
            break;
    }
    return style;
};

(<{ PriorityIcon?: Function }>window).PriorityIcon = (priority: any) => {
    switch (priority) {
        case "Low":
            IconClass = "e-icons e-arrow-down e-icon-style";
            break;
        case "Normal":
            IconClass = "e-icons e-arrow-right e-icon-style";
            break;
        case "Critical":
            IconClass = "e-icons e-arrow-up e-icon-style";
            break;
        case "High":
            IconClass = "e-icons e-arrow-up e-icon-style";
            break;
    }
    return IconClass;
};

(window as any).getConstraintText = function (value: number): string {
    const map: { [key: number]: string } = {
        0: 'As Soon As Possible',
        1: 'As Late As Possible',
        2: 'Must Start On',
        3: 'Must Finish On',
        4: 'Start No Earlier Than',
        5: 'Start No Later Than',
        6: 'Finish No Earlier Than',
        7: 'Finish No Later Than'
    };
    return map[value];
};

(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt({
        dataSource: overviewData,
        resources: editingResources,
        height: '650px',
        rowHeight: 46,
        taskbarHeight: 25,
        width: "100%",
        enableHover: true,
        highlightWeekends: true,
        allowSelection: true,
        treeColumnIndex: 0,
        enableWBS: true,
        enableAutoWbsUpdate: true,
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
            constraintType: 'ConstraintType',
            constraintDate: 'ConstraintDate',
            resourceInfo: 'resource',
        },
        resourceFields: {
            id: 'resourceId',
            name: 'resourceName'
        },
        pdfQueryCellInfo: pdfQueryCellInfo,
        pdfQueryTaskbarInfo: pdfQueryTaskbarInfo,
        columns: [
            { field: 'WBSCode', headerText: 'WBS ID', width: 120 },
            { field: 'TaskName', width: 200, headerText: 'Product Release' },
            { field: 'Assignee', width: 195, allowSorting: false, headerText: 'Assignee', template: '#columnTemplate' },
            { field: 'Status', minWidth: 100, width: 120, headerText: 'Status', template: '#columnTemplate1' },
            { field: 'Priority', minWidth: 80, width: 120, headerText: 'Priority', template: '#columnTemplate2' },
            { field: 'WBSPredecessor', headerText: 'WBS Predecessor', width: 200 },
            { field: 'ConstraintType', width: 200 },
            { field: 'ConstraintDate', width: 200 },
            { field: 'Progress', headerText: 'Completion (%)', width: 205 },
            { field: 'TimeLog', headerText: 'Work Log', width: 150 }
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
            columnIndex: 4
        },
        load: function (args: any) {
           let themeCollection: any = ['bootstrap5', 'bootstrap', 'bootstrap4', 'fluent', 'fabric', 'fusionnew', 'material3', 'material', 'highcontrast', 'tailwind','fluent2','tailwind3','bootstrap5.3'];
            let cls: any = document.body.className.split(' ');
            theme = cls.indexOf('bootstrap5') > 0 ? 'bootstrap5' : cls.indexOf('bootstrap') > 0 ? 'bootstrap' : cls.indexOf('tailwind') > 0 ? 'tailwind' :
                cls.indexOf('fluent') > 0 ? 'fluent' : cls.indexOf('fabric') > 0 ? 'fabric' :
                    cls.indexOf('material3') > 0 ? 'material3' : cls.indexOf('bootstrap4') > 0 ? 'bootstrap4' : cls.indexOf('material') > 0 ? 'material' :
                        cls.indexOf('fusionnew') > 0 ? 'fusionnew' : cls.indexOf('highcontrast') > 0 ? 'highcontrast' : cls.indexOf('bootstrap5.3') > 0 ? 'bootstrap5.3' :
                            cls.indexOf('fluent2') > 0 ? 'fluent2' : cls.indexOf('tailwind3') > 0 ? 'tailwind3' : ''
            let check: any = themeCollection.indexOf(theme);
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
        gridLines: "Both",
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
                day: new Date('2025-03-13'),
                cssClass: 'e-custom-event-marker',
                label: 'Project Initiative'
            },
            {
                day: new Date('2025-04-18'),
                cssClass: 'e-custom-event-marker',
                label: 'Requirement Gathering'
            },
            {
                day: new Date('2025-05-30'),
                cssClass: 'e-custom-event-marker',
                label: 'Design Phase'
            },
            {
                day: new Date('2025-11-25'),
                cssClass: 'e-custom-event-marker',
                label: 'Deployment'
            },
        ],
        holidays: [{
            from: new Date("01/01/2025"),
            to: new Date("01/01/2025"),
            label: "New Year holiday",
            cssClass: "e-custom-holiday"
        },
        {
            from: new Date("12/25/2024"),
            to: new Date("12/26/2024"),
            label: "Christmas holidays",
            cssClass: "e-custom-holiday"
        }],
        labelSettings: {
            rightLabel: '#rightLabel',
            taskLabel: '${Progress}%'
        },
        allowResizing: true,
        projectStartDate: new Date('01/25/2025'),
        projectEndDate: new Date('01/30/2026'),
    });
    gantt.appendTo('#overviewSample');
    function pdfQueryCellInfo(args: any) {
        // Format Assignee column
        if (args.data.ganttProperties.resourceNames) {
            if (args.column.headerText === 'Assignee' && args.data.taskData.resourcesImage) {
                args.image = { height: 30, width: 30, base64: args.data.taskData.resourcesImage };
                args.value = `${args.data.Assignee}\n${args.data.taskData.Department}`;
            }
        }

        // Set font color for Status or Priority columns
        if (args.column.field === 'Status' || args.column.field === 'Priority') {
            const style = args.column.field === 'Status' ? (window as any).StatusContent(args.value) : (window as any).PriorityContent(args.value);// args.value is the cell's value (e.g., "Completed" for Status, "High" for Priority)
            const rgbMatch = style.match(/rgb\(\d+,\s*\d+,\s*\d+\)/);
            if (rgbMatch) {
                const rgbValues = rgbMatch[0].slice(4, -1).split(', ').map(Number);
                args.style.fontColor = new PdfColor(rgbValues[0], rgbValues[1], rgbValues[2]);
            }
        }
    }

    function pdfQueryTaskbarInfo(args: any) {
        if (gantt.labelSettings.rightLabel && args.data.taskData.resourcesImage) {
            args.labelSettings.rightLabel.image = [{ base64: args.data.taskData.resourcesImage, height: 25, width: 25 }];
            args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
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
                    value: gantt.viewType,
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
                    width: '190px',
                    tooltip: { placement: 'Before', isVisible: true, showOn: "Hover" },
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
            gantt.eventMarkers = " ";
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
    let tempRightLabel: any = "";
    function taskLabelChange(args: any) {
        const gantt: any = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.labelSettings.rightLabel = tempRightLabel;
        } else {
            tempRightLabel = gantt.labelSettings.rightLabel;
            gantt.labelSettings.rightLabel = "";
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