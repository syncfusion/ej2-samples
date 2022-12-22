import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Selection, Sort } from '@syncfusion/ej2-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject(Page, Selection, Sort);

/**
 * Loading animation sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let loadingeffects: { [key: string]: Object }[] = [
        { id: 'Shimmer', type: 'Shimmer' },
        { id: 'Spinner', type: 'Spinner' }
    ];
    let data = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData',
        adaptor: new WebApiAdaptor(),
        crossDomain: true
    });
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: data,
            hasChildMapping: 'isParent',
            idMapping: 'TaskID',
            parentIdMapping: 'ParentItem',
            height: 400,
            treeColumnIndex: 1,
            allowPaging: true,
            allowSorting: true,
            loadingIndicator: { indicatorType: 'Shimmer' },
            columns: [
                { field: 'TaskID', headerText: 'Task ID', width: 120, textAlign: 'Right' },
                { field: 'TaskName', headerText: 'Task Name', width: 240, textAlign: 'Left' },
                { field: 'StartDate', headerText: 'Start Date', width: 140, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'Duration', headerText: 'Duration', width: 130, textAlign: 'Right' },
                { field: 'Progress', headerText: 'Progress', width: 130 },
            ],
            pageSettings: { pageCount: 3 }
        });
    treegrid.appendTo('#TreeGrid');

    let dropDownFilterType: DropDownList = new DropDownList({
        dataSource: loadingeffects,
        fields: { text: 'type', value: 'id' },
        width: '125px',
        value: 'Shimmer',
        change: (e: ChangeEventArgs) => {
            if (dropDownFilterType.value === 'Shimmer') {
                treegrid.loadingIndicator.indicatorType = 'Shimmer';
            } else {
                treegrid.loadingIndicator.indicatorType = 'Spinner';
            }
            treegrid.refresh();
        }
    });
    dropDownFilterType.appendTo('#animation');
};
