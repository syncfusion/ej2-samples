import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListView Group Template Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import{groupTemplateData} from './datasource';
(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize ListView component
    let listObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: groupTemplateData,

        cssClass: 'e-list-template',

        //Map the appropriate columns to fields property
        fields: { text: 'Name', groupBy: 'order' },

        //Set customized group-header template
        groupTemplate: '<div class="e-list-wrapper"><span class="e-list-item-content">${items[0].category}</span></div>',

        //Set customized list template
        template: '<div class="settings e-list-wrapper e-list-multi-line e-list-avatar">' +
        '<span class="icon ${class} e-avatar"></span>' +
        '<span class="e-list-item-header">${Name}</span>' +
        '<span class="e-list-content">${content}</span>' +
        '</div>',

        //Set header title
        headerTitle: 'Settings',

        //Set true to show header title
        showHeader: true

    });

    //Render initialized ListView component
    listObj.appendTo('#groupedList');

};