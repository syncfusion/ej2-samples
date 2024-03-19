import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Default functionality Sample
 */
import { MultiSelect, DropDownList , VirtualScroll, ChangeEventArgs as DropDownChangeArgs, visualMode, CheckBoxSelection  } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Query, DataManager, WebApiAdaptor  } from '@syncfusion/ej2-data';

MultiSelect.Inject(VirtualScroll);
MultiSelect.Inject(CheckBoxSelection);

let records: { [key: string]: Object }[] = [];

for (let i = 1; i <= 150; i++) {
    let item: { [key: string]: Object } = {};
    item.id = 'id' + i;
    item.text = `Item ${i}`;

    // Generate a random number between 1 and 4 to determine the group
    const randomGroup = Math.floor(Math.random() * 4) + 1;
    switch (randomGroup) {
        case 1:
            item.group = 'Group A';
            break;
        case 2:
            item.group = 'Group B';
            break;
        case 3:
            item.group = 'Group C';
            break;
        case 4:
            item.group = 'Group D';
            break;
        default:
            break;
    }
    records.push(item);
}

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize MultiSelect component
    let localObj: MultiSelect = new MultiSelect({
        //set the local data to dataSource property
        dataSource: records,
        mode: 'Box',        
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        allowFiltering: true,
        allowCustomValue: true,
        showDropDownIcon:true,
        hideSelectedItem: true,
        closePopupOnSelect: true,
        fields: { text: 'text', value: 'id' },
        placeholder: 'e.g. Item 1'
    });
    localObj.appendTo('#local');

    let remoteObj: MultiSelect = new MultiSelect({
        //set the remote data to dataSource property
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/orders',
            adaptor: new WebApiAdaptor ,
            crossDomain: true
        }),
        fields: { text: 'OrderID', value: 'OrderID' },
        //enable the virtualization property
        enableVirtualization: true,
        allowFiltering: true,
        mode: 'Delimiter', 
        // set true to enable the custom value support.
        allowCustomValue: true,
        hideSelectedItem: true,
        closePopupOnSelect: true,
        showDropDownIcon:true,
        popupHeight: '200px',
        // set the placeholder to DropDownList component
        placeholder: 'OrderID'
    });
    remoteObj.appendTo('#remote');

    let databindObj: MultiSelect = new MultiSelect({
        //set the remote data to dataSource property
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/orders',
            adaptor: new WebApiAdaptor ,
            crossDomain: true
        }),
        fields: { text: 'OrderID', value: 'OrderID' },
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        mode: 'Default', 
        value: ["20003", "10025", "10044", "custom"],
        allowFiltering: true,
        allowCustomValue: true,
        hideSelectedItem: true,
        closePopupOnSelect: true,
        showDropDownIcon:true,
        placeholder: 'e.g. Item 1'
    });
    databindObj.appendTo('#databind');

    let groupObj: MultiSelect = new MultiSelect({
        //set the local data to dataSource property
        dataSource: records,
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        mode: 'CheckBox', 
        allowFiltering: true,
        allowCustomValue: true,
        showDropDownIcon:true,
        enableSelectionOrder: false,
        fields: { groupBy: 'group', text: 'text', value: 'id' },
        placeholder: 'e.g. Item 1'
    });
    groupObj.appendTo('#group');

    let templateObj: MultiSelect = new MultiSelect({
        //set the local data to dataSource property
        dataSource: records,
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        mode: 'Default', 
        allowFiltering: true,
        allowCustomValue: true,
        hideSelectedItem: true,
        closePopupOnSelect: true,
        showDropDownIcon:true,
        headerTemplate:
        '<div class="header"><span style="margin-left:17px">Items Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div class="ename" style="height: 40px"> ${text} </div>',
        // set the template content for displays the selected items in input element.
        valueTemplate: '<div class="name"> ${text} </div>',
        fields: { text: 'text', value: 'id' },
        placeholder: 'e.g. Item 1'
    });
    templateObj.appendTo('#template');

    // Initialize the CheckBox component
    let checkBoxObj: CheckBox = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'AllowFiltering',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the allowFiltering in multiselect on CheckBox checked state
            localObj.allowFiltering = args.checked;
            remoteObj.allowFiltering = args.checked;
            databindObj.allowFiltering = args.checked;
            groupObj.allowFiltering = args.checked;
            templateObj.allowFiltering = args.checked;
        }
    });
    checkBoxObj.appendTo('#filter');
    // Initialize the CheckBox component
    checkBoxObj = new CheckBox({
        checked: true,
        label: 'AllowCustomValue',
        change: (args: ChangeEventArgs) => {
            localObj.allowCustomValue = args.checked;
            remoteObj.allowCustomValue = args.checked;
            databindObj.allowCustomValue = args.checked;
            groupObj.allowCustomValue = args.checked;
            templateObj.allowCustomValue = args.checked;
        }
    });
    checkBoxObj.appendTo('#custom');

    // Initialize the CheckBox component
     checkBoxObj = new CheckBox({
        checked: true,
        label: 'HideSelectedItem',
        change: (args: ChangeEventArgs) => {
            localObj.hideSelectedItem = args.checked;
            remoteObj.hideSelectedItem = args.checked;
            databindObj.hideSelectedItem = args.checked;
            templateObj.hideSelectedItem = args.checked;
        }
    });
    checkBoxObj.appendTo('#hide');

     // Initialize the CheckBox component
     checkBoxObj = new CheckBox({
        checked: true,
        label: 'ClosePopupOnSelect',
        change: (args: ChangeEventArgs) => {
            localObj.closePopupOnSelect = args.checked;
            remoteObj.closePopupOnSelect = args.checked;
            databindObj.closePopupOnSelect = args.checked;
            templateObj.closePopupOnSelect = args.checked;
        }
    });
    checkBoxObj.appendTo('#close');
};