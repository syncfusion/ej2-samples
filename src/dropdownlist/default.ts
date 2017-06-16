/**
 * dropDownList Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns/src';


this.default = () => {

    let empList: { [key: string]: Object }[] = [
        { id: 'level1', country: 'American Football' }, { id: 'level2', country: 'Badminton' },
        { id: 'level3', country: 'Basketball' }, { id: 'level4', country: 'Cricket' },
        { id: 'level5', country: 'Football' }, { id: 'level6', country: 'Golf' },
        { id: 'level7', country: 'Hockey' }, { id: 'level8', country: 'Rugby' },
        { id: 'level9', country: 'Snooker' }, { id: 'level10', country: 'Tennis' },
    ];

    let listObj: DropDownList = new DropDownList({
        dataSource: empList,
        fields: { text: 'country' },
        width: '250px',
        index: 2,
        popupHeight: '200px',
        popupWidth: '250px',
    });
    listObj.appendTo('#list');
};