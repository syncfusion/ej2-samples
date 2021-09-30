import { loadCultureFiles } from '../common/culture-loader';
import { BreadcrumbItemModel, Breadcrumb, BreadcrumbClickEventArgs, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();
    
let items: BreadcrumbItemModel[] = [
  {
      text: "Program Files",
      iconCss: "e-bicons e-folder"
  },
  {
      text: "Commom Files",
      iconCss: "e-bicons e-folder"
  },
  {
      text: "Services",
      iconCss: "e-bicons e-folder"
  },
  {
      text: "Config.json",
      iconCss: "e-bicons e-file"
  }
];

  new Breadcrumb({
    items: items,
    created: createdHandler,
    itemClick: clickHandler,
    beforeItemRender: beforeItemRenderHandler,
    enableNavigation: false
  }, '#events');

  let clear: Button = new Button();
  clear.appendTo('#clear');

  document.getElementById('clear').onclick = () => {
    document.getElementById('EventLog').innerHTML = '';
  };

  function createdHandler(): void {
    logEvent('created');
  }

  function clickHandler(args: BreadcrumbClickEventArgs): void {
    logEvent(args.name);
  }

  function beforeItemRenderHandler(args: BreadcrumbBeforeItemRenderEventArgs): void {
    logEvent(args.name);
  }

 function logEvent(eventName: string): void {
  let span: HTMLElement = document.createElement('span');
  span.innerHTML = 'Breadcrumb <b>' + eventName  + '</b> event called<hr>';
  let log: HTMLElement = document.getElementById('EventLog');
  log.insertBefore(span, log.firstChild);
  }
};
