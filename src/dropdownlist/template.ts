/**
 * DropDownList Template Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let employees: { [key: string]: Object }[] = [
        { name: 'Anne Dodsworth', eimg: '1', job: 'Developer', country: 'USA'  },
        { name: 'Laura Callahan', eimg: '2', job: 'Product Manager', country: 'USA' },
        { name: 'Andrew Fuller', eimg: '7', job: 'Team Lead', country: 'England' },
        { name: 'Robert King', eimg: '8', job: 'CEO', country: 'England' },
        { name: 'Michael Suyama', eimg: '9', job: 'Team Lead', country: 'USA' },
        { name: 'Margaret Peacock', eimg: '6', job: 'Developer', country: 'USA' },
        { name: 'Janet Leverling', eimg: '3', job: 'HR', country: 'USA' },
        { name: 'Steven Buchanan', eimg: '10', job: 'Developer', country: 'England' },
        { name: 'Nancy Davolio', eimg: '4', job: 'Product Manager', country: 'USA' },
    ];

    let dropDownListObj: DropDownList = new DropDownList({
        dataSource: employees,
        fields: { text: 'name' },
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span style="margin-left:15px">Employee Info</span></div>',
        itemTemplate: '<div><img class="empImage" src="src/dropdownlist/Employees/${eimg}.png" alt="employee"/>' +
            '<div class="ename"> ${name} </div><div class="job"> ${job} </div></div>',
        valueTemplate: '<div><img class="value" src="src/dropdownlist/Employees/${eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${name} </div></div>',
        placeholder: 'Select an employee',
        popupHeight: '270px'
    });
    dropDownListObj.appendTo('#template');
};