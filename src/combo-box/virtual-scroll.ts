import { loadCultureFiles } from '../common/culture-loader';
/**
 * Combobox Default functionality Sample
 */
import { ComboBox , VirtualScroll } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, UrlAdaptor  } from '@syncfusion/ej2-data';

ComboBox.Inject(VirtualScroll);

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
    // initialize ComboBox component
    let localObj:  ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: records,
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        allowFiltering: true,
        fields: { text: 'text', value: 'id' },
        // set the placeholder to ComboBox component
        placeholder: 'e.g. Item 1'
    });
    localObj.appendTo('#local');

    let remoteObj:  ComboBox = new ComboBox({
        //set the remote data to dataSource property
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/VirtualDropdownData',
            adaptor: new UrlAdaptor ,
            crossDomain: true
        }),
        fields: { text: 'OrderID', value: 'OrderID' },
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        allowFiltering: true,
        // set the placeholder to ComboBox component
        placeholder: 'OrderID'
    });
    remoteObj.appendTo('#remote');

    let groupObj:  ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: records,
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        allowFiltering: true,
        fields: { groupBy: 'group', text: 'text', value: 'id' },
        // set the placeholder to ComboBox component
        placeholder: 'e.g. Item 1'
    });
    groupObj.appendTo('#group');
};