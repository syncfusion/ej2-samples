import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Resize, Sort, Filter, Edit, Toolbar, Column, ColumnChooser } from '@syncfusion/ej2-grids';
import { stackedHeaderData } from './data-source';
import { TreeView } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2/buttons';
import { Rating } from '@syncfusion/ej2/inputs';

Grid.Inject(Page, Selection, Resize, Sort, Filter, Edit, Toolbar, ColumnChooser);
/**
 * Stacked header Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treeObj: TreeView;
    let treeData: any = [];

    const renderCustomColumnChooser = (targetLHTMLElement: HTMLElement, columns: Column[]) => {
        const parentNodes = [
            { id: 1, name: 'Order Details', hasChild: true, expanded: true },
            { id: 2, name: 'Shipping Details', hasChild: true, expanded: true },
            { id: 3, name: 'Delivery Status', hasChild: true, expanded: true },
        ];
        if (columns && columns.length) {
            treeData = columns.map((column) => {
                let parentId;
                switch (column.field) {
                    case 'OrderID':
                    case 'OrderDate':
                        parentId = 1;
                        break;
                    case 'ShipCountry':
                    case 'Freight':
                        parentId = 2;
                        break;
                    case 'Status':
                    case 'Feedback':
                        parentId = 3;
                        break;
                    default :
                        break;
                }
                return {
                    id: column.uid,
                    name: column.headerText,
                    pid: parentId,
                    isChecked: column.visible
                };
            });
            const uniquePids: string[] = [];
            treeData.forEach((item: any) => {
                if (uniquePids.indexOf(item.pid) === -1) {
                    uniquePids.push(item.pid);
                }
            });
            const filteredParents = parentNodes.filter((parent: any) => uniquePids.indexOf(parent.id) !== -1);
            treeData.push(...filteredParents);
        } else {
        treeData = [];
        }
        treeObj = new TreeView({
            fields: { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
            showCheckBox: true,        
            nodeClicked: nodeCheck,
            keyPress: nodeCheck,
            enableRtl: grid.enableRtl ? true : false,
            cssClass: "no-border"
        });
        if (columns && columns.length) {
          treeObj.appendTo(targetLHTMLElement);
        } else {
          const noRecordDiv: HTMLElement = document.createElement('div');
          noRecordDiv.innerHTML = 'No Matches Found';
          noRecordDiv.className = 'no-record-text';
          targetLHTMLElement.appendChild(noRecordDiv);
        }
    };

    (<{ feedbackDetail?: Function }>window).feedbackDetail = (e: any): any => {
      let temp: HTMLTemplateElement = document.getElementsByTagName('template')[0];
      var cloneTemplate: any = temp.content.cloneNode(true);
      let feedbackElement: HTMLElement = cloneTemplate.querySelector('.feedback');
      const rating: Rating = new Rating({
      value: e.Feedback,
      readOnly: true,
      cssClass: 'custom-rating',
      });
      rating.appendTo(feedbackElement);
      return (feedbackElement as any).ej2_instances[0].wrapper.outerHTML;
    };

    let grid: Grid = new Grid(
        {
            dataSource: stackedHeaderData,
            showColumnChooser: true,
            allowPaging: true,
            allowResizing: true,
            pageSettings: { pageCount: 5 },
            allowSorting: true,
            allowMultiSorting:true,
            allowFiltering: true,
            enableHover: false,
            clipMode: 'EllipsisWithTooltip',
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'],        
            columnChooserSettings: { 
                headerTemplate: '#ccHeadertemplate',
                template: '#column-chooser-template', 
                footerTemplate: '#ccFootertemplate', 
                renderCustomColumnChooser : renderCustomColumnChooser,
                enableSearching: true,
            },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                {
                  field: 'CustomerID',
                  headerText: 'Customer ID',
                  textAlign: 'Right',
                  width: 160,
                  minWidth: 100,
                  isPrimaryKey: true,
                  showInColumnChooser: false,
                  validationRules: { required: true, number: true }
                },
                {
                  field: 'CustomerName',
                  headerText: 'Name',
                  width: 100,
                  minWidth: 100,
                },
                {
                  headerText: 'Order Details',
                  textAlign: 'Center',
                  columns: [
                    {
                      field: 'OrderID',
                      headerText: 'ID',
                      textAlign: 'Right',
                      width: 90,
                      minWidth: 90,
                    },
                    {
                      field: 'OrderDate',
                      headerText: 'Date',
                      width: 110,
                      minWidth: 100,
                      textAlign: 'Right',
                      format: 'yMd',
                      editType: 'datepickeredit',
                    },
                  ],
                },
                {
                  headerText: 'Shipping Details',
                  textAlign: 'Center',
                  columns: [
                    {
                      field: 'ShipCountry',
                      headerText: 'Country',
                      textAlign: 'Left',
                      width: 115,
                      minWidth: 100,
                      editType: 'dropdownedit', 
                      validationRules: { required: true },
                      template: '#locationTemplate'
                    },
                    {
                      field: 'Freight',
                      headerText: 'Charges',
                      textAlign: 'Right',
                      width: 130,
                      minWidth: 100,
                      editType: 'numericedit',
                      format: 'C2',
                      validationRules: { required: true, number: true }
                    },
                  ],
                },
                {
                  headerText: 'Delivery Status',
                  textAlign: 'Center',
                  columns: [
                    {
                      field: 'Status',
                      headerText: 'Status',
                      textAlign: 'Center',
                      width: 110,
                      minWidth: 100,
                      editType: 'dropdownedit', 
                      validationRules: { required: true, },
                    },
                    {
                      field: 'Feedback',
                      headerText: 'Feedback',
                      textAlign: 'Center',
                      width: 130,
                      minWidth: 100,
                      editType: 'numericedit',
                      allowResizing: false,
                      validationRules: { required: true, min: 0, max: 5 },
                      template: '#feedbackTemplate',
                    },
                  ],
                },
            ],
            queryCellInfo: queryCellInfo,
            created: onCreated
        });
    grid.appendTo('#Grid');

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

    function queryCellInfo(args: any) {
      if (args.column.field === 'Status') {
          if (args.data['Status'] === 'Delivered') {
              args.cell.classList.remove('e-inprogress');
              args.cell.classList.add('e-delivered');
          } else {
              args.cell.classList.remove('e-delivered');
              args.cell.classList.add('e-inprogress');
            }
        }
    }

    function onCreated() {
      let submitButton = new Button();
      submitButton.appendTo('#submitButton');
      if(document.getElementById('submitButton')){
          (document.getElementById('submitButton') as any).onclick = () => {
              columnChooserSubmit();
          };
      }
  
      let abortButton = new Button();
      abortButton.appendTo('#abortButton');
      if(document.getElementById('abortButton')){
          (document.getElementById('abortButton') as any).onclick = () => {
              (grid.columnChooserModule as any).hideDialog();
          };    
      }
    }
    onCreated();

    function columnChooserSubmit() {
    const checkedElements: string[] = [];
    const uncheckedElements: string[] = [];
    let showColumns: any = grid.getVisibleColumns().filter(function (column) { return (column.showInColumnChooser === true); });
    showColumns = showColumns.map(function (col: any) { return col.headerText; });
    const treeItems = document.querySelectorAll('.e-list-item');

    treeItems.forEach(item => {
        const itemDetails: any = treeObj.getNode(item);
        if (!itemDetails.hasChildren) {
            if (item.getAttribute('aria-checked') === 'true') {
            checkedElements.push(itemDetails.text);
        } else {
            uncheckedElements.push(itemDetails.text);
        }
        }
    });
    showColumns = showColumns.filter((col: any) => uncheckedElements.indexOf(col) === -1);
    checkedElements.forEach(item => {
        if (!showColumns.includes(item)) {
            showColumns.push(item);
        }
    });

    var columnsToUpdate = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
    grid.columnChooserModule.changeColumnVisibility(columnsToUpdate);
    }
};
