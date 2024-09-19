import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Toolbar, Edit } from '@syncfusion/ej2-grids';
import { orderDataSource } from './data-source';
import { DataManager } from '@syncfusion/ej2/data';

Grid.Inject(Page, Selection, Toolbar, Edit );

/**
 * Empty Record Template sample
 */

(window as any).default = (): void => {

    (window as any).renderEmptyImg = function () {
        let img: HTMLImageElement = document.createElement('img');
        if (document.body.classList.value.indexOf('dark') > -1 || document.body.classList.value.indexOf('highcontrast') > -1) {
            img.src = "src/grid/images/emptyRecordTemplate_dark.svg";
        } else {
            img.src = "src/grid/images/emptyRecordTemplate_light.svg";
        }
        img.classList.add("e-emptyRecord");
        img.alt = "No record";
        return img.outerHTML;
    }
    
    loadCultureFiles();
    let dropDownDataSource = new DataManager(orderDataSource);
    let grid: Grid = new Grid(
        {
            dataSource: [],
            allowPaging: true,
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            emptyRecordTemplate: '#emptytemplate',
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true},
            columns: [
                { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right', validationRules: { required: true, number: true }, width: 140 },
                { field: 'CustomerID', headerText: 'Customer ID', validationRules: { required: true }, width: 140 },
                { field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit', width: 140, format: 'C2', validationRules: { required: true } },
                { field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit', width: 160, format: { type: 'dateTime', format: 'M/d/y hh:mm a' }, },
                { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150, edit: { params: { dataSource: dropDownDataSource , fields: {text:"ShipCountry",value:"ShipCountry"}}}}
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
};