import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor Online Html Editor sample
 */
import { createElement } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, ToolbarType, Table } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table);
import { Splitter } from '@syncfusion/ej2-layouts';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
(window as any).default = (): void => {
    loadCultureFiles();

  let textArea: HTMLTextAreaElement;
  let srcArea: HTMLElement;
  let myCodeMirror: any;
  let defaultRTE: RichTextEditor;
  let splitObj: Splitter;
  // Add the styles and script referrence for code-mirror.
  let link: Element = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css');
  document.head.appendChild(link);
  let elem: HTMLScriptElement = document.createElement('script');
  elem.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.js';
  elem.type = 'text/javascript';
  document.head.appendChild(elem);
  let element: HTMLScriptElement = document.createElement('script');
  element.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.min.js';
  element.type = 'text/javascript';
  document.head.appendChild(element);

  element.onload = (): void => {
    let openButton: HTMLElement = document.querySelector('#OpenBtn');
    if (openButton) {
      openButton.addEventListener('click', () => {
      window.open(location.href.replace(location.search, '').split('#')[0] + 'rich-text-editor/online-html-editor/index.html');
      });
   }
    splitObj = new Splitter({
      height: '450px',
      paneSettings: [{ resizable: false, size: '50%' }, {}],
      width: '100%'
    });
    splitObj.appendTo('#horizontal');

    defaultRTE = new RichTextEditor({
      height: '100%',
      toolbarSettings: {
        type : ToolbarType.MultiRow,
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
          'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
          'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
          'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
          'Outdent', 'Indent', '|',
          'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat',
          '|', 'Undo', 'Redo'
        ]
      },
      saveInterval: 1,
      actionComplete: updateValue,
      change: onChange,
      showCharCount : true,
      maxLength : 5000,
      created: onCreate,
    });
    defaultRTE.appendTo('#defaultRTE');
    function onChange(): void {
      updateValue();
    }
    function onCreate(): void {
      updateValue();
      textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
      srcArea = document.querySelector('.source-code');
      srcArea.addEventListener('keyup', (e: any) => {
        updateHtmlValue();
      });
    }
    function updateHtmlValue(): void {
      textArea.innerHTML = myCodeMirror.getValue();
    }
    function updateValue(): void {
      let mirrorView: HTMLElement = document.querySelector('#src-view');
      if (!mirrorView) {
        mirrorView = createElement('div', { className: 'e-content' });
        mirrorView.id = 'src-view';
        let srcCodeElement: HTMLElement = document.querySelector('.source-code');
        if (srcCodeElement) {
            srcCodeElement.appendChild(mirrorView);
        }
        mirrorView.innerHTML = '';
        mirrorView.style.display = 'block';
      }
      let srcViewEle: HTMLElement = document.querySelector('#src-view');
      let codemirrorEle: HTMLElement = document.querySelector('.CodeMirror-wrap');
      if (codemirrorEle) {
        codemirrorEle.remove();
      }
      renderCodeMirror(srcViewEle as HTMLElement, defaultRTE.value);
    }
    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
      myCodeMirror = CodeMirror(mirrorView, {
        value: content,
        lineNumbers: true,
        mode: 'text/html',
        lineWrapping: true,
      });
    }
  };
};
