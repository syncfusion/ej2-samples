import { loadCultureFiles } from '../common/culture-loader';
import {
    Diagram,
    ConnectorModel,
    NodeModel,
    Overview,
    SnapConstraints,
    Container,
    TextElement,
    StackPanel,
    ImageElement,
    DataBinding,
    HierarchicalTree,
    TreeInfo,
    DiagramTools,
    ZoomOptions,
    ISelectionChangeEventArgs
  } from '@syncfusion/ej2-diagrams';
  import { DataManager } from '@syncfusion/ej2-data';
  import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
  import * as Data from './overview-data.json';

Diagram.Inject(DataBinding, HierarchicalTree);

let diagram: Diagram
let toolbarObj: Toolbar
// Sets the default values of Nodes.
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.height = 50;
    obj.style = { fill: 'transparent', strokeWidth: 2 };
    return obj;
}
// Sets the default values of connectors.
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.style.strokeColor = 'gray';
    return connector;
}

function selectionChange(args:ISelectionChangeEventArgs){
  if (args.state === 'Changed') {
    let selectedItems:any = diagram.selectedItems.nodes;
    if (selectedItems.length === 0) {
      toolbarObj.items[9].disabled = true;
      toolbarObj.items[10].disabled = true;
    }
    if (selectedItems.length === 1) {
      toolbarObj.items[9].disabled = false;
      toolbarObj.items[10].disabled = false;
    }
    if (selectedItems.length > 1) {
      toolbarObj.items[9].disabled = false;
      toolbarObj.items[10].disabled = false;
    }
  }
}

// Funtion to add the Template of the Node.
function setNodeTemplate(obj: NodeModel): Container {
    let content: StackPanel = new StackPanel();
    content.id = obj.id + '_outerstack';
    content.orientation = 'Horizontal';
    content.style.strokeColor = 'gray';
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

    let image: ImageElement = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.style.strokeColor = 'none';
    image.source = (obj.data as EmployeeInfo).ImageUrl;
    image.id = obj.id + '_pic';

    let innerStack: StackPanel = new StackPanel();
    innerStack.style.strokeColor = 'none';
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + '_innerstack';

    let text: TextElement = new TextElement();
    text.content = (obj.data as EmployeeInfo).Name;
    text.style.color = 'black';
    text.style.bold = true;
    text.style.strokeColor = 'none';
    text.horizontalAlignment = 'Left';
    text.style.fill = 'none';
    text.id = obj.id + '_text1';

    let desigText: TextElement = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = (obj.data as EmployeeInfo).Designation;
    desigText.style.color = 'black';
    desigText.style.strokeColor = 'none';
    desigText.style.fontSize = 12;
    desigText.style.fill = 'none';
    desigText.horizontalAlignment = 'Left';
    desigText.style.textWrapping = 'Wrap';
    desigText.id = obj.id + '_desig';
    innerStack.children = [text, desigText];

    content.children = [image, innerStack];

    return content;
}

function onItemClick(args: ClickEventArgs): void {
    switch (args.item.tooltipText) {
      case 'Zoom In':
        var zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
        diagram.zoomTo(zoomin);
        break;
      case 'Zoom Out':
        var zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
        diagram.zoomTo(zoomout);
        break;
      case 'Reset':
        diagram.reset();
        break;
      case 'Pan Tool':
        diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'Select':
        diagram.clearSelection();
        diagram.drawingObject = {};
        diagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
        break;
      case 'Fit To Page':
        diagram.fitToPage();
        break;
      case 'Bring Into View':
        if (diagram.selectedItems.nodes.length > 0) {
        let bound:any = diagram.selectedItems.nodes[0].wrapper.bounds;
        diagram.bringIntoView(bound);
        }
        break;
      case 'Bring Into Center':
        if (diagram.selectedItems.nodes.length > 0) {
        let bounds:any = diagram.selectedItems.nodes[0].wrapper.bounds;
        diagram.bringToCenter(bounds);
        }
        break;
    }
  }
  

export interface EmployeeInfo {
    Name: string;
    Designation: string;
    ImageUrl: string;
}
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%',
        height: '590px',
        scrollSettings: { scrollLimit: 'Infinity' },
        // Sets the constraints of the SnapSettings
        snapSettings: { constraints: SnapConstraints.None },
        // Configrues organizational chart layout
        layout: {
            type: 'OrganizationalChart',
            margin: { top: 20 },
            getLayoutInfo: (tree: TreeInfo) => {
            if (!tree.hasSubTree) {
                tree.orientation = 'Vertical';
                tree.type = 'Right';
            }
            },
        },
        // Sets the parent and child relationship of DataSource.
        dataSourceSettings: {
            id: 'Id',
            parentId: 'ReportingPerson',
            dataSource: new DataManager((Data as any).data),
        },
        selectionChange:selectionChange,
        // Sets the default values of Nodes.
        getNodeDefaults: getNodeDefaults,
        // Sets the default values of connectors.
        getConnectorDefaults: getConnectorDefaults,
        // Customization of the node.
        setNodeTemplate: setNodeTemplate,
    });
    diagram.appendTo('#diagram');

    
toolbarObj= new Toolbar({
    clicked: onItemClick,
    items: [
      {
        type: 'Button',
        tooltipText: 'Zoom In',
        prefixIcon: 'e-icons e-zoom-in',
      },
      {
        type: 'Button',
        tooltipText: 'Zoom Out',
        prefixIcon: 'e-icons e-zoom-out',
      },
      { type: 'Separator' },
      {
        type: 'Button',
        tooltipText: 'Select',
        prefixIcon: 'e-icons e-mouse-pointer',
      },
      {
        type: 'Button',
        tooltipText: 'Pan Tool',
        prefixIcon: 'e-icons e-pan',
      },
      { type: 'Separator' },
      {
        type: 'Button',
        tooltipText: 'Reset',
        prefixIcon: 'e-icons e-reset',
      },
      {
        type: 'Button',
        tooltipText: 'Fit To Page',
        prefixIcon: 'e-icons e-zoom-to-fit',
      },
      { type: 'Separator' },
      {
        type: 'Button',
        tooltipText: 'Bring Into View',
        prefixIcon: 'e-icons e-bring-to-view',
        disabled: true
      },
      {
        type: 'Button',
        tooltipText: 'Bring Into Center',
        prefixIcon: 'e-icons e-bring-to-center',
        disabled: true
      },
    ],
  });
  toolbarObj.appendTo('#toolbar');

};
