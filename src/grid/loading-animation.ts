import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Sort, Filter } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

Grid.Inject(Page, Selection, Sort, Filter);

/**
 * Loading animation sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let loadingeffects: { [key: string]: Object }[] = [
        { id: 'Shimmer', type: 'Shimmer' },
        { id: 'Spinner', type: 'Spinner' }
    ];
    let data: Object = new DataManager({
        url: 'https://services.syncfusion.com/js/production/api/UrlDataSource',
        adaptor: new UrlAdaptor,
    });
    let grid: Grid = new Grid(
        {
            dataSource: data,
            allowPaging: true,
            allowFiltering: true,
            allowSorting: true,
            loadingIndicator: { indicatorType: 'Shimmer' },
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', width: 130,  textAlign: 'Right' },
                { field: 'Employees', headerText: 'Employee Name', width: 150 },
                { field: 'Designation', headerText: 'Designation', width: 130 },
                { field: 'CurrentSalary', headerText: 'Current Salary', format: "C2", textAlign: 'Right', width: 140 }
            ],
            pageSettings: { pageCount: 3 }
        });
    grid.appendTo('#Grid');

    let dropDownFilterType: DropDownList = new DropDownList({
        dataSource: loadingeffects,
        fields: { text: 'type', value: 'id' },
        value: 'Shimmer',
        change: (e: ChangeEventArgs) => {
            if (dropDownFilterType.value === 'Shimmer') {
                grid.loadingIndicator.indicatorType = 'Shimmer';
                grid.refresh();
            } else {
                grid.loadingIndicator.indicatorType = 'Spinner';
                grid.refresh();
            }
        }
    });
    dropDownFilterType.appendTo('#animation');
};
