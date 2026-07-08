import { loadCultureFiles } from '../common/culture-loader';
import {
    AvoidLineOverlapping,
    ConnectorModel,
    ConnectorConstraints,
    DataBinding,
    Diagram,
    DiagramConstraints,
    ErConnectorShapeModel,
    ErDiagrams,
    ErFieldModel,
    ErMultiplicityTypes,
    ErRelationshipTypes,
    ErShapeModel,
    LineRouting,
    NodeModel,
    SnapConstraints,
    SymbolPalette,
    UndoRedo,
    UserHandleEventsArgs,
    ContextMenuSettingsModel,
    Connector,
    DiagramBeforeMenuOpenEventArgs,
    DiagramContextMenu,
    ErMultiplicityModel,
    NodeConstraints,
    DiagramTools
} from '@syncfusion/ej2-diagrams';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';

Diagram.Inject(DataBinding, UndoRedo, LineRouting, AvoidLineOverlapping, ErDiagrams, DiagramContextMenu);
SymbolPalette.Inject(ErDiagrams);

function addEvents() {
    // Mobile palette toggle logic
    var paletteIcon = document.getElementById('palette-icon');
    var paletteSpace = document.getElementById('palette-space');
    if (!paletteIcon || !paletteSpace) return;
    paletteIcon.onclick = function () {
        if (paletteSpace.style.display === 'block') {
            paletteSpace.style.display = 'none';
        } else {
            paletteSpace.style.display = 'block';
            paletteSpace.classList.add('sb-mobile-palette-open');
        }
    };
    // Hide palette on diagram click (mobile)
    var diagramSpace = document.getElementById('diagram-space');
    if (diagramSpace) {
        diagramSpace.onclick = function () {
            if (window.innerWidth <= 550) {
                paletteSpace.style.display = 'none';
                paletteSpace.classList.remove('sb-mobile-palette-open');
            }
        };
    }
}

(window as any).default = (): void => {
    loadCultureFiles();

    type ColorToken = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'neutral' | 'warning';

    interface SchemaField {
        id: string;
        name: string;
        isPrimaryKey?: boolean;
        isForeignKey?: boolean;
    }

    interface SchemaEntity {
        id: string;
        title: string;
        color: ColorToken;
        position: { x: number; y: number };
        fields: SchemaField[];
    }

    interface SchemaRelationship {
        id: string;
        source: string;
        target: string;
        sourceCardinality: ErMultiplicityTypes;
        targetCardinality: ErMultiplicityTypes;
        relationshipType: ErRelationshipTypes;
        color?: string;
        annotation?: string;
    }

    interface DiagramSchema {
        title: string;
        entities: SchemaEntity[];
        relationships: SchemaRelationship[];
    }

    interface ThemeToken {
        headerFill: string;
        bodyFill: string;
        strokeColor: string;
        connectorColor: string;
    }

    const COLOR_TOKENS: Record<ColorToken, ThemeToken> = {
        primary: {
            headerFill: '#bfdbfe',
            bodyFill: '#eff6ff',
            strokeColor: '#2563eb',
            connectorColor: '#2563eb'
        },
        secondary: {
            headerFill: '#bbf7d0',
            bodyFill: '#f0fdf4',
            strokeColor: '#16a34a',
            connectorColor: '#16a34a'
        },
        tertiary: {
            headerFill: '#ddd6fe',
            bodyFill: '#f5f3ff',
            strokeColor: '#7c3aed',
            connectorColor: '#7c3aed'
        },
        accent: {
            headerFill: '#fdba74',
            bodyFill: '#fff7ed',
            strokeColor: '#ea580c',
            connectorColor: '#ea580c'
        },
        neutral: {
            headerFill: '#d1d5db',
            bodyFill: '#f9fafb',
            strokeColor: '#6b7280',
            connectorColor: '#6b7280'
        },
        warning: {
            headerFill: '#fde68a',
            bodyFill: '#fffbeb',
            strokeColor: '#d97706',
            connectorColor: '#d97706'
        }
    };

    /**
     * Hospital Appointment Management Er Diagram Schema
     * - Doctors, Patients, Appointments, Diagnoses, and Prescriptions
     * - Demonstrates cardinality and relationship annotations
     */
    const schema: DiagramSchema = {
        title: 'Hospital Appointment Er Diagram',

        entities: [
            {
                id: 'Doctor',
                title: 'DOCTOR',
                color: 'secondary',
                position: { x: 0, y: 94 },
                fields: [
                    { id: 'doctor_id', name: 'DoctorID', isPrimaryKey: true },
                    { id: 'name', name: 'Name' },
                    { id: 'department', name: 'Department' },
                    { id: 'specialization', name: 'Specialization' },
                    { id: 'contact_number', name: 'ContactNumber' }
                ]
            },
            {
                id: 'Patient',
                title: 'PATIENT',
                color: 'primary',
                position: { x: 290, y: 83 },
                fields: [
                    { id: 'patient_id', name: 'PatientID', isPrimaryKey: true },
                    { id: 'patient_name', name: 'Name' },
                    { id: 'date_of_birth', name: 'DateOfBirth' },
                    { id: 'patient_gender', name: 'Gender' },
                    { id: 'patient_blood_group', name: 'BloodGroup' },
                    { id: 'patient_contact_number', name: 'ContactNumber' }
                ]
            },
            {
                id: 'Appointment',
                title: 'APPOINTMENT',
                color: 'tertiary',
                position: { x: 133, y: 355 },
                fields: [
                    { id: 'appointment_id', name: 'AppointmentID', isPrimaryKey: true },
                    { id: 'app_doctor_id', name: 'DoctorID', isForeignKey: true },
                    { id: 'app_patient_id', name: 'PatientID', isForeignKey: true },
                    { id: 'appointment_date', name: 'AppointmentDate' },
                    { id: 'status', name: 'Status' }
                ]
            },
            {
                id: 'Diagnosis',
                title: 'DIAGNOSIS',
                color: 'accent',
                position: { x: 549, y: 236 },
                fields: [
                    { id: 'diagnosis_id', name: 'DiagnosisID', isPrimaryKey: true },
                    { id: 'diag_appointment_id', name: 'AppointmentID', isForeignKey: true },
                    { id: 'disease', name: 'Disease' },
                    { id: 'severity', name: 'Severity' },
                    { id: 'notes', name: 'Notes' }
                ]
            },
            {
                id: 'Prescription',
                title: 'PRESCRIPTION',
                color: 'warning',
                position: { x: 384, y: 493 },
                fields: [
                    { id: 'prescription_id', name: 'PrescriptionID', isPrimaryKey: true },
                    { id: 'pres_diagnosis_id', name: 'DiagnosisID', isForeignKey: true },
                    { id: 'medicine', name: 'Medicine' },
                    { id: 'dosage', name: 'Dosage' },
                    { id: 'frequency', name: 'Frequency' },
                    { id: 'duration_days', name: 'DurationDays' }
                ]
            }
        ],

        relationships: [
            {
                id: 'rel_doctor_appointment',
                source: 'Doctor',
                target: 'Appointment',
                sourceCardinality: 'OneAndOnlyOne',
                targetCardinality: 'ZeroOrMany',
                relationshipType: 'NonIdentifying',
                color: '#16a34a',
                annotation: 'attends'
            },
            {
                id: 'rel_patient_appointment',
                source: 'Patient',
                target: 'Appointment',
                sourceCardinality: 'OneAndOnlyOne',
                targetCardinality: 'ZeroOrMany',
                relationshipType: 'NonIdentifying',
                color: '#2563eb',
                annotation: 'books'
            },
            {
                id: 'rel_appointment_diagnosis',
                source: 'Appointment',
                target: 'Diagnosis',
                sourceCardinality: 'OneAndOnlyOne',
                targetCardinality: 'ZeroOrMany',
                relationshipType: 'Identifying',
                color: '#7c3aed',
                annotation: 'leads to'
            },
            {
                id: 'rel_diagnosis_prescription',
                source: 'Diagnosis',
                target: 'Prescription',
                sourceCardinality: 'OneAndOnlyOne',
                targetCardinality: 'ZeroOrMany',
                relationshipType: 'Identifying',
                color: '#ea580c',
                annotation: 'generates'
            }
        ]
    };

    function toFieldModel(field: SchemaField): ErFieldModel {
        return {
            id: field.id,
            name: field.name,
            isPrimaryKey: field.isPrimaryKey,
            isForeignKey: field.isForeignKey
        } as ErFieldModel;
    }

    function toNode(entity: SchemaEntity): NodeModel {
        const theme = COLOR_TOKENS[entity.color];

        return {
            id: entity.id,
            offsetX: entity.position.x,
            offsetY: entity.position.y,
            shape: {
                type: 'Er',
                header: {
                    annotation: {
                        content: entity.title,
                        style: {
                            fontSize: 12,
                            bold: true,
                            color: '#111827'
                        }
                    },
                    height: 34,
                    style: {
                        fill: theme.headerFill
                    }
                },
                fields: entity.fields.map(toFieldModel),
                fieldDefaults: {
                    alternateRowColors: [theme.bodyFill, '#ffffff']
                },
            } as ErShapeModel,
            style: {
                fill: theme.bodyFill,
                strokeColor: theme.strokeColor,
                strokeWidth: 1.75,
            }
        };
    }

    function toConnector(relationship: SchemaRelationship): ConnectorModel {
        const color = relationship.color || '#64748b';

        const connector: ConnectorModel = {
            id: relationship.id,
            sourceID: relationship.source,
            targetID: relationship.target,
            type: 'Orthogonal',
            cornerRadius: 6,
            style: {
                strokeColor: color,
                strokeWidth: 1.75
            },
            sourceDecorator: {
                style: {
                    strokeColor: color,
                    strokeWidth: 1.75
                }
            },
            targetDecorator: {
                style: {
                    strokeColor: color,
                    strokeWidth: 1.75
                }
            },
            shape: {
                type: 'Er',
                relationship: relationship.relationshipType,
                sourceMultiplicity: { type: relationship.sourceCardinality },
                targetMultiplicity: { type: relationship.targetCardinality }
            } as ErConnectorShapeModel
        };

        // Add annotation if defined in relationship schema
        if (relationship.annotation) {
            connector.annotations = [{
                content: relationship.annotation,
                style: {
                    color: color,
                    fill: '#ffffff',
                    fontSize: 13
                }
            }];
        }

        return connector;
    }

    const nodes: NodeModel[] = schema.entities.map(toNode);
    const connectors: ConnectorModel[] = schema.relationships.map(toConnector);
    const contextMenu: ContextMenuSettingsModel = {
        show: true,
        items: [
            {
                text: 'Connector Type',
                id: 'ConnectorType',
                // Sub-menu for Connector Types
                items: [
                    { text: 'Straight', id: 'Straight' },
                    { text: 'Orthogonal', id: 'Orthogonal' },
                    { text: 'Bezier', id: 'Bezier' }
                ]
            },
            {
                text: 'Relationship',
                id: 'Relationship',
                // Sub-menu for Relationship Types
                items: [
                    { text: 'Identifying', id: 'Identifying' },
                    { text: 'NonIdentifying', id: 'NonIdentifying' }
                ]
            },
            {
                text: 'Source Multiplicity',
                id: 'Source_Multiplicity',
                // Sub-menu for Source Multiplicity
                items: [
                    { text: 'One', id: 'One' },
                    { text: 'Many', id: 'Many' },
                    { text: 'OneAndOnlyOne', id: 'OneAndOnlyOne' },
                    { text: 'ZeroOrOne', id: 'ZeroOrOne' },
                    { text: 'ZeroOrMany', id: 'ZeroOrMany' },
                    { text: 'OneOrMany', id: 'OneOrMany' }
                ]
            },
            {
                text: 'Target Multiplicity',
                id: 'Target_Multiplicity',
                // Sub-menu for Target Multiplicity
                items: [
                    { text: 'One', id: 'One_t' },
                    { text: 'Many', id: 'Many_t' },
                    { text: 'OneAndOnlyOne', id: 'OneAndOnlyOne_t' },
                    { text: 'ZeroOrOne', id: 'ZeroOrOne_t' },
                    { text: 'ZeroOrMany', id: 'ZeroOrMany_t' },
                    { text: 'OneOrMany', id: 'OneOrMany_t' }
                ]
            },
        ],
        showCustomMenuOnly: true,
    };
    function contextMenuClick(args: MenuEventArgs): void {
        // Check if any connector is selected
        if (diagram.selectedItems.connectors.length > 0) {
            const connector: ConnectorModel = diagram.selectedItems.connectors[0];
            const erConnector: ErConnectorShapeModel = diagram.selectedItems.connectors[0].shape as ErConnectorShapeModel;
            const itemId: string = args.item.id as string;
            if (itemId === 'Straight' || itemId === 'Orthogonal' || itemId === 'Bezier') {
                connector.type = itemId;
            } else if (itemId === 'Identifying' || itemId === 'NonIdentifying') {
                erConnector.relationship = itemId;
            } else if (itemId === 'One' || itemId ==='Many' || itemId ==='OneAndOnlyOne'
                       || itemId ==='ZeroOrOne' || itemId ==='ZeroOrMany' || itemId ==='OneOrMany') {
                (erConnector.sourceMultiplicity as ErMultiplicityModel).type = args.item.text as ErMultiplicityTypes ;
            } else if (itemId === 'One_t' || itemId ==='Many_t' || itemId ==='OneAndOnlyOne_t'
                       || itemId ==='ZeroOrOne_t' || itemId ==='ZeroOrMany_t' || itemId ==='OneOrMany_t') {
                (erConnector.targetMultiplicity as ErMultiplicityModel).type = args.item.text as ErMultiplicityTypes ;
            }
            diagram.dataBind();
        }

    }
    function contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
        let hiddenId: string[] = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['ConnectorType', 'Relationship' , 'Source_Multiplicity', 'Target_Multiplicity'];
        }
        if (diagram.selectedItems.connectors[0] instanceof Connector) {
            hiddenId = [];
        }
        args.hiddenItems = hiddenId; // Set the hidden menu items based on the logic above
    }
    let diagramCreated: boolean = false;
    const diagram = new Diagram({
        width: '100%',
        height: '500px',
        nodes: nodes,
        connectors: connectors,
        contextMenuSettings: contextMenu,
        contextMenuOpen: contextMenuOpen,
        contextMenuClick: contextMenuClick,
        constraints: DiagramConstraints.Default | DiagramConstraints.LineRouting | DiagramConstraints.AvoidLineOverlapping,
        tool: DiagramTools.SingleSelect,
        snapSettings: { constraints: SnapConstraints.None },
        getConnectorDefaults: (connector: ConnectorModel): ConnectorModel => {
            connector.cornerRadius = 10;
            connector.type = 'Orthogonal';
            connector.constraints = ConnectorConstraints.Default;
            return connector;
        },
        selectedItems: { userHandles: [] },
        onUserHandleMouseDown: function (args: UserHandleEventsArgs) {
            const handle = (args.element as any);
            if (!handle) { return; }

            const handleName: string = handle.name;

            const node = getSelectedErEntity();
            if (handleName === 'AddField') {
                if (!node) { return; }

                const newField: ErFieldModel = createNewErField(node);

                diagram.addErField(node, newField);
            } else if (handleName === 'RemoveField') {
                if (!node) { return; }

                const fieldToRemove = getSelectedFieldToRemove(node);
                if (!fieldToRemove) { return; }

                diagram.removeErField(node, fieldToRemove);
            }
        },

        selectionChange: function (): void {
            const selectedNodes: NodeModel[] = diagram.selectedItems.nodes as NodeModel[];
            // hide handles for everything by default
            diagram.selectedItems.userHandles = [];
            if (selectedNodes.length === 1) {
                const node: NodeModel = selectedNodes[0];
                if (node && node.shape && node.shape.type === 'Er' && node.style && node.style.strokeColor) {
                    diagram.selectedItems.userHandles = [{
                        name: 'AddField',
                        offset: 1,
                        side: 'Bottom',
                        content: `
                        <g class="insert-handle">
                            <circle class="bg" cx="8" cy="8" r="7" fill="${node.style.strokeColor}"/>
                            <path class="plus" d="M8 5 V11 M5 8 H11" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                            <style>
                                .insert-handle { cursor: pointer; }
                                .insert-handle:hover .bg { fill: ${node.style.strokeColor}; }
                            </style>
                        </g>
                        `,
                        tooltip: { content: 'Add Field' },
                        size: 24,
                        margin: { left: 20, bottom: 36 }
                    }];
                } else if (node && node.shape && node.style && node.style.strokeColor) {
                    const isPKField = node.annotations && node.annotations.length > 0 && node.annotations[0].content === 'PK';

                    if (!isPKField) {
                        diagram.selectedItems.userHandles = [{
                            name: 'RemoveField',
                            offset: 1,
                            side: 'Bottom',
                            content: `
                            <g class="minus-handle">
                                <circle class="bg" cx="8" cy="8" r="7" fill="${node.style.strokeColor}"/>
                                <path class="minus" d="M5 8 H11" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                                <style>
                                    .minus-handle { cursor: pointer; }
                                    .minus-handle:hover .bg { fill: ${node.style.strokeColor}; }
                                </style>
                            </g>
                        `,
                            tooltip: { content: 'Remove Field' },
                            size: 24,
                            margin: { left: 20, bottom: 36 }
                        }];
                    }
                }
            }
            diagram.dataBind();
        },
        created: () => {
            diagramCreated = true;
            diagram.fitToPage();
        },
        load: () => {
            if (diagramCreated) {
                setTimeout(() => diagram.fitToPage(), 10);
            }
        }
    });

    diagram.appendTo('#diagram');
    addEvents();

    const entityNoFields: any = {
        id: 'entity_no_fields',
        tooltip:{content:'Entity With No-Fields'},
        constraints: NodeConstraints.Tooltip,
        width: 80,
        height: 80,
        shape: {
            type: 'Er',
            header: {
                annotation: {
                    content: 'Entity Name',
                    style: {
                        fontSize: 12,
                        bold: true,
                        color: '#111827'
                    }
                },
                height: 34,
                style: { fill: '#ddd6fe', fontSize: 12, bold: true, color: 'white' }
            },
            fields: [],
        },
        style: {
            fill: '#f5f3ff',
            strokeColor: '#7c3aed',
            strokeWidth: 1.5
        }
    };

    const entityKeyName: any = {
        id: 'entity_key_name',
        tooltip:{content:'Entity With Key and Name'},
        constraints: NodeConstraints.Tooltip,
        width: 80,
        height: 110,
        shape: {
            type: 'Er',
            header: {
                annotation: {
                    content: 'Entity Name',
                    style: {
                        fontSize: 12,
                        bold: true,
                        color: '#111827'
                    }
                },
                height: 34,
                style: { fill: '#ddd6fe', fontSize: 12, bold: true, color: 'white' }
            },
            fields: [
                { id: 'field_id', name: 'Attribute', isPrimaryKey: true }
            ]
        },
        style: {
            fill: '#f5f3ff',
            strokeColor: '#7c3aed',
            strokeWidth: 1.5
        }
    };

    const entityKeyNameType: any = {
        id: 'entity_key_name_type',
        tooltip:{content:'Entity With Key, Name and Type'},
        constraints: NodeConstraints.Tooltip,
        width: 80,
        height: 125,
        shape: {
            type: 'Er',
            header: {
                annotation: {
                    content: 'Entity Name',
                    style: {
                        fontSize: 12,
                        bold: true,
                        color: '#111827'
                    }
                },
                height: 34,
                style: { fill: '#ddd6fe', fontSize: 12, bold: true, color: 'white' }
            },
            fields: [
                { id: 'field_id_type', name: 'Attribute', isPrimaryKey: true, dataType: 'INT' }
            ]
        },
        style: {
            fill: '#f5f3ff',
            strokeColor: '#7c3aed',
            strokeWidth: 1.5
        }
    };

    const entityKeyNameTypeConstraints: any = {
        id: 'entity_key_name_type_constraints',
        tooltip:{content:'Entity With Key, Name, Type and Constraints'},
        constraints: NodeConstraints.Tooltip,
        width: 80,
        height: 140,
        shape: {
            type: 'Er',
            header: {
                annotation: {
                    content: 'Entity Name',
                    style: {
                        fontSize: 12,
                        bold: true,
                        color: '#111827'
                    }
                },
                height: 34,
                style: { fill: '#ddd6fe', fontSize: 12, bold: true, color: 'white' }
            },
            fields: [
                { id: 'field_id_constraints', name: 'Attribute', isPrimaryKey: true, dataType: 'INT', constraints: ['NotNull'] }
            ]
        },
        style: {
            fill: '#ffffff',
            strokeColor: '#7c3aed',
            strokeWidth: 1.5
        }
    };

    const connectorSymbols: any[] = [
        {
            id: 'Link1',
            tooltip:{content:'One to One'},
            constraints: ConnectorConstraints.Tooltip,
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            shape: {
                type: 'Er',
                sourceMultiplicity: { type: 'One' },
                targetMultiplicity: { type: 'One' }
            },
            style: { strokeColor: '#7c3aed', strokeWidth: 1.5},
            sourceDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            },
            targetDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            }
        },
        {
            id: 'Link2',
            tooltip:{content:'Many to Many'},
            constraints: ConnectorConstraints.Tooltip,
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            shape: {
                type: 'Er',
                sourceMultiplicity: { type: 'Many' },
                targetMultiplicity: { type: 'Many' }
            },
            style: { strokeColor: '#7c3aed', strokeWidth: 1.5},
            sourceDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            },
            targetDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            }
        },
        {
            id: 'Link3',
            tooltip:{content:'OneAndOnlyOne to OneAndOnlyOne'},
            constraints: ConnectorConstraints.Tooltip,
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            shape: {
                type: 'Er',
                sourceMultiplicity: { type: 'OneAndOnlyOne' },
                targetMultiplicity: { type: 'OneAndOnlyOne' }
            },
            style: { strokeColor: '#7c3aed', strokeWidth: 1.5},
            sourceDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            },
            targetDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            }
        },
        {
            id: 'Link4',
            tooltip:{content:'ZeroOrOne to ZeroOrOne'},
            constraints: ConnectorConstraints.Tooltip,
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            shape: {
                type: 'Er',
                sourceMultiplicity: { type: 'ZeroOrOne' },
                targetMultiplicity: { type: 'ZeroOrOne' }
            },
            style: { strokeColor: '#7c3aed', strokeWidth: 1.5},
            sourceDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            },
            targetDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            }
        },
        {
            id: 'Link5',
            tooltip:{content:'OneOrMany to OneOrMany'},
            constraints: ConnectorConstraints.Tooltip,
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            shape: {
                type: 'Er',
                sourceMultiplicity: { type: 'OneOrMany' },
                targetMultiplicity: { type: 'OneOrMany' }
            },
            style: { strokeColor: '#7c3aed', strokeWidth: 1.5},
            sourceDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            },
            targetDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            }
        },
        {
            id: 'Link6',
            tooltip:{content:'ZeroOrMany to ZeroOrMany'},
            constraints: ConnectorConstraints.Tooltip,
            sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
            shape: {
                type: 'Er',
                sourceMultiplicity: { type: 'ZeroOrMany' },
                targetMultiplicity: { type: 'ZeroOrMany' }
            },
            style: { strokeColor: '#7c3aed', strokeWidth: 1.5},
            sourceDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            },
            targetDecorator: {
                style: { strokeColor: '#7c3aed', strokeWidth: 1.5}
            }
            
        }
    ];

    const erPalettes: any[] = [
        { id: 'entities', expanded: true, title: 'ER Entities', symbols: [entityNoFields, entityKeyName, entityKeyNameType, entityKeyNameTypeConstraints] },
        { id: 'connectors', symbols: connectorSymbols, title: 'Connectors' }
    ];

    const palette: SymbolPalette = new SymbolPalette({
        palettes: erPalettes,
        width: '100%',
        height: '500px',
        symbolWidth: 70,
        symbolHeight: 70,
        enableAnimation: false,
        symbolMargin: { left: 8, right: 8, top: 8, bottom: 8 }
    });

    palette.appendTo('#symbolpalette');

    function createNewErField(node: NodeModel): ErFieldModel {
        const erShape = node.shape as ErShapeModel;
        const fields = erShape.fields || [];

        const newField: ErFieldModel = {
            id: `${node.id}_field_${new Date().getTime()}`,
            name: 'NewField'
        };

        if (fields.length === 0) {
            return newField;
        }

        const lastField = fields[fields.length - 1] as any;

        if (lastField.dataType && lastField.dataType !== '') {
            newField.dataType = 'VARCHAR(20)';
        }

        if (lastField.constraints && lastField.constraints.length > 0) {
            newField.constraints = ['NotNull'];
        }

        return newField;
    }

    function getSelectedFieldToRemove(entityNode: NodeModel): ErFieldModel | undefined {
        const erEntity = entityNode.shape as ErShapeModel;
        if (!erEntity || !erEntity.fields || erEntity.fields.length === 0) {
            return undefined;
        }

        const selectedNodes = diagram.selectedItems.nodes as NodeModel[];
        if (!selectedNodes || selectedNodes.length === 0) {
            return erEntity.fields[erEntity.fields.length - 1];
        }

        const selectedNode: any = selectedNodes[0];
        const parentId: string = (selectedNode.parentId || '');
        if (parentId === entityNode.id && entityNode.children) {
            const selectedChildIndex = entityNode.children.indexOf(selectedNode.id);
            if (selectedChildIndex > 0 && selectedChildIndex <= erEntity.fields.length) {
                return erEntity.fields[selectedChildIndex - 1];
            }
        }

        return erEntity.fields[erEntity.fields.length - 1];
    }

    function getSelectedErEntity(): NodeModel | undefined {
        if (diagram.selectedItems && diagram.selectedItems.nodes && diagram.selectedItems.nodes.length === 0) {
            return undefined;
        }

        let selectedNode: NodeModel = diagram.selectedItems.nodes[0];
        selectedNode = diagram.nameTable[selectedNode.id] || selectedNode;

        if (selectedNode.shape && (selectedNode.shape as ErShapeModel).type === 'Er') {
            return selectedNode;
        }

        if ((selectedNode as any).parentId) {
            const parentNode: NodeModel = diagram.nameTable[(selectedNode as any).parentId];
            if (parentNode && parentNode.shape && (parentNode.shape as ErShapeModel).type === 'Er') {
                return parentNode;
            }
        }

        return undefined;
    }
};