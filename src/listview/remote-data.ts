/**
 * ListView Remote Sample
 */
import {ListView} from '@syncfusion/ej2-lists';
import {DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

this.default = () => {
    let remoteListObj: ListView = new ListView({

        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc',
            adaptor: new ODataV4Adaptor
        }),

        query: new Query().from('Products').select('ProductID,ProductName').take(30),

        fields: { id: 'ProductID', text: 'ProductName' },

        headerTitle: 'Products',

        height: '400px'

    });

    remoteListObj.appendTo('#listview');
};