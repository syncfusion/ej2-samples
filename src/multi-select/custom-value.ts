import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Custom Value Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize MultiSelect component
    let games: MultiSelect = new MultiSelect({
        // set the countries data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the placeholder to MultiSelect input element
        placeholder: 'Select countries',
        // set true to enable the custom value support.
        allowCustomValue: true,
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Box'
    });
    games.appendTo('#default');
};