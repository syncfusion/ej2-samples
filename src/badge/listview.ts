import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS listview integration
 */
import { ListView } from '@syncfusion/ej2-lists';
import { dataSource } from './datasource';
(window as any).default = (): void => {
    loadCultureFiles();
    let list: ListView = new ListView({
        // Bind listview datasource
        dataSource: dataSource,
        // Assign header title
        headerTitle: 'Inbox',
        // Enable header
        showHeader: true,
        // Assign template
        template: '<div class="listWrapper" style="width: inherit;height: inherit;"><span class="${icons} list_svg">&nbsp;</span>' +
            '<span class="list_text">${text} </span>' +
            '<span class="${badge}">${messages}</span></div>',

        // Map fields
        fields: { groupBy: 'type' },
        // Bind actioncomplete event
        actionComplete: () => {
            let list: HTMLElement = <HTMLElement>document.getElementById('lists').getElementsByClassName('e-list-group-item')[0];
            list.style.display = 'none';
        }
    });
    list.appendTo('#lists');
};