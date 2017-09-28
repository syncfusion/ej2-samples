/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

this.default = () => {
    let sportsData: { [key: string]: Object }[] = [
        { id: 'Game1', game: 'American Football' },
        { id: 'Game2', game: 'Badminton' },
        { id: 'Game3', game: 'Basketball' },
        { id: 'Game4', game: 'Cricket' },
        { id: 'Game5', game: 'Football' },
        { id: 'Game6', game: 'Golf' },
        { id: 'Game7', game: 'Hockey' },
        { id: 'Game8', game: 'Rugby' },
        { id: 'Game9', game: 'Snooker' },
        { id: 'Game10', game: 'Tennis' },
    ];

    let comboBoxObj1: ComboBox = new ComboBox({
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        }),
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        fields: { text: 'ContactName', value: 'CustomerID' },
        placeholder: 'Select a name',
        popupHeight: '200px',
        sortOrder: 'Ascending',
        autofill: true,
        actionBegin: () => {
            let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
                document.querySelector('.control-section').querySelectorAll('.e-input-group-icon');
            element[1].classList.add('e-spinner-icon');
            element[1].classList.remove('e-ddl-icon', 'e-search-icon');
        },
        actionComplete: () => {
            removeIcon();
        },
        actionFailure: () => {
            removeIcon();
        }
    });
    comboBoxObj1.appendTo('#customers');
    let comboBoxObj2: ComboBox = new ComboBox({
        dataSource: sportsData,
        fields: { text: 'game', value: 'id' },
        placeholder: 'Select a game',
        sortOrder: 'Ascending',
        popupHeight: '230px',
        autofill: true
    });
    comboBoxObj2.appendTo('#games');

    let checkBoxObj: CheckBox = new CheckBox({
        checked: true,
        label: 'Autofill',
        change: (args: ChangeEventArgs) => {
            comboBoxObj1.autofill = args.checked;
            comboBoxObj2.autofill = args.checked;
        }
    });
    checkBoxObj.appendTo('#checkAutofill');

    function removeIcon(): void {
        let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
            document.querySelector('.control-section').querySelectorAll('.e-input-group-icon');
        element[1].classList.add('e-ddl-icon', 'e-search-icon');
        element[1].classList.remove('e-spinner-icon');
    }
};