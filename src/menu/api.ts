import { MenuModel, Menu, Orientation } from '@syncfusion/ej2-navigations';
import { DropDownList, ChangeEventArgs as ddlChange } from '@syncfusion/ej2-dropdowns';
import { MultiSelect, MultiSelectChangeEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as cChange } from '@syncfusion/ej2-buttons';

MultiSelect.Inject(CheckBoxSelection);

/**
 * Menu API sample
 */
(window as any).default = () => {
    //Menu datasource
    let data: { [key: string]: Object }[] = [
        {
            header: 'Events',
            subItems: [
                { text: 'Conferences' },
                { text: 'Music' },
                { text: 'Workshops' }
            ]
        },
        {
            header: 'Movies',
            subItems: [
                { text: 'Now Showing' },
                { text: 'Coming Soon' }
            ]
        },
        {
            header: 'Directory',
            subItems: [
                { text: 'Media Gallery' },
                { text: 'Newsletters' }
            ]
        },
        {
            header: 'Queries',
            subItems: [
                { text: 'Our Policy' },
                { text: 'Site Map'},
                { text: '24x7 Support'}
            ]
        },
        { header: 'Services' }
    ];

    //Menu fields definition
    let menuFields: Object = {
        iconCss: 'icon',
        text: ['header', 'text', 'value'],
        children: ['subItems', 'options']
    };

    //Menu model definition
    let menuOptions: MenuModel = {
        items: data,
        fields: menuFields
    };

    //Menu initialization
    let menuObj: Menu = new Menu(menuOptions, '#menu');

    //DropDownList initialization
    let ddlObj: DropDownList = new DropDownList(
    {
        value: 'Horizontal',
        popupHeight: '200px',
        change: (args: ddlChange) => {
            menuObj.orientation = args.value as Orientation;
        }
    },
    '#ddl');

    let headerData: { [key: string]: Object }[] = [
        { text: 'Events' }, { text: 'Movies'}, { text: 'Directory' }, { text: 'Queries' }, { text: 'Services' }
    ];

    //MultiSelect initialization
    let enableDisableObj: MultiSelect = new MultiSelect(
    {
        dataSource: headerData,
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

    //CheckBox initialization
    let showBtn: CheckBox = new CheckBox(
    {
        checked: false,
        change: (args: cChange) => {
            menuObj.showItemOnClick = args.checked;
        }
    },
    '#show-btn');
};
