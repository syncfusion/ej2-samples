import { loadCultureFiles } from '../common/culture-loader';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Browser, getComponent } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


/**
 * Default image editor sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let imageEditorObj: ImageEditor = new ImageEditor({
        created: () => {
            if (Browser.isDevice) {
                imageEditorObj.open('src/image-editor/images/flower.png');
            } else {
                imageEditorObj.open('src/image-editor/images/bridge.png');
            }
            if (imageEditorObj.theme && window.location.href.split('#')[1]) {
                imageEditorObj.theme = window.location.href.split('#')[1].split('/')[1];
            }
        }
    });
    imageEditorObj.appendTo('#imageeditor');
};