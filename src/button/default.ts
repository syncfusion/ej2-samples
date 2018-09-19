import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default button sample
 */
this.default = (): void => {
    let button: Button = new Button();
    button.appendTo('#normalbtn');

    button = new Button({ isPrimary: true });
    button.appendTo('#primarybtn');

    button = new Button({ cssClass: 'e-flat e-primary' });
    button.appendTo('#flatbtn');

    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#outlinebtn');

    button = new Button({ iconCss: 'e-icons e-add-icon', cssClass: 'e-small e-round', isPrimary: true });
    button.appendTo('#roundbtn');

    let toggleBtn: Button = new Button({ iconCss: 'e-icons e-play-icon', cssClass: 'e-flat e-primary', isToggle: true });
    toggleBtn.appendTo('#togglebtn');

    button = new Button({ iconCss: 'e-icons e-open-icon', cssClass: 'e-flat e-primary', iconPosition: 'Right' });
    button.appendTo('#openiconbtn');

    button = new Button({ cssClass: 'e-success' });
    button.appendTo('#successbtn');

    button = new Button({ cssClass: 'e-info' });
    button.appendTo('#infobtn');

    button = new Button({ cssClass: 'e-warning' });
    button.appendTo('#warningbtn');

    button = new Button({ cssClass: 'e-danger' });
    button.appendTo('#dangerbtn');

    button = new Button({ cssClass: 'e-small' });
    button.appendTo('#smallbtn');

    //Toggle button click event handler
    toggleBtn.element.onclick = (): void => {
        if (toggleBtn.element.classList.contains('e-active')) {
            toggleBtn.content = 'Pause';
            toggleBtn.iconCss = 'e-icons e-pause-icon';
        } else {
            toggleBtn.content = 'Play';
            toggleBtn.iconCss = 'e-icons e-play-icon';
        }
    };
};
