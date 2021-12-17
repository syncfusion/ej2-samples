import { loadCultureFiles } from '../common/culture-loader';
import { BreadcrumbItemModel, Breadcrumb, BreadcrumbClickEventArgs, BreadcrumbBeforeItemRenderEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { getComponent } from '@syncfusion/ej2-base';

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
  span.innerHTML = 'Breadcrumb <b>' + eventName  + '</b> event is triggered<hr>';
  let log: HTMLElement = document.getElementById('EventLog');
  log.insertBefore(span, log.firstChild);
  }

  // To refresh Breadcrumb control state when reset button clicked
  new Button({ cssClass: 'e-small' }, '#reset').element.onclick = () => {
    var breadcrumb, breadcrumbInst, breadcrumbs = document.querySelector('.content-wrapper').getElementsByClassName("e-breadcrumb");
    for (var i = 0; i < breadcrumbs.length; i++) {
        breadcrumb = breadcrumbs[i];
        breadcrumbInst = (getComponent(breadcrumb as HTMLElement, 'breadcrumb') as Breadcrumb);
        breadcrumbInst.activeItem = breadcrumbInst.items[breadcrumbInst.items.length  -1].text;
    }
  };
};
