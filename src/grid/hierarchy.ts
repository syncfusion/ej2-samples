import { Grid, Page, Selection, DetailRow, DetailDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { employeeData } from './datasource';

Grid.Inject(Page, Selection, DetailRow);
/**
 * Hierarchy Grid Sample
 */
this.default = (): void => {
    let dataManger: Object = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Orders',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    let dataManger2: Object = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });

    let popup: HTMLElement = document.createElement('div');
    popup.id = 'popup';
    let div: HTMLElement = document.createElement('div');
    div.id = 'waitingpopup';
    div.classList.add('waitingpopup');
    let span: HTMLElement = document.createElement('span');
    span.classList.add('image');
    div.appendChild(span);
    popup.appendChild(div);
    document.getElementById('Grid').appendChild(popup);

    function show(args: DetailDataBoundEventArgs): void {
        div = document.getElementById('waitingpopup') || div;
        popup = document.getElementById('popup') || popup;
        let element: HTMLElement = <HTMLElement>args.detailElement || this.element;
        if (!element.querySelector('#popup')) {
            element.firstElementChild.appendChild(popup);
        }
        let width: number = element.offsetWidth;
        let height: number = element.offsetHeight;
        popup.style.width = width + 'px';
        popup.style.height = height + 'px';
        popup.style.top = '0px';
        popup.style.left = '0px';
        div.style.top = (element.offsetHeight / 2 - 25) + 'px';
        div.style.left = (element.offsetWidth / 2 - 25) + 'px';
        popup.style.display = '';
    }

    let hide: EmitType<Object> = () => {
        popup.style.display = 'none';
    };

    let grid: Grid = new Grid({
        dataSource: employeeData,
        allowSorting: true,
        columns: [
            { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 125 },
            { field: 'FirstName', headerText: 'Name', width: 125 },
            { field: 'Title', headerText: 'Title', width: 180 },
            { field: 'City', headerText: 'City', width: 110 },
            { field: 'Country', headerText: 'Country', width: 110 }
        ],
        detailDataBound: show,
        dataBound: hide,
        created: hide,
        childGrid: {
            dataSource: dataManger,
            queryString: 'EmployeeID',
            allowPaging: true,
            detailDataBound: show,
            dataBound: hide,
            actionBegin: show,
            actionComplete: hide,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: {
                dataSource: dataManger2,
                queryString: 'CustomerID',
                detailDataBound: show,
                dataBound: hide,
                columns: [
                    { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'right', width: 75 },
                    { field: 'Phone', headerText: 'Phone', width: 100 },
                    { field: 'Address', headerText: 'Address', width: 120 },
                    { field: 'Country', headerText: 'Country', width: 100 }
                ]
            },

        },
    });
    grid.appendTo('#Grid');
};