import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Tab drag and drop sample
 */
import { Tab, DragEventArgs, TreeView, DragAndDropEventArgs, SelectEventArgs, TabItemModel } from '@syncfusion/ej2-navigations';
import { isNullOrUndefined, createElement, Browser } from '@syncfusion/ej2-base';
import { Chart, LineSeries, Category } from '@syncfusion/ej2-charts';
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { Grid } from '@syncfusion/ej2-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DatePicker, Calendar } from '@syncfusion/ej2-calendars';
import { Uploader } from '@syncfusion/ej2-inputs';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);
Chart.Inject(LineSeries, Category);

let data: { [key: string]: Object }[] = [
    { text: 'Dropdown List', id: 'list-01' },
    { text: 'DatePicker', id: 'list-02' },
    { text: 'Calendar', id: 'list-03' },
    { text: 'File Upload', id: 'list-04' },
    { text: 'Rich Text Editor', id: 'list-05' }
];

let rteObj: RichTextEditor;
let chartObj: Chart;
let scheduleObj: Schedule;
let draggedItemHeader: string;
let i: number = 0;
// tslint:disable-next-line:max-func-body-length
function renderComponents(): void {
    //Initialize Tab component
    let tabObj: Tab = new Tab({
        created: onTabCreate,
        dragArea: '#TabContainer',
        selected: selectedTab,
        onDragStart: onTabDragStart,
        dragged: onDraggedTab,
        allowDragAndDrop: true,
        items: [
            {
                header: { 'text': 'Grid' },
                content: '#Grid'
            },
            {
                header: { 'text': 'Chart' },
                content: '#Chart'
            },
            {
                header: { 'text': 'Schedule' },
                content: '#Schedule'
            }
        ],

    });
    tabObj.appendTo('#draggableTab');

    let treeViewObj: TreeView = new TreeView({
        fields: { dataSource: data, id: 'id', text: 'text' },
        allowDragAndDrop: true,
        dragArea: '#TabContainer',
        nodeDragStop: onNodeDragStop,
        nodeDragging: onNodeDrag,
        cssClass: 'treeview-external-drag-tab'
    });
    treeViewObj.appendTo('#ListView');

    function onTabCreate(): void {
        let tabElement: HTMLElement = document.getElementById('draggableTab');
        if (!isNullOrUndefined(tabElement)) {
            tabElement.querySelector('.e-tab-header').classList.add('e-droppable');
            tabElement.querySelector('.e-content').classList.add('tab-content');
        }
    }

    function selectedTab(args: SelectEventArgs): void {
        if (tabObj.items[args.selectedIndex].header.text === 'Rich Text Editor') {
            rteObj.refreshUI();
        }
        if (tabObj.items[args.selectedIndex].header.text === 'Schedule') {
            scheduleObj.refresh();
        }
        if (tabObj.items[args.selectedIndex].header.text === 'Chart') {
            chartObj.refresh();
        }
    }

    function onTabDragStart(args: DragEventArgs): void {
        draggedItemHeader = <string>tabObj.items[args.index].header.text;
    }

    function onDraggedTab(args: DragEventArgs): void {
        let dragTabIndex: number = Array.prototype.indexOf.call(tabObj.element.querySelectorAll('.e-toolbar-item'), args.draggedItem);
        let dropNode: HTMLElement = <HTMLElement>args.target.closest('#ListView .e-list-item');
        if (dropNode != null && !args.target.closest('#draggableTab .e-toolbar-item')) {
            args.cancel = true;
            // tslint:disable-next-line:max-line-length
            let dropContainer: NodeListOf<Element> = (document.querySelector('.treeview-external-drag-tab')).querySelectorAll('.e-list-item');
            let dropIndex: number = Array.prototype.indexOf.call(dropContainer, dropNode);
            let newNode: { [key: string]: Object }[] = [{ id: 'list' + i, text: draggedItemHeader }];
            tabObj.removeTab(dragTabIndex);
            treeViewObj.addNodes(newNode, 'Treeview', dropIndex);
        }
    }

    function onNodeDragStop(args: DragAndDropEventArgs): void {
        let dropElement: HTMLElement = <HTMLElement>args.target.closest('#draggableTab .e-toolbar-item');
        if (dropElement != null) {
            let tabElement: HTMLElement = document.querySelector('#draggableTab');
            let itemPosition: number = (args.event.clientX < dropElement.getBoundingClientRect().left +
                dropElement.offsetWidth / 2) ? 0 : 1;
            let dropItemIndex: number = [].slice.call(tabElement.querySelectorAll('.e-toolbar-item')).indexOf(dropElement) + itemPosition;
            let tabContent: HTMLElement;
            let content: string = '';
            switch (args.draggedNodeData.text) {
                case 'Dropdown List':
                    tabContent = createElement('input', { id: 'DropdownList' });
                    content = tabContent.id;
                    tabContent.setAttribute('type', 'text');
                    tabContent.setAttribute('tabindex', '1');
                    document.querySelector('#external').appendChild(tabContent);
                    renderDropdownList();
                    break;
                case 'DatePicker':
                    tabContent = createElement('input', { id: 'DatePicker' });
                    content = tabContent.id;
                    tabContent.setAttribute('type', 'text');
                    document.querySelector('#external').appendChild(tabContent);
                    renderDatePicker();
                    break;
                case 'Calendar':
                    tabContent = createElement('div', { id: 'Calendar' });
                    content = tabContent.id;
                    document.querySelector('#external').appendChild(tabContent);
                    renderCalendar();
                    break;
                case 'File Upload':
                    tabContent = createElement('input', { id: 'FileUpload' });
                    content = tabContent.id;
                    tabContent.setAttribute('type', 'file');
                    tabContent.setAttribute('name', 'UploadFiles');
                    document.querySelector('#external').appendChild(tabContent);
                    renderUploader();
                    break;
                case 'Rich Text Editor':
                    tabContent = createElement('div', { id: 'RichTextEditor' });
                    content = tabContent.id;
                    let rteContent: HTMLElement = <HTMLElement>document.querySelector('#rte').cloneNode(true);
                    if (!isNullOrUndefined(rteContent)) {
                        tabContent.appendChild(rteContent);
                    }
                    document.querySelector('#external').appendChild(tabContent);
                    renderRichTextEditor();
                    break;
                case 'Grid':
                    tabContent = createElement('div', { id: 'Grid' });
                    content = tabContent.id;
                    document.querySelector('#external').appendChild(tabContent);
                    renderGrid();
                    document.querySelector('#external #Grid').classList.add('Grid');
                    break;
                case 'Chart':
                    tabContent = createElement('div', { id: 'Chart' });
                    content = tabContent.id;
                    document.querySelector('#external').appendChild(tabContent);
                    renderChart();
                    document.querySelector('#external #Chart').classList.add('Chart');
                    break;
                case 'Schedule':
                    tabContent = createElement('div', { id: 'Schedule' });
                    content = tabContent.id;
                    document.querySelector('#external').appendChild(tabContent);
                    renderSchedule();
                    break;
            }
            let newTabItem: TabItemModel[] = [{
                header: { 'text': args.draggedNodeData.text.toString() },
                content: <HTMLElement>(document.querySelector('.' + content))
            }];
            tabObj.addTab(newTabItem, dropItemIndex);
            treeViewObj.removeNodes([args.draggedNode]);
            args.cancel = true;
        } else {
            let dropNode: HTMLElement = <HTMLElement>args.target.closest('#ListView .e-list-item ');
            if (!isNullOrUndefined(dropNode) && args.dropIndicator === 'e-drop-in') {
                args.cancel = true;
            }
        }
    }
    function onNodeDrag(args: DragAndDropEventArgs): void {
        if (!isNullOrUndefined(args.target.closest('.tab-content'))) {
            args.dropIndicator = 'e-no-drop';
        } else if (!isNullOrUndefined(args.target.closest('#draggableTab .e-tab-header'))) {
            args.dropIndicator = 'e-drop-in';
        }
    }
}
function renderGrid(): void {
    let gridData: Object[] = [
        {
            OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
            ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
            ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
        },
        {
            OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
            ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
            ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
        },
        {
            OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
            ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
            ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 65.83, Verified: !0
        },
        {
            OrderID: 10251, CustomerID: 'VICTE', EmployeeID: 3, OrderDate: new Date(8367642e5),
            ShipName: 'Victuailles en stock', ShipCity: 'Lyon', ShipAddress: '2, rue du Commerce',
            ShipRegion: 'CJ', ShipPostalCode: '69004', ShipCountry: 'France', Freight: 41.34, Verified: !0
        },
        {
            OrderID: 10252, CustomerID: 'SUPRD', EmployeeID: 2, OrderDate: new Date(8368506e5),
            ShipName: 'Suprêmes délices', ShipCity: 'Charleroi', ShipAddress: 'Boulevard Tirou, 255',
            ShipRegion: 'CJ', ShipPostalCode: 'B-6000', ShipCountry: 'Belgium', Freight: 51.3, Verified: !0
        }
    ];
    let gridObj: Grid = new Grid({
        dataSource: gridData,
        columns: [
            { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
            { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
            { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' },
            { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd' }
        ]
    });
    gridObj.appendTo('#Grid');
}

function renderChart(): void {
    let chartData: any[] = [
        { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
        { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
        { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
        { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
        { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
        { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
    ];
    chartObj = new Chart({
        primaryXAxis: {
            valueType: 'Category'
        },
        width: Browser.isDevice ? '100%' : '60%',
        series: [{
            dataSource: chartData,
            xName: 'month',
            yName: 'sales',
            type: 'Line'
        }]
    });
    chartObj.appendTo('#Chart');
}

function renderSchedule(): void {
    let dataManager: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    scheduleObj = new Schedule({
        height: 350,
        cssClass: 'Schedule',
        selectedDate: new Date(2020, 9, 20),
        readonly: true,
        eventSettings: { dataSource: dataManager }
    });
    scheduleObj.appendTo('#Schedule');
}
function renderDropdownList(): void {
    let sportsData: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];
    let dropDownListObj: DropDownList = new DropDownList({
        width: 200,
        placeholder: 'Select a game',
        cssClass: 'DropdownList',
        dataSource: sportsData
    });
    dropDownListObj.appendTo('#DropdownList');
}
function renderDatePicker(): void {
    let datepickerObj: DatePicker = new DatePicker({
        cssClass: 'DatePicker',
        placeholder: 'Enter date',
        width: 200
    });
    datepickerObj.appendTo('#DatePicker');
}
function renderCalendar(): void {
    let calendarObj: Calendar = new Calendar({
        cssClass: 'Calendar',
    });
    calendarObj.appendTo('#Calendar');
}
function renderUploader(): void {
    let uploadObj: Uploader = new Uploader({
        cssClass: 'FileUpload',
        autoUpload: false
    });
    uploadObj.appendTo('#FileUpload');
}
function renderRichTextEditor(): void {
    rteObj = new RichTextEditor({
        cssClass: 'RichTextEditor',
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase']
        }
    });
    rteObj.appendTo('#RichTextEditor');
}
(window as any).default = (): void => {
    loadCultureFiles();
    renderGrid();
    renderChart();
    renderSchedule();
    renderComponents();
};
