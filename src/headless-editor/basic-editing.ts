import { loadCultureFiles } from '../common/culture-loader';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DropDownButton, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { HeadlessEditor, basicExtensions } from '@syncfusion/ej2-headless-editor';

(window as any).default = (): void => {
    loadCultureFiles();
    const content: string = `<h3>Headless Editor Demo</h3><p>This demo showcases the supported text formatting and block formatting options.</p><h2>Text Formatting</h3><p>This text demonstrates <strong>bold formatting</strong>, <em>italic formatting</em>, <u>underlined text</u>, and <s>strikethrough text</s>.</p><p>You can also add <code>inline code</code> within a paragraph.</p><h3>Paragraph Styles</h3><p>Use the Text Style dropdown to convert content between paragraphs and different heading levels.</p><hr><h3>Blockquote</h3><blockquote><p>A blockquote is useful for highlighting important information, references, or quoted content.</p></blockquote></ul><h2>Ordered List</h2><ol style="list-style-type: decimal;"><li><p>Create a document</p></li><li><p>Add and format content</p></li><li><p>Review the document</p></li></ol><h2>Bullet List</h2><ul style="list-style-type: disc;"><li><p>Simple and easy to scan</p></li><li><p>Useful for features and highlights</p></li><li><p>Supports multiple items</p></li></ul>`;

    const headlessEditor: HeadlessEditor = HeadlessEditor.create({
        content: content,
        autofocus: 'start',
        extensions: [basicExtensions]
    });
    const container = document.getElementById('headless-editor');
    const bulletListTypeItems: { id: string; text: string; value: string }[] = [
        { id: 'bullet-list-disc', text: 'Disc', value: 'disc' },
        { id: 'bullet-list-circle', text: 'Circle', value: 'circle' },
        { id: 'bullet-list-square', text: 'Square', value: 'square' }
    ];
    const orderedListTypeItems: { id: string; text: string; value: string }[] = [
        { id: 'ordered-list-decimal', text: 'Decimal', value: 'decimal' },
        { id: 'ordered-list-lower-alpha', text: 'Lower Alpha', value: 'lower-alpha' },
        { id: 'ordered-list-upper-alpha', text: 'Upper Alpha', value: 'upper-alpha' },
        { id: 'ordered-list-lower-roman', text: 'Lower Roman', value: 'lower-roman' },
        { id: 'ordered-list-upper-roman', text: 'Upper Roman', value: 'upper-roman' },
        { id: 'ordered-list-lower-greek', text: 'Lower Greek', value: 'lower-greek' }
    ];
    const toolbarItems = [
        /* Text formatting */
        { id: 'undo', prefixIcon: 'e-icons e-undo', disabled: true, tooltipText: 'Undo (Ctrl+Z)', align: 'Left' },
        { id: 'redo', prefixIcon: 'e-icons e-redo', disabled: true, tooltipText: 'Redo (Ctrl+Y)', align: 'Left' },
        { id: 'bold', prefixIcon: 'e-icons e-bold', tooltipText: 'Bold (Ctrl+B)', align: 'Left' },
        { id: 'italic', prefixIcon: 'e-icons e-italic', tooltipText: 'Italic (Ctrl+I)', align: 'Left' },
        { id: 'underline', prefixIcon: 'e-icons e-underline', tooltipText: 'Underline (Ctrl+U)', align: 'Left' },
        { id: 'strikethrough', prefixIcon: 'e-icons e-strikethrough', tooltipText: 'Strike Through', align: 'Left' },
        { id: 'inlineCode', prefixIcon: 'e-icons e-insert-code', tooltipText: 'Inline Code (Ctrl+`)', align: 'Left' },
        {
            id: 'paragraph', type: 'Button', align: 'Left', tooltipText: 'Formats',
            template: new DropDownButton({
                content: 'Formats',
                cssClass: 'e-headless-dropdown',
                items: [
                    { id: 'format-paragraph', text: 'Paragraph' },
                    { id: 'format-h1', text: 'Heading 1' },
                    { id: 'format-h2', text: 'Heading 2' },
                    { id: 'format-h3', text: 'Heading 3' },
                    { id: 'format-h4', text: 'Heading 4' }
                ],
                select: (args: any): void => {
                    switch (args.item.id) {
                        case 'format-paragraph':
                            headlessEditor.commands.setParagraph();
                            break;
                        default: {
                            const level: number = Number(args.item.id.replace('format-h', ''));
                            headlessEditor.commands.setHeading({ level });
                            break;
                        }
                    }
                    refresh();
                },
        close: (): void => {
            headlessEditor.focusView();
        }
            })
        },
        { id: 'horizontalRule', prefixIcon: 'e-icons e-horizontal-line', tooltipText: 'Horizontal Line', align: 'Left' },
        { id: 'blockquote', prefixIcon: 'e-icons e-blockquote', tooltipText: 'Blockquote (Ctrl+Alt+Q)', align: 'Left' },
        { id: 'codeBlock', prefixIcon: 'e-icons e-preformat-code', tooltipText: 'Code Block (Ctrl+Alt+C)', align: 'Left' },
        {
            id: 'orderedList', type: 'Button', align: 'Left', tooltipText: 'Numbered List',
            template: new SplitButton({
                iconCss: 'e-icons e-list-ordered',
                cssClass: 'e-headless-dropdown',
                items: orderedListTypeItems.map((item): { id: string; text: string } => ({ id: item.id, text: item.text })),
                click: (): void => {
                    if (headlessEditor.can().toggleOrderedList()) {
                        headlessEditor.commands.toggleOrderedList();
                    }
                    refresh();
                },
                select: (args: any): void => {
                    const id: string = args.item?.id;
                    const value: string | undefined = orderedListTypeItems.find((i): boolean => i.id === id)?.value;
                        if (value && headlessEditor.can().toggleOrderedList({ listStyleType: value })) {
                            headlessEditor.commands.toggleOrderedList({ listStyleType: value });
                        }
                    refresh();
                },
                close: (): void => {
                    headlessEditor.focusView();
                }
            })
        },
        {
            id: 'bulletList', type: 'Button', align: 'Left', tooltipText: 'Bulleted List',
            template: new SplitButton({
                iconCss: 'e-icons e-list-unordered',
                cssClass: 'e-headless-dropdown',
                items: bulletListTypeItems.map((item): { id: string; text: string } => ({ id: item.id, text: item.text })),
                click: (): void => {
                    if (headlessEditor.can().toggleBulletList()) {
                        headlessEditor.commands.toggleBulletList();
                    }
                    refresh();
                },
                select: (args: any): void => {
                    const id: string = args.item?.id;
                    const value: string | undefined = bulletListTypeItems.find((i): boolean => i.id === id)?.value;
                    if (value && headlessEditor.can().toggleBulletList({ listStyleType: value })) {
                        headlessEditor.commands.setBulletListType({ listStyleType: value });
                    }
                    refresh();
                },
                close: (): void => {
                    headlessEditor.focusView();
                }
            })
        },
        { id: 'taskList', prefixIcon: 'e-icons e-checklist', tooltipText: 'Task List', align: 'Left' }
    ] as any;

    //Toolbar
    const toolbar = new Toolbar({
        items: toolbarItems,
        width: '100%',
        overflowMode: 'MultiRow',
        clicked: (args: any): void => {
            switch (args.item.id) {
                case 'undo':
                    headlessEditor.commands.undo();
                    break;
                case 'redo':
                    headlessEditor.commands.redo();
                    break;
                case 'bold':
                    if (headlessEditor.can().toggleBold()) { headlessEditor.commands.toggleBold(); }
                    break;
                case 'italic':
                    if (headlessEditor.can().toggleItalic()) { headlessEditor.commands.toggleItalic(); }
                    break;
                case 'underline':
                    headlessEditor.commands.toggleUnderline();
                    break;
                case 'strikethrough':
                    headlessEditor.commands.toggleStrikethrough();
                    break;
                case 'inlineCode':
                    headlessEditor.commands.toggleCodeMark();
                    break;
                case 'taskList':
                    headlessEditor.commands.toggleTaskList();
                    break;
                case 'blockquote':
                    headlessEditor.commands.toggleBlockQuote();
                    break;
                case 'codeBlock':
                    headlessEditor.commands.toggleCodeBlock();
                    break;
                case 'horizontalRule':
                    headlessEditor.commands.setHorizontalRule();
                    break;
                case 'paragraph':
                    break;
            }
            if (args.item.id != 'undo' && args.item.id != 'redo')
                refresh();
        }
    });
    toolbar.appendTo('#toolbar');
    if (!document.getElementById('toolbar-editor-spacing')) {
        const spacingStyle: HTMLStyleElement = document.createElement('style');
        spacingStyle.id = 'toolbar-editor-spacing';
        document.head.appendChild(spacingStyle);
    }
    new Tooltip({ target: '.e-toolbar-item:not(.e-separator)', position: 'BottomCenter', showTipPointer: true }).appendTo('#toolbar');
    function refresh(): void {
        if (!headlessEditor) {
            return;
        }
        const activeMarks: Set<string> = headlessEditor.getActiveMarks();
        const markButtonMap: Record<string, string> = {
            'bold': 'bold',
            'italic': 'italic',
            'underline': 'underline',
            'strikethrough': 'strikethrough',
            'inlineCode': 'code',
        };
        const blockButtonMap: Record<string, string> = {
            'blockquote': 'blockquote',
        };
        const updateButtonState: (itemId: string, isActive: boolean) => void =
            (itemId: string, isActive: boolean): void => {
                const btn: Element | null = document.querySelector(`.e-toolbar button[id="${itemId}"]`);
                if (!btn) {
                    return;
                }
                const toolbarItem: HTMLElement | null = btn.closest('.e-toolbar-item') as HTMLElement | null;
                if (!toolbarItem) {
                    return;
                }
                toolbarItem.classList.toggle('e-active', isActive);
            };
        for (const itemId of Object.keys(markButtonMap)) {
            const markName: string = markButtonMap[itemId];
            const isActive: boolean = activeMarks.has(markName);
            updateButtonState(itemId, isActive);
        }
    }

    if (container) {
        headlessEditor.mount(container);
        container.addEventListener('mouseup', refresh);
        container.addEventListener('keyup', refresh);
        container.addEventListener('click', refresh);
        headlessEditor.on("selectionChanged", refresh);
        headlessEditor.on("documentChanged", (): void => {
                if (toolbar && toolbar.items) {
                    const cmds: any = headlessEditor?.can?.();
                    if (cmds) {
                        const undoItem: any = toolbar.items.find((item: any) => item.id === 'undo');
                        const redoItem: any = toolbar.items.find((item: any) => item.id === 'redo');
                        if (undoItem) { undoItem.disabled = !cmds.undo(); }
                        if (redoItem) { redoItem.disabled = !cmds.redo(); }
                    }
                }
            }
        );
    }
};