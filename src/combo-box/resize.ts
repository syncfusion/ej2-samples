import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Filtering Samples
 */
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboBoxObj: ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).countries,
        // set true for enable the resize property to ComboBox 
        allowResize: true,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a country',
        // set the height of the popup element
        popupHeight: '270px',
    });
    comboBoxObj.appendTo('#country');
};