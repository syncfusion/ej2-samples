import { loadCultureFiles } from '../common/culture-loader';
/**
 * UML activity sample
 */
import {
    Diagram, NodeModel, UndoRedo, ConnectorModel,
    SymbolPalette, DiagramContextMenu, StrokeStyleModel, DecoratorModel, PointModel,
    SymbolInfo, PortVisibility, SnapConstraints, PointPortModel
} from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo, DiagramContextMenu);

let diagram: Diagram;
let palette: SymbolPalette;

let isMobile: boolean;


let umlActivityShapes: NodeModel[] = [
    { id: 'Action', shape: { type: 'UmlActivity', shape: 'Action' } },
    { id: 'Decision', shape: { type: 'UmlActivity', shape: 'Decision' } },
    { id: 'MergeNode', shape: { type: 'UmlActivity', shape: 'MergeNode' } },
    { id: 'InitialNode', shape: { type: 'UmlActivity', shape: 'InitialNode' } },
    { id: 'FinalNode', shape: { type: 'UmlActivity', shape: 'FinalNode' } },
    { id: 'ForkNode', shape: { type: 'UmlActivity', shape: 'ForkNode' } },
    { id: 'JoinNode', shape: { type: 'UmlActivity', shape: 'JoinNode' } },
    { id: 'TimeEvent', shape: { type: 'UmlActivity', shape: 'TimeEvent' } },
    { id: 'AcceptingEvent', shape: { type: 'UmlActivity', shape: 'AcceptingEvent' } },
    { id: 'SendSignal', shape: { type: 'UmlActivity', shape: 'SendSignal' } },
    { id: 'ReceiveSignal', shape: { type: 'UmlActivity', shape: 'ReceiveSignal' } },
    { id: 'StructuredNode', shape: { type: 'UmlActivity', shape: 'StructuredNode' } },
    { id: 'Note', shape: { type: 'UmlActivity', shape: 'Note' } }

];



function getConnectorStyle(dashArrayed?: boolean): StrokeStyleModel {
    let style: StrokeStyleModel = {};
    if (dashArrayed) {
        style = { strokeWidth: 2, strokeColor: '#757575', strokeDashArray: '4 4' };
    } else {
        style = { strokeWidth: 2, strokeColor: '#757575' };
    }
    return style;

}

//Create and add ports for node.
function getNodePorts(obj: NodeModel): PointPortModel[] {
    if (obj.id === 'node2' || obj.id === 'node9') {
        let node2Ports: PointPortModel[] = [
            { id: 'port1', offset: { x: 0.2, y: 1 } },
            { id: 'port2', offset: { x: 0.8, y: 1 } },
            { id: 'port3', offset: { x: 0.2, y: 0 } },
            { id: 'port4', offset: { x: 0.8, y: 0 } },
        ];
        return node2Ports;
    } else {
        let ports: PointPortModel[] = [
            { id: 'portLeft', offset: { x: 0, y: 0.5 } },
            { id: 'portRight', offset: { x: 1, y: 0.5 } },
            { id: 'portBottom', offset: { x: 0.5, y: 1 } },
            { id: 'portTop', offset: { x: 0.5, y: 0 } },
        ];
        return ports;
    }
}


function setPaletteNodeDefaults(symbol: NodeModel): NodeModel {
    if (symbol.id === 'JoinNode') {
        symbol.width = 20; symbol.height = 50;
    } else if (symbol.id === 'ForkNode') {
        symbol.width = 50; symbol.height = 20;
    } else if (symbol.id === 'Decision' || symbol.id === 'MergeNode') {
        symbol.width = 50; symbol.height = 40;
    } else {
        symbol.width = 50; symbol.height = 50;
    }
    if (symbol.id === 'InitialNode' || symbol.id === 'FinalNode' || symbol.id === 'JoinNode' || symbol.id === 'ForkNode') {
        symbol.style.fill = '#757575';
    }
    symbol.style.strokeColor = '#757575';
    return symbol;
}

// initializes connector symbols to the connector palette in the symbol palette
function getConnectors(): ConnectorModel[] {
    let sourcePoint: PointModel = { x: 0, y: 0 };
    let targetPoint: PointModel = { x: 40, y: 40 };
    let targetDecorator: DecoratorModel = { shape: 'Arrow', style: { fill: '#757575', strokeColor: '#757575' } };
    let connectorSymbols: ConnectorModel[] = [
        {
            id: 'Link2', sourcePoint: sourcePoint, targetPoint: targetPoint,
            type: 'Orthogonal', style: getConnectorStyle(true), targetDecorator: targetDecorator,
        },
        {
            id: 'Link1', sourcePoint: sourcePoint, targetPoint: targetPoint,
            type: 'Orthogonal', style: getConnectorStyle(), targetDecorator: targetDecorator,
        },
        {
            id: 'Link3', sourcePoint: sourcePoint, targetPoint: targetPoint,
            type: 'Straight', style: getConnectorStyle(), targetDecorator: targetDecorator,
        }
    ];
    return connectorSymbols;
}

function addEvents(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        let paletteIcon: HTMLElement = document.getElementById('palette-icon') as HTMLElement;
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
// custom code start
function openPalette(): void {
    let paletteSpace: HTMLElement = document.getElementById('palette-space') as HTMLElement;
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        } else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}
// custom code end
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let bounds: ClientRect = document.getElementById('diagram-space').getBoundingClientRect();
    let centerX: number = bounds.width / 2;
    let middle: number = centerX - 50;
    let left: number = middle - 120;
    let right: number = middle + 120;

    //Initializes the nodes for the diagram
    let nodes: NodeModel[] = [
        {
            id: 'Start', height: 40, width: 40, offsetX: middle, offsetY: 25,
            shape: { type: 'UmlActivity', shape: 'InitialNode' }
        }, {
            id: 'ReceiveCall', height: 40, width: 105, offsetX: middle, offsetY: 85,
            shape: { type: 'UmlActivity', shape: 'Action' },
            annotations: [{ content: 'Receive Customer Call' }]
        }, {
            id: 'node2', height: 10, width: 70, offsetX: middle, offsetY: 130,
            shape: { type: 'UmlActivity', shape: 'ForkNode' }
        }, {
            id: 'Determine', height: 40, width: 105, offsetX: left, offsetY: 210,
            shape: { type: 'UmlActivity', shape: 'Action' },
            annotations: [{ content: 'Determine Type of Call' }]
        }, {
            id: 'Log', height: 40, width: 105, offsetX: right, offsetY: 210,
            shape: { type: 'UmlActivity', shape: 'Action' },
            annotations: [{ content: 'Customer Logging a Call' }]
        }, {
            id: 'node5', height: 50, width: 50, offsetX: left, offsetY: 290,
            shape: { type: 'UmlActivity', shape: 'Decision' }
        }, {
            id: 'transfer_sales', height: 40, width: 105, offsetX: middle - 200, offsetY: 360,
            shape: { type: 'UmlActivity', shape: 'Action' },
            annotations: [{ content: 'Transfer the call to Sales' }]
        }, {
            id: 'transfer_desk', height: 40, width: 105, offsetX: middle - 25, offsetY: 360,
            shape: { type: 'UmlActivity', shape: 'Action' },
            annotations: [{ content: 'Transfer the call to Help Desk' }]
        }, {
            id: 'node8', height: 50, width: 50, offsetX: left, offsetY: 430,
            shape: { type: 'UmlActivity', shape: 'MergeNode' }
        }, {
            id: 'node9', height: 10, width: 70, offsetX: middle, offsetY: 500,
            shape: { type: 'UmlActivity', shape: 'JoinNode' }
        }, {
            id: 'CloseCall', height: 40, width: 105, offsetX: middle, offsetY: 550,
            shape: { type: 'UmlActivity', shape: 'Action' },
            annotations: [{ content: 'Close Call', margin: { left: 25, right: 25 } }]
        }, {
            id: 'node11', height: 40, width: 40, offsetX: middle, offsetY: 615,
            shape: { type: 'UmlActivity', shape: 'FinalNode' }
        }

    ];

    let connectors: ConnectorModel[] = [
        { id: 'connector1', sourceID: 'Start', targetID: 'ReceiveCall' },
        { id: 'connector2', sourceID: 'ReceiveCall', targetID: 'node2' },
        {
            id: 'connector3', sourceID: 'node2', targetID: 'Determine',
            sourcePortID: 'port1', targetPortID: 'portTop',
            segments: [
                { type: 'Orthogonal', length: 20, direction: 'Bottom' },
                { type: 'Orthogonal', length: 50, direction: 'Left' }
            ],
        },
        {
            id: 'connector4', sourceID: 'node2', targetID: 'Log',
            sourcePortID: 'port2', targetPortID: 'portTop',
            segments: [
                { type: 'Orthogonal', length: 20, direction: 'Bottom' },
                { type: 'Orthogonal', length: 50, direction: 'Right' }
            ],
        },
        { id: 'connector5', sourceID: 'Determine', targetID: 'node5' },
        {
            id: 'connector6', sourceID: 'node5', targetID: 'transfer_sales',
            sourcePortID: 'portLeft', targetPortID: 'portTop',
            shape: { type: 'UmlActivity', flow: 'Object' },
            annotations: [
                {
                    id: 'connector6Label', content: 'type=New Customer', offset: 0.715,
                    style: { fill: 'white', color: 'black', textWrapping: 'NoWrap' }
                }
            ],
        },
        {
            id: 'connector7', sourceID: 'node5', targetID: 'transfer_desk',
            sourcePortID: 'portRight', targetPortID: 'portTop',
            shape: { type: 'UmlActivity', flow: 'Object' },
            annotations: [
                {
                    id: 'connector7Label', content: 'type=Existing Customer', offset: 0.75,
                    style: { fill: 'white', color: 'black', textWrapping: 'NoWrap' }
                }
            ],
        },
        {
            id: 'connector8', sourceID: 'transfer_sales', targetID: 'node8',
            sourcePortID: 'portBottom', targetPortID: 'portLeft',
            segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
        },
        {
            id: 'connector9', sourceID: 'transfer_desk', targetID: 'node8',
            sourcePortID: 'portBottom', targetPortID: 'portRight',
            segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
        },
        {
            id: 'connector10', sourceID: 'node8', targetID: 'node9',
            sourcePortID: 'portBottom', targetPortID: 'port3'
        },
        {
            id: 'connector11', sourceID: 'Log', targetID: 'node9',
            sourcePortID: 'portBottom', targetPortID: 'port4',
            segments: [
                { type: 'Orthogonal', length: 213, direction: 'Bottom' },
                { type: 'Orthogonal', length: 50, direction: 'Left' }
            ],
        },
        { id: 'connector12', sourceID: 'node9', targetID: 'CloseCall' },
        { id: 'connector13', sourceID: 'CloseCall', targetID: 'node11' }

    ];


    // initializes diagram control
    diagram = new Diagram({
        // sets the height and width of the diagram
        width: '100%', height: '100%',
        // sets the nodes and connectors of the diagram
        nodes: nodes, connectors: connectors,
        // sets snap settings to the diagram
        snapSettings: {
            constraints: SnapConstraints.None
        },
        //Sets the default values of a node
        getNodeDefaults: (obj: NodeModel): NodeModel => {
            obj.ports = getNodePorts(obj);
            if (obj.ports) {
                for (let i: number = 0; i < obj.ports.length; i++) {
                    obj.ports[i].visibility = PortVisibility.Hidden;
                }
            }
            if (obj.id === 'Start' || obj.id === 'node2' || obj.id === 'node9' || obj.id === 'node11') {
                obj.style.fill = '#444';
            }
            obj.style.strokeColor = '#444';
            return obj;
        },
        //Sets the default values of a Connector.
        getConnectorDefaults: (obj: ConnectorModel): void => {
            if (obj.id.indexOf('connector') !== -1) {
                obj.type = 'Orthogonal'; obj.cornerRadius = 10;
                obj.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
            }
        },
        created: (): void => {
            addEvents();
        }

    });
    diagram.appendTo('#diagram');

    palette = new SymbolPalette({
        // sets the expandable mode of the symbol palette
        expandMode: 'Multiple',
        // sets the height and wodth of the symbol palette
        width: '100%', height: '505px',
        // sets the default values for the symbols in the symbol palette
        getNodeDefaults: setPaletteNodeDefaults,
        // sets the height and width of the symbols
        symbolHeight: 55, symbolWidth: 55,
        // sets the margin for the symbol
        symbolMargin: { left: 10, right: 10, top: 10, bottom: 10 },
        // sets the palettes to be displayed in the symbol palette
        palettes: [
            { id: 'umlActivity', expanded: true, symbols: umlActivityShapes, title: 'UML Shapes' },
            { id: 'Connector', expanded: true, symbols: getConnectors(), title: 'Connectors' }
        ],
        getSymbolInfo: (symbol: NodeModel): SymbolInfo => { return { fit: true }; }

    });
    palette.appendTo('#symbolPalette');
};

