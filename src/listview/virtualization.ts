/**
 * ListView Virtualization Sample
 */
import { ListView, Virtualization } from '@syncfusion/ej2-lists';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

let commonData: { [key: string]: string | object }[] = [];
let dataSource: { [key: string]: { [key: string]: string | object }[] } = {};
let startTime: Date;
let endTime: Date;
let listObj: ListView;
let liElement: HTMLElement;

this.default = () => {

    ListView.Inject(Virtualization);
    commonData = [
        { name: 'Nancy', icon: 'N', id: '0', },
        { name: 'Andrew', icon: 'A', id: '1' },
        { name: 'Janet', icon: 'J', id: '2' },
        { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3' },
        { name: 'Steven', icon: 'S', id: '4' },
        { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5' },
        { name: 'Robert', icon: 'R', id: '6' },
        { name: 'Michael', icon: 'M', id: '7' },
        { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8' },
        { name: 'Nolan', icon: 'N', id: '9' }
    ];

    liElement = document.getElementById('ui-list');

    if (Browser.isDevice) {
        liElement.classList.add('ui-mobile');
    }

    createSpinner({
        target: liElement
    });

    [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']].forEach((ds: string[] | number[]) => {
        let data: { [key: string]: string | object }[] = commonData.slice();
        let index: number;
        let spyIndex: number;
        for (let i: number = 10; i <= ds[0]; i++) {
            while (index === spyIndex) {
                index = parseInt((Math.random() * 10).toString(), 10);
            }
            data.push({ name: data[index].name, icon: data[index].icon, imgUrl: data[index].imgUrl, id: i.toString() });
            spyIndex = index;
        }
        dataSource[ds[1]] = data;
    });

    let template: string = '<div class="e-list-wrapper e-list-avatar">' +
        '<span class="e-avatar e-avatar-circle ${icon} ${$imgUrl ? \'hideUI\' : \'showUI\' }">' +
        '${icon}</span> <img class="e-avatar e-avatar-circle ${$imgUrl ? \'showUI\' : \'hideUI\' }" ' +
        'src="${$imgUrl ?  $imgUrl : \' \' }" />' +
        '<span class="e-list-content">${name}</span></div>';

    listObj = new ListView({

        //Set defined data to dataSource property.
        dataSource: dataSource.data1,

        //enable UI virtualization
        enableVirtualization: true,

        cssClass: 'e-list-template',

        //Set height
        height: 500,

        //Set header title
        headerTitle: 'Contacts',

        //Set true to show header title
        showHeader: true,

        //Set defined customized template
        template: template,

        actionBegin: () => {
            startTime = new Date();
        },
        actionComplete: () => {
            endTime = new Date();
            document.getElementById('time').innerText = (endTime.getTime() - startTime.getTime()) + ' ms';
        }

    });

    //Render initialized ListView component
    listObj.appendTo('#ui-list');

    // Initialize DropDownList Component
    let ddObj: DropDownList = new DropDownList({
        // Set the initial index of the list
        index: 0,
        // set the height of the dropdown list component
        popupHeight: '200px',
        // Handling the dropdown list change event to change slider tooltip showOn property
        change: onChange
    });

    ddObj.appendTo('#ddl');

};

function onChange(e: ChangeEventArgs): void {
    showSpinner(liElement);
    startTime = new Date();
    listObj.dataSource = dataSource['data' + e.value];
    listObj.dataBind();
    endTime = new Date();
    document.getElementById('time').innerText = (endTime.getTime() - startTime.getTime()) + ' ms';
    hideSpinner(liElement);
}
