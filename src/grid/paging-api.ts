import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Grid, Page, Selection, Sort, PageEventArgs } from '@syncfusion/ej2-grids';
import { productData } from './data-source';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'en-US': {
        'pager': {
                'currentPageInfo': '',
                'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});

Grid.Inject(Page, Selection, Sort);

/**
 * PagingApi sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: productData,
            locale: 'en-US',
            allowPaging: true,
            pageSettings: { pageCount: 2 },
            allowSorting: true,
            columns: [
                { field: 'ProductID', headerText: 'Product ID', width: 130, textAlign: 'Right' },
                { field: 'ProductName', headerText: 'Product Name', width: 190 },
                { field: 'UnitPrice', headerText: 'Unit Price', width: 135, textAlign: 'Right', format: 'C2' },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 160, textAlign: 'Right' }
            ],
            actionComplete: paging
        });
    grid.appendTo('#Grid');
    let pageSize: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 200,
        format: '##',
        value: 12,
        change: (e: ChangeEventArgs) => {
            pageSize.value = pageSize.value > grid.pageSettings.totalRecordsCount ?
                grid.pageSettings.totalRecordsCount : pageSize.value;
            grid.pageSettings.pageSize = pageSize.value;
            currentPage.max = Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize);
        }
    });
    pageSize.appendTo('#pagesize');

    let pageCount: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 8,
        format: '##',
        value: 2,
        change: (e: ChangeEventArgs) => {
            pageCount.value = pageCount.value > 8 ? 8 : pageCount.value;
            grid.pageSettings.pageCount = pageCount.value;

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
            grid.goToPage(pageNumber);
        }
    });
    currentPage.appendTo('#currentpage');

    let enablePaging: CheckBox = new CheckBox({ checked: true });
    enablePaging.appendTo('#allowCheck');

    document.getElementById('allowCheck').onclick = () => {
        grid.allowPaging = enablePaging.checked;
        if (!grid.allowPaging) {
            pageCount.enabled = false;
            pageSize.enabled = false;
            currentPage.enabled = false;
        } else {
            pageCount.enabled = true;
            pageSize.enabled = true;
            currentPage.enabled = true;
        }
    };
    function paging(args: PageEventArgs): void {
        if (args.requestType === 'paging') {
            currentPage.value = parseInt(args.currentPage, 10);
        }
    }
};