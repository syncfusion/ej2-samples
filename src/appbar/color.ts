import { loadCultureFiles } from '../common/culture-loader';
import { AppBar, Menu, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

(window as any).default = (): void => {
    loadCultureFiles();

    const productDropDownButtonItems: ItemModel[] = [
        { text: 'Developer' },
        { text: 'Analytics' },
        { text: 'Reporting' },
        { text: 'E-Signature' },
        { text: 'Help Desk' }
    ];

    const companyDropDownButtonItems: ItemModel[] = [
        { text: 'About Us' },
        { text: 'Customers' },
        { text: 'Blog' },
        { text: 'Careers' }
    ];

    const verticalMenuItems: MenuItemModel[] = [
        {
            iconCss: 'e-icons e-more-vertical-1',
            items: [
                { text: 'Home' },
                {
                    text: 'Products',
                    items: [
                        { text: 'Developer' },
                        { text: 'Analytics' },
                        { text: 'Reporting' },
                        { text: 'E-Signature' },
                        { text: 'Help Desk' }
                    ]
                },
                {
                    text: 'Company',
                    items: [
                        { text: 'About Us' },
                        { text: 'Customers' },
                        { text: 'Blog' },
                        { text: 'Careers' }
                    ]
                },
                { text: 'Login' }
            ]
        }
    ];

    const lightAppBarObj: AppBar = new AppBar({
        colorMode: 'Light'
    });
    lightAppBarObj.appendTo('#lightAppBar');

    const lightButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    lightButtonMenuObj.appendTo('#lightButtonMenu');

    lightButtonMenuObj.element.setAttribute("aria-label", "menu");

    const lightButtonHomeObj: Button = new Button({ cssClass: 'e-inherit home e-appbar-menu', content: 'Home' });
    lightButtonHomeObj.appendTo('#lightButtonHome');

    const lightProductDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-light e-appbar-menu', items: productDropDownButtonItems });
    lightProductDropDownButtonObj.appendTo('#lightProductDropDownButton');

    const lightCompanyDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-light e-appbar-menu', items: companyDropDownButtonItems });
    lightCompanyDropDownButtonObj.appendTo('#lightCompanyDropDownButton');

    const lightButtonLoginObj: Button = new Button({ isPrimary: true, cssClass: 'login', content: 'Login' });
    lightButtonLoginObj.appendTo('#lightButtonLogin');

    const lightVerticalMenuObj: Menu = new Menu({ cssClass: 'e-inherit e-light e-appbar-icon-menu', items: verticalMenuItems, beforeItemRender: itemRender });
    lightVerticalMenuObj.appendTo('#lightVerticalMenu');

    const darkAppBarObj: AppBar = new AppBar({
        colorMode: 'Dark'
    });
    darkAppBarObj.appendTo('#darkAppBar');

    const darkButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    darkButtonMenuObj.appendTo('#darkButtonMenu');

    darkButtonMenuObj.element.setAttribute("aria-label", "menu");

    const darkButtonHomeObj: Button = new Button({ cssClass: 'e-inherit home e-appbar-menu', content: 'Home' });
    darkButtonHomeObj.appendTo('#darkButtonHome');

    const darkProductDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-dark e-appbar-menu', items: productDropDownButtonItems });
    darkProductDropDownButtonObj.appendTo('#darkProductDropDownButton');

    const darkCompanyDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-dark e-appbar-menu', items: companyDropDownButtonItems });
    darkCompanyDropDownButtonObj.appendTo('#darkCompanyDropDownButton');

    const darkButtonLoginObj: Button = new Button({ cssClass: 'e-inherit login', content: 'Login' });
    darkButtonLoginObj.appendTo('#darkButtonLogin');

    const darkVerticalMenuObj: Menu = new Menu({ cssClass: 'e-inherit e-dark e-appbar-icon-menu', items: verticalMenuItems, beforeItemRender: itemRender });
    darkVerticalMenuObj.appendTo('#darkVerticalMenu');

    const primaryAppBarObj: AppBar = new AppBar({
        colorMode: 'Primary'
    });
    primaryAppBarObj.appendTo('#primaryAppBar');

    const primaryButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    primaryButtonMenuObj.appendTo('#primaryButtonMenu');

    primaryButtonMenuObj.element.setAttribute("aria-label", "menu");

    const primaryButtonHomeObj: Button = new Button({ cssClass: 'e-inherit home e-appbar-menu', content: 'Home' });
    primaryButtonHomeObj.appendTo('#primaryButtonHome');

    const primaryProductDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-primary e-appbar-menu', items: productDropDownButtonItems });
    primaryProductDropDownButtonObj.appendTo('#primaryProductDropDownButton');

    const primaryCompanyDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-primary e-appbar-menu', items: companyDropDownButtonItems });
    primaryCompanyDropDownButtonObj.appendTo('#primaryCompanyDropDownButton');

    const primaryButtonLoginObj: Button = new Button({ cssClass: 'e-inherit login', content: 'Login' });
    primaryButtonLoginObj.appendTo('#primaryButtonLogin');

    const primaryVerticalMenuObj: Menu = new Menu({ cssClass: 'e-inherit e-primary e-appbar-icon-menu', items: verticalMenuItems, beforeItemRender: itemRender });
    primaryVerticalMenuObj.appendTo('#primaryVerticalMenu');

    const inheritAppBarObj: AppBar = new AppBar({
        colorMode: 'Inherit'
    });
    inheritAppBarObj.appendTo('#inheritAppBar');

    const inheritButtonMenuObj: Button = new Button({ cssClass: 'e-inherit menu', iconCss: 'e-icons e-menu' });
    inheritButtonMenuObj.appendTo('#inheritButtonMenu');

    inheritButtonMenuObj.element.setAttribute("aria-label", "menu");

    const inheritButtonHomeObj: Button = new Button({ cssClass: 'e-inherit home e-appbar-menu', content: 'Home' });
    inheritButtonHomeObj.appendTo('#inheritButtonHome');

    const inheritProductDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-appbar-menu', items: productDropDownButtonItems });
    inheritProductDropDownButtonObj.appendTo('#inheritProductDropDownButton');

    const inheritCompanyDropDownButtonObj: DropDownButton = new DropDownButton({ cssClass: 'e-inherit e-appbar-menu', items: companyDropDownButtonItems });
    inheritCompanyDropDownButtonObj.appendTo('#inheritCompanyDropDownButton');

    const inheritButtonLoginObj: Button = new Button({ isPrimary: true, cssClass: 'login', content: 'Login' });
    inheritButtonLoginObj.appendTo('#inheritButtonLogin');

    const inheritVerticalMenuObj: Menu = new Menu({ cssClass: 'e-inherit e-appbar-icon-menu', items: verticalMenuItems, beforeItemRender: itemRender });
    inheritVerticalMenuObj.appendTo('#inheritVerticalMenu');

    const inputElement = document.querySelectorAll('.color-appbar-section .e-input-group .e-input');

    for (let i = 0; i < inputElement.length; i++) {
        inputElement[i].addEventListener("focus", function () {
            let parentElement = this.parentNode;
            if (parentElement.classList.contains('e-input-in-wrap')) {
                parentElement.parentNode.classList.add('e-input-focus');
            } else {
                this.parentNode.classList.add('e-input-focus');
            }
        });
        inputElement[i].addEventListener("blur", function () {
            let parentElement = this.parentNode;
            if (parentElement.classList.contains('e-input-in-wrap')) {
                parentElement.parentNode.classList.remove('e-input-focus');
            } else {
                this.parentNode.classList.remove('e-input-focus');
            }
        });
    }
    function itemRender(args: MenuEventArgs): void {
        if (args.element.children.length > 0 && args.element.children[0].classList.contains("e-more-vertical-1")) {
            args.element.setAttribute('aria-label', 'more vertical');
        }
    }
};