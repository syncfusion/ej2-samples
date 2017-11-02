/**
 * AutoComplete Template Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let empList: { [key: string]: Object }[] = [
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

    let atcObj: AutoComplete = new AutoComplete({
        dataSource: empList,
        fields: { value: 'Name' },
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span class="info">Employee Info</span></div>',
        itemTemplate: '<div><img class="empImage" src="src/autocomplete/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>',
        placeholder: 'e.g. Andrew Fuller',
        popupHeight: '450px'
    });
    atcObj.appendTo('#employees');
};