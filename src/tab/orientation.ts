import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Tab orientation sample
 */
import { Tab } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

let romeEmployees: { [key: string]: Object }[] = [
    { id: '1', name: 'Anne Dodsworth', role: 'Product Manager' },
    { id: '2', name: 'Laura Callahan', role: 'Team Lead' },
    { id: '3', name: 'Andrew Fuller', role: 'Developer' }
];
let parisEmployees: { [key: string]: Object }[] = [
    { id: '4', name: 'Robert King', role: 'Team Lead' },
    { id: '5', name: 'Michael Suyama', role: 'Developer' },
    { id: '6', name: 'Margaret Peacock', role: 'Developer' }
];
let londonEmployees: { [key: string]: Object }[] = [
    { id: '7', name: 'Janet Leverling', role: 'CEO' },
    { id: '8', name: 'Steven Buchanan', role: 'HR' },
    { id: '9', name: 'Nancy Davolio', role: 'Product Manager' }
];

//Initialize ListView component
let listObj1: ListView = new ListView({
    dataSource: romeEmployees,
    template: '<div class="template-container"><div class="left"><img class="empImg" src="src/tab/images/employees/${id}.png" ' +
        'alt="${id}" /></div><div class="left info"><div class="name">${name}</div> <div class="role">${role}</div></div></div>'
});
//Initialize ListView component
let listObj2: ListView = new ListView({
    dataSource: parisEmployees,
    template: '<div class="template-container"><div class="left"><img class="empImg" src="src/tab/images/employees/${id}.png" ' +
        'alt="${id}" /></div><div class="left info"><div class="name">${name}</div> <div class="role">${role}</div></div></div>'
});
//Initialize ListView component
let listObj3: ListView = new ListView({
    dataSource: londonEmployees,
    template: '<div class="template-container"><div class="left"><img class="empImg" src="src/tab/images/employees/${id}.png" ' +
        'alt="${id}" /></div><div class="left info"><div class="name">${name}</div> <div class="role">${role}</div></div></div>'
});

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize Tab component
    let tabObj: Tab = new Tab({
        height: 320,
        showCloseButton: true
    });
    //Render initialized Tab component
    tabObj.appendTo('#tab_orientation');

    //Render initialized ListView component
    listObj1.appendTo('#rome');
    //Render initialized ListView component
    listObj2.appendTo('#paris');
    //Render initialized ListView component
    listObj3.appendTo('#london');

    //Initialize DropDownList component
    let headerPositions: DropDownList = new DropDownList({
        width: '90%',
        change: changeHeaderPosition
    });
    //Render initialized DropDownList component
    headerPositions.appendTo('#orientation');

    //Initialize DropDownList component
    let headerStyles: DropDownList = new DropDownList({
        width: '90%',
        change: changeHeaderStyle
    });
    //Render initialized DropDownList component
    headerStyles.appendTo('#headerStyles');

    // Change event function for DropDownList component
    function changeHeaderPosition(e: ChangeEventArgs): void {
        tabObj.headerPlacement = (<{ [key: string]: any; }>e.itemData).value;
        tabObj.dataBind();
    }

    // Change event function for DropDownList component
    function changeHeaderStyle(e: ChangeEventArgs): void {
        removeStyleClass();
        let name: string = <string>(<{ [key: string]: Object; }>e.itemData).value;
        if (name === 'fill') {
            tabObj.element.classList.add('e-fill');
        } else if (name === 'accent') {
            tabObj.element.classList.add('e-background');
            tabObj.element.classList.add('e-accent');
        }
        (tabObj as any).refreshActiveBorder();
    }

    function removeStyleClass(): void {
        tabObj.element.classList.remove('e-fill');
        tabObj.element.classList.remove('e-background');
        tabObj.element.classList.remove('e-accent');
    }
};