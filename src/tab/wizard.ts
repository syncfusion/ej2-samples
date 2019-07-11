import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Tab Wizard sample
 */
// tslint:disable:max-line-length
import { Dialog } from '@syncfusion/ej2-popups';
import { Tab, SelectEventArgs } from '@syncfusion/ej2-navigations';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Grid, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';

let tabObj: Tab;
let availTrainGrid: Grid;
let ticketDetailGrid: Grid;
let endPoint: DropDownList;
let journeyDate: DatePicker;
let ticketType: DropDownList;
let startPoint: DropDownList;
let alertDlg: Dialog;
let today : Date = new Date();
let locations: any;
let selectedTrain: any;

let quota: any = [
    { id: '1', text: 'Business Class' },
    { id: '2', text: 'Economy Class' },
    { id: '3', text: 'Common Class' }
];
let gender: any = [
   { id: '1', text: 'Male' },
   { id: '2', text: 'Female' }
];
let berths: any = [
   { id: '1', text: 'Upper' },
   { id: '2', text: 'Lower' },
   { id: '3', text: 'Middle' },
   { id: '4', text: 'Window' },
   { id: '5', text: 'Aisle' }
];
let cities: any = [
    {name: 'Chicago', fare: 300} ,
    {name: 'San Francisco', fare: 125 },
    {name: 'Los Angeles', fare: 175 },
    {name: 'Seattle', fare: 250},
    {name: 'Florida', fare: 150}
];

function renderComponents(): void {
    /* Initialize Tab with disabled headers for the wizard */
    tabObj = new Tab({ heightAdjustMode: 'None', height: 390, showCloseButton: false,
        selecting: tabSelecting,
        items: [
            { header: { 'text': 'New Booking' }, content: '#booking' },
            { header: { 'text': 'Train List' }, content: '#selectTrain', disabled: true },
            { header: { 'text': 'Add Passenger' }, content: '#details', disabled: true },
            { header: { 'text': 'Make Payment' }, content: '#confirm', disabled: true }
        ]
    });
    tabObj.appendTo('#tab_wizard');
    /* Initialize the components for creating wizard */
    startPoint = new DropDownList({
        width: '100%', dataSource: cities, floatLabelType: 'Auto', placeholder: 'From',
        fields: { text: 'name', value: 'name' }
    });
    startPoint.appendTo('#startPoint');
    endPoint = new DropDownList({
        width: '100%', dataSource: cities, floatLabelType: 'Auto', placeholder: 'To',
        fields: { text: 'name', value: 'name' }
    });
    endPoint.appendTo('#endPoint');
    journeyDate = new DatePicker({
        width: '100%', floatLabelType: 'Auto', placeholder: 'Journey Date', min: new Date(today.getTime()),
        max: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000),
        value: new Date(),
    });
    journeyDate.appendTo('#journey_date');
    ticketType = new DropDownList({
        dataSource: quota, placeholder: 'Ticket Type', floatLabelType: 'Auto', fields: { text: 'text', value: 'text' }
    });
    ticketType.appendTo('#ticket_type');
    alertDlg = new Dialog({
        header: 'Success', width: 250, isModal: true, visible: false, showCloseIcon: true,
        content: 'Your payment successfully processed',  target: document.getElementById('dialog_target'), created: dlgCreated
    });
    alertDlg.appendTo('#alertDialog');
    alertDlg.hide();
    availTrainGrid = new Grid({
        width: '100%',
        columns: [
            { field: 'TrainNo', headerText: 'Train No', width: 120, type: 'number' },
            { field: 'Name', width: 140, headerText: 'Name' },
            { field: 'Departure', headerText: 'Departure', width: 120 },
            { field: 'Arrival', headerText: 'Arrival', width: 140 },
            { field: 'Availability', headerText: 'Availability', width: 140, type: 'number' }
        ],
        rowSelected: trainSelected
    });
    availTrainGrid.appendTo('#availableTrain');
    let age1: NumericTextBox = new NumericTextBox({ min: 1, max: 100, value: 18, format: 'n0', showSpinButton: false });
    age1.appendTo('#pass_age1');
    let age2: NumericTextBox = new NumericTextBox({ min: 1, max: 100, value: 18, format: 'n0', showSpinButton: false });
    age2.appendTo('#pass_age2');
    let age3: NumericTextBox = new NumericTextBox({ min: 1, max: 100, value: 18, format: 'n0', showSpinButton: false });
    age3.appendTo('#pass_age3');
    let gender1: DropDownList = new DropDownList({
        dataSource: gender, text: 'Male', fields: { text: 'text', value: 'text' }
    });
    gender1.appendTo('#pass_gender1');
    let gender2: DropDownList = new DropDownList({
        dataSource: gender, text: 'Male', fields: { text: 'text', value: 'text' }
    });
    gender2.appendTo('#pass_gender2');
    let gender3: DropDownList = new DropDownList({
        dataSource: gender, text: 'Male', fields: { text: 'text', value: 'text' }
    });
    gender3.appendTo('#pass_gender3');
    let berth1: DropDownList = new DropDownList({
        dataSource: berths, placeholder: 'Optional', fields: { text: 'text', value: 'text' }
    });
    berth1.appendTo('#pass_berth1');
    let berth2: DropDownList = new DropDownList({
        dataSource: berths, placeholder: 'Optional', fields: { text: 'text', value: 'text' }
    });
    berth2.appendTo('#pass_berth2');
    let berth3: DropDownList = new DropDownList({
        dataSource: berths, placeholder: 'Optional', fields: { text: 'text', value: 'text' }
    });
    berth3.appendTo('#pass_berth3');
    ticketDetailGrid = new Grid({
        width: '100%',
        columns: [
            { field: 'TrainNo', headerText: 'Train No', width: 120, type: 'number' },
            { field: 'PassName', width: 140, headerText: 'Name' },
            { field: 'Gender', headerText: 'Gender', width: 120 },
            { field: 'Berth', headerText: 'Berth', width: 140 }
        ],
    });
    ticketDetailGrid.appendTo('#ticketDetailGrid');
    document.getElementById('searchNext').onclick = (e: any) => { tabNavigations(e); };
    document.getElementById('bookTickets').onclick = (e: any) => { tabNavigations(e); };
    document.getElementById('confirmTickets').onclick = (e: any) => { tabNavigations(e); };
    document.getElementById('makePayment').onclick = (e: any) => { tabNavigations(e); };
    document.getElementById('goToSearch').onclick = (e: any) => { tabNavigations(e); };
    document.getElementById('goBackToBook').onclick = (e: any) => { tabNavigations(e); };
    document.getElementById('goBackDetails').onclick = (e: any) => { tabNavigations(e); };
}
function tabSelecting(e: SelectEventArgs): void {
    if (e.isSwiped) {
        e.cancel = true;
    }
}
function dlgCreated(): void {
  alertDlg.buttons = [{
    buttonModel: { content: 'Ok', isPrimary: true },
      click: (() => {
        alertDlg.hide();
        tabObj.enableTab(0, true);
        tabObj.enableTab(1, false);
        tabObj.enableTab(2, false);
        tabObj.enableTab(3, false);
        tabObj.select(0);
      })
  }];
}
function tabNavigations(args: any): void {
    switch (args.target.id) {
        case 'searchNext':
        /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
            if (!isNOU(startPoint.value) && !isNOU(endPoint.value) &&
                !isNOU(ticketType.value) && !isNOU(journeyDate.value)) {
                if (!isNOU(startPoint.value) && startPoint.value === endPoint.value) {
                    document.getElementById('err1').innerText = '* Arrival point can\'t be same as Departure';
                } else {
                    tabObj.enableTab(1, true);
                    tabObj.enableTab(0, false);
                    filterTrains(args);
                    document.getElementById('err1').innerText = '';
                    document.getElementById('err2').innerText = '';
                }
            } else {
                document.getElementById('err1').innerText = '* Please fill all the details before proceeding';
            }
            break;
        case 'bookTickets':
        /* Based on the selected station generate Grid content to display trains available */
            if (availTrainGrid.getSelectedRecords() === undefined || availTrainGrid.getSelectedRecords().length === 0) {
                document.getElementById('err2').innerText = '* Select your convenient train';
            } else {
                tabObj.enableTab(2, true);
                tabObj.enableTab(1, false);
                document.getElementById('err2').innerText = '';
            }
            break;
        case 'confirmTickets':
        /* Get the Passenger details and validate the fields must not be left empty */
            let name: any = document.getElementById('pass_name1');
            let age: any = document.getElementById('pass_age1');
            let gender: any = document.getElementById('pass_gender1');
            if (name.value === '' || age.value === '' || gender.value === '') {
                document.getElementById('err3').innerText = '* Please enter passenger details';
            } else {
                tabObj.enableTab(3, true);
                tabObj.enableTab(2, false);
                document.getElementById('err3').innerText = '';
                finalizeDetails(args);
            }
            break;
        case 'makePayment':
            alertDlg.show();
            break;
        case 'goToSearch':
        /* Go back to change class, date or boarding places */
            selectedTrain = [];
            tabObj.enableTab(0, true);
            tabObj.select(0);
            tabObj.enableTab(1, false);
            break;
        case 'goBackToBook':
        /* Change the preferred train chosen already */
            tabObj.enableTab(1, true);
            tabObj.select(1);
            tabObj.enableTab(2, false);
            break;
        case 'goBackDetails':
        /* Update passenger detail before confirming the payment */
            tabObj.enableTab(2, true);
            tabObj.select(2);
            tabObj.enableTab(3, false);
            break;
    }
}
function filterTrains(args: any): void {
    /* Generating trains based on source and destination chosen */
    let result: Object[] = [];
    let fromCity: string = startPoint.text;
    let toCity: string = endPoint.text;
    let count: number = Math.floor((Math.random() * 3) + 2);
    for (let i: number = 0; i < count; i++) {
        let details : any = [];
        details.TrainNo = Math.floor((Math.random() * 20) + 19000);
        details.Name = 'Train ' + i;
        details.Departure = fromCity;
        details.Arrival = toCity;
        details.Availability = Math.floor((Math.random() * 20) + 20);
        result.push(details);
    }
    availTrainGrid.dataSource = result;
}
function finalizeDetails(args: any): void {
    /* Get the passenger details and update table with name and other details for confirmation */
    let reserved: Object[] = [];
    let passCount: any = 0;
    for (let i: number = 1; i <= 3; i++) {
        let name: any = document.getElementById('pass_name' + i);
        let berthSelected: any = document.getElementById('pass_berth' + i);
        let gender: any = document.getElementById('pass_gender' + i);
        if (name.value !== '') {
            let details: any = [];
            let berth: string = berthSelected.value;
            details.TrainNo = selectedTrain.TrainNo.toString();
            details.PassName = name.value;
            details.Gender = gender.value;
            details.Berth = (berth === '') ? 'Any' : berth;
            reserved.push(details);
            passCount++;
        }
        let calcFare: any = 0;
        for (let i: number = 0; i < cities; i++) {
            if (startPoint.value === cities[i].name) {
                calcFare = calcFare + cities[i].fare;
            }
            if (endPoint.value === cities[i].name) {
                calcFare = calcFare + cities[i].fare;
            }
        }
        let displayAmt : any = document.getElementById('amount');
        if (ticketType.value === 'Economy Class') {
            displayAmt.innerText = 'Total payable amount: $' + passCount * (300 + calcFare);
        } else if (ticketType.value === 'Business Class') {
            displayAmt.innerText = 'Total payable amount: $' + passCount * (500 + calcFare);
        } else if (ticketType.value === 'Common Class') {
            displayAmt.innerText = 'Total payable amount: $' + passCount * (150 + calcFare);
        }
    }
    ticketDetailGrid.dataSource = reserved;
}
function trainSelected(args: RowSelectEventArgs): void {
    selectedTrain = args.data;
}

(window as any).default = (): void => {
    loadCultureFiles();
    renderComponents();
};
// tslint:enable:max-line-length
