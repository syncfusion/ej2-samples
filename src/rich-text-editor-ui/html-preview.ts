import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
import { Splitter } from '@syncfusion/ej2-layouts';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import { ToastUtility } from '@syncfusion/ej2/notifications';

(window as any).default = (): void => {
    loadCultureFiles();
  let codeMirrorObj: any;
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
  splitObj.appendTo('#html-preview-splitter');

  // Initialize RichTextEditorUI
  const editor = new RichTextEditorUI({
    height: '100%',
    valueFormat: 'html',
    value: '<h3>Welcome to the HTML real-time live editor!</h3><p>Create and edit the valid HTML code simply! You don\'t worry about the HTML syntax to format your text content. The WYSIWYG editor (left side view) provided the toolbar to make format text and insert images, tables, and more options.</p><h4>Don\'t worry about syntax</h4><p>The content editing works bi-directional, you can write the HTML code on the right-side view (code view), and changes will reflect in the WYSIWYG editor.</p>',
    toolbarSettings: {
      enableFloating: false,
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
   * Initialize CodeMirror when editor is created
   */
  function initializeCodeMirror(): void {
    syncEditorToCodeMirror();
  }

  /**
   * Sync editor content to CodeMirror and maintain cursor position
   */
  function syncEditorToCodeMirror(): void {
    const sourceCodeContainer = document.querySelector('.html-preview-source-pane') as HTMLElement;
    if (!sourceCodeContainer) return;

    const rteHtml = editor.getHtml();

    // Initialize CodeMirror if not already present
    if (!codeMirrorObj) {
      codeMirrorObj = CodeMirror(sourceCodeContainer, {
        value: rteHtml,
        lineNumbers: true,
        mode: 'text/html',
        lineWrapping: true,
        readOnly: true,
      });

      // Listen for CodeMirror changes and sync back to editor
      codeMirrorObj.on('change', handleCodeMirrorChange);
    } else if (!codeMirrorObj.hasFocus() && codeMirrorObj.getValue() !== rteHtml) {
      // Update CodeMirror without losing cursor position
      const cursor = codeMirrorObj.getCursor();
      codeMirrorObj.setValue(rteHtml);
      codeMirrorObj.setCursor(cursor);
    }
  }

  function handleCodeMirrorChange(): void {
    if (codeMirrorObj && codeMirrorObj.getValue() !== editor.getHtml()) {
      editor.value = codeMirrorObj.getValue();
      editor.dataBind();
    }
  }

  function handleSplitterCreated(): void {
    if (Browser.isDevice) {
      splitObj.orientation = 'Vertical';
      const headerElement = document.querySelector('.html-preview-header') as HTMLElement;
      if (headerElement) {
        headerElement.style.width = 'auto';
      }
    }
  }


  function copyHtmlToClipboard(): void {
    const html = codeMirrorObj ? codeMirrorObj.getValue() : editor.getHtml();
    navigator.clipboard.writeText(html).catch(() => {
        ToastUtility.show({
          title: 'Success',
          icon: 'e-icons e-check',
          content: 'Content Copied successfully.',
          position: {
              X: 'Right'
          },
          cssClass: 'e-toast-info'
        })
    });
  }

  const copyBtn = document.getElementById('copyHtmlBtn') as HTMLElement | null;
  if (copyBtn) {
    copyBtn.addEventListener('click', copyHtmlToClipboard);
  }
};