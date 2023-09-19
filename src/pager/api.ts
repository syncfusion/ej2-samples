import { Pager } from '@syncfusion/ej2-grids';

/**
 * Pager API sample
 */
(this as any).default = (): void => {
    let pager: Pager = new Pager({
        pageSize: 1,
        pageCount: 5,
        totalRecordsCount: 20,
        click: onclick
    });
    pager.appendTo('#Pager');
    let pageSize: HTMLInputElement = document.getElementById('pagesize') as HTMLInputElement;
    let pageCnt: HTMLInputElement = document.getElementById('counttxt') as HTMLInputElement;
    let currentPage: HTMLInputElement = document.getElementById('pageno') as HTMLInputElement;
    let totalrecords: HTMLInputElement = document.getElementById('totalrecords') as HTMLInputElement;

    function onclick(args: any): void {
        currentPage.value = args.currentPage;
    }

    pageSize.onchange = () => {
        pager.pageSize = parseInt(pageSize.value, 10);
        calc(pager.totalRecordsCount, pager.pageSize, currentPage);
        pager.currentPage = parseInt(currentPage.value, 10);
        calc(pager.totalRecordsCount, pager.pageSize, pageCnt);
        pager.pageCount = parseInt(pageCnt.value, 10);
    };
    pageCnt.onchange = (args: any): void => {
        if (args.target.value < 10) {
            pager.pageCount = parseInt(pageCnt.value, 10);
        } else {
            pager.pageCount = 10;
            pageCnt.max = '10';
        }
    };
    currentPage.onchange = () => {
        pager.currentPage = parseInt(currentPage.value, 10);
        calc(pager.totalRecordsCount, pager.pageSize, currentPage);
        pager.currentPage = parseInt(currentPage.value, 10);
    };
    totalrecords.onchange = () => {
        pager.totalRecordsCount = parseInt(totalrecords.value, 10);
        calc(pager.totalRecordsCount, pager.pageSize, currentPage);
        pager.currentPage = parseInt(currentPage.value, 10);
        calc(pager.totalRecordsCount, pager.pageSize, pageCnt);
        pager.pageCount = parseInt(pageCnt.value, 10);
    };
    function calc(tot: number, size: number, ele: HTMLInputElement): void {
        let totalPages: number = Math.ceil(tot % size) === 0 ? Math.ceil(tot / size) : Math.ceil(tot / size) + 1;
        ele.max = totalPages.toString();
        ele.value = parseInt(ele.value, 10) > parseInt(ele.max, 10) ? ele.max : ele.value;
    }
};
