import { loadCultureFiles } from '../common/culture-loader';
﻿import { Grid, VirtualScroll, Sort, Filter, Selection } from '@syncfusion/ej2-grids';
import { isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { getTradeData } from './data-source';

Grid.Inject(Selection, VirtualScroll, Sort, Filter);

/**
 * Grid Overview sample
 */
let dReady: boolean = false;
let dtTime: boolean = false;
let isDataBound: boolean = false;
let isDataChanged: boolean = true;
let intervalFun: any;
let clrIntervalFun: any;
let clrIntervalFun1: any;
let clrIntervalFun2: any;
let ddObj: DropDownList;
let dropSlectedIndex: number = null;
let stTime: any;
stTime = performance.now();

function complete(args: any): void {
    if (args.requestType === 'filterchoicerequest') {
        if (args.filterModel.options.field === 'Trustworthiness' || args.filterModel.options.field === 'Rating'
            || args.filterModel.options.field === 'Status') {
            let span: Element = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
            if (!isNullOrUndefined(span)) {
                closest(span, '.e-ftrchk').classList.add('e-hide');
            }
        }
    }
}
function queryCellInfo(args: any): void {
    if (args.column.field === 'Employees') {
        if (args.data.EmployeeImg === 'usermale') {
            args.cell.querySelector('.e-userimg').classList.add('sf-icon-Male');
        } else {
            args.cell.querySelector('.e-userimg').classList.add('sf-icon-FeMale');
        }
    }
    if (args.column.field === 'Status') {
        if (args.cell.textContent === 'Active') {
            args.cell.querySelector('.statustxt').classList.add('e-activecolor');
            args.cell.querySelector('.statustemp').classList.add('e-activecolor');
        }
        if (args.cell.textContent === 'Inactive') {
            args.cell.querySelector('.statustxt').classList.add('e-inactivecolor');
            args.cell.querySelector('.statustemp').classList.add('e-inactivecolor');
        }
    }
    if (args.column.field === 'Rating') {
        if (args.column.field === 'Rating') {
            for (let i: number = 0; i < args.data.Rating; i++) {
                args.cell.querySelectorAll('span')[i].classList.add('checked');
            }
        }
    }
    if (args.column.field === 'Software') {
        if (args.data.Software <= 20) {
            args.data.Software = args.data.Software + 30;
        }
        args.cell.querySelector('.bar').style.width = args.data.Software + '%';
        args.cell.querySelector('.barlabel').textContent = args.data.Software + '%';
        if (args.data.Status === 'Inactive') {
            args.cell.querySelector('.bar').classList.add('progressdisable');
        }
    }
}
function startTimer(args: any): void {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
}


(<{trustTemp?: Function}>window).trustTemp = (e: any): any => {
    if (e.Trustworthiness === 'Select All') {
        return '';
    }
    /* tslint:disable-next-line:max-line-length */
    return '<img style="width: 31px; height: 24px" src="src/grid/images/' + e.Trustworthiness + '.png" /> <span id="Trusttext">' + e.Trustworthiness + '</span>';
};

(<{ratingDetail?: Function}>window).ratingDetail = (e: any): any => {
    let grid: any = (<any>document.querySelector('.e-grid')).ej2_instances[0];
    let div: Element = document.createElement('div');
    div.className = 'rating';
    let span: Element;
    if (e.Rating === 'Select All') {
        return '';
    }
    for (let i: number = 0; i < 5; i++) {
        if (i < e.Rating) {
            span = document.createElement('span');
            span.className = 'star checked';
            div.appendChild(span);
        } else {
            span = document.createElement('span');
            span.className = 'star';
            div.appendChild(span);
        }
    }
    return div.outerHTML;
};

(<{statusDetail?: Function}>window).statusDetail = (e: any): any => {
    let grid: any = (<any>document.querySelector('.e-grid')).ej2_instances[0];
    let div: Element = document.createElement('div');
    let span: Element;
    if (e.Status === 'Select All') {
        return 'Select All';
    }
    span = document.createElement('span');
    if (e.Status === 'Active') {
        span.className = 'statustxt e-activecolor';
        span.textContent = 'Active';
        div.className = 'statustemp e-activecolor';
    }
    if (e.Status === 'Inactive') {
        span = document.createElement('span');
        span.className = 'statustxt e-inactivecolor';
        span.textContent = 'Inactive';
        div.className = 'statustemp e-inactivecolor';
    }
    div.appendChild(span);
    return div.outerHTML;
};

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: getTradeData(1000),
        allowSelection: true,
        allowFiltering: true,
        allowSorting: true,
        enableVirtualization: true,
        filterSettings: { type: 'Menu' },
        selectionSettings: { persistSelection: true, type: 'Multiple', checkboxOnly: true },
        enableHover: false,
        height: 600,
        rowHeight: 38,
        columns: [
            { type: 'checkbox', allowFiltering: false, allowSorting: false, width: '60' },
            { field: 'EmployeeID', visible: false, headerText: 'Employee ID', isPrimaryKey: true, width: '130' },
            {
                field: 'Employees', headerText: 'Employee Name', width: '200', clipMode: 'EllipsisWithTooltip',
                template: '#empTemplate',
                filter: { type: 'CheckBox' }
            },
            {
                field: 'Designation', headerText: 'Designation', width: '170',
                filter: { type: 'CheckBox' }, clipMode: 'EllipsisWithTooltip'
            },
            { field: 'Mail', headerText: 'Mail', width: '230', filter: { type: 'Menu' } },
            {
                field: 'Location', width: '140', headerText: 'Location', filter: { type: 'CheckBox' },
                template: '#coltemplate'
            },
            {
                field: 'Status', headerText: 'Status', filter: { type: 'CheckBox', itemTemplate: '#StatusItemTemp' },
                width: '150', template: '#statusTemplate'
            },
            {
                field: 'Trustworthiness', headerText: 'Trustworthiness',
                filter: { type: 'CheckBox', itemTemplate: '${ trustTemp(data)}' }, width: '160', template: '#trustTemplate'
            },
            {
                field: 'Rating', filter: { type: 'CheckBox', itemTemplate: '<div>${ratingDetail(data)}</div>' }, headerText: 'Rating',
                width: '160', template: '#ratingTemplate'
            },
            {
                field: 'Software', allowFiltering: false, allowSorting: false, headerText: 'Software Proficiency',
                width: '180', template: '#progessTemplate'
            },
            {
                field: 'CurrentSalary', headerText: 'Current Salary', format: 'C2',
                filter: { type: 'Menu' }, textAlign: 'Right', width: '160'
            },
            { field: 'Address', headerText: 'Address', width: '240', filter: { type: 'Menu' }, clipMode: 'EllipsisWithTooltip' },
        ],
        queryCellInfo: queryCellInfo,
        dataBound: startTimer,
        actionComplete: complete
    });
    grid.appendTo('#Grid');
    grid.on('data-ready', () => {
        dReady = true;
    });
    let listObj: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select a Data Range',
        popupHeight: '240px',
        width: '220px',
        change: () => { valueChange(); }
    });
    listObj.appendTo('#ddl');
    function valueChange(): void {
        (<any>listObj).closePopup();
        grid.showSpinner();
        dropSlectedIndex = null;
        let index: number = listObj.value as number;
        clearTimeout(clrIntervalFun2);
        clrIntervalFun2 = setTimeout(
            () => {
                isDataChanged = true;
                stTime = null;
                let contentElement: Element = grid.contentModule.getPanel().firstChild as Element;
                contentElement.scrollLeft = 0;
                contentElement.scrollTop = 0;
                grid.pageSettings.currentPage = 1;
                stTime = performance.now();
                grid.dataSource = getTradeData(index);
                grid.hideSpinner();
            },
            100);
    }
    document.getElementById('Grid').addEventListener('DOMSubtreeModified', () => {
            if (dReady && stTime && isDataChanged) {
                let msgEle: Element = document.getElementById('msg');
                let val: any = (performance.now() - stTime).toFixed(0);
                stTime = null;
                dtTime = false;
                dReady = false;
                isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + '<b>' + val + '</b>' + '<b>ms</b>';
                msgEle.classList.remove('e-hide');
            }
        });
};

