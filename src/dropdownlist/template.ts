/**
 * DropDownList Template Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let employees: { [key: string]: Object }[] = [
        { Name: 'Andrew Fuller', Eimg: '7', Designation: 'Team Lead', Country: 'England' },
        { Name: 'Anne Dodsworth', Eimg: '1', Designation: 'Developer', Country: 'USA' },
        { Name: 'Janet Leverling', Eimg: '3', Designation: 'HR', Country: 'USA' },
        { Name: 'Laura Callahan', Eimg: '2', Designation: 'Product Manager', Country: 'USA' },
        { Name: 'Margaret Peacock', Eimg: '6', Designation: 'Developer', Country: 'USA' },
        { Name: 'Michael Suyama', Eimg: '9', Designation: 'Team Lead', Country: 'USA' },
        { Name: 'Nancy Davolio', Eimg: '4', Designation: 'Product Manager', Country: 'USA' },
        { Name: 'Robert King', Eimg: '8', Designation: 'Developer ', Country: 'England' },
        { Name: 'Steven Buchanan', Eimg: '10', Designation: 'CEO', Country: 'England' }
    ];

    let dropDownListObj: DropDownList = new DropDownList({
        dataSource: employees,
        fields: { text: 'Name' },
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span class="info">Employee Info</span></div>',
        itemTemplate: '<div><img class="empImage" src="src/dropdownlist/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>',
        valueTemplate: '<div style="width:100%;height:100%;">'
        + '<img class="value" src="src/dropdownlist/Employees/${Eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${Name} </div></div>',
        placeholder: 'Select an employee',
        popupHeight: '270px'
    });
    dropDownListObj.appendTo('#employees');
};