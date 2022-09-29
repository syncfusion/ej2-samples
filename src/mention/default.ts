import { loadCultureFiles } from '../common/culture-loader';

/**
 * Mention default sample
 */
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';
import { InputObject, TextBox } from  '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize the Textbox component
    let emailTextBox: TextBox = new TextBox({
        placeholder: 'Type @ and tag the email'
    });
    emailTextBox.appendTo('#emailsMention');

    // Initialize Mention component.
    let emailObj: Mention = new Mention({
        dataSource: (data as any).emailData,
        fields: { text: 'EmailId' }
    });
    emailObj.appendTo('#emailsMention');

    // Initialize Mention component.
    let messgaeData: Mention = new Mention({
        dataSource: (data as any).emailData,
        fields: { text: 'Name' }
    });
    messgaeData.appendTo('#commentsMention');
};