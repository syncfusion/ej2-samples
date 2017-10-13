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

let listObj1: ListView = new ListView({
    dataSource: romeEmployees,
    template: '<div class="template-container"><div class="left"><img class="empImg" src="src/dropdownlist/Employees/${id}.png" ' +
        'alt="${id}" /></div><div class="left info"><div class="name">${name}</div> <div class="role">${role}</div></div></div>'
});
let listObj2: ListView = new ListView({
    dataSource: parisEmployees,
    template: '<div class="template-container"><div class="left"><img class="empImg" src="src/dropdownlist/Employees/${id}.png" ' +
        'alt="${id}" /></div><div class="left info"><div class="name">${name}</div> <div class="role">${role}</div></div></div>'
});
let listObj3: ListView = new ListView({
    dataSource: londonEmployees,
    template: '<div class="template-container"><div class="left"><img class="empImg" src="src/dropdownlist/Employees/${id}.png" ' +
        'alt="${id}" /></div><div class="left info"><div class="name">${name}</div> <div class="role">${role}</div></div></div>'
});

this.default = () => {
    let tabObj: Tab = new Tab({
        heightAdjustMode: 'None',
        height: 320,
        showCloseButton: true
    });
    tabObj.appendTo('#tab_orientation');

    listObj1.appendTo('#rome');
    listObj2.appendTo('#paris');
    listObj3.appendTo('#london');

    let headerPositions: DropDownList = new DropDownList({
        width: '90%',
        change: changeHeaderPosition
    });
    headerPositions.appendTo('#orientation');

    let headerStyles: DropDownList = new DropDownList({
        width: '90%',
        change: changeHeaderStyle
    });
    headerStyles.appendTo('#headerStyles');

    function changeHeaderPosition(e: ChangeEventArgs): void {
        if (e.itemData.value === 'bottom') {
            tabObj.headerPlacement = 'Bottom';
        } else {
            tabObj.headerPlacement = 'Top';
        }
        tabObj.dataBind();
    }

    function changeHeaderStyle(e: ChangeEventArgs): void {
        removeStyleClass();
        let name: string = e.itemData.value;
        if (name === 'fill') {
            tabObj.element.classList.add('e-fill');
        } else if (name === 'accent') {
            tabObj.element.classList.add('e-background');
            tabObj.element.classList.add('e-accent');
        }
    }

    function removeStyleClass(): void {
        tabObj.element.classList.remove('e-fill');
        tabObj.element.classList.remove('e-background');
        tabObj.element.classList.remove('e-accent');
    }
};