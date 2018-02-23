import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

/**
 * Default SplitButton sample
 */
this.default = (): void => {
    let items: ItemModel[] = [
        {
            text: 'Paste',
            iconCss: 'e-btn-icons e-paste'
        },
        {
            text: 'Paste Special',
            iconCss: 'e-btn-icons e-paste-special'
        },
        {
            text: 'Paste as Formula',
            iconCss: 'e-btn-icons e-paste-formula'
        },
        {
            text: 'Paste as Hyperlink',
            iconCss: 'e-btn-icons e-paste-hyperlink'
        }
    ];
    let splitButton: SplitButton = new SplitButton({ items: items, iconCss: 'e-btn-icons e-paste' });
    splitButton.appendTo('#iconsplitbtn');

    splitButton = new SplitButton({ items: items, content: 'Paste' });
    splitButton.appendTo('#textsplitbtn');

    splitButton = new SplitButton({ items: items, content: 'Paste', iconCss: 'e-btn-icons e-paste' });
    splitButton.appendTo('#icontextsplitbtn');

    splitButton = new SplitButton({
        items: items,
        content: 'Paste',
        iconCss: 'e-btn-icons e-paste',
        beforeItemRender: (args: MenuEventArgs) => {
            if (args.item.text !== 'Paste') {
                args.element.classList.add('e-disabled');
            }
        }
    });
    splitButton.appendTo('#disabledsplitbtn');
};
