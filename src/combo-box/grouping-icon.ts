import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Grouping & Icon Samples
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let groupComboBoxObj: ComboBox = new ComboBox({
        //set the vegetable data to dataSource property
        dataSource: (data as any).vegetableData,
        // map the appropriate columns to fields property
        fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a vegetable',
        // set the height of the popup element
        popupHeight: '200px'
    });
    groupComboBoxObj.appendTo('#vegetables');

    // initialize ComboBox component
    let iconComboBoxObj: ComboBox = new ComboBox({
        //set the social media data to dataSource property
        dataSource: (data as any).socialMedia,
        // map the appropriate columns to fields property
        fields: { text: 'SocialMedia', iconCss: 'Class', value: 'Id' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a social media',
        // set the height of the popup element
        popupHeight: '200px'
    });
    iconComboBoxObj.appendTo('#icons');
};