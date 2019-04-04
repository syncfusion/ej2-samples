/**
 * Represents document editor header and footer.
 */

import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { ToolBar } from './tool-bar';

export class HeaderFooterProperties {
    public element: HTMLElement;
    private documentEditor: DocumentEditor;
    private firstPage: CheckBox;
    private oddOrEven: CheckBox;
    private pageNumber: CheckBox;
    private pageCount: CheckBox;
    private headerFromTop: NumericTextBox;
    private footerFromTop: NumericTextBox;
    public toolbar: ToolBar;
    private isHeaderTopApply: boolean = false;
    private isFooterTopApply: boolean = false;
    constructor(documentEditor: DocumentEditor) {
        this.documentEditor = documentEditor;
        this.initHeaderFooterPane();
        this.wireEvents();
    }
    public initHeaderFooterPane(): void {
        this.initializeHeaderFooter();
        this.element.style.display = 'none';
    }
    public showHeaderFooterPane(isShow: boolean): void {
        if (isShow) {
            this.toolbar.enableDisablePropertyPaneButton(false);
            this.onSelectionChange();
        }
        if (!isShow && this.element.style.display === 'none' || (isShow && this.element.style.display === 'block')) {
            return;
        }
        this.element.style.display = isShow ? 'block' : 'none';
        this.documentEditor.resize();
    }
    private initializeHeaderFooter(): void {
        let elementId: string = 'header_footer_properties';
        // tslint:disable-next-line:max-line-length
        this.element = createElement('div', { id: this.documentEditor.element.id + elementId, styles: 'width:269px;' });
        let headerDiv: HTMLElement = this.createDivTemplate('_header_footer', this.element, 'padding:10px;');
        let headerLabel: HTMLElement = createElement('label', { className: 'e-de-prop-header-label' });
        headerLabel.innerHTML = 'Header & Footer';
        let closeIcon: HTMLElement = createElement('span', {
            id: '_header_footer_close',
            className: 'e-de-icon-Close',
            styles: 'display:inline-block;float:right;cursor:pointer'
        });
        closeIcon.addEventListener('click', (): void => { this.onClose(); });
        headerDiv.appendChild(headerLabel);
        headerDiv.appendChild(closeIcon);
        let optionsLabelDiv: HTMLElement = this.createDivTemplate(elementId + '_options', this.element, 'padding-left: 10px');
        let optionsLabel: HTMLElement = createElement('label', { className: 'e-de-prop-label', styles: 'height:20px;' });
        optionsLabel.innerHTML = 'Options';
        optionsLabelDiv.appendChild(optionsLabel);
        let optionsDiv: HTMLElement = this.createDivTemplate(elementId + '_optionsDiv', optionsLabelDiv);
        let firstPageDiv: HTMLElement = this.createDivTemplate(elementId + '_firstPageDiv', optionsDiv, 'margin-bottom:3px;');
        let firstPage: HTMLInputElement = createElement('input', { id: 'firstPage', className: 'e-de-prop-sub-label' }) as HTMLInputElement;
        firstPageDiv.appendChild(firstPage);
        // tslint:disable-next-line:max-line-length
        this.firstPage = new CheckBox({ label: 'Different First Page', change: this.changeFirstPageOptions, cssClass: 'e-de-prop-sub-label' });
        this.firstPage.appendTo(firstPage);
        // tslint:disable-next-line:max-line-length
        firstPageDiv.children[0].setAttribute('title', 'Different header and footer for first page.');
        let oddOrEvenDiv: HTMLElement = this.createDivTemplate(elementId + '_oddOrEvenDiv', optionsDiv);
        let oddOrEven: HTMLInputElement = createElement('input', { id: 'oddOrEven', className: 'e-de-sub-prop-label' }) as HTMLInputElement;
        oddOrEvenDiv.appendChild(oddOrEven);
        // tslint:disable-next-line:max-line-length
        this.oddOrEven = new CheckBox({ label: 'Different Odd & Even Pages', change: this.changeoddOrEvenOptions, cssClass: 'e-de-prop-sub-label' });
        this.oddOrEven.appendTo(oddOrEven);
        // tslint:disable-next-line:max-line-length
        oddOrEvenDiv.children[0].setAttribute('title', 'Different header and footer for odd and even pages.');
        let optionsLine: HTMLElement = createElement('div', { className: 'e-de-prop-header-line', styles: 'margin-top:7px;' });
        optionsLabelDiv.appendChild(optionsLine);
        // tslint:disable-next-line:max-line-length
        // let autoFieldLabelDiv: HTMLElement = this.createDivTemplate(element + '_autoFieldLabelDiv', div, 'padding-top:10px;padding-left: 10px;');
        // let autoFieldLabel: HTMLElement = createElement('label', { className: 'e-de-header-prop-label', styles: 'height:20px;' });
        // autoFieldLabel.innerHTML = 'Insert Autofield';
        // autoFieldLabelDiv.appendChild(autoFieldLabel);
        // let autofieldDiv: HTMLElement = this.createDivTemplate(element + '_autofieldDiv', autoFieldLabelDiv, 'display:inline-flex;');
        // let pageNumberDiv: HTMLElement = this.createDivTemplate(element + '_pageNumberDiv', autofieldDiv, 'margin-right:8px;');
        // let pageNumber: HTMLInputElement = createElement('input', { id: 'pageNumber' }) as HTMLInputElement;
        // pageNumberDiv.appendChild(pageNumber);
        // this.pageNumber = new CheckBox({ label: 'Page Number', change: this.changePageNumber });
        // this.pageNumber.appendTo(pageNumber);
        // let pageCountDiv: HTMLElement = this.createDivTemplate(element + '_pageCountDiv', autofieldDiv);
        // let pageCount: HTMLInputElement = createElement('input', { id: 'pageCount' }) as HTMLInputElement;
        // pageCountDiv.appendChild(pageCount);
        // this.pageCount = new CheckBox({ label: 'Page Count', change: this.changePageCount });
        // this.pageCount.appendTo(pageCount);

        // let autoFieldLine: HTMLElement = createElement('div', { className: 'e-de-prop-header-line', styles: 'margin-top:7px;' });
        // autoFieldLabelDiv.appendChild(autoFieldLine);

        // tslint:disable-next-line:max-line-length
        let positionLabelDiv: HTMLElement = this.createDivTemplate(elementId + '_positionLabelDiv', this.element, 'padding-top:10px;padding-left: 10px;');
        let positionLabel: HTMLElement = createElement('label', { className: 'e-de-prop-label', styles: 'height:20px;' });
        positionLabel.innerHTML = 'Position';
        positionLabelDiv.appendChild(positionLabel);
        let positionDiv: HTMLElement = this.createDivTemplate(elementId + '_positionDiv', positionLabelDiv);
        // tslint:disable-next-line:max-line-length
        let headerTopDiv: HTMLElement = this.createDivTemplate(elementId + '_headerTopDiv', positionDiv, 'margin-right:8px;display:inline-flex;margin-bottom:8px;');
        let headerTopLabel: HTMLElement = createElement('label', { className: 'e-de-prop-sub-label', styles: 'width: 128px;margin-top: 10px;' });
        headerTopLabel.innerHTML = 'Header from Top';
        headerTopDiv.appendChild(headerTopLabel);
        // tslint:disable-next-line:max-line-length
        let headerFromTop: HTMLInputElement = createElement('input', { id: 'headerFromTop', className: 'e-de-prop-sub-label' }) as HTMLInputElement;
        headerTopDiv.appendChild(headerFromTop);
        // tslint:disable-next-line:max-line-length
        this.headerFromTop = new NumericTextBox({ value: 36, cssClass: 'e-de-prop-header-numeric', width: 85, showSpinButton: false, format: 'n0', decimals: 2, max: 1584, min: 0 });
        this.headerFromTop.appendTo(headerFromTop);
        // tslint:disable-next-line:max-line-length
        this.headerFromTop.element.parentElement.setAttribute('title', 'Distance from top of the page to top of the header.');
        // tslint:disable-next-line:max-line-length
        let footerBottomDiv: HTMLElement = this.createDivTemplate(elementId + '_footerBottomDiv', positionDiv, 'margin-right:8px;display:inline-flex;');
        // tslint:disable-next-line:max-line-length
        let footerBottomLabel: HTMLElement = createElement('label', { styles: 'width:128px;margin-top: 10px;', className: 'e-de-prop-sub-label' });
        footerBottomLabel.innerHTML = 'Footer from Bottom';
        footerBottomDiv.appendChild(footerBottomLabel);
        // tslint:disable-next-line:max-line-length
        let footerFromTop: HTMLInputElement = createElement('input', { id: 'footerFromTop', className: 'e-de-prop-sub-label' }) as HTMLInputElement;
        footerBottomDiv.appendChild(footerFromTop);
        // tslint:disable-next-line:max-line-length
        this.footerFromTop = new NumericTextBox({ value: 36, cssClass: 'e-de-prop-header-numeric', width: 85, showSpinButton: false, format: 'n0', decimals: 2, max: 1584, min: 0 });
        this.footerFromTop.appendTo(footerFromTop);
        // tslint:disable-next-line:max-line-length
        this.footerFromTop.element.parentElement.setAttribute('title', 'Distance from bottom of the page to bottom of the footer.');
        let positionLine: HTMLElement = createElement('div', { className: 'e-de-prop-header-line', styles: 'margin-top:10px;' });
        positionLabelDiv.appendChild(positionLine);
    }
    private createDivTemplate(id: string, parentDiv: HTMLElement, style?: string): HTMLElement {
        let divElement: HTMLElement;
        if (style) {
            divElement = createElement('div', { id: id, styles: style });
        } else {
            divElement = createElement('div', { id: id });
        }
        parentDiv.appendChild(divElement);
        return divElement;
    }
    private wireEvents = (): void => {
        this.headerFromTop.element.addEventListener('click', (): void => { this.isHeaderTopApply = true; });
        this.footerFromTop.element.addEventListener('click', (): void => { this.isFooterTopApply = true; });
        this.headerFromTop.element.addEventListener('keydown', this.onHeaderValue);
        this.footerFromTop.element.addEventListener('keydown', this.onFooterValue);
        this.headerFromTop.element.addEventListener('blur', (): void => { this.changeHeaderValue(); this.isHeaderTopApply = false; });
        this.footerFromTop.element.addEventListener('blur', (): void => { this.changeFooterValue(); this.isFooterTopApply = false; });
    }
    private onClose = (): void => {
        this.toolbar.showHeaderProperties = true;
        this.documentEditor.selection.closeHeaderFooter();
    }
    private changeFirstPageOptions = (): void => {
        if (!this.documentEditor.isReadOnly) {
            this.documentEditor.selection.sectionFormat.differentFirstPage = this.firstPage.checked;
            setTimeout((): void => { this.documentEditor.focusIn(); }, 10);
        }
    }
    private changeoddOrEvenOptions = (): void => {
        if (!this.documentEditor.isReadOnly) {
            this.documentEditor.selection.sectionFormat.differentOddAndEvenPages = this.oddOrEven.checked;
            setTimeout((): void => { this.documentEditor.focusIn(); }, 10);
        }
    }
    private changeHeaderValue = (): void => {
        if (!this.isHeaderTopApply) {
            return;
        }
        if (!this.documentEditor.isReadOnly) {
            let headerTop: number = this.headerFromTop.value;
            if (headerTop > this.headerFromTop.max) {
                headerTop = this.headerFromTop.max;
            }
            this.documentEditor.selection.sectionFormat.headerDistance = headerTop;
        }
    }
    private onHeaderValue = (e: KeyboardEventArgs): void => {
        if (e.keyCode === 13) {
            setTimeout((): void => { this.changeHeaderValue(); this.isHeaderTopApply = false; }, 30);
        }
    }
    private onFooterValue = (e: KeyboardEventArgs): void => {
        if (e.keyCode === 13) {
            setTimeout((): void => { this.changeFooterValue(); this.isFooterTopApply = false; }, 30);
        }
    }
    private changeFooterValue = (): void => {
        if (!this.isFooterTopApply) {
            return;
        }
        if (!this.documentEditor.isReadOnly) {
            let footerTop: number = this.footerFromTop.value;
            if (footerTop > this.footerFromTop.max) {
                footerTop = this.footerFromTop.max;
            }
            this.documentEditor.selection.sectionFormat.footerDistance = footerTop;
        }
    }
    public onSelectionChange(): void {
        if (this.documentEditor.selection.sectionFormat.differentFirstPage) {
            this.firstPage.checked = true;
        } else {
            this.firstPage.checked = false;
        }
        if (this.documentEditor.selection.sectionFormat.differentOddAndEvenPages) {
            this.oddOrEven.checked = true;
        } else {
            this.oddOrEven.checked = false;
        }
    }
}