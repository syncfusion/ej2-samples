import { loadCultureFiles } from '../common/culture-loader';
import { RecurrenceEditor, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-schedule';

/**
 * Recurrence editor generate rule
 */

(window as any).default = (): void => {
    loadCultureFiles();
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
