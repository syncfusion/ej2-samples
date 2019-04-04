import { loadCultureFiles } from '../common/culture-loader';

import { PivotView } from '@syncfusion/ej2-pivotview';
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
		url: 'https://bi.syncfusion.com/northwindservice/api/orders',
		adaptor: new WebApiAdaptor,
		crossDomain: true
	});
	let pivotGridObj: PivotView = new PivotView({
		dataSource: {
			data: remoteData,
			expandAll: true,
			filters: [],
			columns: [{ name: 'ProductName', caption: 'Product Name' }],
			rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
			formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
			values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
		},
		height: 300,
		width: '100%',
		gridSettings: { columnWidth: 120 }
	});
	pivotGridObj.appendTo('#PivotView1');
};
