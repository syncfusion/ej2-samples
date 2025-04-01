import { loadCultureFiles } from '../common/culture-loader';

/**
 * Mention multiple-list sample
 */
import { Mention } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import * as data from './datasource.json';
import { WebApiAdaptor } from '@syncfusion/ej2/data';

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize Mention component.
    let mentionOdataObj: Mention = new Mention({
        mentionChar: '@',
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/Employees',
            adaptor: new WebApiAdaptor ,
            crossDomain: true
        }),
        query: new Query().select(['FirstName', 'EmployeeID']).requiresCount(),
        suggestionCount: 15,
        popupWidth: '250px',
        popupHeight: '250px',
        fields: { text: 'FirstName', value: 'EmployeeID' },
        allowSpaces: true
    });
    mentionOdataObj.appendTo('#multipleList');

    let mentionProjectObj: Mention = new Mention({
        mentionChar: '#',
        dataSource: (data as any).projects,
        fields: { text: 'Value' },
        displayTemplate: '<span class="e-success">${Value}</span>',
        requireLeadingSpace : false ,
    });
    mentionProjectObj.appendTo('#multipleList');

    let mentionUserObj: Mention = new Mention({
        mentionChar: '$',
        dataSource: (data as any).useCosts,
        fields: { text: 'Value' },
        displayTemplate: '<span class="e-error">${Value}</span>',
    });
    mentionUserObj.appendTo('#multipleList');

    let mentionStatusObj: Mention = new Mention({
        mentionChar: '%',
        dataSource: (data as any).status,
        fields: { text: 'Value' },
        displayTemplate: '<span class="e-warning">${Value}</span>',
    });
    mentionStatusObj.appendTo('#multipleList');
};
