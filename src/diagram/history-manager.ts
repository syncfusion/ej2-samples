import { loadCultureFiles } from '../common/culture-loader';
/**
 * Print and Export
 */

import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, IHistoryChangeArgs, HistoryEntry, SnapConstraints
} from '@syncfusion/ej2-diagrams';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { ListView } from '@syncfusion/ej2-lists';

Diagram.Inject(UndoRedo);

let diagram: Diagram;


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let nodes: NodeModel[] = [
        {
            id: 'node1', offsetX: 400, offsetY: 30, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
            shape: { type: 'Flow', shape: 'Terminator' },
            annotations: [{ id: 'label1', content: 'Start' }],
        },
        {
            id: 'node2', offsetX: 400, offsetY: 100, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
            shape: { type: 'Flow', shape: 'Process' }, annotations: [{ id: 'label1', content: 'Design' }],
            ports: [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]
        },
        {
            id: 'node3', offsetX: 400, offsetY: 180, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
            annotations: [{ id: 'label1', content: 'Coding' }],
            shape: { type: 'Flow', shape: 'Process' }, ports: [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]
        },
        {
            id: 'node4', offsetX: 400, offsetY: 260, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
            annotations: [{ id: 'label1', content: 'Testing' }], shape: { type: 'Flow', shape: 'Process' }
        },
        {
            id: 'node5', offsetX: 400, offsetY: 340, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, width: 80, height: 60,
            annotations: [{ id: 'label1', content: 'Errors?' }], shape: { type: 'Flow', shape: 'Decision' }
        },
        {
            id: 'node6', offsetX: 400, offsetY: 430, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
            annotations: [{ id: 'label1', content: 'End' }], shape: { type: 'Flow', shape: 'Terminator' }
        },
        {
            id: 'node7', width: 100, offsetX: 220, offsetY: 180, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, height: 60,
            annotations: [{ id: 'label1', content: 'Design Error?' }], shape: { type: 'Flow', shape: 'Decision' },
            ports: [
                { id: 'porterror', offset: { x: 0.5, y: 0 } },
                { id: 'portcoding', offset: { x: 1, y: 0.5 } },
                { id: 'portdesign', offset: { x: 0.5, y: 1 } }
            ]
        }
    ];

    let connectors: ConnectorModel[] = [
        { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
        { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
        { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
        { id: 'connector4', sourceID: 'node4', targetID: 'node5' },
        {
            id: 'connector5', sourceID: 'node5', targetID: 'node6',
            annotations: [{ content: 'No', style: { fill: 'white' } }]
        },
        {
            id: 'connector6', sourceID: 'node5', targetID: 'node7', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 150, direction: 'Left' }],
            annotations: [{ content: 'Yes', style: { fill: 'white' } }]
        },
        {
            id: 'connector7', sourceID: 'node7', targetID: 'node3', sourcePortID: 'portcoding',
            targetPortID: 'codingPort', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 10, direction: 'Left' }],
            annotations: [{ content: 'No', style: { fill: 'white' } }]
        },
        {
            id: 'connector8', sourceID: 'node7', targetID: 'node2', sourcePortID: 'porterror',
            targetPortID: 'designPort', type: 'Orthogonal',
            annotations: [{ content: 'Yes', style: { fill: 'white' } }]
        }
    ];
    //initialization of the Diagram.
    diagram = new Diagram({
        width: '100%', height: '600px', nodes: nodes, connectors: connectors,
        getNodeDefaults: getNodeDefaults,
        snapSettings: { constraints: SnapConstraints.None },
        getConnectorDefaults: (obj: ConnectorModel) => {
            obj.style.fill = '#707070';
            obj.targetDecorator.style.fill = '#707070';
            obj.targetDecorator.style.strokeColor = '#707070';
        }
    });

    diagram.appendTo('#diagram');
    diagram.historyChange = (arg: IHistoryChangeArgs) => {
        getValue();
    };
    diagram.fitToPage({ mode: 'Height' });

    let stackLimit: NumericTextBox = new NumericTextBox({
        value: 0, min: 0, max: 50, width: '100%',
        format: '##.##', step: 1,
        change: (args: NumericChangeEventArgs) => {
            diagram.setStackLimit(args.value);
        }
    });
    stackLimit.appendTo('#StackLimit');


    let listviewInstance: ListView = new ListView({
        // dataSource: { 'value': 'value', text: 'text' },
        height: '180px',

    });
    listviewInstance.appendTo('#redoList');

    let listview: ListView = new ListView({
        // fields: { value: 'value', text: 'text' },
        height: '180px',

    });
    listview.appendTo('#undoList');

    let clearHistory: Button = new Button({
        content: 'Clear History'
    });
    clearHistory.appendTo('#clearHistory');
    clearHistory.element.onclick = () => {
        diagram.clearHistory();
        getValue();
    };

    let startGroupAction: Button = new Button({
        isToggle: true,
    });
    startGroupAction.appendTo('#startGroupAction');

    let undoButton: Button = new Button({
        disabled: true
    });
    undoButton.appendTo('#undo');
    undoButton.element.onclick = (): void => {
        diagram.undo();
    };

    let redoButton: Button = new Button({
        disabled: true
    });
    redoButton.appendTo('#redo');
    redoButton.element.onclick = (): void => {
        diagram.redo();
    };

    //Toggle button click event handler
    startGroupAction.element.onclick = (): void => {
        if (startGroupAction.element.classList.contains('e-active')) {
            startGroupAction.content = 'End Group Action';
            diagram.startGroupAction();
        } else {
            diagram.endGroupAction();
            startGroupAction.content = 'Start Group Action';
        }
    };

    function getNodeDefaults(obj: NodeModel): NodeModel {
        obj.annotations[0].style.color = '#111111';
        return obj;
    }

    function getValue(): void {
        let undoStack: HistoryEntry[] = diagram.historyManager.undoStack;
        let redoStack: HistoryEntry[] = diagram.historyManager.redoStack;
        let undo: {}[] = [];
        for (let i: number = 0; i < undoStack.length; i++) {
            undo.push({ 'text': undoStack[i].type, 'value': undoStack[i].type });
        }

        let redo: {}[] = [];
        for (let i: number = 0; i < redoStack.length; i++) {
            redo.push({ 'text': redoStack[i].type, 'value': redoStack[i].type });
        }

        undoButton.disabled = undo.length ? false : true;
        redoButton.disabled = redo.length ? false : true;

        let itemsCount: number = diagram.historyManager.stackLimit ? diagram.historyManager.stackLimit : 0;
        let undoList: DropDownList = (document.getElementById('undoList') as any).ej2_instances[0];
        undoList.dataSource = undo;
        undoList.fields = { text: 'text', value: 'text' };
        undoList.index = 0;
        undoList.dataBind();

        let redoList: DropDownList = (document.getElementById('redoList') as any).ej2_instances[0];
        redoList.dataSource = redo;
        redoList.fields = { text: 'text', value: 'text' };
        redoList.index = 0;
        redoList.dataBind();
    }
};