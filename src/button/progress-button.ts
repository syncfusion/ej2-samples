import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

/**
 * Default progress button sample
 */
this.default = (): void => {
    let progressButton: ProgressButton = new ProgressButton({
        content: 'Spin Left', isPrimary: true
    });
    progressButton.appendTo('#spinleft');

    progressButton = new ProgressButton({
        content: 'Spin Right', spinSettings: { position: 'Right' }, isPrimary: true
    });
    progressButton.appendTo('#spinright');

    progressButton = new ProgressButton({
        content: 'Spin Top', spinSettings: { position: 'Top' }, isPrimary: true
    });
    progressButton.appendTo('#spintop');

    progressButton = new ProgressButton({
        content: 'Spin Bottom', spinSettings: { position: 'Bottom' }, isPrimary: true
    });
    progressButton.appendTo('#spinbottom');

    progressButton = new ProgressButton({
        animationSettings: { effect: 'ZoomOut' }, cssClass: 'e-round e-small e-success',
        iconCss: 'e-icons e-play-icon', spinSettings: { position: 'Center' }
    });
    progressButton.appendTo('#roundbtn');

    let contractProgressButton: ProgressButton = new ProgressButton({
        content: 'Contract', enableProgress: true, cssClass: 'e-success e-small',
        begin: () => {
            contractProgressButton.element.classList.add('e-round');
        },
        end: () => {
            contractProgressButton.element.classList.remove('e-round');
        }
    });
    contractProgressButton.appendTo('#contract');

    progressButton = new ProgressButton({
        content: 'Slide Left', enableProgress: true, animationSettings: { effect: 'SlideLeft' },
        spinSettings: { position: 'Center' }, cssClass: 'e-flat e-success'
    });
    progressButton.appendTo('#slideleftflat');

    progressButton = new ProgressButton({
        content: 'Slide Right', enableProgress: true, animationSettings: { effect: 'SlideRight' },
        spinSettings: { position: 'Center' }, cssClass: 'e-outline e-success'
    });
    progressButton.appendTo('#sliderightoutline');

    progressButton = new ProgressButton({
        content: 'Zoom In', enableProgress: true, animationSettings: { effect: 'ZoomIn' },
        spinSettings: { position: 'Center' }, cssClass: 'e-round-corner e-danger'
    });
    progressButton.appendTo('#zoomin');

    progressButton = new ProgressButton({
        content: 'Zoom Out', enableProgress: true, animationSettings: { effect: 'ZoomOut' },
        spinSettings: { position: 'Center' }, cssClass: 'e-small e-danger'
    });
    progressButton.appendTo('#zoomout');

    let downloadButton: ProgressButton = new ProgressButton({
        content: 'Download', duration: 4000, enableProgress: true,
        cssClass: 'e-hide-spinner e-progress-top', iconCss: 'e-icons e-download-icon'
    });
    downloadButton.appendTo('#download');

    progressButton = new ProgressButton({ content: 'Disabled', disabled: true });
    progressButton.appendTo('#disabled');
};