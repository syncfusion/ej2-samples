import { loadCultureFiles } from '../common/culture-loader';
/**
 * menu sample
 */

import { ListView } from '@syncfusion/ej2-lists';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { closest } from '@syncfusion/ej2-base';
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

  //Initialize Toolbar component
  let toolbarObj: Toolbar = new Toolbar({
    items: [
      {
        prefixIcon: 'e-copy-icon tb-icons',
        text: 'Wireless & networks',
        overflow: 'Hide',
        tooltipText: 'Wireless'
      },
      {
        prefixIcon: 'e-copy-icon tb-icons',
        text: 'Device',
        overflow: 'Hide',
        tooltipText: 'Device'
      },
      {
        prefixIcon: 'e-copy-icon tb-icons',
        text: 'Personal',
        overflow: 'Hide',
        tooltipText: 'Personal'
      }
    ]
  });
  //Render initialized Toolbar component
  toolbarObj.appendTo('#toolbar-menu');

  //Initialize Tooltip component
  let tip: Tooltip = new Tooltip({
    //Set tooltip target
    target: '#toolbar-menu button',
    //Raise beforeRender event
    beforeRender: onBeforeRender,
    //Set tooltip width
    width: 170,
    //Set tooltip cssClass
    cssClass: 'e-tooltip-menu-settings',
    //Set tooltip open mode
    opensOn: 'Click'
  });
  //Render initialized Tooltip component
  tip.appendTo('#tooltip-menu');

  //Define an array of JSON data
  let data1: any = [
    { Name: 'WI-FI', id: '1', icon: 'wifi' },
    { Name: 'Bluetooth', id: '2', icon: 'bluetooth' },
    { Name: 'SIM cards', id: '3', icon: 'sim' }
  ];
  let data2: any = [
    { Name: 'Display', icon: 'display' },
    { Name: 'Sound', icon: 'sound' },
    { Name: 'Battery', icon: 'battery' },
    { Name: 'Users', icon: 'user' }
  ];
  let data3: any = [
    { Name: 'Location', icon: 'location' },
    { Name: 'Security', icon: 'security' },
    { Name: 'Language', icon: 'language' }
  ];

  //Initialize ListView component
  let listObj: ListView = new ListView({
    //Map appropriate columns to fields property
    fields: { text: 'Name', iconCss: 'icon' },
    //Set true to show icons
    showIcon: true
  });

  let listObjects: any = [data1, data2, data3];
  //beforRender event handler for Tooltip
  function onBeforeRender(args: TooltipEventArgs): void {
    let data: any = [
      { title: 'Wireless' },
      { title: 'Device' },
      { title: 'Personal' }
    ];
    for (let i: number = 0; i < data.length; i++) {
      if (data[i].title === args.target.parentElement.getAttribute('title')) {
        let list: HTMLElement = document.createElement('div');
        list.id = 'tooltipMenu-list';
        listObj.dataSource = listObjects[i];
        listObj.appendTo(list);
        tip.content = list;
      }
    }
  }

  //Attached scroll and click event listners in right pane
  if (document.getElementById('right-pane')) {
    document.getElementById('right-pane').addEventListener('click', onClick);
    document.getElementById('right-pane').addEventListener('scroll', onScroll);
  }

  //click event handler to close Tooltip while navigating to other tabs in right pane
  function onClick(args: any): void {
    let targetEle: Element = <Element>closest(args.target, '.e-toolbar-item');
    if (!targetEle) {
      if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
        tip.close();
      }
    }
  }

  //scroll event handler to close Tooltip while perfomring page scroll
  function onScroll(args: any): void {
    if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
      tip.close();
    }
  }
};
