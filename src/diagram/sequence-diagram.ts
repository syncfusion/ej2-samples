import { loadCultureFiles } from '../common/culture-loader';
import {
    Diagram,
    DiagramTools,
    UmlSequenceMessageType,
    UmlSequenceFragmentType,
    UmlSequenceParticipant,
    UmlSequenceActivationBox,
    ConnectorModel,
    NodeModel,
    SnapConstraints
} from '@syncfusion/ej2-diagrams';

(window as any).default = (): void => {
    loadCultureFiles();

    // Define the sequence diagram model
    const sequenceModel: any = {
        spaceBetweenParticipants: 250,
        participants: [
            {
                id: "User",
                content: "User",
                isActor: true
            },
            {
                id: "Transaction",
                content: "Transaction",
                activationBoxes: [
                    { id: "act1", startMessageID: 'msg1', endMessageID: 'msg4' }
                ]
            },
            {
                id: "FraudDetectionSystem",
                content: "Fraud Detection System",
                activationBoxes: [
                    { id: "act2", startMessageID: 'msg2', endMessageID: 'msg3' },
                    { id: "act3", startMessageID: 'msg5', endMessageID: 'msg6' }
                ]
            }
        ],
        messages: [
            { id: 'msg1', content: "Initiate Transaction", fromParticipantID: "User", toParticipantID: "Transaction", type: UmlSequenceMessageType.Synchronous },
            { id: 'msg2', content: "Send Transaction Data", fromParticipantID: "Transaction", toParticipantID: "FraudDetectionSystem", type: UmlSequenceMessageType.Synchronous },
            { id: 'msg3', content: "Validate Transaction", fromParticipantID: "FraudDetectionSystem", toParticipantID: "Transaction", type: UmlSequenceMessageType.Reply },
            { id: 'msg4', content: "Transaction Approved", fromParticipantID: "Transaction", toParticipantID: "User", type: UmlSequenceMessageType.Asynchronous },
            { id: 'msg5', content: "Flag Transaction", fromParticipantID: "Transaction", toParticipantID: "FraudDetectionSystem", type: UmlSequenceMessageType.Synchronous },
            { id: 'msg6', content: "Fraud Detected", fromParticipantID: "FraudDetectionSystem", toParticipantID: "User", type: UmlSequenceMessageType.Reply },
            { id: 'msg7', content: "Cancel Transaction", fromParticipantID: "User", toParticipantID: "Transaction", type: UmlSequenceMessageType.Synchronous },
            { id: 'msg8', content: "Complete Transaction", fromParticipantID: "User", toParticipantID: "Transaction", type: UmlSequenceMessageType.Synchronous }
        ],
        fragments: [
            {
                id: 1,
                type: UmlSequenceFragmentType.Alternative,
                conditions: [
                    {
                        content: "Fraud Detected",
                        messageIds: ['msg5', 'msg6', 'msg7']
                    },
                    {
                        content: "No Fraud Detected",
                        messageIds: ['msg8']
                    }
                ]
            }
        ]
    };

    // Define default properties for connectors
    function getConnectorDefaults(connector: ConnectorModel): void {
        var message = sequenceModel.messages.find(function (message: { id: string; }) {
            return message.id === connector.id;
        });
        // Style the connector if it corresponds to a message
        if (message) {
            connector.targetDecorator.style = { fill: '#489ECC', strokeColor: '#489ECC' };
            connector.style = { strokeColor: '#489ECC', strokeWidth: 2 };
        }
    }

    // Define default properties for nodes
    function getNodeDefaults(node: NodeModel): void {
        if (node.data instanceof UmlSequenceParticipant) {
            if (!node.data.isActor && node.annotations) {
                node.annotations[0].style.color = 'white';
            }
        } else if (node.data instanceof UmlSequenceActivationBox) {
            node.style = { fill: 'orange', strokeColor: 'orange' };
        }

    }

    // Initialize the diagram
    const diagram = new Diagram({
        width: '100%',
        height: '700px',
        tool: DiagramTools.ZoomPan,
        model: sequenceModel,
        snapSettings: { constraints: SnapConstraints.None },
        getNodeDefaults: getNodeDefaults,
        getConnectorDefaults: getConnectorDefaults,
    });

    diagram.appendTo('#diagram');
};