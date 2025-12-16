import { loadCultureFiles } from '../common/culture-loader';
import {
  Diagram, NodeModel, ConnectorModel,
  SnapConstraints, DiagramTools, DataBinding,
  ComplexHierarchicalTree, Connector,
} from '@syncfusion/ej2-diagrams';
import * as Data from './diagram-data.json';
import { DataManager } from '@syncfusion/ej2-data';

/**
 * Family Tree using Complex Hierarchical Layout
 */

Diagram.Inject(ComplexHierarchicalTree, DataBinding);
(window as any).default = (): void => {
  loadCultureFiles();

  type Person = {
    Id: string;
    Name?: string;
    FirstName?: string;
    Tenure?: string;
    Description?: string;
    Type?: string;
    Parents?: string[];
    ImageUrl?: string;
  };

  const NODE_WIDTH = 140;
  const NODE_HEIGHT = 180;
  const HOVER_WIDTH = 320;
  const ORIGINAL_SIZE = new Map<string, { width: number; height: number; }>();
  const CONNECTOR_COLORS = {
    baseConnector: '#85736E',
    highlightedConnector: '#723523',
  };

  const DATA_SOURCE = (Data as any).familyTreeData as Person[];

  /* ===== Build relations (spouse/parents/children/union) ===== */
  function buildRelations(data: Person[]) {
    const unions = data.filter((d) => d.Type === 'Union');
    const spouseOf = new Map<string, string>();
    const unionOf = new Map<string, [string, string]>();
    const parentsByChild = new Map<string, string[]>();
    const childrenByParent = new Map<string, Set<string>>();

    unions.forEach((u: any) => {
      const [a, b] = (u.Parents ?? []) as [string, string];
      if (!a || !b) return;
      unionOf.set(u.Id, [a, b]);
      spouseOf.set(a, b);
      spouseOf.set(b, a);
    });

    data.forEach((n: any) => {
      if (Array.isArray(n.Parents)) {
        parentsByChild.set(n.Id, n.Parents.slice());
        n.Parents.forEach((ref: string) => {
          const pr = unionOf.get(ref);
          if (!pr) return;
          const [pa, pb] = pr;
          if (!childrenByParent.has(pa)) childrenByParent.set(pa, new Set());
          if (!childrenByParent.has(pb)) childrenByParent.set(pb, new Set());
          childrenByParent.get(pa)!.add(n.Id);
          childrenByParent.get(pb)!.add(n.Id);
        });
      }
    });

    return { spouseOf, unionOf, parentsByChild, childrenByParent };
  }

  const RELATIONS = buildRelations(DATA_SOURCE);

  /* ===== Related set for hover highlight ===== */
  function relatedSet(personId: string) {
    const people = new Set<string>([personId]);
    const spouse = RELATIONS.spouseOf.get(personId);
    if (spouse) people.add(spouse);

    // parents of the person (via unions)
    const parentUnions = new Set(RELATIONS.parentsByChild.get(personId) ?? []);
    parentUnions.forEach((u) =>
      (RELATIONS.unionOf.get(u) ?? []).forEach((p) => people.add(p))
    );

    // children of the person
    const kids = RELATIONS.childrenByParent.get(personId);
    if (kids) kids.forEach((k) => people.add(k));

    // include only the unions actually tying hovered/spouse to children
    const unions = new Set<string>(parentUnions);
    const spouseOrSelf = new Set([personId, ...(spouse ? [spouse] : [])]);
    (kids ?? new Set<string>()).forEach((childId) => {
      const parents = RELATIONS.parentsByChild.get(childId) ?? [];
      parents.forEach((u) => {
        const pair = RELATIONS.unionOf.get(u);
        if (pair && (spouseOrSelf.has(pair[0]) || spouseOrSelf.has(pair[1]))) {
          unions.add(u);
        }
      });
    });

    const nodeSet = new Set<string>(people);
    unions.forEach((u) => nodeSet.add(u));
    return { people, nodeSet };
  }

  /* ===== DOM helpers for HTML node ===== */
  function hostOf(id: string) {
    return document.getElementById(`${id}_html_element`);
  }
  function containerOf(id: string): HTMLElement | null {
    return hostOf(id)?.querySelector(
      '.person-node-container'
    ) as HTMLElement | null;
  }


  /* ===== Open/close the node's own template for relation description expansion ===== */
  function setTemplateOpen(id: string, open: boolean) {
    const cont = containerOf(id);
    if (!cont) return;
    cont.classList.toggle('is-open', open);
  }

  /* ===== Fade out other nodes when a focus is set for related nodes ===== */
  function setNodeDim(id: string, dim: boolean) {
    const cont = containerOf(id);
    if (!cont) return;
    cont.classList.toggle('is-dim', dim);
  }

  /* ===== Paint connectors ===== */
  function paintConnectors(diagram: Diagram, nodeSet: Set<string>) {
    diagram.connectors.forEach((connector: ConnectorModel) => {
      const sourceConn = (connector as any).sourceID as string | undefined;
      const targetConn = (connector as any).targetID as string | undefined;
      const hasRelations = !!(sourceConn && targetConn && nodeSet.has(sourceConn) && nodeSet.has(targetConn));
      connector.style = {
        strokeColor: hasRelations ? CONNECTOR_COLORS.highlightedConnector : CONNECTOR_COLORS.baseConnector,
        opacity: hasRelations ? 1 : 0.2, // <-- fade others
      };
    });
  }

  /* ===== Hover expand/shrink ===== */
  function expandForHover(diagram: Diagram, id: string) {
    const node = diagram.getObject(id) as any;
    if (!node || node.data?.Type === 'Union') return;
    if (!ORIGINAL_SIZE.has(id))
      ORIGINAL_SIZE.set(id, { width: node.width, height: node.height });
    node.width = HOVER_WIDTH; // real width change
    setTemplateOpen(id, true);
  }
  function shrinkFromHover(diagram: Diagram, id: string) {
    const node = diagram.getObject(id) as any;
    if (!node) return;
    const orig = ORIGINAL_SIZE.get(id);
    if (orig) {
      node.width = orig.width;
      node.height = orig.height;
    }
    setTemplateOpen(id, false);
  }

  /* ===== Hover coordination ===== */
  let hoveredId: string | null = null;

  function focusHover(diagram: Diagram, id: string) {
    if (hoveredId && hoveredId !== id) {
      shrinkFromHover(diagram, hoveredId);
    }

    const { people, nodeSet } = relatedSet(id);

    // Dim everything that's not the hovered node and not related
    diagram.nodes.forEach((node) => {
      const nodeId = node.id as string;
      const isPerson = (node as any)?.data?.Type !== 'Union';
      setNodeDim(nodeId, isPerson && nodeId !== id && !people.has(nodeId));
    });

    expandForHover(diagram, id);
    paintConnectors(diagram, nodeSet);
    hoveredId = id;
  }

  function clearHover(diagram: Diagram) {
    if (hoveredId) {
      shrinkFromHover(diagram, hoveredId);
      hoveredId = null;
    }

    // Clear dimming on all nodes
    diagram.nodes.forEach((n: NodeModel) => setNodeDim(n.id as string, false));

    diagram.connectors.forEach(
      (c: ConnectorModel) =>
      (c.style = {
        strokeColor: CONNECTOR_COLORS.baseConnector,
        strokeWidth: 2,
        opacity: 1,
      })
    );
  }

  /* ===== Diagram ===== */
  const diagram: Diagram = new Diagram({
    width: '100%',
    height: '600px',
    tool: DiagramTools.ZoomPan,
    snapSettings: { constraints: SnapConstraints.None },
    layout: {
      type: 'ComplexHierarchicalTree',
      orientation: 'TopToBottom',
      horizontalAlignment: 'Center',
      verticalAlignment: 'Top',
      horizontalSpacing: 150,
      verticalSpacing: 50,
    },
    dataSourceSettings: {
      id: 'Id',
      parentId: 'Parents',
      dataSource: new DataManager(DATA_SOURCE),
      doBinding: (node: NodeModel, raw: any) => {
        node.id = String(raw.Id);
        node.data = raw;
        // Invisible junction nodes for parent unions
        if (raw.Type === 'Union') {
          node.width = 0;
          node.height = 0;
          node.shape = { type: 'Basic', shape: 'Rectangle' };
          (node as any).style = {
            fill: 'transparent',
            strokeColor: 'transparent',
          };
          node.visible = false;
        } else {
          raw.ImageUrl = `src/diagram/Images/family-tree/${raw.Name}.png`;
          node.shape = { type: 'HTML' };
          node.width = NODE_WIDTH;
          node.height = NODE_HEIGHT;
        }
      },
    },

    mouseEnter: (args: any) => {
      const node: any = args?.actualObject;
      // ignore union node and connector hover
      if (!node || node instanceof Connector || node?.data?.Type === 'Union') return;
      focusHover(diagram, node.id);
    },

    mouseLeave: () => clearHover(diagram),

    dataLoaded: () => setTimeout(() => diagram.fitToPage()),

    getConnectorDefaults: (connector: ConnectorModel) => {
      connector.type = 'Orthogonal';
      connector.style = { strokeColor: CONNECTOR_COLORS.baseConnector, strokeWidth: 2 };
      connector.targetDecorator = { shape: 'None' };
      (connector as any).cornerRadius = 5;
      return connector;
    },

    nodeTemplate: '#nodetemplate',
  });

  diagram.appendTo('#diagram');

};
