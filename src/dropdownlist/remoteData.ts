/**
 * dropDownList Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns/src';
import { Query, DataManager } from '@syncfusion/ej2-data';


this.default = () => {

    let listObj: DropDownList = new DropDownList({
        dataSource: new DataManager({ url: 'http://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/' }),
        query: new Query().from('Customers').select('ContactName').take(7),
        fields: { text: 'ContactName' },
        placeholder: 'Select a name',
        popupWidth: '300px',
        popupHeight: '250px',
        width: '300px',
    });
    listObj.appendTo('#list');

};