import { loadCultureFiles } from '../common/culture-loader';
/**
 * Swim Lane Samples
 */

import {
    Diagram, NodeModel, ConnectorModel, SymbolPalette, SelectorConstraints, SymbolInfo,
    PaletteModel, SnapConstraints,
} from '@syncfusion/ej2-diagrams';
/* tslint:disable */

function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal'
    return connector;
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
let darkColor: string = '#C7D4DF';
    let lightColor: string = '#f5f5f5';
    let pathData: string = 'M 120 24.9999 C 120 38.8072 109.642 50 96.8653 50 L 23.135' +
        ' 50 C 10.3578 50 0 38.8072 0 24.9999 L 0 24.9999 C' +
        '0 11.1928 10.3578 0 23.135 0 L 96.8653 0 C 109.642 0 120 11.1928 120 24.9999 Z';
    //Initializes the nodes for the diagram.
    let nodes: NodeModel[] = [
        {
            id: 'swimlane',
            shape: {
                type: 'SwimLane',
                header: {
                    content: { content: 'ONLINE PURCHASE STATUS' },
                    height: 50, style: { fill: darkColor, fontSize: 11 },
                    orientation: 'Horizontal',
                },
                lanes: [
                    {
                        id: 'stackCanvas1',
                        header: {
                            content: { content: 'CUSTOMER' }, width: 50,
                            style: { fill: darkColor, fontSize: 11 }
                        },
                        style: { fill: lightColor },
                        height: 100,
                        childNodes: [
                            {
                                id: 'Order',
                                shape: { type: 'Path', data: pathData },
                                annotations: [
                                    {
                                        content: 'ORDER',
                                        style: { fontSize: 11 }
                                    }
                                ],
                                margin: { left: 60, top: 20 },
                                height: 40, width: 100
                            }
                        ],
                    },
                    {
                        id: 'stackCanvas2',
                        header: {
                            content: { content: 'ONLINE' }, width: 50,
                            style: { fill: darkColor, fontSize: 11 }
                        },
                        style: { fill: lightColor }, height: 100,
                        childNodes: [
                            {
                                id: 'selectItemaddcart',
                                annotations: [{ content: 'Select item\nAdd cart' }],
                                margin: { left: 190, top: 20 },
                                height: 40, width: 100
                            },
                            {
                                id: 'paymentondebitcreditcard',
                                annotations: [{ content: 'Payment on\nDebit/Credit Card' }],
                                margin: { left: 350, top: 20 },
                                height: 40, width: 100
                            }
                        ],
                    },
                    {
                        id: 'stackCanvas3',
                        header: {
                            content: { content: 'SHOP' }, width: 50,
                            style: { fill: darkColor, fontSize: 11 }
                        },
                        style: { fill: lightColor },
                        height: 100,
                        childNodes: [
                            {
                                id: 'getmaildetailaboutorder',
                                annotations: [{ content: 'Get mail detail\nabout order' }],
                                margin: { left: 190, top: 20 },
                                height: 40, width: 100
                            },
                            {
                                id: 'pakingitem',
                                annotations: [{ content: 'Paking item' }],
                                margin: { left: 350, top: 20 },
                                height: 40, width: 100
                            }
                        ],
                    },
                    {
                        id: 'stackCanvas4',
                        header: {
                            content: { content: 'DELIVERY' }, width: 50,
                            style: { fill: darkColor, fontSize: 11 }
                        },
                        style: { fill: lightColor },
                        height: 100,
                        childNodes: [
                            {
                                id: 'sendcourieraboutaddress',
                                annotations: [{ content: 'Send Courier\n about Address' }],
                                margin: { left: 190, top: 20 },
                                height: 40, width: 100
                            },
                            {
                                id: 'deliveryonthataddress',
                                annotations: [{ content: 'Delivery on that\n Address' }],
                                margin: { left: 350, top: 20 },
                                height: 40, width: 100
                            },
                            {
                                id: 'getitItem',
                                shape: { type: 'Path', data: pathData },
                                annotations: [{ content: 'GET IT ITEM', style: { fontSize: 11 } }],
                                margin: { left: 500, top: 20 },
                                height: 40, width: 100
                            }
                        ],
                    },
                ],
                phases: [
                    {
                        id: 'phase1', offset: 170,
                        style: { strokeWidth: 1, strokeDashArray: '3,3', strokeColor: '#606060' },
                        header: { content: { content: 'Phase' } }
                    },
                    {
                        id: 'phase2', offset: 450,
                        style: { strokeWidth: 1, strokeDashArray: '3,3', strokeColor: '#606060' },
                        header: { content: { content: 'Phase' } }
                    },
                ],
                phaseSize: 10,
            },
            offsetX: 320, offsetY: 250,
            height: 100, width: 550
        },
    ];

    //Initializes the connectors for the diagram.
    let connectors: ConnectorModel[] = [
        {
            id: 'connector1', sourceID: 'Order',
            targetID: 'selectItemaddcart'
        },
        {
            id: 'connector2', sourceID: 'selectItemaddcart',
            targetID: 'paymentondebitcreditcard'
        },
        {
            id: 'connector3', sourceID: 'paymentondebitcreditcard',
            targetID: 'getmaildetailaboutorder'
        },
        {
            id: 'connector4', sourceID: 'getmaildetailaboutorder',
            targetID: 'pakingitem'
        },
        {
            id: 'connector5', sourceID: 'pakingitem',
            targetID: 'sendcourieraboutaddress'
        },
        {
            id: 'connector6', sourceID: 'sendcourieraboutaddress',
            targetID: 'deliveryonthataddress'
        },
        {
            id: 'connector7', sourceID: 'deliveryonthataddress',
            targetID: 'getitItem'
        },
    ];

    //initialize the diagram control.
    let diagram: Diagram = new Diagram({
        // sets the height and width of the diagram.
        width: '100%', height: '100%',
        // sets the nodes and connectors of the diagram.
        nodes: nodes, connectors: connectors,
        getConnectorDefaults: getConnectorDefaults,
        snapSettings: { constraints: SnapConstraints.None },
        //pageSettings: { height: 1020, width: 1020 },
        selectedItems: { constraints: SelectorConstraints.All & ~SelectorConstraints.Rotate }
    });
    diagram.appendTo('#diagram');


     // Initializes the palettes to be displayed in the symbol palette.
    let palettes: PaletteModel[] = [
        {
            id: 'flowShapes',
            expanded: true,
            title: 'Flow Shapes',
            symbols: [
                // add the flow shapes to the symbol palette
                {
                    id: 'Rectangle',
                    height: 45, width: 70,
                    offsetX: 70 / 2, offsetY: 45 / 2,
                    style: { fill: 'white', strokeWidth: 1.5 },
                    shape: { type: 'Basic', shape: 'Rectangle' }
                },
                {
                    id: 'Ellipse',
                    width: 70, height: 70,
                    offsetX: 20, offsetY: 20,
                    style: { fill: 'white', strokeWidth: 1.5 },
                    shape: { type: 'Basic', shape: 'Ellipse' }
                },
                {
                    id: 'Parallelogram', width: 70, height: 70,
                    offsetX: 20, offsetY: 30,
                    style: { fill: 'white', strokeWidth: 1.8 },
                    shape: {
                        type: 'Basic', shape: 'Polygon',
                        points: [
                            { x: 25, y: 1 },
                            { x: 99, y: 1 },
                            { x: 75, y: 99 },
                            { x: 1, y: 99 }
                        ]
                    }
                },
                {
                    id: 'Dimond', width: 70, height: 70,
                    offsetX: 20, offsetY: 20,
                    style: { fill: 'white', strokeWidth: 1.8 },
                    shape: {
                        type: 'Basic', shape: 'Polygon',
                        points: [
                            { x: 50, y: 1 },
                            { x: 100, y: 50 },
                            { x: 50, y: 100 },
                            { x: 1, y: 50 }
                        ]
                    },
                },
            ]
        },
        // {
        //     id: 'swimlaneShapes', expanded: true,
        //     symbols: [
        //         {
        //             id: 'stackCanvas1',
        //             shape: {
        //                 type: 'SwimLane',
        //                 header:{ width: 50, height: 50, style: {fill:'#C7D4DF', fontSize: 11} },
        //                 orientation: 'Horizontal'
        //             },
        //             height: 60,
        //             width: 140,
        //             style: { fill: '#f5f5f5'},
        //             offsetX: 70,
        //             offsetY: 30,
        //         }, {
        //             id: 'stackCanvas2',
        //             shape: {
        //                 type: 'SwimLane',
        //                 header:{ width: 50, height: 50, style: {fill:'#C7D4DF', fontSize: 11} },
        //                 orientation: 'Vertical'
        //             },
        //             height: 60,
        //             width: 140,
        //             style: { fill: '#f5f5f5'},
        //             offsetX: 70,
        //             offsetY: 30,
        //         }, {
        //             id: 'verticalPhase',
        //             shape: {
        //                 type: 'SwimLane',
        //                 phases: [{style: { strokeWidth: 1, strokeDashArray: '3,3', strokeColor: '#A9A9A9'},}],
        //                 annotations: [{text: ''}],
        //                 orientation: 'Vertical',
        //             }
        //         }, {
        //             id: 'horizontalPhase',
        //             shape: {
        //                 type: 'SwimLane',
        //                 phases: [{style: { strokeWidth: 1, strokeDashArray: '3,3', strokeColor: '#A9A9A9'},}],
        //                 annotations: [{text: ''}],
        //                 orientation: 'Horizontal',
        //             }
        //         }
        //     ]
        // },
        {
            id: 'Connectors',
            expanded: true,
            title: 'Connectors',
            symbols: [
                {
                    id: 'Link1',
                    type: 'Orthogonal',
                    sourcePoint: { x: 0, y: 0 },
                    targetPoint: { x:27, y: 27 },
                    
                    
                }, {
                    id: 'Link2',
                    type: 'Straight',
                    sourcePoint: { x: 0, y: 0 },
                    targetPoint: { x: 40, y: 40 },
                    
                },
            ],
        }
    ];

    // Initializes symbol palette.
    let palette: SymbolPalette = new SymbolPalette({
        // sets the expandable mode of the symbol palette.
        expandMode: 'Multiple',
        // sets the palettes to be displayed in the symbol palette.
        palettes: palettes,
        // sets the width and height of the palette.
        width: '100%', height: 'calc(100% - 50px)',
        symbolMargin: { left: 8, right: 8, top: 8, bottom: 8 },
            symbolHeight: 48, symbolWidth: 48,
            getSymbolInfo: (symbol: NodeModel): SymbolInfo => { return { fit: true }; }
    });
    palette.appendTo('#symbolpalette');

};
