import { Grid, Page, Selection, PageEventArgs } from '@syncfusion/ej2-grids';
import { productData } from './datasource';

Grid.Inject(Page, Selection);

/**
 * PagingApi sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: productData,
            allowPaging: true,
            pageSettings: { pageCount: 2 },
            columns: [
                { field: 'ProductID', headerText: 'Product ID', width: 130, textAlign: 'right' },
                { field: 'ProductName', headerText: 'Product Name', width: 190 },
                { field: 'UnitPrice', headerText: 'Unit Price', width: 135, textAlign: 'right', format: 'C2', },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 160, textAlign: 'right' }
            ],
            actionComplete: paging
        });
    grid.appendTo('#Grid');
    let pageSize: HTMLInputElement = document.getElementById('pagesize') as HTMLInputElement;
    let pageCount: HTMLInputElement = document.getElementById('counttxt') as HTMLInputElement;
    let currentPage: HTMLInputElement = document.getElementById('pageno') as HTMLInputElement;
    let enablePaging: HTMLInputElement = document.getElementById('allowCheck') as HTMLInputElement;
    enablePaging.onclick = () => {
        grid.allowPaging = enablePaging.checked;
        if (!grid.allowPaging) {
            pageCount.disabled = true;
            pageSize.disabled = true;
            currentPage.disabled = true;
        } else {
            pageCount.disabled = false;
            pageSize.disabled = false;
            currentPage.disabled = false;
        }
    };
    pageSize.onchange = () => {
        pageSize.value = parseInt(pageSize.value, 10) > grid.pageSettings.totalRecordsCount ?
            grid.pageSettings.totalRecordsCount.toString() : pageSize.value;
        grid.pageSettings.pageSize = parseInt(pageSize.value, 10);
        currentPage.max = Math.ceil(grid.pageSettings.totalRecordsCount / grid.pageSettings.pageSize).toString();
    };
    pageCount.onchange = () => {
        pageCount.value = parseInt(pageCount.value, 10) > 8 ? '8' : pageCount.value;
        grid.pageSettings.pageCount = parseInt(pageCount.value, 10);
    };
    currentPage.onchange = () => {
        currentPage.value = parseInt(currentPage.value, 10) > parseInt(currentPage.max, 10) ? currentPage.max : currentPage.value;
        let pageNumber: number = parseInt(currentPage.value, 10);
        grid.goToPage(pageNumber);
    };
    function paging(args: PageEventArgs): void {
        if (args.requestType === 'paging') {
            currentPage.value = args.currentPage;
        }
    }
};