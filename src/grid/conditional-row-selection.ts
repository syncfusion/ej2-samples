import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Toolbar, Edit, Sort, Filter, VirtualScroll } from '@syncfusion/ej2-grids';
import { ordersTrackData } from './data-source';

Grid.Inject(VirtualScroll, Toolbar, Edit, Sort, Filter);
/**
 * Conditional Row Selection API sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: ordersTrackData,
            enableVirtualization: true,
            allowSorting: true,
            allowFiltering: true,
            toolbar: ['Edit', 'Update', 'Cancel'],
            filterSettings: { type: 'Excel' },
            editSettings: { allowEditing: true, allowAdding: false, allowDeleting: false },
            selectionSettings: { persistSelection: true, checkboxOnly: true },
            columns: [
                { type: 'checkbox', width: 60, allowEditing: false },
                {
                    field: 'OrderID', width: 110, headerText: 'Order ID', isPrimaryKey: true,
                     allowEditing: false
                },
                {
                    field: 'CustomerName',
                    width: 170, headerText: 'Customer Name', allowEditing: false
                },
                {
                    field: 'Product', width: 150, allowEditing: false, template: '#producttemplate'
                },
                { field: 'Amount', width: 110, format: 'C2', allowEditing: false, textAlign: 'Right' },
                { field: 'OrderDate', headerText: 'Order Date', allowEditing: false, textAlign: 'Right', width: 130, format: 'yMd' },
                { field: 'Status', editType: 'dropdownedit', width: 150, template: '#statustemplate' }
            ],
            isRowSelectable: function (data: Object) {
                if ((<{ Status?: string }>data).Status === "Canceled" || (<{ Status?: string }>data).Status === "Delivered") {
                    return false;
                }
                return true;
            },
            height: 400,
        });
    grid.appendTo('#ConditionalSelection');
    (<{ productTemplate?: Function }>window).productTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'e-product-info';
        const imgElement = document.createElement('img');
        imgElement.src = 'src/grid/images/product/' + e.Product + '.png';
        imgElement.alt = e.Product;
        const nameElement = document.createElement('span');
        nameElement.innerText = e.Product;
        divElement.appendChild(imgElement);
        divElement.appendChild(nameElement);
        return divElement.outerHTML;
    };

    (<{ statusTemplate?: Function }>window).statusTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'e-status-info';
        const imgElement = document.createElement('img');
        imgElement.src = 'src/grid/images/status/' + e.Status + '.svg';
        imgElement.alt = e.Status;
        const nameElement = document.createElement('span');
        nameElement.innerText = e.Status;
        divElement.appendChild(imgElement);
        divElement.appendChild(nameElement);
        return divElement.outerHTML;
    };
};