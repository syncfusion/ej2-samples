import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Sort, TimelineViewMode, DayMarkers } from '@syncfusion/ej2-gantt';
import { projectData } from './data-source';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList, ChangeEventArgs as dropdownEvent } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';

/**
 * Timeline customization Gantt sample
 */

Gantt.Inject(Selection, Sort, DayMarkers);
/* tslint:disable-next-line:max-func-body-length */
(window as any).default = (): void => {
    loadCultureFiles();
    let yearformat: { [key: string]: Object }[] = [
        { id: 'MMM "yy', format: 'Jan "18' },
        { id: 'y', format: '2018' },
        { id: 'MMMM, y', format: 'January, 18' },
    ];
    let monthformat: { [key: string]: Object }[] = [
        { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
        { id: 'MMMM', format: 'January' },
        { id: 'MMM', format: 'Jan' },
    ];
    let weekformat: { [key: string]: Object }[] = [
        { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
        { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
        { id: 'EEE MMM dd', format: 'Mon Jan 01' },
    ];
    let dayformat: { [key: string]: Object }[] = [
        { id: '', format: 'M' },
        { id: 'EEE', format: 'Mon' },
        { id: 'dd', format: '01' },
    ];
    let hourformat: { [key: string]: Object }[] = [
        { id: 'hh', format: '00' },
        { id: 'hh : mm a', format: '00 : 00 AM' },
        { id: 'h : mm a', format: '0 : 00 AM' },
    ];
    let unit: { [key: string]: Object }[] = [
        { id: 'Year', unit: 'Year' },
        { id: 'Month', unit: 'Month' },
        { id: 'Week', unit: 'Week' },
        { id: 'Day', unit: 'Day' },
        { id: 'Hour', unit: 'Hour' },
    ];
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectData,
            taskFields  : {
                id: 'taskID',
                name: 'taskName',
                startDate: 'startDate',
                endDate: 'endDate',
                duration: 'duration',
                progress: 'progress',
                dependency: 'predecessor',
                child: 'subtasks',
            },
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            projectStartDate: new Date('02/05/2025'),
            projectEndDate: new Date('03/23/2025'),
            timelineSettings: {
                topTier: {
                    format: 'MMM dd, yyyy',
                    unit: 'Week',
                },
                bottomTier: {
                    unit: 'Day',
                }
            },
            splitterSettings: {
                columnIndex: 1
            },
            treeColumnIndex: 1,
            labelSettings: {
                rightLabel: 'taskName',
            },
            columns: [
                { field: 'taskID', visible: false },
                { field: 'taskName', headerText: 'Name', width: 250 },
                { field: 'StartDate', headerText: 'Start Date', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration' },
                { field: 'predecessor', headerText: 'Dependency' },
                { field: 'progress', headerText: 'Progress' }
            ]
        });
    gantt.appendTo('#Timeline');

    let topTierCount: NumericTextBox = new NumericTextBox({
        format: 'n',
        min: 1,
        max: 50,
        value: 1,
        change: (e: ChangeEventArgs) => {
            let count: number = e.value;
            gantt.timelineSettings.topTier.count = count;
        }
    });
    topTierCount.appendTo('#count');

    let bottomTierCount: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 50,
        format: 'n',
        value: 1,
        change: (e: ChangeEventArgs) => {
            let count: number = e.value;
            gantt.timelineSettings.bottomTier.count = count;
        }
    });
    bottomTierCount.appendTo('#btCount');

    let topTierformat: DropDownList = new DropDownList({
        dataSource: weekformat,
        fields: { text: 'format', value: 'id' },
        value: 'MMM dd, yyyy',
        change: (e: dropdownEvent) => {
            let format: string = <string>e.value;
            gantt.timelineSettings.topTier.format = format.toString();
        }
    });
    topTierformat.appendTo('#format');

    let topTierUnit: DropDownList = new DropDownList({
        dataSource: unit,
        fields: { text: 'unit', value: 'id' },
        value: 'Week',
        change: (e: dropdownEvent) => {
            let unit: string = <string>e.value;
            gantt.timelineSettings.topTier.unit = unit as TimelineViewMode;
            if (unit === 'Year') {
                topTierformat.dataSource = yearformat;
            } else if (unit === 'Month') {
                topTierformat.dataSource = monthformat;
            } else if (unit === 'Week') {
                topTierformat.dataSource = weekformat;
            } else if (unit === 'Day') {
                topTierformat.dataSource = dayformat;
            } else {
                topTierformat.dataSource = hourformat;
            }
            topTierformat.value = topTierformat.dataSource[0].id;
            updateUnitWidth(unit, 'top');
            gantt.timelineSettings.topTier.unit = unit as TimelineViewMode;
        }
    });
    topTierUnit.appendTo('#unit');

    let bottomTierformat: DropDownList = new DropDownList({
        dataSource: dayformat,
        value: '',
        fields: { text: 'format', value: 'id' },
        change: (e: dropdownEvent) => {
            let format: string = <string>e.value;
            gantt.timelineSettings.bottomTier.format = format.toString();
        }
    });
    bottomTierformat.appendTo('#btFormat');

    let bottomTierUnit: DropDownList = new DropDownList({
        dataSource: unit,
        fields: { text: 'unit', value: 'id' },
        value: 'Day',
        change: (e: dropdownEvent) => {
            let unit: string = <string>e.value;
            gantt.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
            if (unit === 'Year') {
                bottomTierformat.dataSource = yearformat;
            } else if (unit === 'Month') {
                bottomTierformat.dataSource = monthformat;
            } else if (unit === 'Week') {
                bottomTierformat.dataSource = weekformat;
            } else if (unit === 'Day') {
                bottomTierformat.dataSource = dayformat;
            } else {
                bottomTierformat.dataSource = hourformat;
            }
            bottomTierformat.value = bottomTierformat.dataSource[0].id;
            updateUnitWidth(unit, 'bottom');
            gantt.timelineSettings.bottomTier.unit = unit as TimelineViewMode;
        }
    });
    bottomTierUnit.appendTo('#btUnit');

    let topTier: CheckBox = new CheckBox({ checked: true });
    topTier.appendTo('#topTierCheck');

    let bottomTier: CheckBox = new CheckBox({ checked: true });
    bottomTier.appendTo('#bottomTierCheck');

    document.getElementById('topTierCheck').onclick = () => {
        if (topTier.checked) {
            gantt.timelineSettings.topTier.unit = 'Week';
            topTierCount.enabled = true;
            topTierformat.enabled = true;
            topTierUnit.enabled = true;
        } else {
            gantt.timelineSettings.topTier.unit = 'None';
            topTierCount.enabled = false;
            topTierformat.enabled = false;
            topTierUnit.enabled = false;
        }
    };

    document.getElementById('bottomTierCheck').onclick = () => {
        if (bottomTier.checked) {
            gantt.timelineSettings.bottomTier.unit = 'Day';
            bottomTierCount.enabled = true;
            bottomTierformat.enabled = true;
            bottomTierUnit.enabled = true;
        } else {
            gantt.timelineSettings.bottomTier.unit = 'None';
            bottomTierCount.enabled = false;
            bottomTierformat.enabled = false;
            bottomTierUnit.enabled = false;
        }
    };

    let unitWidthNumObj: NumericTextBox = new NumericTextBox({
        min: 10,
        format: 'n',
        value: 33,
        change: (e: ChangeEventArgs) => {
            let width: number = e.value;
            gantt.timelineSettings.timelineUnitSize = width;
        }
    });
    unitWidthNumObj.appendTo('#unitWidth');

    function updateUnitWidth(unit: string, tier: string): void {
        let topUnit: string = tier === 'top' ? unit : gantt.timelineSettings.topTier.unit;
        let bottomUnit: string = tier === 'bottom' ? unit : gantt.timelineSettings.bottomTier.unit;
        let units: string[] = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
        let bootomCellUnit: string;
        let unitWidth: number;
        if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = 'Day';
        } else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
            bootomCellUnit = bottomUnit;
        } else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = topUnit;
        } else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
            bootomCellUnit = topUnit;
        } else {
            bootomCellUnit = bottomUnit;
        }
        if (bootomCellUnit === 'Year') {
             unitWidth = 2000;
        } else if (bootomCellUnit === 'Month') {
            unitWidth = 300;
        } else if (bootomCellUnit === 'Week') {
            unitWidth = 150;
        } else if (bootomCellUnit === 'Day') {
            unitWidth = 33;
        } else if (bootomCellUnit === 'Hour') {
            unitWidth = 25;
        }
        unitWidthNumObj.value = unitWidth;
    }

    let mutitaskbar: CheckBox = new CheckBox({ checked: false });
    mutitaskbar.appendTo('#mutiTaskbarCheck');

    document.getElementById('mutiTaskbarCheck').onclick = function () {
        if (mutitaskbar.checked) {
            gantt.enableMultiTaskbar = true;
        } else {
            gantt.enableMultiTaskbar = false;
        }
    };
};
