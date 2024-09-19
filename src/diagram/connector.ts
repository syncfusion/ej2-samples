import { loadCultureFiles } from '../common/culture-loader';
/**
 * Connector sample
 */

import {
    Diagram, NodeModel, TextElement, HierarchicalTree, ConnectorConstraints, SnapConstraints, Segments, StackPanel, randomId,
    SelectorConstraints, PointPortModel, ConnectorModel, PortVisibility, ConnectorEditing
} from '@syncfusion/ej2-diagrams';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ColorPicker, NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DecoratorShapes, SegmentThumbShapes } from '@syncfusion/ej2-diagrams';

Diagram.Inject(HierarchicalTree,ConnectorEditing);

let diagram: Diagram;
let sourceDecoratorShape: DropDownList;
let targetDecoratorShape: DropDownList;
let sourceDecoratorSize:  NumericTextBox;
let targetDecoratorSize:  NumericTextBox;
let segmentDecoratorSize:  NumericTextBox;
function created(): void {
    diagram.updateViewPort();
}

//Sets the default values of nodes
function getNodeDefaults(obj: NodeModel): NodeModel {
    if (obj.id !== 'node1') {
        //Set ports
        obj.ports = getPorts(obj);
    }
    if (obj.id !== 'node6') {
        obj.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 10 };
        obj.width = 80;
        obj.style.strokeWidth = 2;
        obj.style.strokeColor = '#6F409F';
        obj.height = 35;
    }
    return obj;
}

//Sets the default values of connectors
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    obj.type = 'Bezier';
    obj.style.strokeColor = '#6f409f';
    obj.style.strokeWidth = 2;
    obj.targetDecorator = {
        style: {
            strokeColor: '#6f409f',
            fill: '#6f409f',
        }
    },
    obj.segments = [
        {
            type: 'Bezier',
        }
    ],
    obj.constraints = ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb 
    return obj;
}

//Customize the content of the node
function setNodeTemplate(obj: NodeModel): StackPanel {
    if (obj.id === 'node6') {
        let canvas = new StackPanel();
        canvas.id = randomId();
        canvas.children = [];
        canvas.style.strokeWidth = 0;
        canvas.style.fill = '#e6e0eb';
        canvas.children.push(getTextElement('Events', '#a6a1e0'));
        canvas.children.push(getTextElement('Emails', '#db8ec9'));
        canvas.children.push(getTextElement('Calls', '#db8ec9'));
        canvas.children.push(getTextElement('Smart Contents', '#db8ec9'));
        return canvas;
    }
    return null;
}

//creation of the TextElement
function getTextElement(text: string, color: string): TextElement {
    let textElement: TextElement = new TextElement();
    textElement.id = randomId();
    textElement.width = 80;
    textElement.height = 35;
    textElement.content = text;
    textElement.style.fill = '#6f409f';
    textElement.style.color = 'white';
    textElement.style.strokeColor = '#6f409f';
    textElement.cornerRadius = 5;
    textElement.margin = { top: 10, bottom: 10, left: 10, right: 10 };
    textElement.relativeMode = 'Object';
    return textElement;
}

//creation of Port for Node.
function getPorts(obj: NodeModel): PointPortModel[] {
    if (obj.id === 'node2') {
        let node2Ports: PointPortModel[] = [
            { id: 'port1', offset: { x: 1, y: 0.25 }, visibility: PortVisibility.Hidden },
            { id: 'port2', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: 'port3', offset: { x: 1, y: 0.75 }, visibility: PortVisibility.Hidden }
        ];
        return node2Ports;
    } else if (obj.id === 'node6') {
        let node6Ports: PointPortModel[] = [
            { id: 'port4', offset: { x: 0, y: 0.46 }, visibility: PortVisibility.Hidden },
            { id: 'port5', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: 'port6', offset: { x: 0, y: 0.54 }, visibility: PortVisibility.Hidden }
        ];
        return node6Ports;
    } else {
        let ports: PointPortModel[] = [
            { id: 'portIn', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
            { id: 'portOut', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
        ];
        return ports;
    }
}

//Event for Appearance of the layout.
function changeConnectorPattern(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    // custom code start
    let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
    if (selectedElement.length) {
        selectedElement[0].classList.remove('e-selected-style');
    }
    // custom code end
    if (target.className === 'image-pattern-style') {
        switch (target.id) {
            case 'straightConnector':
                applyConnectorStyle(false, false, false, 'Straight', target, 1);
                break;
            case 'orthogonalConnector':
                applyConnectorStyle(false, false, false, 'Orthogonal', target, 1);
                break;
            case 'bezierConnector':
                applyConnectorStyle(false, false, false, 'Bezier', target, 1);
                break;
            case 'straightConnectorWithStroke':
                applyConnectorStyle(false, false, false, 'Straight', target);
                break;
            case 'orthogonalConnectorWithStroke':
                applyConnectorStyle(false, false, false, 'Orthogonal', target);
                break;
            case 'bezierConnectorWithStroke':
                applyConnectorStyle(false, false, false, 'Bezier', target);
                break;
            case 'straightConnectorWithDasharray':
                applyConnectorStyle(true, false, false, 'Straight', target);
                break;
            case 'orthogonalConnectorWithDasharray':
                applyConnectorStyle(true, false, false, 'Orthogonal', target);
                break;
            case 'bezierConnectorWithDasharray':
                applyConnectorStyle(true, false, false, 'Bezier', target);
                break;
            case 'cornerRadius':
                applyConnectorStyle(false, false, true, 'Orthogonal', target);
                break;
            case 'sourceDecorator':
                applyConnectorStyle(false, true, false, 'Straight', target);
                break;
            case 'sourceDecoratorWithDasharray':
                applyConnectorStyle(true, true, false, 'Straight', target);
                break;
        }
    }
}

//Connector Style customization
function applyConnectorStyle(
    dashedLine: boolean, sourceDec: boolean, isRounded: boolean,
    type: Segments, target: HTMLElement, strokeWidth?: number
): void {
    let connector: ConnectorModel;
    for (let i: number = 0; i < diagram.connectors.length; i++) {
        connector = diagram.connectors[i];
        connector.style.strokeWidth = !strokeWidth ? 2 : strokeWidth;
        connector.type = type;
        connector.cornerRadius = isRounded ? 5 : 0;
        connector.style.strokeDashArray = dashedLine ? '5,5' : '';
        if (sourceDec) {
            connector.sourceDecorator = {
                style: {
                    strokeColor: connector.style.strokeColor,
                    fill: connector.style.strokeColor, strokeWidth: 2
                }, shape: 'Circle'
            };
            (document.getElementById('sourceDecorator2') as any).value='Circle';
            sourceDecoratorShape.value='Circle';
        } else {
            connector.sourceDecorator = { shape: 'None' };
            (document.getElementById('sourceDecorator2') as any).value='None';
            sourceDecoratorShape.value='None';
        }
        connector.targetDecorator = {
            style: {
                strokeColor: connector.style.strokeColor,
                fill: connector.style.strokeColor, strokeWidth: 2
            }, shape: 'Arrow'
        };
        (document.getElementById('targetDecorator') as any).value='Arrow';
        targetDecoratorShape.value='Arrow';
        diagram.dataBind();
        diagram.updateSelector();
    }
    // custom code start
    target.classList.add('e-selected-style');
    // custom code end
}

//Change Source decorator shape
function sourceDecoratorShapeChange(args:any)
{
    for (let i = 0; i < diagram.connectors.length; i++) {
        diagram.connectors[i].sourceDecorator = {
         shape: args.itemData.shape,
         style:{
                strokeColor:  diagram.connectors[i].style.strokeColor,
                fill:  diagram.connectors[i].style.strokeColor,
         }
        };
    }
    diagram.dataBind();
   
}
//Change target decorator shape
function targetDecoratorShapeChange(args:any)
{
    for (let i = 0; i < diagram.connectors.length; i++) {
        diagram.connectors[i].targetDecorator = {
            shape: args.itemData.shape,
            style: {
                strokeColor: diagram.connectors[i].style.strokeColor,
                fill:  diagram.connectors[i].style.strokeColor,
            }
        };
        diagram.dataBind();
    }   
}
//Change segment decorator shape
function segmentDecoratorShapeChange(args:any)
{
    for (let i = 0; i < diagram.connectors.length; i++) {
        diagram.segmentThumbShape = args.itemData.shape;
    } 
    diagram.dataBind();  
}

// function to Change source  decorator Size
function sourceDecoratorSizeChange(args:any) {
    for (var i = 0; i < diagram.connectors.length; i++) {
        diagram.connectors[i].sourceDecorator.width = args.value;
        diagram.connectors[i].sourceDecorator.height = args.value;
    }
    diagram.dataBind();
}

// function to Change target  decorator Size
function targetDecoratorSizeChange(args:any) {
    for (var i = 0; i < diagram.connectors.length; i++) {
        diagram.connectors[i].targetDecorator.width = args.value;
        diagram.connectors[i].targetDecorator.height = args.value;
    }
    diagram.dataBind();
}

// function to Change segment  decorator Size
function segmentDecoratorSizeChange(args:any) {
    var connector=diagram.selectedItems.connectors[0];
    diagram.segmentThumbSize = args.value;
    diagram.clearSelection();
    diagram.select([diagram.nameTable[connector.id]]);
    diagram.dataBind();
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let bounds: ClientRect = document.getElementsByClassName('content-wrapper')[0].getBoundingClientRect();
    let marginLeft: number = (bounds.width - 560) / 2;

    //Initialize Diagram Nodes
    let nodes: NodeModel[] = [
        { id: 'node1', annotations: [{ content: 'Promotion' }] },
        { id: 'node2', annotations: [{ content: 'Lead' }] },
        { id: 'node3', annotations: [{ content: 'Account' }] },
        { id: 'node4', annotations: [{ content: 'Information' }] },
        { id: 'node5', annotations: [{ content: 'Opportunity' }] },
        { id: 'node6', offsetX: marginLeft + 540, offsetY: 340, excludeFromLayout: true }
    ];

    //Initialize Diagram connectors
    let connectors: ConnectorModel[] = [
        { id: 'connector', sourceID: 'node1', targetID: 'node2' },
        { id: 'connector1', sourceID: 'node2', sourcePortID: 'port1', targetID: 'node3', targetPortID: 'portIn' },
        { id: 'connector2', sourceID: 'node2', sourcePortID: 'port2', targetID: 'node4', targetPortID: 'portIn' },
        { id: 'connector3', sourceID: 'node2', sourcePortID: 'port3', targetID: 'node5', targetPortID: 'portIn' },
        { id: 'connector4', sourceID: 'node6', sourcePortID: 'port4', targetID: 'node3', targetPortID: 'portOut' },
        { id: 'connector5', sourceID: 'node6', sourcePortID: 'port5', targetID: 'node4', targetPortID: 'portOut' },
        { id: 'connector7', sourceID: 'node6', sourcePortID: 'port6', targetID: 'node5', targetPortID: 'portOut' }
    ];

    //Initializes diagram control
    diagram = new Diagram({
        width: '100%', height: 680, nodes: nodes,
        connectors: connectors,
        //Configrues hierarchical tree layout
        layout: {
            type: 'HierarchicalTree', orientation: 'LeftToRight',
            verticalSpacing: 75, margin: { left: marginLeft, right: 0, top: 0, bottom: 0 }
        },
        created: created,
        //Function to Enable the segmentDcorator size when the Connector is selected      
        selectionChange: function () {
            if (diagram.selectedItems.connectors.length > 0) {
                segmentDecoratorSize.enabled = true;
            }
            else {
                segmentDecoratorSize.enabled = false;
            }
        },
        snapSettings: { constraints: SnapConstraints.None },
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of connectors
        getConnectorDefaults: getConnectorDefaults,
        //Customize the content of the node
        setNodeTemplate: setNodeTemplate,
    });
    diagram.appendTo('#diagram');

    //Click Event to change the connector type.
    document.getElementById('appearance').onclick = changeConnectorPattern;

    //set appearance color
    let objectColor: ColorPicker = new ColorPicker({
        mode: 'Palette',
        showButtons:false,
        modeSwitcher: true,
        value: '#6F409F',
        change: function(args) {
            for(let i=0;i<diagram.connectors.length;i++)
            {
                diagram.connectors[i].style.strokeColor=args.currentValue.hex;
                diagram.connectors[i].targetDecorator.style.strokeColor= args.currentValue.hex;
                diagram.connectors[i].targetDecorator.style.fill= args.currentValue.hex;
                diagram.connectors[i].sourceDecorator.style.strokeColor= args.currentValue.hex;
                diagram.connectors[i].sourceDecorator.style.fill= args.currentValue.hex;
            }
            diagram.dataBind();
        }
    });
    objectColor.appendTo('#color');
    //Shape collection of the decorators.
    let decoratorShape = [
        { shape: 'None', text: 'None' },
        { shape: 'Square', text: 'Square' },
        { shape: 'Circle', text: 'Circle' },
        { shape: 'Diamond', text: 'Diamond' },
        { shape: 'Arrow', text: 'Arrow' },
        { shape: 'OpenArrow', text: 'Open Arrow' },
        { shape: 'Fletch', text: 'Fletch' },
        { shape: 'OpenFetch', text: 'OpenFetch' },
        { shape: 'IndentedArrow', text: 'Indented Arrow' },
        { shape: 'OutdentedArrow', text: 'Outdented Arrow' },
        { shape: 'DoubleArrow', text: 'Double Arrow' }
    ];

    //DropDownList is used to apply the source decorator shape of the connector.
    sourceDecoratorShape = new DropDownList({
        enabled: true, value: 'None',
        dataSource: decoratorShape, fields: { value: 'shape', text: 'text' },
        change: sourceDecoratorShapeChange
    });
    sourceDecoratorShape.appendTo('#sourceDecorator2');

    //DropDownList is used to apply the target decorator shape of the connector.
    targetDecoratorShape = new DropDownList({
        enabled: true, 
        value: 'Arrow',
        dataSource: decoratorShape, fields: { value: 'shape', text: 'text' },
        change: targetDecoratorShapeChange
    });
    targetDecoratorShape.appendTo('#targetDecorator');

    //DropDownList is used to apply the segment decorator shape of the connector.
    let segmentDecoratorshape = new DropDownList({
        enabled: true, value: 'Circle',
        dataSource: decoratorShape, fields: { value: 'shape', text: 'text' },
        change: segmentDecoratorShapeChange
    });
    segmentDecoratorshape.appendTo('#segmentDecorator');

    // Create a numeric text box for adjusting source decorator Size 
     sourceDecoratorSize = new NumericTextBox({
        min: 10,
        max: 20,
        step: 1,
        width: 130,
        value: 12,
        format: 'n0',
        change: sourceDecoratorSizeChange
    });
    sourceDecoratorSize.appendTo('#sourceDecoratorSize');


    // Create a numeric text box for adjusting Target decorator Size 
     targetDecoratorSize = new NumericTextBox({
        min: 10,
        max: 20,
        step: 1,
        width: 130,
        format: 'n0',
        value: 12,
        change:targetDecoratorSizeChange,
    });
    targetDecoratorSize.appendTo('#targetDecoratorSize');

    // Create a numeric text box for adjusting Segment decorator Size 
     segmentDecoratorSize = new NumericTextBox({
        enabled:false,
        min: 10,
        max: 20,
        step: 1,
        format: 'n0',
        width: 130,
        value: 12,
        change:segmentDecoratorSizeChange,
    });
    segmentDecoratorSize.appendTo('#segmentDecoratorSize');
};

