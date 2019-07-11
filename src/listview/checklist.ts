import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListView Checklist Sample
 */
import {ListView} from '@syncfusion/ej2-lists';
import {flatData, groupData} from './datasource';
(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize ListView component
    let listObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: flatData,

        //Enables checkbox
        showCheckBox: true

    });

   //Render initialized ListView component
    listObj.appendTo('#listview-def');

    //Initialize ListView component
    let grpListObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: groupData,

        //Map the appropriate columns to fields property
        fields: { groupBy: 'category' },

        //Enables checkbox
        showCheckBox: true
    });

    //Render initialized ListView component
    grpListObj.appendTo('#listview-grp');
};