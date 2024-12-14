import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { PageEventArgs } from '@syncfusion/ej2-grids';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { DropDownList, ChangeEventArgs as ChangeArgs } from '@syncfusion/ej2-dropdowns';
import { sampleData } from './data-source';

TreeGrid.Inject(Page);

/**
 * PagingApi sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let type: { [key: string]: Object }[] = [
        { id: 'All', type: 'All' }, { id: 'Root', type: 'Root' }
    ];
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            pageSettings: { pageCount: 2 },
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 100, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
    let pageSize: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 200,
        format: '##',
        value: 12,
        change: (e: ChangeEventArgs) => {
            pageSize.value = pageSize.value > treegrid.pageSettings.totalRecordsCount ?
                 treegrid.pageSettings.totalRecordsCount : pageSize.value;
            treegrid.pageSettings.pageSize = pageSize.value;
            currentPage.max = Math.ceil(treegrid.pageSettings.totalRecordsCount / treegrid.pageSettings.pageSize);
        }
    });
    pageSize.appendTo('#pagesize');

    let sizemode: DropDownList = new DropDownList({
        dataSource: type,
        fields: { text: 'type', value: 'id' },
        value: 'All',
        change: (e: ChangeArgs) => {
            let type: string = <string>e.value;
            if (type === 'Root') {
                treegrid.pageSettings = { pageSizeMode: 'Root', pageSize: 2 };
            } else {
                treegrid.pageSettings = { pageSizeMode: 'All', pageSize: pageSize.value };
            }
            toggleInputs(type === 'All');
        }
    });
    sizemode.appendTo('#sizemode');

    let pageCount: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 4,
        format: '##',
        value: 2,
        change: (e: ChangeEventArgs) => {
            pageCount.value = pageCount.value > 8 ? 8 : pageCount.value;
            treegrid.pageSettings.pageCount = pageCount.value;

        }
    });
    pageCount.appendTo('#pagecount');

    let currentPage: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 17,
        format: '##',
        value: 1,
        change: (e: ChangeEventArgs) => {
            currentPage.value = currentPage.value > currentPage.max ? currentPage.max : currentPage.value;
            let pageNumber: number = currentPage.value;
            treegrid.goToPage(pageNumber);
        }
    });
    currentPage.appendTo('#currentpage');

    let enablePaging: CheckBox = new CheckBox({ checked: true });
    enablePaging.appendTo('#allowCheck');

    document.getElementById('allowCheck').onclick = () => {
        treegrid.allowPaging = enablePaging.checked;
        toggleInputs(treegrid.allowPaging, true);
    };
    function paging(args: PageEventArgs): void {
        if (args.requestType === 'paging') {
            currentPage.value = parseInt(args.currentPage, 10);
        }
    }
    function toggleInputs(state: boolean, isPager?: boolean): void {
        if (!isNullOrUndefined(isPager)) {
            (<HTMLElement>document.getElementsByClassName('con-prop1')[0]).style.display = state ? 'table-row' : 'none';
        }
        let flag: Boolean = sizemode.value === 'All';
        let elem: HTMLCollectionOf<Element> = document.getElementsByClassName('con-prop2');
        for (let i: number = 0; i < elem.length; i++) {
            (<HTMLElement>elem[i]).style.display = state && flag ? 'table-row' : 'none';
        }
    }
};