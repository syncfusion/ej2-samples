import { loadCultureFiles } from '../common/culture-loader';
import {
    Diagram,
    NodeModel,
  } from '@syncfusion/ej2-diagrams';
  import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { NodeConstraints, UndoRedo } from '@syncfusion/ej2/diagrams';
Diagram.Inject(UndoRedo);

let toolbarObj: Toolbar
let diagram: Diagram
let nodes: NodeModel[] = [
    {
        shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 40
    },
    {
        id: 'node1', width: 60, height: 40, offsetX: 150, offsetY: 100, style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
        id: 'node2', width: 80, height: 40, offsetX: 150, offsetY: 170, style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
        id: 'node3', width: 100, height: 40, offsetX: 150, offsetY: 240, style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
        shape: { type: 'Text', content: 'Try Alignment Commandss(AlignRight, AlignLeft \n and AlignCenter)' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 310
    },
    {
        shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 380
    },
    {
        id: 'node4', width: 40, height: 60, offsetX: 80, offsetY: 470, style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
        id: 'node5', width: 40, height: 80, offsetX: 160, offsetY: 470, style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
        id: 'node6', width: 40, height: 100, offsetX: 240, offsetY: 470, style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
        shape: { type: 'Text', content: 'Try Alignment Commandss(AlignTop, AlignBottom \n and AlignMiddle)' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 150, offsetY: 550
    },
    {
        shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 40
    },
    {
        id: 'node7', width: 80, height: 40, offsetX: 475, offsetY: 100, style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
        id: 'node8', width: 80, height: 40, offsetX: 625, offsetY: 100, style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
        id: 'node9', width: 80, height: 40, offsetX: 595, offsetY: 180, style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
        shape: { type: 'Text', content: 'Try SpaceAcross Commands' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 240
    },
    {
        shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 320
    },
    {
        id: 'node10', width: 80, height: 40, offsetX: 475, offsetY: 400, style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
        id: 'node11', width: 80, height: 40, offsetX: 475, offsetY: 500, style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
        id: 'node12', width: 80, height: 40, offsetX: 625, offsetY: 430, style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
        shape: { type: 'Text', content: 'Try SpaceAcross Commands' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 550, offsetY: 550
    },
    {
        shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 40
    },
    {
        id: 'RightTriangle', width: 100, height: 100, offsetX: 950, offsetY: 120, style: { fill: '#E0E5BB', strokeColor: 'white' },
        shape: { type: 'Basic', shape: 'RightTriangle' },
    },
    {
        shape: { type: 'Text', content: 'Try Flip Commands' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 240
    },
    {
        shape: { type: 'Text', content: 'Select the below shapes' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 300
    },
    {
        id: 'node14', width: 60, height: 20, offsetX: 950, offsetY: 350, style: { fill: '#DAEBFF', strokeColor: 'white' },
    },
    {
        id: 'node15', width: 80, height: 40, offsetX: 950, offsetY: 420, style: { fill: '#F5E0F7', strokeColor: 'white' },
    },
    {
        id: 'node16', width: 100, height: 50, offsetX: 950, offsetY: 500, style: { fill: '#E0E5BB', strokeColor: 'white' },
    },
    {
        shape: { type: 'Text', content: 'Try Sizing Commands' }, constraints: NodeConstraints.PointerEvents,
        style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 }, offsetX: 950, offsetY: 550
    }
];

function historyChange(args:any) {
    // Check if undo stack is empty or not
    if (diagram.historyManager.undoStack.length > 0) {
      toolbarObj.items[3].disabled = false;
    } else {
      toolbarObj.items[3].disabled = true;
    }
    // Check if redo stack is empty or not
    if (diagram.historyManager.redoStack.length > 0) {
      toolbarObj.items[4].disabled = false;
    } else {
      toolbarObj.items[4].disabled = true;
    }
  }

  function selectionChange(args:any) {
    if (args.state === 'Changed') {
      if (args.type === 'Addition') {
        if (args.newValue.length > 0) {
          onClickDisable(false, args.newValue);
        }
      } else {
        onClickDisable(true, args.newValue);
      }
    }
  }

  function onClickDisable(args:any, selectedItems:any) {
    if (args === false) {
      toolbarObj.items[0].disabled = false;
      toolbarObj.items[1].disabled = false;
      toolbarObj.items[13].disabled = false;
      toolbarObj.items[14].disabled = false;
      if (selectedItems.length === 1) {
        toolbarObj.items[16].disabled =
          selectedItems[0].id === 'RightTriangle' ? false : true;
        toolbarObj.items[17].disabled =
          selectedItems[0].id === 'RightTriangle' ? false : true;
        disableCommonItems(true);
      } else if (selectedItems.length > 1) {
        disableCommonItems(false);
      }
    } else {
      toolbarObj.items[0].disabled = true;
      toolbarObj.items[1].disabled = true;
      toolbarObj.items[13].disabled = true;
      toolbarObj.items[14].disabled = true;
      toolbarObj.items[16].disabled = true;
      toolbarObj.items[17].disabled = true;
      disableCommonItems(true);
    }
  }
  function disableCommonItems(args:any) {
    toolbarObj.items[6].disabled = args;
    toolbarObj.items[7].disabled = args;
    toolbarObj.items[8].disabled = args;
    toolbarObj.items[9].disabled = args;
    toolbarObj.items[10].disabled = args;
    toolbarObj.items[11].disabled = args;
    toolbarObj.items[19].disabled = args;
    toolbarObj.items[20].disabled = args;
    toolbarObj.items[22].disabled = args;
    toolbarObj.items[23].disabled = args;
    toolbarObj.items[24].disabled = args;
  }
  function onItemClick(args:any) {
    let item:any = args.item.tooltipText;
    switch (args.item.tooltipText) {
      case 'Cut':
        diagram.cut();
        toolbarObj.items[2].disabled = false;
        break;
      case 'Copy':
        diagram.copy();
        toolbarObj.items[2].disabled = false;
        break;
      case 'Paste':
        diagram.paste();
        break;
      case 'Undo':
        diagram.undo();
        break;
      case 'Redo':
        diagram.redo();
        break;
      case 'Align Left':
      case 'Align Right':
      case 'Align Top':
      case 'Align Bottom':
      case 'Align Middle':
      case 'Align Center':
        let alignType = item.replace('Align', '');
        let alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
        diagram.align(alignType1.trim());
        break;
      case 'Rotate Right':
        diagram.rotate(diagram.selectedItems, 90);
        break;
      case 'Rotate Left':
        diagram.rotate(diagram.selectedItems, -90);
        break;
      case 'Flip Vertical':
        flipObjects(item);
        break;
      case 'Flip Horizontal':
        flipObjects(item);
        break;
      case 'Distribute Objects Horizontally':
        diagram.distribute('RightToLeft');
        break;
      case 'Distribute Objects Vertically':
        diagram.distribute('BottomToTop');
        break;
      case 'Same Width':
        diagram.sameSize('Width', diagram.selectedItems.nodes);
        break;
      case 'Same Height':
        diagram.sameSize('Height', diagram.selectedItems.nodes);
        break;
      case 'Same Size':
        diagram.sameSize('Size', diagram.selectedItems.nodes);
        break;
    }
  }

  function flipObjects(flipType:any) {
    let selectedObjects:any = diagram.selectedItems.nodes.concat(
      (diagram.selectedItems as any).connectors
    );
    for (let i:number = 0; i < selectedObjects.length; i++) {
      selectedObjects[i].flip =
        flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
    }
    diagram.dataBind();
  }
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    const Window:any = window.location.href
    if(Window){
      if(Window.includes('bootstrap5')){
          (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap5_Diagram_Builder/style.css';
      }
      else if(Window.includes('bootstrap4')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/bootstrap4_Diagram_Builder/style.css';
      }
      else if(Window.includes('bootstrap')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap_Diagram_Builder/style.css';
      }
      else if(Window.includes('material3')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material3_Diagram_Builder/style.css';
      }
      else if(Window.includes('material')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material_Diagram_Builder/style.css';
      }
      else if(Window.includes('fabric')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/fabric_Diagram_Builder/style.css';
      }
      else if(Window.includes('fluent')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fluent_Diagram_Builder/style.css';
      }
      else if(Window.includes('tailwind')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Tailwind_Diagram_Builder/style.css';
      }
      else if(Window.includes('highcontrast')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/HighContrast_Diagram_Builder/style.css';
      }
      else if(Window.includes('fusion')){
        (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fusion_Diagram_Builder/style.css';
      }
    }
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%', height: '800px',
        nodes: nodes,
        //Defines the default node and connector properties
        getNodeDefaults: function (obj:Node) {
            return obj;
        },
        rulerSettings: { showRulers: true },
        selectionChange: selectionChange,
        historyChange: historyChange,
    });
    diagram.appendTo('#diagram');

    
    toolbarObj= new Toolbar({
    clicked: onItemClick,
    items: [
        {
            prefixIcon: 'e-icons e-cut', tooltipText: 'Cut', disabled: true
        },
        {
            prefixIcon: 'e-icons e-copy', tooltipText: 'Copy', disabled: true
        },
        {
            prefixIcon: 'e-icons e-paste', tooltipText: 'Paste', disabled: true
        },
        {
            prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', disabled: true
        },
        {
            prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', disabled: true
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-align-left-1', tooltipText: 'Align Left', disabled: true
        },
        {
            prefixIcon: 'sf-icon-align-center-1', tooltipText: 'Align Center', disabled: true
        },
        {
            prefixIcon: 'sf-icon-align-right-1', tooltipText: 'Align Right', disabled: true
        },
        {
            prefixIcon: 'sf-icon-align-top-1', tooltipText: 'Align Top', disabled: true
        },
        {
            prefixIcon: 'sf-icon-align-middle-1', tooltipText: 'Align Middle', disabled: true
        },
        {
            prefixIcon: 'sf-icon-align-bottom-1', tooltipText: 'Align Bottom', disabled: true
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-transform-right', tooltipText: 'Rotate Right', disabled: true
        },
        {
            prefixIcon: 'e-icons e-transform-left', tooltipText: 'Rotate Left', disabled: true
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'e-icons e-flip-vertical', tooltipText: 'Flip Vertical', disabled: true
        },
        {
            prefixIcon: 'e-icons e-flip-horizontal', tooltipText: 'Flip Horizontal', disabled: true
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-distribute-horizontal', tooltipText: 'Distribute Objects Horizontally', disabled: true
        },
        {
            prefixIcon: 'sf-icon-distribute-vertical', tooltipText: 'Distribute Objects Vertically', disabled: true
        },
        {
            type: 'Separator'
        },
        {
            prefixIcon: 'sf-icon-same-width', tooltipText: 'Same Width', disabled: true
        },
        {
            prefixIcon: 'sf-icon-same-height', tooltipText: 'Same Height', disabled: true
        },
        {
            prefixIcon: 'sf-icon-same-size', tooltipText: 'Same Size', disabled: true
        }
    ],
  });
  toolbarObj.appendTo('#toolbar');

};
