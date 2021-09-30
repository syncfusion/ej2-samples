import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Agenda } from '@syncfusion/ej2-schedule';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';
import { generateObject } from './helper';

Schedule.Inject(Agenda);

/**
 * Schedule agenda sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        views: [{ option: 'Agenda', allowVirtualScrolling: false }],
        selectedDate: new Date(2021, 1, 15),
        currentView: 'Agenda',
        eventSettings: { dataSource: generateObject() },
    });
    scheduleObj.appendTo('#Schedule');

    // custom code start
    // Initialize NumericTextBox component for agenda days count
    let numericText: NumericTextBox = new NumericTextBox({
        value: 7,
        min: 1,
        max: 15,
        format: 'n0',
        placeholder: "Days Count",
        floatLabelType: "Always",
        change: (args: ChangeEventArgs) => {
            scheduleObj.agendaDaysCount = args.value !== null ? args.value : 7;
            scheduleObj.dataBind();
        }
    });
    numericText.appendTo('#agendadayscount');

    // Initialize DropDownList component for allow virtual scroll
    let virtualScrollDropDown: DropDownList = new DropDownList({
        placeholder: "Allow Virtual Scrolling",
        floatLabelType: "Always",
        change: (args: DropDownChangeArgs) => {
            let allowVS: boolean = (args.value === 'true') ? true : false;
            scheduleObj.views = [{ option: 'Agenda', allowVirtualScrolling: allowVS }];
            scheduleObj.dataBind();
        }
    });
    virtualScrollDropDown.appendTo('#virtualscroll');

    // Initialize DropDownList component for hide empty agenda days
    let hideEmptyDaysDropDown: DropDownList = new DropDownList({
        placeholder: "Hide Empty Days",
        floatLabelType: "Always",
        change: (args: DropDownChangeArgs) => {
            scheduleObj.hideEmptyAgendaDays = (args.value === 'true') ? true : false;
            scheduleObj.dataBind();
        }
    });
    hideEmptyDaysDropDown.appendTo('#hideemptydays');
    // custom code end
};
