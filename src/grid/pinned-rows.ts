import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Filter, VirtualScroll, Freeze, ContextMenu } from '@syncfusion/ej2-grids';
import { supportData } from './data-source';

Grid.Inject(VirtualScroll, Sort, Filter, Freeze, ContextMenu);
/**
 * Pinned rows sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
    {
        dataSource: supportData,
        allowFiltering: true,
        filterSettings: { type: 'Excel' },
        enableVirtualization: true,
        allowSorting: true,
        allowKeyboard: false,
        pageSettings: { pageSize: 20 },
        isRowPinned: function (data: Object) {
            if (data && ((<{ Rating?: string }>data).Rating === "Very Dissatisfied" || (<{ Rating?: string }>data).Rating === 'Dissatisfied')) {
                return true;
            }
            return false;
        },
        height: 300,
        contextMenuItems: ['PinRow', 'UnpinRow'],
        columns: [
            {
                field: 'TicketID',
                headerText: 'Ticket ID',
                width: 140,
                isPrimaryKey: true,
                freeze: 'Left'
            },
            {
                field: 'Title',
                headerText: 'Title',
                width: 210,
            },
            {
                field: 'Description',
                headerText: 'Description',
                width: 250,
                clipMode: 'EllipsisWithTooltip',
                allowFiltering: false
            },
            {
                field: 'Status',
                headerText: 'Status',
                textAlign: 'Center',
                template: '#statusTemplate',
                width: 140
            },
            {
                field: 'Priority',
                headerText: 'Priority',
                textAlign: 'Center',
                template: '#priorityTemplate',
                width: 140
            },
            {
                field: 'Assignee',
                headerText: 'Assignee',
                width: 140,
            },
            {
                field: 'Category',
                headerText: 'Category',
                width: 130,
            },
            {
                field: 'TypeofRequest',
                headerText: 'Type of Request',
                width: 210,
                template: '#requestTemplate'
            },
            {
                field: 'CreatedDate',
                headerText: 'Created Date',
                width: 160,
                format: 'yMd',
                textAlign: "Right",
            },
            {
                field: 'Rating',
                headerText: 'Rating',
                textAlign: 'Center',
                template: '#ratingTemplate',
                width: 160,
                freeze: 'Right'
            },
        ],
    })
    grid.appendTo('#PinnedRows');

    (<{ requestTemplate?: Function }>window).requestTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'e-request-info';
        const imgElement = document.createElement('img');
        imgElement.src = 'src/grid/images/supportType/' + e.TypeofRequest + '.svg';
        imgElement.alt = e.TypeofRequest;
        const nameElement = document.createElement('span');
        nameElement.innerText = e.TypeofRequest;
        divElement.appendChild(imgElement);
        divElement.appendChild(nameElement);
        return divElement.outerHTML;
    };

    (<{ratingDetail?: Function}>window).ratingDetail = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        if (e.Rating === 'Satisfied') {
            span.className = 'statustxt e-satisfiedcolor';
            span.textContent = 'Satisfied';
            div.className = 'statustemp e-satisfiedcolor';
        } else if (e.Rating === 'Very Satisfied') {
            span.className = 'statustxt e-verysatisfiedcolor';
            span.textContent = 'Very Satisfied';
            div.className = 'statustemp e-verysatisfiedcolor';
        } else if (e.Rating === 'Dissatisfied') {
            span.className = 'statustxt e-dissatisfiedcolor';
            span.textContent = 'Dissatisfied';
            div.className = 'statustemp e-dissatisfiedcolor';
        } else if (e.Rating === 'Very Dissatisfied') {
            span.className = 'statustxt e-verydissatisfiedcolor';
            span.textContent = 'Very Dissatisfied';
            div.className = 'statustemp e-verydissatisfiedcolor';
        } else {
            span.className = 'statustxt e-neutralcolor';
            span.textContent = 'Neutral';
            div.className = 'statustemp e-neutralcolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };

    (<{statusDetail?: Function}>window).statusDetail = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        if (e.Status === 'Open') {
            span.className = 'statustxt e-opencolor';
            span.textContent = 'Open';
            div.className = 'statustemp e-opencolor';
        } else if (e.Status === 'In Progress') {
            span.className = 'statustxt e-inprogresscolor';
            span.textContent = 'In Progress';
            div.className = 'statustemp e-inprogresscolor';
        } else if (e.Status === 'Closed') {
            span.className = 'statustxt e-closedcolor';
            span.textContent = 'Closed';
            div.className = 'statustemp e-closedcolor';
        } else {
            span.className = 'statustxt e-resolvedcolor';
            span.textContent = 'Resolved';
            div.className = 'statustemp e-resolvedcolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };

    (<{priorityDetail?: Function}>window).priorityDetail = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        if (e.Priority === 'High') {
            span.className = 'statustxt e-highcolor';
            span.textContent = 'High';
            div.className = 'statustemp e-highcolor';
        } else if (e.Priority === 'Low') {
            span.className = 'statustxt e-lowcolor';
            span.textContent = 'Low';
            div.className = 'statustemp e-lowcolor';
        } else if (e.Priority === 'Medium') {
            span.className = 'statustxt e-mediumcolor';
            span.textContent = 'Medium';
            div.className = 'statustemp e-mediumcolor';
        } else {
            span.className = 'statustxt e-urgentcolor';
            span.textContent = 'Urgent';
            div.className = 'statustemp e-urgentcolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };
};