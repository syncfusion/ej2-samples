/**
 * Serpentine layout Diagram
 */
import {
  Diagram,
  Rect,
  NodeModel,
  ConnectorModel,
  NodeConstraints,
  PortVisibility,
  SnapConstraints,
  PointModel,
  DiagramTools,
  ConnectorConstraints
} from '@syncfusion/ej2-diagrams';
import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';

interface Breakthrough {
  id: string;
  year: string;
  title: string;
  description: string;
}

(window as any).default = (): void => {
  loadCultureFiles();

  // Domain data: medical breakthroughs displayed as timeline nodes in a serpentine layout
  const medicalBreakthroughs: Breakthrough[] = [
    { id: '1', year: '1796', title: 'Smallpox Vaccine', description: 'Edward Jenner develops the first successful vaccine using cowpox, marking a historic milestone in immunology.' },
    { id: '2', year: '1846', title: 'First Use of Anesthesia', description: 'William T. G. Morton demonstrates ether anesthesia publicly, revolutionizing surgical procedures by enabling pain-free operations.' },
    { id: '3', year: '1865', title: 'Germ Theory of Disease', description: 'Louis Pasteur proves microorganisms cause disease, establishing the foundation of modern microbiology.' },
    { id: '4', year: '1882', title: 'Discovery of the Tuberculosis Bacterium', description: 'Robert Koch identifies Mycobacterium tuberculosis, paving the way for accurate TB diagnosis and effective treatment.' },
    { id: '5', year: '1895', title: 'Discovery of X-Rays', description: 'Wilhelm Röntgen discovers X-rays, transforming medical imaging and diagnostic practices worldwide.' },
    { id: '6', year: '1901', title: 'Classification of Blood Types', description: 'Karl Landsteiner classifies major blood groups (A, B, O), enabling safe and reliable blood transfusions.' },
    { id: '7', year: '1921', title: 'Discovery of Insulin', description: 'Frederick Banting and Charles Best isolate insulin, turning diabetes into a manageable chronic condition.' },
    { id: '8', year: '1923', title: 'Diphtheria Vaccine Developed', description: 'Widespread use of the diphtheria toxoid vaccine begins, drastically reducing deaths from the disease.' },
    { id: '9', year: '1928', title: 'Discovery of Penicillin', description: 'Alexander Fleming discovers the first true antibiotic, heralding the antibiotic era.' },
    { id: '10', year: '1935', title: 'Sulfonamides Introduced', description: 'Sulfonamides, the first synthetic antibiotics, are introduced to effectively treat diverse bacterial infections.' },
    { id: '11', year: '1953', title: 'DNA Structure Identified', description: 'James Watson and Francis Crick reveal the double-helix structure of DNA, laying the groundwork for modern genetics.' },
    { id: '12', year: '1955', title: 'Polio Vaccine Approved', description: 'Jonas Salk’s IPV is approved as safe and effective, drastically reducing global polio cases.' },
    { id: '13', year: '1960', title: 'Introduction of Oral Contraceptives', description: 'The FDA approves the first oral contraceptive pill, revolutionizing reproductive health and social norms.' },
    { id: '14', year: '1967', title: 'First Human Heart Transplant', description: 'Dr. Christiaan Barnard performs the first successful human heart transplant, redefining cardiac surgery.' },
    { id: '15', year: '1971', title: 'CT Scan Invented', description: 'Godfrey Hounsfield and Allan Cormack invent CT scanning, dramatically improving internal medical imaging.' },
    { id: '16', year: '1978', title: 'Birth of First IVF Baby', description: 'Louise Brown becomes the first baby born through IVF, marking a breakthrough in reproductive medicine.' },
    { id: '17', year: '1980', title: 'Smallpox Eradicated', description: 'WHO declares smallpox eradicated, a historic triumph of global vaccination efforts.' },
    { id: '18', year: '1983', title: 'HIV Identified', description: 'Luc Montagnier and Robert Gallo identify HIV as the virus responsible for AIDS.' },
    { id: '19', year: '1990', title: 'Launch of Human Genome Project', description: 'The Human Genome Project launches, aiming to map all human genes and revolutionize personalized medicine.' },
    { id: '20', year: '1996', title: 'Introduction of HAART for HIV', description: 'HAART becomes the standard HIV treatment, transforming it into a manageable chronic condition.' }
  ];
  // Palette used to cycle node fill colors
  const PALETTE: readonly string[] = ['#2E86C1', '#2A6F1C', '#C25107', '#8E44AD', '#C0392B', '#40566d', '#8E7302'] as const;

  // Layout constants (documenting "magic numbers")
  // Node geometry and spacing
  const NODE_SIZE: number = 110;
  const H_GAP: number = 60;
  const V_GAP: number = 150;

  // Margins and curve-tuning for serpentine “wrap” connections
  const BASE_MARGIN: number = 50; 
  const CURVE_RADIUS: number = H_GAP * 1.5;
  const CURVE_BOW: number = 70; 
  const CURVE_PADDING: number = CURVE_RADIUS + 2 * CURVE_BOW;
  const TOTAL_MARGIN: number = BASE_MARGIN + CURVE_PADDING;

  // Initial vertical position of the first row
  const INITIAL_Y: number = 80;

  // Connector visual constants
  const CONNECTOR_STROKE_WIDTH: number = 12;
  const DECORATOR_WIDTH: number = 20;
  const DECORATOR_HEIGHT: number = 30;
  const DECORATOR_PIVOT_INNER: number = 0.25;
  const DECORATOR_PIVOT_OUTER: number = 0.25;

  // Precomputed path data for custom decorators (arrow-like cap)
  const DECORATOR_PATH: string =
    'M 16 16 c -8 1 -7 1 -11 3 C 7 16 7 13 5 10 c 4 2 3 2 11 3 z';

  // Scrollable diagram area
  const scrollArea: Rect = new Rect(0, 0, 1500, 1500);

  // Diagram setup
  const diagram: Diagram = new Diagram({
    width: '100%',
    height: '600px',
    // constraints: DiagramConstraints.Default&~DiagramConstraints.PageEditable,
    snapSettings: { constraints: SnapConstraints.None },
    scrollSettings: {
      scrollableArea: scrollArea,
      padding: { right: 50, bottom: 50 }
    },
    tool: DiagramTools.ZoomPan,
    nodes: [],
    connectors: []
  });
  diagram.appendTo('#serpentineDiagram');

  {
    const INITIAL_ZOOM: number = 0.65;
    requestAnimationFrame((): void => {
      const currentZoom: number = diagram.scrollSettings.currentZoom || INITIAL_ZOOM;
      const focusPoint: PointModel = {
        x: diagram.scrollSettings.viewPortWidth / 2,
        y: diagram.scrollSettings.viewPortHeight / 2
      };
      if (Math.abs(currentZoom - INITIAL_ZOOM) > 0.001) {
        diagram.zoom(INITIAL_ZOOM / currentZoom, focusPoint);
      }
      diagram.scrollSettings.horizontalOffset = 0;
      diagram.scrollSettings.verticalOffset = 0;
      renderSerpentineLayout();
    });
  }

  // Zoom buttons
  type ZoomId = 'zoom-065' | 'zoom-075' | 'zoom-085' | 'zoom-1';
  const ZOOM_FACTORS: Record<ZoomId, number> = {
    'zoom-065': 0.65,
    'zoom-075': 0.75,
    'zoom-085': 0.85,
    'zoom-1': 1
  };
  const buttonRegistry: Partial<Record<ZoomId, Button>> = {};

  (Object.keys(ZOOM_FACTORS) as ZoomId[]).forEach((zoomButtonId: ZoomId): void => {
    const btnEl: HTMLElement | null = document.getElementById(zoomButtonId);
    if (!btnEl) return;

    const instance: Button = new Button({
      content: btnEl.textContent || '',
      isPrimary: ZOOM_FACTORS[zoomButtonId] === 0.65
    });
    instance.appendTo('#' + zoomButtonId);
    buttonRegistry[zoomButtonId] = instance;

    btnEl.addEventListener('click', (): void => {
      const currentZoom: number = diagram.scrollSettings.currentZoom || 0.65;
      const targetZoom: number = ZOOM_FACTORS[zoomButtonId];
      const zoomFactor: number = targetZoom / currentZoom;

      const focusPoint: PointModel = {
        x: diagram.scrollSettings.viewPortWidth / 2,
        y: diagram.scrollSettings.viewPortHeight / 2
      };
      diagram.zoom(zoomFactor, focusPoint);

      renderSerpentineLayout();

      diagram.scrollSettings.horizontalOffset = 0;
      diagram.scrollSettings.verticalOffset = 0;
      diagram.dataBind();

      (Object.keys(buttonRegistry) as ZoomId[]).forEach((key: ZoomId): void => {
        buttonRegistry[key]?.setProperties?.({ isPrimary: key === zoomButtonId });
      });
    });
  });

  /**
   * Returns the center point of the current viewport. Useful as a zoom/pan focus.
   */
  function getViewportCenter(): PointModel {
    const center: PointModel = {
      x: diagram.scrollSettings.viewPortWidth / 2,
      y: diagram.scrollSettings.viewPortHeight / 2
    };
    return center;
    // (Helper kept for potential reuse)
  }

  /**
   * Creates a decorator (custom cap) object for connectors with shared shape parameters.
   * Extracted to avoid repetition when creating source/target decorators.
   */
  function createDecorator(color: string, pivotX: number) {
    return {
      shape: 'Custom' as const,
      width: DECORATOR_WIDTH,
      height: DECORATOR_HEIGHT,
      pivot: { x: pivotX },
      pathData: DECORATOR_PATH,
      style: { fill: color, strokeColor: color }
    };
  }

  /**
   * Computes and renders a serpentine layout for the medicalBreakthroughs dataset.
   *
   * Algorithm overview:
   * - Nodes are placed horizontally with fixed NODE_SIZE and H_GAP.
   * - When the next node would overflow the effective drawing width (TOTAL_MARGIN padding),
   *   the algorithm wraps to the next row (offsetY += V_GAP) and reverses direction,
   *   producing a left-to-right then right-to-left (serpentine) pattern.
   * - Connectors are straight within a row. On a row change (wrap), a Bezier connector is drawn.
   *   The control points are positioned “outside” the turn using CURVE_RADIUS and CURVE_BOW
   *   to produce a smooth vertical bend between rows.
   *
   * Key constants:
   * - NODE_SIZE, H_GAP, V_GAP control node geometry and spacing.
   * - TOTAL_MARGIN prevents nodes from touching the diagram edges.
   * - CURVE_RADIUS and CURVE_BOW shape the Bezier curve on wraps.
   *
   * Side effects:
   * - Rebuilds diagram.nodes and diagram.connectors and then calls dataBind.
   */
  function renderSerpentineLayout(): void {
    const hostElement: HTMLElement | SVGElement | null = diagram.element;
    if (!hostElement) return;

    const zoom: number = diagram.scrollSettings.currentZoom || 1;
    const effectiveWidth: number = (hostElement as HTMLElement).clientWidth / zoom;

    const nodeModels: NodeModel[] = [];
    const connectorModels: ConnectorModel[] = [];

    let currentX: number = TOTAL_MARGIN + NODE_SIZE / 2;
    let currentY: number = INITIAL_Y;
    let direction: 1 | -1 = 1; // 1 = left-to-right, -1 = right-to-left

    medicalBreakthroughs.forEach((breakthrough: Breakthrough, index: number): void => {
      // Determine if placing the next node would exceed boundaries, and wrap if so
      const exceedsRight: boolean = direction === 1 && currentX + NODE_SIZE / 2 > effectiveWidth - TOTAL_MARGIN;
      const exceedsLeft: boolean = direction === -1 && currentX - NODE_SIZE / 2 < TOTAL_MARGIN;

      if (exceedsRight || exceedsLeft) {
        currentY += V_GAP;
        direction = direction === 1 ? -1 : 1;
        currentX = direction === 1
          ? TOTAL_MARGIN + NODE_SIZE / 2
          : effectiveWidth - TOTAL_MARGIN - NODE_SIZE / 2;
      }

      const color: string = PALETTE[index % PALETTE.length];

      const node: NodeModel = {
        id: `breakthrough_${breakthrough.id}`,
        offsetX: currentX,
        offsetY: currentY,
        width: NODE_SIZE,
        height: NODE_SIZE,
        shape: { type: 'Basic', shape: 'Ellipse' },
        style: { fill: color, strokeColor: 'white', strokeWidth: 4 },
        annotations: [
          { content: breakthrough.year, offset: { y: 0.3 }, style: { color: 'white', fontSize: 16, bold: true } },
          { content: breakthrough.title, width: 80, offset: { y: 0.65 }, style: { color: 'white', fontSize: 12, textOverflow: 'Wrap', textWrapping: 'WrapWithOverflow' } }
        ],
        ports: [
          { id: 'port_left', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
          { id: 'port_right', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden }
        ],
        constraints: (NodeConstraints.Default | NodeConstraints.Tooltip) &~NodeConstraints.Select,
        tooltip: {
          content: `<p style="font-size: small;"><b>${breakthrough.title} (${breakthrough.year})</b><br/><br/>${breakthrough.description}</p>`,
          position: 'BottomCenter',
          relativeMode: 'Object',
          width: 200
        }
      };
      nodeModels.push(node);

      currentX += direction * (NODE_SIZE + H_GAP);
    });

    for (let i: number = 0; i < nodeModels.length - 1; i++) {
      const sourceNode: NodeModel = nodeModels[i];
      const targetNode: NodeModel = nodeModels[i + 1];
      const rowChanged: boolean = sourceNode.offsetY !== targetNode.offsetY;

      let sourcePortId: 'port_left' | 'port_right';
      let targetPortId: 'port_left' | 'port_right';

      if (rowChanged) {
        // On wrap, connect from the outer edge to create a smooth vertical curve
        const nextRowStartsOnRight: boolean = sourceNode.offsetX < targetNode.offsetX;
        sourcePortId = nextRowStartsOnRight ? 'port_right' : 'port_left';
        targetPortId = sourcePortId;
      } else {
        // Same row: left-to-right or right-to-left connection
        const leftToRight: boolean = sourceNode.offsetX < targetNode.offsetX;
        sourcePortId = leftToRight ? 'port_right' : 'port_left';
        targetPortId = leftToRight ? 'port_left' : 'port_right';
      }

      const color: string = sourceNode.style.fill as string;

      const connector: ConnectorModel = {
        id: `connector_${i + 1}`,
        sourceID: sourceNode.id,
        targetID: targetNode.id,
        sourcePortID: sourcePortId,
        targetPortID: targetPortId,
        style: { strokeColor: color, strokeWidth: CONNECTOR_STROKE_WIDTH },
        targetDecorator: createDecorator(color, rowChanged ? 0 : DECORATOR_PIVOT_INNER),
        sourceDecorator: createDecorator(color, DECORATOR_PIVOT_OUTER),
        constraints: ConnectorConstraints.Default & ~NodeConstraints.Select,
      };

      if (rowChanged) {
        // Position control points on the outer side of the turn for a vertical “S” bend
        const goingRight: boolean = sourceNode.offsetX < targetNode.offsetX;
        const sign: number = goingRight ? 1.3 : -1.3;
        const controlX: number =
          sourceNode.offsetX + sign * (NODE_SIZE / 2 + CURVE_RADIUS + 2 * CURVE_BOW);

        connector.type = 'Bezier';
        connector.segments = [
          {
            type: 'Bezier',
            point1: { x: controlX, y: (sourceNode.offsetY as number) + 5 },
            point2: { x: controlX, y: (targetNode.offsetY as number) - 15 }
          }
        ];
      } else {
        connector.type = 'Straight';
      }

      connectorModels.push(connector);
    }

    diagram.nodes = nodeModels;
    diagram.connectors = connectorModels;
    diagram.dataBind();
  }

  // Debounced resize
  let resizeRaf: number = 0;
  window.addEventListener('resize', (): void => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame((): void => {
      renderSerpentineLayout();
    });
  });

  // Initial render
  setTimeout(renderSerpentineLayout, 0);
};