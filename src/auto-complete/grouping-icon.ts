import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Grouping & Icon Samples
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize AutoComplete component
    let groupObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: (data as any).vegetableData,
        // map the appropriate columns to fields property
        fields: { groupBy: 'Category', value: 'Vegetable' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Cabbage',
        // enabled the popup button to AutoComplete
        showPopupButton: true
    });
    groupObj.appendTo('#vegetables');

    // initialize AutoComplete component
    let iconObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: (data as any ).socialMedia,
        // map the appropriate columns to fields property
        fields: { iconCss: 'Class', value: 'SocialMedia' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Facebook',
        // enabled the popup button to AutoComplete
        showPopupButton: true
    });
    iconObj.appendTo('#icons');
};