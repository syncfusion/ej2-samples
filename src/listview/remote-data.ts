/**
 * ListView Remote Sample
 */
import {ListView} from '@syncfusion/ej2-lists';

//Import DataManager related classes
import {DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

this.default = () => {

    //Initialize ListView component
    let remoteListObj: ListView = new ListView({

        //Initialize dataSource with the DataManager instance.
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc',
            adaptor: new ODataV4Adaptor
        }),

        //Initialize query with the Query instance to get specified set of data
        query: new Query().from('Products').select('ProductID,ProductName').take(10),

        //Map the appropriate columns to fields property
        fields: { id: 'ProductID', text: 'ProductName' },

        //Set header title
        headerTitle: 'Products',

        //Set true to show header title
        showHeader: true

    });

    //Render initialized ListView component
    remoteListObj.appendTo('#listview');
};