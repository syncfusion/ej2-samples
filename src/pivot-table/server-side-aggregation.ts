import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, GroupingBar, FieldList, VirtualScroll } from '@syncfusion/ej2-pivotview';
import { enableRipple, Browser } from '@syncfusion/ej2-base';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView Default Sample.
 */
PivotView.Inject(FieldList, VirtualScroll, GroupingBar);

(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            url: 'https://services.syncfusion.com/js/production/api/pivot/post',
            mode: 'Server',
            expandAll: false,
            enableSorting: true,
            columns: [ { name: 'Year', caption: 'Production Year' },
            ],
            values: [
                { name: 'Sold', caption: 'Units Sold' },
                { name: 'Price', caption: 'Sold Amount' }
            ],
            rows: [{ name: 'ProductID', caption: 'Product ID' }],
            formatSettings: [{ name: 'Price', format: 'C0' }, { name: 'Sold', format: 'N0' }],
            filters: []
        },
        width: '100%',
        height: 450,
        showFieldList: true,
        showGroupingBar: true,
        enableVirtualization: true,
        allowDataCompression: true,
        dataBound: function () {
            if (Browser.isDevice && pivotObj && pivotObj.enableRtl) {
                document.querySelector('.control-section').classList.add('e-rtl');
            }
        },
    });
    pivotObj.appendTo('#PivotView');
};
