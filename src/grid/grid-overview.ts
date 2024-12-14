import { loadCultureFiles } from '../common/culture-loader';
import { Grid, VirtualScroll, Sort, Filter, Selection } from '@syncfusion/ej2-grids';
import { isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Rating } from '@syncfusion/ej2-inputs';
import { getTradeData } from './data-source';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

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

function startTimer(args: any): void {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
}

(<{ratingDetail?: Function}>window).ratingDetail = (e: any): any => {
    let temp: HTMLTemplateElement = document.getElementsByTagName("template")[0];
    var cloneTemplate: any = temp.content.cloneNode(true);
    let ratingElement: HTMLElement = cloneTemplate.querySelector(".rating");
    const rating: Rating = new Rating({
        value: e.Rating, 
        readOnly: true,
        cssClass: 'custom-rating'
    });
    rating.appendTo(ratingElement);
    return (ratingElement as any).ej2_instances[0].wrapper.outerHTML;
};

(<{progessDetail?: Function}>window).progessDetail = (e: any): any => {
    const myProgress: Element = document.createElement('div');
    myProgress.id = 'myProgress';
    myProgress.className = 'pbar';
    const myBar: Element = document.createElement('div');
    myBar.id = 'myBar';
    myBar.className = 'bar';
    if (e.Status === 'Inactive') {
        myBar.classList.add('progressdisable');
    }
    if (e.Software <= 20) {
        e.Software = e.Software + 30;
    }
    (myBar as HTMLElement).style.width = e[e.column.field] + '%';
    const pbarlabel: Element = document.createElement('div');
    pbarlabel.id = 'pbarlabel';
    pbarlabel.className = 'barlabel';
    pbarlabel.textContent = e.Software + '%';
    myBar.appendChild(pbarlabel);
    myProgress.appendChild(myBar);
    return myProgress.outerHTML;
};

(<{empDetail?: Function}>window).empDetail = (e: any): any => {
    const div: Element = document.createElement('div');
    const empImg: Element = document.createElement('div');
    empImg.className = 'empimg';
    const span: Element = document.createElement('span');
    span.className = 'e-userimg';
    if (e.EmployeeImg === 'usermale') {
        span.classList.add('sf-icon-Male');
    } else {
        span.classList.add('sf-icon-FeMale');
    }
    empImg.appendChild(span);
    const Emptext: Element = document.createElement('span');
    Emptext.id = 'Emptext';
    Emptext.textContent = e.Employees;
    div.appendChild(empImg);
    div.appendChild(Emptext);
    return div.outerHTML;
};

(<{statusDetail?: Function}>window).statusDetail = (e: any): any => {
    const div: Element = document.createElement('div');
    const span: Element = document.createElement('span');
    if (e.Status === 'Active') {
        span.className = 'statustxt e-activecolor';
        span.textContent = 'Active';
        div.className = 'statustemp e-activecolor';
    } else {
        span.className = 'statustxt e-inactivecolor';
        span.textContent = 'Inactive';
        div.className = 'statustemp e-inactivecolor';
    }
    div.appendChild(span);
    return div.outerHTML;
};

let urlapi: DataManager = new DataManager({
    url: "https://services.syncfusion.com/js/production/api/UrlDataSource",
    adaptor: new UrlAdaptor()
});

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: urlapi,
        query: new Query().addParams('dataCount', '1000'),
        allowSelection: true,
        allowFiltering: true,
        allowSorting: true,
        enableVirtualization: true,
        loadingIndicator: { indicatorType: 'Shimmer' },
        filterSettings: { type: 'Menu' },
        selectionSettings: { persistSelection: true, type: 'Multiple', checkboxOnly: true },
        enableHover: false,
        height: 400,
        rowHeight: 38,
        columns: [
            { type: 'checkbox', allowFiltering: false, allowSorting: false, width: '60' },
            { field: 'EmployeeID', visible: false, headerText: 'Employee ID', isPrimaryKey: true, width: '130' },
            {
                field: 'Employees', headerText: 'Employee Name', width: '200', clipMode: 'EllipsisWithTooltip',
                template: '#empTemplate',
            },
            {
                field: 'Designation', headerText: 'Designation', width: '170',
                clipMode: 'EllipsisWithTooltip'
            },
            { field: 'Mail', headerText: 'Mail', width: '230' },
            {
                field: 'Location', width: '140', headerText: 'Location',
                template: '#coltemplate'
            },
            {
                field: 'Status', headerText: 'Status',
                width: '150', template: '#statusTemplate'
            },
            {
                field: 'Trustworthiness', headerText: 'Trustworthiness',
                width: '160', template: '#trustTemplate'
            },
            {
                field: 'Rating', headerText: 'Rating',
                width: '160', template: '#ratingTemplate'
            },
            {
                field: 'Software', allowFiltering: false, allowSorting: false, headerText: 'Software Proficiency',
                width: '180', template: '#progessTemplate'
            },
            {
                field: 'CurrentSalary', headerText: 'Current Salary', format: 'C2',
                textAlign: 'Right', width: '160'
            },
            { field: 'Address', headerText: 'Address', width: '240', clipMode: 'EllipsisWithTooltip' },
        ],
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
                if (grid.query.params.length > 1) {
                    for (let i: number = 0; i < grid.query.params.length; i++) {
                        if (grid.query.params[i].key === 'dataCount') {
                            grid.query.params[i].value = index.toString();
                            break;
                        }
                    }
                }
                else {
                    grid.query.params[0].value = index.toString();
                }
                grid.setProperties({dataSource: urlapi});
            },
            100);
    }
    var observer = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach(() => {
            if (dReady && stTime && isDataChanged) {
                let msgEle: Element = document.getElementById('msg') as Element;
                let val: any = (performance.now() - stTime).toFixed(0);
                stTime = null;
                dtTime = false;
                dReady = false;
                isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + '<b>' + val + '</b>' + '<b>ms</b>';
                msgEle.classList.remove('e-hide');
            }
        });
    });
    observer.observe(document.getElementById('Grid') as Node, {
        attributes: true,
        childList: true,
        subtree: true,
    });
};

