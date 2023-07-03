import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default FlowShape sample
 */

 import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, PointPortModel, SymbolPalette,
    SymbolInfo, IDragEnterEventArgs, GridlinesModel, PaletteModel, FlowShapes, Node
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
import { ConnectorConstraints, DiagramTools, IExportOptions, IScrollChangeEventArgs, ISelectionChangeEventArgs, NodeConstraints } from '@syncfusion/ej2/diagrams';
import { Uploader } from '@syncfusion/ej2/inputs';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2/splitbuttons';
//import { openPalette, closePalette, getClassList } from './styles/html-class';
Diagram.Inject(UndoRedo);



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

//Sets the Node style for DragEnter element.
function dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
        let oWidth: number = obj.width;
        let oHeight: number = obj.height;
        let ratio: number = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
        obj.offsetX += (obj.width - oWidth) / 2;
        obj.offsetY += (obj.height - oHeight) / 2;
        obj.style = { fill: '#357BD2', strokeColor: 'white' };
    }
}

function getFlowShape(id: string, shapeType: FlowShapes): NodeModel {
    let flowshape: NodeModel = { id: id, shape: { type: 'Flow', shape: shapeType } };
    return flowshape;
}

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
    const Window:any = window.location.href
    if(Window){
      if(Window.includes('bootstrap5')){
          (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap5_Diagram_Builder/style.css';
      }
      else if(Window.includes('bootstrap4')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/bootstrap4_Diagram_Builder/style.css';
      }
      else if(Window.includes('bootstrap')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap_Diagram_Builder/style.css';
      }
      else if(Window.includes('material3')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material3_Diagram_Builder/style.css';
      }
      else if(Window.includes('material')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material_Diagram_Builder/style.css';
      }
      else if(Window.includes('fabric')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/fabric_Diagram_Builder/style.css';
      }
      else if(Window.includes('fluent')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fluent_Diagram_Builder/style.css';
      }
      else if(Window.includes('tailwind')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Tailwind_Diagram_Builder/style.css';
      }
      else if(Window.includes('highcontrast')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/HighContrast_Diagram_Builder/style.css';
      }
      else if(Window.includes('fusion')){
        (document.getElementById('change_themes') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fusion_Diagram_Builder/style.css';
      }
    }
    let bounds: ClientRect = document.getElementById('diagram-space').getBoundingClientRect();
    let centerX: number = bounds.width / 2;
    let interval: number[] = [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ];

    let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };
    // Initializes the nodes for the diagram
    let nodes: NodeModel[] = [
        {
            id: 'NewIdea', height: 60, offsetX: centerX - 50, offsetY: 80,
            shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{ content: 'Place Order' }]
        }, {
            id: 'Meeting', height: 60, offsetX: centerX - 50, offsetY: 160,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Start Transaction' }]
        }, {
            id: 'BoardDecision', height: 60, offsetX: centerX - 50, offsetY: 240,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Verification' }]
        }, {
            id: 'Project', height: 60, offsetX: centerX - 50, offsetY: 330,
            shape: { type: 'Flow', shape: 'Decision' }, annotations: [{ content: 'Credit card valid?' }]
        }, {
            id: 'End', height: 60, offsetX: centerX - 50, offsetY: 430,
            shape: { type: 'Flow', shape: 'Decision' }, annotations: [{ content: 'Funds available?' }]
        }, {
            id: 'node11', height: 60, offsetX: (centerX - 50) + 230, offsetY: 330,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Enter payment method' }]
        }, {
            id: 'transaction_entered', height: 60, offsetX: (centerX - 50), offsetY: 630,
            shape: { type: 'Flow', shape: 'Terminator' }, annotations: [{ content: 'Log transaction' }]
        }, {
            id: 'node12', height: 60, offsetX: (centerX - 50) + 180, offsetY: 630,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Reconcile the entries' }]
        }, {
            id: 'transaction_completed', height: 60, offsetX: (centerX - 50), offsetY: 530,
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ content: 'Complete Transaction' }]
        }, {
            id: 'Data', height: 45, offsetX: (centerX - 50) - 190, offsetY: 530,
            shape: { type: 'Flow', shape: 'Data' }, annotations: [{ content: 'Send e-mail', margin: { left: 25, right: 25 } }]
        }, {
            id: 'node10', height: 70, offsetX: (centerX - 50) + 175, offsetY: 530,
            shape: { type: 'Flow', shape: 'DirectData' }, annotations: [{ content: 'Customer Database', margin: { left: 25, right: 25 } }]
        }
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
        { id: 'connector8', sourceID: 'transaction_completed', targetID: 'node10' },
        { id: 'connector9', sourceID: 'node11', targetID: 'Meeting',type: 'Orthogonal', segments: [{ direction: 'Top', type: 'Orthogonal', length: 120 }] },
        {
            id: 'connector10', sourceID: 'End', annotations: [{ content: 'No', style: { fill: 'white' } }],type: 'Orthogonal',
            targetID: 'node11', segments: [{ direction: 'Right', type: 'Orthogonal', length: 100 }]
        },
        { id: 'connector11', sourceID: 'Project', annotations: [{ content: 'No', style: { fill: 'white' } }], targetID: 'node11' },
        { id: 'connector12', style: { strokeDashArray: '2,2' }, sourceID: 'transaction_entered', targetID: 'node12' }
    ];

    let rotateItems:any = [
        {iconCss:'e-icons e-transform-right',text: 'Rotate Clockwise'},
        {iconCss:'e-icons e-transform-left',text: 'Rotate Counter-Clockwise'}
    ];
    let flipItems:any = [
        {iconCss:'e-icons e-flip-horizontal',text: 'Flip Horizontal'},
        {iconCss:'e-icons e-flip-vertical',text: 'Flip Vertical'}
    ];
    let alignItems:any = [
        {
            iconCss: 'sf-icon-align-left-1', text: 'Align Left', 
        },
        {
            iconCss: 'sf-icon-align-center-1', text: 'Align Center',
        },
        {
            iconCss: 'sf-icon-align-right-1', text: 'Align Right',
        },
        {
            iconCss: 'sf-icon-align-top-1', text: 'Align Top',
        },
        {
            iconCss: 'sf-icon-align-middle-1', text: 'Align Middle',
        },
        {
            iconCss: 'sf-icon-align-bottom-1', text: 'Align Bottom',
        },
    ];
    let distributeItems:any = [
        { iconCss: 'sf-icon-distribute-vertical', text: 'Distribute Objects Vertically',},
        { iconCss: 'sf-icon-distribute-horizontal', text: 'Distribute Objects Horizontally',},
    ];
    let orderItems:any = [
        { iconCss: 'e-icons e-bring-forward', text: 'Bring Forward'},
        { iconCss: 'e-icons e-bring-to-front', text: 'Bring To Front'},
        { iconCss: 'e-icons e-send-backward', text: 'Send Backward'},
        { iconCss: 'e-icons e-send-to-back', text: 'Send To Back'}
    ];
    let zoomMenuItems:any = [
        { text: 'Zoom In' },{ text: 'Zoom Out' },{ text: 'Zoom to Fit' },{ text: 'Zoom to 50%' },
        { text: 'Zoom to 100%' },{ text: 'Zoom to 200%' },
                        ];
     let conTypeItems:any = [
                         {text: 'Straight',iconCss: 'e-icons e-line'},
                         {text: 'Orthogonal',iconCss: 'sf-icon-orthogonal'},
                         {text: 'Bezier',iconCss: 'sf-icon-bezier'}
                        ];
    let shapesItems:any = [
                        {text: 'Rectangle',iconCss: 'e-rectangle e-icons'},
                         {text: 'Ellipse',iconCss: ' e-circle e-icons'},
                         {text: 'Polygon',iconCss: 'e-line e-icons'}
    ];
     let exportItems:any = [
            {text:'JPG'},{text:'PNG'},{text:'SVG'}
     ];
     let groupItems:any = [
        {text:'Group',iconCss:'e-icons e-group-1'},{text:'Ungroup',iconCss:'e-icons e-ungroup-1'}
     ];



    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '700px', nodes: nodes, connectors: connectors,
        drawingObject:{},
        selectionChange:selectionChange,
        historyChange:historyChange,
        tool:DiagramTools.Default,
        snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines },
        scrollChange: function  (args:IScrollChangeEventArgs) {
            if(args.panState !=='Start'){
                let zoomCurrentValue:any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
                zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom*100) + ' %';
                }
        },
        //Sets the default values of a node
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of a connector
        getConnectorDefaults: getConnectorDefaults,
        //Sets the Node style for DragEnter element.
        dragEnter: dragEnter,
    });
    diagram.appendTo('#diagram');

      //Initialize Toolbar component
      let toolbarObj:Toolbar = new Toolbar({
        clicked: function (args:any) {toolbarClick(args);},
        created: function(args) {
            if(diagram!== undefined){
                let conTypeBtn:DropDownButton = new DropDownButton({
                    items: conTypeItems, iconCss:'e-ddb-icons e-connector e-icons',
                    select: function (args) {onConnectorSelect(args);}
                });
                conTypeBtn.appendTo('#conTypeBtn');
                let btnZoomIncrement:DropDownButton = new DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom*100) + ' %', select: zoomChange,
                });
                btnZoomIncrement.appendTo('#btnZoomIncrement');
                let shapesBtn:DropDownButton = new DropDownButton({
                    items:shapesItems,iconCss: 'e-shapes e-icons',
                    select: function (args){onShapesSelect(args);}
                });
                shapesBtn.appendTo('#shapesBtn');
                let exportBtn:DropDownButton = new DropDownButton({
                    items: exportItems, iconCss: 'e-ddb-icons e-export',  select: function (args) {onselectExport(args);},
                 });
                 exportBtn.appendTo('#exportBtn');
                
                let groupBtn:DropDownButton = new DropDownButton({
                    items: groupItems, iconCss: 'e-icons e-group-1',select: function (args) {onSelectGroup(args);}
                });
                groupBtn.appendTo('#groupBtn');
                let alignBtn:DropDownButton = new DropDownButton({
                    items:alignItems, iconCss:'sf-icon-align-center-1',select: function (args) {onSelectAlignObjects(args);}
                });
                alignBtn.appendTo('#alignBtn');
                
                let distributeBtn:DropDownButton = new DropDownButton({
                    items:distributeItems, iconCss:'sf-icon-distribute-vertical',select: function (args) {onSelectDistributeObjects(args);}
                });
                distributeBtn.appendTo('#distributeBtn');
                let orderBtn:DropDownButton = new DropDownButton({
                    items:orderItems, iconCss:'e-icons e-order',select: function (args) {onSelectOrder(args);}
                });
                orderBtn.appendTo('#orderBtn');
                let rotateBtn:DropDownButton = new DropDownButton({
                    items:rotateItems, iconCss:'e-icons e-repeat',select: function (args) {onSelectRotate(args);}
                });
                rotateBtn.appendTo('#rotateBtn');
                let flipBtn:DropDownButton = new DropDownButton({
                    items:flipItems, iconCss:'e-icons e-flip-horizontal',select: function (args) {onSelectFlip(args);}
                });
                flipBtn.appendTo('#flipBtn');
                refreshOverflow();
            }

        },
        items: toolbarItems(),
        overflowMode: 'Scrollable',
        width:'100%'
 });
 
toolbarObj.appendTo('#toolbarEditor');

function refreshOverflow(){
    setTimeout(() => {
        toolbarObj.refreshOverflow();
        
    }, 100);
  }

function toolbarItems(){
    let items :any= [
        { prefixIcon: 'e-icons e-circle-add', tooltipText: 'New Diagram' },
        { prefixIcon: 'e-icons e-folder-open', tooltipText: 'Open Diagram', },
        { prefixIcon: 'e-icons e-save', tooltipText: 'Save Diagram' },
        { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram'},
        { type: 'Input', tooltipText: 'Export Diagram',template: '<button id="exportBtn" style="width:100%;"></button>'},
                { type: 'Separator' },
        {disabled:true, prefixIcon: 'e-cut e-icons', tooltipText: 'Cut',cssClass:'tb-item-middle tb-item-lock-category' },
        {disabled:true,  prefixIcon: 'e-copy e-icons', tooltipText: 'Copy',cssClass:'tb-item-middle tb-item-lock-category' },
        { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste',disabled:true },
                            {type: 'Separator' },
        {disabled:true,  prefixIcon: 'e-icons e-undo tb-icons', tooltipText: 'Undo',cssClass: 'tb-item-start tb-item-undo' },
        {disabled:true,  prefixIcon: 'e-icons e-redo tb-icons', tooltipText: 'Redo',cssClass: 'tb-item-end tb-item-redo' },
                        { type: 'Separator',},
        { prefixIcon: 'e-pan e-icons', tooltipText: 'Pan Tool',cssClass:'tb-item-start pan-item'},
        { prefixIcon: 'e-mouse-pointer e-icons', tooltipText: 'Select Tool',cssClass:'tb-item-middle tb-item-selected'},
        { tooltipText: 'Draw Connectors',template: '<button id="conTypeBtn" style="width:100%;"></button>',cssClass:'tb-item-middle'},
        { tooltipText: 'Draw Shapes',template: '<button id="shapesBtn" style="width:100%;"></button>',cssClass:'tb-item-middle'},
        { prefixIcon: 'e-caption e-icons', tooltipText: 'Text Tool',cssClass:'tb-item-end' },
                        { type: 'Separator',},
        {disabled:true,  prefixIcon: 'e-icons e-lock', tooltipText: 'Lock' ,cssClass:'tb-item-middle tb-item-lock-category' },
        {disabled:true,  prefixIcon: 'e-trash e-icons', tooltipText: 'Delete',cssClass:'tb-item-middle tb-item-lock-category' },
                        { type: 'Separator',align:'Center' },
        
        {disabled:true,  type: 'Input', tooltipText: 'Align Objects',template: '<button id="alignBtn" style="width:100%;"></button>',cssClass: 'tb-item-middle  tb-item-align-category'},
        {disabled:true,  type: 'Input', tooltipText: 'Distribute Objects',template: '<button id="distributeBtn" style="width:100%;"></button>',cssClass: 'tb-item-middle tb-item-space-category'},
                    { type: 'Separator', },
        {disabled:true,  type: 'Input', tooltipText: 'Order Commands',template: '<button id="orderBtn" style="width:100%;"></button>',cssClass: 'tb-item-middle tb-item-lock-category'},
                        { type: 'Separator'},
        {disabled:true,  type: 'Input', tooltipText: 'Group/Ungroup',template: '<button id="groupBtn" style="width:100%;"></button>',cssClass:'tb-item-middle tb-item-align-category'},
                        { type: 'Separator'},
        {disabled:true,  type: 'Input', tooltipText: 'Rotate',template: '<button id="rotateBtn" style="width:100%;"></button>',cssClass:'tb-item-middle tb-item-lock-category'},
                        { type: 'Separator'},
        {disabled:true,  type: 'Input', tooltipText: 'Flip',template: '<button id="flipBtn" style="width:100%;"></button>',cssClass:'tb-item-middle tb-item-lock-category'},
                        { type: 'Separator'},
        {
            cssClass: 'tb-item-end tb-zoom-dropdown-btn', template: '<button id="btnZoomIncrement"></button>',
        },
    ];
    return items;
}

function selectionChange(args:ISelectionChangeEventArgs){
    if (args.state === 'Changed') {
        let selectedItems:any = diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(
          (diagram.selectedItems as any).connectors
        );
        if (selectedItems.length === 0) {
          toolbarObj.items[6].disabled = true;
          toolbarObj.items[7].disabled = true;
          toolbarObj.items[19].disabled = true;
          toolbarObj.items[20].disabled = true;
          toolbarObj.items[25].disabled = true;
          toolbarObj.items[29].disabled = true;
          toolbarObj.items[31].disabled = true;
          disableMultiselectedItems();
        }
        if (selectedItems.length === 1) {
          enableItems();
          disableMultiselectedItems();

          if (
            selectedItems[0].children !== undefined &&
            selectedItems[0].children.length > 0
          ) {
            toolbarObj.items[27].disabled = false;
          } else {
            toolbarObj.items[27].disabled = true;
          }
        }

        if (selectedItems.length > 1) {
          enableItems();
          toolbarObj.items[22].disabled = false;
          toolbarObj.items[23].disabled = false;
          toolbarObj.items[27].disabled = false;
          if (selectedItems.length > 2) {
            toolbarObj.items[23].disabled = false;
          } else {
            toolbarObj.items[23].disabled = true;
          }
        }
      }
}

function historyChange(args:any){
    if (diagram.historyManager.undoStack.length > 0) {
        toolbarObj.items[10].disabled = false;
      } else {
        toolbarObj.items[10].disabled = true;
      }
      if (diagram.historyManager.redoStack.length > 0) {
        toolbarObj.items[11].disabled = false;
      } else {
        toolbarObj.items[11].disabled = true;
      }
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
    let uploadObject:Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },success: onUploadSuccess,showFileList:false
        
    });
    uploadObject.appendTo('#fileupload');
    function printDiagram(args:any) {
        let options: IExportOptions = {};
        options.mode = 'Download';
        options.region = 'Content';
        options.multiplePage = diagram.pageSettings.multiplePage;
        options.pageHeight = diagram.pageSettings.height;
        options.pageWidth = diagram.pageSettings.width;
        diagram.print(options);
      }
      function enableItems()
      {
        toolbarObj.items[6].disabled = false;
        toolbarObj.items[7].disabled = false;
        toolbarObj.items[19].disabled = false;
        toolbarObj.items[20].disabled = false;
        toolbarObj.items[25].disabled = false;
        toolbarObj.items[29].disabled = false;
        toolbarObj.items[31].disabled = false;
      }
      function disableMultiselectedItems()
      {
        toolbarObj.items[22].disabled = true;
        toolbarObj.items[23].disabled = true;
        toolbarObj.items[27].disabled = true;
      }
      function toolbarClick(args:any) {
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
            toolbarObj.items[8].disabled = false;
            break;
          case 'Copy':
            diagram.copy();
            toolbarObj.items[8].disabled = false;
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
      function zoomChange(args:any){
        let zoomCurrentValue:any = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
        let currentZoom:any = diagram.scrollSettings.currentZoom;
        let zoom:any = {};
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
                    if(currentZoom === 0.5){
                      currentZoom = 0;
                      zoom.zoomFactor = (0.5 / currentZoom) - 1;
                      diagram.zoomTo(zoom);
                    }
                    else{
                      zoom.zoomFactor = (0.5 / currentZoom) - 1;
                      diagram.zoomTo(zoom);
                    }
                    break;
                case 'Zoom to 100%':
                    if(currentZoom === 1){
                      currentZoom = 0;
                      zoom.zoomFactor = (1 / currentZoom) - 1;
                      diagram.zoomTo(zoom);
                    }
                    else{
                      zoom.zoomFactor = (1 / currentZoom) - 1;
                      diagram.zoomTo(zoom);
                    }
                    break;
                case 'Zoom to 200%':
                    if(currentZoom === 2){
                      currentZoom = 0;
                      zoom.zoomFactor = (2 / currentZoom) - 1;
                      diagram.zoomTo(zoom);
                    }
                    else{
                      zoom.zoomFactor = (2 / currentZoom) - 1;
                      diagram.zoomTo(zoom);
                    }
                    break;
            }
          
            zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom*100) + ' %';
            
      }
      let asyncSettings:any;
      function onConnectorSelect(args:any){
        diagram.clearSelection();
        diagram.drawingObject = {type:args.item.text};
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.selectedItems.userHandles = [];
        diagram.dataBind();
      }
      
      function onShapesSelect(args:any){
        diagram.clearSelection();
        diagram.drawingObject = {shape:{shape:args.item.text}};
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.selectedItems.userHandles = [];
        diagram.dataBind();
      }
      //Export the diagraming object based on the format.
      function onselectExport(args:any) {
        let exportOptions: IExportOptions = {};
        exportOptions.format = args.item.text;
        exportOptions.mode = 'Download';
        exportOptions.region = 'PageSettings';
        exportOptions.fileName = 'Export';
        exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
        diagram.exportDiagram(exportOptions);
      }
      
      function onSelectGroup(args:any){
        if(args.item.text === 'Group'){
            diagram.group();
        }
        else if(args.item.text === 'Ungroup'){
            diagram.unGroup();
        }
      }
      
      function onSelectAlignObjects(args:any){
        let item:any = args.item.text;
        let alignType = item.replace('Align', '');
        let alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
        diagram.align(alignType1.trim());
      }
      function onSelectDistributeObjects(args:any){
        if(args.item.text === 'Distribute Objects Vertically'){
            diagram.distribute('BottomToTop');
        }
        else{
            diagram.distribute('RightToLeft');
        }
      }
      function onSelectOrder(args:any){
        switch(args.item.text){
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
      
      function onSelectRotate(args:any){
        if(args.item.text === 'Rotate Clockwise'){
            diagram.rotate(diagram.selectedItems,90);
        }
        else{
            diagram.rotate(diagram.selectedItems,-90);
        }
      }
      function onSelectFlip(args:any){
        flipObjects(args.item.text);
      }
      
      // To flip diagram objects
      function flipObjects(flipType:any)
      {
        let selectedObjects = diagram.selectedItems.nodes.concat((diagram.selectedItems as any).connectors);
      for(let i:number=0;i<selectedObjects.length;i++)
      {
        selectedObjects[i].flip = flipType === 'Flip Horizontal'? 'Horizontal':'Vertical';
      }
      diagram.dataBind();
      }
    function onUploadSuccess(args:any) {
        let file = args.file;
        let rawFile = file.rawFile;
        let reader = new FileReader();
        reader.readAsText(rawFile);
        reader.onloadend = loadDiagram;
      }
      function loadDiagram(event:any){
        diagram.loadDiagram(event.target.result);
      }


function download(data:any){
    if((window.navigator as any).msSaveBlob){
        let blob: Blob  = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
        let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        let ele = document.createElement('a'); 
        ele.href = dataString; 
        ele.download = 'Diagram.json';
        document.body.appendChild(ele);
        ele.click();
        ele.remove();
    }
}

// To lock diagram object
function lockObject (args:any) {
    for (let i:number = 0; i < diagram.selectedItems.nodes.length; i++) {
        let node = diagram.selectedItems.nodes[i];
          if (node.constraints & NodeConstraints.Drag) {
              node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
          } else {
              node.constraints = NodeConstraints.Default;
          }
      }
      for (let j:number = 0; j < diagram.selectedItems.connectors.length; j++) {
        let connector = diagram.selectedItems.connectors[j];
          if (connector.constraints & ConnectorConstraints.Drag) {
              connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
          } else {
              connector.constraints = ConnectorConstraints.Default;
          }
      }
      diagram.dataBind();
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
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
            style: { strokeWidth: 1, strokeColor: '#757575' }
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
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
        getNodeDefaults: getSymbolDefaults, getSymbolInfo: getSymbolInfo
    });
    palette.appendTo('#symbolpalette');

    addEvents();
};
