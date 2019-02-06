import { loadCultureFiles } from '../common/culture-loader';
import { ChipList } from '@syncfusion/ej2-buttons';
import { DropDownList, ChangeEventArgs as ddlChange } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
/**
 * Api Chip sample
 */

let colorCss: string = '';
let outlineCss: string = '';
let chip: ChipList;

(window as any).default = (): void => {
    loadCultureFiles();
    // initalizing chips
    chip = new ChipList({}, '#chip');

    // initalizing drop-down list
    let colorObj: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: colorHandler
    });
    colorObj.appendTo('#chip-color');

    // initalizing checkbox
    let leadingIconObj: CheckBox = new CheckBox({
        checked: false,
        change: iconHandler
    });
    leadingIconObj.appendTo('#chip-leadingicon');

    // initalizing drop-down list
    let avatarObj: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: avatarHandler
    });
    avatarObj.appendTo('#chip-avatar');

    // initalizing checkbox
    let trailingIconObj: CheckBox = new CheckBox({
        checked: false,
        change: deleteIconHandler
    });
    trailingIconObj.appendTo('#chip-trailingicon');

    // initalizing checkbox
    let variantObj: CheckBox = new CheckBox({
        checked: false,
        change: variantHandler
    });
    variantObj.appendTo('#chip-outline');

};

// drop-down list change handler for chip color
function colorHandler(e: ddlChange): void {
    chip.cssClass = `e-${e.value} ${outlineCss.trim()}`;
    colorCss = `e-${e.value}`;
}

// checkbox change handler for chip leading icon
function iconHandler(e: ChangeEventArgs): void {
    chip.leadingIconCss = e.checked ? 'janet' : '';
}

// drop-down list change handler for chip avatar
function avatarHandler(e: ddlChange): void {
    chip.avatarIconCss = (e.value === 'icon') ? 'e-icon' : (e.value === 'image') ? 'janet' : '';
    chip.avatarText = (e.value === 'letter' ? 'JL' : '');
}

// checkbox change handler for chip trailing icon
function deleteIconHandler(e: ChangeEventArgs): void {
    chip.trailingIconCss = e.checked ? 'e-dlt-btn' : '';
}

// checkbox change handler for chip outline
function variantHandler(e: ChangeEventArgs): void {
    outlineCss = e.checked ? 'e-outline' : '';
    chip.cssClass = `${colorCss} ${outlineCss}`;
}
