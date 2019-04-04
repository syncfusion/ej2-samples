import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Grouping & Icons Samples
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize the MultiSelect component
    let groupList: MultiSelect = new MultiSelect({
        // set the vegetables data to dataSource property
        dataSource: (data as any).vegetableData,
        // map the appropriate columns to fields property
        fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id' },
        // set placeholder to MultiSelect input element
        placeholder: 'Select vegetables',
    });
    groupList.appendTo('#group');
};