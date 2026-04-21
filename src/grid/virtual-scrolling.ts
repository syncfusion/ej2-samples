import { loadCultureFiles } from '../common/culture-loader';
import { VirtualScroll, Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { Button } from '@syncfusion/ej2-buttons';
import { createVirtualOrderData, virtualOrderData } from './data-source';
import { Rating } from '@syncfusion/ej2/inputs';
/**
 * virtualscrolling sample
 */
Grid.Inject(VirtualScroll, Edit, Toolbar);

(window as any).default = (): void => {
    loadCultureFiles();
    let date1: number; let date2: number; let flag: boolean = true; let genarateData: Button = new Button({}, '#genarate');
    let data: Object[] = [];
    genarateData.element.onclick = () => {
        if (!data.length) {
            show(); createVirtualOrderData(); date1 = new Date().getTime(); grid.dataSource = data = virtualOrderData;
        }
    };
    let grid: Grid = new Grid(
        {
            dataSource: [], enableVirtualization: true, enableColumnVirtualization: true, height: 400, rowHeight: 50,
            editSettings: { allowEditing: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            clipMode:'EllipsisWithTooltip',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 110, isPrimaryKey: true, validationRules: { required: true } },
                { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'ShipDate', headerText: 'Ship Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'OrderStatus', headerText: 'Order Status', width: 140, textAlign: 'Center', editType: 'dropdownedit', template: '#orderStatusTemplate', validationRules: { required: true } },
                { field: 'Priority', headerText: 'Priority', width: 110, textAlign: 'Center', editType: 'dropdownedit', template: '#priorityTemplate', validationRules: { required: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 190, validationRules: { required: true } },
                { field: 'CustomerID', headerText: 'Customer ID', width: 110, visible: false },
                { field: 'Email', headerText: 'Email', width: 200 },
                { field: 'Phone', headerText: 'Phone Number', width: 140, textAlign: 'Right' },
                { field: 'ShipAddress', headerText: 'Ship Address', width: 180 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'ShipState', headerText: 'Ship State Code', width: 130 },
                { field: 'ShipPostalCode', headerText: 'Ship Postal Code', width: 130, textAlign: 'Right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 },
                { field: 'ProductName', headerText: 'Product Name', width: 250 },
                { field: 'ProductID', headerText: 'Product ID', width: 110, visible: false },
                { field: 'Category', headerText: 'Category', width: 120 },
                { field: 'Warehouse', headerText: 'Ware house', width: 110, editType: 'dropdownedit', visible: false },
                { field: 'InventoryCount', headerText: 'Inventory Count', width: 150, textAlign: 'Right', visible: false },
                {
                    field: 'Quantity', headerText: 'Quantity', width: 100, textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'UnitPrice', headerText: 'Unit Price', width: 110, format: 'C2', textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'Discount', headerText: 'Discount (%)', width: 120, textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'Tax', headerText: 'Tax (%)', width: 100, textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'SubTotal', headerText: 'Sub Total', width: 110, format: 'C2', textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'TaxAmount', headerText: 'Tax Amount', width: 110, format: 'C2', textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'ShipFee', headerText: 'Ship Fee', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'TotalAmount', headerText: 'Total Amount', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit',
                    edit: { params: { showSpinButton: false } }
                },
                { field: 'PaymentMethod', headerText: 'Payment Method', width: 140, editType: 'dropdownedit', template: '#paymentTemplate', validationRules: { required: true } },
                { field: 'PaymentStatus', headerText: 'Payment Status', width: 140, textAlign: 'Center', editType: 'dropdownedit', template: '#paymentStatusTemplate', validationRules: { required: true } },
                {
                    field: 'Rating', headerText: 'Delivery Rating', width: 160, textAlign: 'Center', visible: false,
                    template: '#ratingTemplate', editType: 'dropdownedit'
                }
            ],
            dataBound: hide,
            load: function (args: any) {
                if (grid.enableVirtualization) {
                    args.enableSeamlessScrolling = true;
                }
            }
        });
    grid.appendTo('#Grid');

    function show(): void {
        document.getElementById('popup').style.display = 'inline-block';
    }
    function hide(): void {
        if (flag && date1) {
            let date2: number = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
            grid.editSettings.allowAdding = true;
            flag = false; genarateData.disabled = true;
        }
        document.getElementById('popup').style.display = 'none';
    }
    (<{ratingDetail?: Function}>window).ratingDetail = (e: any): any => {
        const temp: HTMLTemplateElement = document.getElementsByTagName("template")[0];
        const cloneTemplate: any = temp.content.cloneNode(true);
        const ratingElement: HTMLElement = cloneTemplate.querySelector(".rating");
        const rating = new Rating({
            value: e.Rating,
            readOnly: true,
            cssClass: 'custom-rating'
        });
        rating.appendTo(ratingElement);
        return (ratingElement as any).ej2_instances[0].wrapper.outerHTML;
    };
    (<{priorityDetail?: Function}>window).priorityDetail = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        if (e.Priority === 'High') {
            span.className = 'virtual-statustxt e-highcolor';
            span.textContent = 'High';
            div.className = 'virtual-statustemp e-highcolor';
        } else if (e.Priority === 'Low') {
            span.className = 'virtual-statustxt e-lowcolor';
            span.textContent = 'Low';
            div.className = 'virtual-statustemp e-lowcolor';
        } else if (e.Priority === 'Medium') {
            span.className = 'virtual-statustxt e-mediumcolor';
            span.textContent = 'Medium';
            div.className = 'virtual-statustemp e-mediumcolor';
        } else {
            span.className = 'virtual-statustxt e-criticalcolor';
            span.textContent = 'Critical';
            div.className = 'virtual-statustemp e-criticalcolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };
    (<{paymentStatusDetail?: Function}>window).paymentStatusDetail = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        const val = (e.PaymentStatus || '').toString();
        if (val === 'Paid' || val === 'Authorized') {
            span.className = 'virtual-statustxt e-paidcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-paidcolor';
        } else if (val === 'Pending') {
            span.className = 'virtual-statustxt e-pendingcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-pendingcolor';
        } else if (val === 'Refunded') {
            span.className = 'virtual-statustxt e-refundcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-refundcolor';
        } else {
            span.className = 'virtual-statustxt e-failedcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-failedcolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };
    (<{orderStatusDetail?: Function}>window).orderStatusDetail = (e: any): any => {
        const div: Element = document.createElement('div');
        const span: Element = document.createElement('span');
        const val: string = (e.OrderStatus || '').toString();
        if (val === 'Delivered') {
            span.className = 'virtual-statustxt e-deliveredcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-deliveredcolor';
        } else if (val === 'Shipped') {
            span.className = 'virtual-statustxt e-shippedcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-shippedcolor';
        } else if (val === 'Packed') {
            span.className = 'virtual-statustxt e-packedcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-packedcolor';
        } else if (val === 'Processing') {
            span.className = 'virtual-statustxt e-processingcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-processingcolor';
        } else if (val === 'Canceled') {
            span.className = 'virtual-statustxt e-cancelcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-cancelcolor';
        } else if (val === 'Returned') {
            span.className = 'virtual-statustxt e-returnedcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-returnedcolor';
        } else {
            span.className = 'virtual-statustxt e-orderedcolor';
            span.textContent = val;
            div.className = 'virtual-statustemp e-orderedcolor';
        }
        div.appendChild(span);
        return div.outerHTML;
    };
    (<{paymentTemplate?: Function}>window).paymentTemplate = (e: any): any => {
        const divElement: Element = document.createElement('div');
        divElement.className = 'e-payment-info';
        const imgElement: any = document.createElement('img');
        imgElement.src = 'src/grid/images/payment/' + e.PaymentMethod + '.svg';
        imgElement.alt = e.PaymentMethod;
        const nameElement: HTMLElement = document.createElement('span');
        nameElement.innerText = e.PaymentMethod;
        divElement.appendChild(imgElement);
        divElement.appendChild(nameElement);
        return divElement.outerHTML;
    };
};
