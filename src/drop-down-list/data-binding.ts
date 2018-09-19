/**
 * DropDownList Remote Data & Local Data Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataAdaptor } from '@syncfusion/ej2-data';


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

    // initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Customers',
            adaptor: new ODataAdaptor,
            crossDomain: true
        }),
        // bind the Query instance to query property
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        // map the appropriate columns to fields property
        fields: { text: 'ContactName', value: 'CustomerID' },
         // set the placeholder to DropDownList input element
        placeholder: 'Select a customer',
        // sort the resulted items
        sortOrder: 'Ascending',
        // set the height of the popup element
        popupHeight: '200px'
    });
    dropDownListObj.appendTo('#customers');

    // initialize DropDownList component
    let games: DropDownList = new DropDownList({
        // set the local data to dataSource property
        dataSource: gameList,
        // map the appropriate columns to fields property
        fields: { text: 'Game' },
        // set the placeholder to DropDownList input element
        placeholder: 'Select a game',
        // set the height of the popup element
        popupHeight: '200px'
    });
    games.appendTo('#games');
};