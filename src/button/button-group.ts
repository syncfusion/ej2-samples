import { rippleEffect } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

/**
 *  Sample for basic ButtonGroup.
 */

this.default = () => {
    let buttonElement: Button = new Button({iconCss: 'e-icons e-btngrp-watch'});
    buttonElement.appendTo('#watch');

    buttonElement = new Button({iconCss: 'e-icons e-btngrp-star'});
    buttonElement.appendTo('#star');

    buttonElement = new Button({iconCss: 'e-icons e-btngrp-download'});
    buttonElement.appendTo('#download');

    // To enable ripple in checkbox/radio type ButtonGroup.
    let buttons: NodeListOf<Element> = document.querySelectorAll('label.e-btn');
    let button: HTMLElement;
    for (let i: number = 0; i < buttons.length; i++) {
        button = buttons.item(i) as HTMLElement;
        rippleEffect(button, { selector: '.e-btn' });
    }
};
