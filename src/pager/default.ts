import { Pager } from '@syncfusion/ej2-grids';

/**
 * Default Pager sample
 */
this.default = (): void => {
    let pager: Pager = new Pager({
        pageSize: 1,
        totalRecordsCount: 7,
        pageCount: 3
    });
    pager.appendTo('#Pager');
};
