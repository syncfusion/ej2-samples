/**
 *  Sample for CSS Avatar listview
 */
import { ListView } from '@syncfusion/ej2-lists';
this.default = () => {
    // Listview datasource with avatar and image source fields
    let dataSource: { [key: string]: Object; }[] = [
        { id: 's_01', text: 'Robert', avatar: '', pic: 'pic04' },
        { id: 's_02', text: 'Nancy', avatar: 'N', pic: '' },
        { id: 's_05', text: 'John', pic: 'pic01', avatar: '' },
        { id: 's_03', text: 'Andrew', avatar: 'A', pic: '' },
        { id: 's_06', text: 'Michael', pic: 'pic02', avatar: '' },
        { id: 's_07', text: 'Steven', pic: 'pic03', avatar: '' },
        { id: 's_08', text: 'Margaret', avatar: 'M', pic: '' }
    ];

    let letterAvatarList: ListView = new ListView({
        // Bind listview datasource
        dataSource: dataSource,
        // Assign header title
        headerTitle: 'Contacts',
        // Enable header title
        showHeader: true,
        // Assign list-item template
        template: '<div class="listWrapper">' +
            '${if(avatar!=="")}' +
            '<span class="e-avatar e-avatar-small e-avatar-circle">${avatar}</span>' +
            '${else}' +
            '<span class="${pic} e-avatar e-avatar-small e-avatar-circle"> </span>' +
            '${/if}' +
            '<span class="list-text">' +
            '${text} </span> </div>',
        // Assign sorting order
        sortOrder: 'Ascending'
    });
    letterAvatarList.appendTo('#letterAvatarList');
};