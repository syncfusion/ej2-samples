/**
 * Funnel Diagram
 */
import { loadCultureFiles } from '../common/culture-loader';
import {
    Diagram, NodeModel, SnapConstraints, ConnectorModel, NodeConstraints,
    ShapeAnnotationModel, ConnectorConstraints
} from '@syncfusion/ej2-diagrams';

(window as any).default = (): void => {
    loadCultureFiles();

const LEVEL_COLORS = {
    level1: '#C2272D',
    level2: '#F16C0D',
    level3: '#FFC107',
    level4: '#4CB443',
    level5: '#008AE0',
    level6: '#8715BC',
};

// Tooltip Template
function getToolTemplate(iconClass: string, iconFill: string, description: string, cumulativeRate: number, conversionRate?: number): string {
    return ` 
<div style="border-radius: 8px; max-width: 240px; min-width: 180px; padding: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px;">
<!-- Container for icon and description -->
<div style="display: flex; align-items: center; padding: 5px 0px;">
    <div class="${iconClass} annotation-icon" style="display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; background: ${iconFill}; color: #FFFFFF; border-radius: 50%; margin-right: 10px;"></div>
    <div style="font-weight: 600; font-size: 16px;">
        ${description}
    </div>
</div>
<hr style="margin: 3px; border-top: 1px solid #9CA3AF;">

<div style="display: grid; row-gap: 8px;">
    ${conversionRate !== undefined ? `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500; opacity:0.7;">Conversion</span>
            <span style="font-weight: 600;">${conversionRate}%</span>
        </div>
    ` : ''}

    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 500; opacity:0.7;">Cumulative</span>
        <span style="font-weight: 600;">${cumulativeRate}%</span>
    </div>
</div>
</div>
`;
}

// Title Icon Annotation Template
function getIconTemplate(iconClass: string) {
    return `<div class="${iconClass}" style="width: 60px; height: 60px;display: flex; align-items: center;
            justify-content: center; font-size: 34px; color: #FFFFFF; !important;">
            </div>`;
}

// Annotation
function getStageLabel(content: string): ShapeAnnotationModel{
    return {
        content: content,
        offset: { x: 0, y: 0.5 },
        horizontalAlignment: 'Right',
        verticalAlignment: 'Bottom',
        margin: { right: 6, bottom: 4 },
        style: { fontSize: 16, textWrapping: 'NoWrap', fontFamily: 'Segoe UI' }
    };
}

// Single-line helpers to eliminate repetition while preserving exact behavior

// Title node factory (fixed content/style as in original)
function createTitleNode(): NodeModel {
    return {
        id: 'title',
        offsetX: 150, offsetY: -40,
        width: 250, height: 50,
        annotations: [
            {
                content: 'Marketing Funnel', offset: { x: 0.5, y: 0.2 },
                style: { color: '#111827', fontSize: 24, fontFamily: 'Segoe UI' }
            },
            {
                content: 'Measuring Campaign Effectiveness', offset: { x: 0.5, y: 0.7 },
                style: { color: '#6B7280', fontSize: 16, fontFamily: 'Segoe UI' }
            }
        ],
        constraints: NodeConstraints.None,
        style: { strokeColor: 'transparent' }
    } as NodeModel;
}

// Stage node factory
function createNode(
    id: string, width: number, height: number, fill: string,
    offsetX: number, offsetY: number, pathData: string, valueText: string,
    iconClass: string, description: string, cumulativeRate: number,
    conversionRate?: number, portX: number = 0.9
): NodeModel {
    return {
        // Unique identifier for the node.
        id,
        offsetX,
        offsetY,
        width,
        height,
        annotations: [{
            content: valueText,
            style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
        }],
        // Trapezoidal shape defined by SVG path data.
        shape: { type: 'Path', data: pathData },
        // Visual style for the node.
        style: { fill: fill, strokeColor: 'transparent' },
        // Tooltip for showing conversion rates
        constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip | NodeConstraints.ReadOnly,
        tooltip: {
            relativeMode: 'Mouse',
            position: 'TopCenter',
            content: getToolTemplate(iconClass, fill, description, cumulativeRate, conversionRate)
        },
        // Port for connecting label
        ports: [{ id: 'port', offset: { x: portX, y: 0.8 } }],
    } as NodeModel;
}

// Label node factory
function createLabelNode(
    id: string, width: number, height: number, fill: string,
    offsetX: number, offsetY: number, iconClass: string, description: string
): NodeModel {
    return {
        id,
        offsetX, offsetY,
        width, height,
        annotations: [
            { template: getIconTemplate(iconClass) },
            getStageLabel(description)
        ],
        shape: { type: 'Basic', shape: 'Ellipse' },
        style: { fill: fill, strokeColor: fill },
        constraints: NodeConstraints.InConnect
    } as NodeModel;
}

// Connector factory
function createConnector(
    sourceID: string, targetID: string, strokeColor: string,
    p1x: number, p1y: number, p2x: number, p2y: number,
    sourcePortID: string = 'port'): ConnectorModel {
    return {
        sourceID,
        sourcePortID,
        targetID,
        targetDecorator: { shape: 'None' },
        style: { strokeColor },
        segments: [
            { type: 'Straight', point: { x: p1x, y: p1y } },
            { type: 'Straight', point: { x: p2x, y: p2y } },
        ]
    } as ConnectorModel;
}

// Funnel Stage Node Collection
let nodes: NodeModel[] = [
    // Title Node
    createTitleNode(),
    // First level of the funnel.
    createNode('awareness', 560, 80, LEVEL_COLORS.level1, 150, 100, 'M560 0H0L56.7194 80H503.281L560 0Z', '10,000', 'sf-icon-ads-exposure', 'Ad Exposure', 100, undefined, 0.9),
    // Second level of the funnel.
    createNode('interest', 446, 80, LEVEL_COLORS.level2, 150, 180, 'M503 80H57L113.648 160H446.352L503 80Z', '6,500', 'sf-icon-page-visits', 'Page Visits', 65, 65.00, 0.89),
    // Third level of the funnel.
    createNode('consideration', 334, 80, LEVEL_COLORS.level3, 150, 260, 'M447 160H113L169.869 240H390.131L447 160Z', '3,800', 'sf-icon-sign-up', 'Sign Ups', 38, 58.46, 0.85),
    // Fourth level of the funnel.
    createNode('intent', 220, 80, LEVEL_COLORS.level4, 150, 340, 'M170 240L226.801 320H333.199L390 240H170Z', '2,000', 'sf-icon-demo-request', 'Demo Requests', 20, 52.63, 0.8),
    // Fifth level of the funnel.
    createNode('purchase', 106, 80, LEVEL_COLORS.level5, 150, 420, 'M333 320H227V400H333V320Z', '1,200', 'sf-icon-orders', 'Orders', 12, 60.00, 0.9),
    // Sixth and final level of the funnel.
    createNode('retention', 106, 80, LEVEL_COLORS.level6, 150, 500, 'M227 480H333V400H227V480Z', '800', 'sf-icon-engagement', 'Subscribed Users', 8, 66.67, 0.9),
    // Labels
    createLabelNode('awareness_label', 60, 60, LEVEL_COLORS.level1, 620, 100, 'sf-icon-ads-exposure', 'Ad Exposure'),
    createLabelNode('interest_label', 60, 60, LEVEL_COLORS.level2, 620, 180, 'sf-icon-page-visits', 'Page Visits'),
    createLabelNode('consideration_label', 60, 60, LEVEL_COLORS.level3, 620, 260, 'sf-icon-sign-up', 'Sign Ups'),
    createLabelNode('intent_label', 60, 60, LEVEL_COLORS.level4, 620, 340, 'sf-icon-demo-request', 'Demo Requests'),
    createLabelNode('purchase_label', 60, 60, LEVEL_COLORS.level5, 620, 420, 'sf-icon-orders', 'Orders'),
    createLabelNode('retention_label', 60, 60, LEVEL_COLORS.level6, 620, 500, 'sf-icon-engagement', 'Subscribed Users'),
];
// Connectors
let connectors: ConnectorModel[] = [
    createConnector('awareness', 'awareness_label', LEVEL_COLORS.level1, 430, 124, 455, 98),
    createConnector('interest', 'interest_label', LEVEL_COLORS.level2, 430, 204, 455, 178),
    createConnector('consideration', 'consideration_label', LEVEL_COLORS.level3, 430, 284, 455, 258),
    createConnector('intent', 'intent_label', LEVEL_COLORS.level4, 430, 364, 455, 338),
    createConnector('purchase', 'purchase_label', LEVEL_COLORS.level5, 430, 444, 455, 418),
    createConnector('retention', 'retention_label', LEVEL_COLORS.level6, 430, 524, 455, 498),
];

let diagramCreated: boolean = false;
// Initialize the Diagram component.
let diagram: Diagram = new Diagram({
    // Set the diagram's width and height.
    width: '100%', height: '675px',
    // Assign the defined nodes to the diagram.
    nodes: nodes,
    connectors: connectors,
    getConnectorDefaults: function(connector: ConnectorModel){
        connector.constraints = ConnectorConstraints.None;
    },
    // Configure snap settings for the diagram.
    snapSettings: { constraints: SnapConstraints.None },
    created: created,
    load: load,
});
// Render the diagram component inside the HTML element with the ID 'diagram'.
diagram.appendTo('#diagram');

function created() {
    diagramCreated = true;
    diagram.fitToPage();
}
function load() {
    if (diagramCreated) {
        diagram.fitToPage();
    }
}
};