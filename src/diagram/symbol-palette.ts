import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default symbol palette sample
 */

import {
    Diagram, UndoRedo, SymbolPalette, NodeModel, ConnectorModel, SymbolInfo,
    NodeConstraints
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

interface Symbol extends NodeModel {
    text?: string;
}

let palette: SymbolPalette;
let isItemText: boolean = false;
let symbolSize: number = 50;
let htmlSymbolWidth: number = 91;
let htmlSymbolHeight: number = 100;

//Initialize the flowshapes for the symbol palatte
let flowShapes: NodeModel[] = [
    { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'PredefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
];

//Initialize the basicshapes for the symbol palatte
let basicShapes: NodeModel[] = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
    { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
    { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
    { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
    { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
    },
    {
        id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
    },
    {
        id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        targetDecorator: { shape: 'None' }
    },
    {
        id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        targetDecorator: { shape: 'None' }
    },
];
//Initializes SVG shape symbols for the symbol palette
let SVGTemplate: NodeModel[] = [
    {
        id: 'Script', shape: { type: 'Native', scale: 'Stretch' }, width: 80, height: 80
    },
    {
        id: 'Settings', shape: { type: 'Native', scale: 'Stretch' }, width: 80, height: 80
    },
    {
        id: 'Bluetooth', shape: { type: 'Native', scale: 'Stretch' }, width: 70, height: 70
    },
    {
        id: 'Wi-Fi', shape: { type: 'Native', scale: 'Stretch' }, width: 70, height: 55
    },
];

//Initializes HTML shape symbols for the symbol palette
let HTMLShapes: NodeModel[] = [
    {
        id: 'Meeting', shape: { type: 'HTML' }, width: 80, height: 80
    },
    {
        id: 'Message', shape: { type: 'HTML' }, width: 80, height: 80
    },
    {
        id: 'Weather', shape: { type: 'HTML' }, width: 70, height: 70
    },
    {
        id: 'BugFix', shape: { type: 'HTML' }, width: 70, height: 55, tooltip: {content: 'Bug Fix'}, constraints: NodeConstraints.Tooltip
    },
];

//Set node default value
function getNodeDefaults(symbol: NodeModel): NodeModel {
    if (symbol.shape.type === 'HTML') {
        symbol.width = htmlSymbolWidth;
        symbol.height = htmlSymbolHeight;
    }
    symbol.style = { strokeWidth: 2, strokeColor: '#757575' };
    return symbol;
}

//Set connector default value
function getConnectorDefaults(symbol: ConnectorModel): ConnectorModel {
    symbol.style.strokeWidth = 2;
    symbol.style.strokeColor = '#757575';
    symbol.targetDecorator.style.strokeColor = '#757575';
    symbol.targetDecorator.style.fill = '#757575';
    return symbol;
}

function getSymbolInfo(symbol: Symbol): SymbolInfo {
    if ((symbol as any).shape.type === 'HTML') {
        return { width: htmlSymbolWidth, height: htmlSymbolHeight, fit: true };
    }
    return { width: symbolSize, height: symbolSize, fit: true };
}

//Enable or disable the animation for symbol palette
function onAnimationChange(args: ChangeEventArgs): void {
    palette.enableAnimation = args.checked;
    palette.dataBind();
}

//Add or Remove the Text for Symbol palette item.
function onItemTextChange(args: ChangeEventArgs): void {
    isItemText = args.checked;
    updateGetSymbolInfo();
}

function updateGetSymbolInfo() {
    let palette = (document.getElementById("symbolpalette") as any).ej2_instances[0];
    palette.getSymbolInfo = function (symbol: any) {
        return {
            width: (symbol.shape.type === 'HTML') ? htmlSymbolWidth : symbolSize,
            height: (symbol.shape.type === 'HTML') ? isItemText ? htmlSymbolHeight + 20 : htmlSymbolHeight : symbolSize,
            fit: true,
            description: { text: isItemText ? (symbol.id == "BugFix" ? "Bug Fix" : symbol.id) : '' }
        };
    };
    palette.dataBind();
}

//enable or disable the header icon for Symbol palette.
function onHeaderIconChange(args: ChangeEventArgs): void {
    for (let i: number = 0; i < palette.palettes.length; i++) {
        if (args.checked) {
            if (i === 0) {
                palette.palettes[i].iconCss = 'e-ddb-icons e-basic';
            } else if (i === 1) {
                palette.palettes[i].iconCss = 'e-ddb-icons e-flow';
            } else if (i === 2) {
                palette.palettes[i].iconCss = 'e-ddb-icons e-connector';
            }
        } else {
            palette.palettes[i].iconCss = '';
        }
    }
    palette.dataBind();
}


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes the symbol palette
    palette = new SymbolPalette({
        expandMode: 'Multiple',
        palettes: [
            { id: 'flow', expanded: true, symbols: flowShapes, iconCss: 'e-ddb-icons e-basic', title: 'Flow Shapes' },
            { id: 'basic', expanded: true, symbols: basicShapes, iconCss: 'e-ddb-icons e-flow', title: 'Basic Shapes' },
            { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' },
            { id: 'nodeSVG', expanded: true, symbols: SVGTemplate, title: 'SVG Shapes' },
            { id: 'nodeHTML', expanded: true, symbols: HTMLShapes, title: 'HTML Shapes' },
        ], enableAnimation: true,
        width: '100%', height: '900px',
        getNodeDefaults: getNodeDefaults, getConnectorDefaults: getConnectorDefaults, getSymbolInfo: getSymbolInfo,
        symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
        nodeTemplate: '#nodeTemplate',
        enableSearch: true,
    });
    palette.appendTo('#symbolpalette');

    let diagram = new Diagram({
        width: '100%', height: '900px',
        rulerSettings: { showRulers: true },
        pageSettings: { width: 1500, height: 1500 },
        scrollSettings: {
            scrollLimit: 'Infinity', canAutoScroll: true, autoScrollBorder: { left: 10, right: 10, top: 10, bottom: 10 },
        },
        nodeTemplate: '#nodeTemplate',
        getNodeDefaults(symbol: any): void {
            if (symbol.id.includes("BugFix")) {
                symbol.constraints = NodeConstraints.Default;
                symbol.tooltip.content = "";
            }
        }
    });
    diagram.appendTo('#diagram');

    //enable or disable the animation of the symbol palette.
    let animation: CheckBox = new CheckBox({
        checked: true,
        change: onAnimationChange
    });
    animation.appendTo('#animation');

    //DropDownList is used to change the expandMode of the Symbolpallete.
    let expand: DropDownList = new DropDownList({
        index: 1,
        width: 100,
        change: () => {
            palette.expandMode = expand.value as ExpandMode;
            palette.dataBind();
        }
    });
    expand.appendTo('#expand');

    //NumericTextBox is used to apply the size of the Symbol.
    let size: NumericTextBox = new NumericTextBox({
        value: 50, min: 40,
        max: 90, width: 100,
        step: 5,
        format: '##.##',
        change: () => {
            if (symbolSize != size.value) {
                symbolSize = size.value;
                updateGetSymbolInfo();
            }
        }
    });
    size.appendTo('#size');
    //enable or disable the Text for Symbol palette item.
    let itemtext: CheckBox = new CheckBox({
        change: onItemTextChange
    });
    itemtext.appendTo('#itemtext');

    //Checkbox for enable or disable symbol palette header icons.
    let headericon: CheckBox = new CheckBox({
        checked: true,
        change: onHeaderIconChange
    });
    headericon.appendTo('#headericon');

    let showSearch: CheckBox = new CheckBox({
        checked: true,
        change: function (args: any) {
            if (args.checked) {
                palette.enableSearch = true;
            } else {
                palette.enableSearch = false;
            }
            palette.dataBind();
        }
    });
    showSearch.appendTo('#showsearch');
};
