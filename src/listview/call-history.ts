import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListView Call history Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import { Tab, SelectEventArgs } from '@syncfusion/ej2-navigations';
import { callHistoryData } from './datasource';

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Template of the list item
    let template: string = '<div class="e-list-wrapper e-list-avatar e-list-multi-line">' +
        '<span class="e-avatar e-icon"></span><span class="e-list-item-header">${text}</span> <span class="${type} e-list-content">' +
        '${group}, ${time}</span></div>';

    //Initialize ListView component
    let listObj1: ListView = new ListView({
        // Set the datasource
        dataSource: callHistoryData,
        // Map the fields from the datasource into fields property
        fields: { text: 'text', groupBy: 'category' },

        cssClass: 'e-list-template',

        //Map the template for list items
        template: template,
    });
    listObj1.appendTo('#all');

    let listObj2: ListView = new ListView({
        // Set the datasource
        dataSource: callHistoryData,
        // Map the fields from the datasource into fields property
        fields: { text: 'text', groupBy: 'category' },

        cssClass: 'e-list-template',

        //Map the template for list items
        template: template,
    });
    listObj2.appendTo('#received');

    let newData: { [key: string]: Object }[] = [];

    let listObj3: ListView = new ListView({
        // Set the datasource
        dataSource: callHistoryData,
        // Map the fields from the datasource into fields property
        fields: { text: 'text', groupBy: 'category' },

        cssClass: 'e-list-template',

        //Map the template for list items
        template: template,

    });
    listObj3.appendTo('#missed');

    // Method used to filter the dataSource based on the given arguments
    function filterData(dataSource: { [key: string]: Object }[], value: string): { [key: string]: Object }[] {
        let newData: { [key: string]: Object }[] = [];
        dataSource.filter((data: { [key: string]: Object }) => {
            if ((<string>data.id).indexOf(value) !== -1) {
                newData.push(data);
            }
        });
        return newData;
    }

    let types: string[] = ['', 'received', 'missed'];
    let listObjects: ListView[] = [listObj1, listObj2, listObj3];
    // Intialize Tab component
    let tabObj: Tab = new Tab({
        items: [
            {
                header: { 'text': 'All' }, content: '#all'
            },
            {
                header: { 'text': 'Received' }, content: '#received'
            },
            {
                header: { 'text': 'Missed' }, content: '#missed'
            }
        ],
        selected: (args: SelectEventArgs) => {
            let newData: { [key: string]: Object }[];
            newData = filterData(callHistoryData, types[args.selectedIndex]); // Filter the data
            listObjects[args.selectedIndex].dataSource = newData; // Bind the filtered new data
        }
    });
    tabObj.appendTo('#tab');
};