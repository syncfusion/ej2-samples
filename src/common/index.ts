/// <reference path='./sampleList.ts' />
/**
 * default script manupulation for sample browser
 */
import '../../node_modules/es6-promise/dist/es6-promise';
import { Ajax, Browser, enableRipple, extend, detach, select, addClass, isVisible, createElement, selectAll } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SelectEventArgs, ListView } from '@syncfusion/ej2-lists';
import * as hasher from 'hasher';
import { renderPropertyPane } from './propertypane';
import { addRoute, bypassed, parse } from 'crossroads';
import * as samplesJSON from './sampleList';
import * as hljs from './lib/highlightjs';
declare let require: (url: string) => Object;
const tabList: string[] = ['htab', 'ttab'];
const urlSplit: RegExp = /\b(?!html)\b([A-Za-z-]+)/g;
let execFunction: { [key: string]: Object } = {};
let selectedTheme: string = location.hash.split('/')[1];
let availableThemes: string[] = ['material', 'fabric', 'bootstrap'];
let isHashChanged: boolean = true;
let isButtonClick: boolean = false;

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
}

declare let window: MyWindow;

interface Controls {
    directory: string;
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
if (document.referrer && document.referrer.indexOf('syncfusion') === -1) {
    // tslint:disable-next-line:no-cookies
    document.cookie = 'SampleSiteReferrer' + '=' + document.referrer + ';path=/;domain=syncfusion.com';
}

let samplesList: Controls[] | { [key: string]: Object }[] = getSampleList();
let currentControl: string;
let currentListControl: string;
let defaultTree: boolean = false;
let samplesAr: string[] = [];
let currentControlID: string;
let currentSampleID: string;
let isInitRedirected: boolean;
let isExternalNavigation: boolean = true;
let needResponsive: boolean = true;
let isSameParent: boolean = false;
let sampleTree: ListView = new ListView(
    {
        dataSource: <{ [key: string]: Object; }[] & Controls[]>samplesList,
        fields: { id: 'uid', groupBy: 'order', child: 'samples', text: 'name' },
        sortOrder: 'Ascending',
        headerTitle: 'All Controls',
        select: onSampleSelect,
        template: '<div class="e-text-content e-icon-wrapper"> <span class="e-list-text" role="listitem">${name}' +
        '${if(type)}<span class="e-samplestatus ${type}"></span>${/if}</span>' +
        '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>',
        groupTemplate: '${if(items[0]["category"])}<div class="e-text-content"><span class="e-list-text">${items[0].category}</span>' +
        '</div>${/if}'
    });
let mouseButton: Button = new Button({ cssClass: 'e-flat', iconCss: 'sb-icons sb-mouse' });
let touchButton: Button = new Button({ cssClass: 'e-flat', iconCss: 'sb-icons sb-touch' });
window.navigateSample = (window.navigateSample !== undefined) ? window.navigateSample : (): void => { return; };
function triggerTabSwitch(args: MouseEvent): void {
    changeTab(tabList.indexOf((<Element>args.target).id));
}

function changeTab(id: number): void {
    let theader: string[] = ['hcode', 'tcode'];
    let cBlock: string[] = ['html-tab', 'ts-tab'];
    let aTag: string[] = ['htab', 'ttab'];
    let dId: number = !id ? 1 : 0;
    let hiddenTab: HTMLElement = document.getElementById(theader[dId]);
    let activeTab: HTMLElement = document.getElementById(theader[id]);
    let hiddenContent: HTMLElement = document.getElementById(cBlock[dId]);
    let activeContent: HTMLElement = document.getElementById(cBlock[id]);
    hiddenTab.classList.remove('active');
    document.getElementById(aTag[dId]).removeAttribute('aria-selected');
    activeTab.classList.add('active');
    document.getElementById(aTag[id]).setAttribute('aria-selected', 'true');
    hiddenContent.style.display = 'none';
    hiddenContent.setAttribute('aria-hidden', 'true');
    activeContent.style.display = '';
    activeContent.removeAttribute('aria-hidden');
}

let headerHeight: number = (<HTMLElement>select('.sb-header')).offsetHeight;
let navHeight: number = (<HTMLElement>select('.sample-nav')).offsetHeight;
let listHeadHeight: number = (<HTMLElement>select('.left-tree-head')).offsetHeight;
let isInitialLoad: boolean = true;
function setResponsive(): void {
    let content: HTMLElement = <HTMLElement>select('#control-container');
    let controlTree: HTMLElement = <HTMLElement>select('#control-list');
    navHeight = window.screen.width > 480 ? navHeight : 0;
    let contentHeight: string = (window.innerHeight - (headerHeight + navHeight)).toString();
    content.style.height = contentHeight + 'px';
    // let listHeight: string = (window.innerHeight - (headerHeight + navHeight + listHeadHeight)).toString();
    let listHeight: string = (window.innerHeight - (headerHeight + listHeadHeight)).toString();
    controlTree.style.height = listHeight + 'px';
    if (isVisible(leftPanel) && window.innerWidth <= 768) {
        slideOut();
    }
}

window.onresize = (event: Event): void => {
    if (needResponsive) {
        setResponsive();
    }
};
function getSampleList(): Controls[] | { [key: string]: Object }[] {
    if (Browser.isDevice) {
        let tempList: Controls[] = <Controls[]>extend([], samplesJSON.samplesList);
        for (let temp of tempList) {
            let data: DataManager = new DataManager(temp.samples);
            temp.samples = <Samples[]>data.executeLocal(new Query().where('hideOnDevice', 'notEqual', true));
        }
        return tempList;
    }
    return samplesJSON.samplesList;
}
function loadJSON(): void {
    //material is default theme.  
    if (availableThemes.indexOf(selectedTheme) === -1) {
        selectedTheme = 'material';
    }
    loadTheme(selectedTheme);
    enableRipple(selectedTheme === 'material');
    overlay();
    routeDefault();
    showBackButton();
    addRoutes(<Controls[]>samplesList);
    sampleTree.appendTo('#control-list');
    mouseButton.appendTo('#mouse');
    touchButton.appendTo('#touch');
    mouseButton.element.onclick = () => {
        localStorage.setItem('ej2-switch', 'M');
        location.reload();
    };
    touchButton.element.onclick = () => {
        localStorage.setItem('ej2-switch', 'T');
        location.reload();
    };
    if (Browser.info.name === 'chrome' && Browser.isDevice) {
        let htmlScrollElement: HTMLElement = document.getElementById('html-tab-scroll');
        htmlScrollElement.addEventListener('touchstart', () => {
            htmlScrollElement.style.width = '';
            htmlScrollElement.style.width = htmlScrollElement.offsetWidth + 'px';
        });
    }
    let switchElement: HTMLElement = document.getElementById('switch');
    if (window.screen.width <= 768 || window.screen.width > 1366) {
        document.body.classList.add('e-bigger');
        mouseButton.element.classList.remove('active');
        touchButton.element.classList.add('active');
    }
    document.getElementById('control-container').addEventListener('scroll', () => {
        if (!Browser.isDevice) { return; }
        let content: HTMLElement = <HTMLElement>select('#control-container');
        let sbHeader: HTMLElement = <HTMLElement>select('.sb-header');
        let sbContent: HTMLElement = <HTMLElement>select('.sb-content');
        let cList: HTMLElement = <HTMLElement>select('#control-list');
        if (content.scrollTop > 40) {
            sbHeader.style.display = 'none';
            sbContent.classList.add('adjust-content');
            cList.classList.add('no-space');
        } else if (content.scrollTop < 5) {
            sbHeader.style.display = '';
            sbContent.classList.remove('adjust-content');
            cList.classList.remove('no-space');
        }
    });
    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();
    wireEvents();
    let mouseOrTouch: string = localStorage.getItem('ej2-switch');
    if (mouseOrTouch) {
        if (mouseOrTouch === 'M') {
            document.body.classList.remove('e-bigger');
            mouseButton.element.classList.add('active');
            touchButton.element.classList.remove('active');
        } else {
            document.body.classList.add('e-bigger', 'active');
            touchButton.element.classList.add('active');
            mouseButton.element.classList.remove('active');
        }
    }
    localStorage.removeItem('ej2-switch');
    setResponsive();
    select('#themeswitcher').addEventListener('click', toggleTheme);
    select('#themelist').addEventListener('click', changeTheme);
    let body: HTMLElement = document.body;
    if (body.classList.length > 0) {
        for (let theme of availableThemes) {
            body.classList.remove(theme);
        }
    }
    body.classList.add(selectedTheme);
}

function loadPage(page: string): void {
    let ajax: Ajax = new Ajax(page + '.html', 'GET', true);
    ajax.send().then((value: Object): void => {
        document.getElementById('control-content').innerHTML = value.toString();
        document.getElementById('source-panel').style.display = 'none';
        addClass(document.getElementsByClassName('nav-btn'), 'hidden');
    }).catch((reason: any): void => {
        errorHandler(reason.message);
    });
}
function errorHandler(error: string): void {
    document.getElementById('control-content').innerHTML = error ? error : 'Not Available';
    select('#control-content').classList.add('error-content');
    select('.sb-loading').classList.add('hidden');
    document.body.classList.remove('sb-overlay');
}
function showBackButton(): void {
    if (location.hash) {
        select('#sidebar-title').innerHTML = 'All Controls';
        (select('#back-btn-icon') as HTMLElement).style.display = '';
    }
}

function routeDefault(): void {
    addRoute('', () => {
        // loadPage('showcase');

        //Redirected page until showcase page implemented
        window.location.href = '#/' + selectedTheme + '/chart/line.html';
        isInitRedirected = true;
    });
    bypassed.add((request: Object) => {
        loadPage('404');
    });
}

function wireEvents(): void {
    select('#tree-back').addEventListener('click', onBackClick);
    select('#next-sample').addEventListener('click', onNextButtonClick);
    select('#prev-sample').addEventListener('click', onPrevButtonClick);
    select('.slide-nav').addEventListener('click', onOpenClick);
    select('.control-panel').addEventListener('click', onCloseClick);
    select('#htab').addEventListener('click', triggerTabSwitch);
    select('#ttab').addEventListener('click', triggerTabSwitch);
}

function navigateURL(arg: Controls & Samples, isInteracted: boolean): void {
    let cCtrl: string = (isInteracted ? currentListControl : currentControl);
    if (!arg.hasOwnProperty('samples')) {
        let sample: string = arg.url;
        let targetHash: string = selectedTheme + '/' + cCtrl + '/' + sample + '.html';
        if (location.hash === ('#/' + targetHash)) {
            isHashChanged = false;
        }
        hasher.setHash(targetHash);
        if (isVisible(select('.slide-nav'))) {
            onCloseClick();
        }
    } else {
        currentListControl = arg.directory;
    }
}
function loadTheme(theme: string): void {
    let doc: HTMLFormElement = <HTMLFormElement>document.getElementById('themelink');
    selectedTheme = theme;
    doc.href = 'styles/' + selectedTheme + '.css';
    select('#themeswitcher-icon').setAttribute('src', 'styles/images/sb_icons/SB_Switcher_icon_' + theme + '.png');
    document.getElementById(theme).style.background = '#DEDFE0';
}
function addRoutes(samplesList: Controls[]): void {
    for (let node of samplesList) {
        let dataManager: DataManager = new DataManager(node.samples);
        let samples: Samples[] & { [key: string]: Object }[] = <Samples[] & { [key: string]: Object }[]>
            dataManager.executeLocal(new Query().sortBy('order', 'ascending'));
        for (let subNode of samples) {
            let control: string = node.directory;
            let sample: string = subNode.url;
            let sampleName: string = node.name + ' / ' + ((node.name !== subNode.category) ?
                (subNode.category + ' / ') : '') + subNode.name;
            let selectedTheme: string = location.hash.split('/')[1] ? location.hash.split('/')[1] : 'material';
            let urlString: string = '/' + selectedTheme + '/' + control + '/' + sample + '.html';
            samplesAr.push('#' + urlString);
            addRoute(urlString, () => {
                let controlID: string = node.uid;
                let sampleID: string = subNode.uid;
                select('#switch').classList.remove('hidden');
                document.getElementById('source-panel').style.display = 'block';
                let ajaxHTML: Ajax = new Ajax('src/' + control + '/' + sample + '.html', 'GET', true);
                let p1: Promise<Ajax> = ajaxHTML.send();
                let p2: Promise<Object> = loadScriptfile('src/' + control + '/' + sample + '.js');
                let ajaxTs: Ajax = new Ajax('src/' + control + '/' + sample + '.ts', 'GET', true);
                select('#htab').innerHTML = sample + '.html';
                select('#ttab').innerHTML = sample + '.ts';
                ajaxTs.send().then((value: Object): void => {
                    document.getElementById('ts-source').innerHTML = value.toString().replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                    hljs.highlightBlock(document.getElementById('ts-source'));
                });
                let plunk: Ajax = new Ajax('src/' + control + '/' + sample + '-plnkr.json', 'GET', true);
                let p3: Promise<Ajax> = plunk.send();
                Promise.all([
                    p1,
                    p2,
                    p3,
                ]).then((results: Object[]): void => {
                    let htmlString: string = results[0].toString();
                    destroyControls();
                    currentControlID = controlID;
                    currentSampleID = sampleID;
                    currentControl = node.directory;
                    if (isExternalNavigation) {
                        if (isSameParent && !defaultTree) {
                            sampleTree.selectItem({ id: sampleID });
                        } else {
                            showBackButton();
                            sampleTree.selectItem({ id: controlID });
                            sampleTree.selectItem({ id: sampleID });
                        }
                    }
                    let curIndex: number = samplesAr.indexOf(location.hash);
                    let samLength: number = samplesAr.length - 1;
                    if (isButtonClick) {
                        scrollElement(sampleID);
                        isButtonClick = false;
                    }
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
                    document.getElementById('html-tab-scroll').style.width = '';
                    select('#control-content').classList.remove('error-content');
                    document.getElementById('control-content').innerHTML = htmlString;
                    let controlEle: Element = document.querySelector('.control-section');
                    let controlString: string = controlEle.innerHTML;
                    controlEle.innerHTML = '';
                    controlEle.appendChild(createElement('div', { className: 'control-wrapper', innerHTML: controlString }));
                    renderPropertyPane('#property');
                    renderDescription();
                    document.getElementsByClassName('sample-name')[0].innerHTML = sampleName;
                    let htmlCode: HTMLElement = createElement('div', { innerHTML: htmlString });
                    let description: Element = htmlCode.querySelector('#description');
                    if (description) {
                        detach(description);
                    }
                    let htmlCodeSnippet: string = htmlCode.innerHTML.replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    document.getElementById('html-source').innerHTML = htmlCodeSnippet;
                    hljs.highlightBlock(document.getElementById('html-source'));
                    getExecFunction(control + sample)();
                    changeTab(1);
                    window.navigateSample();
                    select('.sb-loading').classList.add('hidden');
                    document.body.classList.remove('sb-overlay');
                    select('#source-panel').classList.remove('hidden');
                    isExternalNavigation = defaultTree = false;
                    plunker(<string>results[2]);
                }).catch((reason: any): void => {
                    errorHandler(reason.message);
                });
            });
        }
    }
}

function scrollElement(arg: string): void {
    let scrollElement: HTMLElement = document.querySelector('#control-list') as HTMLElement;
    let curEle: HTMLElement = document.querySelector('[uid=\'' + arg + '\']') as HTMLElement;
    if (curEle && scrollElement.scrollHeight !== scrollElement.offsetHeight) {
        if (scrollElement.scrollHeight > scrollElement.offsetTop) {
            scrollElement.scrollTop = (curEle.offsetTop - scrollElement.offsetHeight) + curEle.offsetHeight;
        } else {
            scrollElement.scrollTop = (curEle.offsetTop - scrollElement.scrollTop) + curEle.offsetHeight;
        }
    }
}

function onSampleSelect(arg: SelectEventArgs): void {
    let data: { [key: string]: Object } = arg.data as { [key: string]: Object };
    if (data.category !== 'ShowCase') {
        isHashChanged = true;
        navigateURL(<any>data, arg.isInteracted);
        // let currentItem: HTMLElement = <HTMLElement>arg.item;
        // this.element.scrollTop = currentItem.offsetTop;
        if (arg.isInteracted) {
            showBackButton();
        }
        if (!(<Controls & { [key: string]: Object }>data).samples && isHashChanged) {
            overlay();
        }
    } else {
        window.open('./src/' + data.directory + '/default.html');
    }
}

function onBackClick(arg: MouseEvent): void {
    if (!sampleTree.element.querySelector('.e-animate')) {
        select('#sidebar-title').innerHTML = 'All Controls';
        (select('#back-btn-icon') as HTMLElement).style.display = 'none';
        sampleTree.back();
        defaultTree = true;
    }
}

let leftPanel: HTMLElement = (select('.left-panel') as HTMLElement);
let controlPanel: HTMLElement = (select('.control-panel') as HTMLElement);
function onOpenClick(arg: MouseEvent): void {
    dispatchResize();
    if (!leftPanel.classList.contains('toggled')) {
        leftPanel.classList.add('toggled');
        controlPanel.classList.add('control-animate');
    } else {
        slideOut();
    }
    arg.stopPropagation();
    closeThemeSelection();
}

function dispatchResize(): void {
    needResponsive = false;
    window.dispatchEvent(new Event('resize'));
    needResponsive = true;
}

function slideOut(): void {
    leftPanel.classList.remove('toggled');
    controlPanel.classList.remove('control-animate');
}

function onCloseClick(arg?: MouseEvent): void {
    let ele: Element = select('.left-panel');
    if (isVisible(ele) && isVisible(select('.slide-nav'))) {
        slideOut();
    }
    closeThemeSelection();
}

function onNextButtonClick(arg: MouseEvent): void {
    isButtonClick = true;
    overlay();
    let curSampleUrl: string = location.hash;
    let inx: number = samplesAr.indexOf(curSampleUrl);
    if (inx !== -1) {
        let prevhref: string = samplesAr[inx];
        let curhref: string = samplesAr[inx + 1];
        checkLevel(prevhref, curhref);
        location.href = curhref;
    }
}

function toggleButtonState(id: string, state: boolean): void {
    let ele: HTMLButtonElement = <HTMLButtonElement>document.getElementById(id);
    ele.disabled = state;
    if (state) {
        ele.classList.add('e-disabled');
    } else {
        ele.classList.remove('e-disabled');
    }
}

function onPrevButtonClick(arg: MouseEvent): void {
    isButtonClick = true;
    overlay();
    let curSampleUrl: string = location.hash;
    let inx: number = samplesAr.indexOf(curSampleUrl);
    if (inx !== -1) {
        let prevhref: string = samplesAr[inx];
        let curhref: string = samplesAr[inx - 1];
        checkLevel(prevhref, curhref);
        location.href = curhref;
    }
}

function checkLevel(prevhref: string, curhref: string): void {
    let prevHrefSplit: string[] = prevhref.match(urlSplit);
    let curhrefSplit: string[] = curhref.match(urlSplit);
    if (prevHrefSplit[1] !== curhrefSplit[1]) {
        isSameParent = false;
        sampleTree.back();
    } else {
        isSameParent = true;
    }
    isExternalNavigation = true;
}
function parseHash(newHash: string, oldHash: string): void {
    let newTheme: string = newHash.split('/')[0];
    let control: string = newHash.split('/')[1];
    if (newTheme !== selectedTheme && availableThemes.indexOf(newTheme) !== -1) {
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

function checkSampleLength(directory: string): boolean {
    let data: DataManager = new DataManager(samplesList);
    let controls: Controls[] = <Controls[]>data.executeLocal(new Query().where('directory', 'equal', directory));
    return controls[0].samples.length > 1;
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
        return execFunction[sample] = window.default;
    }
}

function overlay(): void {
    document.body.classList.add('sb-overlay');
    select('.sb-loading').classList.remove('hidden');
    select('#source-panel').classList.add('hidden');
}

function renderDescription(): void {
    let header: HTMLElement;
    let description: HTMLElement = <HTMLElement>select('#description', select('#control-content'));
    let descElement: HTMLElement = <HTMLElement>select('.description-section');
    if (description) {
        if (!descElement) {
            descElement = createElement('div', { className: 'description-section' });
            header = createElement('div', { className: 'description-header', innerHTML: 'Description' });
            descElement.appendChild(header);
        } else {
            detach(select('#description', descElement));
        }
        descElement.appendChild(description);
        let controlContainer: HTMLElement = <HTMLElement>select('.control-fluid');
        controlContainer.parentNode.insertBefore(descElement, controlContainer.nextSibling);
    } else if (descElement) {
        detach(descElement);
    }
}

function plunker(results: string): void {
    let plnkr: { [key: string]: Object } = JSON.parse(results);
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
    document.getElementById('plnkr').addEventListener('click', () => { form.submit(); });
}

function toggleTheme(): void {
    let target: any = document.getElementById('selectdiv');
    target.classList.toggle('e-hidden');
    select('#themeswitcher').classList.toggle('active');
}
function changeTheme(arg: MouseEvent): void {
    let target: Element = <Element>arg.target;
    let themeName: string = target.textContent || target.className.split(' ')[1];
    themeName = themeName.toLowerCase();
    let hash: string[] = location.hash.split('/');
    hash[1] = themeName;
    location.hash = hash.join('/');
}
function closeThemeSelection(): void {
    if (!select('#selectdiv').classList.contains('e-hidden')) {
        toggleTheme();
    }
}
loadJSON();