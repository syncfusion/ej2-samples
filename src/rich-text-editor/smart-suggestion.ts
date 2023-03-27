import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor smart suggestion
 */
import { RichTextEditor, Toolbar, Link, Image, Table, Audio, Video, HtmlEditor, QuickToolbar, NodeSelection, DialogType } from '@syncfusion/ej2-richtexteditor';
import { Mention, SelectEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
RichTextEditor.Inject(Toolbar, Link, Image, Table, Audio, Video, HtmlEditor, QuickToolbar);
 
(window as any).default = (): void => {
    loadCultureFiles();
 
     let formatList: { [key: string]: Object }[] = [
        { formatName: "Text", command: "P", formatType: "Basic blocks", icon: "e-btn-icon e-text e-icons", description: "Writing with paragraphs"},
        { formatName: "Quotation", command: "BlockQuote", formatType: "Basic blocks", icon: "e-icons block-view", description: "Insert a quote or citation" },
        { formatName: "Heading 1", command: "H1", formatType: "Basic blocks", icon: "e-icons h1-view", description: "Use this for a top level heading"},
        { formatName: "Heading 2", command: "H2", formatType: "Basic blocks", icon: "e-icons h2-view", description: "Use this for key sections"},
        { formatName: "Heading 3", command: "H3", formatType: "Basic blocks", icon: "e-icons h3-view",description: "Use this for sub sections and group headings" },
        { formatName: "Heading 4", command: "H4", formatType: "Basic blocks", icon: "e-icons h4-view", description: "Use this for deep headings"},
        { formatName: "Numbered list", command: "OL", formatType: "Basic blocks", icon: "e-icons e-list-ordered icon", description: "Create an ordered list"},
        { formatName: "Bulleted list", command: "UL", formatType: "Basic blocks", icon: "e-icons e-list-unordered icon", description: "Create an unordered list"},
        { formatName: "Table", command: "CreateTable", formatType: "Basic blocks",icon: "e-icons e-table icon", description: "Insert a table"},
        { formatName: "Emoji", command: "Emoji", formatType: "Inline", icon: "e-icons emoji",description: "Use emojis to express ideas and emoticons"},
        { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
        { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
        { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"},
     ];

    let mentionObj: Mention;
    let saveSelection: NodeSelection;
    let selection: NodeSelection = new NodeSelection();
 
    let formatRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
                'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
                'Outdent', 'Indent', '|', 'CreateTable', 'CreateLink', 'Image',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        },
        placeholder: 'Type "/" and choose format.',
        actionBegin: (args) => {
            if (args.requestType === 'EnterAction') {
                if (mentionObj.element.classList.contains("e-popup-open")) {
                    args.cancel = true;
                }
            }
        }
    });
    formatRTE.appendTo('#MentionInlineFormat');

    // begins the process of inserting emoticons.

    let dialogContent: string = '<div id="emoji"></div>';
    let dialog: Dialog = new Dialog({
        header: 'Custom Emoticons',
        content: dialogContent,
        target: document.getElementById('mentionFormatIntegration'),
        isModal: true,
        width: '43%',
        visible: false,
        overlayClick: dialogOverlay,
        buttons: [
            { buttonModel: { content: 'Insert', isPrimary: true }, click: onInsert },
            { buttonModel: { content: 'Cancel' }, click: dialogOverlay }
        ],
        created: onDialogCreate,
        open: onOpen
    });
    dialog.appendTo('#emojiDialog');

    function dialogOverlay(): void {
        let activeElement: HTMLElement = dialog.element.querySelector('.char_block.e-active');
        if (activeElement) {
            activeElement.classList.remove('e-active');
        }
        dialog.hide();
    }

    function onOpen() {
        let emojiElement : HTMLElement = document.getElementById("rteEmoticons-smiley");
        if(!emojiElement.children[0].classList.contains('e-active')){
            emojiElement.children[0].classList.add('e-active');
        }
    }

    function beforeApplyFormat(isBlockFormat: boolean) {      
        let range1: Range = formatRTE.getRange();
        let node: Node = formatRTE.formatter.editorManager.nodeSelection.getNodeCollection(range1)[0];
        let blockNewLine = !(node.parentElement.innerHTML.replace(/&nbsp;|<br>/g, '').trim() == '/' || node.textContent.trim().indexOf('/')==0);
        let blockNode: Node;
        let startNode:Node = node;
        if (blockNewLine && isBlockFormat) {
            while (startNode != formatRTE.inputElement) {
                blockNode = startNode;
                startNode = startNode.parentElement;
            }           
        }          
        let startPoint = range1.startOffset;
        while(formatRTE.formatter.editorManager.nodeSelection.getRange(document).toString().indexOf("/") ==-1 ){
            formatRTE.formatter.editorManager.nodeSelection.setSelectionText(document, node, node, startPoint, range1.endOffset);
            startPoint--;
        }
        let range2: Range = formatRTE.getRange();
        let node2: Node = formatRTE.formatter.editorManager.nodeCutter.GetSpliceNode(range2, node as HTMLElement);
        let previouNode: Node = node2.previousSibling;
        node2.parentNode.removeChild(node2);
        if(blockNewLine && isBlockFormat){
            let defaultTag: HTMLElement = document.createElement('p');
            defaultTag.innerHTML = '</br>';
            blockNode.parentNode.insertBefore(defaultTag, blockNode.nextSibling);
            selection.setCursorPoint(document, blockNode.nextSibling as Element, 0);
        } else if(previouNode) {
            selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
        }
    }

    function onInsert(): void {
        let activeElement: HTMLElement = dialog.element.querySelector('.char_block.e-active');
        if (activeElement) {
            if (formatRTE.formatter.getUndoRedoStack().length === 0) {
                formatRTE.formatter.saveData();
            }
            beforeApplyFormat(false);
            let range: Range =formatRTE.getRange();
            selection.setCursorPoint(document, range.startContainer as Element, range.startOffset);
            formatRTE.executeCommand('insertText', activeElement.textContent);
            formatRTE.formatter.saveData();
            formatRTE.formatter.enableUndo(formatRTE);
        }
        dialogOverlay();
    }

    function onDialogCreate(): void {
        let dialogContent: HTMLElement = document.getElementById('emojiDialog');
        dialogContent.onclick = (e: MouseEvent) => {
            let target: Element = e.target as Element;
            let activeElement: HTMLElement = dialog.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeElement) {
                    activeElement.classList.remove('e-active');
                }
            }
        };
    }

    // End the process of inserting emoticons.


    // Initialize Mention control.
    
    mentionObj = new Mention({
        popupHeight: '290px',
        popupWidth: '320px',
        dataSource: formatList,
        mentionChar : '/',
        itemTemplate:'<table class="format-table"><tr><td><span id="icons" class="${icon}"></td><td><span class="font">${formatName}</span><span class="description">${description}</span></td></tr></table>',
        fields: { text: 'formatName', groupBy: 'formatType' },
        target: formatRTE.inputElement,
        allowSpaces: true,
        beforeOpen: function () {
            saveSelection = selection.save(selection.getRange(document), document);
        },
        filtering: function () {
            saveSelection = selection.save(selection.getRange(document), document);
        },
        select: applyCommand
    });
    mentionObj.appendTo('#mentionEditor');

    function  applyCommand(args: SelectEventArgs ){
        args.cancel = true;
        formatRTE.focusIn();
        saveSelection.restore();
        if (!((args.itemData as  { [key: string]: Object }).formatType == 'Inline')) {
            beforeApplyFormat(true);
        }
        if ((args.itemData as  { [key: string]: Object }).command == 'OL') {
            formatRTE.executeCommand('insertOrderedList');
        }
        else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
            formatRTE.executeCommand('insertUnorderedList');
        }
        else if ((args.itemData as  { [key: string]: Object }).command == 'CreateTable') {
            mentionObj.hidePopup();
            formatRTE.showDialog(DialogType.InsertTable);
        }
        else if ((args.itemData as  { [key: string]: Object }).command == 'Image') {
            mentionObj.hidePopup();
            formatRTE.showDialog(DialogType.InsertImage);
        }
        else if ((args.itemData as  { [key: string]: Object }).command == 'Audio') {
            mentionObj.hidePopup();
            formatRTE.showDialog(DialogType.InsertAudio);
        }
        else if ((args.itemData as  { [key: string]: Object }).command == 'Video') {
            mentionObj.hidePopup();
            formatRTE.showDialog(DialogType.InsertVideo);
        }
        else if ((args.itemData as  { [key: string]: Object }).command == 'Emoji') {
            dialog.element.style.display = 'block';
            mentionObj.hidePopup();
            dialog.show();
        }
        else {
            formatRTE.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
        }
    } 
}
