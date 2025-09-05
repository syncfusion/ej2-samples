import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, ColumnChooser, Toolbar } from '@syncfusion/ej2-treegrid';
import { stackedData } from './data-source';
import { TreeView } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';


TreeGrid.Inject(Page, ColumnChooser, Toolbar);
/**
 * Stacked header Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    var treeObj: TreeView;

    // Render TreeView in the column chooser's Content
    function renderCustomColumnChooser(targetLHTMLElement: any, columns: any) {
        var parentNodes = [
            { id: 1, name: 'Order Details', hasChild: true, expanded: true },
            { id: 2, name: 'Shipment Details', hasChild: true, expanded: true },
            { id: 3, name: 'Price Details', hasChild: true, expanded: true },
        ];
        if (columns && columns.length) {
            var treeData = columns.map(function (column: any) {
                var parentId;
                switch (column.field) {
                    case 'orderName':
                    case 'orderDate':
                        parentId = 1;
                        break;
                    case 'shipMentCategory':
                    case 'shippedDate':
                    case 'units':
                        parentId = 2;
                        break;
                    case 'unitPrice':
                    case 'price':
                        parentId = 3;
                        break;
                    default:
                        break;
                }
                return {
                    id: column.uid,
                    name: column.headerText,
                    pid: parentId,
                    isChecked: column.visible
                };
            });
            var uniquePids: any = [];
            treeData.forEach(function (item: any) {
                if (uniquePids.indexOf(item.pid) === -1) {
                    uniquePids.push(item.pid);
                }
            });
            const filteredParents = parentNodes.filter(function (parent) { return uniquePids.indexOf(parent.id) !== -1 });
            treeData = treeData.concat(filteredParents);
        } else {
            treeData = [];
        }
        treeObj = new TreeView({
            fields: { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
            showCheckBox: true,
            nodeClicked: nodeCheck,
            keyPress: nodeCheck,
            enableRtl: treegrid.enableRtl ? true : false,
            cssClass: "no-border",
        });
        if (columns && columns.length) {
            treeObj.appendTo(targetLHTMLElement);
        } else {
            // To show text when entered mismatched column name or invalid text
            var noRecordDiv = document.createElement('div');
            noRecordDiv.innerHTML = 'No Matches Found';
            noRecordDiv.className = 'no-record-text';
            targetLHTMLElement.appendChild(noRecordDiv);
        }
    };
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: stackedData,
            allowPaging: true,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            clipMode: 'EllipsisWithTooltip',
            pageSettings: { pageCount: 5 },
            showColumnChooser: true,
            toolbar: ['ColumnChooser'],
            columnChooserSettings: {
                headerTemplate: '#columnchooser-headertemplate',
                footerTemplate: '#columnchooser-footertemplate',
                enableSearching: true,
                template: '#column-chooser-template',
                renderCustomColumnChooser: renderCustomColumnChooser,
                ignoreAccent: true, operator: 'startsWith'
            },
            columns: [
                {
                    headerText: 'Order Details', textAlign: 'Center', columns: [
                        { field: 'orderID', headerText: 'Order ID', textAlign: 'Right', width: 90, showInColumnChooser: false },
                        { field: 'orderName', headerText: 'Order Name', textAlign: 'Left', width: 190 },
                        { field: 'orderDate', headerText: 'Order Date', textAlign: 'Right', width: 110, format: 'yMd' },
                    ]
                },
                {
                    headerText: 'Shipment Details', textAlign: 'Center', columns: [
                        { field: 'shipMentCategory', headerText: 'Shipment Category', textAlign: 'Left', width: 150 },
                        { field: 'shippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 120, format: 'yMd' },
                        { field: 'units', headerText: 'Units', textAlign: 'Right', width: 80 },
                    ]
                },
                {
                    headerText: 'Price Details', textAlign: 'Center', columns: [
                        { field: 'unitPrice', headerText: 'Price per unit', format: 'c0', type: 'number', width: 120, textAlign: 'Right' },
                        { field: 'price', headerText: 'Total Price', width: 115, format: 'c', type: 'number', textAlign: 'Right' }
                    ]
                }
            ],
            created: onCreated
        });
    treegrid.appendTo('#TreeGrid');

    // Handle checking/unchecking nodes in the TreeView (column chooser)
    function nodeCheck(args: any) {
        let checkedNode = [args.node];
        if (args.event.target.classList.contains('e-fullrow') || args.event.key == "Enter") {
            let getNodeDetails = treeObj.getNode(args.node);
            if (getNodeDetails.isChecked == 'true') {
                treeObj.uncheckAll(checkedNode);
            } else {
                treeObj.checkAll(checkedNode);
            }
        }
    }

    function onCreated() {
        let submitButton = new Button();
        submitButton.appendTo('#submitButton');
        if (document.getElementById('submitButton')) {
            (document.getElementById('submitButton')).onclick = () => {
                columnChooserSubmit();
            };
        }
        let abortButton = new Button();
        abortButton.appendTo('#abortButton');
        if (document.getElementById('abortButton')) {
            (document.getElementById('abortButton')).onclick = function () {
                (treegrid.grid.columnChooserModule as any).hideDialog();
            };
        }
    }

    // Apply the column chooser selection
    function columnChooserSubmit() {
        const checkedElements: any = [];
        const uncheckedElements: any = [];
        let showColumns: any = treegrid.getVisibleColumns().filter(function (column) { return (column.showInColumnChooser === true); });
        showColumns = showColumns.map(function (col: any) { return col.headerText; });
        const treeItems = document.querySelectorAll('.e-list-item');

        treeItems.forEach(function (item) {
            const itemDetails: any = treeObj.getNode(item);
            if (!itemDetails.hasChildren) {
                if (item.getAttribute('aria-checked') === 'true') {
                    checkedElements.push(itemDetails.text);
                } else {
                    uncheckedElements.push(itemDetails.text);
                }
            }
        });

        showColumns = showColumns.filter(function (col: any) { uncheckedElements.indexOf(col) === -1 });
        checkedElements.forEach((item: any) => {
            if (!showColumns.includes(item)) {
                showColumns.push(item);
            }
        });
        var columnsToUpdate = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
        treegrid.grid.columnChooserModule.changeColumnVisibility(columnsToUpdate);
    }
};