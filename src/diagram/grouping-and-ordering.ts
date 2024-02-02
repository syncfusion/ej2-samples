import { loadCultureFiles } from '../common/culture-loader';
import {
    NodeModel,
    Node,
    Diagram,
    ISelectionChangeEventArgs,
    SelectorConstraints,
    UserHandleModel,
  } from '@syncfusion/ej2-diagrams';
  import {
    ColorPicker,
    ColorPickerEventArgs,
    NumericTextBox,
    ChangeEventArgs as NumericChangeEventArgs,
  } from '@syncfusion/ej2-inputs';
import { ConnectorModel, SymbolPalette, TextStyleModel } from '@syncfusion/ej2/diagrams';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {ClickEventArgs, Toolbar } from '@syncfusion/ej2-navigations';


let diagram: Diagram;
let toolbarItems: Toolbar;
let drawingNode: any;
let nodes: NodeModel[] = [
  {
    id: 'Diamond',
    // Position of the node
    offsetX: 350,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 100,
    shape: { type: 'Basic', shape: 'Diamond' },
    annotations: [
      {
        content: 'Decision',
      },
    ],
  },
  {
    id: 'ellipse',
    // Position of the node
    offsetX: 150,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Ellipse' },
    annotations: [
      {
        content: 'Start/Stop',
      },
    ],
  },
  {
    id: 'node1',
    // Position of the node
    offsetX: 150,
    offsetY: 100,
    // Size of the node
    width: 100,
    height: 55,
    shape: { type: 'Basic', shape: 'Rectangle' },
  },
  {
    id: 'node2',
    // Position of the node
    offsetX: 350,
    offsetY: 100,
    // Size of the node
    width: 90,
    height: 55,
    // style: { fill: '#6BA5D7', strokeColor: 'white' },
    shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 },
  },
  {
    id: 'group',
    children: ['node1', 'node2'],
    padding: { left: 10, right: 10, top: 10, bottom: 10 },
    annotations: [
      {
        content: 'Group 1',
      },
    ],
  },
  {
    id: 'rectangle',
    // Position of the node
    offsetX: 150,
    offsetY: 400,
    // Size of the node
    width: 100,
    height: 60,
    shape: { type: 'Basic', shape: 'Rectangle' },
    annotations: [
      {
        content: 'Process',
      },
    ],
  },
];

let handles: UserHandleModel[] = [
  {
    name: 'Clone',
    pathData:
      'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
    tooltip: { content: 'Clone' },
    visible: true,
    offset: 1,
    side: 'Bottom',
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  },
  {
    name: 'Delete',
    pathData:
      'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
    tooltip: { content: 'Delete' },
    visible: true,
    offset: 0,
    side: 'Bottom',
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  },
  {
    name: 'Draw',
    pathData:
      'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
    tooltip: { content: 'Draw' },
    visible: true,
    offset: 0.5,
    side: 'Right',
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  },
];

let basicShapes: NodeModel[] = [
  {
    id: 'Rectangle',
    shape: { type: 'Basic', shape: 'Rectangle' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Ellipse',
    shape: { type: 'Basic', shape: 'Ellipse' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Hexagon',
    shape: { type: 'Basic', shape: 'Hexagon' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Parallelogram',
    shape: { type: 'Basic', shape: 'Parallelogram' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Triangle',
    shape: { type: 'Basic', shape: 'Triangle' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Plus',
    shape: { type: 'Basic', shape: 'Plus' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Star',
    shape: { type: 'Basic', shape: 'Star' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Pentagon',
    shape: { type: 'Basic', shape: 'Pentagon' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Heptagon',
    shape: { type: 'Basic', shape: 'Heptagon' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Octagon',
    shape: { type: 'Basic', shape: 'Octagon' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Trapezoid',
    shape: { type: 'Basic', shape: 'Trapezoid' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Decagon',
    shape: { type: 'Basic', shape: 'Decagon' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'RightTriangle',
    shape: { type: 'Basic', shape: 'RightTriangle' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Cylinder',
    shape: { type: 'Basic', shape: 'Cylinder' },
    style: { strokeWidth: 2 },
  },
  {
    id: 'Diamond',
    shape: { type: 'Basic', shape: 'Diamond' },
    style: { strokeWidth: 2 },
  },
];


function selectionChange(args: ISelectionChangeEventArgs) {
    if (args.state === 'Changed') {
      let selectedItems:any = [];
      selectedItems = selectedItems.concat(
        diagram.selectedItems.nodes,
        diagram.selectedItems.connectors
      );
      if (selectedItems.length === 0) {
        toolbarItems.items[0].disabled = true;
        toolbarItems.items[1].disabled = true;
        toolbarItems.items[3].disabled = true;
        toolbarItems.items[4].disabled = true;
        toolbarItems.items[5].disabled = true;
        toolbarItems.items[6].disabled = true;
        toolbarItems.items[8].disabled = true;
        toolbarItems.items[10].disabled = true;
        toolbarItems.items[11].disabled = true;
        toolbarItems.items[12].disabled = true;
        toolbarItems.items[13].disabled = true;
        toolbarItems.items[14].disabled = true;
      }
      if (selectedItems.length === 1) {
        enableItems();
        disableMultiselectedItems(selectedItems);
  
        if (
          selectedItems[0].children !== undefined &&
          selectedItems[0].children.length > 0
        ) {
          toolbarItems.items[1].disabled = false;
          disableMultiselectedItems(selectedItems);
        } else {
          toolbarItems.items[1].disabled = true;
        }
      }
      if (selectedItems.length > 1) {
        enableItems();
        toolbarItems.items[0].disabled = false;
        toolbarItems.items[1].disabled = true;
        disableMultiselectedItems(selectedItems);
      }
      if (
        args.newValue.length > 0 &&
        (args.newValue[0] as ConnectorModel).sourceID === undefined
      ) {
        diagram.selectedItems = {
          constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
          userHandles: handles,
        };
        if (diagram.selectedItems.nodes.length > 0) {
          drawingNode =
            diagram.selectedItems.nodes[diagram.selectedItems.nodes.length - 1];
        }
      } else {
        diagram.selectedItems = {
          constraints: SelectorConstraints.All & ~SelectorConstraints.UserHandle,
        };
      }
    }
  }
  
  function enableItems() {
    toolbarItems.items[3].disabled = false;
    toolbarItems.items[4].disabled = false;
    toolbarItems.items[5].disabled = false;
    toolbarItems.items[6].disabled = false;
  }
  
  // method to disable toolbar items
  function disableMultiselectedItems(selectedItems: any) {
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].annotations[0] !== undefined) {
        toolbarItems.items[8].disabled = false;
        toolbarItems.items[10].disabled = false;
        toolbarItems.items[11].disabled = false;
        toolbarItems.items[12].disabled = false;
        toolbarItems.items[13].disabled = false;
        toolbarItems.items[14].disabled = false;
      } else {
        toolbarItems.items[8].disabled = true;
        toolbarItems.items[10].disabled = true;
        toolbarItems.items[11].disabled = true;
        toolbarItems.items[12].disabled = true;
        toolbarItems.items[13].disabled = true;
        toolbarItems.items[14].disabled = true;
      }
    }
  }
  function userHandleClick(args: any) {
    switch (args.element.name) {
      case 'Delete':
        diagram.remove();
        break;
      case 'Clone':
        diagram.paste(diagram.selectedItems.selectedObjects);
        break;
      case 'Draw':
        diagram.drawingObject.shape = {};
        (diagram.drawingObject as any).type = (diagram.drawingObject as any).type
          ? (diagram.drawingObject as any).type
          : 'Orthogonal';
        (diagram.drawingObject as any).sourceID = (drawingNode as any).id;
        diagram.dataBind();
        break;
    }
  }
  
  //Apply the appearence of the Annotation
  function updateAnnotationValue(
    value: string,
    fontSize?: number,
    fontFamily?: string,
    index?: number,
    isSelected?: boolean
  ): void {
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
      let node: NodeModel = diagram.selectedItems.nodes[i];
      for (let j: number = 0; j < node.annotations.length; j++) {
        let annotationStyle: TextStyleModel = node.annotations[j]
          .style as TextStyleModel;
        if (value === 'fontsize') {
          annotationStyle.fontSize = fontSize;
        } else if (value === 'fontfamily') {
          annotationStyle.fontFamily = fontFamily;
        } else if (value === 'bold') {
          annotationStyle.bold = !annotationStyle.bold;
          isSelected = annotationStyle.bold;
        } else if (value === 'italic') {
          annotationStyle.italic = !annotationStyle.italic;
          isSelected = annotationStyle.italic;
        } else if (value === 'underline') {
          if (annotationStyle.textDecoration === 'None') {
            annotationStyle.textDecoration = 'Underline';
            isSelected = true;
          } else {
            annotationStyle.textDecoration = 'None';
            isSelected = false;
          }
        }
      }
      let toolbarTextStyle: any = document.getElementById('toolbarEditor');
      if (toolbarTextStyle) {
        toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
      }
      if (toolbarTextStyle.items[index] !== undefined) {
        let cssClass: any = toolbarTextStyle.items[index].cssClass;
        toolbarTextStyle.items[index].cssClass = isSelected
          ? cssClass + ' tb-item-selected'
          : cssClass.replace(' tb-item-selected', '');
        toolbarTextStyle.dataBind();
      }
      diagram.dataBind();
    }
  }
  
  function toolbarClick(args: ClickEventArgs): void {
    switch (args.item.tooltipText) {
      case 'Group':
        diagram.group();
        toolbarItems.items[0].disabled = true;
        toolbarItems.items[1].disabled = false;
        break;
      case 'UnGroup':
        diagram.unGroup();
        break;
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
      case 'Bold':
        updateAnnotationValue('bold', null, null, 11);
        break;
      case 'Italic':
        updateAnnotationValue('italic', null, null, 12);
        break;
      case 'Underline':
        updateAnnotationValue('underline', null, null, 13);
        break;
    }
  }

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%',
        height: 500,
        nodes: nodes,
        rulerSettings: { showRulers: true },
        drawingObject: { type: 'Orthogonal' },
        onUserHandleMouseDown: userHandleClick,
        selectionChange: selectionChange,
    });
    diagram.appendTo('#diagram');

  let palette: SymbolPalette = new SymbolPalette({
    expandMode: 'Multiple',
    symbolMargin: { left: 5, right: 5, top: 5, bottom: 10 },
    symbolHeight: 50,
    symbolWidth: 50,
    palettes: [
      {
        id: 'basicShapes',
        expanded: true,
        symbols: basicShapes,
        iconCss: 'e-ddb-icons e-flow',
        title: 'Basic Shapes',
      },
    ],
    width: '100%',
    height: '100%',
  });
  palette.appendTo('#symbolpalette');

 //FontType Collection
let fontTypeList: { [key: string]: Object }[] = [
    { type: 'Arial', text: 'Arial' },
    { type: 'Aharoni', text: 'Aharoni' },
    { type: 'Bell MT', text: 'Bell MT' },
    { type: 'Fantasy', text: 'Fantasy' },
    { type: 'Times New Roman', text: 'Times New Roman' },
    { type: 'Segoe UI', text: 'Segoe UI' },
    { type: 'Verdana', text: 'Verdana' },
  ];
  
  //DropDownList used to apply for fontFamily of the Annotation
  let fontFamily: DropDownList = new DropDownList({
    dataSource: fontTypeList,
    fields: { value: 'type', text: 'text' },
    popupWidth: 150,
    width: '100%',
    placeholder: 'select a font type',
    index: 0,
    change: (args: any) => {
      updateAnnotationValue('fontfamily', null, args.value.toString());
    },
  });
  fontFamily.appendTo('#fontfamily');
  //NumericTextBox used to apply for Fontsize of the Annotation
  
  let fontSize: NumericTextBox = new NumericTextBox({
    value: 12,
    min: 1,
    max: 30,
    width: '90px',
    format: '##.##',
    step: 2,
    change: (args: NumericChangeEventArgs) => {
      updateAnnotationValue('fontsize', args.value);
    },
  });
  fontSize.appendTo('#fontSize');
  
  //Colorpicker used to apply for Color of the Annotation
  let fontColor: ColorPicker = new ColorPicker({
    mode: 'Palette',
    value: '#000',
    change: (arg: ColorPickerEventArgs) => {
      for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
        let node: NodeModel = diagram.selectedItems.nodes[i];
        for (let j: number = 0; j < node.annotations.length; j++) {
          (node.annotations[j].style as TextStyleModel).color =
            arg.currentValue.rgba;
        }
      }
    },
  });
  fontColor.appendTo('#fontColor');
  
  toolbarItems = new Toolbar({
    clicked: toolbarClick,
    items: [
      {
        type: 'Button',
        tooltipText: 'Group',
        prefixIcon: 'e-icons e-group-1',
        disabled: true,
      },
      {
        type: 'Button',
        tooltipText: 'UnGroup',
        prefixIcon: 'e-icons e-ungroup-1',
        disabled: true,
      },
      { type: 'Separator' },
      {
        type: 'Button',
        tooltipText: 'Bring Forward',
        prefixIcon: 'e-icons e-bring-forward',
        disabled: true,
      },
      {
        type: 'Button',
        tooltipText: 'Bring To Front',
        prefixIcon: 'e-icons e-bring-to-front',
        disabled: true,
      },
      {
        type: 'Button',
        tooltipText: 'Send Backward',
        prefixIcon: 'e-icons e-send-backward',
        disabled: true,
      },
      {
        type: 'Button',
        tooltipText: 'Send To Back',
        prefixIcon: 'e-icons e-send-to-back',
        disabled: true,
      },
      { type: 'Separator', template: '<div style="margin-left:1px;"></div>' },
      {
        type: 'Input',
        tooltipText: 'Font Style',
        align: 'Left',
        template: fontFamily,
        disabled: true,
      },
      { type: 'Separator', template: '<div style="margin-left:5px;"></div>' },
      {
        type: 'Input',
        tooltipText: 'Font Size',
        align: 'Left',
        template: fontSize,
        disabled: true,
      },
      {
        type: 'Button',
        tooltipText: 'Bold',
        prefixIcon: 'e-icons e-bold',
        disabled: true,
        cssClass: 'tb-item-start',
      },
      {
        type: 'Button',
        tooltipText: 'Italic',
        prefixIcon: 'e-icons e-italic',
        disabled: true,
        cssClass: 'tb-item-middle',
      },
      {
        type: 'Button',
        tooltipText: 'Underline',
        prefixIcon: 'e-icons e-underline',
        disabled: true,
        cssClass: 'tb-item-end',
      },
      {
        type: 'Input',
        tooltipText: 'Font Color',
        align: 'Left',
        template: fontColor,
        disabled: true,
      },
    ],
  });
  toolbarItems.appendTo('#toolbarEditor');
};
