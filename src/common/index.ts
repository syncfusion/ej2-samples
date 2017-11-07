/// <reference path='./sampleList.ts' />
/**
 * default script manupulation for sample browser
 */

import { Popup, Tooltip } from '@syncfusion/ej2-popups';
import { select, selectAll, Animation, Browser, extend, enableRipple, Ajax, closest, createElement, detach } from '@syncfusion/ej2-base';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { Tab, TreeView } from '@syncfusion/ej2-navigations';
import { ListBase, ListView } from '@syncfusion/ej2-lists';
import { Grid } from '@syncfusion/ej2-grids';
import { addRoute, bypassed, parse } from 'crossroads';
import { renderPropertyPane, renderDescription, renderActionDescription } from './propertypane';
import * as samplesJSON from './sampleList';
import * as elasticlunr from './lib/elasticlunr';
import * as searchJson from './search-index.json';
import * as hljs from './lib/highlightjs';
import * as hasher from 'hasher';
let cBlock: string[] = ['ts-src-tab', 'html-src-tab'];
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
}

interface HighlightJS {
    registerLanguage?: (type: string, req: Object) => void;
    highlightBlock?: (ele: Element | HTMLElement | Node) => void;
}

interface MyWindow extends Window {
    default: () => void;
    navigateSample: () => void;
    apiList: any;
}

let switcherPopup: Popup;
let themeSwitherPopup: Popup;
let openedPopup: any;
let searchPopup: Popup;
let settingsPopup: Popup;
let prevAction: string;
let searchInstance: any;
let headerThemeSwitch: HTMLElement = document.getElementById('header-theme-switcher');
let settingElement: HTMLElement = <HTMLElement>select('.sb-setting-btn');
let themeList: HTMLElement = document.getElementById('themelist');
const themeCollection: string[] = ['material', 'fabric', 'bootstrap'];
let themeDropDown: DropDownList;
let contentTab: Tab;
let sourceTab: Tab;
let isExternalNavigation: boolean = true;
let defaultTree: boolean = false;
let intialLoadCompleted: boolean = false;
let resizeManualTrigger: boolean = false;
let leftToggle: Element = select('#sb-toggle-left');
let sbRightPane: HTMLElement = <any>select('.sb-right-pane');
let sbContentOverlay: HTMLElement = <any>select('.sb-content-overlay');
let sbBodyOverlay: HTMLElement = <any>select('.sb-body-overlay');
let sbHeader: HTMLElement = <HTMLElement>select('#sample-header');
/**
 * constant to process the sample url
 */
const urlRegex: RegExp = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
const sampleRegex: RegExp = /#\/(([^\/]+\/)+[^\/\.]+)/;
const sbArray: string[] = ['angular', 'react', 'javascript'];
/**
 * constant for search operations
 */
let searchEle: any = select('#search-popup');
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
let selectedTheme: string = location.hash.split('/')[1] || 'material';
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
let openNewTemplate: string = `<div class="sb-custom-item sb-open-new-wrapper"><a id="openNew" target="_blank">
<div class="sb-icons sb-icon-Popout"></div></a></div>`;
// tslint:disable-next-line:no-multiline-string
let sampleNavigation: string = `<div class="sb-custom-item sample-navigation"><button id='prev-sample' class="sb-navigation-prev">
<span class='sb-icons sb-icon-Previous'></span>
</button>
<button  id='next-sample' class="sb-navigation-next">
<span class='sb-icons sb-icon-Next'></span>
</button>
</div>`;
let plnrTemplate: string = '<span class="sb-icons sb-icons-plnkr"></span><span class="sb-plnkr-text">EDIT IN PLUNKER</span>';
// tslint:disable-next-line:no-multiple-var-decl
let contentToolbarTemplate: string = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
    plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
    '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting sb-hide"></div>';

let tabContentToolbar: Element = createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
let apiGrid: Grid;
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
    searchPopup = new Popup(searchEle, {
        offsetY: 5,
        relateTo: inputele, position: { X: 'left', Y: 'bottom' }
        , collision: { X: 'flip', Y: 'flip' }
    });
    settingsPopup = new Popup(document.getElementById('settings-popup'), {
        offsetX: -245,
        offsetY: 5,
        relateTo: <any>settingElement,
        position: { X: 'right', Y: 'bottom' }
        , collision: { X: 'flip', Y: 'flip' }
    });
    if (!isMobile) {
        settingsPopup.hide();
    } else {
        select('.sb-mobile-preference').appendChild(select('#settings-popup'));
    }
    searchPopup.hide();
    switcherPopup.hide();
    themeSwitherPopup.hide();
    themeDropDown = new DropDownList({
        index: 0,
        change: (e: any) => { switchTheme(e.value); }
    });
    themeDropDown.appendTo('#sb-setting-theme');
    /**
     * Render tab for content
     */
    contentTab = new Tab({
        selected: changeTab, selecting: preventTabSwipe
    },
        // tslint:disable-next-line:align
        '#sb-content');
    sourceTab = new Tab({
        headerPlacement: 'Bottom', cssClass: 'sb-source-code-section', selecting: preventTabSwipe
    },
        // tslint:disable-next-line:align
        '#sb-source-tab');
    sourceTab.selectedItem = 1;
    /**
     * api grid
     */
    apiGrid = new Grid({
        width: '100%',
        dataSource: [],
        toolbar: ['search'],
        allowTextWrap: true,
        columns: [
            { field: 'name', headerText: 'Name', template: '#template', width: 180, textAlign: 'center' },
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
            cssClass: 'e-flat', iconPosition: 'right'
        },
        // tslint:disable-next-line:align
        '#mobile-next-sample');
    let tabHeader: Element = document.getElementById('sb-content-header');
    tabHeader.appendChild(tabContentToolbar);
    let ele: HTMLElement = createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    let copiedTooltip: Tooltip = new Tooltip(
        { content: 'Copied', position: 'bottom center', opensOn: 'click', closeDelay: 500 }, '.copy-tooltip');
}

/**
 * api grid functions
 */
function checkApiTableDataSource(): void {
    let hash: string[] = location.hash.split('/');
    let data: Object[] = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length) {
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
}
function dataBound(args: object): void {
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
// tslint:disable-next-line:max-func-body-length
function sbHeaderClick(action: string, preventSearch?: boolean): void {
    if (openedPopup) {
        openedPopup.hide(new Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
    }
    if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
        searchOverlay.classList.add('sb-hide');
        searchButton.classList.remove('active');
    }
    let curPopup: Popup;
    switch (action) {
        case 'changeSampleBrowser':
            curPopup = switcherPopup;
            break;
        case 'changeTheme':
            headerThemeSwitch.classList.toggle('active');
            curPopup = themeSwitherPopup;
            break;
        case 'toggleSettings':
            settingElement.classList.toggle('active');
            themeDropDown.index = themeCollection.indexOf(selectedTheme);
            curPopup = settingsPopup;
            break;
    }
    if (action === 'closePopup') {
        headerThemeSwitch.classList.remove('active');
        settingElement.classList.remove('active');
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
    searchPopup.hide();
    searchButton.classList.toggle('active');
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
    // loadTheme(themeName);
}

function switchTheme(str: string): void {
    let hash: string[] = location.hash.split('/');
    if (hash[1] !== str) {
        hash[1] = str;
        location.hash = hash.join('/');
    }
}

/**
 * search input change
 */
function onsearchInputChange(e: KeyboardEvent): void {
    if (e.keyCode === 27) {
        toggleSearchOverlay();
    }
    let searchString: string = (e.target as any).value;
    // changeInputIcons(searchString.length > 0);
    if (searchString.length <= 2) {
        searchPopup.hide();
        return;
    }
    let val: any = [];
    val = searchInstance.search(searchString, {
        fields: {
            component: { boost: 1 },
            name: { boost: 2 }
        },
        expand: true,
        boolean: 'AND',
    });
    if (val.length) {
        let data: DataManager = new DataManager(val);
        let controls: any = data.executeLocal(new Query().take(10).select('doc'));
        let ds: any = DataUtil.group(controls, 'component');
        let dataSource: { [key: string]: Object }[] & Object[] = [];
        for (let j: number = 0; j < ds.length; j++) {
            let itemObj: any = ds[j].items;
            let field: string = 'name';
            let grpItem: { [key: string]: Object } = {};
            let hdr: string = 'isHeader';
            grpItem[field] = ds[j].key;
            grpItem[hdr] = true;
            grpItem.items = itemObj;
            dataSource.push(grpItem);
            for (let k: number = 0; k < itemObj.length; k++) {
                dataSource.push(itemObj[k]);
            }
        }
        let ele: any = ListBase.createList(dataSource, {
            fields: { id: 'uid', groupBy: 'component', text: 'name' },
            template: '<div class="e-text-content e-icon-wrapper" data="${dir}/${url}" uid="${uid}" pid="${parentId}">' +
            '<span class="e-list-text" role="list-item">' +
            '${name}</span></div>',
            groupTemplate:
            '${if(items[0]["component"])}<div class="e-text-content"><span class="e-search-group">${items[0].component}</span>' +
            '</div>${/if}'
        });
        searchPopup.element.innerHTML = '';
        highlight(searchString, ele);
        searchPopup.element.appendChild(ele);
        searchPopup.show();
    } else {
        searchPopup.element.innerHTML = '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>';
        searchPopup.show();
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
    setSelectList();
}
/**
 * Resize event processing
 */
function processResize(e: any): void {
    if (resizeManualTrigger) {
        return;
    }
    isMobile = window.matchMedia('(max-width:550px)').matches;
    isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
    isPc = window.matchMedia('(min-width:850px)').matches;
    processDeviceDependables();
    setLeftPaneHeight();
    let leftPane: Element = select('.sb-left-pane');
    let rightPane: Element = select('.sb-right-pane');
    let footer: Element = select('.sb-footer-left');
    let pref: Element = select('#settings-popup');
    if (isTablet || isMobile) {
        contentTab.hideTab(1);
    } else {
        contentTab.hideTab(1, false);
    }
    if (isMobile) {
        leftPane.classList.remove('sb-hide');
        if (leftPane.parentElement.classList.contains('sb-mobile-left-pane')) {
            if (!leftPane.parentElement.classList.contains('sb-hide')) {
                toggleLeftPane();
            }
        } else {
            select('.sb-mobile-left-pane').appendChild(leftPane);
            select('.sb-left-footer-links').appendChild(footer);
            if (!select('.sb-mobile-left-pane').classList.contains('sb-hide')) {
                toggleLeftPane();
            } else {
                leftToggle.classList.remove('toggle-active');
            }
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
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
    if (isTablet || isPc) {
        if (leftPane.parentElement.classList.contains('sb-mobile-left-pane')) {
            select('.sb-content').appendChild(leftPane);
            select('.sb-footer').appendChild(footer);
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
        }
        if (isTablet) {
            if (!leftPane.classList.contains('sb-hide')) {
                toggleLeftPane();
            }
            setTimeout(() => {
                if (!rightPane.classList.contains('control-fullview')) {
                    rightPane.classList.add('control-fullview');
                }
            },
                // tslint:disable-next-line:align
                500);
        }
        if (isPc && isVisible('.sb-left-pane')) {
            rightPane.classList.remove('control-fullview');
        }
        if (pref.parentElement.classList.contains('sb-mobile-preference')) {
            select('#sb-popup-section').appendChild(pref);
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
    headerThemeSwitch.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeTheme');
    });
    themeList.addEventListener('click', changeTheme);
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
    inputele.addEventListener('keyup', onsearchInputChange);
    setResponsiveElement.addEventListener('click', setMouseOrTouch);
    select('#sb-left-back').addEventListener('click', showHideControlTree);
    leftToggle.addEventListener('click', toggleLeftPane);
    select('.sb-mobile-overlay').addEventListener('click', toggleMobileOverlay);
    select('.sb-header-settings').addEventListener('click', viewMobilePrefPane);
    select('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
    /**
     * plnkr trigger
     */
    document.getElementById('open-plnkr').addEventListener('click', () => {
        let plnkrForm: HTMLFormElement = select('#plnkr-form') as HTMLFormElement;
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
    select('.copycode').addEventListener('click', copyCode);
    searchEle.addEventListener('click', (e: MouseEvent) => {
        let curEle: HTMLElement = <HTMLElement>closest((e.target as any), 'li');
        if (curEle && curEle.classList.contains('e-list-item')) {
            let tcontent: any = curEle.querySelector('.e-text-content');
            let hashval: string = '#/' + selectedTheme + '/' + tcontent.getAttribute('data') + '.html';
            inputele.value = '';
            searchPopup.hide();
            searchOverlay.classList.add('e-search-hidden');
            if (location.hash !== hashval) {
                sampleOverlay();
                location.hash = hashval;
                setSelectList();
            }
        }
    });
}

/**
 * set anchor links for other sample browser
 */

/**
 * 
 */
function copyCode(): void {
    let copyElem: HTMLElement = select('#' + cBlock[sourceTab.selectedItem]) as HTMLElement;
    let textArea: HTMLTextAreaElement = createElement('textArea') as HTMLTextAreaElement;
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    detach(textArea);
    (select('.copy-tooltip') as any).ej2_instances[0].close();
}
function setSbLink(): void {
    let href: string = location.href;
    let link: string[] = href.match(urlRegex);
    let sample: string = href.match(sampleRegex)[1];
    for (let sb of sbArray) {
        let ele: HTMLFormElement = <HTMLFormElement>select('#' + sb);
        ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('http://npmci.syncfusion.com/production/')) +
            sb + '/' + 'demos/#/' + sample + (sb === 'javascript' ? '.html' : '');
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
    themeList.querySelector('.active').classList.remove('active');
    themeList.querySelector('#' + theme).classList.add('active');
    let ajax: Ajax = new Ajax('./styles/' + theme + '.css', 'GET', true);
    ajax.send().then((result: any) => {
        let doc: HTMLFormElement = <HTMLFormElement>document.getElementById('themelink');
        doc.innerHTML = result;
        selectedTheme = theme;
        //renderleftpane 
        renderLeftPaneComponents();
        //renderPopups
        renderSbPopups();
        bindEvents();
        if (isTablet || isMobile) {
            contentTab.hideTab(1);
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
        // 
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();
        // doc.href = 'styles/' + selectedTheme + '.css';
    });
}
/**
 * Mobile Overlay 
 */
function toggleMobileOverlay(): void {
    if (!select('.sb-mobile-left-pane').classList.contains('sb-hide')) {
        toggleLeftPane();
    }
    if (!select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
        toggleRightPane();
    }
}
function removeMobileOverlay(): void {
    select('.sb-mobile-overlay').classList.add('sb-hide');
}
function isLeftPaneOpen(): boolean {
    return leftToggle.classList.contains('toggle-active');
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
    let leftPane: HTMLElement = select('.sb-left-pane') as HTMLElement;
    let rightPane: HTMLElement = select('.sb-right-pane') as HTMLElement;
    let mobileLeftPane: Element = select('.sb-mobile-left-pane');
    let reverse: boolean = leftPane.classList.contains('sb-hide');
    if (reverse) {
        leftToggle.classList.add('toggle-active');
    } else {
        leftToggle.classList.remove('toggle-active');
    }
    if (!isMobile) {
        leftPane.classList.remove('sb-hide');
        rightPane.classList.add('control-transition');
        rightPane.style.overflowY = 'hidden';
        if (!reverse) {
            rightPane.classList.add('control-animate');
        } else {
            rightPane.classList.add('control-reverse-animate');
        }
    } else {
        reverse = mobileLeftPane.classList.contains('sb-hide');
        mobileLeftPane.classList.remove('sb-hide');
    }
    select('.sb-mobile-overlay').classList.toggle('sb-hide');
    if (!reverse) {
        rightPane.classList.remove('control-fullview');
    } else {
        rightPane.classList.add('control-fullview');
    }
    toggleAnim.animate(leftPane, {
        name: reverse ? 'SlideLeftIn' : 'SlideLeftOut', end: (): void => {
            if (!isMobile) {
                rightPane.classList.remove('control-transition');
                rightPane.style.overflowY = 'auto';
                if (!reverse) {
                    leftPane.classList.add('sb-hide');
                    rightPane.classList.remove('control-animate');
                } else {
                    rightPane.classList.remove('control-reverse-animate');
                }
                rightPane.classList.toggle('control-fullview');
            } else if (isMobile && !reverse) {
                mobileLeftPane.classList.add('sb-hide');
            }
            resizeManualTrigger = true;
            window.dispatchEvent(new Event('resize'));
            resizeManualTrigger = false;
        }
    });
}
/**
 * Mobile Right pane toggle functions
 */
function toggleRightPane(): void {
    themeDropDown.index = themeCollection.indexOf(selectedTheme);
    let mRightPane: HTMLElement = select('.sb-mobile-right-pane') as HTMLElement;
    select('.sb-mobile-overlay').classList.toggle('sb-hide');
    let reverse: boolean = mRightPane.classList.contains('sb-hide');
    mRightPane.classList.remove('sb-hide');
    toggleAnim.animate(mRightPane, {
        name: reverse ? 'SlideRightIn' : 'SlideRightOut', end: (): void => {
            if (!reverse) {
                mRightPane.classList.add('sb-hide');
            }
        }
    });
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
        for (let temp of tempList) {
            let data: DataManager = new DataManager((temp as any).samples);
            temp.samples = <Samples[]>data.executeLocal(new Query().where('hideOnDevice', 'notEqual', true));
        }
        return tempList;
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
            nodeClicked: controlSelect
        },
        '#controlTree');
    let controlList: ListView = new ListView(
        {
            dataSource: controlSampleData[location.hash.split('/')[2]] || controlSampleData.chart,
            fields: { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' },
            select: controlSelect,
            template: '<div class="e-text-content e-icon-wrapper"> <span class="e-list-text" role="listitem">${name}' +
            '${if(type)}<span class="e-samplestatus ${type}"></span>${/if}</span>' +
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
            let theme: string = location.hash.split('/')[1] || 'material';
            location.hash = '#/' + theme + path;
        }
        if ((arg.item && isMobile && !select('.sb-mobile-left-pane').classList.contains('sb-hide')) || (isTablet && isLeftPaneOpen())) {
            toggleLeftPane();
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
    let hash: string[] = location.hash.split('/');
    let list: ListView = (select('#controlList') as any).ej2_instances[0];
    let control: Element = select('[control-name="' + hash[2] + '"]');
    if (control) {
        let data: any = list.dataSource;
        let samples: any = controlSampleData[control.getAttribute('control-name')];
        if (JSON.stringify(data) !== JSON.stringify(samples)) {
            list.dataSource = samples;
        }
        let selectSample: Element = select('[sample-name="' + hash.slice(-1)[0].split('.html')[0] + '"]');
        if (selectSample) {
            if ((select('#controlTree') as HTMLElement).style.display !== 'none') {
                showHideControlTree();
            }
            list.selectItem(selectSample);
        }
    } else {
        showHideControlTree();
        list.selectItem(select('[sample-name="line"]'));
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
    if (!isTablet && !isMobile) {
        let propertypane: HTMLElement = <any>select('.property-section');
        let ele: HTMLElement = <any>document.querySelector('.control-section');
        if (ele && propertypane) {
            ele.classList.add('sb-property-border');
        } else {
            ele.classList.remove('sb-property-border');
        }

    }
}

function routeDefault(): void {
    addRoute('', () => {
        window.location.href = '#/' + selectedTheme + '/chart/line.html';
        isInitRedirected = true;
    });
    bypassed.add((request: string) => {
        let hash: string[] = request.split('.html')[0].split('/');
        if (samplePath.indexOf(hash.slice(1).join('/')) === -1) {
            location.hash = '#/' + hash[0] + '/' + (defaultSamples[hash[1]] || 'chart/line.html');
            isInitRedirected = true;
        }
    });
}
function destroyControls(): void {
    let elementlist: HTMLElement[] = selectAll('.e-control', document.getElementById('control-content'));
    for (let control of elementlist) {
        for (let instance of (<Object[]>(<DestroyMethod>control).ej2_instances)) {
            (<DestroyMethod>instance).destroy();
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
    let prevForm: Element = select('#plnkr-form');
    if (prevForm) {
        detach(prevForm);
    }
    let form: HTMLFormElement = <HTMLFormElement>createElement('form');
    form.setAttribute('action', 'http://plnkr.co/edit/?p=preview');
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'plnkr-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    let plunks: string[] = Object.keys(plnkr);
    for (let x: number = 0; x < plunks.length; x++) {
        let ip: HTMLElement = createElement('input');
        ip.setAttribute('type', 'hidden');
        ip.setAttribute('value', <string>plnkr[plunks[x]]);
        ip.setAttribute('name', 'files[' + plunks[x] + ']');
        form.appendChild(ip);
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
            let control: string = node.directory;
            let sample: string = subNode.url;
            samplePath = samplePath.concat(control + '/' + sample);
            let sampleName: string = node.name + ' / ' + ((node.name !== subNode.category) ?
                (subNode.category + ' / ') : '') + subNode.name;
            let selectedTheme: string = location.hash.split('/')[1] ? location.hash.split('/')[1] : 'material';
            let urlString: string = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
            samplesAr.push('#' + urlString);
            // tslint:disable-next-line:max-func-body-length
            addRoute(urlString, () => {
                let controlID: string = node.uid;
                let sampleID: string = subNode.uid;
                (document.getElementById('open-plnkr') as any).disabled = true;
                let openNew: HTMLFormElement = (select('#openNew') as HTMLFormElement);
                if (openNew) {
                    openNew.href = location.href.split('#')[0] + 'samples/' + node.directory + '/' + subNode.url + '/index.html';
                }
                setSbLink();
                // select('#switch').classList.remove('hidden');
                //document.getElementById('source-panel').style.display = 'block';
                // .href =
                //     location.href.split('#')[0] + 'samples/' + node.directory + '/' + subNode.url + '/index.html';
                let ajaxHTML: Ajax = new Ajax('src/' + control + '/' + sample + '.html', 'GET', true);
                let p1: Promise<Ajax> = ajaxHTML.send();
                let p2: Promise<Object> = loadScriptfile('src/' + control + '/' + sample + '.js');
                let ajaxTs: Ajax = new Ajax('src/' + control + '/' + sample + '.ts', 'GET', true);
                /**
                 * sample header
                 */
                sampleNameElement.innerHTML = node.name;
                /**
                 * BreadCrumb
                 */
                sourceTab.selectedItem = 0;
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
                for (let k: number = 0; k < 2; k++) {
                    let header: Element = getSourceTabHeader(k);
                    if (header) {
                        header.innerHTML = sample + (k ? '.html' : '.ts');
                    }
                }
                ajaxTs.send().then((value: Object): void => {
                    document.querySelector('.ts-source-content').innerHTML = value.toString().replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                    hljs.highlightBlock(document.querySelector('.ts-source-content'));
                });
                let plunk: Ajax = new Ajax('src/' + control + '/' + sample + '-plnkr.json', 'GET', true);
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
                    let htmlCodeSnippet: string = htmlCode.innerHTML.replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    document.querySelector('.html-source-content').innerHTML = htmlCodeSnippet;
                    hljs.highlightBlock(document.querySelector('.html-source-content'));
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
                }).catch((reason: any): void => {
                    errorHandler(reason.message);
                });
            });
        }
    }
}
function removeOverlay(): void {
    sbContentOverlay.classList.add('sb-hide');
    sbRightPane.classList.remove('sb-right-pane-overlay');
    sbHeader.classList.remove('sb-right-pane-overlay');
    mobNavOverlay(false);
    if (!sbBodyOverlay.classList.contains('sb-hide')) {
        sbBodyOverlay.classList.add('sb-hide');
    }
    sbRightPane.scrollTop = 0;
}

function sampleOverlay(): void {
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
    if (newHash.length && !select('#' + control + '-common') && checkSampleLength(control)) {
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
    return document.querySelectorAll('.sb-source-code-section>.e-header .e-tab-text')[index];
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
/**
 * init function
 */
function loadJSON(): void {
    /**
     * Mouse or touch setting
     */
    let switchText: string = localStorage.getItem('ej2-switch') ||
        (window.screen.width > 1366 ? 'touch' : 'mouse');
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
        select('.sb-mobile-left-pane').appendChild(select('.sb-left-pane'));
        leftToggle.classList.remove('toggle-active');
    }
    overlay();
    changeMouseOrTouch(switchText);
    localStorage.removeItem('ej2-switch');
    enableRipple(selectedTheme === 'material' || !selectedTheme);
    loadTheme(selectedTheme);
}


loadJSON();