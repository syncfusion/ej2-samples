/// <reference path='./sampleList.ts' />
/**
 * Propertypanel generator
 */
import { createElement, detach } from '@syncfusion/ej2-base/dom';



export function renderPropertyPane(ele: string): void {
    let elem: Element = document.querySelector(ele);
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

