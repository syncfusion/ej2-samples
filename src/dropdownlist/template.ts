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

    // initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // set the employees data to dataSource property
        dataSource: employees,
        // map the appropriate columns to fields property
        fields: { text: 'Name' },
        // set the template content for popup header element
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span class="info">Employee Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div><img class="empImage" src="src/dropdownlist/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>',
        // set the template content for displays the selected items in input element.
        valueTemplate: '<div style="width:100%;height:100%;">'
        + '<img class="value" src="src/dropdownlist/Employees/${Eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${Name} </div></div>',
        // set the placeholder to DropDownList input element
        placeholder: 'Select an employee',
        // set the height of the popup element
        popupHeight: '270px'
    });
    dropDownListObj.appendTo('#employees');
};