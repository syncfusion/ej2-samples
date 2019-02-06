import { loadCultureFiles } from '../common/culture-loader';
import { Menu, Orientation, FieldSettingsModel } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs as ddlChange } from '@syncfusion/ej2-dropdowns';
import { MultiSelect, MultiSelectChangeEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as cChange } from '@syncfusion/ej2-buttons';
import * as dataSource from './menu-data.json';

MultiSelect.Inject(CheckBoxSelection);

/**
 * Menu API sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Menu fields definition
    let menuFields: FieldSettingsModel = {
        text: ['header', 'text', 'value'],
        children: ['subItems', 'options']
    };

    // Menu initialization
    let menuObj: Menu = new Menu(
        {
            items: (dataSource as any).apiData,
            fields: menuFields
        },
        '#menu');

    // DropDownList initialization
    new DropDownList(
        {
            value: 'Horizontal',
            popupHeight: '200px',
            change: (args: ddlChange) => {
                menuObj.orientation = args.value as Orientation;
            }
        },
        '#ddl');

    // MultiSelect initialization
    new MultiSelect(
        {
            dataSource: (dataSource as any).headerData,
            popupHeight: '250px',
            width: '160px',
            mode: 'CheckBox',
            placeholder: 'Select item',
            showDropDownIcon: true,
            change: (args: MultiSelectChangeEventArgs) => {
                if (args.value) {
                    menuObj.enableItems(['Events', 'Movies', 'Directory', 'Queries', 'Services'], true);
                    menuObj.enableItems(args.value as string[], false);
                }
            }
        },
        '#enableDisable');

    // CheckBox initialization
    new CheckBox(
        {
            checked: false,
            change: (args: cChange) => {
                menuObj.showItemOnClick = args.checked;
            }
        },
        '#show-btn');
};
