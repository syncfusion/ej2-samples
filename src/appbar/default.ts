import { loadCultureFiles } from '../common/culture-loader';
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();
    const defaultAppBarObj: AppBar = new AppBar({
        colorMode: 'Primary'
    });
    defaultAppBarObj.appendTo('#defaultAppBar');

    let defaultButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    defaultButtonMenuObj.appendTo('#defaultButtonMenu');

    defaultButtonMenuObj.element.setAttribute("aria-label", "menu");

    let defaultButtonLoginObj: Button = new Button({ cssClass: 'e-inherit login', content: 'FREE TRIAL' });
    defaultButtonLoginObj.appendTo('#defaultButtonLogin');

    const prominentAppBarObj: AppBar = new AppBar({
        cssClass: 'prominent-appbar',
        colorMode: 'Primary',
        mode: 'Prominent'
    });
    prominentAppBarObj.appendTo('#prominentAppBar');

    let prominentButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    prominentButtonMenuObj.appendTo('#prominentButtonMenu');

    prominentButtonMenuObj.element.setAttribute("aria-label", "menu");

    let prominentButtonLoginObj: Button = new Button({ cssClass: 'e-inherit login', content: 'FREE TRIAL' });
    prominentButtonLoginObj.appendTo('#prominentButtonLogin');

    const denseAppBarObj: AppBar = new AppBar({
        colorMode: 'Primary',
        mode: 'Dense'
    });
    denseAppBarObj.appendTo('#denseAppBar');

    let denseButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    denseButtonMenuObj.appendTo('#denseButtonMenu');

    denseButtonMenuObj.element.setAttribute("aria-label", "menu");

    let denseButtonLoginObj: Button = new Button({ cssClass: 'e-inherit login', content: 'FREE TRIAL' });
    denseButtonLoginObj.appendTo('#denseButtonLogin');
};