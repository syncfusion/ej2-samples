import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListView Nested Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import { nestedListData } from './datasource';
(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize ListView component
    let nestedListObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: nestedListData,

        //Map appropriate columns to fields property
        fields: { iconCss: 'icon', tooltip: 'text' },

        //Set true to show icons
        showIcon: true,

        //Set header title
        headerTitle: 'Folders',

        //Set true to show header title
        showHeader: true
    });

    //Render initialized ListView component
    nestedListObj.appendTo('#listview');
};