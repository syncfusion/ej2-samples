/**
 * DropDownList Inline Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';

this.default = () => {

    let employees: { [key: string]: Object }[] = [
        { Name: 'Andrew', Eimg: '7' },
        { Name: 'Anne', Eimg: '1' },
        { Name: 'Janet', Eimg: '3' },
        { Name: 'Laura', Eimg: '2' },
        { Name: 'Michael', Eimg: '9' },
        { Name: 'Nancy', Eimg: '4' },
        { Name: 'Robert', Eimg: '8' },
        { Name: 'Steven', Eimg: '10' }
    ];

    // Initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // set the employees data to dataSource property
        dataSource: employees,
        // map the appropriate columns to fields property
        fields: { text: 'Name' },
        value: 'Michael',
        // set the placeholder to DropDownList input element
        placeholder: 'Select an employee',
        // set the width to component
        width: '60px',
        // set the width to popup element
        popupWidth: '140px',
        // set the height to popup element
        popupHeight: '200px',
         // set the cssClass for override the component default styles
        cssClass: 'inlinecss'
    });
    dropDownListObj.appendTo('#inline');
};
