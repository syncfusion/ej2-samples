import { loadCultureFiles } from '../common/culture-loader';
import { BeforeDialogCloseEventArgs, BeforeDialogOpenEventArgs, BeforeFileDropEventArgs, BeforeFileUploadEventArgs, BlurEventArgs, ChangeEventArgs, FocusEventArgs, RichTextEditorUI, SlashCommandItemSelectArgs, SlashCommand} from '@syncfusion/ej2-richtexteditor-ui';
import { Button } from '@syncfusion/ej2-buttons';
import { ActionCompleteEventArgs ,ActionBeginEventArgs } from '@syncfusion/ej2-richtexteditor-ui/src/controller/interface';
import { ToolbarItemClickedEventArgs } from '@syncfusion/ej2-richtexteditor-ui/src/richtexteditor-ui/model/toolbar-settings';

RichTextEditorUI.Inject(SlashCommand);

(window as any).default = (): void => {
    loadCultureFiles();
    const editor: RichTextEditorUI = new RichTextEditorUI({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'FontColor', 'BackgroundColor', '|', 'FontName', 'FontSize', '|', 'Table' , 'Image' , 'Link', '|', 'Formats', 'Alignment', 'NumberFormatList', 'BulletFormatList', '|', 'Undo', 'Redo'],
            itemClicked:itemClick,
        },
        slashCommandSettings: {
            enable: true,
            itemSelect: slashCommanditemSelect
        },
        created: create,
        destroyed: destroyed,
        focus: focus,
        blur: blur,
        actionBegin: actionBegin,
        actionComplete: actionComplete,
        change: change,
        beforeDialogOpen: beforeDialogOpen,
        beforeDialogClose: beforeDialogClose,
        beforeFileUpload: beforeFileUpload,
        beforeFileDrop: beforeFileDrop,
    });
    editor.appendTo('#defaultRTE');

    const clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };

    function appendElement(html: string): void {
        const span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        const log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }

    function create(): void {
        appendElement('Rich Text Editor UI <b>create</b> event called<hr>');
    }

    function destroyed(): void {
        appendElement('Rich Text Editor UI <b>destroyed</b> event called<hr>');
    }

    function focus(args: FocusEventArgs): void {
        appendElement('Rich Text Editor UI <b>focus</b> event called<hr>');
    }

    function blur(args: BlurEventArgs): void {
        appendElement('Rich Text Editor UI <b>blur</b> event called<hr>');
    }

    function actionBegin(args: ActionBeginEventArgs): void {
        appendElement('<b>' + args.action + '</b> action is called<hr>');
    }

    function actionComplete(args: ActionCompleteEventArgs): void {
        appendElement('<b>' + args.action + '</b> action is completed<hr>');
    }

    function change(args: ChangeEventArgs): void {
        appendElement('Rich Text Editor UI <b>change</b> event called<hr>');
    }

    function itemClick(args: ToolbarItemClickedEventArgs): void {
        appendElement('Rich Text Editor UI <b>toolbar click</b> event called (itemId: ' + args.item?.id + ')<hr>');
    }

    function beforeDialogOpen(args: BeforeDialogOpenEventArgs): void {
        appendElement('Rich Text Editor UI <b>beforeDialogOpen</b> event called <hr>');
    }

    function beforeDialogClose(args: BeforeDialogCloseEventArgs): void {
        appendElement('Rich Text Editor UI <b>beforeDialogClose</b> event called <hr>');
    }

    function beforeFileUpload(args: BeforeFileUploadEventArgs): void {
        appendElement('Rich Text Editor UI <b>beforeFileUpload</b> event called<hr>');
    }

    function beforeFileDrop(args: BeforeFileDropEventArgs): void {
        appendElement('Rich Text Editor UI <b>beforeFileDrop</b> event called<hr>');
    }

    function slashCommanditemSelect(args: SlashCommandItemSelectArgs): void {
        appendElement('Rich Text Editor UI <b>slashCommanditemSelect</b> event called<hr>');
    }
};