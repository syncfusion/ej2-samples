/**
 * ListView Call history Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import { Tab, SelectEventArgs } from '@syncfusion/ej2-navigations';
import { Browser } from '@syncfusion/ej2-base';

// tslint:disable-next-line:max-func-body-length
this.default = () => {
    if (!Browser.isDevice) {
        document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
    } else {
        document.getElementsByClassName('tabContainer')[0].classList.add('e-visbile-layer');
    }
    //Define an array of JSON data
    let data1: { [key: string]: Object }[] = [
        {
            text: 'Smith',
            id: 'received-01',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: '2 hours ago',
            category: 'Today'
        }, {
            text: 'Johnson',
            id: 'received-02',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Williams',
            id: 'missed-01',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: '4 hours ago',
            category: 'Today'
        }, {
            text: 'Jones',
            id: 'missed-02',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Brown',
            id: 'received-03',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Anderson',
            id: 'received-01',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: '12 hours ago',
            category: 'Today'
        }, {
            text: 'Thomas',
            id: 'received-02',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Jackson',
            id: 'missed-01',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Emily',
            id: 'received-01',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: '14 hours ago',
            category: 'Today'
        }, {
            text: 'White',
            id: 'missed-02',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Jones',
            id: 'missed-02',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: '18 hours ago',
            category: 'Today'
        }, {
            text: 'Grace',
            id: 'missed-02',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Brooklyn',
            id: 'missed-02',
            icon: 'e-custom',
            type: 'missed',
            group: 'Missed',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Arianna',
            id: 'received-01',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: 'Yesterday',
            category: 'Yesterday'
        }, {
            text: 'Katherine',
            id: 'received-02',
            icon: 'e-custom',
            type: 'received',
            group: 'Received',
            time: 'Yesterday',
            category: 'Yesterday'
        }
    ];

    // Template of the list item
    let template: string = '<div class="e-list-wrapper e-list-avatar e-list-multi-line">' +
        '<span class="e-avatar e-icon"></span><span class="e-list-item-header">${text}</span> <span class="${type} e-list-content">' +
        '${group}, ${time}</span></div>';

    //Initialize ListView component
    let listObj1: ListView = new ListView({
        // Set the datasource
        dataSource: data1,
        // Map the fields from the datasource into fields property
        fields: { text: 'text', groupBy: 'category' },

        cssClass: 'e-list-template',

        //Map the template for list items
        template: template,
    });
    listObj1.appendTo('#all');

    let listObj2: ListView = new ListView({
        // Set the datasource
        dataSource: data1,
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
        dataSource: data1,
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
            newData = filterData(data1, types[args.selectedIndex]);
            listObjects[args.selectedIndex].dataSource = newData;
        }
    });
    tabObj.appendTo('#tab');
};
