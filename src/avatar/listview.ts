import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS Avatar listview
 */
import { ListView } from '@syncfusion/ej2-lists';
import { listData } from './datasource';
(window as any).default = (): void => {
    loadCultureFiles();

    let letterAvatarList: ListView = new ListView({
        // Bind listview datasource
        dataSource: listData,
        // Assign header title
        headerTitle: 'Contacts',
        // Enable header title
        showHeader: true,
        // Assign list-item template
        template: '<div class="listWrapper">' +
            '${if(avatar!=="")}' +
            '<span class="e-avatar e-avatar-small e-avatar-circle">${avatar}</span>' +
            '${else}' +
            '<span class="${pic} e-avatar e-avatar-small e-avatar-circle"> </span>' +
            '${/if}' +
            '<span class="list-text">' +
            '${text} </span> </div>',
        // Assign sorting order
        sortOrder: 'Ascending'
    });
    letterAvatarList.appendTo('#letterAvatarList');
};