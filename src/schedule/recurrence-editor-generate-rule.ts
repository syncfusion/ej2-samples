import { RecurrenceEditor, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-schedule';

/**
 * Recurrence editor generate rule
 */

this.default = () => {
    let outputElement: HTMLElement = <HTMLElement>document.querySelector('#rule-output');
    let recObject: RecurrenceEditor = new RecurrenceEditor({
        change: (args: RecurrenceEditorChangeEventArgs) => {
            outputElement.innerText = args.value;
        }
    });
    recObject.appendTo('#RecurrenceEditor');
    recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
    outputElement.innerText = recObject.value as string;
};
