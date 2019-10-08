import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor tribute js sample
 */
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar);
declare const Tribute: any;

(window as any).default = (): void => {
    loadCultureFiles();
  let element: HTMLScriptElement = document.createElement('script');
  element.src = 'https://cdnjs.cloudflare.com/ajax/libs/tributejs/3.7.3/tribute.min.js';
  document.head.appendChild(element);
  element.onload = (): void => {
    let defaultRTE: RichTextEditor = new RichTextEditor({
      placeholder: 'Type @ to get the employee list with their email IDs.',
    });
    defaultRTE.appendTo('#AtRTE');
    /* tslint:disable */
    var tribute = new Tribute({
      /* tslint:enable */
      values: [
        { key: 'Phil Heartman', value: 'pheartman' },
        { key: 'Gordon Ramsey', value: 'gramsey' },
        { key: 'Jordan Humphreys', value: 'jhumphreys' },
        { key: 'Howard Johnson', value: 'hjohnson' }
      ]
    });
    tribute.attach(defaultRTE.inputElement);
  };
};
