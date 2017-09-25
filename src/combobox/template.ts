/**
 * ComboBox Template Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let empList: { [key: string]: Object }[] = [
        { name: 'Andrew Fuller', eimg: '7', designation: 'Team Lead', country: 'England' },
        { name: 'Anne Dodsworth', eimg: '1', designation: 'Developer', country: 'USA' },
        { name: 'Janet Leverling', eimg: '3', designation: 'HR', country: 'USA' },
        { name: 'Laura Callahan', eimg: '2', designation: 'Product Manager', country: 'USA' },
        { name: 'Margaret Peacock', eimg: '6', designation: 'Developer', country: 'USA' },
        { name: 'Michael Suyama', eimg: '9', designation: 'Team Lead', country: 'USA' },
        { name: 'Nancy Davolio', eimg: '4', designation: 'Product Manager', country: 'USA' },
        { name: 'Robert King', eimg: '8', designation: 'Developer ', country: 'England' },
        { name: 'Steven Buchanan', eimg: '10', designation: 'CEO', country: 'England' }
    ];

    let comboBoxObj: ComboBox = new ComboBox({
        dataSource: empList,
        fields: { text: 'name', value: 'eimg' },
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>',
        itemTemplate: '<div><img class="empImage" src="src/combobox/Employees/${eimg}.png" alt="employee"/>' +
            '<div class="ename"> ${name} </div><div class="job"> ${designation} </div></div>',
        placeholder: 'Select an employee',
        popupHeight: '270px'
    });
    comboBoxObj.appendTo('#employees');
};