import { Toolbar, Menu, MenuItemModel, MenuModel } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';

/**
 * Menu - toolbar integration sample
 */
/* tslint:disable */
(window as any).default = () => {
    let menuTemplate: string = '<ul id="menu"></ul>';
    let searchTemplate: string = '<div class="e-input-group"><input class="e-input" type="text" placeholder="Search" /><span class="em-icons e-search"></span></div>';
    let dropDownBtnTemplate: string = '<button id="userDBtn">Andrew</button>';

    //Initialize Toolbar component
    let toolbarObj: Toolbar = new Toolbar({
        created: create,
        items: [
            { template: menuTemplate },
            { template: searchTemplate, align: 'Right' },
            { template: dropDownBtnTemplate, align: 'Right' },
            { prefixIcon: 'em-icons e-shopping-cart', align: 'Right' }
        ]
    });

    //Render initialized Toolbar component
    toolbarObj.appendTo('#shoppingtoolbar');

    function create(): void {
        //Menu items definition 
        let menuItems: MenuItemModel[] = [
            {
                text: 'Appliances',
                items: [
                    {
                        text: 'Kitchen',
                        items: [
                            { text: 'Electric Cookers' },
                            { text: 'Coffee Makers' },
                            { text: 'Blenders' }
                        ]
                    },
                    {
                        text: 'Washing Machine',
                        items: [
                            { text: 'Fully Automatic' },
                            { text: 'Semi Automatic' }
                        ]
                    },
                    {
                        text: 'Air Conditioners',
                        items: [
                            { text: 'Inverter ACs' },
                            { text: 'Split ACs' },
                            { text: 'Window ACs' }
                        ]
                    }
                ]
            },
            {
                text: 'Accessories',
                items: [
                    {
                        text: 'Mobile',
                        items: [
                            { text: 'Headphones' },
                            { text: 'Memory Cards' },
                            { text: 'Power Banks' }
                        ]
                    },
                    {
                        text: 'Computer',
                        items: [
                            { text: 'Pendrives' },
                            { text: 'External Hard Disks' },
                            { text: 'Monitors' }
                        ]
                    }
                ]
            },
            {
                text: 'Fashion',
                items: [
                    {
                        text: 'Men',
                        items: [
                            { text: 'Shirts' },
                            { text: 'Jackets' },
                            { text: 'Track Suits' }
                        ]
                    },
                    {
                        text: 'Women',
                        items: [
                            { text: 'Kurtas' },
                            { text: 'Salwars' },
                            { text: 'Sarees' }
                        ]
                    }
                ]
            },
            {
                text: 'Home & Living',
                items: [
                    {
                        text: 'Furniture',
                        items: [
                            { text: 'Beds' },
                            { text: 'Mattresses' },
                            { text: 'Dining Tables' }
                        ]
                    },
                    {
                        text: 'Decor',
                        items: [
                            { text: 'Clocks' },
                            { text: 'Wall Decals' },
                            { text: 'Paintings' }
                        ]
                    }
                ]
            }
        ];

        let userData: { [key: string]: Object }[] = [
            { text: 'My Profile' },
            { text: 'Orders' },
            { text: 'Rewards' },
            { text: 'Logout' }
        ];

        //Menu model definition 
        let menuOptions: MenuModel = {
            items: menuItems,
            animationSettings: { effect: 'None' }
        };

        //Initialize Menu component
        let menuObj: Menu = new Menu(menuOptions, '#menu');

        //Initialize DropDownButton component
        let btnObj: DropDownButton = new DropDownButton({ items: userData });
        btnObj.appendTo('#userDBtn');

        this.refreshOverflow();
    }

};
/* tslint:enable */
