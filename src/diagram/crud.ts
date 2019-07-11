import { loadCultureFiles } from '../common/culture-loader';
/**
 * Databinding- Crud
 */
import {
    Diagram, ConnectorModel,
    Node,
    DataBinding,
    HierarchicalTree,
    randomId,
    NodeModel,
    Connector,
    ISelectionChangeEventArgs,
    IEndChangeEventArgs,
    NodeConstraints
} from '@syncfusion/ej2-diagrams';
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

Diagram.Inject(DataBinding, HierarchicalTree);

let diagram: Diagram;
let dialog: Dialog;
let toolbarObj: Toolbar;
let sourceDropdown: DropDownList;
let targetDropdown: DropDownList;
let sourceID: string;
let targetID: string;

let nodeData: { [key: string]: Object }[] = [];

//Add icons in Toolbar.
let items: ItemModel[] = [
    {
        text: 'Add',
        tooltipText: 'Add',
        prefixIcon: 'e-ddb-icons e-add',
        id: 'Add'
    },
    {
        type: 'Separator'
    },
    {
        text: 'Edit',
        tooltipText: 'Edit',
        prefixIcon: 'e-ddb-icons e-update',
        id: 'Edit'
    },
    {
        type: 'Separator'
    },
    {
        text: 'Delete',
        tooltipText: 'Delete',
        prefixIcon: 'e-ddb-icons e-delete',
        id: 'Delete'
    }
];

// custom code start
function dlgButtonClick(evt: Event): void {
    let dialogHeader: string | HTMLElement = dialog.header;
    let description: string = (document.getElementById('Description') as HTMLInputElement).value;
    let color: string = (document.getElementById('Color') as HTMLInputElement).value;
    let selectedItem: NodeModel | ConnectorModel;
    if (diagram.selectedItems.nodes.length > 0) {
        selectedItem = diagram.selectedItems.nodes[0];
    }
    if (diagram.selectedItems.connectors.length > 0) {
        selectedItem = diagram.selectedItems.connectors[0];
    }
    //Add new node and connector in diagram at runtime.
    if (dialogHeader === 'Add') {
        let node: NodeModel | DataInfo = {
            id: 'node' + randomId(),
            style: { fill: color },
            Description: description,
            Color: color,
            Id: Math.floor(Math.random() * 1000 + 100)
        };
        let connector: ConnectorModel | DataInfo = {
            id: 'connector' + randomId(),
            sourceID: selectedItem.id,
            targetID: (node as Node).id,
            Id: Math.floor(Math.random() * 1000 + 100)
        };
        diagram.add(node as NodeModel);
        diagram.add(connector as ConnectorModel);
        diagram.doLayout();
        //Insert newly added elements into the database.
        diagram.insertData();
        nodeData.push({ Name: (node as Node).id, Label: description });
        sourceDropdown.dataSource = getDataSource();
        sourceDropdown.dataBind();
        targetDropdown.dataSource = getDataSource();
        targetDropdown.dataBind();
    } else {
        if (selectedItem instanceof Connector) {
            //Update sourceNode and targetNode at runtime.
            selectedItem.sourceID = sourceID ? sourceID : selectedItem.sourceID;
            selectedItem.targetID = targetID ? targetID : selectedItem.targetID;
            diagram.dataBind();
            diagram.doLayout();
        } else {
            //update an node text and node bgColor.
            (selectedItem as DataInfo).Description = description;
            (selectedItem as DataInfo).Color = color;
            selectedItem.annotations[0].content = description;
            selectedItem.style.fill = color;
            diagram.dataBind();
        }
        diagram.updateData();
    }
    dialog.hide();
}

//Displays nodes name in dropdown.
function sourceDropdownCreate(args: Event): void {
    sourceDropdown.dataSource = getDataSource();
    sourceDropdown.dataBind();
}

//Displays nodes name in dropdown.
function targetDropdownCreate(args: Event): void {
    targetDropdown.dataSource = getDataSource();
    targetDropdown.dataBind();
}

//Set an sourceId of an selected Connector.
function sourceDropdownChange(args: ChangeEventArgs): void {
    sourceID = args.value as string;
}

//Set an targetId of an selected Connector.
function targetDropdownChange(args: ChangeEventArgs): void {
    targetID = args.value as string;
}
// custom code end
//Disable or Enable the toolbar items based on element selection.
function selectionChange(args: ISelectionChangeEventArgs): void {
    if (args.state === 'Changing') {
        if (args.newValue.length > 0) {
            if (args.newValue[0] instanceof Node) {
                enableToolbarItems(true);
            } else {
                toolbarObj.enableItems(document.getElementById(items[0].id).parentElement, false);
                toolbarObj.enableItems(document.getElementById(items[2].id).parentElement, true);
                toolbarObj.enableItems(document.getElementById(items[4].id).parentElement, false);
            }
        } else {
            enableToolbarItems(false);
        }
    }
}
// custom code start
//Enable or disable the toolbar items.
function enableToolbarItems(isEnableItem: boolean): void {
    toolbarObj.enableItems(document.getElementById(items[0].id).parentElement, isEnableItem);
    toolbarObj.enableItems(document.getElementById(items[2].id).parentElement, isEnableItem);
    toolbarObj.enableItems(document.getElementById(items[4].id).parentElement, isEnableItem);
}
// custom code end
function connectionChange(args: IEndChangeEventArgs): void {
    if (args.state === 'Completed') {
        if (!args.connector.targetID || !args.connector.sourceID) {
            args.cancel = true;
        }
    }
}

//Set an label for each node.
function setNodeTemplate(obj: NodeModel): void {
    obj.annotations = [{ style: { color: 'black' } }];
    obj.annotations[0].content = (obj as DataInfo).Description;
    obj.style = { fill: (obj as DataInfo).Color };
    if ((obj as DataInfo).Id === 1) {
        //Restrict Delete Constraints for root node.
        obj.constraints = NodeConstraints.Default & ~NodeConstraints.Delete;
    }
}
// custom code start
//Opens a dialog with textbox and dropdown control based on toolbar clicked items.
function toolbarClick(args: ClickEventArgs): void {
    let selectedItem: NodeModel | ConnectorModel;
    if (diagram.selectedItems.nodes.length > 0) {
        selectedItem = diagram.selectedItems.nodes[0];
    }
    if (diagram.selectedItems.connectors.length > 0) {
        selectedItem = diagram.selectedItems.connectors[0];
    }
    if (selectedItem) {
        switch (args.item.tooltipText) {
            case 'Add':
                openDialog('Add', '', '', true);
                break;
            case 'Edit':
                if (selectedItem instanceof Connector) {
                    let sourceNode: NodeModel = diagram.getObject(selectedItem.sourceID);
                    let targetNode: NodeModel = diagram.getObject(selectedItem.targetID);
                    openDialog('Edit', (sourceNode as DataInfo).Description, (targetNode as DataInfo).Description, false);
                } else {
                    openDialog('Edit', (selectedItem as DataInfo).Description, (selectedItem as DataInfo).Color, true);
                }
                break;
            case 'Delete':
                diagram.remove(selectedItem);
                diagram.doLayout();
                //Delete an selected items from database.
                diagram.removeData();
                let element: object = { Name: selectedItem.id, Label: (selectedItem as DataInfo).Description };
                let index: number = nodeData.indexOf(element as { [key: string]: Object });
                nodeData.splice(index, 1);
        }
    }
}

//Show or Hide the Textbox and Dropdown in dialog control
function hideClassElement(className: string, display: string): void {
    let i: number;
    let showDropdown: NodeListOf<HTMLElement> = document.querySelectorAll(className);
    for (i = 0; i < showDropdown.length; i++) {
        showDropdown[i].style.display = display;
    }
}

function openDialog(title: string, description: string, color: string, isNode: boolean): void {
    dialog.header = title;
    if (isNode) {
        hideClassElement('.showDropdown', 'none');
        hideClassElement('.showLabel', 'block');
        (document.getElementById('Description') as HTMLInputElement).value = description;
        (document.getElementById('Color') as HTMLInputElement).value = color;
    } else {
        hideClassElement('.showDropdown', 'block');
        hideClassElement('.showLabel', 'none');
        (document.getElementById('SourceId') as HTMLInputElement).value = description;
        (document.getElementById('TargetId') as HTMLInputElement).value = color;
    }
    //Open a dialog
    dialog.show();
}
// custom code end
//Returns an node text collection in diagram.
function getDataSource(): { [key: string]: Object }[] {
    let i: number;
    nodeData = [];
    for (i = 0; i < diagram.nodes.length; i++) {
        let node: NodeModel = diagram.nodes[i];
        let element: object = { Name: node.id, Label: (node as DataInfo).Description };
        nodeData.push(element as { [key: string]: Object });
    }
    return nodeData;
}

interface DataInfo {
    Description: string;
    Color: string;
    Id: number;
}


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    diagram = new Diagram({
        width: '100%',
        height: 600,
        dataSourceSettings: {
            id: 'Name',
            //Define URL to perform CRUD operations with nodes records in database.
            crudAction: {
                read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetNodes',
                create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddNodes',
                update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateNodes',
                destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteNodes',
                customFields: ['Id', 'Description', 'Color']
            },
            connectionDataSource: {
                id: 'Name',
                sourceID: 'SourceNode',
                targetID: 'TargetNode',
                //Define URL to perform CRUD operations with connector records in database.
                crudAction: {
                    read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetConnectors',
                    create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddConnectors',
                    update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateConnectors',
                    destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteConnectors',
                    customFields: ['Id']
                }
            }
        },
        layout: { type: 'HierarchicalTree', verticalSpacing: 40 },
        snapSettings: { constraints: 0 },
        //Set node default properties.
        getNodeDefaults: (obj: Node): Node => {
            obj.width = 100;
            obj.height = 50;
            obj.shape = { type: 'Basic', shape: 'Rectangle' };
            obj.style = { strokeWidth: 1, strokeColor: '#DDDDDD' };
            return obj;
        },
        //Set connector default properties.
        getConnectorDefaults: (connector: ConnectorModel): ConnectorModel => {
            connector.type = 'Orthogonal';
            connector.style.fill = '#707070';
            connector.style.strokeColor = '#707070';
            connector.targetDecorator = {
                style: {
                    strokeColor: '#707070',
                    fill: '#707070'
                },
            };
            return connector;
        },
        selectionChange: selectionChange,
        sourcePointChange: connectionChange,
        targetPointChange: connectionChange,
        setNodeTemplate: setNodeTemplate
    });

    diagram.appendTo('#diagram');

    //Initialize ToolBar control.
    toolbarObj = new Toolbar({
        clicked: toolbarClick,
        items: items
    });
    toolbarObj.appendTo('#toolbar');
    enableToolbarItems(false);

    //Initialize dialog control.
    dialog = new Dialog({
        width: '300px',
        visible: false,
        isModal: true,
        showCloseIcon: true,
        buttons: [
            {
                click: dlgButtonClick,
                buttonModel: { content: 'Update', isPrimary: true }
            }
        ]
    });
    dialog.appendTo('#editDialog');

    //Initialize textbox control.
    let inputobj1: TextBox = new TextBox({
        floatLabelType: 'Always',
        placeholder: 'Description'
    });
    inputobj1.appendTo('#Description');

    //Initialize textbox control.
    let inputobj2: TextBox = new TextBox({
        floatLabelType: 'Always',
        placeholder: 'Color'
    });
    inputobj2.appendTo('#Color');

    //Initialize button control to update the node label and node color.
    let button: Button = new Button();
    button.appendTo('#btnUpdate');

    //Initialize dropdownlist control to display an sourceNodes in diagram.
    sourceDropdown = new DropDownList({
        fields: { text: 'Label', value: 'Name' },
        change: sourceDropdownChange,
        created: sourceDropdownCreate
    });
    sourceDropdown.appendTo('#SourceId');

    //Initialize dropdownlist control to display an targetNodes in diagram.
    targetDropdown = new DropDownList({
        fields: { text: 'Label', value: 'Name' },
        change: targetDropdownChange,
        created: targetDropdownCreate
    });
    targetDropdown.appendTo('#TargetId');
};

