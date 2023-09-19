import { loadCultureFiles } from '../common/culture-loader';
import {
    NodeModel,
    Node,
    Diagram,
    ISelectionChangeEventArgs,
    SelectorConstraints,
    UserHandleModel,
    UserHandleEventsArgs,
  } from '@syncfusion/ej2-diagrams';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ConnectorModel, IDragEnterEventArgs, Rect, SymbolInfo, SymbolPalette } from '@syncfusion/ej2/diagrams';
import { TextBox } from '@syncfusion/ej2/inputs';
import { CheckBox } from '@syncfusion/ej2/buttons';
import { addEvents } from './script/diagram-common';


let diagram: Diagram;

let basicShapes: NodeModel[] = [
    {
        id: 'rectangle', shape: { type: 'Basic', shape: 'Rectangle' }
    },
    {
        id: 'ellipse', shape: { type: 'Basic', shape: 'Ellipse' }
    },
    {
        id: 'triangle', shape: { type: 'Basic', shape: 'Triangle' }
    },
    {
        id: 'plus', shape: { type: 'Basic', shape: 'Plus' }
    },
    {
        id: 'star', shape: { type: 'Basic', shape: 'Star' }
    },
    {
        id: 'pentagon', shape: { type: 'Basic', shape: 'Pentagon' }
    },
    {
        id: 'heptagon', shape: { type: 'Basic', shape: 'Heptagon' }
    },
    {
        id: 'octagon', shape: { type: 'Basic', shape: 'Octagon' }
    },
    {
        id: 'trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' }
    },
    {
        id: 'decagon', shape: { type: 'Basic', shape: 'Decagon' }
    },
    {
        id: 'rightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' }
    },
    {
        id: 'parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' }
    },
];
//Initialize the flowshapes for the symbol palatte
let flowShapes: NodeModel[] = [
    { id: 'terminator1', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'process1', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'extract1', shape: { type: 'Flow', shape: 'Extract' } },
    { id: 'manualOperation1', shape: { type: 'Flow', shape: 'ManualOperation' } },
    { id: 'merge1', shape: { type: 'Flow', shape: 'Merge' } },
    { id: 'offPageReference1', shape: { type: 'Flow', shape: 'OffPageReference' } },
    { id: 'sequentialAccessStorage1', shape: { type: 'Flow', shape: 'SequentialAccessStorage' } },
    { id: 'annotation1', shape: { type: 'Flow', shape: 'Annotation' } },
    { id: 'annotation21', shape: { type: 'Flow', shape: 'Annotation2' } },
    { id: 'data1', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'summingJunction1', shape: { type: 'Flow', shape: 'SummingJunction' } },
    { id: 'or1', shape: { type: 'Flow', shape: 'Or' } },
    { id: 'internalStorage1', shape: { type: 'Flow', shape: 'InternalStorage' } },
    { id: 'card1', shape: { type: 'Flow', shape: 'Card' } },
    { id: 'delay1', shape: { type: 'Flow', shape: 'Delay' } },
    { id: 'decision1', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'document1', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'preDefinedProcess1', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'paperTap1', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'directData1', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'sequentialData1', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'sort1', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'multiDocument1', shape: { type: 'Flow', shape: 'MultiDocument' } },
    { id: 'collate1', shape: { type: 'Flow', shape: 'Collate' } },
];

let items:any = [
    { text: 'Auto', value: 'Auto' }, { text: 'Scroll', value: 'Scroll' },
    { text: 'Drag', value: 'Drag' }
];

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
let scrollLimitDatasource:any = [
    { text: 'Infinity', value: 'Infinity' }, { text: 'Diagram', value: 'Diagram' },
    { text: 'Limited', value: 'Limited' }
];
let scrollableArea:any = new Rect(0, 0, 1500, 1500);
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%', height: '700px',
        rulerSettings: { showRulers: true },
        pageSettings: { width: 1500, height: 1500 },
        scrollSettings: {
            scrollLimit: 'Infinity', canAutoScroll: true, autoScrollBorder: { left: 10, right: 10, top: 10, bottom: 10 },
            scrollableArea: scrollableArea
        },
        //Sets the default values of a node
        getNodeDefaults: function (node:Node) {
            if (node.width === undefined) {
                node.width = 145;
            } else {
                let ratio = 100 / node.width;
                node.width = 100;
                node.height *= ratio;
            }
            node.style = { fill: '#357BD2', strokeColor: 'white' };
            node.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
            return node;
        },
        //Sets the default values of a Connector.
        getConnectorDefaults: function (connector: ConnectorModel) {
            if (connector.id.indexOf('connector') !== -1) {
                connector.type = 'Orthogonal';
                connector.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
            }
        },
        //Sets the Node style for DragEnter element.
        dragEnter: function (args:IDragEnterEventArgs) {
            let node:any = args.element;
            if (node instanceof Node) {
                let oWidth = node.width;
                let oHeight = node.height;
                let ratio = 100 / node.width;
                node.width = 100;
                node.height *= ratio;
                node.offsetX += (node.width - oWidth) / 2;
                node.offsetY += (node.height - oHeight) / 2;
                node.style = { fill: '#357BD2', strokeColor: 'white' };
            }
        },
        created: function (args) {
            let element2 = document.getElementById('scrollableDiv');
            element2.className = "disabledbutton";
        }
    });
    diagram.appendTo('#diagram');

  let palette: SymbolPalette = new SymbolPalette({
    expandMode: 'Single',
    getNodeDefaults: function (symbol: NodeModel): void{
        let obj:any = symbol;
        if (obj.id === 'terminator' || obj.id === 'process') {
            obj.width = 80;
            obj.height = 40;
        }
        else if (obj.id === 'decision' || obj.id === 'document' || obj.id === 'preDefinedProcess' ||
            obj.id === 'paperTap' || obj.id === 'directData' || obj.id === 'multiDocument' || obj.id === 'data') {
            obj.width = 50;
            obj.height = 40;
        }
        else {
            obj.width = 50;
            obj.height = 50;
        }
        obj.style.strokeColor = '#757575';
    },
    palettes: [
        { id: 'basic', expanded: true, symbols: basicShapes, iconCss: 'e-ddb-icons e-basic', title: 'Basic Shapes' },
        { id: 'flow', expanded: false, symbols: flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
        { id: 'connectors', expanded: false, symbols: connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' }
    ],
    symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
    getSymbolInfo: (symbol: NodeModel): SymbolInfo => {
        return { fit: true };
    },
    width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60,
  });
  palette.appendTo('#symbolpalette');
  addEvents();

  let scrollLevel:DropDownList = new DropDownList({
    dataSource: items,
    fields: { text: 'text', value: 'value' },
    value: 'Scroll',
    change: function (args:any) {
        let element = document.getElementById('autoScrollDiv');
        element.className = args.value === "Auto" ? "" : "disabledbutton";
    }
});
scrollLevel.appendTo('#scrollLevel');

let scrollLimit:DropDownList = new DropDownList({
    dataSource: scrollLimitDatasource,
    fields: { text: 'text', value: 'value' },
    value: 'Infinity',
    change: function (args:any) {
        let element = document.getElementById('scrollableDiv');
        element.className = args.value === "Limited" ? "" : "disabledbutton";
        diagram.scrollSettings.scrollLimit = args.value;
    }
});
scrollLimit.appendTo('#scrollLimit');

let numeric:TextBox  = new TextBox({
    // sets value to the NumericTextBox
    value: '10',
    change: function (args:any) {
        diagram.scrollSettings.scrollableArea.x = Number(args.value);
    }
});

// renders initialized NumericTextBox
numeric.appendTo('#x');

let numeric2:TextBox  = new TextBox({
    // sets value to the NumericTextBox
    value: '10',
    change: function (args:any) {
        diagram.scrollSettings.scrollableArea.y = Number(args.value);
    }
});

// renders initialized NumericTextBox
numeric2.appendTo('#y');

let widthTextBox:TextBox  = new TextBox({
    // sets value to the NumericTextBox
    value: '1500',
    change: function (args:any) {
        diagram.scrollSettings.scrollableArea.width = Number(args.value);
    }
});

// renders initialized NumericTextBox
widthTextBox.appendTo('#width');

let heightTextBox:TextBox  = new TextBox({
    // sets value to the NumericTextBox
    value: '1500',
    change: function (args:any) {
        diagram.scrollSettings.scrollableArea.height = Number(args.value);
    }
});

// renders initialized NumericTextBox
heightTextBox.appendTo('#height');

let checkBoxObj: CheckBox = new CheckBox({
    checked: true,
    change: function (args:any) {
        let element4:any = document.getElementById('autoScrollDiv');
        if (args.checked) {
          element4.className = '';
          diagram.scrollSettings.canAutoScroll = true;
        } else {
          element4.className = 'disabledbutton';
          diagram.scrollSettings.canAutoScroll = false;
        }
    }
});
checkBoxObj.appendTo('#checked');

let leftTextBox:TextBox  = new TextBox({
    // sets value to the NumericTextBox
    value: '30',
    change: function (args:any) {
        diagram.scrollSettings.autoScrollBorder.left = Number(args.value);
    }
});

// renders initialized NumericTextBox
leftTextBox.appendTo('#left');

let rightTextBox:TextBox  = new TextBox({
    // sets value to the NumericTextBox
    value: '30',
    change: function (args:any) {
        diagram.scrollSettings.autoScrollBorder.right = Number(args.value);
    }
});

// renders initialized NumericTextBox
rightTextBox.appendTo('#right');

let topTextBox = new TextBox({
    // sets value to the NumericTextBox
    value: '30',
    change: function (args:any) {
        diagram.scrollSettings.autoScrollBorder.top = Number(args.value);
    }
});

// renders initialized NumericTextBox
topTextBox.appendTo('#top');

let bottomTextBox:TextBox = new TextBox({
    // sets value to the NumericTextBox
    value: '30',
    change: function (args:any) {
        diagram.scrollSettings.autoScrollBorder.bottom = Number(args.value);
    }
});
// renders initialized NumericTextBox
bottomTextBox.appendTo('#bottom');
};
