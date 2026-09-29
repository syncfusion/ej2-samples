import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI, ValueFormat } from '@syncfusion/ej2-richtexteditor-ui';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs as DropdownListChangeEventArgs } from '@syncfusion/ej2-dropdowns';

(window as any).default = (): void => {
    loadCultureFiles();
    const propertiesRTE: RichTextEditorUI = new RichTextEditorUI({
        value: '<p>Welcome to Rich Text Editor</p>',
        valueFormat: 'html',
        enablePersistence: true,
        saveInterval: 100,
        change: (): void => {
            log(propertiesRTE.value);
        }
    });
    propertiesRTE.appendTo('#editor');

    const output: HTMLElement =
        document.getElementById('value-format-output') as HTMLElement;

    const log = (value: unknown): void => {
        const text: string = value === undefined || value === null
            ? String(value)
            : typeof value === 'string'
                ? value
                : JSON.stringify(value, null, 2);

        output.textContent = text;
    };

    const valueFormatData: { [key: string]: Object }[] = [
        { text: 'HTML', value: 'html' },
        { text: 'JSON', value: 'json' }
    ];

    const valueFormatDropdown: DropDownList = new DropDownList({
        dataSource: valueFormatData,
        fields: { text: 'text', value: 'value' },
        value: 'html',
        popupHeight: '150px',
        floatLabelType: 'Auto',
        change: (args: DropdownListChangeEventArgs) => {
            const currentValue: string = propertiesRTE.value as string;
            propertiesRTE.valueFormat = args.value as ValueFormat;
            propertiesRTE.value = currentValue;
            propertiesRTE.dataBind();

            log(propertiesRTE.value);
        }
    });
    valueFormatDropdown.appendTo('#valueFormat');

    const enableCheckbox: CheckBox = new CheckBox({
        checked: true,
        label: 'Enable',
        change: (args: ChangeEventArgs) => {
            propertiesRTE.enable = (args as any).checked;
        }
    });
    enableCheckbox.appendTo('#enable');

    const readonlyCheckbox: CheckBox = new CheckBox({
        checked: false,
        label: 'Readonly',
        change: (args: ChangeEventArgs) => {
            propertiesRTE.readonly = (args as any).checked;
        }
    });
    readonlyCheckbox.appendTo('#readonly');

    const enableRTLCheckbox: CheckBox = new CheckBox({
        checked: false,
        label: 'Enable RTL',
        change: (args: ChangeEventArgs) => {
            propertiesRTE.enableRtl = (args as any).checked;
        }
    });
    enableRTLCheckbox.appendTo('#enableRTL');

    const enablePersistenceCheckbox: CheckBox = new CheckBox({
        checked: true,
        label: 'Enable Persistence',
        change: (args: ChangeEventArgs) => {
            const checked: boolean = (args as any).checked;
            propertiesRTE.enablePersistence = checked;
            propertiesRTE.dataBind();
        }
    });
    enablePersistenceCheckbox.appendTo('#enablePersistence');
    log(propertiesRTE.value);
};