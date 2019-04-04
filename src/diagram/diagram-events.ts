import { loadCultureFiles } from '../common/culture-loader';
/**
 * Event sample
 */

import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, SymbolPalette,
    SymbolInfo, IDragEnterEventArgs, IDragLeaveEventArgs,
    PaletteModel,
    IDragOverEventArgs, IClickEventArgs, IHistoryChangeArgs, IDoubleClickEventArgs,
    ITextEditEventArgs, IScrollChangeEventArgs, ISelectionChangeEventArgs, ISizeChangeEventArgs,
    IConnectionChangeEventArgs, IEndChangeEventArgs, IPropertyChangeEventArgs, IDraggingEventArgs, IRotationEventArgs,
    ICollectionChangeEventArgs,
    IMouseEventArgs, DiagramContextMenu, Snapping, SnapConstraints,
    NodeConstraints
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
import { Button } from '@syncfusion/ej2-buttons';
import { BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { getEventDetails } from './diagram-events-details';
import { ListView } from '@syncfusion/ej2-lists';

Diagram.Inject(UndoRedo, DiagramContextMenu, Snapping);


function getSymbolDefaults(symbol: NodeModel): void {
    symbol.width = 50;
    symbol.height = 50;
    symbol.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
}

function getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
}

function dragEnter(args: IDragEnterEventArgs): void {
    getEventDetails(args);
}

function dragLeave(args: IDragLeaveEventArgs): void {
    getEventDetails(args);
}

function dragOver(args: IDragOverEventArgs): void {
    if (args.target) {
        getEventDetails(args);
    }
}

function click(args: IClickEventArgs): void {
    getEventDetails(args);
}

function historyChange(args: IHistoryChangeArgs): void {
    getEventDetails(args);
}

function doubleClick(args: IDoubleClickEventArgs): void {
    getEventDetails(args);
}

function textEdit(args: ITextEditEventArgs): void {
    getEventDetails(args);
}

function scrollChange(args: IScrollChangeEventArgs): void {
    getEventDetails(args);
}

function selectionChange(args: ISelectionChangeEventArgs): void {
    getEventDetails(args);
}

function sizeChange(args: ISizeChangeEventArgs): void {
    if (args.state === 'Completed') {
        getEventDetails(args);
    }
}

function connectionChange(args: IConnectionChangeEventArgs): void {
    if (args.state === 'Changed') {
        getEventDetails(args);
    }
}

function sourcePointChange(args: IEndChangeEventArgs): void {
    if (args.state === 'Completed') {
        getEventDetails(args);
    }
}

function targetPointChange(args: IEndChangeEventArgs): void {
    if (args.state === 'Completed') {
        getEventDetails(args);
    }
}

function propertyChange(args: IPropertyChangeEventArgs): void {
    getEventDetails(args);
}

function positionChange(args: IDraggingEventArgs): void {
    if (args.state === 'Completed') {
        getEventDetails(args);
    }
}

function rotateChange(args: IRotationEventArgs): void {
    if (args.state === 'Completed') {
        getEventDetails(args);
    }
}

function collectionChange(args: ICollectionChangeEventArgs): void {
    getEventDetails(args);
}

function mouseEnter(args: IMouseEventArgs): void {
    getEventDetails(args);
}

function mouseLeave(args: IMouseEventArgs): void {
    getEventDetails(args);
}

function mouseOver(args: IMouseEventArgs): void {
    getEventDetails(args);
}

function contextMenuOpen(args: BeforeOpenCloseMenuEventArgs): void {
    getEventDetails(args);
}

function contextMenuBeforeItemRender(args: MenuEventArgs): void {
    getEventDetails(args);
}

function contextMenuClick(args: MenuEventArgs): void {
    getEventDetails(args);
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    let data: { [key: string]: Object }[] = [
        { text: 'Drag enter', id: 'dragEnter' },
        { text: 'Drag leave', id: 'dragLeave' },
        { text: 'Drag over', id: 'dragOver' },
        { text: 'Click', id: 'click', isChecked: true },
        { text: 'History change', id: 'historyChange', isChecked: true },
        { text: 'Double click', id: 'doubleClick' },
        { text: 'Text edit', id: 'textEdit', isChecked: true },
        { text: 'Scroll change', id: 'scrollChange' },
        { text: 'Selection change', id: 'selectionChange', isChecked: true },
        { text: 'Size change', id: 'sizeChange', isChecked: true },
        { text: 'Connection change', id: 'connectionChange', isChecked: true },
        { text: 'SourcePoint change', id: 'sourcePointChange' },
        { text: 'TargetPoint change', id: 'targetPointChange' },
        { text: 'Position change', id: 'positionChange', isChecked: true },
        { text: 'Rotate change', id: 'rotateChange', isChecked: true },
        { text: 'Collection change', id: 'collectionChange', isChecked: true },
        { text: 'Mouse enter', id: 'mouseEnter' },
        { text: 'Mouse leave', id: 'mouseLeave' },
        { text: 'Mouse over', id: 'mouseOver' },
        { text: 'Context menu open', id: 'contextMenuOpen' },
        { text: 'Context menu before item render', id: 'contextMenuBeforeItemRender' },
        { text: 'Context menu click', id: 'contextMenuClick' }
    ];

    //Initialize ListView component
    let listObj: ListView = new ListView({
        //Set defined data to dataSource property
        dataSource: data,
        height: 'calc(100% - 40px)',
        //Enables checkbox
        showCheckBox: true,
    });

    //Render initialized ListView component
    listObj.appendTo('#listview-def');

    //Render initialized button component
    let button: Button = new Button();
    button.appendTo('#clearbtn');

    //Initializes diagram control
    let diagram: Diagram = new Diagram({
        width: '100%', height: '700px',
        contextMenuSettings: { show: true },
        snapSettings: { constraints: SnapConstraints.None },
        dragEnter: dragEnter,
        dragLeave: dragLeave,
        dragOver: dragOver,
        click: click,
        historyChange: historyChange,
        doubleClick: doubleClick,
        textEdit: textEdit,
        scrollChange: scrollChange,
        selectionChange: selectionChange,
        sizeChange: sizeChange,
        connectionChange: connectionChange,
        sourcePointChange: sourcePointChange,
        targetPointChange: targetPointChange,
        propertyChange: propertyChange,
        positionChange: positionChange,
        rotateChange: rotateChange,
        collectionChange: collectionChange,
        mouseEnter: mouseEnter,
        mouseLeave: mouseLeave,
        mouseOver: mouseOver,
        contextMenuOpen: contextMenuOpen,
        contextMenuBeforeItemRender: contextMenuBeforeItemRender,
        contextMenuClick: contextMenuClick
    });
    diagram.appendTo('#diagram');


    //Initialize the basicshapes for the symbol palatte
    let basicShapes: NodeModel[] = [
        { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
        { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
        { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
        { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
        { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
        { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
        { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
        { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
        { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
        { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
        { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
        { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
        { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
        { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' } },
        { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
    ];

    //Initializes connector symbols for the symbol palette
    let connectorSymbols: ConnectorModel[] = [
        {
            id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
        },
        {
            id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
        },
        {
            id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
        },
        {
            id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
            style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
        },
    ];

    let palettes: PaletteModel[] = [
        { id: 'basic', expanded: true, symbols: basicShapes, iconCss: 'e-ddb-icons e-basic', title: 'Basic Shapes' },
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
    clearEventLog();
    document.getElementById('clearbtn').onclick = (args: MouseEvent) => {
        clearEventLog();
    };

    function clearEventLog(): void {
        let data: HTMLElement = document.getElementById('EventLog');
        data.innerHTML = '';
    }

};
