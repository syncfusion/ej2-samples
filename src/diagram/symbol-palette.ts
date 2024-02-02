import { loadCultureFiles } from '../common/culture-loader';
/**
 * Default symbol palette sample
 */

import {
    Diagram, UndoRedo, SymbolPalette, NodeModel, ConnectorModel, SymbolInfo
} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

Diagram.Inject(UndoRedo);

interface Symbol extends NodeModel {
    text?: string;
}

let palette: SymbolPalette;

//Initialize the flowshapes for the symbol palatte
let flowshapes: NodeModel[] = [
    { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
];

let basicShapes: NodeModel[] = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
    { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
    { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
    { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
    { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
        id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    },
    {
        id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
];

//set Node default value
function getNodeDefaults(symbol: NodeModel): NodeModel {
    if (symbol.id === 'Terminator' || symbol.id === 'Process') {
        symbol.width = 80;
        symbol.height = 40;
    } else if (symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
        symbol.id === 'PaperTap' || symbol.id === 'DirectData') {
        symbol.width = 50;
        symbol.height = 40;
    }
    symbol.style = { strokeWidth: 2, strokeColor: '#757575' };
    return symbol;
}

function getSymbolInfo(symbol: Symbol): SymbolInfo {
    return { fit: true };
}

function onAnimationChange(args: ChangeEventArgs): void {
    palette.enableAnimation = args.checked;
}

//Add or Remove the Text for Symbol palette item.
function onItemTextChange(args: ChangeEventArgs): void {
    if (args.checked) {
        palette.getSymbolInfo = (symbol: Symbol): SymbolInfo => {
            if (symbol.text !== undefined) {
                return { description: { text: symbol.text, overflow: 'Wrap' } };
            }
            return { description: { text: symbol.id } };
        };
    } else {
        palette.getSymbolInfo = (symbol: NodeModel | ConnectorModel): SymbolInfo => {
            return { description: { text: '' } };
        };
    }
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
}


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializes the symbol palette
    palette = new SymbolPalette({
        expandMode: 'Multiple', allowDrag: false,
        palettes: [
            { id: 'flow', expanded: true, symbols: flowshapes, iconCss: 'e-ddb-icons e-basic', title: 'Flow Shapes' },
            { id: 'basic', expanded: true, symbols: basicShapes, iconCss: 'e-ddb-icons e-flow', title: 'Basic Shapes' },
            { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' }
        ], enableAnimation: true,
        width: '100%', height: '500px', symbolHeight: 80, symbolWidth: 80,
        getNodeDefaults: getNodeDefaults, getSymbolInfo: getSymbolInfo,
        symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }
    });
    palette.appendTo('#symbolpalette');

    //enable or disable the animation of the symbol palette.
    let animation: CheckBox = new CheckBox({
        checked: true,
        change: onAnimationChange
    });
    palette.dataBind();
    animation.appendTo('#animation');

    //DropDownList is used to change the expandMode of the Symbolpallete.
    let expand: DropDownList = new DropDownList({
        index: 1,
        change: () => {
            palette.expandMode = expand.value as ExpandMode;
            palette.dataBind();
        }
    });
    expand.appendTo('#expand');

    //NumericTextBox is used to apply the size of the Symbol.
    let size: NumericTextBox = new NumericTextBox({
        value: 80, min: 40,
        max: 100, width: 120,
        step: 5,
        format: '##.##',
        change: () => {
            palette.symbolHeight = size.value;
            palette.symbolWidth = size.value;
        }
    });
    palette.dataBind();
    size.appendTo('#size');

    let itemtext: CheckBox = new CheckBox({
        change: onItemTextChange
    });
    itemtext.appendTo('#itemtext');

    let headericon: CheckBox = new CheckBox({
        checked: true,
        change: onHeaderIconChange
    });
    palette.dataBind();
    headericon.appendTo('#headericon');
};
