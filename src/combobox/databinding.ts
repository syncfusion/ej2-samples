/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

this.default = () => {
    let sportsData: { [key: string]: Object }[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' },
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
        autofill: true
    });
    comboBoxObj1.appendTo('#customers');
    let comboBoxObj2: ComboBox = new ComboBox({
        dataSource: sportsData,
        fields: { text: 'Game', value: 'Id' },
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
};