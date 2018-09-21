import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { RecurrenceEditor } from '@syncfusion/ej2-schedule';

/**
 * Recurrence editor populate rule
 */

this.default = () => {
    let recObject: RecurrenceEditor = new RecurrenceEditor();
    recObject.appendTo('#RecurrenceEditor');
    recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');

    let datas: { [key: string]: Object }[] = [
        { rule: 'FREQ=DAILY;INTERVAL=1' },
        { rule: 'FREQ=DAILY;INTERVAL=2;UNTIL=20410606T000000Z' },
        { rule: 'FREQ=DAILY;INTERVAL=2;COUNT=8' },
        { rule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;UNTIL=20410729T000000Z' },
        { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1;UNTIL=20410729T000000Z' },
        { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1' },
        { rule: 'FREQ=YEARLY;BYDAY=MO;BYSETPOS=-1;INTERVAL=1;COUNT=5' }];
    let dropDownListObj: DropDownList = new DropDownList({
        index: 2,
        popupHeight: '200px',
        dataSource: datas,
        change: (e: ChangeEventArgs) => {
            recObject.setRecurrenceRule(<string>e.value);
        },
        fields: { text: 'rule', value: 'rule' }
    });
    dropDownListObj.appendTo('#RecurrenceList');
};
