import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Markdown Preview Sample
 */
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, Table , ToolbarType } from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs, isNullOrUndefined, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { Splitter } from '@syncfusion/ej2-layouts';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, Table);

let textArea: HTMLTextAreaElement;
let srcArea: HTMLElement;
let defaultRTE: RichTextEditor;
let splitObj: Splitter;
const value: string = `## Welcome to the Syncfusion® EJ2 Markdown Editor

The **Syncfusion Rich Text Editor** in **Markdown** mode delivers a lightweight, distraction-free editing experience with full Markdown syntax support — powered natively by Syncfusion’s own **MarkdownConverter**.

Write beautiful documents faster using simple, readable Markdown syntax and see the formatted result instantly with live preview.

### Why Choose Markdown Mode?

- Clean, plain-text syntax that is easy to read and write — even in raw form
- Input or modify text, apply formatting, and view the Markdown preview side-by-side using the splitter control.
- Toolbar + keyboard shortcuts for rapid formatting
- Easy to convert content to HTML or other formats
- Ideal for documentation, notes, and developer-focused content
- Reduces clutter and keeps the writing experience distraction-free

### Supported Markdown Features in Action

# Headings
## Markdown Editor Demo
### Create Clean, Structured Content
#### Organize Sections Effortlessly
##### Add Subheadings for Clarity
###### Provide Notes or Additional Info

Headings help structure your content, making it easier to read, scan, and organize information within the Markdown editor.

#### Text Formatting
**Bold text highlights important information.**

*Markdown makes writing simple and clean.*

**_You can also combine bold and italic for emphasis._**

~~Use strikethrough to indicate removed or outdated content.~~

\`Inline code is perfect for short code snippets like commands or variables.\`

### Table
Create simple tables to organize information clearly and quickly.

| Feature | Description |
|---------|-------------|
| Markdown   | Lightweight, easy-to-read formatting syntax |
| Preview    | Shows formatted output side-by-side |

#### Lists

**Unordered**
- Explore the editor features
- Add content with simple syntax
    - Insert nested bullet points
    - Organize topics hierarchically
- Keep your notes clear and readable

**Ordered**
1. Start writing your content
2. Apply Markdown formatting
    1. Add sub-steps for detailed tasks
    2. Improve clarity with structure
3. Review and finalize your document

**Task List**
- [x] Completed task
- [ ] Write documentation
- [ ] Release new version

#### Blockquotes

> Markdown makes writing on the web beautiful and readable.
>
> — John Gruber, Creator of Markdown

#### Code Blocks
Inline code: Use \`npm install @syncfusion/ej2-richtexteditor\``;

//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    splitObj = new Splitter({
        height: '450px', width: '100%',
        resizing: onResizing,
        paneSettings: [{ resizable: true, size: '50%', min: '40%' }, { min: '40%' }],
        created: updateOrientation,
    });
    splitObj.appendTo('#splitter-rte-markdown-preview');
    defaultRTE = new RichTextEditor({
        height: '100%',
        placeholder : "Enter your text here...",
        floatingToolbarOffset: 0,
        editorMode: 'Markdown',
        toolbarSettings: {
            type: ToolbarType.Expand,
            enableFloating: false,
            items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
                'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable',
                '|', 'Undo', 'Redo'
            ]
        },
        value: value,
        saveInterval: 1, actionComplete: updateValue, change: onChange, created: onCreate,
    });
    defaultRTE.appendTo('#defaultRTE');
    function onChange(): void {
        updateValue();
    }
    function onResizing(): void {
        defaultRTE.refreshUI();
    }
    function onCreate(): void {
        textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
        srcArea = document.querySelector('.source-code') as HTMLElement;
        updateValue();
    }
    function updateValue(): void {
        srcArea.innerHTML = MarkdownConverter.toHtml((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
    }
    function updateOrientation(): void {
        if (Browser.isDevice) {
            splitObj.orientation = 'Vertical';
            (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
        }
    }
};
