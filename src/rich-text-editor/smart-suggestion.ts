import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor smart suggestion
 */
import { RichTextEditor, Toolbar, Link, Image, Table, Audio, Video, HtmlEditor, QuickToolbar, NodeSelection, DialogType,EmojiPicker } from '@syncfusion/ej2-richtexteditor';
import { Mention, SelectEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
RichTextEditor.Inject(Toolbar, Link, Image, Table, Audio, Video, HtmlEditor, QuickToolbar, EmojiPicker);
 
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
        { formatName: "Emoji picker", command: "EmojiPicker", formatType: "Inline", icon: "e-icons e-emoji icon",description: "Use emojis to express ideas and emoticons"},
        { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
        { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
        { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"},
     ];

    let mentionObj: Mention;
    let saveSelection: NodeSelection;
    let selection: NodeSelection = new NodeSelection();
 
    let formatRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
                '|', 'EmojiPicker', '|',
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


    function beforeApplyFormat() {
        let currentRange: Range = formatRTE.getRange();
        let node: Node = formatRTE.formatter.editorManager.nodeSelection.getNodeCollection(currentRange)[0];
    
        let startPoint = currentRange.startOffset;
        while (formatRTE.formatter.editorManager.nodeSelection.getRange(document).toString().indexOf('/') == -1) {
            formatRTE.formatter.editorManager.nodeSelection.setSelectionText(document, node, node, startPoint, currentRange.endOffset);
            startPoint--;
        }
        let slashRange: Range = formatRTE.getRange();
        let slashNode: Node = formatRTE.formatter.editorManager.nodeCutter.GetSpliceNode(slashRange, node as HTMLElement);
        let previouNode: Node = slashNode.previousSibling;
        if (slashNode.parentElement && slashNode.parentElement.innerHTML.length === 1) {
            slashNode.parentElement.appendChild(document.createElement('br'));
        }
        slashNode.parentNode.removeChild(slashNode);
        if (previouNode) {
            selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
        }
    }

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
        const itemData = args.itemData as { [key: string]: Object };
        const { command, formatType } = itemData;
        if (!(formatType === 'Inline')) {
            beforeApplyFormat();
        }
        switch (command) {
            case 'OL':
                formatRTE.executeCommand('insertOrderedList');
                break;
            case 'UL':
                formatRTE.executeCommand('insertUnorderedList');
                break;
            case 'CreateTable':
            case 'Image':
            case 'Audio':
            case 'Video':
                mentionObj.hidePopup();
                formatRTE.showDialog(command === 'Video'? DialogType.InsertVideo: command === 'Audio'
                    ? DialogType.InsertAudio: command === 'Image'? DialogType.InsertImage: DialogType.InsertTable);
                break;
            case 'EmojiPicker':
                beforeApplyFormat();
                mentionObj.hidePopup();
                formatRTE.showEmojiPicker();
                break;
            default:
                formatRTE.executeCommand('formatBlock', command);
                break;
        }
    } 
};
