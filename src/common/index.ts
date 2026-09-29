/// <reference path='./sampleList.ts' />
/**
 * default script manupulation for sample browser
 */

import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import { runAxeReport } from './accessibility/axe-integration';
import { Toast, Message } from '@syncfusion/ej2-notifications';
import { Animation, Browser, extend, setCulture, enableRipple, Ajax, closest, createElement, detach, L10n } from '@syncfusion/ej2-base';
import { select, setCurrencyCode, loadCldr, selectAll, registerLicense, getComponent } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { DropDownList, AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { Tab, TreeView, Sidebar, EventArgs } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { Grid } from '@syncfusion/ej2-grids';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { create } from 'crossroads';
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
let crossRoads: any = create();
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
    dir: string;
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
    getModuleName: Function;
    model: Object[];
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
    syncfusionLicenseKey: any;
    hashString: string;
}
loadCldr(numberingSystems, chinaCultureData, enCultureData, swissCultureDate, currencyData, deCultureData, arCultureData);
L10n.load(Locale);
setCulture('en');
registerLicense((window as any).syncfusionLicenseKey);
let switcherPopup: Popup;
let preventToggle: boolean;
let themeSwitherPopup: Popup;
let sdkPopup: Popup;
let openedPopup: any;
let searchPopup: AutoComplete;
let settingsPopup: Popup;
let prevAction: string;
let sidebar: Sidebar;
let settingsidebar: Sidebar;
let searchInstance: any;
let headerThemeSwitch: HTMLElement = document.getElementById('header-theme-switcher');
let headerSdkSwitch: HTMLElement = document.getElementById('header-sdk-switcher');
let settingElement: HTMLElement = <HTMLElement>select('.sb-setting-btn');
let themeList: HTMLElement = document.getElementById('themelist');
var themeCollection = ['material3', 'bootstrap5', 'fluent2', 'tailwind3', 'fluent2-highcontrast', 'highcontrast', 'tailwind', 'fluent', 'material3-dark',  'bootstrap5-dark', 'fluent2-dark', 'tailwind3-dark', 'tailwind-dark', 'fluent-dark','bootstrap5.3-dark','bootstrap5.3'];
var themesToRedirect: string[] = ['material', 'material-dark', 'bootstrap4', 'bootstrap', 'bootstrap-dark', 'fabric', 'fabric-dark'];
var darkIgnore = ['highcontrast', 'fluent2-highcontrast'];
let themeDarkButton: HTMLElement = document.getElementById('sb-dark-theme');
let darkButton: HTMLElement = document.getElementById('sb-dark-span');
let themeModeDropDown: DropDownList;
let themeDropDown: DropDownList;
let cultureDropDown: DropDownList;
let currencyDropDown: DropDownList;
let sdkDropDown: DropDownList;
let contentTab: Tab;
let sourceTab: Tab;
let toastObjt: Toast | null = null;
let isToastVisible = false;
let sourceTabItems: object[] = [];
let isExternalNavigation: boolean = true;
let defaultTree: boolean = false;
let intialLoadCompleted: boolean = false;
let resizeManualTrigger: boolean = false;
let reloadPageForRedirection: boolean =false;
let leftToggle: Element = select('#sb-toggle-left');
let sbRightPane: HTMLElement = <any>select('.sb-right-pane');
let sbContentOverlay: HTMLElement = <any>select('.sb-content-overlay');
let sbBodyOverlay: HTMLElement = <any>select('.sb-body-overlay');
let sbHeader: HTMLElement = <HTMLElement>select('#sample-header');
let resetSearch: Element = select('.sb-reset-icon');
let newYear: number = new Date().getFullYear();
let copyRight: HTMLElement= document.querySelector('.sb-footer-copyright');
copyRight.innerHTML = "Copyright © 2001 - " + newYear + " Syncfusion<sup>®</sup> Inc.";
let isUpdatingFromUrl = false;
/**
 * constant to process the sample url
 */
const urlRegex: RegExp = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
const sampleRegex: RegExp = /#\/(([^\/]+\/)+[^\/\.]+)/;
// Regex for removal of hidden codes 
const reg: RegExp = /.*custom code start([\S\s]*?)custom code end.*/g;
const sbArray: string[] = ['angular', 'react', 'nextjs', 'javascript', 'aspnetcore', 'aspnetmvc', 'vue', 'blazor'];
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
let selectedTheme:string=getThemeDefault();
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
        change:resizeFunction,
        created: resizeFunction
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
let sampleNavigation: string = `<div class="sb-custom-item sample-navigation"><button id='prev-sample' role='tab' class="sb-navigation-prev" 
     aria-label="Navigate to previous sample">
 <span class='sb-icons sb-icon-Previous'></span>
 </button>
 <button  id='next-sample' role='tab' class="sb-navigation-next" aria-label="Navigate to next sample">
 <span class='sb-icons sb-icon-Next'></span>
 </button>
 </div>`;
let wcagTemplate: string = '<span class="sb-wcag-text">WCAG 2.2</span>';
let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr" role="presentation"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
// tslint:disable-next-line:no-multiple-var-decl
let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="sf-wcag-btn" role="tab" aria-label="WCAG 2.2 Accessibility Report" tabindex="0" class="sb-custom-item sb-plnr-section sb-wcag-btn">' +
    wcagTemplate + '</button>' + hsplitter + '<button id="open-plnkr" role="tab" aria-label="Open Edit in StackBlitz" tabindex="0" class="sb-custom-item sb-plnr-section">' +
    plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
    '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting sb-hide"></div>';

let tabContentToolbar: Element = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
let apiGrid: Grid;
let demoSection: Element = select('.sb-demo-section');
if (Browser.isDevice || isMobile) {
    leftToggle.setAttribute('aria-expanded', 'false');
} else {
    leftToggle.setAttribute('aria-expanded', 'true');
}
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
    document.getElementById('sample-header').style.visibility = '';
    document.getElementById('sb-popup-section').style.visibility = '';
    document.getElementById('sb-left-pane').style.visibility = '';
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
    sdkPopup = new Popup(document.getElementById('sdk-popup'), {
        offsetY: 2,
        zIndex: 10012,
        relateTo: <HTMLElement>document.querySelector('.sdk-wrapper'), position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    sdkPopup.hide();
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
            highlight: true,
            select: (e: any) => {
                let data: any = e.itemData.doc;
                let hashval: string = '#/' + location.hash.split('/')[1] + '/' + data.dir + '/' + data.url + '.html';
                searchPopup.hidePopup();
                searchOverlay.classList.add('e-search-hidden');
                const selectedControl = data.dir;
                const activeSdk = document.querySelector('#sdklist li.active')
                    ?.getAttribute('data-sdk') || 'all';
                const currentSdkControls = sdkControlMap[activeSdk] || [];
                if (currentSdkControls.indexOf(selectedControl) === -1) {
                    let matchedSdk = 'all';
                    // Find which SDK owns this control
                    for (const sdkKey in sdkControlMap) {
                        if (
                            sdkKey !== 'all' &&
                            sdkControlMap[sdkKey] &&
                            sdkControlMap[sdkKey].indexOf(selectedControl) !== -1
                        ) {
                            matchedSdk = sdkKey;
                            break;
                        }
                    }
                    localStorage.setItem('selectedSdk', matchedSdk);
                    const sdkList = document.getElementById('sdklist');
                    if (sdkList) {
                        sdkList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                        sdkList.querySelector(`[data-sdk="${matchedSdk}"]`)?.classList.add('active');
                        const targetLi =sdkList.querySelector(`[data-sdk="${matchedSdk}"]`) ||
                            sdkList.querySelector('li[data-sdk="all"]');
                        const sdkTextSpan =document.querySelector('#sb-sdk-text .sb-header-text-left')
                        if (sdkTextSpan && targetLi) {
                            const selectedText =(select('.switch-text', targetLi as HTMLElement) as HTMLElement)
                                    ?.textContent || 'ALL DEMOS';
                            sdkTextSpan.textContent = matchedSdk === 'all'? 'ALL DEMOS': selectedText.toUpperCase();
                        }
                    }
                    if (sdkDropDown) {
                        sdkDropDown.value = matchedSdk;
                    }
                    applySdkFilter(matchedSdk);
                }
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
    sdkPopup.hide();
    themeDropDown = new DropDownList({
        index: themeCollection.indexOf(selectedTheme.split('-')[0]),
        change: (e: any) => { switchTheme(e.value); }
    });
    themeModeDropDown = new DropDownList({
	        index: selectedTheme.includes('-dark') ? 1 : 0,
            change: function (e) {
              if (isUpdatingFromUrl) {
                return;}
              darkSwitch() }
    });
    themeModeDropDown.appendTo('#sb-theme-mode');
    cultureDropDown = new DropDownList({
        index: 0,
        change: (e: any) => {
            let value: string = e.value;
            currencyDropDown.value = matchedCurrency[value];
            loadCulture(value);
            changeRtl({
                locale: value, currencyCode: matchedCurrency[value],
                enableRtl: value === 'ar'
            });   
        }
    });
    function loadCulture(cul: string) {
        let inputElement = document.getElementById('cultureID') as HTMLInputElement;
        inputElement.value = cul;
        if ('oninput' in inputElement) {
            inputElement.dispatchEvent(new Event('input'));
        }
    }
    currencyDropDown = new DropDownList({
        index: 0,
        change: (e: any) => {
            // setCurrencyCode(e.value);
            loadCurrency(e.value);
            currencyDropDown.value = matchedCurrency[e.value];
             changeRtl({
                locale: cultureDropDown.value, currencyCode: e.value,
                enableRtl: cultureDropDown.value === 'ar'
            });     
        }
    });
    function loadCurrency(cul: string) {
        let inputElement = document.getElementById('currencyID') as HTMLInputElement;
        inputElement.value = cul;
        if ('oninput' in inputElement) {
            inputElement.dispatchEvent(new Event('input'));
        }
    }
    cultureDropDown.appendTo('#sb-setting-culture');
    currencyDropDown.appendTo('#sb-setting-currency');
    themeDropDown.appendTo('#sb-setting-theme');
    sdkDropDown = new DropDownList({
        select: handleSdkSelectionMobile
    });
    sdkDropDown.appendTo('#sb-setting-sdk');
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
    let axeTooltip: Tooltip = new Tooltip({
        content: 'Supports WCAG and Section 508 standards. View the accessibility report for this demo\'s compliance details.',
        position: 'BottomCenter',
        width: 280,
        cssClass: 'sb-axe-tooltip'
    });
    axeTooltip.appendTo('#sf-wcag-btn');
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
    if (args.selectedItem && args.selectedItem.innerText === 'DEMO') {
        let demoSection = document.getElementsByClassName('sb-demo-section')[0];
        const componentToIgnore: string[] = ['tab'];
        if (demoSection) {
            let elementList = demoSection.getElementsByClassName('e-control e-lib');
            for (let i = 0; i < elementList.length; i++) {
                let instance = (elementList[i] as any).ej2_instances;
                if (instance && instance[0] && typeof instance[0].refresh === 'function' && componentToIgnore.indexOf(instance[0].getModuleName()) === -1 && ['rich-text-editor', 'ai-assistview', 'chat-ui'].indexOf(currentControl) === -1) {
                    instance[0].refresh();
                }
                if (instance && instance[0] && instance[0].getModuleName() !== 'DashboardLayout')
                    break;
            }
        }
    }
}
function changeRtl(args: any): void {
    var elementList = selectAll('.e-control', document.getElementById('control-content'));
    elementList.forEach((control: any) => {
        if (control.ej2_instances) {
            control.ej2_instances.forEach((instance: any) => {
                instance.setProperties(args);
            });
        }
    });
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
        case 'changeSdk':
            headerSdkSwitch.classList.toggle('active');
            setPressedAttribute(headerSdkSwitch);
            curPopup = sdkPopup;
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
        headerSdkSwitch.classList.remove('active');
        settingElement.classList.remove('active');
        setPressedAttribute(headerThemeSwitch);
        setPressedAttribute(headerSdkSwitch);
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
}

/**
 * when theme changes it update the url and store it in the localstorage
 */

function switchTheme(str: string): void {
    let hash: string[] = location.hash.split('/');
    if (hash[1] !== str) {
        if (hash[1].includes('-dark') && darkIgnore.indexOf(str) === -1) {
            str = str + '-dark';
        }
        hash[1] = str;
        location.hash = hash.join('/');
}
}

themeDarkButton.addEventListener('click', darkSwitch);
let themeSwitched: boolean = false;
function darkSwitch(): void {
    let hash: string[] = location.hash.split('/');
    let darkTheme = hash[1].replace('bootstrap5.3', 'bootstrap5');
    darkTheme = darkTheme.includes("dark") ? darkTheme.replace("-dark", "") : darkIgnore.indexOf(darkTheme) === 0 ? darkTheme : darkTheme + '-dark';
    hash[1] = darkTheme;
    document.body.classList.replace(document.body.classList[2], darkTheme.replace('bootstrap5', 'bootstrap5.3'));
    location.hash = hash.join('/');
    themeSwitched = true;
}

/**
 * It changes the css file in the html element
 */
function loadThemeLinkCss(theme: string) {
    let doc: HTMLLinkElement = <HTMLLinkElement>document.getElementById('themelink');
    doc.setAttribute('href', './styles/' + theme + '.css');
}
function changeBodyClass(darkTheme: string) {
    if (darkTheme.includes('bootstrap5') && !darkTheme.includes('bootstrap5.3')) {
        darkTheme = darkTheme.replace('bootstrap5', 'bootstrap5.3');
    }
    loadThemeLinkCss(darkTheme);
    // Remove only theme-related classes (preserve other classes like e-bigger)
    for (let i = 0; i < themeCollection.length; i++) {
        document.body.classList.remove(themeCollection[i]);
        document.body.classList.remove(`${themeCollection[i]}-dark`);
    }
    document.body.classList.remove('e-dark-mode');
    document.body.classList.add(darkTheme);
    const isDark = darkTheme.includes('-dark');
    if (isDark) {
        document.body.classList.add('e-dark-mode');
        if (darkButton) darkButton.innerHTML = "LIGHT";
        if(isMobile){
            themeDarkButton.style.display = "none";
        }
        const lightIcon = document.getElementById("light-icon");
        const darkIcon = document.getElementById("dark-icon");
        if (lightIcon) lightIcon.style.display = "inline-block";
        if (darkIcon) darkIcon.style.display = "none";
        darkTheme = darkTheme.includes('bootstrap5.3') ? 'bootstrap5-dark' : darkTheme;
    } else {
        if (darkButton) darkButton.innerHTML = "DARK";
        if(isMobile){
            themeDarkButton.style.display = "none";
        }
        const lightIcon = document.getElementById("light-icon");
        const darkIcon = document.getElementById("dark-icon");
        if (lightIcon) lightIcon.style.display = "none";
        if (darkIcon) darkIcon.style.display = "inline-block";
        darkTheme = darkTheme.includes('bootstrap5.3') ? 'bootstrap5' : darkTheme;
    }
    // Save theme state
    selectedTheme = darkTheme;
    setThemeDefault(darkTheme);
    if (isMobile && themeModeDropDown) {
        const isDark = selectedTheme.includes('-dark');
        // Update mobile icon
        const mobileModeIcon = document.getElementById('mobile-mode-icon');
        if (mobileModeIcon) {
            mobileModeIcon.className = `sb-icons pane-${isDark ? 'light-theme' : 'dark-theme'}`;
        }
        isUpdatingFromUrl = true;  // Set flag BEFORE updating
        // Update the Syncfusion dropdown index
        themeModeDropDown.index = isDark ? 1 : 0;
        setTimeout(() => {
            isUpdatingFromUrl = false;  // Reset flag AFTER update
        }, 10);
    }
}
function onsearchInputChange(e: any) {
    if (e.keyCode === 27 || e.keyCode === 13) {
        toggleSearchOverlay();
    }
    var searchString = e.target.value;
    if (searchString.length <= 2) {
        searchPopup.hidePopup();
        return;
    }
    var val = [];
    val = searchInstance.search(searchString, {
        fields: {
            component: { boost: 1 },
            name: { boost: 2 }
        },
        expand: true,
        boolean: 'AND'
    });
    var value: any = [];
    if (Browser.isDevice) {
        for (var j = 0; j < val.length; j++) {
            if (val[j].doc.hideOnDevice !== true) {
                value = value.concat(val);
            }
        }
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
function UpdateLeftpaneLI() {
    const currentUrl = window.location.hash.split('/')[2]?.toLowerCase() || '';
    document.querySelectorAll('li[control-name]').forEach(li => {
        li.classList.remove('e-active');
    });
    document.querySelectorAll('li[control-name]').forEach(li => {
        const controlName = li.getAttribute('control-name');
        if (controlName && currentUrl.toLowerCase() === controlName.toLowerCase()) {
            li.classList.add('e-active');
        }
    });
}
function onNextButtonClick(arg: MouseEvent): void {
    addSampleList(<Controls[]>samplesList);
    sampleOverlay();
    let curSampleUrl: string = location.hash;
    // Use filtered sample order based on active SDK filter
    const filteredSamples: string[] = getActiveSdkSampleOrder(samplesAr);
    let inx: number = filteredSamples.indexOf(curSampleUrl);
    if (inx !== -1 && filteredSamples[inx + 1]) {
        let curhref: string = filteredSamples[inx + 1];
        location.href = curhref;
    }
    window.hashString = location.hash;
    setSelectList();
    UpdateLeftpaneLI();
}

function onPrevButtonClick(arg: MouseEvent): void {
    addSampleList(<Controls[]>samplesList);
    sampleOverlay();
    let curSampleUrl: string = location.hash;
    // Use filtered sample order based on active SDK filter
    const filteredSamples: string[] = getActiveSdkSampleOrder(samplesAr);
    let inx: number = filteredSamples.indexOf(curSampleUrl);
    if (inx !== -1 && filteredSamples[inx - 1]) {
        let curhref: string = filteredSamples[inx - 1];
        location.href = curhref;
    }
    window.hashString = location.hash;
    setSelectList();
    UpdateLeftpaneLI();
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
 * SDK Control Map - Explicit definition of which controls belong to each SDK
 * All AI samples live under a single 'ai-grid' tree node (AI-Powered Samples)
 * This map lists individual ai-* controls that belong to each SDK
 */
const sdkControlMap: { [key: string]: string[] } = {
    // 'all' shows everything — no filter applied
    all: [],

    // Grid SDK: Data Grid, Pivot Table, Tree Grid + AI variants
    grid: [
        'grid', 'pivot-table', 'tree-grid',
        'ai-grid', 'ai-pivot-table', 'ai-tree-grid',
    ],

    // Chart SDK: all visualization components + AI Maps
    chart: [
        'chart', 'three-dimension-chart', 'three-dimension-circular-chart', 'stock-chart',
        'arc-gauge', 'circular-gauge', 'heatmap-chart', 'linear-gauge', 'maps',
        'range-navigator', 'smith-chart', 'barcode', 'sparkline', 'treemap',
        'bullet-chart', 'sankey', 'dashboard-layout', 'dashboards',
        'ai-maps',
    ],

    // Scheduler SDK: calendar & date/time pickers + AI Scheduler
    schedule: [
        'schedule', 'calendar', 'datepicker', 'daterangepicker', 'datetimepicker', 'timepicker',
        'ai-schedule',
    ],

    // Gantt SDK: Gantt + Kanban + AI variants
    gantt: [
        'gantt', 'kanban',
        'ai-gantt', 'ai-kanban',
    ],

    // Rich Text Editor SDK
    'rich-text-editor': [
        'rich-text-editor', 'block-editor', 'markdown-editor',
    ],

    // File Manager SDK
    'file-manager': [
        'file-manager',
    ],

    // Diagram SDK
    diagram: [
        'diagram',
        'ai-diagram',
    ]
};

/**
 * Returns a filtered sampleOrder array containing only samples belonging to
 * the currently active SDK. Falls back to the full sampleOrder when no SDK
 * filter is active (all).
 */
export function getActiveSdkSampleOrder(fullOrder: string[]): string[] {
    const activeItem: Element | null = document.querySelector('#sdklist li.active');
    if (!activeItem) return fullOrder;
    
    const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
    if (sdkKey === 'all') return fullOrder;

    const allowedControls: string[] = sdkControlMap[sdkKey] || [];
    if (!allowedControls.length) return fullOrder;

    return fullOrder.filter((samplePath: string) => {
        // Handle full hash URLs like "#/tailwind3/ai-smart-paste/default.html"
        // Split: ['#', 'tailwind3', 'ai-smart-paste', 'default.html']
        // Control name is always at index [2] (after # and theme)
       const controlName = samplePath.split('/')[2];
        
        // For ai- prefixed controls: match the exact ai-* variant
        // e.g. 'ai-gantt' matches 'ai-gantt/task-prioritize' but not 'ai-grid/assistive-grid'
        return allowedControls.indexOf(controlName) !== -1;
    });
}

/**
 * Apply SDK filter to the left pane tree and list views.
 * CRITICAL: All AI samples live under ONE tree node with control-name="ai-grid" (AI-Powered Samples).
 * When an SDK allows any ai-* controls, we show the ai-grid node (not individual ai-* nodes).
 */
export function applySdkFilter(sdkKey: string): void {
    const controlTree: HTMLElement = document.getElementById('controlTree') as HTMLElement;
    const controlList: HTMLElement = document.getElementById('controlList') as HTMLElement;

    // 'all' shows everything - remove filter
    if (sdkKey === 'all') {
        // Remove sdk-hidden from tree nodes and parent category nodes
        if (controlTree) {
            const treeItems = controlTree.querySelectorAll('[control-name]');
            treeItems.forEach((item: Element) => item.classList.remove('sdk-hidden'));
            const parentItems = controlTree.querySelectorAll('.e-list-item.e-level-1');
            parentItems.forEach((item: Element) => item.classList.remove('sdk-parent-hidden'));
        }
        // Remove sdk-hidden from list items and groups
        if (controlList) {
            const listItems = controlList.querySelectorAll('.e-list-item, .e-list-group-item');
            listItems.forEach((item: Element) => {
                item.classList.remove('sdk-hidden');
                item.classList.remove('sdk-sample-hidden');
                item.classList.remove('sdk-group-hidden');
            });
        }
        document.querySelector('.sb-left-pane')?.classList.remove('sdk-filter-active');
        return;
    }

    const allowedControls: string[] = sdkControlMap[sdkKey] || [];
    document.querySelector('.sb-left-pane')?.classList.add('sdk-filter-active');

    // Check if this SDK allows any ai-* controls
    // If yes, we must SHOW the 'ai-grid' tree node (which hosts ALL AI samples)
    const showAiNode: boolean = allowedControls.some((c) => c.startsWith('ai-'));

    // Filter tree view nodes (child items with control-name)
    if (controlTree) {
        const treeItems = controlTree.querySelectorAll('[control-name]');
        treeItems.forEach((item: Element) => {
            const cn: string = item.getAttribute('control-name') || '';
            // Special case: 'ai-grid' tree node is a CONTAINER for all AI samples
            // Show it if this SDK allows ANY ai-* variants
            const isVisible: boolean = cn === 'ai-grid' ? showAiNode : allowedControls.indexOf(cn) !== -1;
            if (!isVisible) {
                item.classList.add('sdk-hidden');
            } else {
                item.classList.remove('sdk-hidden');
            }
        });

        // Hide parent category nodes (e-level-1) when all their children are hidden
        const parentItems = controlTree.querySelectorAll('.e-list-item.e-level-1');
        parentItems.forEach((parent: Element) => {
            const children = parent.querySelectorAll('[control-name]');
            const hasVisible = Array.from(children).some((child) => !child.classList.contains('sdk-hidden'));
            if (!hasVisible) {
                parent.classList.add('sdk-parent-hidden');
            } else {
                parent.classList.remove('sdk-parent-hidden');
            }
        });
    }

    // Filter list view items using data-path attribute
    if (controlList) {
        const listItems = controlList.querySelectorAll('.e-list-item');
        listItems.forEach((item: Element) => {
            const dataPath: string = item.getAttribute('data-path') || '';
            // data-path is like "/grid/overview" or "/ai-gantt/task-prioritize"
            // First segment is the control name.
            const controlName = dataPath.replace(/^\//, '').split('/')[0] || '';
            // Direct match: the path's control prefix must be in the allowedControls list.
            const isMatch = allowedControls.indexOf(controlName) !== -1;
            if (!isMatch) {
                item.classList.add('sdk-sample-hidden');
            } else {
                item.classList.remove('sdk-sample-hidden');
            }
        });

        // Hide group headers that have no visible list items
        const groupItems = controlList.querySelectorAll('.e-list-group-item');
        groupItems.forEach((groupItem: Element) => {
            let sibling: Element | null = groupItem.nextElementSibling;
            let hasVisible = false;
            while (sibling && !sibling.classList.contains('e-list-group-item')) {
                if (!sibling.classList.contains('sdk-sample-hidden')) {
                    hasVisible = true;
                    break;
                }
                sibling = sibling.nextElementSibling;
            }
            if (!hasVisible) {
                groupItem.classList.add('sdk-group-hidden');
            } else {
                groupItem.classList.remove('sdk-group-hidden');
            }
        });
    }
}
/**
 * Product keys appended to the SDK dropdown that open an external demo in a new tab.
 */
const productSdkKeys: string[] = ['pdf', 'spreadsheet', 'docx'];

/**
 * Opens the corresponding external product demo in a new tab.
 * Used by the SDK dropdown when a product item (PDF / Spreadsheet / Docx) is selected.
 */
function openProductSdkInNewTab(key: string): void {
  let url = '';
  if (key === 'pdf') {
    url = `https://document.syncfusion.com/demos/pdf-viewer/javascript/#/tailwind3/pdfviewer/default.html`;
  } else if (key === 'spreadsheet') {
    url = `https://document.syncfusion.com/demos/spreadsheet-editor/javascript/#/tailwind3/spreadsheet/default.html`;
  } else if (key === 'docx') {
    url = `https://document.syncfusion.com/demos/docx-editor/javascript/#/tailwind3/document-editor/default.html`;
  }
  if (url) {
    window.open(url, '_blank');
  }
}
// Navigate to the default sample for the selected SDK
const sdkDefaultPaths: { [key: string]: string } = {
        'all': 'grid/grid-overview.html',
        'grid': 'grid/grid-overview.html',
        'chart': 'chart/overview.html',
        'schedule': 'schedule/overview.html',
        'gantt': 'gantt/overview.html',
        'rich-text-editor': 'rich-text-editor/tools.html',
        'file-manager': 'file-manager/overview.html',
        'diagram': 'diagram/default-functionalities.html'
};

/**
 * SDK Selection Handler
 */
function handleSdkSelection(e: MouseEvent): void {
    let target: Element = e.target as HTMLElement;
    target = closest(target, 'li');
    if (!target) return;

    const sdkKey: string = target.getAttribute('data-sdk') || 'all';
    // Product items (PDF / Spreadsheet / Docx) open in a new tab and stop here.
  if (productSdkKeys.indexOf(sdkKey) !== -1) {
    sbHeaderClick('closePopup');
    openProductSdkInNewTab(sdkKey);
    return;
  }

    // Update active highlight
    const sdkList = document.getElementById('sdklist');
    if (sdkList) {
        sdkList.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
        target.classList.add('active');
    }

    // Update button text to reflect selection
    const sdkTextSpan = document.querySelector('#sb-sdk-text .sb-header-text-left');
    if (sdkTextSpan) {
        const selectedText = (select('.switch-text', target) as HTMLElement)?.textContent || 'ALL DEMOS';
        sdkTextSpan.textContent = sdkKey === 'all' ? 'ALL DEMOS' : selectedText.toUpperCase();
    }

    sampleOverlay();
    // Shared logic for both desktop & mobile
    processSdkSelection(sdkKey);
    setTimeout(() => {
       removeOverlay();
      }, 900);
}

/**
 * Mobile SDK Selection Handler — invoked by the mobile <select> dropdown
 * in the settings popup. Keeps the desktop header popup list in sync and
 * delegates filtering/navigation to processSdkSelection().
 */
function handleSdkSelectionMobile(e: any): void {
  // select event args don't have .value; the value lives in itemData
  const sdkKey: string = (e.itemData && e.itemData.value) || 'all';
  // Product items (PDF / Spreadsheet / Docx) open in a new tab and stop here.
  if (productSdkKeys.indexOf(sdkKey) !== -1) {
    sbHeaderClick('closePopup');
    openProductSdkInNewTab(sdkKey);
    return;
  }
  localStorage.setItem('selectedSdk', sdkKey);
  // Update active highlight in the header popup list (keeps desktop & mobile in sync)
  const sdkList = document.getElementById('sdklist');
  if (sdkList) {
    sdkList.querySelectorAll('li').forEach((li) => li.classList.remove('active'));
    const activeItem = sdkList.querySelector(`[data-sdk="${sdkKey}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
  const sdkTextSpan = document.querySelector('#sb-sdk-text .sb-header-text-left') as HTMLElement;
  if (sdkTextSpan) {
    const activeItem = sdkList?.querySelector(`[data-sdk="${sdkKey}"]`);
    const selectedText =activeItem?.querySelector('.switch-text')?.textContent ||'ALL DEMOS';
    sdkTextSpan.textContent =sdkKey === 'all'? 'ALL DEMOS': selectedText.toUpperCase();}
  // Apply filter to left pane
  processSdkSelection(sdkKey);
}

/**
 * Shared SDK selection logic — used by both desktop (handleSdkSelection)
 * and mobile (handleSdkSelectionMobile). Decides whether to just apply the
 * filter to the left pane (when the current control is already part of the
 * chosen SDK) or to navigate to the SDK's default sample.
 */
function processSdkSelection(sdkKey: string): void {
    const currentPath = location.hash.replace(/^#\/[^\/]+\//, '');
    const defaultPath = sdkDefaultPaths[sdkKey];
    const shouldRedirect = currentPath !== defaultPath;
    localStorage.setItem('selectedSdk', sdkKey);
    if (!shouldRedirect) {
        sbHeaderClick('closePopup');
        applySdkFilter(sdkKey);
        // If tree view is visible, switch to list view
        const tree = document.querySelector('#controlTree') as HTMLElement;
        if (tree && tree.style.display !== 'none') {
         showHideControlTree();
        }
        return;
    } else {
        const newHash = `#/${selectedTheme}/${defaultPath}`;
        if (location.hash !== newHash) {
            sampleOverlay();
            location.hash = newHash;
            window.hashString = location.hash;
            applySdkFilter(sdkKey);
            setSelectList();
        }
    }

    // Close the popup
    sbHeaderClick('closePopup');
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
    document.getElementById('sb-switcher').addEventListener('keydown', (e: any) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('changeSampleBrowser');
        }
    });
    headerThemeSwitch.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeTheme');
    });
    headerThemeSwitch.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('changeTheme');
        }
    });
    headerSdkSwitch.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSdk');
    });
    headerSdkSwitch.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('changeSdk');
        }
    });
    const sdkList: HTMLElement | null = document.getElementById('sdklist');
    if (sdkList) {
        sdkList.addEventListener('click', handleSdkSelection);
    }
    themeList.addEventListener('click', changeTheme);
    // tslint:disable
    document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
    settingElement.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('toggleSettings');
    });
    settingElement.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            sbHeaderClick('toggleSettings');
        }
    });
    searchButton.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSearchOverlay();
    });
    searchButton.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            toggleSearchOverlay();
        }
    });
    document.getElementById('settings-popup').addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    });
    const sdkPopupEle = document.getElementById('sdk-popup');
    if (sdkPopupEle) {
        sdkPopupEle.addEventListener('click', (e: MouseEvent) => {
            e.stopPropagation();
        });
    }
    inputele.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('keyup', onsearchInputChange);
    setResponsiveElement.addEventListener('click', setMouseOrTouch);
    select('#sb-left-back').addEventListener('click', showHideControlTree);
    select('#sb-left-back').addEventListener('click', UpdateLeftpaneLI);
    leftToggle.addEventListener('click', toggleLeftPane);
    leftToggle.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 'Enter' || e.keyCode === ' ') {
            toggleLeftPane();
        }
    });
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
    document.getElementById("theme-studio").addEventListener("click", function(event) {
        event.preventDefault();
        let href: string = `https://ej2.syncfusion.com/themestudio/?theme=${selectedTheme}`;
        window.open(href,'_blank');
    });
    var wcagReportBtn = select("#sf-wcag-btn") as HTMLElement;
    if (wcagReportBtn) {
        wcagReportBtn.addEventListener('click', () => {
            runAxeReport();
        });
    }
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
    let hrefLink: string[] = location.hash.split('/').slice(1);
    let aiControlRegex: RegExp = /ai-(?!assistview\b)[a-z-]+/;
    const desktopSettings = select('.sb-desktop-setting') as HTMLElement;
    if (desktopSettings) {
        desktopSettings.style.display = aiControlRegex.test(location.hash) ? 'none' : '';
    }
    let href: string = location.href = '#/' + selectedTheme + '/' + hrefLink.slice(1).join('/');
    let link: string[] = href.match(urlRegex);
    let sample: string = href.match(sampleRegex)[1];
    for (let sb of sbArray) {
        let ele: HTMLFormElement = <HTMLFormElement>select('#' + sb);
        if (sb === 'aspnetcore' || sb === 'aspnetmvc') {
            ele.href = sb === 'aspnetcore' ? 'https://ej2.syncfusion.com/aspnetcore/' : 'https://ej2.syncfusion.com/aspnetmvc/';
        } else if (sb === 'nextjs') {
            const defaultSamplePath = sample.includes('grid/grid-overview') ? sample.split('/')[0] + '/grid/overview' : sample;
            ele.href = 'https://ej2.syncfusion.com/nextjs/demos/' + defaultSamplePath;
        } else if (sb === 'blazor') {
            ele.href = 'https://blazor.syncfusion.com/demos/';
        }
        else if (sb === 'react' && location.href.includes('grid/grid-overview.html')) {
            ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) + 'react/demos/#/' + selectedTheme + '/grid/overview';
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
    theme = themesToRedirect.indexOf(theme) !== -1 ? 'tailwind3' : theme;
    theme = theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5.3') : theme;//for bootstrap only we have 5.3 .css fils so we changes it to get css file
    let body: HTMLElement = document.body;
    if (body.classList.length > 0) {
        for (let themeItem of themeCollection) {
            body.classList.remove(themeItem);
            body.classList.remove(themeItem + '-dark');
        }
    }
    body.classList.add(theme);//add theme
    if (theme.includes("-dark")) {
        body.classList.add("e-dark-mode");//if dark theme is given
    }
    if (darkIgnore.indexOf(theme) !== -1) {
        themeDarkButton.style.display = "none";
        document.getElementById("mobiledarkswitch")!.style.display = "none";
    }
    if (!isMobile) {
        if (!theme.includes('-dark')) {
            darkButton.innerHTML = "DARK";
            document.getElementById("light-icon")!.style.display = "none";
            document.getElementById("dark-icon")!.style.display = "inline-block";
            themeList.querySelector('.active')!.classList.remove('active');
            theme == 'bootstrap5.3' ? themeList.querySelector('#bootstrap5').classList.add('active') :
                themeList.querySelector('#' + theme)!.classList.add('active');
        }
        else {
            darkButton.innerHTML = "LIGHT";
            document.getElementById("dark-icon")!.style.display = "none";
            document.getElementById("light-icon")!.style.display = "inline-block";
            themeList.querySelector('.active')!.classList.remove('active');
            theme == 'bootstrap5.3-dark' ? themeList.querySelector('#bootstrap5').classList.add('active') :
                themeList.querySelector('#' + theme.replace('-dark', ""))!.classList.add('active');
        }
    } else{
            themeDarkButton.style.display = "none";}
    let doc: HTMLFormElement = <HTMLFormElement>document.getElementById('themelink');
    doc.setAttribute('href', './styles/' + theme + '.css');
    let ajax: Ajax = new Ajax('./styles/' + theme + '.css', 'GET', true);
    ajax.send().then((result: any) => {
        selectedTheme = theme;
        selectedTheme = selectedTheme === "bootstrap5.3" ? 'bootstrap5' : selectedTheme === "bootstrap5.3-dark" ? "bootstrap5-dark" : selectedTheme;
        //renderleftpane 
        renderLeftPaneComponents();
        renderSbPopups();
        bindEvents();
        if (isTablet || isMobile) {
            contentTab.hideTab(2);
        }
        // add routing
        processDeviceDependables();
        addRoutes(<Controls[]>samplesList);
        routeDefault();
        //setSbLink();
        if (isTablet && isLeftPaneOpen()) {
            toggleLeftPane();
        }
        (elasticlunr as any).clearStopWords();
        searchInstance = (elasticlunr as any).Index.load(searchJson);
        hasher.initialized.add(function (newHash, oldHash) {
        parseHash(newHash, oldHash);
        });
        hasher.changed.add(parseHash);
        hasher.init();
        if(reloadPageForRedirection)
            {
            window.location.reload();
        }
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
    leftToggle.setAttribute('aria-expanded', (!reverse).toString());
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
            template: '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text">${name}' +
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
        controlSampleData[list[i].directory] = getSamples(list[i].samples, list[i].directory);
    }
    return tempList;
}

function getSamples(samples: any, groupPath?: string): any {
    let tempSamples: any = [];
    let groupName: string = '';
    let sampleNameAttr: string = '';
    let isAISample: boolean = !!groupPath && groupPath.startsWith('ai-') && ['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].indexOf(groupPath) === -1;
    for (let i: number = 0; i < samples.length; i++) {
        tempSamples[i] = samples[i];
        groupName = samples[i].dir;
        sampleNameAttr = samples[i].name.toLowerCase().replace(/ /g, '-');
        tempSamples[i].data = { 'sample-name': samples[i].url, 'data-path': '/' + samples[i].dir + '/' + samples[i].url + '.html' };
        if (isAISample) {
            tempSamples[i].data['group-name'] = groupName;
            tempSamples[i].data['ai-sample-name'] = sampleNameAttr;
        }
    }
    return tempSamples;
}
function controlSelect(arg: any): void {
    let path: string = (arg.node || arg.item).getAttribute('data-path');
    let curHashCollection: string = '/' + location.hash.split('/').slice(2).join('/');
    
    // When the 'AI-Powered Samples' (ai-grid) TREE NODE is clicked while an SDK filter
    // is active, redirect to the first sample of the SDK's ai- control instead of
    // the default ai-grid/assistive-grid path.
    // arg.node is set only for TreeView clicks; arg.item is set for ListView clicks.
    // We must NOT redirect on list item selections (e.g. triggered by next/prev navigation).
    if (arg.node && path && path.startsWith('/ai-grid/')) {
        const activeItem: Element | null = document.querySelector('#sdklist li.active');
        if (activeItem) {
            const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
            // Map SDK keys to the first sample path of their ai- control
            const aiSdkFirstSample: { [key: string]: string } = {
                schedule: '/ai-schedule/default.html',
                gantt: '/ai-gantt/task-prioritizer.html',
                grid: '/ai-grid/predictive-entry.html',
                diagram: '/ai-diagram/text-to-flowchart.html',
                chart: '/ai-maps/weather-prediction.html'
            };
            if (aiSdkFirstSample[sdkKey]) {
                path = aiSdkFirstSample[sdkKey];
            }
        }
    }
    
    if (path) {
        controlListRefresh(arg.node || arg.item);
        if (path !== curHashCollection) {
            sampleOverlay();
            let theme: string = location.hash.split('/')[1] || getThemeDefault();
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

function reapplyActiveSdkFilter(): void {
    const activeItem: Element | null = document.querySelector('#sdklist li.active');
    if (activeItem) {
        const sdkKey: string = activeItem.getAttribute('data-sdk') || 'all';
        if (sdkKey !== 'all') {
            applySdkFilter(sdkKey);
        }
    }
}


function controlListRefresh(ele: Element): void {
    let samples: any = controlSampleData[ele.getAttribute('control-name')];
    if (samples) {
        let listView: ListView = (select('#controlList') as any).ej2_instances[0];
        listView.dataSource = samples;
        showHideControlTree();
        // Re-apply SDK filter on the newly loaded sample list
        setTimeout(() => reapplyActiveSdkFilter(), 50);
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

function updateGroupItemAttributes(): void {
    const groupItems: NodeListOf<Element> = document.querySelectorAll('#controlList .e-list-group-item.e-level-1');
    groupItems.forEach((groupItem: Element) => {
        let sibling: Element = groupItem.nextElementSibling;
        while (sibling && !sibling.classList.contains('e-list-group-item')) {
            if (!groupItem.hasAttribute('group-name')) {
                const groupName: string = sibling.getAttribute('group-name');
                if (groupName) {
                    groupItem.setAttribute('group-name', groupName);
                }
            }
            sibling.removeAttribute('group-name');
            sibling = sibling.nextElementSibling;
        }
    });
}

function setSelectList(): void {
    let hString: string = window.hashString || location.hash;
    let hash: string[] = hString.split('/');
    let list: ListView = (select('#controlList') as any).ej2_instances[0];
    let controlName: string = hash[2];
    if (controlName && controlName.startsWith('ai-') && ['ai-assistview', 'ai-smart-paste', 'ai-smart-textarea'].indexOf(controlName) === -1) {
        controlName = 'ai-grid';
    }
    let control: Element = select('[control-name="' + controlName + '"]');
    const eles = document.querySelectorAll('#controlList .e-list-item.e-level-1');
    for (const ele of eles as any) {
        ele.tabIndex = 0;
    }
    updateGroupItemAttributes();
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
    // Re-apply any active SDK filter after list updates
    reapplyActiveSdkFilter();
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
    crossRoads.addRoute('', () => {
        window.location.href = '#/' + selectedTheme + '/grid/grid-overview.html';
        isInitRedirected = true;
    });
    crossRoads.bypassed.add((request: string) => {
        let hash: string[] = request.split('.html')[0].split('/');
        if (samplePath.indexOf(hash.slice(1).join('/')) === -1) {
            location.hash = '#/' + hash[0] + '/' + (defaultSamples[hash[1]] || 'grid/grid-overview.html');
            isInitRedirected = true;
            reloadPageForRedirection=true;
        }
    });
}
function destroyControls(): void {
    const doControls = [
        "Chart", "chart3d","3D Chart", "3D Circular Chart", "Stock Chart", "Arc Gauge", "Circular Gauge",
        "Diagram", "HeatMap Chart", "Linear Gauge", "Maps", "Range Selector", "Smith Chart",
        "Barcode", "Sparkline Charts", "TreeMap", "Bullet Chart", "Sankey"
    ];
    const elementList: HTMLElement[] = selectAll('.e-control', document.getElementById('control-content'));
    for (const control of elementList) {
        const ej2Instances: any[] = (control as any).ej2_instances;
        if (ej2Instances) {
            for (const instance of ej2Instances) {
                const controlType = instance.getModuleName?.();  
                if (
                    (!controlType ||
                        !doControls.some(item => item.toLowerCase() === controlType.toLowerCase())) && themeSwitched
                ) {// Skip if not in the doControls list
                    themeSwitched = false;
                    continue;
                }
                if (instance.element && document.contains(instance.element)) {
                    (instance as DestroyMethod).destroy();
                }
                themeSwitched=false;
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
function addSampleList(samplesList: Controls[]): void {
    samplesAr=[];
    for (let node of samplesList) {
        defaultSamples[node.directory] = node.directory + '/' + node.samples[0].url + '.html';
        const dataManager: DataManager = new DataManager((node as any).samples);
        const samples: Samples[] = <Samples[]>dataManager.executeLocal(new Query().sortBy('order', 'ascending'));
        for (let subNode of samples) {
            const control: string = subNode.dir || node.directory;
            const sample: string = subNode.url;
            samplePath = samplePath.concat(control + '/' + sample);
            const selectedTheme: string = location.hash.split('/')[1] || getThemeDefault();
            const urlString: string = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
            samplesAr.push('#' + urlString);
        }
    }
}
// tslint:disable-next-line:max-func-body-length
function addRoutes(samplesList: Controls[]): void {
    for (let node of samplesList) {
        defaultSamples[node.directory] = node.directory + '/' + node.samples[0].url + '.html';
        let dataManager: DataManager = new DataManager((node as any).samples);
        let samples: Samples[] & { [key: string]: Object }[] = <Samples[] & { [key: string]: Object }[]>
            dataManager.executeLocal(new Query().sortBy('order', 'ascending'));
        for (let subNode of samples) {
            let control: string = subNode.dir || node.directory;
            let sample: string = subNode.url;
            samplePath = samplePath.concat(control + '/' + sample);
            let sampleName: string = node.name + ' / ' + ((node.name !== subNode.category) ?
                (subNode.category + ' / ') : '') + subNode.name;
            let selectedTheme: string = location.hash.split('/')[1] ? location.hash.split('/')[1] : getThemeDefault();
            let urlString: string = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
            samplesAr.push('#' + urlString);
            // tslint:disable-next-line:max-func-body-length
            crossRoads.addRoute(urlString, () => {
                let controlID: string = node.uid;
                let sampleID: string = subNode.uid;
                (document.getElementById('open-plnkr') as any).disabled = true;
                let openNew: HTMLFormElement = (select('#openNew') as HTMLFormElement);
                if (openNew) {
                    let baseUrl = location.href.split('#')[0];
                    // remove unwanted index.html in build
                    baseUrl = baseUrl.replace(/index\.html$/i, '');
                    // ensure trailing slash
                    if (!baseUrl.endsWith('/')) {
                        baseUrl += '/';
                    }
                    openNew.href = `${baseUrl}${node.directory}/${subNode.url}/index.html`;
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
                sampleNameElement.setAttribute('title', node.name);

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
                // Only try to load -stack.json for controls that are not ai-* or are ai-assistview
                if (!sample.startsWith('ai-') && (!control.startsWith('ai-') || control === 'ai-assistview')) {
                    let plunk: Ajax = new Ajax('src/' + control + '/' + sample + '-stack.json', 'GET', true);
                    let p3: Promise<Ajax> = plunk.send();
                    p3.then((result: Object) => {
                        (document.getElementById('open-plnkr') as any).disabled = false;
                        plunker(<string>result);
                    });
                }
                Promise.all([
                    p1,
                    p2
                ]).then((results: Object[]): void => {
                    let htmlString: string = results[0].toString();
                    destroyControls();
                    currentControlID = controlID;
                    currentSampleID = sampleID;
                    currentControl = node.directory;
                    addSampleList(<Controls[]>samplesList);
                    // Use filtered sample order based on active SDK filter
                    const filteredOrder: string[] = getActiveSdkSampleOrder(samplesAr);
                    let curIndex: number = filteredOrder.indexOf(location.hash);
                    let samLength: number = filteredOrder.length - 1;
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
        isTempLocaion = location.hash + ".html";
    } else {
        isTempLocaion = location.hash;
    }
    if(Browser.isDevice) 
        {
        if(location.hash && location.hash !== "" && samplesAr.indexOf(isTempLocaion) == -1) {
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
                }, 200);
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
    if(cultureDropDown.value !== 'en') {
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
    const data: DataManager = new DataManager(samplesList as any);
    const controls: Controls[] =
        <Controls[]>data.executeLocal(new Query().where('directory', 'equal', directory));

    // ✅ Preserve existing behavior if control exists
    if (controls.length && controls[0]?.samples) {
        return controls[0].samples.length > 1;
    }

    // ✅ If control does not exist (ai-diagram case), fail safely
    return false;
}

function parseHash(newHash: string, oldHash: string): void {
    let newTheme: string = newHash.split('/')[0];
    let control: string = newHash.split('/')[1];
    let baseNewTheme: string = newTheme.replace('-dark', '');
    let baseOldTheme: string = selectedTheme.replace('-dark', '');
    let componentsToAddRoutes= ["Chart", "three-dimension-chart", "circular-3d-chart", "stock-chart", "arc-gauge", "circular-gauge", "Diagram", "heatmap-chart", "linear-gauge", "Maps", "range-navigator", "smith-chart", "Barcode", "sparkline", "TreeMap", "bullet-chart", "sankey","ai-chart"];  
    const isScheduleChartSample = control === 'schedule' && newHash.includes('integration-with-chart'); // sample name
    if (baseNewTheme !== baseOldTheme && themeCollection.indexOf(newTheme) !== -1) {//only reload if the base theme is diff
            setThemeDefault(newTheme);
            location.reload();
        }
    if(baseNewTheme==baseOldTheme &&newTheme !== selectedTheme && themeCollection.indexOf(newTheme) !== -1){
        changeBodyClass(newTheme);//affect the body class   
         if (componentsToAddRoutes.some(item => item.toLowerCase() === String(control).toLowerCase()) || isScheduleChartSample) {
            addRoutes(<Controls[]>samplesList);

        } else {
            addSampleList(<Controls[]>samplesList); 
            return;
        }
    }else{
        addRoutes(<Controls[]>samplesList);
    }
    if ( componentsToAddRoutes.some(item => item.toLowerCase() === String(control).toLowerCase())){
             addRoutes(<Controls[]>samplesList);
    }
    (samplesJSON.skipCommonChunk as any) = (window as any).sampleSkip || [];
    if (newHash.length && !select('#' + control + '-common') && checkSampleLength(control) &&
        samplesJSON.skipCommonChunk.indexOf(control) === -1) {
        let scriptElement: HTMLScriptElement = document.createElement('script');
        scriptElement.src = 'src/' + control + '/common.js';
        scriptElement.id = control + '-common';
        scriptElement.type = 'text/javascript';
        scriptElement.onload = () => {
          crossRoads.parse(newHash);
        };
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    } else {
      crossRoads.parse(newHash);
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
    enableRipple(selectedTheme.indexOf('material') !== -1 || !selectedTheme);
    //localStorage.removeItem('ej2-switch');
    loadTheme(getThemeDefault());//passing the theme from localstorage
}
function getThemeDefault(): string {
    let previousTheme = localStorage.getItem('previousTheme') || 'tailwind3';
    return previousTheme;
}
function setThemeDefault(theme: string) {
    localStorage.setItem('previousTheme', theme);
}
loadJSON();

select('.close-button').addEventListener('click', () => {
    let banner = document.querySelector('.sb-token-header');
    if (banner) {
        banner.classList.add('sb-hide');
    }
});

function contentTemplate(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'ai-toast-container';

    const textDiv = document.createElement('div');
    textDiv.className = 'ai-content-text';

    const title = document.createElement('div');
    title.className = 'ai-content-title';
    title.innerText = 'Explore AI Demos';

    const message = document.createElement('div');
    message.className = 'ai-content-message';
    message.innerHTML = `
        You can now explore our <strong>Smart AI demos</strong> with limited AI token usage.
        Additionally, you can try out our <strong>
        <a href="https://github.com/syncfusion/smart-ai-samples/tree/master/typescript" target="_blank" style="color: #007bff;">Syncfusion Smart AI Samples</a></strong> locally by using your own API key.
    `;

    textDiv.appendChild(title);
    textDiv.appendChild(message);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close-button';
    closeBtn.innerText = '✕';
    closeBtn.setAttribute('aria-label', 'Close');

    container.appendChild(textDiv);
    container.appendChild(closeBtn);

    return container;
}

function attachCloseHandler() {
    const closeBtn = toastObjt?.element.querySelector('.toast-close-button');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toastObjt?.hide();
            isToastVisible = false;
        });
    }
}

function showToast() {
    if (!toastObjt) {
        toastObjt = new Toast({
            width: 420,
            content: contentTemplate(),
            position: { X: 'Right', Y: 'Top' },
            timeOut: 0,
            newestOnTop: true,
            created: () => {
                toastObjt?.show();
                isToastVisible = true;
                attachCloseHandler();
            }
        });
        toastObjt.appendTo('#ai-toast');
    } else if (!isToastVisible) {
        toastObjt.show();
        isToastVisible = true;
        attachCloseHandler();
    }
}

function hideToast() {
    if (toastObjt && isToastVisible) {
        toastObjt.hide();
        isToastVisible = false;
    }
}

window.addEventListener('hashchange', () => {
    let isAiAssistView = location.hash.includes('/ai-assistview/');
    let isAiAssistViewSample =
        location.hash.includes('ai-text-to-speech.html') ||
        location.hash.includes('ai-speech-to-text.html') ||
        location.hash.includes('ai-models.html');
    if (isAiAssistView) {
        if (isAiAssistViewSample) {
            showToast();
        } else {
            hideToast();
        }
        return;
    }
    if (location.hash.includes('ai-')) {
        showToast();
    } else {
        hideToast();
    }
});

// Canonical URLs Management
let canonicalUrlsMap: { [key: string]: string } = {};
let canonicalDataLoaded: Promise<void>;

// Load canonical URLs on app init
canonicalDataLoaded = fetch('./canonical-urls.json')
  .then(response => response.json())
  .then(data => {
    canonicalUrlsMap = data;
  })
  .catch(error => console.error('Error loading canonical-urls.json:', error));

// Function to update canonical tag based on current hash
function updateCanonicalTag(): void {
  const hash: string = window.location.hash;
  const hashparts: string[] = hash.replace('#/', '').split('/');
  const aiControlRegex: RegExp = /ai-(?!assistview\b)[a-z-]+/;

  if (hashparts.length >= 3) {
    const controlKey: string = hashparts[1]; // e.g. 'grid', 'treegrid'
    const displaySampleName: string = (hashparts[2] || 'default').replace(/\.html$/i, ''); // e.g. 'default', 'overview', 'editing'

    if (aiControlRegex.test(controlKey)) {
      const existingAiCanonical: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (existingAiCanonical && existingAiCanonical.parentNode) {
        existingAiCanonical.parentNode.removeChild(existingAiCanonical);
      }
      return;
    }

    let canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    // Build canonical URL: mapped for default/overview, self-referenced for other samples
    let canonicalUrl: string = '';
    if ((displaySampleName === 'default' || displaySampleName === 'overview' || (displaySampleName && displaySampleName.indexOf('-overview') !== -1) || (displaySampleName && displaySampleName.indexOf('default-') === 0)) && canonicalUrlsMap[controlKey]) {
      canonicalUrl = canonicalUrlsMap[controlKey];
    } else {
      const desiredPart: string = controlKey + '/' + displaySampleName + '/';
      canonicalUrl = 'https://ej2.syncfusion.com/demos/' + desiredPart + 'index.html';
    }

    canonicalLink.href = canonicalUrl;
  }
}

// Set up hash change listener
window.addEventListener('hashchange', updateCanonicalTag);

// Handle initial load - wait for canonical data to load first
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.hash) {
    // Wait for the canonical data to load before updating
    canonicalDataLoaded.then(() => {
      updateCanonicalTag();
    });
    }
});
