import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar, Edit, Page } from '@syncfusion/ej2-treegrid';
import { retailInventoryData } from './data-source';

TreeGrid.Inject(Edit, Toolbar, Page);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: retailInventoryData,
            height: 500,
            idMapping: 'productId',
            parentIdMapping: 'parentId',
            treeColumnIndex: 1,
            allowPaging: true,
            toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
            editSettings: {
                allowEditing: true,
                allowAdding: true,
                allowDeleting: true,
                mode: 'Cell',
            },
            columns: [
                {
                    field: 'productId',
                    headerText: 'Product ID',
                    isPrimaryKey: true,
                    textAlign: 'Right',
                    width: 100,
                    validationRules: { required: true }
                },
                { field: 'productName', headerText: 'Product Name', width: 120, validationRules: { required: true } },
                { field: 'supplier', headerText: 'Supplier', width: 120, validationRules: { required: true } },
                {
                    field: 'stockQty',
                    headerText: 'Stock Quantity',
                    textAlign: 'Right',
                    width: 70,
                    validationRules: { number: true }
                },

                {
                    field: 'unitPrice',
                    headerText: 'Unit Price (₹)',
                    textAlign: 'Right',
                    width: 70,
                    validationRules: { number: true }
                },
                {
                    field: 'status',
                    headerText: 'Status',
                    width: 120,
                    template: '#statusTemplate',
                    editType: 'dropdownedit',
                    validationRules: { required: true }
                },
            ]
        });
    grid.appendTo('#TreeGrid');
};

