import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { Dialog } from '@syncfusion/ej2-popups';

(window as any).default = (): void => {
    loadCultureFiles();
    let range: Range;
    let dialog: Dialog;
    let customBtn: any;
    let dialogCtn: any;
    let saveSelection: Range;
    let defaultRTE: RichTextEditorUI = new RichTextEditorUI({
        value: '<p style="margin-right:10px">The custom command "insert special character" is configured as the last item of the toolbar. Click on the command and choose the special character you want to include from the popup.</p>',
        valueFormat: 'html',
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', 'NumberFormatList',
                'BulletFormatList', '|', 'Link', 'Image', '|',
                {
                    id: 'custom_tbar',
                    tooltipText: 'Insert Symbol',
                    actionId: 'insertSymbol',
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
            defaultRTE.toolbarModule.element.querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        } else if (args.requestType === 'Preview') {
            defaultRTE.toolbarModule.element.querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
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
            defaultRTE.focusIn();
            dialog.element.style.display = '';
            let sel: Selection = window.getSelection();
            if (sel && sel.rangeCount > 0) {
                range = sel.getRangeAt(0);
            }
            saveSelection = range ? range.cloneRange() : null;
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
    const activeEle: HTMLElement = dialog.element.querySelector('.char_block.e-active');
        if (activeEle && saveSelection && defaultRTE.inputElement) {
            defaultRTE.focusIn();
            const select: Selection = window.getSelection();
            select.removeAllRanges();
            select.addRange(saveSelection);
            (defaultRTE as any).baseEditorCore.editor.commands.insertText(
                activeEle.textContent
            );
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