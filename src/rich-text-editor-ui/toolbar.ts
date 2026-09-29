import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI, ToolbarType, ToolbarPosition } from '@syncfusion/ej2-richtexteditor-ui';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2/buttons';
import { TOOLBAR_CONTENT } from './toolbar-content';

(window as any).default = (): void => {
    loadCultureFiles();
    const toolbarRTE: RichTextEditorUI = new RichTextEditorUI({
        value: TOOLBAR_CONTENT,
        height: '350px',
        toolbarSettings: {
            items: ['Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'FontColor', 'BackgroundColor', '|', 'Formats', 'Alignment', '|', 'Table' , 'Image' , 'Link', '|', 'FontName', 'FontSize','|', 'NumberFormatList', 'BulletFormatList','|','Subscript','Superscript', '|', 'ClearFormat'],
            type: 'Expanded',
            position: 'Top'
        }
    });
    toolbarRTE.appendTo('#editor');

    const toolbarTypeData: { [key: string]: Object }[] = [
        { text: 'Expanded', value: 'Expanded' },
        { text: 'MultiRow', value: 'MultiRow' },
        { text: 'Scrollable', value: 'Scrollable' }
    ];

    const toolbarPositionData: { [key: string]: Object }[] = [
        { text: 'Top', value: 'Top' },
        { text: 'Bottom', value: 'Bottom' }
    ];

    const toolbarTypeDropdown: DropDownList = new DropDownList({
        dataSource: toolbarTypeData,
        fields: { text: 'text', value: 'value' },
        value: 'Expanded',
        popupHeight: '200px',
        floatLabelType: 'Auto',
        change: (args: ChangeEventArgs) => {
            toolbarRTE.toolbarSettings.type = args.value as ToolbarType;
            toolbarRTE.dataBind();
        }
    });
    toolbarTypeDropdown.appendTo('#toolbarType');

    const toolbarPositionDropdown: DropDownList = new DropDownList({
        dataSource: toolbarPositionData,
        fields: { text: 'text', value: 'value' },
        value: 'Top',
        popupHeight: '150px',
        floatLabelType: 'Auto',
        change: (args: ChangeEventArgs) => {
            toolbarRTE.toolbarSettings.position = args.value as ToolbarPosition;
            toolbarRTE.dataBind();
        }
    });
    toolbarPositionDropdown.appendTo('#toolbarPosition');

    const float: CheckBox = new CheckBox({
        checked: true,
        label: 'Enable Floating',
        change: (args: ChangeEventArgs) => {
            toolbarRTE.toolbarSettings.enableFloating = (args as any).checked;
            toolbarRTE.dataBind();
        }
    });
    float.appendTo('#float');
};
