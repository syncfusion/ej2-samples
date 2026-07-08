import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Toolbar, Edit, Page, Sort, Filter, Aggregate } from '@syncfusion/ej2-grids';
import { inventoryStoreData } from './data-source';

/**
 * Batch Editing sample
 */
Grid.Inject(Edit, Toolbar, Page, Sort, Filter, Aggregate);

(window as any).default = (): void => {
    loadCultureFiles();

    (<{ categoryDetail?: Function }>window).categoryDetail = (e: any): any => {
        const div = document.createElement('div');
        const product = document.createElement('div');
        product.style.fontWeight = '600';
        product.style.fontSize = '14px';
        product.textContent = e.Product;
        const badge = document.createElement('span');
        const category = (e.Category || getCategoryFromProduct(e.Product) || '').toString();
        badge.className = 'e-category-badge';
        if (category === 'IT Asset') {
            badge.className += ' e-cat-it-asset';
        } else if (category === 'IT Infrastructure') {
            badge.className += ' e-cat-it-infrastructure';
        } else if (category === 'Admin') {
            badge.className += ' e-cat-admin';
        } else if (category === 'Security') {
            badge.className += ' e-cat-security';
        } else if (category === 'Facilities') {
            badge.className += ' e-cat-facilities';
        } else if (category === 'Finance') {
            badge.className += ' e-cat-finance';
        } else if (category === 'Sales') {
            badge.className += ' e-cat-sales';
        } else if (category === 'Marketing') {
            badge.className += ' e-cat-marketing';
        } else if (category === 'Training') {
            badge.className += ' e-cat-training';
        } else {
            badge.className += ' e-cat-default';
        }
        badge.style.marginTop = '6px';
        badge.textContent = category;
        div.appendChild(product);
        div.appendChild(badge);
        return div.outerHTML;
    };

    function getCategoryFromProduct(productName: string): string {
        var item = inventoryStoreData.find((data) => data.Product === productName);
        return item ? item.Category : '';
    };

    function beforeBatchSave(this: any, args: any) {
        var changes = this.getBatchChanges();
        changes.addedRecords.forEach((row: any) => {
            row.Category = getCategoryFromProduct(row.Product);
        });
    };

    function cellEdit(args: any) {
        if (args.type === 'edit' && args.columnName === 'Product') {
            args.cancel = true;
        }
    };


    let grid: Grid = new Grid(
        {
            dataSource: inventoryStoreData,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', enableUndoRedo: true },
            allowPaging: true,
            pageSettings: { pageCount: 5 },
            toolbar: ['Add', 'Delete', 'Update', 'Cancel', 'Undo', 'Redo'],
            selectionSettings: { mode: 'Cell', type: 'Multiple' },
            allowSorting: true,
            allowFiltering: true,
            height: 400,
            filterSettings: { type: 'CheckBox' },
            cellEdit: cellEdit,
            beforeBatchSave: beforeBatchSave,
            clipMode: 'EllipsisWithTooltip',
            aggregates: [
                {
                    columns: [
                        {
                            type: 'Sum',
                            field: 'VendorA',
                            format: 'N',
                            footerTemplate: 'Total: ${Sum}',
                        },
                        {
                            type: 'Sum',
                            field: 'VendorB',
                            format: 'N',
                            footerTemplate: 'Total: ${Sum}',
                        },
                        {
                            type: 'Sum',
                            field: 'VendorC',
                            format: 'N',
                            footerTemplate: 'Total: ${Sum}',
                        },
                        {
                            type: 'Sum',
                            field: 'VendorD',
                            format: 'N',
                            footerTemplate: 'Total: ${Sum}',
                        },
                    ],
                },
            ],
            columns: [
                {
                    field: 'ID', headerText: 'ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true }
                },
                {
                    field: 'Product', headerText: 'Product Name', width: 180, template: '#categoryDetail', editType: 'dropdownedit', defaultValue: 'MacBook Pro'
                },
                {
                    field: 'VendorA', headerText: 'Vendor A (units)', width: 160, textAlign: 'Right', editType: 'numericedit', edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'VendorB', headerText: 'Vendor B (units)', width: 160, textAlign: 'Right', editType: 'numericedit', edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'VendorC', headerText: 'Vendor C (units)', width: 160, textAlign: 'Right', editType: 'numericedit', edit: { params: { showSpinButton: false } }
                },
                {
                    field: 'VendorD', headerText: 'Vendor D (units)', width: 160, textAlign: 'Right', editType: 'numericedit', edit: { params: { showSpinButton: false } }
                },
                { field: 'UnitPrice', headerText: 'Price (per unit)', width: 160, textAlign: 'Right', format: 'C2', editType: 'numericedit', edit: { params: { showSpinButton: false } }, validationRules: { required: true, min: 1 } }
            ],
        });
    grid.appendTo('#BatchEdit');

};