import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

/**
 * Default DropDownButton sample
 */
(window as any).default = (): void => {
    let items: ItemModel[] = [
        {
            text: 'Dashboard',
            iconCss: 'e-ddb-icons e-dashboard'
        },
        {
            text: 'Notifications',
            iconCss: 'e-ddb-icons e-notifications',
        },
        {
            text: 'User Settings',
            iconCss: 'e-ddb-icons e-settings',
        },
        {
            text: 'Log Out',
            iconCss: 'e-ddb-icons e-logout'
        }];

    let btnObj: DropDownButton = new DropDownButton({ items: items, iconCss: 'e-ddb-icons e-profile' });
    btnObj.appendTo('#iconbtn');

    btnObj = new DropDownButton({ items: items });
    btnObj.appendTo('#textbtn');

    btnObj = new DropDownButton({ items: items, iconCss: 'e-ddb-icons e-profile' });
    btnObj.appendTo('#icontextbtn');

    btnObj = new DropDownButton({items: items, cssClass: 'e-caret-hide'});
    btnObj.appendTo('#custombtn');
};
