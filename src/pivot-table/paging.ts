import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, Pager, PagerPosition } from '@syncfusion/ej2-pivotview';
import { enableRipple, Browser } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ChangeArgs, CheckBox, RadioButton, ChangeEventArgs as CheckChange } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView Paging Sample.
 */
PivotView.Inject(Pager);

(window as any).default = (): void => {
    loadCultureFiles();

    let pagerPositions: string[] = ['Top', 'Bottom'];
    let pageSizes: string[] = ['Row', 'Column', 'Both', 'None'];
    let pagerViewData: string[] = ['Row', 'Column', 'Both'];

    let remoteData: DataManager = new DataManager({
		url: 'https://ej2services.syncfusion.com/js/development/api/order',
		adaptor: new WebApiAdaptor,
		crossDomain: true
	});
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            type: 'JSON',
            dataSource: remoteData,
            expandAll: true,
            columns: [{ name: 'ProductName', caption: 'Product Name' }],
            rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
            formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
            values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
            filters: []
        },
        width: '100%',
        height: 600,
        enablePaging: true,
        pageSettings: {
            rowPageSize: 10,
            columnPageSize: 5,
            currentColumnPage: 1,
            currentRowPage: 1
        },
        pagerSettings: {
            position: 'Bottom',
            enableCompactView: false,
            showColumnPager: true,
            showRowPager: true
        },
        gridSettings: { columnWidth: 120 },
    });
    pivotObj.appendTo('#PivotView');

    let positionDropDown: DropDownList = new DropDownList({
        dataSource: pagerPositions,
        index: 1,
        change: onDropDownChange
    });
    positionDropDown.appendTo('#Pager_Position');

    let pagerViewDropDown: DropDownList = new DropDownList({
        dataSource: pagerViewData,
        index: 2,
        change: onDropDownChange
    });
    pagerViewDropDown.appendTo('#Pager_View');

    let pageSizeDropDown: DropDownList = new DropDownList({
        dataSource: pageSizes,
        index: 2,
        change: onDropDownChange
    });
    pageSizeDropDown.appendTo('#Page_Size');


    let checkBoxObj: CheckBox = new CheckBox({
        checked: false,
        change: onCheckBoxChange
    });
    checkBoxObj.appendTo('#Compact_View');

    checkBoxObj = new CheckBox({
        checked: false,
        change: onCheckBoxChange
    });
    checkBoxObj.appendTo('#Inverse');

    function onDropDownChange(args: ChangeEventArgs): void {
        if (args.element.id === 'Pager_Position') {
            pivotObj.pagerSettings.position = args.value as PagerPosition;
        } else if (args.element.id === 'Pager_View') {
            if (args.value === 'Row') {
                pivotObj.pagerSettings.showRowPager = true;
                pivotObj.pagerSettings.showColumnPager = false;
            } else if ( args.value === 'Column' ) {
                pivotObj.pagerSettings.showRowPager = false;
                pivotObj.pagerSettings.showColumnPager = true;
            } else {
                pivotObj.pagerSettings.showRowPager = pivotObj.pagerSettings.showColumnPager = true;
            }
        } else {
            if (args.value === 'Row') {
                pivotObj.pagerSettings.showRowPageSize = true;
                pivotObj.pagerSettings.showColumnPageSize = false;
            } else if (args.value === 'Column') {
                pivotObj.pagerSettings.showRowPageSize = false;
                pivotObj.pagerSettings.showColumnPageSize = true;
            } else if (args.value === 'Both') {
                pivotObj.pagerSettings.showRowPageSize = pivotObj.pagerSettings.showColumnPageSize = true;
            } else {
                pivotObj.pagerSettings.showRowPageSize = pivotObj.pagerSettings.showColumnPageSize = false;
            }
        }
    };

    function onCheckBoxChange(args: CheckChange): void {
        if (this.element.id === 'Compact_View') {
            pivotObj.pagerSettings.enableCompactView = args.checked;
        } else {
            pivotObj.pagerSettings.isInversed = args.checked;
        }
    };
};
