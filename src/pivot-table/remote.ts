import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataOptions } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/**
 * PivotView sample for Remote data source.
 */
/* tslint:disable */
(window as any).default = (): void => {
	loadCultureFiles();
	let remoteData: DataManager = new DataManager({
		url: 'https://ej2services.syncfusion.com/js/development/api/order',
		adaptor: new WebApiAdaptor,
		crossDomain: true
	});

	let jsonReport: IDataOptions = {
		url: '',
		dataSource: remoteData,
		type: 'JSON',
		expandAll: true,
		filters: [],
		columns: [{ name: 'ProductName', caption: 'Product Name' }],
		rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
		formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
		values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
	};

	let csvReport: IDataOptions = {
		url: 'https://ej2services.syncfusion.com/js/development/api/product',
		dataSource: undefined,
		type: 'CSV',
		expandAll: false,
		enableSorting: true,
		formatSettings: [{ name: 'Total Cost', format: 'C0' }, { name: 'Total Revenue', format: 'C0' }, { name: 'Total Profit', format: 'C0' }],
		drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
		rows: [
			{ name: 'Region' },
			{ name: 'Country' }
		],
		columns: [
			{ name: 'Item Type' },
			{ name: 'Sales Channel' }
		],
		values: [
			{ name: 'Total Cost' },
			{ name: 'Total Revenue' },
			{ name: 'Total Profit' }
		],
		filters: []
	};

	let pivotObj: PivotView = new PivotView({
		dataSourceSettings: jsonReport,
		height: 300,
		width: '100%',
		gridSettings: { columnWidth: 120 }
	});
	pivotObj.appendTo('#PivotView1');

	let contentDropDown: DropDownList = new DropDownList({
		placeholder: 'Content Type',
		change: (args: ChangeEventArgs) => {
			if (args.value === 'JSON') {
				pivotObj.engineModule.fieldList = undefined;
				pivotObj.dataSourceSettings = jsonReport;
			} else if (args.value === 'CSV') {
				pivotObj.engineModule.fieldList = undefined;
				pivotObj.dataSourceSettings = csvReport;
			}
		}
	});
	contentDropDown.appendTo('#contenttype');
};
