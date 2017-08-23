/**
 * DropDownList Filtering Sample
 */
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { Browser, EmitType } from '@syncfusion/ej2-base';

this.default = () => {
    let objectData1: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    let targetElement: HTMLElement;
    let popupElement: HTMLElement;
    let spinnerElement: HTMLElement;
    let onFiltering: EmitType<FilteringEventArgs> = debounce(
        (e: FilteringEventArgs) => {
            let query: Query = new Query().select(['ContactName', 'CustomerID']);
            query = (e.text !== '') ? query.where('ContactName', 'startswith', e.text, true) : query;
            e.updateData(objectData1, query);
        },
        200);
    let dropDownListObj: DropDownList = new DropDownList({
        placeholder: 'Select a customer',
        filterBarPlaceholder: 'Search',
        dataSource: objectData1,
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        fields: { text: 'ContactName', value: 'CustomerID' },
        popupHeight: '250px',
        allowFiltering: true,
        filtering: onFiltering,
        actionBegin: () => {
            popupElement = <HTMLElement>document.getElementById('list_popup');
            if (Browser.isDevice && document.getElementById('list_popup')) {
                if (!spinnerElement) {
                    spinnerElement = <HTMLElement>document.createElement('span');
                    spinnerElement.classList.add('e-spinner-icon');
                    popupElement.appendChild(spinnerElement);
                }
            } else {
                let element: HTMLElement = <HTMLElement>document.querySelector('.control-section').querySelector('.e-input-group-icon');
                targetElement = popupElement ? <HTMLElement>popupElement.querySelector('.e-clear-icon') : element;
                if (targetElement) {
                    if (!popupElement) {
                        targetElement.classList.remove('e-ddl-icon', 'e-search-icon');
                    }
                    targetElement.classList.add('e-spinner-icon');
                }
            }
        },
        actionComplete: () => {
            removeIcon();
        },
        actionFailure: () => {
            removeIcon();
        }
    });
    dropDownListObj.appendTo('#list');

    function removeIcon(): void {
        if (Browser.isDevice && popupElement && spinnerElement) {
            spinnerElement.remove();
            spinnerElement = null;
        } else if (targetElement) {
            targetElement.classList.remove('e-spinner-icon');
            if (!popupElement) {
                targetElement.classList.add('e-ddl-icon', 'e-search-icon');
            }
        }
        if (!targetElement) {
            let element: Element = document.getElementsByClassName('e-spinner-icon')[0];
            if (element) {
                element.classList.remove('e-spinner-icon');
            }
        }
    }

    function debounce(func: Function, wait: number): EmitType<FilteringEventArgs> {
        let timeout: number;
        let isTypedFirst: boolean = false;
        /* tslint:disable */
        return function () {
            /* tslint:enable */
            let context: object = this;
            let args: IArguments = arguments;
            let later: Function = () => {
                timeout = null;
                if (!isTypedFirst) { func.apply(context, args); }
            };
            let callNow: boolean = !isTypedFirst && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                isTypedFirst = true;
                func.apply(context, args);
            } else {
                isTypedFirst = false;
            }
        };
    }
};