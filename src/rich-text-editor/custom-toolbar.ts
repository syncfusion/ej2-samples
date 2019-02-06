import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor default sample
 */
import { RichTextEditor, Toolbar, Link, NodeSelection, Image, QuickToolbar, HtmlEditor } from '@syncfusion/ej2-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
RichTextEditor.Inject(Toolbar, Link, Image, QuickToolbar, HtmlEditor);

/* tslint:disable */
(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
                'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
                {
                    tooltipText: 'Insert Symbol',
                    template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%"><div class="e-tbar-btn-text" style="font-weight: 500;"> &#937;</div></button>'
                }, '|', 'Undo', 'Redo'
            ]
        },
        created: onCreate,
        actionComplete: onActionComplete
    });
    defaultRTE.appendTo('#defaultRTE');
    let selection: NodeSelection = new NodeSelection();
    let ranges: Range;


    function onActionComplete(args: any): void {
        if (args.requestType === 'SourceCode') {
            defaultRTE.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        } else if (args.requestType === 'Preview') {
            defaultRTE.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    }

    function onCreate(): void {
        let customBtn: HTMLElement = defaultRTE.element.querySelector('#custom_tbar') as HTMLElement;
        let dialogCtn: HTMLElement = document.getElementById('rteSpecial_char');
        // Initialization of Dialog
        let dialog: Dialog = new Dialog({
            header: 'Special Characters',
            content: dialogCtn,
            target: document.getElementById('rteSection'),
            showCloseIcon: false,
            isModal: true,
            height: 'auto',
            overlayClick: dialogOverlay,
            buttons: [{ buttonModel: { content: "Insert", isPrimary: true }, click: onInsert }, { buttonModel: { content: 'Cancel' }, click: dialogOverlay }]
        });
        // Render initialized Dialog
        dialog.appendTo('#customTbarDialog');
        dialog.hide();
        customBtn.onclick = (e: Event) => {
            dialog.element.style.display = '';
            ranges = selection.getRange(document);
            dialog.width = defaultRTE.element.offsetWidth * 0.5;
            dialog.dataBind();
            dialog.show();
            let dialogCtn: HTMLElement = document.getElementById('rteSpecial_char');
            dialogCtn.onclick = (e: Event) => {
                let target: HTMLElement = e.target as HTMLElement;
                let activeEle: any = dialog.element.querySelector('.char_block.e-active');
                if (target.classList.contains('char_block')) {
                    target.classList.add('e-active');
                    if (activeEle) {
                        activeEle.classList.remove('e-active');
                    }
                }
            };
            customBtn.onclick = (e: Event) => {
                defaultRTE.focusIn();
                dialog.element.style.display = '';
                ranges = selection.getRange(document);
                dialog.width = defaultRTE.element.offsetWidth * 0.5;
                dialog.dataBind();
                dialog.show();
            };
        }

        function onInsert(): void {
            let activeEle: any = dialog.element.querySelector('.char_block.e-active');
            if (activeEle) {
                if (defaultRTE.formatter.getUndoRedoStack().length === 0) {
                    defaultRTE.formatter.saveData();
                }
                ranges.insertNode(document.createTextNode(activeEle.textContent));
                defaultRTE.formatter.saveData();
                (defaultRTE as any).formatter.enableUndo(defaultRTE);
            }
            dialogOverlay();
        }

        function dialogOverlay(): void {
            let activeEle: any = dialog.element.querySelector('.char_block.e-active');
            if (activeEle) {
                activeEle.classList.remove('e-active');
            }
            dialog.hide();
        }
    }
};

/* tslint:enable */
