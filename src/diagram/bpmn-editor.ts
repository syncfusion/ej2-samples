import { loadCultureFiles } from '../common/culture-loader';

/**
 * BPMN Editor sample
 */

// Importing needed dependencies for diagram
import {
    Diagram, NodeModel, Node, BpmnDiagrams, UndoRedo, DiagramBeforeMenuOpenEventArgs, BpmnGateways,
    SymbolPalette, BpmnShapeModel, DiagramContextMenu, ConnectorModel, NodeConstraints,
    BpmnDataObjects, BpmnTriggers, BpmnTasks, BpmnBoundary, BpmnLoops, BpmnGatewayModel,
    ContextMenuSettingsModel, IDragEnterEventArgs, BpmnEvents,
} from '@syncfusion/ej2-diagrams';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { addEvents } from './script/diagram-common';
import { Segments } from '@syncfusion/ej2-diagrams';

// tslint:disable 
Diagram.Inject(BpmnDiagrams, UndoRedo, DiagramContextMenu);
SymbolPalette.Inject(BpmnDiagrams);

// Define a variable to hold an instance of the DiagramComponent
let diagram: Diagram;

// Creates a BPMN event node with specified properties
const createBpmnEventNode = (id: string, offsetX: number, offsetY: number, eventType: BpmnEvents, annotationContent: string = '') => {
    // Define the node model with basic properties and a BPMN event shape
    const node: NodeModel = {
        id,
        width: 40,
        height: 40,
        offsetX,
        offsetY,
        shape: { type: 'Bpmn', shape: 'Event', event: { event: eventType } }
    };
    // If annotation content is provided, add an annotation to the node
    if (annotationContent) {
        node.annotations = [{
            id: `${id}Label`,
            content: annotationContent,
            style: { fill: 'white', color: 'black' },
            verticalAlignment: 'Top',
            margin: { top: 20 }
        }];
    }
    return node;
};

// Creates a BPMN event node with specified margins
const createBpmnEventNodeWithMargin = (id: string, marginX: number, marginY: number, eventType: BpmnEvents, trigger?: BpmnTriggers) => {
    const node: NodeModel = {
        id,
        width: 30,
        height: 30,
        shape: { type: 'Bpmn', shape: 'Event', event: { event: eventType, trigger: trigger } },
        margin: { left: marginX, top: marginY }
    }
    return node;
};

// Creates a BPMN activity node with task type and additional properties
const createBpmnActivity = (
    id: string, fill: string, content: string, left: number, top: number, width: number, height: number,
    taskType: BpmnTasks = 'Service', loop?: BpmnLoops, compensation?: boolean
): NodeModel => ({
    id: id,
    style: { fill: fill },
    width: width,
    height: height,
    shape: {
        type: 'Bpmn', shape: 'Activity',
        activity: { activity: 'Task', task: { type: taskType, loop: loop, compensation: compensation } },
    },
    annotations: [{
        id: `${id}Label2`, content: content, offset: { x: 0.5, y: 0.6 },
        style: { color: 'white' }
    }],
    margin: { left: left, top: top },
});

// Initializes nodes for key elements in a business process flow
let nodes: NodeModel[] = [
    createBpmnEventNode('start', 35, 230, 'Start'),
    createBpmnEventNode('hazardEnd', 305, 420, 'End', 'Hazard'),
    createBpmnEventNode('cancelledEnd', 545, 420, 'End', 'Cancelled'),
    createBpmnEventNode('end', 665, 230, 'End'),
    createBpmnEventNodeWithMargin('processesStart', 40, 80, 'Start'),
    createBpmnActivity('service', '#6FAAB0', 'Book hotel', 110, 20, 95, 70, 'Service', 'ParallelMultiInstance'),
    createBpmnEventNodeWithMargin('compensation', 170, 100, 'Intermediate', 'Compensation'),
    createBpmnActivity('processesTask', '#F6B53F', 'Charge credit card', 290, 20, 95, 70, 'Service'),
    createBpmnEventNodeWithMargin('error', 350, 100, 'Intermediate', 'Error'),
    createBpmnEventNodeWithMargin('processesEnd', 440, 80, 'End'),
    createBpmnActivity('user', '#E94649', 'Cancel hotel reservation', 240, 160, 90, 80, 'User', 'None', true),
    createBpmnEventNodeWithMargin('subProcessesEnd', 440, 210, 'End'),
    {
        id: 'subProcess',
        width: 520,
        height: 250,
        offsetX: 355,
        offsetY: 230,
        constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
        shape: {
            shape: 'Activity', type: 'Bpmn',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', collapsed: false,
                    processes: ['processesStart', 'service', 'compensation', 'processesTask',
                        'error', 'processesEnd', 'user', 'subProcessesEnd']
                }
            }
        }
    },
];

// Creates a connector between BPMN nodes with optional annotations and properties
const createConnector = (
    id: string, sourceID: string, targetID: string,
    annotationContent: string = "", sourcePortID: string = "", additionalProps: any = {}
): ConnectorModel => ({
    id,
    sourceID,
    targetID,
    sourcePortID,
    type: "Orthogonal",
    // Conditionally add annotations if content is provided
    ...(annotationContent && {
        annotations: [{
            id: `${id}Label`,
            content: annotationContent,
            offset: 0.50,
            style: { fill: 'white' }
        }]
    }),
    ...additionalProps // Spread additional properties for customization
});

// Initializes connectors to define flow and relationships between BPMN elements
let connectors: ConnectorModel[] = [
    createConnector('connector1', 'start', 'subProcess'),
    createConnector('connector2', 'subProcess', 'end', '', 'success'),
    createConnector('connector3', 'subProcess', 'hazardEnd', 'Booking system failure', 'failure', {
        segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]
    }),
    createConnector('connector4', 'subProcess', 'cancelledEnd', '', 'cancel', {
        segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]
    }),
    createConnector('connector5', 'processesStart', 'service'),
    createConnector('connector6', 'service', 'processesTask'),
    createConnector('connector7', 'processesTask', 'processesEnd'),
    createConnector('connector8', 'compensation', 'user', '', '', {
        shape: { type: 'Bpmn', flow: 'Association', association: 'Directional' },
        style: { strokeDashArray: '2,2' },
        segments: [{ type: 'Orthogonal', length: 30, direction: 'Bottom' }, { type: 'Orthogonal', length: 80, direction: 'Right' }]
    }),
    createConnector('connector9', 'error', 'subProcessesEnd', 'Cannot charge card', '', {
        segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }]
    })
];

// Retrieves specific shape details for BPMN elements based on type and subtype
const getShapeDetails = (type: string, subType: string): any => {
    switch (type) {
        case 'Event':
            // Returns BPMN event details
            return { event: { event: subType } };
        case 'Activity':
            if (subType === 'Task') {
                // Returns BPMN task details
                return { activity: { activity: subType } };
            } else if (subType === 'Transaction') {
                // Returns BPMN transaction subprocess details
                return {
                    activity: {
                        activity: 'SubProcess',
                        subProcess: {
                            type: subType,
                            transaction: {
                                cancel: { visible: false },
                                failure: { visible: false },
                                success: { visible: false }
                            }
                        }
                    }
                };
            } else if (subType === 'Service') {
                // Returns BPMN service task details
                return { activity: { activity: 'Task', task: { type: subType } } };
            }
            break;
        case 'Gateway':
            // Returns BPMN gateway details
            return { gateway: { type: 'Exclusive' } };
        case 'DataObject':
            // Returns BPMN data object details
            return { dataObject: { collection: false, type: 'None' } };
        default:
            return {};
    }
};

// Creates a BPMN shape node with specified dimensions, type, and subtype
const createBpmnShape = (id: string, width: number, height: number, type: string, subType: string): NodeModel => ({
    id,
    width,
    height,
    // Setting the BPMN shape based on type and subtype
    shape: { type: 'Bpmn', shape: type, ...getShapeDetails(type, subType) }
});

// Initializes an array of BPMN shapes for the symbol palette
let bpmnShapes: NodeModel[] = [
    createBpmnShape('Start', 35, 35, 'Event', 'Start'),
    createBpmnShape('NonInterruptingIntermediate', 35, 35, 'Event', 'NonInterruptingIntermediate'),
    createBpmnShape('End', 35, 35, 'Event', 'End'),
    createBpmnShape('Task', 35, 35, 'Activity', 'Task'),
    createBpmnShape('Transaction', 35, 35, 'Activity', 'Transaction'),
    createBpmnShape('Task_Service', 35, 35, 'Activity', 'Service'),
    createBpmnShape('Gateway', 35, 35, 'Gateway', ''),
    createBpmnShape('DataObject', 35, 35, 'DataObject', ''),
    // Defines a subprocess node that allows dropping other elements into it, representing a transaction in the business process
    {
        id: 'subProcess',
        width: 520,
        height: 250,
        offsetX: 355,
        offsetY: 230,
        constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
        shape: {
            shape: 'Activity',
            type: 'Bpmn',
            activity: {
                activity: 'SubProcess',
                subProcess: {
                    type: 'Transaction',
                    collapsed: false,
                    processes: [],
                    transaction: {
                        cancel: { visible: false },
                        failure: { visible: false },
                        success: { visible: false }
                    }
                }
            }
        }
    },
];

// Define a base connector symbol to reduce redundancy
const baseConnector: Partial<ConnectorModel> = {
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: { style: { strokeColor: '#757575', fill: '#757575' }, shape: "Arrow" },
    style: { strokeColor: '#757575', strokeWidth: 2 }
};

// Initialize an array of connector symbols for the symbol palette
let connectorSymbols: ConnectorModel[] = [
    { ...baseConnector, id: 'Link1', type: 'Orthogonal' },
    { ...baseConnector, id: 'Link2', type: 'Orthogonal', style: { ...baseConnector.style, strokeDashArray: '4 4' } },
    { ...baseConnector, id: 'Link3', type: 'Straight' },
    {
        id: 'link4',
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        type: 'Orthogonal',
        targetDecorator: { style: { strokeColor: '#757575', fill: '#757575' } },
        shape: { type: 'Bpmn', flow: 'Association', association: 'Directional' },
        style: { strokeDashArray: '2,2', strokeColor: '#757575' },
    },
];

// Initializes the context menu for BPMN shapes with various options.
let contextMenu: ContextMenuSettingsModel = {
    show: true,
    items: [
        {
            text: 'Ad-Hoc',
            id: 'Adhoc',
            // Sub-menu for Ad-Hoc options
            items: [
                { text: 'None', iconCss: 'e-adhocs e-bpmn-event e-bpmn-icons e-None', id: 'AdhocNone' },
                { iconCss: 'e-adhocs e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }
            ]
        },
        {
            text: 'Loop',
            id: 'Loop',
            // Sub-menu for Loop options
            items: [
                { text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
                { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
                { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
                { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }
            ]
        },
        {
            text: 'Compensation',
            id: 'taskCompensation',
            // Sub-menu for Compensation options
            items: [
                { text: 'None', iconCss: 'e-compensation e-bpmn-icons e-None', id: 'CompensationNone' },
                { iconCss: 'e-compensation e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }
            ]
        },
        {
            text: 'Activity-Type',
            id: 'Activity-Type',
            // Sub-menu for Activity-Type options
            items: [
                { text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
                { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }
            ]
        },
        {
            text: 'Boundry',
            id: 'Boundry',
            // Sub-menu for Boundary options
            items: [
                { text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
                { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
                { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' }
            ]
        },
        {
            text: 'Data Object',
            id: 'DataObject',
            // Sub-menu for Data Object options
            items: [
                { text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
                { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
                { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }
            ]
        },
        {
            text: 'Collection',
            id: 'collection',
            // Sub-menu for Collection options
            items: [
                { text: 'None', iconCss: 'e-collection e-bpmn-icons e-None', id: 'collectionNone' },
                { text: 'Collection', iconCss: 'e-collection e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }
            ]
        },
        {
            text: 'Call',
            id: 'DeftCall',
            // Sub-menu for Call options
            items: [
                { text: 'None', iconCss: 'e-call e-bpmn-icons e-None', id: 'CallNone' },
                { text: 'Call', iconCss: 'e-call e-bpmn-icons e-CallActivity', id: 'CallCall' }
            ]
        },
        {
            text: 'Trigger Result',
            id: 'TriggerResult',
            // Sub-menu for Trigger Result options
            items: [
                { text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
                { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
                { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
                { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
                { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
                { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
                { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
                { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
                { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
                { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
                { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
                { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
                { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
            ]
        },
        {
            text: 'Event Type',
            id: 'EventType',
            // Sub-menu for Event Type options
            items: [
                { text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart' },
                { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
                { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
                { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
                { text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate', iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate' },
                { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }
            ]
        },
        {
            text: 'Task Type',
            id: 'TaskType',
            // Sub-menu for Task Type options
            items: [
                { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
                { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
                { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
                { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
                { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
                { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
                { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'User', id: 'User', iconCss: 'e-task e-icons e-user' },
            ]
        },
        {
            text: 'GateWay',
            id: 'GateWay',
            iconCss: 'e-bpmn-icons e-Gateway',
            // Sub-menu for Gateway options
            items: [
                { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None' },
                { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
                { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
                { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
                { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
                { text: 'EventBased', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
                { text: 'ExclusiveEventBased', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
                { text: 'ParallelEventBased', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
            ]
        }
    ],
    showCustomMenuOnly: true,
};

// Configures drag-and-drop behavior for nodes
function dragEnter(args: IDragEnterEventArgs): void {
    let node: NodeModel = args.element as NodeModel;
    if (node instanceof Node) {
        let bpmnShape: BpmnShapeModel = node.shape as BpmnShapeModel;
        if (!bpmnShape.activity.subProcess.collapsed) {
            const transaction = bpmnShape.activity.subProcess.transaction;
            transaction.cancel.visible = true;
            transaction.failure.visible = true;
            transaction.success.visible = true;
        } else {
            let ratio: number = 100 / node.width;
            let oldWidth: number = node.width;
            let oldHeight: number = node.height;
            node.width = 100;
            node.height *= ratio;
            node.offsetX += (node.width - oldWidth) / 2;
            node.offsetY += (node.height - oldHeight) / 2;
        }
    }
}

// Handles context menu click events within the BPMN editor.
function contextMenuClick(args: MenuEventArgs): void {
// Check if any node is selected
    if (diagram.selectedItems.nodes.length > 0) {
        let bpmnShape: BpmnShapeModel = diagram.selectedItems.nodes[0].shape as BpmnShapeModel;
        if (args.item.iconCss) {
            if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                bpmnShape.activity.subProcess.adhoc = args.item.id === 'AdhocNone' ? false : true;
            }
            if (args.item.iconCss.indexOf('e-event') > -1) {
                bpmnShape.event.event = (args.item.id as BpmnEvents);
            }
            if (args.item.iconCss.indexOf('e-trigger') > -1) {
                bpmnShape.event.trigger = (args.item.text as BpmnTriggers);
            }
            if (args.item.iconCss.indexOf('e-loop') > -1) {
                let loop: string = (args.item.id === 'LoopNone' as BpmnLoops) ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.loop = loop as BpmnLoops;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.loop = loop as BpmnLoops;
                }
            }
            if (args.item.iconCss.indexOf('e-compensation') > -1) {
                let compensation: boolean = (args.item.id === 'CompensationNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.compensation = compensation;
                }
                if (bpmnShape.activity.activity === 'SubProcess') {
                    bpmnShape.activity.subProcess.compensation = compensation;
                }
            }
            if (args.item.iconCss.indexOf('e-call') > -1) {
                let compensation: boolean = (args.item.id === 'CallNone') ? false : true;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.call = compensation;
                }
            }

            if (args.item.iconCss.indexOf('e-boundry') > -1) {
                let call: string = args.item.id;
                if (args.item.id !== 'Default') {
                    call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                }
                bpmnShape.activity.subProcess.boundary = call as BpmnBoundary;
            }
            if (args.item.iconCss.indexOf('e-data') > -1) {
                let call: string = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                bpmnShape.dataObject.type = call as BpmnDataObjects;
            }
            if (args.item.iconCss.indexOf('e-collection') > -1) {
                let call: boolean = (args.item.id === 'Collectioncollection') ? true : false;
                bpmnShape.dataObject.collection = call;
            }
            if (args.item.iconCss.indexOf('e-task') > -1) {
                let task: string = args.item.id === 'TaskNone' ? 'None' : args.item.id;
                if (bpmnShape.activity.activity === 'Task') {
                    bpmnShape.activity.task.type = task as BpmnTasks;
                }
            }
            if (args.item.iconCss.indexOf('e-gate') > -1) {
                let task: string = args.item.id.replace('Gateway', '');
                if (bpmnShape.shape === 'Gateway') {
                    bpmnShape.gateway.type = task as BpmnGateways;
                }
            }
        }
        if (args.item.id === 'CollapsedSubProcess' || args.item.id === 'ExpandedSubProcess') {
            if (args.item.id === 'ExpandedSubProcess') {
                bpmnShape.activity.activity = 'SubProcess';
                bpmnShape.activity.subProcess.collapsed = false;
            } else {
                bpmnShape.activity.activity = 'SubProcess';
                bpmnShape.activity.subProcess.collapsed = true;
            }
        }
        diagram.dataBind();
    }

}

// Initializes the default symbol style symbol palette
function getSymbolDefaults(symbol: NodeModel): void {
    symbol.style.strokeColor = '#757575'
}

// Prepares the context menu before it is opened by determining which items should be visible based on the current selection.
function contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
    let hiddenId: string[] = [];
    if (args.element.className !== 'e-menu-parent e-ul ') {
        hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundry', 'DataObject',
            'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay'];
    }
    if (diagram.selectedItems.nodes.length) {
        for (let item of args.items) {
            let bpmnShape: BpmnShapeModel = diagram.selectedItems.nodes[0].shape as BpmnShapeModel;
            if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                if (item.text === 'Ad-Hoc') {
                    if (bpmnShape.activity.activity === 'SubProcess') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Loop' || item.text === 'Compensation' || item.text === 'Activity-Type') {
                    if (bpmnShape.shape === 'Activity') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
                if (item.text === 'Boundry') {
                    if (bpmnShape.activity.activity === 'SubProcess') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
            }
            if (item.text === 'Data Object') {
                if (bpmnShape.shape === 'DataObject') {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (item.text === 'Collection') {
                if (bpmnShape.shape === 'DataObject') {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (item.text === 'Call') {
                if (bpmnShape.shape === 'Activity' && bpmnShape.activity.activity === 'Task') {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (item.text === 'Trigger Result') {
                if ((bpmnShape.shape === 'Event')) {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (item.text === 'Event Type') {
                if ((bpmnShape.shape === 'Event')) {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (item.text === 'Task Type') {
                if ((bpmnShape.shape === 'Activity')
                    && (bpmnShape.activity.activity === 'Task')) {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (item.text === 'GateWay') {
                if ((bpmnShape.shape === 'Gateway')) {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
            if (args.parentItem && args.parentItem.id === 'TriggerResult' && bpmnShape.shape === 'Event') {

                if (item.text !== 'None' && (item.text === bpmnShape.event.event || item.text === bpmnShape.event.trigger)) {
                    hiddenId.push(item.id);
                }
                if (bpmnShape.event.event === 'Start') {
                    if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Link') {
                        hiddenId.push(item.id);
                    }
                }
                if (bpmnShape.event.event === 'NonInterruptingStart' || item.text === 'Link') {
                    if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                        item.text === 'Error' || item.text === 'None') {
                        hiddenId.push(item.id);
                    }
                }
                if (bpmnShape.event.event === 'Intermediate') {
                    if (item.text === 'Terminate') {
                        hiddenId.push(item.id);
                    }
                }
                if (bpmnShape.event.event === 'NonInterruptingIntermediate') {
                    if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Compensation' ||
                        item.text === 'Error' || item.text === 'None' || item.text === 'Link') {
                        hiddenId.push(item.id);
                    }
                }
                if (bpmnShape.event.event === 'ThrowingIntermediate') {
                    if (item.text === 'Cancel' || item.text === 'Terminate' || item.text === 'Timer' || item.text === 'Error' ||
                        item.text === 'None' || item.text === 'Pareller' || item.text === 'Conditional') {
                        hiddenId.push(item.id);
                    }
                }
                if (bpmnShape.event.event === 'End') {
                    if (item.text === 'Parallel' || item.text === 'Timer' || item.text === 'Conditional' || item.text === 'Link') {
                        hiddenId.push(item.id);
                    }
                }
            }
            if (args.parentItem && args.parentItem.id === 'EventType' && bpmnShape.shape === 'Event') {
                if (item.text === bpmnShape.event.event) {
                    hiddenId.push(item.id);
                }
            }
        }
    }
    args.hiddenItems = hiddenId; // Set the hidden menu items based on the logic above
}

// Initialization function for the diagram and symbol palette
(window as any).default = (): void => {
    loadCultureFiles();
    //Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%', height: '445px', nodes: nodes, connectors: connectors,
        contextMenuSettings: contextMenu,
        contextMenuOpen: contextMenuOpen,
        contextMenuClick: contextMenuClick,
        snapSettings: { constraints: 0 },
        dragEnter: dragEnter
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage({ mode: 'Width' });

    //Initializes the symbol palette
    let palette: SymbolPalette = new SymbolPalette({
        expandMode: 'Multiple', symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, symbolHeight: 60, symbolWidth: 60,
        palettes: [
            { id: 'Bpmn', expanded: true, symbols: bpmnShapes, iconCss: 'shapes', title: 'BPMN Shapes' },
            { id: 'Connector', expanded: true, symbols: connectorSymbols, iconCss: 'shapes', title: 'Connectors' },
        ],
        width: '100%', height: '471px', getNodeDefaults: getSymbolDefaults
    });
    palette.appendTo('#symbolpalette');

    // Function to add event listeners for Symbol palette to Mobile device
    addEvents();
};