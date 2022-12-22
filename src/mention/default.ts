import { loadCultureFiles } from '../common/culture-loader';

/**
 * Mention default sample
 */
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';
import { InputObject, TextBox } from  '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize Mention component.
    let messgaeData: Mention = new Mention({
        dataSource: (data as any).emailData,
        fields: { text: 'Name' }
    });
    messgaeData.appendTo('#commentsMention');
};