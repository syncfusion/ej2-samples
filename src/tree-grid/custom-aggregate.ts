import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Aggregate } from '@syncfusion/ej2-treegrid';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { summaryData } from './data-source';
import { getObject, CustomSummaryType } from '@syncfusion/ej2-grids';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

TreeGrid.Inject(Page, Aggregate);
/**
 * Aggregates
 */

let value: string = 'Frozen seafood'; let listObj: DropDownList;

let foods:  { [key: string]: Object }[] = [
    { food : 'Frozen seafood'},
    { food : 'Dairy'},
    { food : 'Edible'},
    { food : 'Solid crystals'},
];

(window as any).default = (): void => {
    loadCultureFiles();
    let customAggregateFn: CustomSummaryType = (data: Object): number => {
        let sampleData: Object[] = getObject('result', data);
        let countLength: number; countLength = 0;
        sampleData.filter((item: Object) => {
            let data: string = getObject('category', item);
            if (data === value) {
                countLength++;
            }
        });
        return countLength;
    };

    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: summaryData,
            childMapping: 'subtasks',
            width: 'auto',
            height: 400,
            treeColumnIndex: 1,
            dataBound: () => {
                if (!isNullOrUndefined(listObj) && listObj.element.classList.contains('e-' + listObj.getModuleName()))
                {
                    listObj.destroy();
                }
                  listObj = new DropDownList({
                        dataSource: foods,
                        fields: { value: 'food' },
                        placeholder: 'Select a Category',
                        width: '160px',
                        value: value,
                        change: () => {
                            setTimeout(
                                () => {
                                    value = listObj.value.toString();
                                    grid.refresh();
                                },
                                300
                            );
                        }
                    });
                  listObj.appendTo('#customers');
            },
            columns: [
                { field: 'ID', headerText: 'S.No', width: 90, textAlign: 'Right' },
                { field: 'Name', headerText: 'Shipment Name', width: 220 },
                { field: 'category', headerText: 'Category', width: 250 },
                { field: 'units', headerText: 'Total Units', width: 130, type: 'number', textAlign: 'Right' },
                { field: 'unitPrice', headerText: 'Unit Price($)', width: 110, type: 'number', format: 'C2', textAlign: 'Right' },
                { field: 'price', headerText: 'Price($)', width: 110, textAlign: 'Right', type: 'number', format: 'C' },
            ],
            aggregates: [{
                showChildSummary: false,
                columns: [{
                    type: 'Custom',
                    customAggregate: customAggregateFn,
                    columnName: 'category',
                    format: 'C2',
                    footerTemplate: 'Count of <input type="text" id="customers" /> : ${Custom}'
                }]
            }]
        });
    grid.appendTo('#Grid');
};

