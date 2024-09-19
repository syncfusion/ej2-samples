import { loadCultureFiles } from '../common/culture-loader';

/**
 * Mention Disabled Item sample
 */
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize Mention component.
    let mentionObj: Mention = new Mention({
        dataSource: (data as any).emailData2,
        fields: { text: 'Name', disabled: 'State' },
        itemTemplate: '<div class="listItems"><img class="mentionEmpImage" src="src/mention/Employees/${Eimg}.png" alt="employee"/><span class="person">${Name}</span><span class="email">${EmailId}</span></div>',
        noRecordsTemplate: 'No item related to the search',
        displayTemplate: '${Name}',
        popupWidth: '250px',
        popupHeight: '200px'
    });
    mentionObj.appendTo('#disabledMention');
};