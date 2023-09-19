import { loadCultureFiles } from '../common/culture-loader';
/**
 * Connector sample
 */

import {
    Diagram, NodeModel, TextElement, HierarchicalTree, ConnectorConstraints, Segments, StackPanel, randomId,
    SelectorConstraints, PointPortModel, ConnectorModel, PortVisibility, ConnectorEditing
} from '@syncfusion/ej2-diagrams';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ColorPicker } from '@syncfusion/ej2/inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DecoratorShapes, SegmentThumbShapes } from '@syncfusion/ej2/diagrams';

Diagram.Inject(HierarchicalTree,ConnectorEditing);

let diagram: Diagram;
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

//creation of the TextElement.
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
            case 'cornerRadious':
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

//ConnectorStyle customization
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
        } else {
            connector.sourceDecorator = { shape: 'None' };
            (document.getElementById('sourceDecorator2') as any).value='Circle';
        }
        connector.targetDecorator = {
            style: {
                strokeColor: connector.style.strokeColor,
                fill: connector.style.strokeColor, strokeWidth: 2
            }, shape: 'Arrow'
        };
        (document.getElementById('targetDecorator') as any).value='Circle'
        diagram.dataBind();
    }
    // custom code start
    target.classList.add('e-selected-style');
    // custom code end
}

function srcDecShapeChange(args:any)
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
function tarDecShapeChange(args:any)
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
function segDecShapeChange(args:any)
{
    for (let i = 0; i < diagram.connectors.length; i++) {
        diagram.segmentThumbShape = args.itemData.shape;
    } 
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
        { id: 'node6', offsetX: marginLeft + 530, offsetY: 290, excludeFromLayout: true }
    ];

    //Initialize Diagram connectors
    let connectors: ConnectorModel[] = [
        { id: 'connectr', sourceID: 'node1', targetID: 'node2' },
        { id: 'connectr1', sourceID: 'node2', sourcePortID: 'port1', targetID: 'node3', targetPortID: 'portIn' },
        { id: 'connectr2', sourceID: 'node2', sourcePortID: 'port2', targetID: 'node4', targetPortID: 'portIn' },
        { id: 'connectr3', sourceID: 'node2', sourcePortID: 'port3', targetID: 'node5', targetPortID: 'portIn' },
        { id: 'connectr4', sourceID: 'node6', sourcePortID: 'port4', targetID: 'node3', targetPortID: 'portOut' },
        { id: 'connectr5', sourceID: 'node6', sourcePortID: 'port5', targetID: 'node4', targetPortID: 'portOut' },
        { id: 'connectr7', sourceID: 'node6', sourcePortID: 'port6', targetID: 'node5', targetPortID: 'portOut' }
    ];

    //Initializes diagram control
    diagram = new Diagram({
        width: '100%', height: 580, nodes: nodes,
        connectors: connectors, selectedItems: {
            constraints: (SelectorConstraints.ConnectorSourceThumb | SelectorConstraints.ConnectorTargetThumb)
        },
        //Configrues hierarchical tree layout
        layout: {
            type: 'HierarchicalTree', orientation: 'LeftToRight',
            verticalSpacing: 75, margin: { left: marginLeft, right: 0, top: 0, bottom: 0 }
        },
        created: created,
        snapSettings: { constraints: 0 },
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of connectors
        getConnectorDefaults: getConnectorDefaults,
        //Customize the content of the node
        setNodeTemplate: setNodeTemplate,
    });
    diagram.appendTo('#diagram');

    //Click Event for Appearance of the layout.
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
    let decoratorshape = [
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

    //DropDownList is used to apply the decorator shape of the connector.
    let srcDecoratorShape = new DropDownList({
        enabled: true, value: 'None',
        dataSource: decoratorshape, fields: { value: 'shape', text: 'text' },
        change: srcDecShapeChange
    });
    srcDecoratorShape.appendTo('#sourceDecorator2');

    //DropDownList is used to apply the decorator shape of the connector.
    let tarDecoratorShape = new DropDownList({
        enabled: true, 
        value: 'Arrow',
        dataSource: decoratorshape, fields: { value: 'shape', text: 'text' },
        change: tarDecShapeChange
    });
    tarDecoratorShape.appendTo('#targetDecorator');

    //DropDownList is used to apply the  decorator shape of the connector.
    let segDecoratorshape = new DropDownList({
        enabled: true, value: 'Circle',
        dataSource: decoratorshape, fields: { value: 'shape', text: 'text' },
        change: segDecShapeChange
    });
    segDecoratorshape.appendTo('#segmentDecorator');
};

