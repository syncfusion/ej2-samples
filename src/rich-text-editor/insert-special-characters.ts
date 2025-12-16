import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor insert special characters sample
 */
import { RichTextEditor, Toolbar, Link, NodeSelection, Image, QuickToolbar, HtmlEditor, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
RichTextEditor.Inject(Toolbar, Link, Image, QuickToolbar, HtmlEditor, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat);

(window as any).default = (): void => {
    loadCultureFiles();
    let selection: NodeSelection = new NodeSelection();
    let range: Range;
    let dialog: Dialog;
    let customBtn: any;
    let dialogCtn: any;
    let saveSelection: NodeSelection;
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList',
                'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
                {
                    tooltipText: 'Insert Symbol',
                    template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">'
                    + '<div class="e-tbar-btn-text" style="font-weight: 400;"> &#937;</div></button>'
                }, '|', 'Undo', 'Redo'
            ]

        },
        created: onCreate,
        actionComplete: onActionComplete
    });
    defaultRTE.appendTo('#defaultRTE');

    function onActionComplete(args: any): void {
        if (args.requestType === 'SourceCode') {
            defaultRTE.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        } else if (args.requestType === 'Preview') {
            defaultRTE.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    }

    function onCreate(): void {
        customBtn = defaultRTE.element.querySelector('#custom_tbar') as HTMLElement;
        dialogCtn = document.getElementById('rteSpecial_char');
        // Initialization of Dialog
        dialog = new Dialog({
            header: 'Special Characters',
            content: dialogCtn,
            target: document.getElementById('rteSection'),
            showCloseIcon: false,
            isModal: true,
            width: '45%',
            height: 'auto',
            visible: false,
            overlayClick: dialogOverlay,
            buttons: [
                { buttonModel: { content: 'Insert', isPrimary: true }, click: onInsert },
                { buttonModel: { content: 'Cancel' }, click: dialogOverlay }
            ],
            created: onDialogCreate,
        });
        // Render initialized Dialog
        dialog.appendTo('#customTbarDialog');
        dialog.hide();

        customBtn.onclick = () => {
            (defaultRTE.contentModule.getEditPanel() as HTMLElement).focus();
            dialog.element.style.display = '';
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialog.show();
        };
    }

    function onDialogCreate(): void {
        let dialogCtn: HTMLElement = document.getElementById('rteSpecial_char');
        dialogCtn.onclick = (e: MouseEvent) => {
            let target: Element = e.target as Element;
            let activeEle: HTMLElement = dialog.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }

    function onInsert(): void {
        let activeEle: HTMLElement = dialog.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (defaultRTE.formatter.getUndoRedoStack().length === 0) {
                defaultRTE.formatter.saveData();
            }
            saveSelection.restore();
            defaultRTE.executeCommand('insertText', activeEle.textContent);
            defaultRTE.formatter.saveData();
            defaultRTE.formatter.enableUndo(defaultRTE);
        }
        dialogOverlay();
    }

    function dialogOverlay(): void {
        let activeEle: HTMLElement = dialog.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        dialog.hide();
    }
};