/**
 * MultiSelect Template Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let employees: { [key: string]: Object }[] = [
        { Name: 'Andrew', Eimg: '7', Job: 'Team Lead', Country: 'England' },
        { Name: 'Anne Dodsworth', Eimg: '1', Job: 'Developer', Country: 'USA' },
        { Name: 'Janet Leverling', Eimg: '3', Job: 'HR', Country: 'USA' },
        { Name: 'Laura Callahan', Eimg: '2', Job: 'Product Manager', Country: 'USA' },
        { Name: 'Margaret', Eimg: '6', Job: 'Developer', Country: 'USA' },
        { Name: 'Michael Suyama', Eimg: '9', Job: 'Team Lead', Country: 'USA' },
        { Name: 'Nancy Davolio', Eimg: '4', Job: 'Product Manager', Country: 'USA' },
        { Name: 'Robert King', Eimg: '8', Job: 'Developer ', Country: 'England' },
        { Name: 'Steven', Eimg: '10', Job: 'CEO', Country: 'England' }
    ];

    // initialize MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // set the employees data to dataSource property
        dataSource: employees,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Eimg' },
        // set the template content for popup header element
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div><img class="empImage" src="src/dropdownlist/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Job} </div></div>',
        // set the template content for displays the selected items in input element.
        valueTemplate: '<div style="width:100%;height:100%;">'
        + '<img class="value" src="src/dropdownlist/Employees/${Eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${Name} </div></div>',
        // set placeholder to MultiSelect input element
        placeholder: 'Select employees',
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Box'
    });
    listObj.appendTo('#template');
};