import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default button sample
 */
this.default = (): void => {
    let button: Button = new Button();
    button.appendTo('#normalbtn');

    button = new Button({ isPrimary: true });
    button.appendTo('#primarybtn');

    button = new Button({ cssClass: 'e-flat' });
    button.appendTo('#flatbtn');

    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#outlinebtn');

    button = new Button({ iconCss: 'e-icons e-add-icon', cssClass: 'e-small e-round', isPrimary: true });
    button.appendTo('#roundbtn');

    let togglebtn: Button = new Button({ iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isToggle: true });
    togglebtn.appendTo('#togglebtn');

    button = new Button({ iconCss: 'e-icons e-open-icon', cssClass: 'e-flat', iconPosition: 'right' });
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


    document.getElementById('togglebtn').onclick = (): void => {
        if (document.getElementById('togglebtn').classList.contains('e-active')) {
            togglebtn.content = 'Pause';
            togglebtn.iconCss = 'e-icons e-pause-icon';
        } else {
            togglebtn.content = 'Play';
            togglebtn.iconCss = 'e-icons e-play-icon';
        }
    };
};
