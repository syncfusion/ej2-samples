import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListView Remote Sample
 */
import {ListView} from '@syncfusion/ej2-lists';

//Import DataManager related classes
import {DataManager, Query } from '@syncfusion/ej2-data';

(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize ListView component
    let remoteListObj: ListView = new ListView({

        //Initialize dataSource with the DataManager instance.
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/',
            crossDomain: true
        }),

        //Initialize query with the Query instance to get specified set of data
        query: new Query().from('ListView').select('EmployeeID,FirstName').take(10),

        //Map the appropriate columns to fields property
        fields: { id: 'EmployeeID', text: 'FirstName' },

        //Set header title
        headerTitle: 'Employees',

        //Set true to show header title
        showHeader: true

    });

    //Render initialized ListView component
    remoteListObj.appendTo('#listview');
};