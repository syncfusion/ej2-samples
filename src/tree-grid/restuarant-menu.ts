import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar } from '@syncfusion/ej2-treegrid';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { ChipList } from '@syncfusion/ej2-buttons';
import { AutoComplete, ChangeEventArgs as AutoCompleteChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
import { foodMenu } from './data-source';

TreeGrid.Inject(Toolbar);

interface FoodOrderDetail {
    foodName: string;
    price: number;
    count: number;
}

interface FoodMenuItem {
    FoodId: number;
    CategoryId?: number;
    FoodName: string;
    FoodCategory: string;
    FoodType: string;
    newPrice: number;
    originalPrice: number;
    Image: string;
    Rating: number;
    TotalReviews: number;
    FoodDescription: string;
    IsBestseller: boolean;
    vegCount: number;
    nonvegCount: number;
    ingredients: string[];
}

declare global {
    interface Window {
        chiptags: (ingredients: string[]) => string;
        iterateFoodCount: (vegCount: number, nonvegCount: number) => number;
    }
}

// Constants
const DELIVERY_FEE = 3.6;
const GST_RATE = 0.12;

// State Variables
let foodorderDetails: FoodOrderDetail[] = [];
let cartCount = 0;

// Utility Functions
const updateCartBadge = (): void => {
    const cartBadge = document.querySelector('.e-cart-badge');
    if (cartBadge) cartBadge.textContent = cartCount.toString();
};

const resetNumericBoxes = (): void => {
    const numericBoxes = document.querySelectorAll('.resmenu-food-count.e-numerictextbox');
    numericBoxes.forEach(box => {
        const instance = (box as any).ej2_instances?.[0];
        if (instance) instance.value = 0;
    });
};

// Main Function
(window as any).default = (): void => {
    loadCultureFiles();

    const treegridObj: TreeGrid = new TreeGrid({
        dataSource: foodMenu,
        idMapping: 'FoodId',
        parentIdMapping: 'CategoryId',
        treeColumnIndex: 0,
        rowTemplate: '#rowTemplate',
        allowKeyboard:false,
        toolbar: [
            {
                template: `
                    <div style="display:flex;align-items:center;cursor:auto;">
                        <img src="src/tree-grid/images/male.png" alt="avatar" style="width:40px;height:40px;border-radius:50%;margin-right:14px;">
                        <div>
                            <div style="font-size:20px;font-weight:600;line-height:1.2;">Hi, <span style="color:#ff9800;font-weight:700;">Susan</span></div>
                            <div style="font-size:13px;color:#888;line-height:1.2;">Morrisville, USA</div>
                        </div>
                    </div>
                    `,
                align: 'Left',
                id: 'customerDetails'
            },
            {
                
                template: `
                    <div class="e-btn-group e-custom-button">
                        <button id="CartUpdate" class="e-btn">
                            VIEW CART
                            <span id="cartbadge" class="e-cart-badge e-badge e-badge-primary e-badge-notification e-badge-overlap">0</span>
                        </button>
                    </div>
                `,
                id: 'cartButton',
                align: 'Right',
            }
        ],
        height: 400,
        columns: [
            { field: 'FoodName', headerText: 'Explore Our Menu', width: 150 }
        ],
        dataBound: function (args: any) {
            this.grid.emptyRecordTemplate = "#emptytemplate";
        },
        rowDataBound: (args: any) => {
            const { CategoryId, FoodName } = args.data;
            if (CategoryId) {
                const foodItem = foodorderDetails.find(item => item.foodName?.toLowerCase() === FoodName?.toLowerCase());

                new NumericTextBox({
                    value: foodItem?.count || 0,
                    min: 0,
                    max: 10,
                    step: 1,
                    format: 'N',
                    width: '110px',
                    change: foodCountChangeFn
                }).appendTo(args.row.querySelector('.resmenu-food-count'));
            }
        }
    });
    treegridObj.appendTo('#TreeGrid');

    window.chiptags = (ingredients: string[]): string => {
        const chipElement = document.createElement('div');
        const chipList = new ChipList({ chips: ingredients, cssClass: 'e-outline' }, chipElement);
        chipElement.id = "ingredientsList";
        return chipList.element.outerHTML;
    };

    function foodCountChangeFn(args: ChangeEventArgs): void {
        
        if (!args.event || !args.event.srcElement) return;

        const currentRow = (args.event.srcElement as HTMLElement).closest("tr") as HTMLElement;
        const foodName = currentRow.querySelector(".resmenu-foodname")?.textContent || '';
        const price = parseFloat(currentRow.querySelector(".resmenu-price")?.textContent?.replace(/[^0-9.]/g, "") || '0');
        const count = args.value as number;

        const prev = (args.previousValue as number) || 0;
        const diff = count - prev;
        cartCount += diff;
        updateCartBadge();
        
        const existingFood = foodorderDetails.find(item => item.foodName === foodName);
        if (existingFood) {
            existingFood.count = count;
            existingFood.price = price;
        } else {
            foodorderDetails.push({ foodName, price, count });
        }
    }

    const dishNames = Array.from(new Set(foodMenu.map((item: FoodMenuItem) => item.FoodName)));
    const autoComplete = new AutoComplete({
        dataSource: dishNames,
        placeholder: 'Search for dishes',
        width: 800,
        highlight: true,
        filterType: 'Contains',
        change: (args: AutoCompleteChangeEventArgs) => {
            const value = typeof args.value === 'string' ? args.value.toLowerCase() : '';
            var searchedData = foodMenu.filter((item: FoodMenuItem) =>
                item.FoodName.toLowerCase().includes(value) ||
                item.FoodCategory.toLowerCase().includes(value) ||
                !item.CategoryId
            );
            searchedData.forEach((parent: FoodMenuItem) => {
                if (!parent.CategoryId) {
                    const childItems = searchedData.filter((item: FoodMenuItem) => item.CategoryId === parent.FoodId);
                    parent.vegCount = childItems.filter((item: FoodMenuItem) => item.FoodType === 'Veg').length;
                    parent.nonvegCount = childItems.filter((item: FoodMenuItem) => item.FoodType === 'Non-veg').length;
                }
            });
            searchedData = searchedData.filter(function (item) {
                var foodcount = item.vegCount + item.nonvegCount;
                return (foodcount === 0 && item.CategoryId) || (foodcount > 0 && !item.CategoryId);
            });
            treegridObj.dataSource = searchedData;
        }
    });
    autoComplete.appendTo('#search-autocomplete');

    window.iterateFoodCount = (vegCount: number, nonvegCount: number): number => {
        return (vegCount > 0 ? vegCount : 0) + (nonvegCount > 0 ? nonvegCount : 0);
    };

    function getCartTableHtml(cartItems: FoodOrderDetail[]): string {
        if (!cartItems.length) {
            return '<div style="padding:20px;text-align:center;">No items in cart.</div>';
        }

        const rows = cartItems.filter(i => i.count > 0).map(item => `
            <tr>
                <td>${item.foodName}</td>
                <td>$${item.price}</td>
                <td style="text-align:center;">${item.count}</td>
                <td style="text-align:right;">$${(item.price * item.count).toFixed(2)}</td>
            </tr>
        `).join('');

        const total = Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.count), 0));
        const gst = Math.round(total * GST_RATE * 100) / 100;
        const toPay = Math.round((total + DELIVERY_FEE + gst) * 100) / 100;

        return `
         <div class="sample-order">
            <div  class="resmenu-order-no"><span > Order No: </span>${Math.floor(Math.random() * (99 - 10 + 1)) + 100}</div>
            <div  ><span class="resmenu-order-date">Date: </span>${new Date().toLocaleDateString()}</div>
        </div>
            <div id="dialog-container">
                <div style="max-height:220px;overflow-y:auto;margin-bottom:12px;">
                    <table style="width:100%;border-collapse:collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e0e0e0;">
                                <th style="text-align:left;">Dish</th>
                                <th style="text-align:left;">Price</th>
                                <th style="text-align:center;">Qty</th>
                                <th style="text-align:right;">Total</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
                <div style="border-top:2px solid #eee;padding-top:12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                        <span>Item Total</span><span>$${total}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                        <span>Delivery Fee</span><span>$${DELIVERY_FEE}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                        <span>TAX & Other Charges</span><span>$${gst}</span>
                    </div>
                    <div style="border-top:2px solid #beb5b5;display:flex;justify-content:space-between;font-weight:bold;font-size:18px;margin-top:10px;">
                        <span>TO PAY</span><span>$${toPay}</span>
                    </div>
                </div>
                <div class="resmenu-thank-note">
                <div >Thank you for your order!</div>
                </div>
            </div>
        `;
    }

    const cartDialog = new Dialog({
        header: 'Bill Summary',
        content: '',
        visible: false,
        width: '400px',
        showCloseIcon: true,
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        buttons: [
            {
                click: () => clearCart(),
                buttonModel: { content: 'Cancel', cssClass: 'e-danger' }
            },
            {
                click: () => printCartDialogContent(),
                buttonModel: { content: 'Print', isPrimary: true }
            }
        ],
        target: '#TreeGrid',
        beforeOpen: function (args: any) {
            var itemsInCart = foodorderDetails.filter(function (item) { return item.count > 0; });
             if (itemsInCart.length < 4) {
                args.maxHeight = '500px';
            }
            else {
                args.maxHeight = '600px';
            }
            if (itemsInCart.length === 0) {
                cartDialog.buttons[1].buttonModel.disabled = true;
                cartDialog.refresh();
            }
            else {
                cartDialog.buttons[1].buttonModel.disabled = false;
                cartDialog.refresh();
            }
        }
    });

    function clearCart(): void {
        foodorderDetails.forEach(item => item.count = 0);
        cartCount = 0;
        updateCartBadge();
        resetNumericBoxes();
        cartDialog.content = getCartTableHtml([]);
        cartDialog.hide();
    }

    function printCartDialogContent(): void {
        const itemsInCart = foodorderDetails.filter(item => item.count > 0);
        if (!itemsInCart.length) {
            alert('There is no item selected.');
            return;
        }
        var treeGridElement = document.getElementById('TreeGrid');
        var rect = treeGridElement.getBoundingClientRect();
        var windowWidth = 400;
        var windowHeight = 600;
        var leftPosition = rect.left + window.scrollX + (rect.width / 2) - (windowWidth / 2);
        var topPosition = rect.top + window.scrollY + (rect.height / 2) - (windowHeight / 2);
        var printContents = document.querySelector('#cartDialog .e-dlg-content')?.innerHTML || '';
        var printWindow = window.open('', '', `height=${windowHeight},width=${windowWidth},left=${leftPosition},top=${topPosition}`);
        printWindow?.document.write('<html><head><title>Cart Details</title>');
        printWindow?.document.write('<style>body{font-family:sans-serif;} ul{margin-bottom:16px;} div{margin-bottom:4px;}</style>');
        printWindow?.document.write('</head><body>');
        printWindow?.document.write(printContents);
        printWindow?.document.write('</body></html>');
        printWindow?.focus();
        printWindow?.addEventListener('afterprint', function (args) {
         printWindow?.close();
         clearCart();
        });
        printWindow?.print();
    }

    cartDialog.appendTo('#cartDialog');

    document.getElementById('CartUpdate')?.addEventListener('click', () => {
        const itemsInCart = foodorderDetails.filter(item => item.count > 0);
        cartDialog.content = getCartTableHtml(itemsInCart);
        cartDialog.show();
    });
};