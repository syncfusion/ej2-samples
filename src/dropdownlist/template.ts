/**
 * dropDownList Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns/src';

this.default = () => {

    let empList: { [key: string]: Object }[] = [
        { text: 'Mona Sak', eimg: '1', job: 'HR', country: 'USA'  },
        { text: 'Kapil Sharma', eimg: '2', job: 'Product Manager', country: 'USA' },
        { text: 'Erik Linden', eimg: '3', job: 'Team Lead', country: 'England' },
        { text: 'Kavi Tam', eimg: '4', job: 'CEO', country: 'England' },
        { text: 'Harish Sree', eimg: '5', job: 'Team Lead', country: 'USA' },
    ];

    let listObj: DropDownList = new DropDownList({
        dataSource: empList,
        fields: { text: 'text', groupBy: 'country'},
        headerTemplate: '<div class="head">  Photo  <span style="padding-left:42px"> Contact Info </span></div>',
        itemTemplate: '<div><img class="eimg" src="src/dropdownlist/Employees/${eimg}.png" height="90px" width="90px" alt="employee"/>' +
            '<div class="ename"> ${text} </div><div class="temp"> ${job} </div></div>',
        footerTemplate: '<div class="Foot"> Total Items Count: 5 </div>',
        valueTemplate: '<div><img class="tempImg" src="src/dropdownlist/Employees/${eimg}.png" height="30px" width="30px" alt="employee"/>'
        + '<div class="tempName"> ${text} </div></div>',
        width: '250px',
        placeholder: 'Select an employee',
        popupWidth: '250px',
        popupHeight: '300px'
    });
    listObj.appendTo('#list');
};