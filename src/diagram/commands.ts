import { loadCultureFiles } from '../common/culture-loader';
import {
  Diagram,
  NodeModel,
} from '@syncfusion/ej2-diagrams';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { NodeConstraints, UndoRedo } from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo);

let toolbarObj: Toolbar
let diagram: Diagram

// Function to create a text node
function createTextNode(content: string, offsetX: number, offsetY: number): NodeModel {
  return {
    shape: { type: 'Text', content: content },
    constraints: NodeConstraints.PointerEvents,
    style: { fontSize: 10, fill: 'None', fontFamily: 'sans-serif', strokeWidth: 0 },
    offsetX: offsetX,
    offsetY: offsetY
  };
}

// Function to create a basic or flow node
function CreateNode(id: string, width: number, height: number, fill: string, offsetX: number, offsetY: number): NodeModel {
  return {
    id: id,
    width: width,
    height: height,
    offsetX: offsetX,
    offsetY: offsetY,
    style: { fill: fill, strokeColor: 'white' }
  };
}

//Initializes the nodes for the diagram
const nodes: any = [
  createTextNode('Select the below shapes', 150, 40),
  CreateNode('node1', 60, 40, '#DAEBFF', 150, 100),
  CreateNode('node2', 80, 40, '#F5E0F7', 150, 170),
  CreateNode('node3', 100, 40, '#E0E5BB', 150, 240),
  createTextNode('Try Alignment Commands (AlignRight, AlignLeft\nand AlignCenter)', 150, 310),

  createTextNode('Select the below shapes', 150, 380),
  CreateNode('node4', 40, 60, '#DAEBFF', 80, 470),
  CreateNode('node5', 40, 80, '#F5E0F7', 160, 470),
  CreateNode('node6', 40, 100, '#E0E5BB', 240, 470),
  createTextNode('Try Alignment Commands (AlignTop, AlignBottom\nand AlignMiddle)', 150, 550),

  createTextNode('Select the below shapes', 550, 40),
  CreateNode('node7', 80, 40, '#DAEBFF', 475, 100),
  CreateNode('node8', 80, 40, '#F5E0F7', 625, 100),
  CreateNode('node9', 80, 40, '#E0E5BB', 595, 180),
  createTextNode('Try SpaceAcross Commands', 550, 240),

  createTextNode('Select the below shapes', 550, 320),
  CreateNode('node10', 80, 40, '#DAEBFF', 475, 400),
  CreateNode('node11', 80, 40, '#F5E0F7', 475, 500),
  CreateNode('node12', 80, 40, '#E0E5BB', 625, 430),
  createTextNode('Try SpaceAcross Commands', 550, 550),

  createTextNode('Select the below shapes', 950, 40),
  {
    id: 'RightTriangle', width: 100, height: 100, offsetX: 950, offsetY: 120, style: { fill: '#E0E5BB', strokeColor: 'white' },
    shape: { type: 'Basic', shape: 'RightTriangle' },
  },
  createTextNode('Try Flip Commands', 950, 240),

  createTextNode('Select the below shapes', 950, 300),
  CreateNode('node14', 60, 20, '#DAEBFF', 950, 350),
  CreateNode('node15', 80, 40, '#F5E0F7', 950, 420),
  CreateNode('node16', 100, 50, '#E0E5BB', 950, 500),
  createTextNode('Try Sizing Commands (Same width, Same height, Same size)', 950, 550)
];

function historyChange(args: any) {
  // Update toolbar items based on undo/redo stack availability
  updateToolbarItems(['undo'], diagram.historyManager.undoStack.length === 0);
  updateToolbarItems(['redo'], diagram.historyManager.redoStack.length === 0);
}

//Handle selection change in the diagram.
function selectionChange(args: any) {
  if (args.state === 'Changed') {
    const selectedItems = args.newValue;
    if (args.type === 'Addition' && selectedItems.length > 0 ) {
        enableToolbarItems(selectedItems);
    } else {
      disableToolbarItems();
    }
  }
}

//Enable or disable toolbar items based on selection state.
function enableToolbarItems( selectedItems: any) {
  disableToolbarItems();
  updateToolbarItems(['cut', 'copy', 'transform_left', 'transform_right'], false);
    if (selectedItems.length === 1) {
      if (selectedItems[0].id === "RightTriangle") {
        updateToolbarItems(['flip_horizontal', 'flip_vertical'], false);
      }
    }
    else if (selectedItems.length > 1) {
      updateToolbarItems(['align_left', 'align_center', 'align_right', 'align_top', 'align_middle', 'align_bottom', 'distribute_horizontal', 'distribute_vertical', 'same_width', 'same_height', 'same_size'], false);
    }
  }
 
//Function to disable common toolbat items
function disableToolbarItems() {
  updateToolbarItems(['cut', 'copy', 'align_left', 'align_center', 'align_right', 'align_top', 'align_middle', 'align_bottom', 'transform_left', 'transform_right', 'flip_vertical', 'flip_horizontal', 'distribute_horizontal', 'distribute_vertical', 'same_width', 'same_height', 'same_size'], true);
}


// Enable or disable specific toolbar items
function updateToolbarItems(itemIds: string[], disabled: boolean) {
  itemIds.forEach(itemId => {
      const item = toolbarObj.items.find(item => item.id === itemId);
      if (item) {
          item.disabled = disabled;
      }
  });
}

// Handle toolbar item click events
function onItemClick(args: any) {
  let item: any = args.item.tooltipText;
  switch (args.item.tooltipText) {
    case 'Cut':
      diagram.cut();
      updateToolbarItems(['paste'], false);
     break;
    case 'Copy':
      diagram.copy();
      updateToolbarItems(['paste'], false);
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

//Function to flip objects
function flipObjects(flipType: any) {
  let selectedObjects: any = diagram.selectedItems.nodes.concat((diagram.selectedItems as any).connectors);
  for (let i: number = 0; i < selectedObjects.length; i++) {
    selectedObjects[i].flip = flipType === 'Flip Horizontal' ? 'Horizontal' : 'Vertical';
  }
  diagram.dataBind();
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
  loadCultureFiles();
  const Window: any = window.location.href
  if (Window) {
    if (Window.includes('bootstrap5')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap5_Diagram_Builder/style.css';
    }
    else if (Window.includes('bootstrap4')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/bootstrap4_Diagram_Builder/style.css';
    }
    else if (Window.includes('bootstrap')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Bootstrap_Diagram_Builder/style.css';
    }
    else if (Window.includes('material3')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material3_Diagram_Builder/style.css';
    }
    else if (Window.includes('material')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Material_Diagram_Builder/style.css';
    }
    else if (Window.includes('fabric')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/fabric_Diagram_Builder/style.css';
    }
    else if (Window.includes('fluent')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fluent_Diagram_Builder/style.css';
    }
    else if (Window.includes('tailwind')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Tailwind_Diagram_Builder/style.css';
    }
    else if (Window.includes('highcontrast')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/HighContrast_Diagram_Builder/style.css';
    }
    else if (Window.includes('fusion')) {
      (document.getElementById('change_icons') as any).href = '../../src/diagram/styles/Diagram_Builder_EJ2_Icon/Font/Fusion_Diagram_Builder/style.css';
    }
  }
  // Initializtion of the diagram.
  diagram = new Diagram({
    width: '100%', height: '800px',
    nodes: nodes,
    //Defines the default node and connector properties
    getNodeDefaults: function (obj: Node) {
      return obj;
    },
    rulerSettings: { showRulers: true },
    selectionChange: selectionChange,
    historyChange: historyChange,
  });
  diagram.appendTo('#diagram');

  //Initialize toolbar items.
  toolbarObj = new Toolbar({
    clicked: onItemClick,
    items: [
      { prefixIcon: 'e-icons e-cut', tooltipText: 'Cut', disabled: true, id: 'cut' },
      { prefixIcon: 'e-icons e-copy', tooltipText: 'Copy', disabled: true, id: 'copy' },
      { prefixIcon: 'e-icons e-paste', tooltipText: 'Paste', disabled: true, id: 'paste' },
      { prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', disabled: true, id: 'undo' },
      { prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', disabled: true, id: 'redo' },

      { type: 'Separator', id: 'seperator1' },

      { prefixIcon: 'sf-icon-align-left-1', tooltipText: 'Align Left', disabled: true, id: 'align_left' },
      { prefixIcon: 'sf-icon-align-center-1', tooltipText: 'Align Center', disabled: true, id: 'align_center' },
      { prefixIcon: 'sf-icon-align-right-1', tooltipText: 'Align Right', disabled: true, id: 'align_right' },
      { prefixIcon: 'sf-icon-align-top-1', tooltipText: 'Align Top', disabled: true, id: 'align_top' },
      { prefixIcon: 'sf-icon-align-middle-1', tooltipText: 'Align Middle', disabled: true, id: 'align_middle' },
      { prefixIcon: 'sf-icon-align-bottom-1', tooltipText: 'Align Bottom', disabled: true, id: 'align_bottom' },

      { type: 'Separator', id: 'seperator2' },

      { prefixIcon: 'e-icons e-transform-right', tooltipText: 'Rotate Right', disabled: true, id: 'transform_right' },
      { prefixIcon: 'e-icons e-transform-left', tooltipText: 'Rotate Left', disabled: true, id: 'transform_left' },

      { type: 'Separator', id: 'seperator3' },

      { prefixIcon: 'e-icons e-flip-vertical', tooltipText: 'Flip Vertical', disabled: true, id: 'flip_vertical' },
      { prefixIcon: 'e-icons e-flip-horizontal', tooltipText: 'Flip Horizontal', disabled: true, id: 'flip_horizontal' },

      { type: 'Separator', id: 'seperator4' },

      { prefixIcon: 'sf-icon-distribute-horizontal', tooltipText: 'Distribute Objects Horizontally', disabled: true, id: 'distribute_horizontal' },
      { prefixIcon: 'sf-icon-distribute-vertical', tooltipText: 'Distribute Objects Vertically', disabled: true, id: 'distribute_vertical' },

      { type: 'Separator', id: 'seperator5' },

      { prefixIcon: 'sf-icon-same-width', tooltipText: 'Same Width', disabled: true, id: 'same_width' },
      { prefixIcon: 'sf-icon-same-height', tooltipText: 'Same Height', disabled: true, id: 'same_height' },
      { prefixIcon: 'sf-icon-same-size', tooltipText: 'Same Size', disabled: true, id: 'same_size' }
    ],
  });
  toolbarObj.appendTo('#toolbar');

};

