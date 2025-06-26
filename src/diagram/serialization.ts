import { loadCultureFiles } from '../common/culture-loader';
/**
 * Serialization sample
 */

import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, Node, FlowShapes, Segments, DecoratorShapes,
    SymbolPalette, SymbolInfo, DiagramContextMenu, GridlinesModel, IDragEnterEventArgs, PaletteModel
} from '@syncfusion/ej2-diagrams';
import { Uploader } from '@syncfusion/ej2-inputs';
Diagram.Inject(UndoRedo, DiagramContextMenu);
import { Toolbar, ClickEventArgs, ItemModel } from '@syncfusion/ej2-navigations';
import { openPalette } from './script/diagram-common';

// Global variables to hold instances of Diagram
let diagram: Diagram;

// Predefined styles for different types of nodes in the diagram.
const nodeStyles = {
    terminator: { fill: "#d0f0f1", strokeColor: "#797979", height: 50, width: 100 },
    process: { fill: "#fbfdc5", strokeColor: "#797979", height: 50, width: 120 },
    decision: { fill: "#c5efaf", strokeColor: "#797979", height: 90, width: 120 },
    delay: { fill: "#f8eee5", strokeColor: "#797979", height: 50, width: 100 }
};

// Function to create a node with given parameters.
function createNode(id: string, offsetX: number, offsetY: number, shapeType: FlowShapes, content: string, style: any): NodeModel {
    return {
        id: id,
        height: style.height,
        width: style.width,
        offsetX: offsetX,
        offsetY: offsetY,
        shape: { type: "Flow", shape: shapeType },
        annotations: [{ content: content }],
        style: { fill: style.fill, strokeColor: style.strokeColor }
    };
};

// Initializing nodes for the diagram.
let nodes: NodeModel[] = [
    createNode("Start", 250, 60, "Terminator", "Start", nodeStyles.terminator),
    createNode("Alarm", 250, 160, "Process", "Alarm Rings", nodeStyles.process),
    createNode("Ready", 250, 260, "Decision", "Ready to Get Up?", nodeStyles.decision),
    createNode("Climb", 250, 370, "Process", "Climb Out of Bed", nodeStyles.process),
    createNode("End", 250, 460, "Terminator", "End", nodeStyles.terminator),
    createNode("Relay", 450, 160, "Delay", "Relay", nodeStyles.delay),
    createNode("Hit", 450, 260, "Process", "Hit Snooze Button", nodeStyles.process)
];

// Function to create a connector with given parameters.
function createConnector(id: string, sourceID: string, targetID: string, annotations?: any[]): ConnectorModel {
    return {
        id: id,
        sourceID: sourceID,
        targetID: targetID,
        annotations: annotations
    };
};

// Initializing connectors for the diagram.
let connectors: ConnectorModel[] = [
    createConnector("connector1", "Start", "Alarm"),
    createConnector("connector2", "Alarm", "Ready"),
    createConnector("connector3", "Ready", "Climb", [{ content: "Yes", style: { fill: "white" } }]),
    createConnector("connector4", "Climb", "End"),
    createConnector("connector5", "Ready", "Hit", [{ content: "No", style: { fill: "white" } }]),
    createConnector("connector6", "Hit", "Relay"),
    createConnector("connector7", "Relay", "Alarm")
];
// Gridline configuration for the diagram.
let interval = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
let gridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: interval };


// Preparing flow shapes for the symbol palette.
const flowShapeTypes = ["Terminator", "Process", "Decision", "Document", "PreDefinedProcess", "PaperTap", "DirectData", "SequentialData", "Sort", "MultiDocument",
    "Collate", "SummingJunction", "Or", "InternalStorage", "Extract", "ManualOperation", "Merge", "OffPageReference", "SequentialAccessStorage",
    "Annotation", "Annotation2", "Data", "Card", "Delay"];
let flowshapes: NodeModel[] = flowShapeTypes.map(type => ({ id: type, shape: { type: "Flow", shape: type } }));

// Function to create a connector symbol for the symbol palette.
function createConnectorSymbol(id: string, type: Segments, targetDecoratorShape: DecoratorShapes = "None"): ConnectorModel {
    let connector: ConnectorModel = {
        id,
        type,
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2, strokeColor: '#757575' }
    };

    if (targetDecoratorShape !== "None") {
        connector.targetDecorator = { shape: targetDecoratorShape, style: { strokeColor: '#757575', fill: '#757575' } };
    }
    else {
        connector.targetDecorator = { shape: "None" };
    }

    return connector;
}

// Initializing connector symbols for the symbol palette.
let connectorSymbols: ConnectorModel[] = [
    createConnectorSymbol("Link1", "Orthogonal", "Arrow"),
    createConnectorSymbol("link2", "Orthogonal"),
    createConnectorSymbol("Link3", "Straight", "Arrow"),
    createConnectorSymbol("link4", "Straight"),
    createConnectorSymbol("link5", "Bezier")
];

let palettes: PaletteModel[] = [
    { id: 'flow', expanded: true, symbols: flowshapes, iconCss: 'e-ddb-icons1 e-flow', title: 'Flow Shapes' },
    { id: 'connectors', expanded: true, symbols: connectorSymbols, iconCss: 'e-ddb-icons1 e-connector', title: 'Connectors' }
];

let items: ItemModel[] = [
    {
        id: 'palette-icon',
        prefixIcon: 'e-ddb-icons2 e-toggle-palette',
        align: 'Right',
        text: '',
        tooltipText: 'Palette-Icon',
    },
    { text: 'New', tooltipText: 'New', prefixIcon: 'e-ddb-icons e-new' },
    {
        type: 'Separator'
    },
    {
        text: 'Save', tooltipText: 'Save', prefixIcon: 'e-diagram-icons e-diagram-save'
    },
    {
        type: 'Separator'
    },
    {
        text: 'Load', tooltipText: 'Load', prefixIcon: 'e-ddb-icons e-open'
    },
];

// Function to get default connector properties
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    obj.targetDecorator.height = 5;
    obj.targetDecorator.width = 5;
    obj.style.strokeColor = '#797979';
    obj.targetDecorator.style = { fill: '#797979', strokeColor: '#797979' };
    return obj;
}

// Sets the Node style for DragEnter element.
function dragEnter(args: IDragEnterEventArgs): void {
    let obj: NodeModel = args.element as NodeModel;
    if (obj instanceof Node) {
        let ratio: number = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
    }
}

// Function to handle toolbar click events
function toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'New') {
        diagram.clear();
    } else if (args.item.text === 'Load') {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    } else if (args.item.id === 'palette-icon') {
        openPalette();
    } else {
        download(diagram.saveDiagram());
    }
}

// Save the diagram object as a JSON file.
function download(data: string): void {
    // MIME type for JSON data.
    const mimeType = "data:text/json;charset=utf-8,";
    // Checks for MS browser to use the msSaveBlob method.
    if ((window.navigator as any).msSaveBlob) {
        // Creates a new Blob object containing the JSON data.
        const blob: any = new Blob([data], { type: mimeType });
        // Saves or opens the blob depending on the browser capability.
        (window.navigator as any).msSaveBlob(blob, 'Diagram.json');
    } else {
        // Encodes the JSON data as a data URL.
        const dataStr: string = mimeType + encodeURIComponent(data);
        // Creates an anchor element to facilitate downloading.
        const downloadAnchor: HTMLAnchorElement = document.createElement('a');
        downloadAnchor.href = dataStr;
        downloadAnchor.download = 'Diagram.json';
        document.body.appendChild(downloadAnchor);
        // Triggers the download process.
        downloadAnchor.click();
        // Removes the anchor element from the document.
        downloadAnchor.remove();
    }
}

// Sets default value for Node.
function getSymbolDefaults(symbol: NodeModel): void {
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
    symbol.style.strokeWidth = 2;
    symbol.style.strokeColor = '#757575';
}
function getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializes diagram control
    diagram = new Diagram({
        width: '100%', height: '700px',
        nodes: nodes,
        connectors: connectors,
        snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines },
        // event triggers after the diagram elements finished loading using loadDiagram method
        loaded: function () {
            setTimeout(() => {
                diagram.select([diagram.nodes[0]]);
            }, 100);
        },
        // Sets default value for Connectors.
        getConnectorDefaults: getConnectorDefaults,
        // Sets the Node style for DragEnter element.
        dragEnter: dragEnter

    });
    diagram.appendTo('#diagram');

    // Initializes ToolBar control to invoke save and load the diagram
    let toolbarObj: Toolbar = new Toolbar({
        clicked: toolbarClick,
        items: items
    });
    toolbarObj.appendTo('#toolbar');

    // Initializes the symbol palette
    let palette: SymbolPalette = new SymbolPalette({
        expandMode: 'Multiple',
        palettes: palettes,
        //set default value for Node.
        getNodeDefaults: getSymbolDefaults,
        symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
        getSymbolInfo: getSymbolInfo,
        width: '100%', height: '700px', symbolHeight: 60, symbolWidth: 60
    });
    palette.appendTo('#symbolpalette');

    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        },
        success: onUploadSuccess,
        showFileList: false
    });
    uploadObj.appendTo('#fileupload');

    // Function to handle upload success event
    function onUploadSuccess(args: { [key: string]: Object }): void {
        // Extracts the file from the upload success event arguments.
        const files: { [key: string]: Object } = args.file as { [key: string]: Object };
        const file: Blob = files.rawFile as Blob;
        // Creates a FileReader to read the content of the file.
        const reader: FileReader = new FileReader();
        // Reads the content of the file as a text string.
        reader.readAsText(file);
        // Assigns the loadDiagram function to execute when the file read operation completes.
        reader.onloadend = loadDiagram;
    }

    // Load the diagram object from a JSON string.
    function loadDiagram(event: ProgressEvent): void {
        // Extracts the text content from the FileReader event.
        const result = (event.target as FileReader).result.toString();
        // Loads the diagram from the JSON string.
        diagram.loadDiagram(result);
    }
};
