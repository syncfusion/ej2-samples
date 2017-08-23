/**
 * DropDownList Remote Data & Local Data Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';


this.default = () => {

    let gameList: { [key: string]: Object }[] = [
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

    let dropDownListObj: DropDownList = new DropDownList({
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        }),
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        fields: { text: 'ContactName', value: 'CustomerID' },
        placeholder: 'Select a customer',
        popupHeight: '200px',
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
    dropDownListObj.appendTo('#remote');

    let games: DropDownList = new DropDownList({
        dataSource: gameList,
        fields: { text: 'game' },
        placeholder: 'Select a game',
        popupHeight: '200px'
    });
    games.appendTo('#local');
    function removeIcon(): void {
        let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
            document.querySelector('.control-section').querySelectorAll('.e-input-group-icon');
        element[1].classList.add('e-ddl-icon', 'e-search-icon');
        element[1].classList.remove('e-spinner-icon');
    }
};