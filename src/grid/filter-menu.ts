import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Grid, Filter, Page, Selection, FilterType, Sort } from '@syncfusion/ej2-grids';
import { CheckBox } from '@syncfusion/ej2/buttons';
import { remove } from '@syncfusion/ej2/base';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2/data';

Grid.Inject(Filter, Page, Selection, Sort);

/**
 * Filtering sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let filtertype: { [key: string]: Object }[] = [
        { id: 'Menu', type: 'Menu' },
        { id: 'CheckBox', type: 'CheckBox' },
        { id: 'Excel', type: 'Excel' }
    ];
    const urlapi: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/js/release/api/UrlDataSource',
        adaptor: new UrlAdaptor()
    });
    let grid: Grid = new Grid(
        {
            dataSource: urlapi,
            query: new Query().addParams('dataCount', '10000'),
            allowPaging: true,
            allowFiltering: true,
            allowSorting: true,
            filterSettings: { type: 'Menu' },
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', isPrimaryKey: true, width: '120' },
                { field: 'Employees', headerText: 'Employee Name', width: '150' },
                { field: 'Designation', headerText: 'Designation', width: '130' },
                {
                    field: 'CurrentSalary', headerText: 'Current Salary', format: 'C2',
                    textAlign: 'Right', width: '120'
                },
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');

    let dropDownFilterType: DropDownList = new DropDownList({
        dataSource: filtertype,
        fields: { text: 'type', value: 'id' },
        value: 'Menu',
        change: (e: ChangeEventArgs) => {
            let dropSelectedValue: FilterType = <FilterType>e.value;
            grid.filterSettings.type = dropSelectedValue;
            grid.clearFiltering();
            let propertyTbody: HTMLElement = document.querySelector('#property tbody') as HTMLElement;
            if (dropSelectedValue === 'Excel' || dropSelectedValue === 'CheckBox') {
                if (propertyTbody.children.length < 2) {
                    let temp: HTMLTemplateElement = document.getElementsByTagName("template")[0];
                    var cloneTemplate: any = temp.content.cloneNode(true);
                    propertyTbody.appendChild(cloneTemplate.querySelector("tr.infinite-row"));
                    const enableInfiniteLoad: CheckBox = new CheckBox({
                        change: (e: any) => {
                            grid.filterSettings.enableInfiniteScrolling = e.checked;
                        }
                    });
                    enableInfiniteLoad.appendTo('#dataloadtype');
                } else {
                    const enableInfiniteLoad: CheckBox = document.getElementById('dataloadtype')['ej2_instances'][0] as CheckBox;
                    enableInfiniteLoad.checked = false;
                    grid.filterSettings.enableInfiniteScrolling = false;
                }
            } else {
                grid.filterSettings.enableInfiniteScrolling = false;
                remove(document.querySelector('#property tbody tr.infinite-row'));
            }
        }
    });
    dropDownFilterType.appendTo('#filterType');
};
