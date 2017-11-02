/**
 * DropDownList Remote Data & Local Data Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';


this.default = () => {

    let gameList: { [key: string]: Object }[] = [
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

    let dropDownListObj: DropDownList = new DropDownList({
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        }),
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        fields: { text: 'ContactName', value: 'CustomerID' },
        placeholder: 'Select a customer',
        sortOrder: 'Ascending',
        popupHeight: '200px'
    });
    dropDownListObj.appendTo('#customers');

    let games: DropDownList = new DropDownList({
        dataSource: gameList,
        fields: { text: 'Game' },
        placeholder: 'Select a game',
        popupHeight: '200px'
    });
    games.appendTo('#games');
};