import { loadCultureFiles } from '../common/culture-loader';
/**
 * Getting started -  Annotation
 */

import {
    Diagram, NodeModel, ConnectorModel, Node, TextStyleModel,
    ISelectionChangeEventArgs, ConnectorConstraints, SnapConstraints,
    VerticalAlignment, HorizontalAlignment, ShapeAnnotationModel, PointModel, AnnotationConstraints
} from '@syncfusion/ej2-diagrams';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { NumericTextBox, ColorPicker, ColorPickerEventArgs, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';

let diagram: Diagram;


function selectionChange(arg: ISelectionChangeEventArgs): void {
    if (arg.state === 'Changed') {
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        if (arg.newValue[0]) {
            let node: NodeModel = arg.newValue[0] as NodeModel;
            let annotations: ShapeAnnotationModel[] = node.annotations;
            let offset: PointModel = annotations[0].offset;
            if (offset.x === 0 && offset.y === 0) {
                updatePosition('left');
            } else if (offset.x === 1 && offset.y === 0) {
                updatePosition('right');
            } else if (offset.x === 0 && offset.y === 1) {
                updatePosition('bottoml');
            } else if (offset.x === 1 && offset.y === 1) {
                updatePosition('bottomr');
            } else if (offset.x === 0.5 && offset.y === 0.5) {
                updatePosition('center');
            } else if (offset.x === 0.5 && offset.y === 1) {
                updatePosition('bottomcenter_top');
            }
        }
        enableOptions(arg);
    }
}

//Sets the default values of a node
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 130;
    obj.height = 50;
    obj.style = { fill: '#D5EDED', strokeColor: '#7DCFC9', strokeWidth: 1 };
    obj.shape = { cornerRadius: 5 };
    return obj;
}

//Sets the default values of a connector
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    obj.type = 'Orthogonal';
    obj.constraints = ConnectorConstraints.None;
    return obj;
}

//Apply the appearence of the Annotation 
function updateAnnotation(value: string, fontSize?: number, fontFamily?: string): void {
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
        let node: NodeModel = diagram.selectedItems.nodes[i];
        for (let j: number = 0; j < node.annotations.length; j++) {
            let annotationStyle: TextStyleModel = (node.annotations[j].style as TextStyleModel);
            if (value === 'fontsize') {
                annotationStyle.fontSize = fontSize;
            } else if (value === 'underline') {
                annotationStyle.textDecoration =
                    annotationStyle.textDecoration === 'Underline' ? 'None' : 'Underline';
            } else if (value === 'fontfamily') {
                annotationStyle.fontFamily = fontFamily;
            } else if (value === 'bold') {
                annotationStyle.bold = !annotationStyle.bold;
            } else if (value === 'italic') {
                annotationStyle.italic = !annotationStyle.italic;
            } else if (value === 'template') {
                if (fontFamily === 'none') {
                    node.annotations[j].template = '';
                    node.annotations[j].width = undefined;
                    node.annotations[j].height = undefined;
                } else {
                    node.annotations[j].width = 25;
                    node.annotations[j].height = 25;
                    node.annotations[j].template =
                        '<img src="src/diagram/Images/annotation/' + fontFamily + '.svg" style="width:100%;height:100%" />';
                }
            } else if (value === 'interaction') {
                node.annotations[j].constraints = node.annotations[j].constraints ^ AnnotationConstraints.Interaction;
            }
            diagram.dataBind();
        }
    }
}
//Update the Annotation Position based on the selection
function updatePosition(id: string): void {
    let target: HTMLElement = document.getElementById(id);
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
        let node: NodeModel = diagram.selectedItems.nodes[i];
        //we can refactor this code using a method
        for (let j: number = 0; j < node.annotations.length; j++) {
            let annotation: ShapeAnnotationModel = node.annotations[j];
            switch (target.id) {
                case 'left':
                    setAnnotationPosition(annotation, 0, 0, 'Top', 'Left', target);
                    break;
                case 'right':
                    setAnnotationPosition(annotation, 1, 0, 'Top', 'Right', target);
                    break;
                case 'bottoml':
                    setAnnotationPosition(annotation, 0, 1, 'Bottom', 'Left', target);
                    break;
                case 'bottomr':
                    setAnnotationPosition(annotation, 1, 1, 'Bottom', 'Right', target);
                    break;
                case 'center':
                    setAnnotationPosition(annotation, 0.5, .5, 'Center', 'Center', target);
                    break;
                case 'bottomcenter_top':
                    setAnnotationPosition(annotation, 0.5, 1, 'Top', 'Center', target);
                    break;
            }
        }
    }
}
//set the Annotation Position
function setAnnotationPosition( //it is in dedicated line here.
    annotation: ShapeAnnotationModel, offsetX: number, offsetY: number,
    vAlignment: VerticalAlignment, hAlignment: HorizontalAlignment, target: HTMLElement
): void {
    annotation.offset.x = offsetX;
    annotation.offset.y = offsetY;
    annotation.verticalAlignment = vAlignment;
    annotation.horizontalAlignment = hAlignment;
    if (vAlignment === 'Top' && hAlignment === 'Left') {
        annotation.margin = { left: 3, top: 3 };
    } else if (vAlignment === 'Top' && hAlignment === 'Right') {
        annotation.margin = { right: 3, top: 3 };
    } else if (vAlignment === 'Bottom' && hAlignment === 'Left') {
        annotation.margin = { left: 3, bottom: 3 };
    } else if (vAlignment === 'Bottom' && hAlignment === 'Right') {
        annotation.margin = { right: 3, bottom: 3 };
    }
    target.classList.add('e-selected-style');
}
//Enable or disable the property panel
function enableOptions(arg: ISelectionChangeEventArgs): void {
    let appearance: HTMLElement = document.getElementById('propertypanel');
    let selectedElement: HTMLCollection = document.getElementsByClassName('e-remove-selection');
    if (arg.newValue) {
        if (arg.newValue[0] instanceof Node) {
            if (selectedElement.length) {
                selectedElement[0].classList.remove('e-remove-selection');
            }
        } else {
            if (!appearance.classList.contains('e-remove-selection')) {
                appearance.classList.add('e-remove-selection');
            }
        }
    }
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let bounds: ClientRect = document.getElementsByClassName('content-wrapper')[0].getBoundingClientRect();
    let centerX: number = (bounds.width / 2);
    //Initializes the nodes for the diagram
    let nodes: NodeModel[] = [
        {
            id: 'industry', offsetX: centerX, offsetY: 250,
            annotations: [{ content: 'Industry Competitors' }]
        },
        {
            id: 'potential', offsetX: centerX, offsetY: 110,
            annotations: [{ content: 'Potential Entrants' }]
        },
        {
            id: 'suplier', offsetX: centerX - 190, offsetY: 250,
            annotations: [{ content: 'Suppliers' }]
        },
        {
            id: 'substitutes', offsetX: centerX, offsetY: 390,
            annotations: [{ content: 'Substitutes' }]
        },
        {
            id: 'buyers', offsetX: centerX + 190, offsetY: 250,
            annotations: [{ content: 'Buyers' }]
        }
    ];

    //Initializes the connector for the diagram
    let connectors: ConnectorModel[] = [
        {
            id: 'connector1', sourceID: 'potential', targetID: 'industry'
        }, {
            id: 'connector2', sourceID: 'suplier', targetID: 'industry'
        }, {
            id: 'connector3', sourceID: 'substitutes', targetID: 'industry',
        }, {
            id: 'connector4', sourceID: 'buyers', targetID: 'industry'
        }, {
            id: 'connector5', sourceID: 'potential', targetID: 'buyers',
            segments: [{ direction: 'Right', type: 'Orthogonal', length: 60 }], targetDecorator: { shape: 'None' }
        }, {
            id: 'connector6', sourceID: 'buyers', targetID: 'substitutes',
            segments: [{ direction: 'Bottom', type: 'Orthogonal', length: 100 }], targetDecorator: { shape: 'None' }
        }, {
            id: 'connector7', targetID: 'suplier', sourceID: 'substitutes',
            segments: [{ direction: 'Left', type: 'Orthogonal', length: 60 }], targetDecorator: { shape: 'None' }
        }, {
            id: 'connector9', sourceID: 'suplier', targetID: 'potential',
            segments: [{ direction: 'Top', type: 'Orthogonal', length: 100 }], targetDecorator: { shape: 'None' }
        }
    ];

    //Initializes diagram control
    diagram = new Diagram({
        width: '100%', height: '565px', nodes: nodes, connectors: connectors,
        selectionChange: selectionChange,
        //Sets the default values of a node
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of a connector
        getConnectorDefaults: getConnectorDefaults,
        snapSettings: { constraints: SnapConstraints.None }
    });
    diagram.appendTo('#diagram');
    diagram.select([diagram.nodes[0]]);

    //Button used to apply for Bold of the Annotation
    let bold: Button = new Button({ iconCss: 'e-ddb-icons e-bold' });
    bold.appendTo('#bold');
    bold.element.onclick = () => { updateAnnotation('bold'); };

    //Button used to apply for Italic of the Annotation
    let italic: Button = new Button({
        iconCss: 'e-ddb-icons e-italic'
    });
    italic.appendTo('#italic');
    italic.element.onclick = () => { updateAnnotation('italic'); };

    //Button used to apply for Underline of the Annotation
    let underLine: Button = new Button({
        iconCss: 'e-ddb-icons e-underline'
    });
    underLine.appendTo('#underline');
    underLine.element.onclick = () => { updateAnnotation('underline'); };

    //NumericTextBox used to apply for Fontsize of the Annotation

    let fontSize: NumericTextBox = new NumericTextBox({
        value: 0, min: 1, max: 8, width: '100%',
        format: '##.##', step: 2,
        change: (args: NumericChangeEventArgs) => {
            updateAnnotation('fontsize', args.value);
        }
    });
    fontSize.appendTo('#fontSize');

    //Colorpicker used to apply for Color of the Annotation
    let fontColor: ColorPicker = new ColorPicker({
        value: '#000', change: (arg: ColorPickerEventArgs) => {
            for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
                let node: NodeModel = diagram.selectedItems.nodes[i];
                for (let j: number = 0; j < node.annotations.length; j++) {
                    (node.annotations[j].style as TextStyleModel).color = arg.currentValue.rgba;
                }
            }
        }
    });
    fontColor.appendTo('#fontcolor');

    //FontType Collection
    let fontType: { [key: string]: Object }[] = [
        { type: 'Arial', text: 'Arial' },
        { type: 'Aharoni', text: 'Aharoni' },
        { type: 'Bell MT', text: 'Bell MT' },
        { type: 'Fantasy', text: 'Fantasy' },
        { type: 'Times New Roman', text: 'Times New Roman' },
        { type: 'Segoe UI', text: 'Segoe UI' },
        { type: 'Verdana', text: 'Verdana' }
    ];

    //FontType Collection
    let templateList: { [key: string]: Object }[] = [
        { value: 'none', text: 'None' },
        { value: 'industry', text: 'Industry Competitors' },
        { value: 'suppliers', text: 'Suppliers' },
        { value: 'potential', text: 'Potential Entrants' },
        { value: 'buyers', text: 'Buyers' },
        { value: 'substitutes', text: 'Substitutes' }
    ];

    //DropDownList used to apply for fontFamily of the Annotation
    let fontFamily: DropDownList = new DropDownList({
        dataSource: fontType,
        fields: { value: 'type', text: 'text' }, popupWidth: 150,
        width: '100%', placeholder: 'select a font type', index: 0,
        change: (args: ChangeEventArgs) => {
            updateAnnotation('fontfamily', null, args.value.toString());
        }
    });
    fontFamily.appendTo('#fontfamily');

    let template: DropDownList = new DropDownList({
        dataSource: templateList,
        fields: { value: 'value', text: 'text' }, popupWidth: 200,
        width: '100%', placeholder: 'select a template', index: 0,
        change: (args: ChangeEventArgs) => {
            updateAnnotation('template', null, args.value.toString());
        }
    });
    template.appendTo('#template');

    //checkbox is used to enable or disable the connector interaction.
    let labelConstraints: CheckBox = new CheckBox({
        checked: false,
        label: 'Label interaction',
        change: (args: CheckBoxChangeEventArgs) => {
            updateAnnotation('interaction', null, null);
        }
    });
    labelConstraints.appendTo('#labelConstraints');

    //Click event for Appearance of the Property Panel
    document.getElementById('appearance').onclick = (args: MouseEvent) => {
        let target: HTMLElement = args.target as HTMLElement;
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length) {
            selectedElement[0].classList.remove('e-selected-style');
        }
        if (target.className === 'image-pattern-style') {
            updatePosition(target.id);
        }
    };
};
