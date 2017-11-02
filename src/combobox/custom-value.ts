/**
 * ComboBox Filtering Samples
 */
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

this.default = () => {
    let countries: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' }
    ];
    let comboBoxObj: ComboBox = new ComboBox({
        dataSource: countries,
        fields: { text: 'Name', value: 'Code' },
        placeholder: 'Select a country',
        popupHeight: '300px',
        width: '300px',
        allowFiltering: true,
        noRecordsTemplate:
        '<div><div id="nodata"> No matched item, do you want to add it as new item in list?</div>'
        + '<button id="btn" class="e-control e-btn">Add New Item</button></div>',
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            e.updateData(countries, query);
            if (document.getElementById('nodata')) {
              document.getElementById('btn').onclick = () => {
                let customValue: string = (document.getElementsByClassName('e-input')[0] as HTMLInputElement).value;
                let newItem: { [key: string]: Object; } = {'Name': customValue, 'Code': customValue };
                (comboBoxObj.dataSource as Object[]).push(newItem);
                comboBoxObj.hidePopup();
                comboBoxObj.addItem(newItem);
                comboBoxObj.value = customValue;
              };
            }
        }
    });
    comboBoxObj.appendTo('#country');
};