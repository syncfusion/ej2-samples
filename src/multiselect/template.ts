/**
 * MultiSelect Template Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let employees: { [key: string]: Object }[] = [
        { Name: 'Andrew Fuller', Eimg: '7', Job: 'Team Lead', Country: 'England' },
        { Name: 'Anne Dodsworth', Eimg: '1', Job: 'Developer', Country: 'USA' },
        { Name: 'Janet Leverling', Eimg: '3', Job: 'HR', Country: 'USA' },
        { Name: 'Laura Callahan', Eimg: '2', Job: 'Product Manager', Country: 'USA' },
        { Name: 'Margaret Peacock', Eimg: '6', Job: 'Developer', Country: 'USA' },
        { Name: 'Michael Suyama', Eimg: '9', Job: 'Team Lead', Country: 'USA' },
        { Name: 'Nancy Davolio', Eimg: '4', Job: 'Product Manager', Country: 'USA' },
        { Name: 'Robert King', Eimg: '8', Job: 'Developer ', Country: 'England' },
        { Name: 'Steven Buchanan', Eimg: '10', Job: 'CEO', Country: 'England' }
    ];

    let listObj: MultiSelect = new MultiSelect({
        dataSource: employees,
        fields: { text: 'Name', value: 'Eimg' },
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>',
        itemTemplate: '<div><img class="empImage" src="src/dropdownlist/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Job} </div></div>',
        valueTemplate: '<div style="width:100%;height:100%;">'
        + '<img class="value" src="src/dropdownlist/Employees/${Eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${Name} </div></div>',
        placeholder: 'Select employees',
        mode: 'box'
    });
    listObj.appendTo('#template');
};