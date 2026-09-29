import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { Splitter } from '@syncfusion/ej2-layouts';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import { ToastUtility } from '@syncfusion/ej2/notifications';

(window as any).default = (): void => {
    loadCultureFiles();
  let codeMirrorObj: any;
  let turndownService: any;

  // Initialize Splitter
  const splitObj = new Splitter({
    height: '450px',
    width: '100%',
    paneSettings: [
      { resizable: true, size: '50%', min: '40%' },
      { min: '40%' }
    ],
    created: handleSplitterCreated,
  });
  splitObj.appendTo('#splitter-rte-markdown-preview');

  // Initialize RichTextEditorUI
  const editor = new RichTextEditorUI({
    height: '100%',
    valueFormat: 'html',
    value: '<h3>Welcome to the Markdown Preview!</h3><p>Create and edit rich content in the editor on the left, and see the real-time Markdown conversion on the right.</p><h4>Features</h4><ul><li><strong>Bold</strong>, <em>italic</em>, and <u>underline</u> formatting</li><li>Headings and paragraphs</li><li>Lists (ordered and unordered)</li><li>Links and images</li><li>Tables and blockquotes</li></ul><blockquote><p>The right pane displays the generated Markdown in real time!</p></blockquote>',
    toolbarSettings: {
      items: [
        'Bold', 'Italic', 'Underline',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'Formats',
        'Outdent', 'Indent',
        'Link', 'Image', 'Table', '|', 'Undo', 'Redo'
      ]
    },
    saveInterval: 1,
    actionComplete: syncEditorToCodeMirror,
    change: syncEditorToCodeMirror,
    created: initializeCodeMirror,
  });
  editor.appendTo('#editor');

  /**
   * Build the Turndown service from the window global (CDN loaded)
   */
  function getTurndownService(): any {
    if (turndownService) {
      return turndownService;
    }
    const TurndownCtor = (window as any).TurndownService || (window as any).turndown || (window as any).default;
    if (!TurndownCtor) {
      return null;
    }
    turndownService = new TurndownCtor({
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
      bulletListMarker: '-',
      headingStyle: 'atx'
    });
    const plugin = (window as any).gfm || (window as any).turndownPluginGfm;
    if (plugin) {
      if (typeof plugin === 'function') {
        (turndownService as any).use(plugin);
      } else if (plugin.gfm) {
        (turndownService as any).use(plugin.gfm);
      } else {
        (turndownService as any).use(plugin);
      }
    }
    return turndownService;
  }

  /**
   * Convert HTML to Markdown using Turndown
   */
  function convertHtmlToMarkdown(html: string): string {
    const td = getTurndownService();
    if (!td) {
      return html;
    }
    return td.turndown(html);
  }

  /**
   * Initialize CodeMirror when editor is created
   */
  function initializeCodeMirror(): void {
    syncEditorToCodeMirror();
  }

  /**
   * Sync editor content → Turndown → CodeMirror
   */
  function syncEditorToCodeMirror(): void {
    const sourcePane = document.querySelector('.markdown-preview-source-pane') as HTMLElement;
    if (!sourcePane) return;

    const markdownContent = convertHtmlToMarkdown(editor.getHtml());

    if (!codeMirrorObj) {
      codeMirrorObj = CodeMirror(sourcePane, {
        value: markdownContent,
        lineNumbers: true,
        mode: 'text/x-markdown',
        lineWrapping: true,
        readOnly: true,
      });
    } else {
      const cursor = codeMirrorObj.getCursor();
      codeMirrorObj.setValue(markdownContent);
      codeMirrorObj.setCursor(cursor);
    }
  }

  function handleSplitterCreated(): void {
    if (Browser.isDevice) {
      splitObj.orientation = 'Vertical';
      const headerElement = document.querySelector('.markdown-preview-header') as HTMLElement;
      if (headerElement) {
        headerElement.style.width = 'auto';
      }
    }
  }

  function copyMarkdownToClipboard(): void {
    const md = codeMirrorObj ? codeMirrorObj.getValue() : convertHtmlToMarkdown(editor.getHtml());
    navigator.clipboard.writeText(md).catch(() => {
      ToastUtility.show({
        title: 'Success',
        icon: 'e-icons e-check',
        content: 'Markdown copied successfully.',
        position: { X: 'Right' },
        cssClass: 'e-toast-info'
      });
    });
  }

  const copyBtn = document.getElementById('copyMarkdownBtn') as HTMLElement | null;
  if (copyBtn) {
    copyBtn.addEventListener('click', copyMarkdownToClipboard);
  }
};
