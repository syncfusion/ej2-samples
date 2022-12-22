import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor insert emoticons sample
 */
import { RichTextEditor, Toolbar, Link, NodeSelection, Image, QuickToolbar, HtmlEditor } from '@syncfusion/ej2-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { Tab } from '@syncfusion/ej2-navigations';
RichTextEditor.Inject(Toolbar, Link, Image, QuickToolbar, HtmlEditor);

//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let tabObj: Tab = undefined;
    let selection: NodeSelection = new NodeSelection();
    let range: Range;
    let dialog: Dialog;
    let customBtn: any;
    let dialogCtn: any;
    let saveSelection: NodeSelection;
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
                'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
                {
                    tooltipText: 'Insert Emoticon',
                    template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="emot_tbar"  style="width:100%">'
                    + '<div class="e-tbar-btn-text" style="font-weight: 500;">&#128578;</div></button>'
                }, '|', 'Undo', 'Redo'
            ]

        },
        created: onCreate,
        actionComplete: onActionComplete
    });
    defaultRTE.appendTo('#defaultRTE');

    function onActionComplete(args: any): void {
        if (args.requestType === 'SourceCode') {
            defaultRTE.getToolbar().querySelector('#emot_tbar').parentElement.classList.add('e-overlay');
        } else if (args.requestType === 'Preview') {
            defaultRTE.getToolbar().querySelector('#emot_tbar').parentElement.classList.remove('e-overlay');
        }
    }

    function onCreate(): void {
        customBtn = defaultRTE.element.querySelector('#emot_tbar') as HTMLElement;
        dialogCtn = '<div id="emotIcons"></div>';
        // Initialization of Dialog
        dialog = new Dialog({
            header: 'Custom Emoticons',
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
            open: onOpen
        });
        // Render initialized Dialog
        dialog.appendTo('#emoticonTbarDialog');
        dialog.hide();

        customBtn.onclick = () => {
            (defaultRTE.contentModule.getEditPanel() as HTMLElement).focus();
            dialog.element.style.display = '';
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialog.show();
        };
    }
    function createTab(): void {
        tabObj = new Tab({
          items: [
            {
              header: { 'text': '&#128578;' },
              content: '#rteEmoticons-smiley'
            },
            {
              header: { 'text': '&#128053;' },
              content: '#rteEmoticons-animal'
            }
          ]
        });
        //Render initialized Tab component
        tabObj.appendTo('#emotIcons');
    }

    function onOpen(): void {
        if (tabObj) {
            tabObj.refresh();
        }
    }
    function onDialogCreate(): void {
        createTab();
        let dialogCtn: HTMLElement = document.getElementById('emoticonTbarDialog');
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
