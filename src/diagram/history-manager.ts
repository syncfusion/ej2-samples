/**
 * Print and Export
 */

import {
    Diagram, NodeModel, UndoRedo, ConnectorModel, IHistoryChangeArgs, HistoryEntry, SnapConstraints,
    FlowShapes,
} from '@syncfusion/ej2-diagrams';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { ListView } from '@syncfusion/ej2-lists';

Diagram.Inject(UndoRedo);

let diagram: Diagram;

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    // Helper function to create a NodeModel with default parameters
    function createNode(
        id: string,
        offsetX: number,
        offsetY: number,
        fill: string,
        strokeColor: string,
        shape: FlowShapes,
        content: string,
        width: number = 70,
        height: number = 40,
        ports: any[] = []): NodeModel {
        return {
            id,
            offsetX,
            offsetY,
            style: { fill, strokeColor },
            width,
            height,
            shape: { type: 'Flow', shape: shape },
            annotations: [{ content }],
            ports
        };
    }

    // Initialize Diagram Nodes using the createNode function
    let nodes: NodeModel[] = [
        createNode('node1', 400, 30, '#FFB2B2', '#FFB2B2', 'Terminator', 'Start'),
        createNode('node2', 400, 100, '#DCDCDC', '#DCDCDC', 'Process', 'Design', undefined, undefined, [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]),
        createNode('node3', 400, 180, '#DCDCDC', '#DCDCDC', 'Process', 'Coding', undefined, undefined, [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]),
        createNode('node4', 400, 260, '#DCDCDC', '#DCDCDC', 'Process', 'Testing'),
        createNode('node5', 400, 340, '#A2D8B0', '#A2D8B0', 'Decision', 'Errors?', 80, 60),
        createNode('node6', 400, 430, '#FFB2B2', '#FFB2B2', 'Terminator', 'End'),
        createNode('node7', 220, 180, '#A2D8B0', '#A2D8B0', 'Decision', 'Design Error?', 100, 60, [
            { id: 'porterror', offset: { x: 0.5, y: 0 } },
            { id: 'portcoding', offset: { x: 1, y: 0.5 } },
            { id: 'portdesign', offset: { x: 0.5, y: 1 } }
        ])
    ];

    // Helper function to create a ConnectorModel with default parameters
    function createConnector(
        id: string,
        sourceID: string,
        targetID: string,
        annotations: any[],
        segments: any[] = [],
        sourcePortID: string = '',
        targetPortID: string = ''): ConnectorModel {
        return {
            id,
            sourceID,
            targetID,
            annotations,
            type: 'Orthogonal',
            segments,
            sourcePortID,
            targetPortID
        };
    }

    // Common labels for connectors
    let noLabel = [{ content: 'No', style: { fill: 'white' } }];
    let yesLabel = [{ content: 'Yes', style: { fill: 'white' } }];

    // Initialize Diagram Connectors using the createConnector function
    let connectors: ConnectorModel[] = [
        createConnector('connector1', 'node1', 'node2', []),
        createConnector('connector2', 'node2', 'node3', []),
        createConnector('connector3', 'node3', 'node4', []),
        createConnector('connector4', 'node4', 'node5', []),
        createConnector('connector5', 'node5', 'node6', noLabel),
        createConnector('connector6', 'node5', 'node7', yesLabel, [{ type: 'Orthogonal', length: 150, direction: 'Left' }]),
        createConnector('connector7', 'node7', 'node3', noLabel, [{ type: 'Orthogonal', length: 10, direction: 'Left' }], 'portcoding', 'codingPort'),
        createConnector('connector8', 'node7', 'node2', yesLabel, [], 'porterror', 'designPort')
    ];

    // Initialization of the Diagram.
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
        updateHistoryLists();
    };

    // Method called after rendering completes to fit diagram to page and setup event listeners
    diagram.fitToPage({ mode: 'Height' });

    // Initialize NumericTextBox for setting stack limit
    const stackLimit = new NumericTextBox({
        value: 0,
        min: 0,
        max: 50,
        width: '100%',
        format: '##.##',
        step: 1,
        change: (args: NumericChangeEventArgs) => diagram.setStackLimit(args.value)
    });
    stackLimit.appendTo('#StackLimit');

    // ListView for displaying redo history
    let listviewInstance: ListView = new ListView({
        height: '180px',
    });
    listviewInstance.appendTo('#redoList');

    // ListView for displaying undo history
    let listview: ListView = new ListView({
        height: '180px',
    });
    listview.appendTo('#undoList');

    let clearHistory: Button = new Button({
        content: 'Clear History'
    });
    clearHistory.appendTo('#clearHistory');
    clearHistory.element.onclick = () => {
        diagram.clearHistory();
        updateHistoryLists();
    };

    // Button for starting group action
    let startGroupAction: Button = new Button({
        isToggle: true,
    });
    startGroupAction.appendTo('#startGroupAction');

    // Button for undoing action
    let undoButton: Button = new Button({
        disabled: true
    });
    undoButton.appendTo('#undo');
    undoButton.element.onclick = (): void => {
        diagram.undo();
    };

    // Button for redoing action
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

    // Function to customize default node appearance
    function getNodeDefaults(obj: NodeModel): NodeModel {
        obj.annotations[0].style.color = '#111111';
        return obj;
    }

    // Function to update undo and redo lists
    function updateHistoryLists(): void {
        const { undoStack, redoStack, stackLimit } = diagram.historyManager;

        const formatStack = (stack: HistoryEntry[]) => stack.map(entry => ({ text: entry.type, value: entry.type }));

        const undo = formatStack(undoStack);
        const redo = formatStack(redoStack);

        // Enabling/disabling undo and redo buttons based on stack length
        undoButton.disabled = undo.length === 0;
        redoButton.disabled = redo.length === 0;

        // Common function to update dropdown list
        const updateDropDownList = (id: string, dataSource: {}[]) => {
            const list = (document.getElementById(id) as any)?.ej2_instances[0];
            if (list) {
                list.dataSource = dataSource;
                list.fields = { text: 'text', value: 'text' };
                list.index = 0;
                list.dataBind();
            }
        };

        // Updating undo list
        updateDropDownList('undoList', undo);

        // Updating redo list
        updateDropDownList('redoList', redo);
    }
};