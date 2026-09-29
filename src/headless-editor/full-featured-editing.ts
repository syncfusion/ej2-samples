import { loadCultureFiles } from '../common/culture-loader';
import { Toolbar, Menu } from '@syncfusion/ej2-navigations';
import { Dialog, Tooltip } from '@syncfusion/ej2-popups';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DropDownButton, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { ColorPicker, PaletteTileEventArgs } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import {
    HeadlessEditor, boldExtension, italicExtension, underlineExtension, strikethroughExtension, inlineCodeExtension, clearFormattingExtension,
    paragraphExtension, headingExtension, superscriptExtension, subscriptExtension, toUpperCaseExtension, toLowerCaseExtension,
    fontColorExtension, backgroundColorExtension, listExtension, taskListExtension, undoRedoExtension, linkExtension, blockquoteExtension, calloutExtension, collapsibleExtension,
    horizontalRuleExtension, tableExtension, fontSizeExtension, fontFamilyExtension, placeholderExtension, textAlignExtension,
    imageExtension, hardBreakExtension, codeBlockExtension, indentOutdentExtension,
} from '@syncfusion/ej2-headless-editor';
import * as data from './data/full-featured-editing.json';

(window as any).default = (): void => {
    loadCultureFiles();
    const headlessEditor = HeadlessEditor.create({
        document: data as any,
        autofocus: 'start',
        extensions: [
            boldExtension, italicExtension, underlineExtension, strikethroughExtension, inlineCodeExtension, clearFormattingExtension,
            paragraphExtension, headingExtension, superscriptExtension, subscriptExtension, toUpperCaseExtension, toLowerCaseExtension,
            fontColorExtension, backgroundColorExtension, listExtension, taskListExtension, undoRedoExtension, linkExtension, blockquoteExtension, calloutExtension, collapsibleExtension,
            horizontalRuleExtension, tableExtension, fontSizeExtension, fontFamilyExtension,
            placeholderExtension.configure({
                showOnlyWhenEditorEmpty: false,
                placeholder: (ctx: { nodeType: string }): string => {
                    const map: Record<string, string> = {
                        paragraph: 'Write anything...',
                        heading: 'Heading',
                        blockquote: 'Add a quote...',
                        callout: 'Add a note...',
                        collapsibleHeader: 'Toggle summary...',
                        collapsibleBody: 'Toggle content...',
                        codeBlock: 'Add code...',
                        listItem: 'List item',
                        taskItem: 'Task item'
                    };
                    return map[ctx.nodeType] ?? '';
                }
            }),
            textAlignExtension,
            imageExtension, hardBreakExtension, createDemoCodeBlockExtension(), indentOutdentExtension
        ] as any
    });
    const container = document.getElementById('headless-editor');
    headlessEditor.mount(container);
    const fontFamilyItems: { id: string; text: string; value: string }[] = [
        { id: 'font-family-default', text: 'Default', value: '' },
        { id: 'font-family-arial', text: 'Arial', value: 'Arial, sans-serif' },
        { id: 'font-family-calibri', text: 'Calibri', value: 'Calibri, sans-serif' },
        { id: 'font-family-georgia', text: 'Georgia', value: 'Georgia, serif' },
        { id: 'font-family-courier-new', text: 'Courier New', value: 'Courier New, monospace' },
        { id: 'font-family-times-new-roman', text: 'Times New Roman', value: 'Times New Roman, serif' },
        { id: 'font-family-verdana', text: 'Verdana', value: 'Verdana, sans-serif' }
    ];
    const fontSizeItems: { id: string; text: string; value: string }[] = [
        { id: 'font-size-default', text: 'Default', value: '' },
        { id: 'font-size-10', text: '10', value: '10px' },
        { id: 'font-size-12', text: '12', value: '12px' },
        { id: 'font-size-14', text: '14', value: '14px' },
        { id: 'font-size-16', text: '16', value: '16px' },
        { id: 'font-size-18', text: '18', value: '18px' },
        { id: 'font-size-24', text: '24', value: '24px' },
        { id: 'font-size-32', text: '32', value: '32px' },
        { id: 'font-size-48', text: '48', value: '48px' }
    ];
    const editorPaletteColors: string[] = [
        'transparent', '#d9d9d9', '#dc2626', '#b45309', '#8a6d00', '#4c2496', '#365c0b', '#216b3a', '#205f57',
        '#21636b', '#1f6074', '#315b8c', '#37599c', '#384b8f', '#55358f', '#6d2d8c', '#92266d', '#a62c42',
        '#9e3232', '#70491f', '#6d5728', '#4f5b20', '#455568', '#505356', '#303b52'
    ];
    const editorBackgroundPaletteColors: string[] = [
        '#FCE3E0', '#FFEDD4', '#EBF7D1', '#FFF7C7',
        '#DBF5E0', '#D6F5EB', '#D4F2F2', '#D4F0FA', '#DBEBFC', '#E0E5FC',
        '#E5E3FC', '#EDE0FC', '#F2E0FC', '#FAE0F2', '#FCE0E8', '#FCE0E3',
        '#F5EBDE', '#F7F2E0', '#F0F2DB', '#E5EBF0', '#EDEDED', '#E0E0E5',
        '#DEE0EB'
    ];
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
        /* History */
        { id: 'undo', prefixIcon: 'e-icons e-undo', disabled: true, tooltipText: 'Undo (Ctrl+Z)', align: 'Left' },
        { id: 'redo', prefixIcon: 'e-icons e-redo', disabled: true, tooltipText: 'Redo (Ctrl+Y)', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        /* Basic formatting */
        { id: 'bold', prefixIcon: 'e-icons e-bold', tooltipText: 'Bold (Ctrl+B)', align: 'Left' },
        { id: 'italic', prefixIcon: 'e-icons e-italic', tooltipText: 'Italic (Ctrl+I)', align: 'Left' },
        { id: 'underline', prefixIcon: 'e-icons e-underline', tooltipText: 'Underline (Ctrl+U)', align: 'Left' },
        { id: 'strikethrough', prefixIcon: 'e-icons e-strikethrough', tooltipText: 'Strike Through', align: 'Left' },
        { id: 'inlineCode', prefixIcon: 'e-icons e-insert-code', tooltipText: 'Inline Code (Ctrl+`)', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        /* Advanced formatting */
        { id: 'superscript', prefixIcon: 'e-icons e-superscript', tooltipText: 'Superscript', align: 'Left' },
        { id: 'subscript', prefixIcon: 'e-icons e-subscript', tooltipText: 'Subscript', align: 'Left' },
        { id: 'uppercase', prefixIcon: 'e-icons e-upper-case', tooltipText: 'Uppercase', align: 'Left' },
        { id: 'lowercase', prefixIcon: 'e-icons e-lower-case', tooltipText: 'Lowercase', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        /* Style */
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
        {
            id: 'fontFamily', type: 'Button', align: 'Left', tooltipText: 'Font Family',
            template: new DropDownButton({
                content: 'Font Family',
                cssClass: 'e-headless-dropdown',
                items: fontFamilyItems,
                select: (args: any): void => {
                    if (args.item?.id === 'font-family-default') {
                        headlessEditor.commands.unsetFontFamily();
                    } else {
                        headlessEditor.commands.setFontFamily({ family: args.item.value });
                    }
                    refresh();
                },
        close: (): void => {
            headlessEditor.focusView();
        }
            })
        },
        {
            id: 'fontSize', type: 'Button', align: 'Left', tooltipText: 'Font Size',
            template: new DropDownButton({
                content: 'Font Size',
                cssClass: 'e-headless-dropdown',
                items: fontSizeItems,
                select: (args: any): void => {
                    if (args.item?.id === 'font-size-default') {
                        headlessEditor.commands.unsetFontSize();
                    } else {
                        headlessEditor.commands.setFontSize({ size: args.item.value });
                    }
                    refresh();
                },
        close: (): void => {
            headlessEditor.focusView();
        }
            })
        },
        { type: 'Separator', align: 'Left' },
        /* Colors */
        {
            id: 'fontColor', type: 'Button', align: 'Left', tooltipText: 'Font Color',
            template: new ColorPicker({
                value: '#dc2626',
                cssClass: 'e-headless-dropdown',
                mode: 'Palette',
                showButtons: true,
                columns: 5,
                presetColors: {
                    EditorPalette: editorPaletteColors
                },
                beforeTileRender: (args: PaletteTileEventArgs): void => {
                    const tile: HTMLElement = args.element;
                    tile.style.width = '28px';
                    tile.style.height = '28px';
                    tile.style.margin = '4px';
                    tile.style.borderRadius = '50%';
                    tile.style.overflow = 'hidden';
                    tile.style.boxSizing = 'border-box';
                },
                change: (args: any): void => {
                    if (args.value !== undefined && args.value !== null) {
                        headlessEditor.commands.setColor({ color: args.value });
                        refresh();
                    }
                }
            })
        },
        {
            id: 'backgroundColor', type: 'Button', align: 'Left', tooltipText: 'Background Color',
            template: new ColorPicker({
                value: '#ffff00',
                cssClass: 'e-headless-dropdown',
                mode: 'Palette',
                showButtons: true,
                columns: 5,
                presetColors: {
                    EditorPalette: editorBackgroundPaletteColors
                },
                beforeTileRender: (args: PaletteTileEventArgs): void => {
                    const tile: HTMLElement = args.element;
                    tile.style.width = '28px';
                    tile.style.height = '28px';
                    tile.style.margin = '4px';
                    tile.style.borderRadius = '50%';
                    tile.style.overflow = 'hidden';
                    tile.style.boxSizing = 'border-box';
                },
                change: (args: any): void => {
                    if (args.value !== undefined && args.value !== null) {
                        headlessEditor.commands.setHighlight({ color: args.value });
                        refresh();
                    }
                }
            })
        },
        { type: 'Separator', align: 'Left' },
        /* Alignment & Indentation */
        {
            id: 'align', type: 'Button', align: 'Left', tooltipText: 'Alignments',
            template: new DropDownButton({
                iconCss: 'e-icons e-align-left',
                cssClass: 'e-headless-dropdown',
                items: [
                    { id: 'left', text: 'Align Left', iconCss: 'e-icons e-align-left' },
                    { id: 'center', text: 'Align Center', iconCss: 'e-icons e-align-center' },
                    { id: 'right', text: 'Align Right', iconCss: 'e-icons e-align-right' },
                    { id: 'justify', text: 'Justify', iconCss: 'e-icons e-justify' }
                ],
                select: (args: any): void => {
                    const align: 'left' | 'center' | 'right' | 'justify' = args.item.id;
                    headlessEditor.commands.setTextAlign({ align });
                    refresh();
                },
        close: (): void => {
            headlessEditor.focusView();
        }
            })
        },
        { id: 'indent', prefixIcon: 'e-icons e-increase-indent', tooltipText: 'Indent (Tab)', align: 'Left' },
        { id: 'outdent', prefixIcon: 'e-icons e-decrease-indent', disabled: true, tooltipText: 'Outdent (Shift+Tab)', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        /* Lists */
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
                        headlessEditor.commands.toggleBulletList({ listStyleType: value });
                    }
                    refresh();
                },
                close: (): void => {
                    headlessEditor.focusView();
                }
            })
        },
        { id: 'taskList', prefixIcon: 'e-icons e-checklist', tooltipText: 'Task List', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        /* Links & Media */
        { id: 'link', prefixIcon: 'e-icons e-link', align: 'Left', tooltipText: 'Link' },
        { id: 'unlink', prefixIcon: 'e-icons e-link-remove', disabled: true, tooltipText: 'Remove Link', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        { id: 'insertImage', prefixIcon: 'e-icons e-image', align: 'Left', tooltipText: 'Insert Image' },
        {
            id: 'image', type: 'Button', disabled: true, tooltipText: 'Edit Image', align: 'Left',
            template: new DropDownButton({
                created: createdImageMenu,
                target: '#image-menu-items',
                iconCss: 'e-icons e-replace',
                iconPosition: 'Left',
                cssClass: 'e-headless-dropdown'
            })
        },
        { type: 'Separator', align: 'Left' },
        /* Tables */
        { id: 'insertTable', prefixIcon: 'e-icons e-table', align: 'Left', tooltipText: 'Insert Table' },
        {
            id: 'table', type: 'Button', disabled: true, tooltipText: 'Table Options', align: 'Left',
            template: new DropDownButton({
                created: createdTableMenu,
                target: '#table-menu-items',
                iconCss: 'e-icons e-table',
                iconPosition: 'Left',
                cssClass: 'e-headless-dropdown'
            })
        },
        { type: 'Separator', align: 'Left' },
        /* Blocks */
        { id: 'horizontalRule', prefixIcon: 'e-icons e-horizontal-line', tooltipText: 'Horizontal Line', align: 'Left' },
        { id: 'blockquote', prefixIcon: 'e-icons e-blockquote', tooltipText: 'Blockquote (Ctrl+Alt+Q)', align: 'Left' },
        {
            id: 'callout', type: 'Button', align: 'Left', tooltipText: 'Callout (Ctrl+Shift+C)',
            template: new DropDownButton({
                content: '',
                iconCss: 'e-icons e-callout',
                cssClass: 'e-headless-dropdown',
                items: [
                    { id: 'info', text: 'Info', iconCss: 'e-icons e-circle-info' },
                    { id: 'warning', text: 'Warning', iconCss: 'e-icons e-warning' },
                    { id: 'error', text: 'Error', iconCss: 'e-icons e-circle-close' },
                    { id: 'success', text: 'Success', iconCss: 'e-icons e-circle-check' },
                    { id: 'note', text: 'Note', iconCss: 'e-icons e-notes' },
                    { id: 'tip', text: 'Tip', iconCss: 'e-icons e-objects' }
                ],
                select: (args: any): void => {
                    headlessEditor.commands.toggleCallout({ variant: args.item.id });
                    refresh();
                },
        close: (): void => {
            headlessEditor.focusView();
        }
            })
        },
        { id: 'codeBlock', prefixIcon: 'e-icons e-preformat-code', tooltipText: 'Code Block (Ctrl+Alt+C)', align: 'Left' },
        { type: 'Separator', align: 'Left' },
        /* Special structures */
        {
            id: 'collapsible', type: 'Button', align: 'Left', tooltipText: 'Collapsible Heading',
            template: new DropDownButton({
                content: 'Collapsible',
                cssClass: 'e-headless-dropdown',
                items: [
                    { id: 'collapsible-paragraph', text: 'Collapsible Paragraph', iconCss: 'e-icons e-paragraph' },
                    { id: 'collapsible-h1', text: 'Collapsible Heading 1', iconCss: 'e-icons e-collapsible-heading-1' },
                    { id: 'collapsible-h2', text: 'Collapsible Heading 2', iconCss: 'e-icons e-collapsible-heading-2' },
                    { id: 'collapsible-h3', text: 'Collapsible Heading 3', iconCss: 'e-icons e-collapsible-heading-3' },
                    { id: 'collapsible-h4', text: 'Collapsible Heading 4', iconCss: 'e-icons e-collapsible-heading-4' }
                ],
                select: (args: any): void => {
                    if (args.item.id === 'collapsible-paragraph') {
                        if (headlessEditor.can().toggleCollapsible({ triggerType: 'paragraph' })) {
                            headlessEditor.commands.toggleCollapsible({ triggerType: 'paragraph' });
                        }
                    } else {
                        const level: number = Number(args.item.id.replace('collapsible-h', ''));
                        if (headlessEditor.can().toggleCollapsible({ triggerType: 'heading', level })) {
                            headlessEditor.commands.toggleCollapsible({ triggerType: 'heading', level });
                        }
                    }
                    refresh();
                },
        close: (): void => {
            headlessEditor.focusView();
        }
            })
        },
        { type: 'Separator', align: 'Left' },
        /* Cleanup & Export */
        { id: 'clearFormat', prefixIcon: 'e-icons e-clear-format', tooltipText: 'Clear Format', align: 'Left' },
        {
            id: 'export', type: 'Button', align: 'Left', tooltipText: 'Export',
            template: new DropDownButton({
                content: '',
                iconCss: 'e-icons e-export',
                cssClass: 'e-headless-dropdown',
                items: [
                    { id: 'export-html', text: 'Export as HTML' },
                    { id: 'export-text', text: 'Export as Text' },
                    { id: 'export-json', text: 'Export as JSON' }
                ],
                select: (args: any): void => { onExportMenuSelect(args); }
            })
        }
    ] as any;
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
                case 'superscript':
                    headlessEditor.commands.toggleSuperscript();
                    break;
                case 'subscript':
                    headlessEditor.commands.toggleSubscript();
                    break;
                case 'uppercase':
                    headlessEditor.commands.toUpperCase();
                    break;
                case 'lowercase':
                    headlessEditor.commands.toLowerCase();
                    break;
                case 'taskList':
                    headlessEditor.commands.toggleTaskList();
                    break;
                case 'indent':
                    if (headlessEditor.can().indent()) {
                        headlessEditor.commands.indent();
                    }
                    break;
                case 'outdent':
                    if (headlessEditor.can().outdent()) {
                        headlessEditor.commands.outdent();
                    }
                    break;
                case 'blockquote':
                    headlessEditor.commands.toggleBlockQuote();
                    break;
                case 'codeBlock':
                    headlessEditor.commands.toggleCodeBlock();
                    break;
                case 'clearFormat':
                    headlessEditor.commands.clearFormatting();
                    break;
                case 'unlink':
                    headlessEditor.commands.unsetLink();
                    break;
                case 'link':
                    openLinkDialog();
                    break;
                case 'horizontalRule':
                    headlessEditor.commands.setHorizontalRule();
                    break;
                case 'insertTable':
                    headlessEditor.commands.insertTable({
                        rows: 2,
                        columns: 3
                    });
                    break;
                case 'insertImage':
                    imageInsertDialog?.show();
                    break;
                case 'paragraph':
                case 'fontFamily':
                case 'fontSize':
                case 'fontColor':
                case 'backgroundColor':
                case 'align':
                case 'callout':
                case 'image':
                case 'table':
                case 'export':
                    break;
            }
            if (args.item.id != 'undo' && args.item.id != 'redo')
                refresh();
        }
    });
    let tableMenu: Menu | null = null;
    let imageMenu: Menu | null = null;
    function refresh(): void {
        if (!headlessEditor) {
            return;
        }
        const activeMarks: Set<string> = headlessEditor.getActiveMarks();
        const markButtonMap: Record<string, string> = {
            'bold': 'bold', 'italic': 'italic','underline': 'underline','strikethrough': 'strikethrough',
            'inlineCode': 'code', 'link': 'link', 'superscript': 'superscript', 'subscript': 'subscript'
        };
        const blockButtonMap: Record<string, string> = {
            'blockquote': 'blockquote','callout': 'callout','collapsible': 'collapsible','codeBlock': 'codeBlock'
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
        if (toolbar && toolbar.items && headlessEditor) {
            const cmds: any = headlessEditor.can();
            const setToolbarItemEnabled: (element: Element | null, enabled: boolean) => void =
                (element: Element | null, enabled: boolean): void => {
                    const toolbarItem: HTMLElement | null =
                        element?.closest('.e-toolbar-item') as HTMLElement | null;
                    if (toolbarItem) {
                        toolbar.enableItems(toolbarItem, enabled);
                    }
                };

            if (cmds) {
                const indentEl: HTMLElement | null = document.querySelector('.e-toolbar #indent') as HTMLElement | null;
                if (indentEl) { toolbar.enableItems(indentEl, cmds.indent()); }
                const outdentButton: Element | null = document.querySelector('.e-toolbar button[id="outdent"]');
                setToolbarItemEnabled(outdentButton, !!cmds.outdent());
            }
            const hasLinkMark: boolean = activeMarks.has('link');
            const unlinkEl: HTMLElement | null = document.querySelector('.e-toolbar #unlink') as HTMLElement | null;
            if (unlinkEl) { toolbar.enableItems(unlinkEl, hasLinkMark); }
            const inTable: boolean = !!(cmds && cmds.insertRowBefore && cmds.insertRowBefore());
            const tableHost: HTMLElement | null = document.getElementById('table-menu-items') as HTMLElement | null;
            const tableIcon: Element | null = document.querySelector('.e-toolbar .e-headless-dropdown .e-table');
            setToolbarItemEnabled(tableIcon ?? tableHost, inTable);
            if (tableMenu) { tableMenu.setProperties({ disabled: !inTable }); }
            const img: any = headlessEditor.getSelectedImage?.() ?? headlessEditor.getSelectedNode?.();
            const imageType: string | undefined = img?.node?.type?.name ?? img?.node?.type;
            const isImage: boolean = imageType === 'image' || imageType === 'imageInline';
            const imageHost: HTMLElement | null = document.getElementById('image-menu-items') as HTMLElement | null;
            const imageIcon: Element | null = document.querySelector('.e-toolbar .e-headless-dropdown .e-replace');
            setToolbarItemEnabled(imageIcon ?? imageHost, isImage);
            if (imageMenu) { imageMenu.setProperties({ disabled: !isImage }); }
        }
    }

    const cellColorPalette: Array<{ name: string; value: string }> = [
        { name: 'None', value: '' },
        { name: 'Gray', value: '#9e9e9e' },
        { name: 'Pink', value: '#ec407a' },
        { name: 'Red', value: '#f44336' },
        { name: 'Orange', value: '#ff9800' },
        { name: 'Yellow', value: '#ffeb3b' },
        { name: 'Green', value: '#4caf50' },
        { name: 'Blue Green', value: '#26a69a' },
        { name: 'Blue', value: '#2196f3' },
        { name: 'Purple', value: '#9c27b0' }
    ];
    const cellColorValueBySlug: Record<string, string> = cellColorPalette.reduce(
        (map: Record<string, string>, c: { name: string; value: string }): Record<string, string> => {
            const slug: string = c.value ? c.name.replace(/\s+/g, '-').toLowerCase() : 'none';
            map[slug] = c.value;
            return map;
        },
        {} as Record<string, string>
    );
    const buildColorSubmenu = (attribute: 'backgroundColor' | 'color' | 'borderColor'): any[] => cellColorPalette.map((c): any => {
        const slug: string = c.value ? c.name.replace(/\s+/g, '-').toLowerCase() : 'none';
        return {
            id: `cell-color-${attribute}-${slug}`,
            text: c.name,
            iconCss: c.value ? `e-cell-color-swatch e-cell-color-swatch-${slug}` : 'e-icons e-close'
        };
    });
    const onTableMenuSelect = (args: any): void => {
        const itemId: string = args.item?.id;
        switch (itemId) {
            case 'table-row-before':
                headlessEditor.commands.insertRowBefore();
                break;
            case 'table-row-after':
                headlessEditor.commands.insertRowAfter();
                break;
            case 'table-row-delete':
                headlessEditor.commands.deleteRow();
                break;
            case 'table-col-before':
                headlessEditor.commands.insertColumnBefore();
                break;
            case 'table-col-after':
                headlessEditor.commands.insertColumnAfter();
                break;
            case 'table-col-delete':
                headlessEditor.commands.deleteColumn();
                break;
            case 'table-header-row':
                headlessEditor.commands.toggleHeaderRow();
                break;
            case 'table-header-col':
                headlessEditor.commands.toggleHeaderColumn();
                break;
            case 'cell-align-left':
                headlessEditor.commands.setCellAttribute({
                    attribute: 'align',
                    value: 'left'
                });
                break;
            case 'cell-align-center':
                headlessEditor.commands.setCellAttribute({
                    attribute: 'align',
                    value: 'center'
                });
                break;
            case 'cell-align-right':
                headlessEditor.commands.setCellAttribute({
                    attribute: 'align',
                    value: 'right'
                });
                break;
            case 'cell-valign-top':
                headlessEditor.commands.setCellAttribute({
                    attribute: 'verticalAlign',
                    value: 'top'
                });
                break;
            case 'cell-valign-middle':
                headlessEditor.commands.setCellAttribute({ attribute: 'verticalAlign', value: 'middle' });
                break;
            case 'cell-valign-bottom':
                headlessEditor.commands.setCellAttribute({ attribute: 'verticalAlign', value: 'bottom' });
                break;
            case 'table-delete':
                headlessEditor.commands.deleteTable();
                break;
            default: {
                if (itemId && itemId.startsWith('cell-color-')) {
                    const parts: string[] = itemId.split('-');
                    const attribute: string = parts[2];
                    const slug: string = parts.slice(3).join('-');
                    const value: string = cellColorValueBySlug[slug] ?? '';
                    headlessEditor.commands.setCellAttribute({ attribute, value });
                }
                break;
            }
        }
    };
    function createdTableMenu() {
        const tableMenuHost: HTMLUListElement | null = document.getElementById('table-menu-items') as HTMLUListElement | null;
        if (tableMenuHost) {
            tableMenuHost.innerHTML = '';
            tableMenu = new Menu({
                items: [
                    {
                        text: 'Rows',
                        iconCss: 'e-icons e-insert-row-before',
                        items: [
                            {
                                text: 'Insert Row Before',
                                id: 'table-row-before',
                                iconCss: 'e-icons e-insert-row-before'
                            },
                            {
                                text: 'Insert Row After',
                                id: 'table-row-after',
                                iconCss: 'e-icons e-insert-row-after'
                            },
                            {
                                text: 'Delete Row',
                                id: 'table-row-delete',
                                iconCss: 'e-icons e-delete-row'
                            }
                        ]
                    },
                    {
                        text: 'Columns',
                        iconCss: 'e-icons e-insert-left',
                        items: [
                            {
                                text: 'Insert Column Before',
                                id: 'table-col-before',
                                iconCss: 'e-icons e-insert-left'
                            },
                            {
                                text: 'Insert Column After',
                                id: 'table-col-after',
                                iconCss: 'e-icons e-insert-left'
                            },
                            {
                                text: 'Delete Column',
                                id: 'table-col-delete',
                                iconCss: 'e-icons e-delete-column'
                            }
                        ]
                    },
                    {
                        text: 'Headers',
                        iconCss: 'e-icons e-table-header',
                        items: [
                            {
                                text: 'Toggle Header Row',
                                id: 'table-header-row',
                                iconCss: 'e-icons e-table-header'
                            },
                            {
                                text: 'Toggle Header Column',
                                id: 'table-header-col',
                                iconCss: 'e-icons e-columns'
                            }
                        ]
                    },
                    {
                        text: 'Cell Alignment',
                        iconCss: 'e-icons e-align-left',
                        items: [
                            {
                                text: 'Align Left',
                                id: 'cell-align-left',
                                iconCss: 'e-icons e-align-left'
                            },
                            {
                                text: 'Align Center',
                                id: 'cell-align-center',
                                iconCss: 'e-icons e-align-center'
                            },
                            {
                                text: 'Align Right',
                                id: 'cell-align-right',
                                iconCss: 'e-icons e-align-right'
                            }
                        ]
                    },
                    {
                        text: 'Cell Vertical Alignment',
                        iconCss: 'e-icons e-align-top',
                        items: [
                            {
                                text: 'Align Top',
                                id: 'cell-valign-top',
                                iconCss: 'e-icons e-align-top'
                            },
                            {
                                text: 'Align Middle',
                                id: 'cell-valign-middle',
                                iconCss: 'e-icons e-align-middle'
                            },
                            {
                                text: 'Align Bottom',
                                id: 'cell-valign-bottom',
                                iconCss: 'e-icons e-align-bottom'
                            }
                        ]
                    },
                    {
                        text: 'Background Color',
                        iconCss: 'e-icons e-highlight-color',
                        items: buildColorSubmenu('backgroundColor')
                    },
                    {
                        text: 'Text Color',
                        iconCss: 'e-icons e-font-color',
                        items: buildColorSubmenu('color')
                    },
                    {
                        text: 'Border Color',
                        iconCss: 'e-icons e-border-all',
                        items: buildColorSubmenu('borderColor')
                    },
                    {
                        text: 'Delete Table',
                        id: 'table-delete',
                        iconCss: 'e-icons e-trash'
                    }
                ],
                orientation: 'Vertical',
                select: (args: any): void => { onTableMenuSelect(args); }
            }, tableMenuHost);
            tableMenu.setProperties({ disabled: true });
        }
    }
    
    const cellColorStyleSheet: string = cellColorPalette
        .filter((c): boolean => !!c.value)
        .map((c): string => `.e-cell-color-swatch-${c.name.replace(/\s+/g, '-').toLowerCase()}::before{background:${c.value};}`)
        .join('');
    if (cellColorStyleSheet) {
        const styleEl: HTMLStyleElement = document.createElement('style');
        styleEl.id = 'cell-color-swatch-styles';
        styleEl.textContent = cellColorStyleSheet;
        if (!document.getElementById(styleEl.id)) {
            document.head.appendChild(styleEl);
        }
    }
    const imageInsertHost: HTMLElement | null = document.getElementById('image-insert-dialog');
    let imageInsertDialog: any = null;
    const imageInsertDialogContent: string = `
    <div class="image-dialog-content">
        <div class="form-group">
            <label>Image URL</label>
            <input id="img-insert-url" class="e-input" type="text" placeholder="Enter image URL"/>
        </div>
        <div class="form-group">
            <label>Alt Text</label>
            <input id="img-insert-alt" class="e-input" type="text" placeholder="Enter alternative text"/>
        </div>
        <div class="form-group">
            <label>Caption (optional)</label>
            <input id="img-insert-caption" class="e-input" type="text" placeholder="Enter image caption"/>
        </div>
        <div class="form-group">
            <label>Browse from Local Device</label>
            <button id="img-insert-browse" type="button" class="e-btn e-outline img-file-trigger">Choose Files...</button>
            <input id="img-insert-file-input" type="file" accept="image/*" style="display:none"/>
            <div id="img-insert-files-display" class="image-dialog-file-info"></div>
        </div>
    </div>`;
    const getImageSaveFormat: () => 'base64' | 'blob' = (): 'base64' | 'blob' => {
        try {
            const ext: any = (imageExtension as any);
            const cfg: any = ext && ext.prototype ? null : ext;
            const saveFormat: string | undefined =
                cfg?.saveFormat ?? cfg?.saveformat ?? cfg?.defaultSaveFormat ?? cfg?.defaultSaveformat;
            if (typeof saveFormat === 'string' && saveFormat.toLowerCase() === 'blob') {
                return 'blob';
            }
        } catch (_e) { /* fall through */ }
        return 'base64';
    };
    const readFileAsDataURL: (file: File) => Promise<string> =
        (file: File): Promise<string> =>
            new Promise<string>((resolve: (value: string) => void, reject: (reason: unknown) => void): void => {
                const reader: FileReader = new FileReader();
                reader.onload = (): void => { resolve(reader.result as string); };
                reader.onerror = (): void => { reject(reader.error); };
                reader.readAsDataURL(file);
            });
    const resolveImageFileSource: (file: File) => Promise<string> =
        async (file: File): Promise<string> => {
            if (getImageSaveFormat() === 'base64') {
                return readFileAsDataURL(file);
            }
            return URL.createObjectURL(file);
        };
    const buildLocalImagePayload: (file: File) => Promise<{ src: string; alt: string; display: 'block'; align: 'none'; wrap: 'none'; }> = async (file: File):
        Promise<{
            src: string; alt: string; display: 'block';
            align: 'none';
            wrap: 'none';
        }> => {
        const src: string = await resolveImageFileSource(file);
        return { src, alt: '', display: 'block', align: 'none', wrap: 'none' };
    };
    const pickLocalImageFiles: (fileInput: HTMLInputElement) => File[] =
        (fileInput: HTMLInputElement): File[] =>
            fileInput.files ? Array.from(fileInput.files) : [];

    const initImageDialogFileUI = (): void => {
        const urlInput: HTMLInputElement | null = document.getElementById('img-insert-url') as HTMLInputElement | null;
        const altInput: HTMLInputElement | null = document.getElementById('img-insert-alt') as HTMLInputElement | null;
        const captionInput: HTMLInputElement | null = document.getElementById('img-insert-caption') as HTMLInputElement | null;
        const fileInput: HTMLInputElement | null = document.getElementById('img-insert-file-input') as HTMLInputElement | null;
        const browseBtn: HTMLButtonElement | null = document.getElementById('img-insert-browse') as HTMLButtonElement | null;
        const filesDisplayEl: HTMLElement | null = document.getElementById('img-insert-files-display') as HTMLElement | null;
        if (urlInput) { urlInput.value = ''; }
        if (altInput) { altInput.value = ''; }
        if (captionInput) { captionInput.value = ''; }
        if (fileInput) { fileInput.value = ''; }
        if (filesDisplayEl) { filesDisplayEl.textContent = ''; }
        let updateInsertEnabled: () => void = (): void => undefined;
        const getInsertButton: () => HTMLButtonElement | null = (): HTMLButtonElement | null =>
            (document.querySelector('#image-insert-dialog .e-primary') as HTMLButtonElement | null);
        updateInsertEnabled = (): void => {
            const hasUrl: boolean = (urlInput?.value ?? '').trim().length > 0;
            const hasFiles: boolean = !!(fileInput && fileInput.files && fileInput.files.length > 0);
            const canInsert: boolean =
                (hasUrl && !hasFiles) || (!hasUrl && hasFiles);
            const insertBtn: HTMLButtonElement | null = getInsertButton();
            if (insertBtn) { insertBtn.disabled = !canInsert; }
        };
        if (urlInput) { urlInput.oninput = updateInsertEnabled; }
        if (fileInput) {
            fileInput.onchange = (): void => {
                const files: File[] = (fileInput.files ? Array.from(fileInput.files) : []);
                if (filesDisplayEl) {
                    if (files.length === 1) {
                        filesDisplayEl.textContent = files[0].name;
                    } else if (files.length > 1) {
                        const names: string = files.map((f: File): string => f.name).join(', ');
                        filesDisplayEl.textContent = `${files.length} files selected: ${names}`;
                    } else {
                        filesDisplayEl.textContent = '';
                    }
                }
                updateInsertEnabled();
            };
        }
        if (browseBtn && fileInput) {
            browseBtn.onclick = (): void => {
                fileInput.value = '';
                fileInput.click();
                updateInsertEnabled();
            };
        }
        updateInsertEnabled();
    };
    if (imageInsertHost) {
        imageInsertDialog = new Dialog({
            header: 'Insert Image',
            content: imageInsertDialogContent,
            width: '430px',
            isModal: true,
            showCloseIcon: true,
            closeOnEscape: true,
            visible: false,
            position: { X: 'center', Y: 'center' },
            target: document.body,
            open: (): void => {
                initImageDialogFileUI();
            },
            buttons: [
                {
                    click: (): void => {
                        const urlInput: HTMLInputElement | null =
                            document.getElementById('img-insert-url') as HTMLInputElement | null;
                        const altInput: HTMLInputElement | null =
                            document.getElementById('img-insert-alt') as HTMLInputElement | null;
                        const captionInput: HTMLInputElement | null =
                            document.getElementById('img-insert-caption') as HTMLInputElement | null;
                        const fileInput: HTMLInputElement | null =
                            document.getElementById('img-insert-file-input') as HTMLInputElement | null;
                        const alt: string = altInput?.value.trim() ?? '';
                        const caption: string = captionInput?.value.trim() ?? '';
                        const urlSrc: string = urlInput?.value.trim() ?? '';
                        const hasUrl: boolean = urlSrc.length > 0;
                        const files: File[] = fileInput ? pickLocalImageFiles(fileInput) : [];
                        const hasFiles: boolean = files.length > 0;
                        if (!hasUrl && !hasFiles) { return; }
                        if (hasUrl && hasFiles) { return; }
                        if (hasUrl) {
                            headlessEditor.commands.insertImage([
                                { src: urlSrc, alt, caption, display: 'block', align: 'none', wrap: 'none' }
                            ]);
                            imageInsertDialog.hide();
                            return;
                        }
                        Promise.all(files.map(buildLocalImagePayload)).then((payloads): void => {
                            headlessEditor.commands.insertImage(payloads.map((payload): any => ({ ...payload, caption })));
                            imageInsertDialog.hide();
                        });
                    },
                    buttonModel: { content: 'Insert', isPrimary: true }
                },
                {
                    click: (): void => { imageInsertDialog.hide(); },
                    buttonModel: { content: 'Cancel' }
                }
            ]
        });
        imageInsertDialog.appendTo(imageInsertHost);
    }
    const imagePropertiesHost: HTMLElement | null = document.getElementById('image-properties-dialog');
    const imageDimensionsHost: HTMLElement | null = document.getElementById('image-dimensions-dialog');
    let imagePropertiesDialog: Dialog | null = null;
    let imageDimensionsDialog: Dialog | null = null;
    let pendingUpdateFile: File | null = null;
    const imagePropertiesDialogContent: string = `
    <div class="image-dialog-content">
        <div class="form-group">
            <label>Image URL</label>
            <input id="img-update-url" class="e-input" type="text" placeholder="Enter image URL"/>
        </div>
        <div class="form-group">
            <label>Alt Text</label>
            <input id="img-update-alt" class="e-input" type="text" placeholder="Enter alternative text"/>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input id="img-update-title" class="e-input" type="text" placeholder="Enter title (optional)"/>
        </div>
        <div class="form-group">
            <label>Replace from Local Device</label>
            <button id="img-update-browse" type="button" class="e-btn e-outline img-file-trigger">Choose File...</button>
            <input id="img-update-file-input" type="file" accept="image/*" style="display:none"/>
            <div id="img-update-file-name" class="image-dialog-file-info"></div>
        </div>
    </div>`;
    const imageDimensionsDialogContent: string = `
    <div class="image-dialog-content">
        <div class="form-group">
            <label>Width</label>
            <input id="img-update-width" class="e-input" type="number" min="0" placeholder="Auto"/>
        </div>
        <div class="form-group">
            <label>Height</label>
            <input id="img-update-height" class="e-input" type="number" min="0" placeholder="Auto"/>
        </div>
    </div>`;
    const readSelectedImageAttrs: () => Record<string, unknown> | null = (): Record<string, unknown> | null => {
        const selected: any = headlessEditor.getSelectedImage?.() ?? headlessEditor.getSelectedNode?.();
        return selected?.node?.attrs ? selected.node.attrs as Record<string, unknown> : null;
    };
    const readInputValue: (id: string) => string = (id: string): string =>
        ((document.getElementById(id) as HTMLInputElement | null)?.value ?? '').trim();
    const setElementValue: (id: string, value: string) => void = (id: string, value: string): void => {
        const element: HTMLElement | null = document.getElementById(id);
        if (element instanceof HTMLInputElement) {
            element.value = value;
        } else if (element) {
            element.textContent = value;
        }
    };
    const applyPropertiesDialog: () => Promise<void> = async (): Promise<void> => {
        const payload: Record<string, unknown> = {
            alt: readInputValue('img-update-alt'),
            title: readInputValue('img-update-title')
        };
        const url: string = readInputValue('img-update-url');
        if (url) { payload.src = url; }
        if (pendingUpdateFile) {
            payload.src = await resolveImageFileSource(pendingUpdateFile);
        }
        (headlessEditor.commands as any).updateImage(payload);
        pendingUpdateFile = null;
        imagePropertiesDialog?.hide();
    };
    const buildPropertiesDialog: () => void = (): void => {
        if (imagePropertiesDialog || !imagePropertiesHost) { return; }
        imagePropertiesDialog = new Dialog({
            header: 'Update Image',
            content: imagePropertiesDialogContent,
            width: '460px',
            isModal: true,
            showCloseIcon: true,
            closeOnEscape: true,
            visible: false,
            position: { X: 'center', Y: 'center' },
            target: document.body,
            beforeOpen: (): void => {
                const selected: Record<string, unknown> = readSelectedImageAttrs() ?? {};
                setElementValue('img-update-url', typeof selected.src === 'string' ? selected.src : '');
                setElementValue('img-update-alt', typeof selected.alt === 'string' ? selected.alt : '');
                setElementValue('img-update-title', typeof selected.title === 'string' ? selected.title : '');
                pendingUpdateFile = null;
                setElementValue('img-update-file-name', '');
            },
            open: (): void => {
                const fileInput: HTMLInputElement | null = document.getElementById('img-update-file-input') as HTMLInputElement | null;
                const browseButton: HTMLButtonElement | null = document.getElementById('img-update-browse') as HTMLButtonElement | null;
                if (browseButton && fileInput) { browseButton.onclick = (): void => fileInput.click(); }
                if (fileInput) {
                    fileInput.onchange = (): void => {
                        pendingUpdateFile = fileInput.files?.[0] ?? null;
                        setElementValue('img-update-file-name', pendingUpdateFile?.name ?? '');
                    };
                }
            },
            buttons: [
                { click: (): void => { void applyPropertiesDialog(); }, buttonModel: { content: 'Save', isPrimary: true } },
                { click: (): void => { imagePropertiesDialog?.hide(); }, buttonModel: { content: 'Cancel' } }
            ]
        });
        imagePropertiesDialog.appendTo(imagePropertiesHost);
    };
    const applyDimensionsDialog: () => void = (): void => {
        const parseDimension = (id: string): number | null => {
            const value: string = readInputValue(id);
            if (!value) { return null; }
            const dimension: number = Number(value);
            return Number.isFinite(dimension) ? dimension : null;
        };
        (headlessEditor.commands as any).setImageDimension({
            width: parseDimension('img-update-width'),
            height: parseDimension('img-update-height')
        });
        imageDimensionsDialog?.hide();
    };
    const buildDimensionsDialog: () => void = (): void => {
        if (imageDimensionsDialog || !imageDimensionsHost) { return; }
        imageDimensionsDialog = new Dialog({
            header: 'Image Dimensions',
            content: imageDimensionsDialogContent,
            width: '380px',
            isModal: true,
            showCloseIcon: true,
            closeOnEscape: true,
            visible: false,
            position: { X: 'center', Y: 'center' },
            target: document.body,
            beforeOpen: (): void => {
                const selected: Record<string, unknown> = readSelectedImageAttrs() ?? {};
                setElementValue('img-update-width', typeof selected.width === 'number' ? String(selected.width) : '');
                setElementValue('img-update-height', typeof selected.height === 'number' ? String(selected.height) : '');
            },
            buttons: [
                { click: applyDimensionsDialog, buttonModel: { content: 'Save', isPrimary: true } },
                { click: (): void => { imageDimensionsDialog?.hide(); }, buttonModel: { content: 'Cancel' } }
            ]
        });
        imageDimensionsDialog.appendTo(imageDimensionsHost);
    };
    function createdImageMenu(): void {
        const imageMenuHost: HTMLUListElement | null = document.getElementById('image-menu-items') as HTMLUListElement | null;
        if (imageMenuHost) {
            imageMenuHost.innerHTML = '';
            imageMenu = new Menu({
                items: [
                    {
                        text: 'Align',
                        iconCss: 'e-icons e-align-left',
                        items: [
                            {
                                text: 'Left',
                                id: 'image-align-left',
                                iconCss: 'e-icons e-align-left'
                            },
                            {
                                text: 'Center',
                                id: 'image-align-center',
                                iconCss: 'e-icons e-align-center'
                            },
                            {
                                text: 'Right',
                                id: 'image-align-right',
                                iconCss: 'e-icons e-align-right'
                            }
                        ]
                    },
                    {
                        text: 'Wrap',
                        iconCss: 'e-icons e-left-wrap',
                        items: [
                            {
                                text: 'Float Left',
                                id: 'image-wrap-left',
                                iconCss: 'e-icons e-left-wrap'
                            },
                            {
                                text: 'Float Right',
                                id: 'image-wrap-right',
                                iconCss: 'e-icons e-right-wrap'
                            }
                        ]
                    },
                    {
                        text: 'Display Mode',
                        iconCss: 'e-icons e-image',
                        items: [
                            {
                                text: 'Block',
                                id: 'image-display-block'
                            },
                            {
                                text: 'Inline',
                                id: 'image-display-inline'
                            }
                        ]
                    },
                    {
                        text: 'Dimensions',
                        id: 'image-dimensions',
                        iconCss: 'e-icons e-resize'
                    },
                    {
                        text: 'Add/Remove Caption',
                        id: 'image-caption',
                        iconCss: 'e-icons e-alt-text e-icons'
                    },
                    {
                        text: 'Update Image',
                        id: 'image-update',
                        iconCss: 'e-icons e-edit'
                    },
                    {
                        text: 'Delete Image',
                        id: 'image-delete',
                        iconCss: 'e-icons e-trash'
                    }
                ],
                orientation: 'Vertical',
                select: (args: any): void => { onImageMenuSelect(args); }
            }, imageMenuHost);
            imageMenu.setProperties({ disabled: true });
        }
    }

    const onImageMenuSelect = (args: any): void => {
        const itemId: string = args.item?.id;
        switch (itemId) {
            case 'image-align-left':
                headlessEditor.commands.setImageAlign({ align: 'left' });
                break;
            case 'image-align-center':
                headlessEditor.commands.setImageAlign({ align: 'center' });
                break;
            case 'image-align-right':
                headlessEditor.commands.setImageAlign({ align: 'right' });
                break;
            case 'image-wrap-left':
                headlessEditor.commands.setImageWrap({ wrap: 'left' });
                break;
            case 'image-wrap-right':
                headlessEditor.commands.setImageWrap({ wrap: 'right' });
                break;
            case 'image-display-block':
                (headlessEditor.commands as any).setImageDisplay({ mode: 'block' });
                break;
            case 'image-display-inline':
                (headlessEditor.commands as any).setImageDisplay({ mode: 'inline' });
                break;
            case 'image-dimensions':
                buildDimensionsDialog();
                imageDimensionsDialog?.show();
                break;
            case 'image-caption':
                if (headlessEditor.can().toggleCaption()) {
                    headlessEditor.commands.toggleCaption();
                }
                break;
            case 'image-update':
                buildPropertiesDialog();
                imagePropertiesDialog?.show();
                break;
            case 'image-delete':
                headlessEditor.commands.removeImage();
                break;
        }
    };
    function downloadFile(content: string, filename: string, mimeType: string): void {
        const blob: Blob = new Blob([content], { type: mimeType });
        const url: string = URL.createObjectURL(blob);
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    const onExportMenuSelect = (args: any): void => {
        switch (args.item?.id) {
            case 'export-html':
                const html: string = headlessEditor.getHtml();
                downloadFile(html, 'document.html', 'text/html');
                break;
            case 'export-text':
                const text: string = headlessEditor.getText();
                downloadFile(text, 'document.txt', 'text/plain');
                break;
            case 'export-json':
                const doc: unknown = headlessEditor.getDocument();
                const json: string = JSON.stringify(doc, null, 2);
                downloadFile(json, 'document.json', 'application/json');
                break;
        }
    };
    let linkDialog: Dialog | null = null;
    const getHeadlessEditorSelectedText: () => string = (): string => {
        try {
            const fn: ((...args: unknown[]) => unknown) | undefined =
                (headlessEditor as any).getSelectionText;
            if (typeof fn === 'function') {
                const result: unknown = fn.call(headlessEditor);
                if (typeof result === 'string') { return result; }
            }
        } catch (_e) { /* ignore */ }
        return '';
    };

    const openLinkDialog = (): void => {
        const selectedText: string = getHeadlessEditorSelectedText().trim();

        const content: string = `
        <div class="e-link-dialog-content">
            <div class="e-link-field">
                <label for="link-text">Text to display</label>
                <input id="link-text" class="e-input" type="text" placeholder="Enter text">
            </div>
            <div class="e-link-field">
                <label for="link-url">URL</label>
                <input id="link-url" class="e-input" type="text" placeholder="https://example.com">
            </div>
            <div class="e-link-field">
                <label for="link-title">Title</label>
                <input id="link-title" class="e-input" type="text" placeholder="Enter title (optional)">
            </div>
        </div>
    `;
        if (!linkDialog) {
            linkDialog = new Dialog({
                header: 'Insert Link',
                content,
                width: '420px',
                showCloseIcon: true,
                isModal: true,
                visible: false,
                buttons: [
                    {
                        buttonModel: { content: 'Cancel' },
                        click: (): void => { linkDialog?.hide(); }
                    },
                    {
                        buttonModel: {
                            content: 'Insert',
                            isPrimary: true
                        },
                        click: (): void => {
                            const textElement: HTMLInputElement | null = document.getElementById('link-text') as HTMLInputElement | null;
                            const urlElement: HTMLInputElement | null = document.getElementById('link-url') as HTMLInputElement | null;
                            const titleElement: HTMLInputElement | null = document.getElementById('link-title') as HTMLInputElement | null;
                            const text: string = textElement?.value.trim() ?? '';
                            const url: string = urlElement?.value.trim() ?? '';
                            const title: string = titleElement?.value.trim() ?? '';
                            if (!url) {
                                return;
                            }
                            headlessEditor.commands.setLink({
                                href: url,
                                title: title || undefined,
                                displayText: text || url
                            });
                            linkDialog?.hide();
                        }
                    }
                ]
            });
            linkDialog.appendTo('#link-dialog');
            const textInput: HTMLInputElement | null = document.getElementById('link-text') as HTMLInputElement | null;
            const urlInput: HTMLInputElement | null = document.getElementById('link-url') as HTMLInputElement | null;
            const updateInsertEnabled: () => void = (): void => {
                const urlVal: string = (urlInput?.value ?? '').trim();
                const enabled: boolean = urlVal.length > 0;
                const insertBtn: HTMLButtonElement | null =
                    document.querySelector('#link-dialog .e-primary') as HTMLButtonElement | null;
                if (insertBtn) { insertBtn.disabled = !enabled; }
            };
            if (textInput) { textInput.oninput = updateInsertEnabled; }
            if (urlInput) { urlInput.oninput = updateInsertEnabled; }
        }
        const textElement: HTMLInputElement | null = document.getElementById('link-text') as HTMLInputElement | null;
        const urlElement: HTMLInputElement | null = document.getElementById('link-url') as HTMLInputElement | null;
        const titleElement: HTMLInputElement | null = document.getElementById('link-title') as HTMLInputElement | null;
        if (textElement) { textElement.value = selectedText; }
        if (urlElement) { urlElement.value = ''; }
        if (titleElement) { titleElement.value = ''; }
        const insertBtn: HTMLButtonElement | null =
            document.querySelector('#link-dialog .e-primary') as HTMLButtonElement | null;
        if (insertBtn) {
            const urlVal: string = (urlElement?.value ?? '').trim();
            insertBtn.disabled = urlVal.length === 0;
        }
        linkDialog.show();
    };
    toolbar.appendTo('#toolbar');
    new Tooltip({ target: '.e-toolbar-item:not(.e-separator)', position: 'BottomCenter', showTipPointer: true }).appendTo('#toolbar');
    if (container) {
        container.addEventListener('mouseup', refresh);
        container.addEventListener('keyup', refresh);
        container.addEventListener('click', refresh);
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
        refresh();
    }
    function createDemoCodeBlockExtension(): typeof codeBlockExtension {
        const DEMO_LANGUAGES: readonly string[] = [
            'plaintext','typescript','javascript','html','css','json','markdown','python','java','c',
            'cpp','csharp','go','rust','sql','shell','yaml','xml'
        ];
        return codeBlockExtension.configure({
            defaultLanguage: 'plaintext',
            enableTabIndentation: true,
            exitOnArrowDown: false,
            languageClassPrefix: 'language-',
            addNodeView: function () {
                return {
                    codeBlock: (attrs: Record<string, unknown>) => {
                        const currentLanguage: string =
                            typeof attrs['language'] === 'string' &&
                                (attrs['language'] as string).length > 0
                                ? (attrs['language'] as string)
                                : 'plaintext';
                        const select: HTMLInputElement = document.createElement('input');
                        select.className = 'e-code-block-language';
                        const button: HTMLButtonElement = document.createElement('button');
                        button.type = 'button';
                        button.className = 'e-code-block-copy e-icons';
                        button.setAttribute('aria-label', 'Copy code');
                        button.addEventListener('click', async (): Promise<void> => {
                            const text: string = headlessEditor.getCodeBlockContent();
                            try {
                                await navigator.clipboard.writeText(text);
                            } catch {
                                // Ignore clipboard errors
                            }
                        }
                        );
                        window.setTimeout((): void => {
                            try {
                                new DropDownList({
                                    dataSource: DEMO_LANGUAGES.map(
                                        (language: string) => ({
                                            text: getLanguageDisplayName(language),
                                            value: language
                                        })
                                    ),
                                    fields: {
                                        text: 'text',
                                        value: 'value'
                                    },
                                    value: currentLanguage,
                                    width: '260px',
                                    change: (args: any): void => {
                                        const nextLanguage: string =
                                            typeof args?.value === 'string'
                                                ? args.value
                                                : currentLanguage;
                                        headlessEditor.commands
                                            .setCodeBlockLanguage({
                                                language: nextLanguage
                                            });
                                    }
                                }).appendTo(select);
                                new Button({ cssClass: 'e-icons e-copy e-flat', isPrimary: false }).appendTo(button);
                            } catch (error) {
                            }
                        }, 0);
                        const header = document.createElement('div');
                        header.className = 'e-code-block-header';
                        header.appendChild(select);
                        header.appendChild(button);
                        return {
                            dom: header
                        };
                    }
                };
            }
        });
        function getLanguageDisplayName(language: string): string {
            const displayNames: Record<string, string> = {
                plaintext: 'Plain Text',typescript: 'TypeScript',javascript: 'JavaScript',html: 'HTML',css: 'CSS',
                json: 'JSON',markdown: 'Markdown',python: 'Python',java: 'Java',c: 'C',cpp: 'C++',csharp: 'C#',go: 'Go',
                rust: 'Rust',sql: 'SQL',shell: 'Shell',yaml: 'YAML',xml: 'XML'
            };
            return displayNames[language] ?? language;
        }
    }
};