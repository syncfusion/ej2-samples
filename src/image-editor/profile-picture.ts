import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Dialog } from '@syncfusion/ej2-popups';
import { getComponent, createElement } from '@syncfusion/ej2-base';
import { loadCultureFiles } from '../common/culture-loader';

/**
 * Profile picture sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    const img: HTMLImageElement = document.querySelector('#custom-img');

    img.onload = function() {
        const canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        canvas.width = img.width < img.height ? img.width : img.height; canvas.height = canvas.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    const dialogObj: Dialog = new Dialog({
        header: 'Edit Profile Image',
        animationSettings: { effect: 'None' },
        showCloseIcon: true,
        target: '.control-section',
        width: '340px',
		height: '400px',
		position: {X: 'center', Y: 'center'},
        visible: false,
        close: () => {
            const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
            imageEditor.destroy();
            document.getElementById('image-editor').className = '';
        },
        open: () => {
            new ImageEditor({
                fileOpened: () => {
                    const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
                    imageEditor.select('circle');
                },
                created: () => {
                    const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
                    if (imageEditor.theme && window.location.href.split('#')[1]) {
                        imageEditor.theme = window.location.href.split('#')[1].split('/')[1];
                    }
                },
                toolbar: []
            }, '#image-editor');
        },
        buttons: [
        {
            click: () => {
                document.getElementById('img-upload').click();
            },
            buttonModel: { content: 'Open', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-open' }
        },
        {
            click: () => {
                const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
                imageEditor.reset();
            },
            buttonModel: { content: 'Reset', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-reset' }
        },
        {
            click: () => {
                const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
                imageEditor.rotate(-90);
            },
            buttonModel: { content: 'Rotate', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-rotate' }
        },
        {
            click: () => {
                const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
                imageEditor.crop();
                const croppedData: ImageData = imageEditor.getImageData();
                const canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
                const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
                const parentDiv: HTMLElement = document.querySelector('.e-profile');
                const tempCanvas: HTMLCanvasElement = parentDiv.appendChild(createElement('canvas') as HTMLCanvasElement);
                const tempContext: CanvasRenderingContext2D = tempCanvas.getContext('2d');
                tempCanvas.width = croppedData.width; tempCanvas.height = croppedData.height;
                tempContext.putImageData(croppedData, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
                tempCanvas.remove();
                parentDiv.style.borderRadius = '100%'; canvas.style.backgroundColor = '#fff';
                dialogObj.hide();
            },
            buttonModel: { content: 'Apply', isPrimary: true, cssClass: 'e-custom-img-btn e-img-custom-apply' }
        }]
    });

    dialogObj.appendTo('#profile-dialog');

    document.getElementById('custom-edit').onclick = (): void => {
        dialogObj.show();
        const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor') as ImageEditor;
        const canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
        imageEditor.open(canvas.toDataURL());
    };

    document.getElementById('img-upload').onchange = (args: any): void => {
        const URL = window.URL; const url = URL.createObjectURL((args.target as any).files[0]);
        const imageEditor: ImageEditor = getComponent(document.getElementById('image-editor'), 'image-editor');
        imageEditor.open(url.toString());
        (document.getElementById('img-upload') as HTMLInputElement).value = null;
    };
	
    var imageHide = document.getElementsByClassName('sb-desktop-wrapper')[0] as HTMLElement;
    if (imageHide) {
        (document.getElementsByClassName('sb-desktop-wrapper')[0] as HTMLElement).onclick = function (args) {
            const target: HTMLElement = args.target as HTMLElement;
            if (target.className.indexOf('e-img-editor-sample') > -1 || target.className.indexOf('sb-content') > -1) {
                dialogObj.hide();
            }
        };
    }
	
}

