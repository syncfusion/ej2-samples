/// <reference path='./sampleList.ts' />
/**
 * Propertypanel generator
 */
import { createElement, detach, select } from '@syncfusion/ej2-base';



export function renderPropertyPane(ele: string): void {
    let controlSection: Element = document.getElementById('control-content');
    let elem: Element = controlSection.querySelector(ele);
    let title: string;
    if (!elem) { return; }
    title = elem.getAttribute('title');
    let parentEle: Element = elem.parentElement;
    elem = detach(elem);
    elem.classList.add('property-panel-table');
    let parentPane: Element = createElement('div', {
        className: 'property-panel-section',
        innerHTML: `<div class="property-panel-header">${title}</div><div class="property-panel-content"></div>`
    });
    parentPane.children[1].appendChild(elem);
    parentEle.appendChild(parentPane);
}

export function renderDescription(): void {
    let header: HTMLElement;
    let description: HTMLElement = <HTMLElement>select('#description', select('#control-content'));
    let descElement: HTMLElement = <HTMLElement>select('.description-section');
    let iDescription: Element = select('#description', descElement);
    if (iDescription) {
        detach(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}

export function renderActionDescription(): void {
    let aDescription: HTMLElement = <HTMLElement>select('#action-description', select('#control-content'));
    let aDescElem: HTMLElement = <HTMLElement>select('.sb-action-description');
    if (aDescription) {
        aDescElem.innerHTML = '';
        aDescElem.appendChild(aDescription);
        aDescElem.style.display = '';
    } else if (aDescElem) {
        aDescElem.style.display = 'none';
    }
    let loadEle: any = document.getElementById('sb-content');
    if (loadEle.ej2_instances[0]) {
        loadEle.ej2_instances[0].tbObj.refreshOverflow();
    }
}