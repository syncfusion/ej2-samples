/// <reference path='./sampleList.ts' />
/**
 * default script manupulation for sample browser
 */

 import { Popup, Tooltip } from '@syncfusion/ej2-popups';
 import { Toast } from '@syncfusion/ej2-notifications';
 import { Animation, Browser, extend, setCulture, enableRipple, Ajax, closest, createElement, detach, L10n } from '@syncfusion/ej2-base';
 import { select, setCurrencyCode, loadCldr, selectAll, registerLicense, getComponent } from '@syncfusion/ej2-base';
 import { DataManager, Query } from '@syncfusion/ej2-data';
 import { DropDownList, AutoComplete } from '@syncfusion/ej2-dropdowns';
 import { Button } from '@syncfusion/ej2-buttons';
 import { Tab, TreeView, Sidebar, EventArgs } from '@syncfusion/ej2-navigations';
 import { ListView } from '@syncfusion/ej2-lists';
 import { Grid } from '@syncfusion/ej2-grids';
 import { ImageEditor } from '@syncfusion/ej2-image-editor';
 import { addRoute, bypassed, parse } from 'crossroads';
 import { renderPropertyPane, renderDescription, renderActionDescription } from './propertypane';
 import { Locale } from './locale-string';
 import * as samplesJSON from './sampleList';
 import * as elasticlunr from './lib/elasticlunr';
 import * as searchJson from './search-index.json';
 import * as hljs from './lib/highlightjs';
 import * as hasher from 'hasher';
 import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
 import * as currencyData from '../common/cldr-data/supplemental/currencyData.json';
 import * as deCultureData from '../common/cldr-data/main/de/all.json';
 import * as arCultureData from '../common/cldr-data/main/ar/all.json';
 import * as swissCultureDate from '../common/cldr-data/main/fr-CH/all.json';
 import * as enCultureData from '../common/cldr-data/main/en/all.json';
 import * as chinaCultureData from '../common/cldr-data/main/zh/all.json';
 import * as packageJson from '../common/pack.json';
 let packages: string = JSON.stringify((<any>packageJson).dependencies);
 let cBlock: string[] = ['ts-src-tab', 'html-src-tab'];
 const matchedCurrency: { [key: string]: string } = {
     'en': 'USD',
     'de': 'EUR',
     'ar': 'AED',
     'zh': 'CNY',
     'fr-CH': 'CHF'
 };
 import '../../node_modules/es6-promise/dist/es6-promise';
 /**
  * interfaces
  */
 interface Controls {
     directory: string;
     category?: string;
     name: string;
     uid: string;
     type: string;
     hideOnDevice: boolean;
     samples: Samples[];
 }
 
 interface Samples {
     url: string;
     uid: string;
     type: string;
     name: string;
     category: string;
 }
 
 interface DestroyMethod extends HTMLElement {
     destroy: Function;
     ej2_instances: Object[];
     enableRtl: Boolean;
     setProperties: Function;
     getModuleName : Function;
     model :Object[];
 }
 
 interface HighlightJS {
     registerLanguage?: (type: string, req: Object) => void;
     highlightBlock?: (ele: Element | HTMLElement | Node) => void;
 }
 
 interface MyWindow extends Window {
     default: () => void;
     navigateSample: () => void;
     loadCultureFiles: () => void;
     apiList: any;
     hashString: string;
 }
 loadCldr(numberingSystems, chinaCultureData, enCultureData, swissCultureDate, currencyData, deCultureData, arCultureData);
 L10n.load(Locale);
 setCulture('en');
 registerLicense('{SyncfusionJSLicensekey}');
 let switcherPopup: Popup;
 let preventToggle: boolean;
 let themeSwitherPopup: Popup;
 let openedPopup: any;
 let searchPopup: AutoComplete;
 let settingsPopup: Popup;
 let prevAction: string;
 let sidebar: Sidebar;
 let settingsidebar: Sidebar;
 let searchInstance: any;
 let headerThemeSwitch: HTMLElement = document.getElementById('header-theme-switcher');
 let settingElement: HTMLElement = <HTMLElement>select('.sb-setting-btn');
 let themeList: HTMLElement = document.getElementById('themelist');
 var themeCollection = ['fluent', 'fluent-dark', 'bootstrap5', 'bootstrap5-dark', 'tailwind', 'tailwind-dark', 'material', 'material-dark', 'material3', 'material3-dark', 'fabric', 'fabric-dark', 'bootstrap4', 'bootstrap', 'bootstrap-dark', 'highcontrast'];
 let themeDropDown: DropDownList;
  let cultureDropDown: DropDownList;
  let currencyDropDown: DropDownList;
  let contentTab: Tab;
  let sourceTab: Tab;
  let sourceTabItems: object[] = [];
  let isExternalNavigation: boolean = true;
  let defaultTree: boolean = false;
  let intialLoadCompleted: boolean = false;
  let resizeManualTrigger: boolean = false;
  let leftToggle: Element = select('#sb-toggle-left');
  let sbRightPane: HTMLElement = <any>select('.sb-right-pane');
  let sbContentOverlay: HTMLElement = <any>select('.sb-content-overlay');
  let sbBodyOverlay: HTMLElement = <any>select('.sb-body-overlay');
  let sbHeader: HTMLElement = <HTMLElement>select('#sample-header');
  let resetSearch: Element = select('.sb-reset-icon');
  let newYear: number = new Date().getFullYear();
  let copyRight: HTMLElement= document.querySelector('.sb-footer-copyright');
  copyRight.innerHTML = "Copyright © 2001 - " + newYear + " Syncfusion Inc.";
  /**
   * constant to process the sample url
   */
  const urlRegex: RegExp = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
  const sampleRegex: RegExp = /#\/(([^\/]+\/)+[^\/\.]+)/;
  // Regex for removal of hidden codes 
  const reg: RegExp = /.*custom code start([\S\s]*?)custom code end.*/g;
  const sbArray: string[] = ['angular', 'react', 'javascript', 'aspnetcore', 'aspnetmvc', 'vue', 'blazor'];
  /**
   * constant for search operations
   */
  let inputele: any = select('#search-input');
  let searchOverlay: Element = select('.e-search-overlay');
  let searchButton: Element = document.getElementById('sb-trigger-search');
  let setResponsiveElement: Element = select('.setting-responsive');
  /**
   * Mobile View
   */
  let isMobile: boolean = window.matchMedia('(max-width:550px)').matches;
  /**
   * tablet mode
   */
  let isTablet: boolean = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
  /**
   * PC mode
   */
  let isPc: boolean = window.matchMedia('(min-width:850px)').matches;
  
  /**
   * default theme on sample loaded
   */
  let selectedTheme: string = location.hash.split('/')[1] || 'material3';
  /**
   * Toggle Pane Animation
   */
  let toggleAnim: Animation = new Animation({ duration: 500, timingFunction: 'ease' });
  /**
   * Left pane sample browser  constant
   */
  let controlSampleData: any = {};
  let samplesList: Controls[] | { [key: string]: Object }[] = getSampleList();
  let samplesTreeList: any = [];
  let execFunction: { [key: string]: Object } = {};
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (Browser.isDevice || isMobile) {
      if (sidebar) {
          sidebar.destroy();
      }
      sidebar = new Sidebar({ width: '280px', showBackdrop: true, closeOnDocumentClick: true, enableGestures: false,change: resizeFunction });
      sidebar.appendTo('#left-sidebar');
  } else {
      sidebar = new Sidebar({
          width: '282px', target: <HTMLElement>document.querySelector('.sb-content '),
          showBackdrop: false,
          closeOnDocumentClick: false,
          enableGestures: false,
          change:resizeFunction
      });
      sidebar.appendTo('#left-sidebar');
  }
  settingsidebar = new Sidebar({
      position: 'Right', width: '282', zIndex: '1003', showBackdrop: true, type: 'Over', enableGestures: false,
      closeOnDocumentClick: true, close: closeRightSidebar
  });
  settingsidebar.appendTo('#right-sidebar');
  function closeRightSidebar(args: EventArgs): void {
    let targetEle: HTMLElement | null = args.event ? args.event.target as HTMLElement : null;
    if (targetEle && targetEle.closest('.e-popup')) args.cancel = true;
  }
  /**
   * Right pane
   */
  window.apiList = (samplesJSON as any).apiList;
  let sampleNameElement: Element = document.querySelector('#component-name>.sb-sample-text');
  let breadCrumbComponent: Element = document.querySelector('.sb-bread-crumb-text>.category-text');
  let breadCrumSeperator: HTMLElement = <any>select('.category-seperator');
  let breadCrumbSubCategory: HTMLElement = <any>document.querySelector('.sb-bread-crumb-text>.component');
  let breadCrumbSample: Element = document.querySelector('.sb-bread-crumb-text>.crumb-sample');
  let hsplitter: string = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
  // tslint:disable-next-line:no-multiline-string
  let openNewTemplate: string = `<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank" aria-label="Open new sample">
  <div class="sb-icons sb-icon-Popout"></div></a></div>`;
  // tslint:disable-next-line:no-multiline-string
  let sampleNavigation: string = `<div class="sb-custom-item sample-navigation"><button id='prev-sample' class="sb-navigation-prev" 
      aria-label="previous sample">
  <span class='sb-icons sb-icon-Previous'></span>
  </button>
  <button  id='next-sample' class="sb-navigation-next" aria-label="next sample">
  <span class='sb-icons sb-icon-Next'></span>
  </button>
  </div>`;
  let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
  // tslint:disable-next-line:no-multiple-var-decl
  let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
      plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
      '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting sb-hide"></div>';
  
  let tabContentToolbar: Element = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
  let apiGrid: Grid;
  let demoSection: Element = select('.sb-demo-section');
  /**
   * Routing variables
   */
  window.navigateSample = (window.navigateSample !== undefined) ? window.navigateSample : (): void => { return; };
  let isInitRedirected: boolean;
  let samplePath: string[] = [];
  let defaultSamples: any = [];
  let samplesAr: string[] = [];
  let currentControlID: string;
  let currentSampleID: string;
  let currentControl: string;
  declare let window: MyWindow;
  /**
   * Popups intitalize
   */
  function preventTabSwipe(e: any): void {
      if (e.isSwiped) {
          e.cancel = true;
      }
  }
  function dynamicTab(e: any): void {
      let blockEle: Element = this.element.querySelector('#e-content' + this.tabId + '_' + e.selectedIndex).children[0];
      blockEle.innerHTML = this.items[e.selectedIndex].data;
      blockEle.innerHTML = blockEle.innerHTML.replace(reg,'');
      blockEle.classList.add('sb-src-code');
      if (blockEle) {
          hljs.highlightBlock(blockEle);
      }
  }
  function dynamicTabCreation(obj: any): void {
      let tabObj: any;
      if (obj) {
          tabObj = obj;
      } else { tabObj = this; }
      let contentEle: Element = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem);
      if (!contentEle) {
          return;
      }
      let blockEle: Element = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem).children[0];
      blockEle.innerHTML = tabObj.items[tabObj.selectedItem].data;
      blockEle.innerHTML = blockEle.innerHTML.replace(reg,'');
      blockEle.classList.add('sb-src-code');
      if (blockEle) {
          hljs.highlightBlock(blockEle);
      }
  }
  // tslint:disable-next-line:max-func-body-length
  function renderSbPopups(): void {
      switcherPopup = new Popup(document.getElementById('sb-switcher-popup'), {
          relateTo: <HTMLElement>document.querySelector('.sb-header-text-right'), position: { X: 'left' },
          collision: { X: 'flip', Y: 'flip' },
          offsetX: 0,
          offsetY: -15,
      });
      themeSwitherPopup = new Popup(document.getElementById('theme-switcher-popup'), {
          offsetY: 2,
          relateTo: <HTMLElement>document.querySelector('.theme-wrapper'), position: { X: 'left', Y: 'bottom' },
          collision: { X: 'flip', Y: 'flip' }
      });
      searchPopup = new AutoComplete(
          {
              dataSource: [],
              filtering: function (e: any): void {
                  if (e.text && e.text.length < 3) {
                      return;
                  }
                  let val: any = searchInstance.search(e.text, {
                      fields: {
                          component: { boost: 1 },
                          name: { boost: 2 }
                      },
                      expand: true,
                      boolean: 'AND'
                  });
                  let value: any = [];
                  if (Browser.isDevice) {
                      for (let file of val) {
                          if (file.doc.hideOnDevice !== true) {
                              value = value.concat(file);
                          }
                      }
                  }
                  let query: Query = new Query().take(10).select('doc');
                  let fields: any = this.fields;
                  let searchValue: any = Browser.isDevice ? value : val;
                  e.updateData(searchValue, query, fields)
  
              },
              placeholder: 'Search here...',
              noRecordsTemplate: '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
              fields: { groupBy: 'doc.component', value: 'doc.uid', text: 'doc.name' },
              popupHeight: 'auto',
              suggestionCount: 10,
              highlight: true,
              select: (e: any) => {
                  let data: any = e.itemData.doc;
                  let hashval: string = '#/' + location.hash.split('/')[1] + '/' + data.dir + '/' + data.url + '.html';
                  searchPopup.hidePopup();
                  searchOverlay.classList.add('e-search-hidden');
                  if (location.hash !== hashval) {
                      sampleOverlay();
                      location.hash = hashval;
                      window.hashString = location.hash;
                      setSelectList();
                  }
              }
          },
          inputele
      );
      settingsPopup = new Popup(document.getElementById('settings-popup'), {
          offsetY: 5,
          zIndex: 1001,
          relateTo: <any>settingElement,
          position: { X: 'right', Y: 'bottom' }
          , collision: { X: 'flip', Y: 'flip' }
      });
      if (!isMobile) {
          settingsPopup.hide();
          settingsidebar.hide();
      } else {
          select('.sb-mobile-preference').appendChild(select('#settings-popup'));
      }
      searchPopup.hidePopup();
      switcherPopup.hide();
      themeSwitherPopup.hide();
      themeDropDown = new DropDownList({
          index: 0,
          change: (e: any) => { switchTheme(e.value); }
      });
      cultureDropDown = new DropDownList({
          index: 0,
          change: (e: any) => {
              let value: string = e.value;
              changeRtl({
                  locale: value, currencyCode: matchedCurrency[value],
                  enableRtl: value === 'ar'
              });
              currencyDropDown.value = matchedCurrency[value];
              setCulture(e.value);
          }
      });
      currencyDropDown = new DropDownList({
          index: 0,
          change: (e: any) => {
              changeRtl({ currencyCode: e.value });
              //  setCurrencyCode(e.value);
          }
      });
      cultureDropDown.appendTo('#sb-setting-culture');
      currencyDropDown.appendTo('#sb-setting-currency');
      themeDropDown.appendTo('#sb-setting-theme');
      /**
       * Render tab for content
       */
      contentTab = new Tab({
          selected: changeTab, selecting: preventTabSwipe
      },
          // tslint:disable-next-line:align
          '#sb-content');
     // enableRipple(false);
      sourceTab = new Tab({
          items: [],
          headerPlacement: 'Bottom', cssClass: 'sb-source-code-section',
          created: dynamicTabCreation,
          selected: dynamicTab,
          // headerPlacement: 'Bottom', cssClass: 'sb-source-code-section', 
          selecting: preventTabSwipe
      },
          // tslint:disable-next-line:align
          '#sb-source-tab');
      enableRipple(selectedTheme.indexOf('material') !== -1|| !selectedTheme);
      /**
       * api grid
       */
      apiGrid = new Grid({
          width: '100%',
          dataSource: [],
          allowTextWrap: true,
          columns: [
              { field: 'name', headerText: 'Name', template: '#template', width: 180, textAlign: 'Center' },
              { field: 'type', headerText: 'Type', width: 180 },
              { field: 'description', headerText: 'Description', template: '#template-description', width: 200 },
          ],
          dataBound: dataBound
      });
      apiGrid.appendTo('#api-grid');
      /**
       * add header to element
       */
      let prevbutton: Button = new Button({ iconCss: 'sb-icons sb-icon-Previous', cssClass: 'e-flat' }, '#mobile-prev-sample');
      let nextbutton: Button = new Button(
          {
              iconCss: 'sb-icons sb-icon-Next',
              cssClass: 'e-flat', iconPosition: 'Right'
          },
          // tslint:disable-next-line:align
          '#mobile-next-sample');
      let tabHeader: Element = document.getElementById('sb-content-header');
      tabHeader.appendChild(tabContentToolbar);
      let openNew: Tooltip = new Tooltip({
          content: 'Open in New Window'
      });
  
      openNew.appendTo('.sb-open-new-wrapper');
      let previous: Tooltip = new Tooltip({
          content: 'Previous Sample'
      });
  
      previous.appendTo('#prev-sample');
      let next: Tooltip = new Tooltip({
          content: 'Next Sample'
      });
  
      select('#right-pane').addEventListener('scroll', (event: any) => {
          next.close();
          openNew.close();
          previous.close();
      });
  
      next.appendTo('#next-sample');
  }
  
  /**
   * api grid functions
   */
  function checkApiTableDataSource(): void {
      let hash: string[] = location.hash.split('/');
      let data: Object[] = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
      if (!data.length || (isMobile || isTablet)) {
          contentTab.hideTab(2);
      } else {
          contentTab.hideTab(2, false);
      }
  }
  function changeTab(args: any): void {
      if (args.selectedIndex === 2) {
          let hash: string[] = location.hash.split('/');
          let data: Object[] = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
          if (data.length) {
              apiGrid.dataSource = data;
          } else {
              apiGrid.dataSource = [];
          }
      }
      if (args.selectedIndex === 1) {
          sourceTab.items = sourceTabItems;
          sourceTab.refresh();
          renderCopyCode();
          dynamicTabCreation(sourceTab);
      }
  }
  function changeRtl(args: any): void {
      let elementlist: HTMLElement[] = selectAll('.e-control', document.getElementById('control-content'));
      for (let control of elementlist) {
          let eleinstance: Object[] = (<DestroyMethod>control).ej2_instances;
          if (eleinstance) {
              for (let instance of eleinstance) {                 
                  if((<DestroyMethod>instance).getModuleName()==="inplaceeditor" && args.currencyCode){
                    extend(args,(<DestroyMethod>instance).model,{currency : args.currencyCode});
                    (<DestroyMethod>instance).setProperties({model :args});
                  }
                  else{
                    (<DestroyMethod>instance).setProperties(args);
                  }
              }
          }
      }
  }
  function dataBound(args: object): void {
      if (!this.getRows()) {
          return;
      }
      let gridtrs: number = this.getRows().length;
      let trs: any = this.getRows();
      for (let count: number = 0; count < gridtrs; count++) {
          let tr1: HTMLElement = trs[count];
          if (tr1.getBoundingClientRect().height > 100) {
              let desDiv: Element = tr1.querySelector('.sb-sample-description');
              let tag: Element = createElement('a', { id: 'showtag', innerHTML: ' show more...' });
              tag.addEventListener('click', tagShowmore.bind(this, desDiv));
              desDiv.classList.add('e-custDesription');
              desDiv.appendChild(tag);
          }
      }
  }
  
  function tagShowmore(target: HTMLElement): void {
      target.classList.remove('e-custDesription');
      target.querySelector('#showtag').classList.add('e-display');
      let hideEle: Element = target.querySelector('#hidetag');
      if (!hideEle) {
          let tag: Element = createElement('a', { id: 'hidetag', attrs: {}, innerHTML: ' hide less..' });
          target.appendChild(tag);
          tag.addEventListener('click', taghideless.bind(this, target));
      } else {
          hideEle.classList.remove('e-display');
      }
  }
  
  function taghideless(target: HTMLElement): void {
      target.querySelector('#hidetag').classList.add('e-display');
      target.querySelector('#showtag').classList.remove('e-display');
      target.classList.add('e-custDesription');
  }
  
  function setPressedAttribute(ele: HTMLElement): void {
      let status: boolean = ele.classList.contains('active');
      ele.setAttribute('aria-pressed', status ? 'true' : 'false');
  }
  
  // tslint:disable-next-line:max-func-body-length
  function sbHeaderClick(action: string, preventSearch?: boolean | any): void {
      if (openedPopup) {
          openedPopup.hide(new Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
      }
      if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
          searchOverlay.classList.add('sb-hide');
          searchButton.classList.remove('active');
          setPressedAttribute(<HTMLElement>searchButton);
      }
      let curPopup: Popup;
      switch (action) {
          case 'changeSampleBrowser':
              curPopup = switcherPopup;
              break;
          case 'changeTheme':
              headerThemeSwitch.classList.toggle('active');
              setPressedAttribute(headerThemeSwitch);
              curPopup = themeSwitherPopup;
              break;
          case 'toggleSettings':
              settingElement.classList.toggle('active');
              setPressedAttribute(settingElement);
              themeDropDown.index = themeCollection.indexOf(selectedTheme);
              curPopup = settingsPopup;
              break;
      }
      if (action === 'closePopup') {
          headerThemeSwitch.classList.remove('active');
          settingElement.classList.remove('active');
          setPressedAttribute(headerThemeSwitch);
          setPressedAttribute(settingElement);
          if (settingsidebar.isOpen && preventSearch && preventSearch.target && preventSearch.target.closest !== undefined &&
              (preventSearch.target.closest('#sb-setting-theme_popup') || preventSearch.target.closest('#sb-setting-culture_popup') ||
                  preventSearch.target.closest('#sb-setting-currency_popup') || preventSearch.target.closest('.e-sidebar-overlay'))) {
              settingsidebar.hide();
          }
      }
      if (curPopup && curPopup !== openedPopup) {
          curPopup.show(new Animation({ name: 'FadeIn', duration: 400, delay: 0 }));
          openedPopup = curPopup;
      } else {
          openedPopup = null;
      }
      prevAction = action;
  }
  /**
   * toggle search overlay
   */
  function toggleSearchOverlay(): void {
      sbHeaderClick('closePopup', true);
      inputele.value = '';
      searchPopup.hidePopup();
      searchButton.classList.toggle('active');
      setPressedAttribute(<HTMLElement>searchButton);
      searchOverlay.classList.toggle('sb-hide');
      if (!searchOverlay.classList.contains('sb-hide')) {
          inputele.focus();
      }
  }
  /**
   * Theme change function
   */
  
  function changeTheme(e: MouseEvent): void {
      let target: Element = <HTMLElement>e.target;
      target = closest(target, 'li');
      let themeName: string = target.id;
      switchTheme(themeName);
      let imageEditorElem = document.querySelector(".e-image-editor") as HTMLElement;
      if (imageEditorElem != null) {
        let imageEditor: ImageEditor = getComponent(document.getElementById(imageEditorElem.id), 'image-editor') as ImageEditor;
        imageEditor.theme = themeName;
    }
      // loadTheme(themeName);
  }
  
  function switchTheme(str: string): void {
      let hash: string[] = location.hash.split('/');
      if (hash[1] !== str) {
          hash[1] = str;
          location.hash = hash.join('/');
      }
  }
  
  function highlight(searchString: string, listElement: any): void {
      let regex: RegExp = new RegExp(searchString.split(' ').join('|'), 'gi');
      let contentElements: any[] = selectAll('.e-list-item .e-text-content .e-list-text', listElement);
      for (let i: number = 0; i < contentElements.length; i++) {
          let spanText: any = select('.sb-highlight');
          if (spanText) {
              contentElements[i].innerHTML = contentElements[i].text;
          }
          contentElements[i].innerHTML = contentElements[i].innerHTML.replace(regex, (matched: string) => {
              return '<span class="sb-highlight">' + matched + '</span>';
          });
      }
  }
  /**
   * Storing the mouse action
   */
  function setMouseOrTouch(e: MouseEvent): void {
      let ele: HTMLElement = <any>closest(<any>e.target, '.sb-responsive-items');
      let switchType: string = ele.id;
      changeMouseOrTouch(switchType);
      sbHeaderClick('closePopup');
      localStorage.setItem('ej2-switch', switchType);
      location.reload();
  }
  /**
   * button cick handlers
   */
  function onNextButtonClick(arg: MouseEvent): void {
      sampleOverlay();
      let curSampleUrl: string = location.hash;
      let inx: number = samplesAr.indexOf(curSampleUrl);
      if (inx !== -1) {
          let prevhref: string = samplesAr[inx];
          let curhref: string = samplesAr[inx + 1];
          location.href = curhref;
      }
      window.hashString = location.hash;
      setSelectList();
  }
  
  function onPrevButtonClick(arg: MouseEvent): void {
      sampleOverlay();
      let curSampleUrl: string = location.hash;
      let inx: number = samplesAr.indexOf(curSampleUrl);
      if (inx !== -1) {
          let prevhref: string = samplesAr[inx];
          let curhref: string = samplesAr[inx - 1];
          location.href = curhref;
      }
      window.hashString = location.hash;
      setSelectList();
  }
  /**
   * Resize event processing
   */
  // tslint:disable-next-line:max-func-body-length
  function processResize(e: any): void {
      let toggle: boolean = sidebar.isOpen;
      isMobile = window.matchMedia('(max-width:550px)').matches;
      isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
      if (isTablet) {
          resizeManualTrigger = false;
      }
      if (resizeManualTrigger || (isMobile && select('#right-sidebar').classList.contains('sb-hide'))) {
          return;
      }
      isPc = window.matchMedia('(min-width:850px)').matches;
      processDeviceDependables();
      setLeftPaneHeight();
      let leftPane: Element = select('.sb-left-pane');
      let rightPane: Element = select('.sb-right-pane');
      let footer: Element = select('.sb-footer-left');
      let pref: Element = select('#settings-popup');
      if (isTablet || isMobile) {
          contentTab.hideTab(2);
      } else {
          contentTab.hideTab(2, false);
      }
      if (toggle && !isPc) {
          toggleLeftPane();
      }
      if (isMobile || isTablet) {
          sidebar.target = null;
          sidebar.showBackdrop = true;
          sidebar.closeOnDocumentClick = true;
          select('.sb-left-footer-links').appendChild(footer);
          if (isTablet) {
              select('.sb-footer').appendChild(footer);
          }
          if (isVisible('.sb-mobile-overlay')) {
              removeMobileOverlay();
          }
          if (!pref.parentElement.classList.contains('sb-mobile-preference')) {
              select('.sb-mobile-preference').appendChild(pref);
              settingsPopup.show();
          }
          let propPanel: Element = select('#control-content .property-section');
          if (propPanel) {
              select('.sb-mobile-prop-pane').appendChild(propPanel);
              select('.sb-mobile-setting').classList.remove('sb-hide');
          }
          if (isVisible('.sb-mobile-overlay')) {
              removeMobileOverlay();
          }
      }
      if (isPc) {
          sidebar.target = <HTMLElement>document.querySelector('.sb-content ');
          sidebar.showBackdrop = false;
          sidebar.closeOnDocumentClick = false;
          if (isVisible('.sb-mobile-overlay')) {
              removeMobileOverlay();
          }
          if (isPc && !Browser.isDevice && isVisible('.sb-left-pane')) {
              rightPane.classList.remove('control-fullview');
          }
          if (pref.parentElement.classList.contains('sb-mobile-preference')) {
              select('#sb-popup-section').appendChild(pref);
              settingsidebar.hide();
              settingsPopup.hide();
          }
          let mobilePropPane: Element = select('.sb-mobile-prop-pane .property-section');
          if (mobilePropPane) {
              select('#control-content').appendChild(mobilePropPane);
          }
          if (!select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
              toggleRightPane();
          }
      }
      if (switcherPopup) {
          switcherPopup.refreshPosition();
      }
  }
  
  function resizeFunction(): void {
      if (!isMobile && !isTablet) {
          resizeManualTrigger = true;
          setTimeout(() => cusResize(), 400);
      }
  }
  
  function resetInput(arg: MouseEvent): void {
      arg.preventDefault();
      arg.stopPropagation();
      (<HTMLInputElement>document.getElementById('search-input')).value = '';
      document.getElementById('search-input-wrapper').setAttribute('data-value', '');
      searchPopup.hidePopup();
  }
  /**
   * Binding events for sample browser operations
   */
  function bindEvents(): void {
      document.getElementById('sb-switcher').addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          sbHeaderClick('changeSampleBrowser');
      });
      select('.sb-header-text-right').addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          sbHeaderClick('changeSampleBrowser');
      });
      headerThemeSwitch.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          sbHeaderClick('changeTheme');
      });
      themeList.addEventListener('click', changeTheme);
      // tslint:disable
      document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
      settingElement.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          sbHeaderClick('toggleSettings');
      });
      searchButton.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSearchOverlay();
      });
      document.getElementById('settings-popup').addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
      });
      inputele.addEventListener('click', (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
      });
      setResponsiveElement.addEventListener('click', setMouseOrTouch);
      select('#sb-left-back').addEventListener('click', showHideControlTree);
      leftToggle.addEventListener('click', toggleLeftPane);
      select('.sb-header-settings').addEventListener('click', viewMobilePrefPane);
      select('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
      resetSearch.addEventListener('click', resetInput);
      /**
       * plnkr trigger
       */
      document.getElementById('open-plnkr').addEventListener('click', () => {
          let plnkrForm: HTMLFormElement = select('#stack-form') as HTMLFormElement;
          if (plnkrForm) {
              plnkrForm.submit();
          }
      });
      document.getElementById('switch-sb').addEventListener('click', (e: MouseEvent) => {
          let target: Element = closest(<any>e.target, 'li');
          if (target) {
              let anchor: any = target.querySelector('a');
              if (anchor) {
                  anchor.click();
              }
          }
      });
      /**
       * prev-button-click
       */
      select('#next-sample').addEventListener('click', onNextButtonClick);
      select('#mobile-next-sample').addEventListener('click', onNextButtonClick);
      select('#prev-sample').addEventListener('click', onPrevButtonClick);
      select('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
      /**
       * resize event
       */
      window.addEventListener('resize', processResize);
      select('.sb-right-pane').addEventListener('click', () => {
          if (isTablet && isLeftPaneOpen()) {
              toggleLeftPane();
          }
      });
      // select('.copycode').addEventListener('click', copyCode);
  }
  
  /**
   * set anchor links for other sample browser
   */
  
  /**
   * 
   */
  function copyCode(): void {
      let copyElem: HTMLElement = selectAll('.sb-src-code')[sourceTab.selectedItem] as HTMLElement;
      let textArea: HTMLTextAreaElement = createElement('textArea') as HTMLTextAreaElement;
      textArea.textContent = copyElem.textContent.trim();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      detach(textArea);
      (select('.copy-tooltip') as any).ej2_instances[0].close();
  }
  function renderCopyCode() {
      let ele: HTMLElement = createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
      document.getElementById('sb-source-tab').appendChild(ele);
      select('.copycode').addEventListener('click', copyCode);
      let copiedTooltip: Tooltip = new Tooltip({
          content: 'Copied to clipboard ',
          position: 'BottomCenter',
          opensOn: 'Click',
          closeDelay: 500
      });
      copiedTooltip.appendTo(ele);
      select('.copycode').addEventListener('click', copyCode);
  }
  
  function setSbLink(): void {
      let href: string = location.href;
      let link: string[] = href.match(urlRegex);
      let sample: string = href.match(sampleRegex)[1];
      for (let sb of sbArray) {
          let ele: HTMLFormElement = <HTMLFormElement>select('#' + sb);
          if (sb === 'aspnetcore' || sb === 'aspnetmvc') {
              ele.href = sb === 'aspnetcore' ? 'https://ej2.syncfusion.com/aspnetcore/' : 'https://ej2.syncfusion.com/aspnetmvc/';
          } else if (sb === 'blazor') { 
              ele.href = 'https://blazor.syncfusion.com/demos/';
          } else {
              ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) +
                  sb + '/' + 'demos/#/' + sample + (sb === 'javascript' ? '.html' : '');
          }
      }
  }
  /**
   * Set Mouse or Touch on page load
   */
  function changeMouseOrTouch(str: string): void {
      let activeEle: Element = setResponsiveElement.querySelector('.active');
      if (activeEle) {
          activeEle.classList.remove('active');
      }
      if (str === 'mouse') {
          document.body.classList.remove('e-bigger');
      } else {
          document.body.classList.add('e-bigger');
      }
      setResponsiveElement.querySelector('#' + str).classList.add('active');
  }
  /**
   * load theme on page loading
   */
  function loadTheme(theme: string): void {
      let body: HTMLElement = document.body;
      if (body.classList.length > 0) {
          for (let themeItem of themeCollection) {
              body.classList.remove(themeItem);
          }
      }
      body.classList.add(theme);
      themeList.querySelector('.active').classList.remove('active');
      themeList.querySelector('#' + theme).classList.add('active');
      let doc: HTMLFormElement = <HTMLFormElement>document.getElementById('themelink');
      doc.setAttribute('href','./styles/' + theme + '.css');
      let ajax: Ajax = new Ajax('./styles/' + theme + '.css', 'GET', true);
      ajax.send().then((result: any) => {
          selectedTheme = theme;
          //renderleftpane 
          renderLeftPaneComponents();
          //renderPopups
          renderSbPopups();
          bindEvents();
          if (isTablet || isMobile) {
              contentTab.hideTab(2);
          }
          // add routing
          //triggerRouting
          processDeviceDependables();
          addRoutes(<Controls[]>samplesList);
          //setSbLink();
          //bindEvents();
          /**
           * load elastic lunr
           */
          if (isTablet && isLeftPaneOpen()) {
              toggleLeftPane();
          }
          (elasticlunr as any).clearStopWords();
          searchInstance = (elasticlunr as any).Index.load(searchJson);
          hasher.initialized.add(parseHash);
          hasher.changed.add(parseHash);
          hasher.init();
      });
  }
  /**
   * Mobile Overlay 
   */
  
  function removeMobileOverlay(): void {
      select('.sb-mobile-overlay').classList.add('sb-hide');
  }
  function isLeftPaneOpen(): boolean {
      return sidebar.isOpen;
  }
  function isVisible(elem: string): boolean {
      return !select(elem).classList.contains('sb-hide');
  }
  /**
   * left pane toggle function
   */
  function setLeftPaneHeight(): void {
      let leftPane: HTMLElement = select('.sb-left-pane') as HTMLElement;
      leftPane.style.height = isMobile ? (document.body.offsetHeight + 'px') : '';
  }
  
  function toggleLeftPane(): void {
      let reverse: boolean = sidebar.isOpen;
      select('#left-sidebar').classList.remove('sb-hide');
      if (!reverse) {
          leftToggle.classList.add('toggle-active');
      } else {
          leftToggle.classList.remove('toggle-active');
      }
      if (sidebar) {
          reverse = sidebar.isOpen;
          if (reverse) {
              sidebar.hide();
          } else {
              sidebar.show();
          }
      }
  }
  
  function cusResize() {
      let event: Event;
      if (typeof (Event) === 'function') {
          event = new Event('resize');
      } else {
          event = document.createEvent('Event');
          event.initEvent('resize', true, true);
      }
      window.dispatchEvent(event);
  }
  
  
  /**
   * Mobile Right pane toggle functions
   */
  function toggleRightPane(): void {
      select('#right-sidebar').classList.remove('sb-hide');
      themeDropDown.index = themeCollection.indexOf(selectedTheme);
      if (isMobile) {
          settingsidebar.toggle();
      }
  }
  function viewMobilePrefPane(): void {
      select('.sb-mobile-prop-pane').classList.add('sb-hide');
      select('.sb-mobile-preference').classList.remove('sb-hide');
      toggleRightPane();
  }
  function viewMobilePropPane(): void {
      select('.sb-mobile-preference').classList.add('sb-hide');
      select('.sb-mobile-prop-pane').classList.remove('sb-hide');
      toggleRightPane();
  }
  /**
   * left pane samples switcher functions start
   */
  function getSampleList(): Controls[] | { [key: string]: Object }[] {
      if (Browser.isDevice) {
          //  (select('.copy-tooltip') as HTMLElement).style.display = 'none';
          let tempList: Controls[] = <Controls[]>extend([], samplesJSON.samplesList);
          let sampleList: any = [];
          for (let temp of tempList) {
              if (temp.hideOnDevice == true) {
                  continue;
              }
              let data: DataManager = new DataManager((temp as any).samples);
              temp.samples = <Samples[]>data.executeLocal(new Query().where('hideOnDevice', 'notEqual', true));
              sampleList = sampleList.concat(temp);
          }
          return sampleList;
      }
      return samplesJSON.samplesList;
  }
  
  function renderLeftPaneComponents(): void {
      samplesTreeList = getTreeviewList(samplesList);
      let sampleTreeView: TreeView = new TreeView(
          {
              fields: {
                  dataSource: samplesTreeList, id: 'id', parentID: 'pid',
                  text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url'
              },
              nodeClicked: controlSelect,
              nodeTemplate: '<div><span class="tree-text">${name}</span>' +
                  '${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">Updated</span>' +
                  '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">${type}</span>${/if}${/if}</div>'
          },
          '#controlTree');
      let controlList: ListView = new ListView(
          {
              dataSource: controlSampleData[location.hash.split('/')[2]] || controlSampleData.grid,
              fields: { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' },
              select: controlSelect,
              template: '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text" role="listitem">${name}' +
                  '</span>${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type}">Updated</span>' +
                  '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type}">${type}</span>${/if}${/if}' +
                  '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>',
              groupTemplate: '${if(items[0]["category"])}<div class="e-text-content">' +
                  '<span class="e-list-text">${items[0].category}</span>' +
                  '</div>${/if}',
              actionComplete: setSelectList
          },
          '#controlList');
  }
  function getTreeviewList(list: any[]): Controls[] | { [key: string]: Object }[] {
      let id: number;
      let pid: number;
      let tempList: any[] = [];
      let category: string = '';
      for (let i: number = 0; i < list.length; i++) {
          if (category !== list[i].category) {
              category = list[i].category;
              tempList = tempList.concat({ id: i + 1, name: list[i].category, hasChild: true, expanded: true });
              pid = i + 1;
              id = pid;
          }
          id += 1;
          tempList = tempList.concat(
              {
                  id: id,
                  pid: pid,
                  name: list[i].name,
                  type: list[i].type,
                  url: {
                      'data-path': '/' + list[i].directory + '/' + list[i].samples[0].url + '.html',
                      'control-name': list[i].directory,
                  }
              });
          controlSampleData[list[i].directory] = getSamples(list[i].samples);
      }
      return tempList;
  }
  
  function getSamples(samples: any): any {
      let tempSamples: any = [];
      for (let i: number = 0; i < samples.length; i++) {
          tempSamples[i] = samples[i];
          tempSamples[i].data = { 'sample-name': samples[i].url, 'data-path': '/' + samples[i].dir + '/' + samples[i].url + '.html' };
      }
      return tempSamples;
  }
  function controlSelect(arg: any): void {
      let path: string = (arg.node || arg.item).getAttribute('data-path');
      let curHashCollection: string = '/' + location.hash.split('/').slice(2).join('/');
      if (path) {
          controlListRefresh(arg.node || arg.item);
          if (path !== curHashCollection) {
              sampleOverlay();
              let theme: string = location.hash.split('/')[1] || 'material3';
              if (arg.item && ((isMobile && !select('#left-sidebar').classList.contains('sb-hide')) ||
                  ((isTablet || (Browser.isDevice && isPc)) && isLeftPaneOpen()))) {
                  toggleLeftPane();
              }
              window.hashString = '#/' + theme + path;
              setTimeout(() => { 
                  location.hash = '#/' + theme + path;
              }, 600);
          }
      }
  }
  
  function controlListRefresh(ele: Element): void {
      let samples: any = controlSampleData[ele.getAttribute('control-name')];
      if (samples) {
          let listView: ListView = (select('#controlList') as any).ej2_instances[0];
          listView.dataSource = samples;
          showHideControlTree();
      }
  }
  
  function showHideControlTree(): void {
      let controlTree: HTMLElement = select('#controlTree') as HTMLElement;
      let controlList: HTMLElement = select('#controlSamples') as HTMLElement;
      let reverse: boolean = (select('#controlTree') as HTMLElement).style.display === 'none';
      reverse ? viewSwitch(controlList, controlTree, reverse) : viewSwitch(controlTree, controlList, reverse);
  }
  
  function viewSwitch(from: HTMLElement, to: HTMLElement, reverse: boolean): void {
      let anim: Animation = new Animation({ duration: 500, timingFunction: 'ease' });
      let controlTree: HTMLElement = select('#controlTree') as HTMLElement;
      let controlList: Element = select('#controlList');
      controlTree.style.overflowY = 'hidden';
      controlList.classList.remove('e-view');
      controlList.classList.remove('sb-control-list-top');
      controlList.classList.add('sb-adjust-juggle');
      to.style.display = '';
      anim.animate(from, {
          name: reverse ? 'SlideRightOut' : 'SlideLeftOut', end: (): void => {
              controlTree.style.overflowY = 'auto';
              from.style.display = 'none';
              controlList.classList.add('e-view');
              controlList.classList.add('sb-control-list-top');
              controlList.classList.remove('sb-adjust-juggle');
          }
      });
      anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
  }
  
  function setSelectList(): void {
      let hString: string = window.hashString || location.hash;
      let hash: string[] = hString.split('/');
      let list: ListView = (select('#controlList') as any).ej2_instances[0];
      let control: Element = select('[control-name="' + hash[2] + '"]');
      if (control) {
          let data: any = list.dataSource;
          let samples: any = controlSampleData[control.getAttribute('control-name')];
          if (JSON.stringify(data) !== JSON.stringify(samples)) {
              list.dataSource = samples;
              list.dataBind();
          }
          let selectSample: Element = select('[sample-name="' + hash.slice(-1)[0].split('.html')[0] + '"]');
          if (selectSample) {
              if ((select('#controlTree') as HTMLElement).style.display !== 'none') {
                  showHideControlTree();
              }
              list.selectItem(selectSample);
              selectSample.scrollIntoView({ block: "nearest" })
          }
      } else {
          showHideControlTree();
          list.selectItem(select('[sample-name="grid-overview"]'));
      }
  }
  /**
   * Sample Navigation
   */
  function toggleButtonState(id: string, state: boolean): void {
      let ele: HTMLButtonElement = <HTMLButtonElement>document.getElementById(id);
      let mobileEle: HTMLButtonElement = <HTMLButtonElement>document.getElementById('mobile-' + id);
      ele.disabled = state;
      mobileEle.disabled = state;
      if (state) {
          mobileEle.classList.add('e-disabled');
          ele.classList.add('e-disabled');
      } else {
          mobileEle.classList.remove('e-disabled');
          ele.classList.remove('e-disabled');
      }
  }
  /**
   * Routing functions
   */
  
  function setPropertySectionHeight(): void {
      let propertypane: HTMLElement = <any>select('.property-section');
      let ele: HTMLElement = <any>document.querySelector('.control-section');
      if (ele && propertypane) {
          ele.classList.add('sb-property-border');
      } else {
          ele.classList.remove('sb-property-border');
      }
  }
  
  function routeDefault(): void {
      addRoute('', () => {
          window.location.href = '#/' + selectedTheme + '/grid/grid-overview.html';
          isInitRedirected = true;
      });
      bypassed.add((request: string) => {
          let hash: string[] = request.split('.html')[0].split('/');
          if (samplePath.indexOf(hash.slice(1).join('/')) === -1) {
              location.hash = '#/' + hash[0] + '/' + (defaultSamples[hash[1]] || 'grid/grid-overview.html');
              isInitRedirected = true;
          }
      });
  }
  function destroyControls(): void {
      let elementlist: HTMLElement[] = selectAll('.e-control', document.getElementById('control-content'));
      for (let control of elementlist) {
          let eleinstance: Object[] = (<DestroyMethod>control).ej2_instances;
          if (eleinstance) {
              for (let instance of eleinstance) {
                  (<DestroyMethod>instance).destroy();
              }
          }
      }
  }
  
  
  function loadScriptfile(path: string): Promise<Object> {
      let scriptEle: HTMLScriptElement = <HTMLScriptElement>document.querySelector('script[src="' + path + '"]');
      let doFun: Function;
      let p2: Promise<Object> = new Promise((resolve: Function, reject: Function) => {
          doFun = resolve;
      });
      if (!scriptEle) {
          scriptEle = document.createElement('script');
          scriptEle.setAttribute('type', 'text/javascript');
          scriptEle.setAttribute('src', path);
          scriptEle.onload = <() => void>doFun;
          if (typeof scriptEle !== 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(scriptEle);
          }
      } else {
          doFun();
      }
      return p2;
  }
  function getExecFunction(sample: string): Function {
      if ((<Object>execFunction).hasOwnProperty(sample)) {
          return <Function>execFunction[sample];
      } else {
          return execFunction[sample] = (window as any).default;
      }
  }
  function errorHandler(error: string): void {
      document.getElementById('control-content').innerHTML = error ? error : 'Not Available';
      select('#control-content').classList.add('error-content');
      removeOverlay();
  }
  function plunker(results: string): void {
      let plnkr: { [key: string]: Object } = JSON.parse(results);
      let prevForm: Element = select('#stack-form');
      if (prevForm) {
          detach(prevForm);
      }
      let form: HTMLFormElement = <HTMLFormElement>createElement('form');
      let res: string = 'https://stackblitz.com/run';
      form.setAttribute('action', res);
      form.setAttribute('method', 'post');
      form.setAttribute('target', '_blank');
      form.id = 'stack-form';
      form.style.display = 'none';
      document.body.appendChild(form);
      let plunks: string[] = Object.keys(plnkr);
      for (let x: number = 0; x < plunks.length; x++) {
        createStackInput((plunks[x] === 'package.json' ? 'project[dependencies]' : 'project[files][' + plunks[x] + ']'), plnkr[plunks[x]] as string, form);
      }
      createStackInput('project[template]', 'typescript', form);
      createStackInput('project[description]', 'Essential JS 2 Sample', form);
      createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
  }
  
  function createStackInput(name: string, value: string, form: HTMLFormElement): void {
      let input: HTMLElement = createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', name);
      input.setAttribute('value', value.replace(/{{theme}}/g, selectedTheme).replace(/{{ripple}}/,
          (selectedTheme.indexOf('material') !== -1) ? 'import { enableRipple } from \'@syncfusion/ej2-base\';\nenableRipple(true);\n' : ''));
      form.appendChild(input);
  }
  
  // tslint:disable-next-line:max-func-body-length
  function addRoutes(samplesList: Controls[]): void {
      for (let node of samplesList) {
          defaultSamples[node.directory] = node.directory + '/' + node.samples[0].url + '.html';
          let dataManager: DataManager = new DataManager((node as any).samples);
          let samples: Samples[] & { [key: string]: Object }[] = <Samples[] & { [key: string]: Object }[]>
              dataManager.executeLocal(new Query().sortBy('order', 'ascending'));
          for (let subNode of samples) {
              let control: string = node.directory;
              let sample: string = subNode.url;
              samplePath = samplePath.concat(control + '/' + sample);
              let sampleName: string = node.name + ' / ' + ((node.name !== subNode.category) ?
                  (subNode.category + ' / ') : '') + subNode.name;
              let selectedTheme: string = location.hash.split('/')[1] ? location.hash.split('/')[1] : 'material3';
              let urlString: string = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
              samplesAr.push('#' + urlString);
              // tslint:disable-next-line:max-func-body-length
              addRoute(urlString, () => {
                  let controlID: string = node.uid;
                  let sampleID: string = subNode.uid;
                  (document.getElementById('open-plnkr') as any).disabled = true;
                  let openNew: HTMLFormElement = (select('#openNew') as HTMLFormElement);
                  if (openNew) {
                      openNew.href = location.href.split('#')[0] + node.directory + '/' + subNode.url + '/index.html';
                  }
                  setSbLink();
                  // select('#switch').classList.remove('hidden');
                  //document.getElementById('source-panel').style.display = 'block';
                  // .href =
                  //     location.href.split('#')[0] + 'samples/' + node.directory + '/' + subNode.url + '/index.html';
                  let sourcePromise: Array<Promise<Ajax>> = [];
                  let sObj: any[] = [];
                  sourcePromise.push((new Ajax('src/' + control + '/' + sample + '.ts', 'GET', true)).send());
                  sObj.push({
                      header: { text: sample + '.ts' },
                      data: '',
                      content: sample + '.ts'
                  });
                  sourcePromise.push((new Ajax('src/' + control + '/' + sample + '.html', 'GET', true)).send());
                  sObj.push({
                      header: { text: sample + '.html' },
                      data: '',
                      content: sample + '.html'
                  });
                  if (subNode.sourceFiles) {
                      sourcePromise = [];
                      sObj = [];
                      let sourcefiles: any = subNode.sourceFiles;
                      for (let sfile of sourcefiles) {
                          let spromise: Promise<Ajax> = (new Ajax(sfile.path, 'GET', true)).send();
                          sourcePromise.push(spromise);
                          sObj.push({
                              header: { text: sfile.displayName },
                              data: '',
                              content: sfile.displayName
                          });
                      }
                  }
                  let content: any;
                  Promise.all(sourcePromise).then((results: Object[]): void => {
                      results.forEach((value, index) => {
                          let srcobj = sObj[index];
                          if (srcobj.content.indexOf('.html') > 0) {
                              content = getStringWithOutDescription(value.toString(), /(\'|\")description/g);
                              content = getStringWithOutDescription(content.toString(), /(\'|\")action-description/g)
                          }
                          let defRegex: RegExp = /(this.|export |\(window as any\).)default (= |)\(\)(: void|) => {/g;
                          let resValue: string = value.toString().replace(defRegex, '');
                          resValue = resValue.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                          var lInd = resValue.lastIndexOf('};');
                          resValue = resValue.substring(0, lInd) + resValue.substring(lInd + 2);
                          content = srcobj.content.indexOf('.html') > 0 ? content.replace(/@section (ActionDescription|Description){[^}]*}/g, '').replace(/&/g, '&amp;')
                              .replace(/"/g, '&quot;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : resValue;
  
                          sObj[index].data = content;
                      });
                      sourceTabItems = sObj;
                  });
                  let ajaxHTML: Ajax = new Ajax('src/' + control + '/' + sample + '.html', 'GET', true);
                  let p1: Promise<Ajax> = ajaxHTML.send();
                  let p2: Promise<Object> = loadScriptfile('src/' + control + '/' + sample + '.js');
                  /**
                   * sample header
                   */
                  sampleNameElement.innerHTML = node.name;
                  /**
                   * BreadCrumb
                   */
                  contentTab.selectedItem = 0;
                  breadCrumbComponent.innerHTML = node.name;
                  if (node.name !== subNode.category) {
                      breadCrumbSubCategory.innerHTML = subNode.category;
                      breadCrumbSubCategory.style.display = '';
                      breadCrumSeperator.style.display = '';
                  } else {
                      breadCrumbSubCategory.style.display = 'none';
                      breadCrumSeperator.style.display = 'none';
                  }
                  breadCrumbSample.innerHTML = subNode.name;
                  let title: HTMLElement = document.querySelector('title');
                  title.innerHTML = node.name + ' · ' + subNode.name + ' · Essential JS 2 · Syncfusion ';
                  let plunk: Ajax = new Ajax('src/' + control + '/' + sample + '-stack.json', 'GET', true);
                  let p3: Promise<Ajax> = plunk.send();
                  p3.then((result: Object) => {
                      (document.getElementById('open-plnkr') as any).disabled = false;
                      plunker(<string>result);
                  });
                  Promise.all([
                      p1,
                      p2
                  ]).then((results: Object[]): void => {
                      let htmlString: string = results[0].toString();
                      destroyControls();
                      currentControlID = controlID;
                      currentSampleID = sampleID;
                      currentControl = node.directory;
                      let curIndex: number = samplesAr.indexOf(location.hash);
                      let samLength: number = samplesAr.length - 1;
                      if (curIndex === samLength) {
                          toggleButtonState('next-sample', true);
                      } else {
                          toggleButtonState('next-sample', false);
                      }
                      if (curIndex === 0) {
                          toggleButtonState('prev-sample', true);
                      } else {
                          toggleButtonState('prev-sample', false);
                      }
                      select('#control-content').classList.remove('error-content');
                      document.getElementById('control-content').innerHTML = htmlString;
                      let controlEle: Element = document.querySelector('.control-section');
                      let controlString: string = controlEle.innerHTML;
                      controlEle.innerHTML = '';
                      controlEle.appendChild(createElement('div', { className: 'control-wrapper', innerHTML: controlString }));
                      renderPropertyPane('#property');
                      renderDescription();
                      renderActionDescription();
                      //document.getElementsByClassName('sample-name')[0].innerHTML = sampleName;
                      let htmlCode: HTMLElement = createElement('div', { innerHTML: htmlString });
                      let description: Element = htmlCode.querySelector('#description');
                      if (description) {
                          detach(description);
                      }
                      let actionDesc: Element = htmlCode.querySelector('#action-description');
                      if (actionDesc) {
                          detach(actionDesc);
                      }
                      getExecFunction(control + sample)();
                      window.navigateSample();
                      //select('.sb-loading').classList.add('hidden');
                      //document.body.classList.remove('sb-overlay');
                      //select('#source-panel').classList.remove('hidden');
                      isExternalNavigation = defaultTree = false;
                      checkApiTableDataSource();
                      setPropertySectionHeight();
                      removeOverlay();
                      let mobilePropPane: Element = select('.sb-mobile-prop-pane .property-section');
                      if (mobilePropPane) {
                          detach(mobilePropPane);
                      }
                      let propPanel: Element = select('#control-content .property-section');
                      if (isMobile) {
                          if (propPanel) {
                              select('.sb-mobile-setting').classList.remove('sb-hide');
                              select('.sb-mobile-prop-pane').appendChild(propPanel);
                          } else {
                              select('.sb-mobile-setting').classList.add('sb-hide');
                          }
                      }
                  });
              });
          }
      }
      let isTempLocaion: string;
      if(location.hash.indexOf('.html') === -1) {
          isTempLocaion = location.hash+".html";
      } else {
          isTempLocaion = location.hash;
      }
      if(Browser.isDevice)
      {
         if(location.hash && location.hash !== "" && samplesAr.indexOf(isTempLocaion) == -1)
         {
          let toastObj: Toast = new Toast({
              position: {
                  X: 'Right'
              }
          });
          toastObj.appendTo('#sb-home');
          setTimeout(
              () => {
                  toastObj.show({
                      content: `${location.hash.split('/')[2]} component not supported in mobile device`
                  });
          },  200);
         }
      }
  }
  function removeOverlay(): void {
      document.body.setAttribute('aria-busy', 'false');
      sbContentOverlay.classList.add('sb-hide');
      sbRightPane.classList.remove('sb-right-pane-overlay');
      sbHeader.classList.remove('sb-right-pane-overlay');
      mobNavOverlay(false);
      if (!sbBodyOverlay.classList.contains('sb-hide')) {
          sbBodyOverlay.classList.add('sb-hide');
      }
      if (!isMobile) {
          sbRightPane.scrollTop = 0;
      } else {
          sbRightPane.scrollTop = 74;
      }
      if(cultureDropDown.value !== 'en'){
          changeRtl({
              locale: cultureDropDown.value,
              enableRtl: cultureDropDown.value === 'ar',
              currencyCode: currencyDropDown.value
          });
      }
     
  }
  
  function sampleOverlay(): void {
      document.body.setAttribute('aria-busy', 'true');
      sbHeader.classList.add('sb-right-pane-overlay');
      sbRightPane.classList.add('sb-right-pane-overlay');
      mobNavOverlay(true);
      sbContentOverlay.classList.remove('sb-hide');
  }
  
  function mobNavOverlay(isOverlay: boolean): void {
      if (Browser.isDevice) {
          let mobileFoorter: HTMLElement = <HTMLElement>select('.sb-mobilefooter');
          if (isOverlay) {
              mobileFoorter.classList.add('sb-right-pane-overlay');
          } else {
              mobileFoorter.classList.remove('sb-right-pane-overlay');
          }
      }
  }
  function overlay(): void {
      sbHeader.classList.add('sb-right-pane-overlay');
      sbBodyOverlay.classList.remove('sb-hide');
  }
  
  function checkSampleLength(directory: string): boolean {
      let data: DataManager = new DataManager(samplesList as any);
      let controls: Controls[] = <Controls[]>data.executeLocal(new Query().where('directory', 'equal', directory));
      return controls[0].samples.length > 1;
  }
  
  function parseHash(newHash: string, oldHash: string): void {
      let newTheme: string = newHash.split('/')[0];
      let control: string = newHash.split('/')[1];
      if (newTheme !== selectedTheme && themeCollection.indexOf(newTheme) !== -1) {
          location.reload();
      }
      (samplesJSON.skipCommonChunk as any) = (window as any).sampleSkip || [];
      if (newHash.length && !select('#' + control + '-common') && checkSampleLength(control) &&
          samplesJSON.skipCommonChunk.indexOf(control) === -1) {
          let scriptElement: HTMLScriptElement = document.createElement('script');
          scriptElement.src = 'src/' + control + '/common.js';
          scriptElement.id = control + '-common';
          scriptElement.type = 'text/javascript';
          scriptElement.onload = () => {
              parse(newHash);
          };
          document.getElementsByTagName('head')[0].appendChild(scriptElement);
      } else {
          parse(newHash);
      }
  }
  
  function getSourceTabHeader(index: number): Element {
      return document.querySelectorAll('.sb-source-code-section>.e-tab-header .e-tab-text')[index];
  }
  
  function processDeviceDependables(): void {
      if (Browser.isDevice) {
          select('.sb-desktop-setting').classList.add('sb-hide');
      } else {
          select('.sb-desktop-setting').classList.remove('sb-hide');
      }
  }
  /*
   * left pane functions end
   */
  /*
   * Tab hide on intial load
   */
  function checkTabHideStatus(): void {
      if (!intialLoadCompleted) {
          contentTab.hideTab(1);
          intialLoadCompleted = true;
      }
  }
  function getStringWithOutDescription(code: string, descRegex: RegExp): string {
      let lines: string[] = code.split('\n');
      let desStartLine: number = null;
      let desEndLine: number = null;
      let desInsideDivCnt: number = 0;
      for (let i: number = 0; i < lines.length; i++) {
          let curLine: string = lines[i];
          if (desStartLine) {
              if (/<div/g.test(curLine)) {
                  desInsideDivCnt = desInsideDivCnt + 1;
              }
              if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                  desInsideDivCnt = desInsideDivCnt - 1;
              } else if (!desEndLine && /<\/div>/g.test(curLine)) {
                  desEndLine = i + 1;
              }
          }
          if (descRegex.test(curLine)) {
              desStartLine = i;
          }
      }
      if (desEndLine && desStartLine) {
          lines.splice(desStartLine, desEndLine - desStartLine);
      }
      return lines.join('\n');
  }
  
  /**
   * init function
   */
  function loadJSON(): void {
      /**
       * Mouse or touch setting
       */
      let switchText: string = localStorage.getItem('ej2-switch') || 'mouse';
      if (Browser.isDevice || window.screen.width <= 850) {
          switchText = 'touch';
      }
      /**
       * Left Pane Height Setting
       */
      setLeftPaneHeight();
      /**
       * Mobile View
       */
      if (isMobile) {
          select('.sb-left-footer-links').appendChild(select('.sb-footer-left'));
          select('#left-sidebar').classList.add('sb-hide');
          leftToggle.classList.remove('toggle-active');
      }
      /**
       * Tab View
       */
      if (isTablet || (Browser.isDevice && isPc)) {
          leftToggle.classList.remove('toggle-active');
          select('.sb-right-pane').classList.add('control-fullview');
      }
      overlay();
      changeMouseOrTouch(switchText);
      enableRipple(selectedTheme.indexOf('material') !== -1|| !selectedTheme);
      localStorage.removeItem('ej2-switch');
      loadTheme(selectedTheme);
  }
  
  
  loadJSON();
  
