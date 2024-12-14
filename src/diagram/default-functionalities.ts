import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default FlowShape sample
 */

import {
  Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, SymbolPalette,
  SymbolInfo, IDragEnterEventArgs, GridlinesModel, PaletteModel, FlowShapes, Node, PrintAndExport
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
import { ConnectorConstraints, DiagramTools, IExportOptions, IScrollChangeEventArgs, ISelectionChangeEventArgs, NodeConstraints } from '@syncfusion/ej2-diagrams';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
//import { openPalette, closePalette, getClassList } from './styles/html-class';
Diagram.Inject(UndoRedo, PrintAndExport);


//Create and add ports for node.
function getPorts(): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: .5 } },
    { id: 'port4', shape: 'Circle', offset: { x: .5, y: 0 } }
  ];
  return ports;
}

//Sets the default values of a connector
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
  if (obj.id.indexOf('connector') !== -1) {
    obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
  }
  return obj;
}

//Sets the default values of a node
function getNodeDefaults(node: NodeModel): NodeModel {
  if (node.width === undefined) {
    node.width = 145;
  }
  node.style = { fill: '#357BD2', strokeColor: 'white' };
  for (let i: number = 0; i < node.annotations.length; i++) {
    node.annotations[i].style = {
      color: 'white',
      fill: 'transparent',
    };
  }
  //Set ports
  node.ports = getPorts();
  return node;
}

//Sets the Node style for DragEnter element.
function dragEnter(args: IDragEnterEventArgs): void {
  let obj: NodeModel = args.element as NodeModel;
  if (obj instanceof Node) {
    let objWidth: number = obj.width;
    let objHeight: number = obj.height;
    let ratio: number = 100 / obj.width;
    obj.width = 100;
    obj.height *= ratio;
    obj.offsetX += (obj.width - objWidth) / 2;
    obj.offsetY += (obj.height - objHeight) / 2;
    obj.style = { fill: '#357BD2', strokeColor: 'white' };
  }
}

//To set default values for elements in symbol palette.
function getSymbolDefaults(symbol: NodeModel): void {
  symbol.style = { strokeColor: '#757575' };
  if (symbol.id === 'Terminator' || symbol.id === 'Process' || symbol.id === 'Delay') {
    symbol.width = 80;
    symbol.height = 40;
  } else if (symbol.id === 'Decision' || symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
    symbol.id === 'PaperTap' || symbol.id === 'DirectData' || symbol.id === 'MultiDocument' || symbol.id === 'Data') {
    symbol.width = 50;
    symbol.height = 40;
  } else {
    symbol.width = 50;
    symbol.height = 50;
  }
}

function getSymbolInfo(symbol: NodeModel): SymbolInfo {
  return { fit: true };
}


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
  loadCultureFiles();
  const Window: any = window.location.href
  if (Window) {
    if (Window.includes('bootstrap5')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap5_Diagram_Builder/style.css';
    }
    else if (Window.includes('bootstrap4')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/bootstrap4_Diagram_Builder/style.css';
    }
    else if (Window.includes('bootstrap')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap_Diagram_Builder/style.css';
    }
    else if (Window.includes('material3')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material3_Diagram_Builder/style.css';
    }
    else if (Window.includes('material')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material_Diagram_Builder/style.css';
    }
    else if (Window.includes('fabric')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/fabric_Diagram_Builder/style.css';
    }
    else if (Window.includes('fluent')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fluent_Diagram_Builder/style.css';
    }
    else if (Window.includes('tailwind')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Tailwind_Diagram_Builder/style.css';
    }
    else if (Window.includes('highcontrast')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/HighContrast_Diagram_Builder/style.css';
    }
    else if (Window.includes('fusion')) {
      (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fusion_Diagram_Builder/style.css';
    }
  }

  let interval: number[] = [
    1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
  ];
  let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };

  let bounds: ClientRect = document.getElementById('diagram-space').getBoundingClientRect();
  let centerX: number = bounds.width / 2;

  // Function to create a node with given properties
  function createNode(id: string, height: number, offsetX: number, offsetY: number, shape: FlowShapes,
    annotationContent: string, annotationMargin?: { left: number; right: number }): NodeModel {
    const node: NodeModel = {
      id: id,
      height: height,
      offsetX: offsetX,
      offsetY: offsetY,
      shape: { type: 'Flow', shape: shape },
      annotations: [{ content: annotationContent, margin: annotationMargin }]
    };
    return node;
  }

  // Initializing the nodes for the diagram
  const nodes: NodeModel[] = [
    createNode('NewIdea', 60, centerX - 50, 80, 'Terminator', 'Place Order'),
    createNode('Meeting', 60, centerX - 50, 160, 'Process', 'Start Transaction'),
    createNode('BoardDecision', 60, centerX - 50, 240, 'Process', 'Verification'),
    createNode('Project', 60, centerX - 50, 330, 'Decision', 'Credit card valid?'),
    createNode('End', 60, centerX - 50, 430, 'Decision', 'Funds available?'),
    createNode('Payment_method', 60, centerX - 50 + 230, 330, 'Process', 'Enter payment method'),
    createNode('transaction_entered', 60, centerX - 50, 630, 'Terminator', 'Log transaction'),
    createNode('Reconcile_entries', 60, centerX - 50 + 180, 630, 'Process', 'Reconcile the entries'),
    createNode('transaction_completed', 60, centerX - 50, 530, 'Process', 'Complete Transaction'),
    createNode('Data', 45, centerX - 50 - 190, 530, 'Data', 'Send e-mail', { left: 25, right: 25 }),
    createNode('Database', 70, centerX - 50 + 175, 530, 'DirectData', 'Customer Database', { left: 25, right: 25 })
  ];

  //Initializes the connector for the diagram
  let connectors: ConnectorModel[] = [
    { id: 'connector1', sourceID: 'NewIdea', targetID: 'Meeting' },
    { id: 'connector2', sourceID: 'Meeting', targetID: 'BoardDecision' },
    { id: 'connector3', sourceID: 'BoardDecision', targetID: 'Project' },
    { id: 'connector4', sourceID: 'Project', annotations: [{ content: 'Yes', style: { fill: 'white' } }], targetID: 'End' },
    {
      id: 'connector5', sourceID: 'End',
      annotations: [{ content: 'Yes', style: { fill: 'white' } }], targetID: 'transaction_completed'
    },
    { id: 'connector6', sourceID: 'transaction_completed', targetID: 'transaction_entered' },
    { id: 'connector7', sourceID: 'transaction_completed', targetID: 'Data' },
    { id: 'connector8', sourceID: 'transaction_completed', targetID: 'Database' },
    { id: 'connector9', sourceID: 'Payment_method', targetID: 'Meeting', type: 'Orthogonal', segments: [{ direction: 'Top', type: 'Orthogonal', length: 120 }] },
    {
      id: 'connector10', sourceID: 'End', annotations: [{ content: 'No', style: { fill: 'white' } }], type: 'Orthogonal',
      targetID: 'Payment_method', segments: [{ direction: 'Right', type: 'Orthogonal', length: 100 }]
    },
    { id: 'connector11', sourceID: 'Project', annotations: [{ content: 'No', style: { fill: 'white' } }], targetID: 'Payment_method' },
    { id: 'connector12', style: { strokeDashArray: '2,2' }, sourceID: 'transaction_entered', targetID: 'Reconcile_entries' }
  ];

  let rotateItems: any = [
    { iconCss: 'e-icons e-transform-right', text: 'Rotate Clockwise' },
    { iconCss: 'e-icons e-transform-left', text: 'Rotate Counter-Clockwise' }
  ];
  let flipItems: any = [
    { iconCss: 'e-icons e-flip-horizontal', text: 'Flip Horizontal' },
    { iconCss: 'e-icons e-flip-vertical', text: 'Flip Vertical' }
  ];
  let alignItems: any = [
    { iconCss: 'sf-icon-align-left-1', text: 'Align Left', },
    { iconCss: 'sf-icon-align-center-1', text: 'Align Center' },
    { iconCss: 'sf-icon-align-right-1', text: 'Align Right' },
    { iconCss: 'sf-icon-align-top-1', text: 'Align Top' },
    { iconCss: 'sf-icon-align-middle-1', text: 'Align Middle' },
    { iconCss: 'sf-icon-align-bottom-1', text: 'Align Bottom' },
  ];
  let distributeItems: any = [
    { iconCss: 'sf-icon-distribute-vertical', text: 'Distribute Objects Vertically', },
    { iconCss: 'sf-icon-distribute-horizontal', text: 'Distribute Objects Horizontally', },
  ];
  let orderItems: any = [
    { iconCss: 'e-icons e-bring-forward', text: 'Bring Forward' },
    { iconCss: 'e-icons e-bring-to-front', text: 'Bring To Front' },
    { iconCss: 'e-icons e-send-backward', text: 'Send Backward' },
    { iconCss: 'e-icons e-send-to-back', text: 'Send To Back' }
  ];
  let zoomMenuItems: any = [
    { text: 'Zoom In' }, { text: 'Zoom Out' }, { text: 'Zoom to Fit' }, { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' }, { text: 'Zoom to 200%' },
  ];
  let conTypeItems: any = [
    { text: 'Straight', iconCss: 'e-icons e-line' },
    { text: 'Orthogonal', iconCss: 'sf-icon-orthogonal' },
    { text: 'Bezier', iconCss: 'sf-icon-bezier' }
  ];
  let shapesItems: any = [
    { text: 'Rectangle', iconCss: 'e-rectangle e-icons' },
    { text: 'Ellipse', iconCss: ' e-circle e-icons' },
    { text: 'Polygon', iconCss: 'e-line e-icons' }
  ];
  let exportItems: any = [
    { text: 'JPG' }, { text: 'PNG' }, { text: 'SVG' }
  ];
  let groupItems: any = [
    { text: 'Group', iconCss: 'e-icons e-group-1' }, { text: 'Ungroup', iconCss: 'e-icons e-ungroup-1' }
  ];



  //Initializes diagram control
  let diagram: Diagram = new Diagram({
    width: '100%', height: '700px', nodes: nodes, connectors: connectors,
    drawingObject: {},
    selectionChange: selectionChange,
    historyChange: historyChange,
    tool: DiagramTools.Default,
    snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines },
    scrollChange: function (args: IScrollChangeEventArgs) {
      if (args.panState !== 'Start') {
        let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
        zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
      }
    },
    getNodeDefaults: getNodeDefaults,
    getConnectorDefaults: getConnectorDefaults,
    dragEnter: dragEnter,
  });
  diagram.appendTo('#diagram');

  //Initialize Toolbar component.
  let toolbarObj: Toolbar = new Toolbar({
    clicked: function (args: any) { toolbarClick(args); },
    created: function (args) {
      if (diagram !== undefined) {
        let conTypeBtn: DropDownButton = new DropDownButton({
          items: conTypeItems, iconCss: 'e-ddb-icons e-connector e-icons',
          select: function (args) { onConnectorSelect(args); }
        });
        conTypeBtn.appendTo('#conTypeBtn');

        let btnZoomIncrement: DropDownButton = new DropDownButton({
          items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom * 100) + ' %', select: zoomChange,
        });
        btnZoomIncrement.appendTo('#btnZoomIncrement');

        let shapesBtn: DropDownButton = new DropDownButton({
          items: shapesItems, iconCss: 'e-shapes e-icons',
          select: function (args) { onShapesSelect(args); }
        });
        shapesBtn.appendTo('#shapesBtn');

        let exportBtn: DropDownButton = new DropDownButton({
          items: exportItems, iconCss: 'e-ddb-icons e-export', select: function (args) { onselectExport(args); },
        });
        exportBtn.appendTo('#exportBtn');

        let groupBtn: DropDownButton = new DropDownButton({
          items: groupItems, iconCss: 'e-icons e-group-1', select: function (args) { onSelectGroup(args); }
        });
        groupBtn.appendTo('#groupBtn');

        let alignBtn: DropDownButton = new DropDownButton({
          items: alignItems, iconCss: 'sf-icon-align-center-1', select: function (args) { onSelectAlignObjects(args); }
        });
        alignBtn.appendTo('#alignBtn');

        let distributeBtn: DropDownButton = new DropDownButton({
          items: distributeItems, iconCss: 'sf-icon-distribute-vertical', select: function (args) { onSelectDistributeObjects(args); }
        });
        distributeBtn.appendTo('#distributeBtn');

        let orderBtn: DropDownButton = new DropDownButton({
          items: orderItems, iconCss: 'e-icons e-order', select: function (args) { onSelectOrder(args); }
        });
        orderBtn.appendTo('#orderBtn');

        let rotateBtn: DropDownButton = new DropDownButton({
          items: rotateItems, iconCss: 'e-icons e-repeat', select: function (args) { onSelectRotate(args); }
        });
        rotateBtn.appendTo('#rotateBtn');

        let flipBtn: DropDownButton = new DropDownButton({
          items: flipItems, iconCss: 'e-icons e-flip-horizontal', select: function (args) { onSelectFlip(args); }
        });
        flipBtn.appendTo('#flipBtn');
        refreshOverflow();
      }

    },
    items: toolbarItems(),
    overflowMode: 'Scrollable',
    width: '100%'
  });

  toolbarObj.appendTo('#toolbarEditor');

  function refreshOverflow() {
    setTimeout(() => {
      toolbarObj.refreshOverflow();

    }, 100);
  }

  //Initializes toolbar Items.
  function toolbarItems() {
    let items: any = [
      { prefixIcon: 'e-icons e-circle-add', tooltipText: 'New Diagram', id: 'New_Diagram' },
      { prefixIcon: 'e-icons e-folder-open', tooltipText: 'Open Diagram', id: 'Open_diagram' },
      { prefixIcon: 'e-icons e-save', tooltipText: 'Save Diagram', id: 'Save' },
      { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram', id: 'Print' },
      { type: 'Input', tooltipText: 'Export Diagram', template: '<button id="exportBtn" style="width:100%;"></button>', id: 'Export' },

      { type: 'Separator' },

      { disabled: true, prefixIcon: 'e-cut e-icons', tooltipText: 'Cut', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Cut' },
      { disabled: true, prefixIcon: 'e-copy e-icons', tooltipText: 'Copy', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Copy' },
      { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste', disabled: true, id: 'Paste' },
      { type: 'Separator' },

      { disabled: true, prefixIcon: 'e-icons e-undo tb-icons', tooltipText: 'Undo', cssClass: 'tb-item-start tb-item-undo', id: 'Undo' },
      { disabled: true, prefixIcon: 'e-icons e-redo tb-icons', tooltipText: 'Redo', cssClass: 'tb-item-end tb-item-redo', id: 'Redo' },

      { type: 'Separator', },

      { prefixIcon: 'e-pan e-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start pan-item', id: 'Pan_tool' },
      { prefixIcon: 'e-mouse-pointer e-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-middle tb-item-selected', id: 'Select_tool' },
      { tooltipText: 'Draw Connectors', template: '<button id="conTypeBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle', id: 'Draw_con' },
      { tooltipText: 'Draw Shapes', template: '<button id="shapesBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle', id: 'Draw_shapes' },
      { prefixIcon: 'e-caption e-icons', tooltipText: 'Text Tool', cssClass: 'tb-item-end', id: 'Text_tool' },

      { type: 'Separator', },

      { disabled: true, prefixIcon: 'e-icons e-lock', tooltipText: 'Lock', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Lock' },
      { disabled: true, prefixIcon: 'e-trash e-icons', tooltipText: 'Delete', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Delete' },

      { type: 'Separator', align: 'Center' },

      { disabled: true, type: 'Input', tooltipText: 'Align Objects', template: '<button id="alignBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle  tb-item-align-category', id: 'Align_objects' },
      { disabled: true, type: 'Input', tooltipText: 'Distribute Objects', template: '<button id="distributeBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-space-category', id: 'Distribute_objects' },

      { type: 'Separator', },

      { disabled: true, type: 'Input', tooltipText: 'Order Commands', template: '<button id="orderBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Order' },

      { type: 'Separator' },

      { disabled: true, type: 'Input', tooltipText: 'Group/Ungroup', template: '<button id="groupBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-align-category', id: 'Group' },

      { type: 'Separator' },

      { disabled: true, type: 'Input', tooltipText: 'Rotate', template: '<button id="rotateBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Rotate' },

      { type: 'Separator' },

      { disabled: true, type: 'Input', tooltipText: 'Flip', template: '<button id="flipBtn" style="width:100%;"></button>', cssClass: 'tb-item-middle tb-item-lock-category', id: 'Flip' },

      { type: 'Separator' },

      { cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>', id: 'Zoom' },
    ];
    return items;
  }


  //To handle toolbar click
  function toolbarClick(args: any) {
    let item = args.item.tooltipText;
    switch (item) {
      case 'Undo':
        diagram.undo();
        break;
      case 'Redo':
        diagram.redo();
        break;
      case 'Lock':
        lockObject(args);
        break;
      case 'Cut':
        diagram.cut();
        updateToolbarItems(["Paste"], false);
        break;
      case 'Copy':
        diagram.copy();
        updateToolbarItems(["Paste"], false);
        break;
      case 'Paste':
        diagram.paste();
        break;
      case 'Delete':
        diagram.remove();
        break;
      case 'Select Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.Default;
        break;
      case 'Text Tool':
        diagram.clearSelection();
        diagram.selectedItems.userHandles = [];
        diagram.drawingObject = { shape: { type: 'Text' } };
        diagram.tool = DiagramTools.ContinuousDraw;
        break;
      case 'Pan Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'New Diagram':
        diagram.clear();
        historyChange(args);
        break;
      case 'Print Diagram':
        printDiagram(args);
        break;
      case 'Save Diagram':
        download(diagram.saveDiagram());
        break;
      case 'Open Diagram':
        document
          .getElementsByClassName('e-file-select-wrap')[0]
          .querySelector('button')
          .click();
        break;
    }
    diagram.dataBind();
  }
  //To enable and disable the toolbar items based on selection.
  function selectionChange(args: ISelectionChangeEventArgs) {
    if (args.state === 'Changed') {
      let selectedItems: any = diagram.selectedItems.nodes;
      selectedItems = selectedItems.concat(
        (diagram.selectedItems as any).connectors
      );
      if (selectedItems.length === 0) {

        updateToolbarItems(['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'], true);
        disableMultiselectedItems();
      }
      if (selectedItems.length === 1) {
        enableItems();
        disableMultiselectedItems();
        if (selectedItems[0].children !== undefined && selectedItems[0].children.length > 0) {
          updateToolbarItems(["Group"], false);
        }
        else {
          updateToolbarItems(["Group"], true);
        }
      }

      if (selectedItems.length > 1) {
        enableItems();
        updateToolbarItems(['Align_objects', 'Group','Distribute_objects'],false );
        //To enable distribute objcets when selected items length is greater than 2
        if (selectedItems.length > 2) {
          updateToolbarItems(['Distribute_objects'], false);
        }
        else {
          updateToolbarItems(['Distribute_objects'], true);
        }
      }
    }
  }

  //To enable and disable undo/redo button.
  function historyChange(args: any) {
    updateToolbarItems(['Undo'], diagram.historyManager.undoStack.length === 0);
    updateToolbarItems(['Redo'], diagram.historyManager.redoStack.length === 0);
  }


  let uploadObject: Uploader = new Uploader({
    asyncSettings: {
      saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
      removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    }, success: onUploadSuccess, showFileList: false
  });
  uploadObject.appendTo('#fileupload');

  // Set up print options and initiate printing of the diagram.
  function printDiagram(args: any) {
    let options: IExportOptions = {};
    options.mode = 'Download';
    options.region = 'Content';
    options.multiplePage = diagram.pageSettings.multiplePage;
    options.pageHeight = diagram.pageSettings.height;
    options.pageWidth = diagram.pageSettings.width;
    diagram.print(options);
  }

  //To enable toolbar items.
  function enableItems() {
    updateToolbarItems( ['Cut', 'Copy', 'Lock', 'Delete', 'Order', 'Rotate', 'Flip'],false);
  }

  //To disable toolbar items while multiselection.
  function disableMultiselectedItems() {
    updateToolbarItems(['Align_objects', 'Distribute_objects', 'Group'],true );
  }

  //To handle selection of connectors.
  function onConnectorSelect(args: any) {
    diagram.clearSelection();
    diagram.drawingObject = { type: args.item.text };
    diagram.tool = DiagramTools.ContinuousDraw;
    diagram.selectedItems.userHandles = [];
    diagram.dataBind();
  }

  //To handle selection of shapes.
  function onShapesSelect(args: any) {
    diagram.clearSelection();
    diagram.drawingObject = { shape: { shape: args.item.text } };
    diagram.tool = DiagramTools.ContinuousDraw;
    diagram.selectedItems.userHandles = [];
    diagram.dataBind();
  }

  //Export the diagraming object based on the format.
  function onselectExport(args: any) {
    let exportOptions: IExportOptions = {};
    exportOptions.format = args.item.text;
    exportOptions.mode = 'Download';
    exportOptions.region = 'PageSettings';
    exportOptions.fileName = 'Export';
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagram.exportDiagram(exportOptions);
  }

  //To perform group and ungroup diagram objects.
  function onSelectGroup(args: any) {
    if (args.item.text === 'Group') {
      diagram.group();
    }
    else if (args.item.text === 'Ungroup') {
      diagram.unGroup();
    }
  }

  //To align selelcted diagram objects.
  function onSelectAlignObjects(args: any) {
    let item: any = args.item.text;
    let alignType = item.replace('Align', '');
    let alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
    diagram.align(alignType1.trim());
  }

  //To distribute selected objects horizontally and vertically.
  function onSelectDistributeObjects(args: any) {
    diagram.distribute(args.item.text === 'Distribute Objects Vertically' ? 'BottomToTop' : 'RightToLeft');
  }

  //To execute order commands
  function onSelectOrder(args: any) {
    switch (args.item.text) {
      case 'Bring Forward':
        diagram.moveForward();
        break;
      case 'Bring To Front':
        diagram.bringToFront();
        break;
      case 'Send Backward':
        diagram.sendBackward();
        break;
      case 'Send To Back':
        diagram.sendToBack();
        break;
    }
  }

  //To rotate the selected objects.
  function onSelectRotate(args: any) {
    diagram.rotate(diagram.selectedItems, args.item.text === 'Rotate Clockwise' ? 90 : -90);
  }

  //To flip diagram objects
  function onSelectFlip(args: any) {
    flipObjects(args.item.text);
  }

  // To flip diagram objects
  function flipObjects(flipType: any) {
    let selectedObjects = diagram.selectedItems.nodes.concat((diagram.selectedItems as any).connectors);
    for (let i: number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip = flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
    }
    diagram.dataBind();
  }

  //set up uploaded file and call loadDiagram
  function onUploadSuccess(args: any) {
    let file = args.file;
    let rawFile = file.rawFile;
    let reader = new FileReader();
    reader.readAsText(rawFile);
    reader.onloadend = loadDiagram;
  }
  function loadDiagram(event: any) {
    diagram.loadDiagram(event.target.result);
  }

  //Function to download the diagram.
  function download(data: any) {
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      let element = document.createElement('a');
      element.href = dataString;
      element.download = 'Diagram.json';
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  }

  // To lock the selected diagram object.
  function lockObject(args: any) {
    let isChecked;
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
      let node = diagram.selectedItems.nodes[i];
      if (node.constraints & NodeConstraints.Drag) {
        node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select | NodeConstraints.ReadOnly;
        isChecked = true;
      } else {
        node.constraints = NodeConstraints.Default;
        isChecked = false;
      }
    }
    for (let j: number = 0; j < diagram.selectedItems.connectors.length; j++) {
      let connector = diagram.selectedItems.connectors[j];
      if (connector.constraints & ConnectorConstraints.Drag) {
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select | ConnectorConstraints.ReadOnly;
        isChecked = true;
      } else {
        connector.constraints = ConnectorConstraints.Default;
        isChecked = false;
      }
    }
  updateToolbarItems(["Cut", "Copy", "Delete", "Order", "Rotate", "Flip"],isChecked);
  diagram.dataBind();
  }
  

  // Enable or disable specific toolbar items
  function updateToolbarItems(itemIds :string[], disabled: boolean) {
    itemIds.forEach((itemId) => {
      const item = toolbarObj.items.find((item) => item.id === itemId);
      if (item) {
        item.disabled = disabled;
      }
    });
  }

  // To perform zoom operation.
  function zoomChange(args: any) {
    let zoomCurrentValue: any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
    let currentZoom: any = diagram.scrollSettings.currentZoom;
    let zoom: any = {};
    switch (args.item.text) {
      case 'Zoom In':
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom Out':
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom to Fit':
        zoom.zoomFactor = 1 / currentZoom - 1;
        diagram.zoomTo(zoom);
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
        break;
      case 'Zoom to 50%':
        if (currentZoom === 0.5) {
          currentZoom = 0;
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 100%':
        if (currentZoom === 1) {
          currentZoom = 0;
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 200%':
        if (currentZoom === 2) {
          currentZoom = 0;
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
    }

    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';

  }

  //Function to get flowshapes.
  function getFlowShape(id: string, shapeType: FlowShapes): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
  }
  //Initialize the flowshapes for the symbol palatte
  let flowShapes: NodeModel[] = [
    getFlowShape('Terminator', 'Terminator'),
    getFlowShape('Process', 'Process'),
    getFlowShape('Decision', 'Decision'),
    getFlowShape('Document', 'Document'),
    getFlowShape('PreDefinedProcess', 'PreDefinedProcess'),
    getFlowShape('PaperTap', 'PaperTap'),
    getFlowShape('DirectData', 'DirectData'),
    getFlowShape('SequentialData', 'SequentialData'),
    getFlowShape('Sort', 'Sort'),
    getFlowShape('MultiDocument', 'MultiDocument'),
    getFlowShape('Collate', 'Collate'),
    getFlowShape('Or', 'Or'),
    getFlowShape('Extract', 'Extract'),
    getFlowShape('Merge', 'Merge'),
    getFlowShape('OffPageReference', 'OffPageReference'),
    getFlowShape('SequentialAccessStorage', 'SequentialAccessStorage'),
    getFlowShape('Annotation', 'Annotation'),
    getFlowShape('Annotation2', 'Annotation2'),
    getFlowShape('Data', 'Data'),
    getFlowShape('Card', 'Card'),
    getFlowShape('Delay', 'Delay'),
  ];

  //Initializes connector symbols for the symbol palette
  let connectorSymbols: ConnectorModel[] = [
    {
      id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link4', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
      id: 'link5', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
  ];

  let palettes: PaletteModel[] = [
    { id: 'flow', expanded: true, symbols: flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
    { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' }
  ];

  //Initializes the symbol palette
  let palette: SymbolPalette = new SymbolPalette({
    expandMode: 'Multiple', palettes: palettes,
    width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60,
    symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
    enableSearch: true,
    getNodeDefaults: getSymbolDefaults, getSymbolInfo: getSymbolInfo
  });
  palette.appendTo('#symbolpalette');

  addEvents();
};
