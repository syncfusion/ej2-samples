import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownList Grouping & Icons Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';

import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // initialize DropDownList component
    let groupList: DropDownList = new DropDownList({
        // set the vagetables data to dataSource property
        dataSource: (data as any).vegetableData,
        // map the appropriate columns to fields property
        fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id' },
        // set the placeholder to DropDownList input element
        placeholder: 'Select a vegetable',
        // set the height of the popup element
        popupHeight: '200px'
    });
    groupList.appendTo('#vegetables');

    // initialize DropDownList component
    let iconList: DropDownList = new DropDownList({
        // set the social media data to dataSource property
        dataSource: (data as any).socialMedia,
        // map the appropriate columns to fields property
        fields: { text: 'SocialMedia', iconCss: 'Class', value: 'Id' },
        // set the placeholder to DropDownList input element
        placeholder: 'Select a social media',
        // set the height of the popup element
        popupHeight: '200px'
    });
    iconList.appendTo('#icons');
};