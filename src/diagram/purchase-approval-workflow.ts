import { loadCultureFiles } from '../common/culture-loader';
import {
  ConnectorConstraints,
  ConnectorModel,
  Diagram,
  DiagramTools,
  NodeConstraints,
  NodeModel,
  PortVisibility,
  UserHandleEventsArgs,
  UserHandleModel,
} from '@syncfusion/ej2-diagrams';

(window as any).default = (): void => {
  loadCultureFiles();

  // Define the workflow stages and display statuses.
  type Stage =
    | 'draft'
    | 'manager'
    | 'budget'
    | 'purchase'
    | 'completed'
    | 'rejected';
  type Status =
    | 'draft'
    | 'waiting'
    | 'active'
    | 'approved'
    | 'completed'
    | 'rejected';
  type NodeType = 'request' | 'manager' | 'budget' | 'purchase' | 'result';

  interface RequestData {
    item: string;
    requester: string;
    reason: string;
    quantity: number;
    unitPrice: number;
    budget: number;
  }

  interface NodeInfo {
    type: NodeType;
    title: string;
    status: Status;
    statusText: string;
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    message: string;
  }

  interface NoteInfo {
    text: string;
    status: Status;
  }

  // Format all monetary values consistently.
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const request: RequestData = {
    item: 'Ergonomic monitors',
    requester: 'Maya Chen',
    reason: 'Replace outdated design-team displays',
    quantity: 6,
    unitPrice: 420,
    budget: 5000,
  };

  // Track the current workflow state and pending actions.
  let stage: Stage = 'draft';
  let rejectionReason: 'budget' | 'manager' | undefined;
  let runToken = 0;
  let pendingTimer: number | undefined;
  let actionLocked = false;

  const statusLabels: Record<Status, string> = {
    draft: 'Draft',
    waiting: 'Waiting',
    active: 'Action required',
    approved: 'Approved',
    completed: 'Completed',
    rejected: 'Rejected',
  };

  const connectorIds = [
    'request-budget',
    'budget-manager',
    'manager-purchase',
    'purchase-result',
    'manager-result',
    'budget-result',
  ];
  const connectorStyle = { strokeColor: '#94a3b8', strokeWidth: 1.6 };

  // Calculate the total purchase value.
  function total(): number {
    return request.quantity * request.unitPrice;
  }

  function nodeInfo(type: NodeType, title: string): NodeInfo {
    return {
      type,
      title,
      status: type === 'request' ? 'draft' : 'waiting',
      statusText: type === 'request' ? 'Draft' : 'Waiting',
      primaryLabel: '',
      primaryValue: '',
      secondaryLabel: '',
      secondaryValue: '',
      message: '',
    };
  }

  // Create a workflow node with hidden connection ports.
  function createNode(
    id: string,
    x: number,
    y: number,
    type: NodeType,
    title: string,
  ): NodeModel {
    return {
      id,
      offsetX: x,
      offsetY: y,
      width: 160,
      height: type === 'result' ? 140 : 135,
      shape: { type: 'HTML' },
      style: { fill: 'transparent', strokeColor: 'transparent' },
      addInfo: nodeInfo(type, title),
      ports: [
        {
          id: `${id}-left`,
          offset: { x: 0, y: 0.5 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: `${id}-right`,
          offset: { x: 1, y: 0.5 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: `${id}-top`,
          offset: { x: 0.5, y: 0 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: `${id}-bottom`,
          offset: { x: 0.5, y: 1 },
          visibility: PortVisibility.Hidden,
        },
      ],
      annotations: [
        {
          id: `${id}-status`,
          annotationType: 'Template',
          content: '',
          offset: { x: 0.5, y: -0.11 },
          width: 85,
          height: 26,
          addInfo: {
            text: type === 'request' ? 'Draft' : 'Waiting',
            status: type === 'request' ? 'draft' : 'waiting',
          } as NoteInfo,
        },
      ],
    };
  }

  // Create an orthogonal connector between two workflow nodes.
  function createConnector(
    id: string,
    sourceID: string,
    targetID: string,
    sourcePortID = `${sourceID}-right`,
    targetPortID = `${targetID}-left`,
  ): ConnectorModel {
    return {
      id,
      sourceID,
      targetID,
      sourcePortID,
      targetPortID,
      type: 'Orthogonal',
      cornerRadius: 12,
      constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select,
      style: { ...connectorStyle },
      targetDecorator: {
        shape: 'Arrow',
        width: 9,
        height: 9,
        style: { fill: '#94a3b8', strokeColor: '#94a3b8' },
      },
    };
    // Show decision buttons only when manager approval is required.
  }

  const nodes= (() => {
    const nodesList = [
        createNode('request', 100, 100, 'request', 'Equipment request'),
        createNode('manager', 100, 300, 'manager', 'Manager review'),
        createNode('budget', 300, 100, 'budget', 'Budget check'),
        createNode('purchase', 300, 300, 'purchase', 'Purchase order'),
        createNode('result', 510, 200, 'result', 'Request outcome')
    ];
    
    // Initialize with default data so templates render properly on first load
    nodesList[0].addInfo = {
        type: 'request',
        title: 'Equipment request',
        status: 'draft',
        statusText: 'Draft',
        primaryLabel: 'Item',
        primaryValue: 'Ergonomic monitors',
        secondaryLabel: 'Total',
        secondaryValue: '$2,520',
        message: '6 × $420'
    };
    
    nodesList[1].addInfo = {
        type: 'manager',
        title: 'Manager review',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Requested by',
        primaryValue: 'Maya Chen',
        secondaryLabel: 'Amount',
        secondaryValue: '$2,520',
        message: 'Replace outdated design-team displays'
    };
    
    nodesList[2].addInfo = {
        type: 'budget',
        title: 'Budget check',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Available',
        primaryValue: '$5,000',
        secondaryLabel: 'Requested',
        secondaryValue: '$2,520',
        message: 'Within available budget'
    };
    
    nodesList[3].addInfo = {
        type: 'purchase',
        title: 'Purchase order',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Quantity',
        primaryValue: '6',
        secondaryLabel: 'Order value',
        secondaryValue: '$2,520',
        message: 'Created after all approvals'
    };
    
    nodesList[4].addInfo = {
        type: 'result',
        title: 'Request outcome',
        status: 'waiting',
        statusText: 'Waiting',
        primaryLabel: 'Outcome',
        primaryValue: 'Pending',
        secondaryLabel: '',
        secondaryValue: '',
        message: 'Waiting for workflow completion'
    };
    
    return nodesList;
  })();

  const connectors: ConnectorModel[] = [
    createConnector(
      'request-budget',
      'request',
      'budget',
      'request-right',
      'budget-left',
    ),
    createConnector(
      'budget-manager',
      'budget',
      'manager',
      'budget-bottom',
      'manager-left',
    ),
    createConnector(
      'manager-purchase',
      'manager',
      'purchase',
      'manager-right',
      'purchase-left',
    ),
    createConnector('purchase-result', 'purchase', 'result'),
    createConnector(
      'manager-result',
      'manager',
      'result',
      'manager-bottom',
      'result-bottom',
    ),
    createConnector(
      'budget-result',
      'budget',
      'result',
      'budget-right',
      'result-left',
    ),
  ];

  const managerHandles: UserHandleModel[] = [
    {
      name: 'approve',
      side: 'Bottom',
      offset: 0.32,
      size: 36,
      margin: { bottom: 13 },
      visible: false,
      tooltip: { content: 'Approve request' },
      disableConnectors: true,
    },
    {
      name: 'reject',
      side: 'Bottom',
      offset: 0.68,
      size: 36,
      margin: { bottom: 13 },
      visible: false,
      tooltip: { content: 'Reject request' },
      disableConnectors: true,
    },
  ];

  // Initialize the diagram, templates, tools, and event handlers.
  const diagram = new Diagram({
    width: '100%',
    height: '100%',
    nodes,
    connectors,
    nodeTemplate: '#node-template',
    annotationTemplate: '#annotation-template',
    userHandleTemplate: '#user-handle-template',
    selectedItems: { userHandles: managerHandles },
    tool: DiagramTools.SingleSelect | DiagramTools.ZoomPan,
    snapSettings: { gridType: 'Dots' },
    created: () => {
      diagram.zoomTo({ zoomFactor: 0.45 });
      diagram.fitToPage();
      refreshAllContent();
    },
    selectionChange: () => window.setTimeout(updateManagerHandles, 0),
    getNodeDefaults: (node: NodeModel) => {
      node.constraints =
        NodeConstraints.Default &
        ~(
          NodeConstraints.Resize |
          NodeConstraints.Rotate |
          NodeConstraints.Drag
        );
    },
    onUserHandleMouseDown: (args: UserHandleEventsArgs) =>
      handleManagerDecision(args.element?.name || ''),
  });
  diagram.appendTo('#diagram');

  function byId<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
  }

  function getNode(id: string): NodeModel {
    return diagram.getObject(id) as NodeModel;
  }

  // Update the data displayed inside a workflow node.
  function setNode(id: string, changes: Partial<NodeInfo>): void {
    const node = getNode(id);
    node.addInfo = { ...(node.addInfo as NodeInfo), ...changes };
    diagram.refreshTemplate(node);
  }

  function setStatus(
    id: string,
    status: Status,
    text = statusLabels[status],
  ): void {
    const node = getNode(id);
    setNode(id, { status, statusText: text });
    const note = node.annotations![0];
    note.addInfo = { text, status } as NoteInfo;
    diagram.refreshTemplate(note, node);
  }

  // Apply a visual state to a workflow connector.
  function setConnector(
    id: string,
    status: 'default' | 'active' | 'completed' | 'rejected',
  ): void {
    const connector = diagram.getObject(id) as ConnectorModel;
    const color =
      status === 'active'
        ? '#4f46e5'
        : status === 'completed'
          ? '#059669'
          : status === 'rejected'
            ? '#dc2626'
            : '#94a3b8';
    connector.style = {
      strokeColor: color,
      strokeWidth: status === 'default' ? 1.6 : 2.2,
    };
    if (connector.targetDecorator?.style) {
      connector.targetDecorator.style.fill = color;
      connector.targetDecorator.style.strokeColor = color;
    }
    diagram.dataBind();
  }

  // Refresh all node details after request data or status changes.
  function refreshAllContent(): void {
    const amount = total();
    setNode('request', {
      primaryLabel: 'Item',
      primaryValue: request.item,
      secondaryLabel: 'Total',
      secondaryValue: money.format(amount),
      message: `${request.quantity} × ${money.format(request.unitPrice)}`,
    });
    setNode('manager', {
      primaryLabel: 'Requested by',
      primaryValue: request.requester,
      secondaryLabel: 'Amount',
      secondaryValue: money.format(amount),
      message: request.reason,
    });
    setNode('budget', {
      primaryLabel: 'Available',
      primaryValue: money.format(request.budget),
      secondaryLabel: 'Requested',
      secondaryValue: money.format(amount),
      message:
        amount <= request.budget
          ? 'Within available budget'
          : 'Budget limit exceeded',
    });
    setNode('purchase', {
      primaryLabel: 'Quantity',
      primaryValue: String(request.quantity),
      secondaryLabel: 'Order value',
      secondaryValue: money.format(amount),
      message: 'Created after all approvals',
    });
    setNode('result', {
      primaryLabel: 'Outcome',
      primaryValue:
        stage === 'completed'
          ? 'Purchase successful'
          : stage === 'rejected'
            ? 'Purchase rejected'
            : 'Pending',
      secondaryLabel: '',
      secondaryValue: '',
      message:
        stage === 'completed'
          ? `${request.quantity} items approved for ${money.format(amount)}`
          : rejectionReason === 'budget'
            ? 'The request exceeds the available budget'
            : rejectionReason === 'manager'
              ? 'The request was declined by the manager'
              : 'Waiting for workflow completion',
    });
  }

  // Validate the request before starting the workflow.
  function validateRequest(): string[] {
    const errors: string[] = [];
    if (!request.item.trim()) errors.push('Enter an equipment name.');
    if (!request.requester.trim()) errors.push('Enter a requester name.');
    if (!request.reason.trim()) errors.push('Enter a business reason.');
    if (!Number.isFinite(request.quantity) || request.quantity < 1)
      errors.push('Quantity must be at least 1.');
    if (!Number.isFinite(request.unitPrice) || request.unitPrice <= 0)
      errors.push('Unit price must be greater than 0.');
    return errors;
  }

  function showValidation(errors: string[]): void {
    const box = byId<HTMLElement>('validationMessage');
    box.hidden = errors.length === 0;
    box.textContent = errors.join(' ');
  }

  // Cancel delayed work and unlock the workflow actions.
  function clearPendingWork(): void {
    runToken++;
    if (pendingTimer !== undefined) {
      window.clearTimeout(pendingTimer);
      pendingTimer = undefined;
    }
    actionLocked = false;
  }

  function delay(ms: number, token: number): Promise<boolean> {
    return new Promise((resolve) => {
      pendingTimer = window.setTimeout(() => {
        pendingTimer = undefined;
        resolve(token === runToken);
      }, ms);
    });
  }

  // Keep manager decision handles in sync with the current selection.
  function updateManagerHandles(): void {
    const selected = diagram.selectedItems.nodes?.[0] as NodeModel | undefined;

    const show =
      selected?.id === 'manager' && stage === 'manager' && !actionLocked;

    diagram.selectedItems.userHandles?.forEach((handle: UserHandleModel) => {
      handle.visible = show;
    });

    diagram.dataBind();
  }

  function setInputsDisabled(disabled: boolean): void {
    [
      'propertyItem',
      'propertyRequester',
      'propertyReason',
      'propertyQuantity',
      'propertyUnitPrice',
    ].forEach((id) => {
      byId<HTMLInputElement | HTMLTextAreaElement>(id).disabled = disabled;
    });
  }

  // Submit the request and run the budget approval step.
  async function submitRequest(): Promise<void> {
    const errors = validateRequest();
    showValidation(errors);
    if (errors.length) return;

    clearPendingWork();
    setInputsDisabled(true);
    setStatus('request', 'approved', 'Submitted');
    setConnector('request-budget', 'active');
    setStatus('budget', 'active', 'Checking budget');
    byId<HTMLButtonElement>('submitRequest').disabled = true;
    byId<HTMLElement>('workflowMessage').textContent =
      'Checking the available budget before requesting manager approval…';

    const token = ++runToken;
    if (!(await delay(700, token))) return;
    if (total() > request.budget) {
      stage = 'rejected';
      rejectionReason = 'budget';
      setStatus('budget', 'rejected', 'Insufficient budget');
      setConnector('request-budget', 'rejected');
      setConnector('budget-result', 'rejected');
      setStatus('result', 'rejected');
      refreshAllContent();
      diagram.select([getNode('result')]);
      byId<HTMLElement>('workflowMessage').textContent =
        'Request rejected because the purchase exceeds the available budget.';
      return;
    }

    stage = 'manager';
    setStatus('budget', 'approved', 'Budget approved');
    setConnector('request-budget', 'completed');
    setConnector('budget-manager', 'active');
    setStatus('manager', 'active', 'Decision required');
    diagram.select([getNode('manager')]);
    updateManagerHandles();
    byId<HTMLElement>('workflowMessage').textContent =
      'Budget approved. Manager decision required. Use Approve or Reject below the Manager Review node.';
  }

  // Route the selected manager decision to its workflow action.
  function handleManagerDecision(action: string): void {
    if (stage !== 'manager' || actionLocked) return;
    actionLocked = true;
    updateManagerHandles();
    if (action === 'approve') void approveRequest();
    if (action === 'reject') rejectRequest();
  }

  // Complete the approval path and create the purchase order.
  async function approveRequest(): Promise<void> {
    const token = ++runToken;
    setStatus('manager', 'approved');
    setConnector('budget-manager', 'completed');
    setConnector('manager-purchase', 'active');
    stage = 'purchase';
    setStatus('purchase', 'active', 'Creating order');
    byId<HTMLElement>('workflowMessage').textContent =
      'Budget approved. Creating the purchase order…';

    if (!(await delay(800, token))) return;
    setStatus('purchase', 'completed', 'Order created');
    setConnector('manager-purchase', 'completed');
    setConnector('purchase-result', 'completed');
    stage = 'completed';
    setStatus('result', 'completed', 'Successful');
    refreshAllContent();
    diagram.select([getNode('result')]);
    byId<HTMLElement>('workflowMessage').textContent =
      'Purchase approved and the order was created successfully.';
    actionLocked = false;
  }

  // Complete the rejection path when the manager declines the request.
  function rejectRequest(): void {
    clearPendingWork();
    stage = 'rejected';
    rejectionReason = 'manager';
    setStatus('manager', 'rejected', 'Declined');
    setConnector('budget-manager', 'completed');
    setConnector('manager-result', 'rejected');
    setStatus('result', 'rejected');
    refreshAllContent();
    diagram.select([getNode('result')]);
    byId<HTMLElement>('workflowMessage').textContent =
      'The manager declined the request. No budget check or purchase order was created.';
  }

  // Return the diagram and form to the initial draft state.
  function resetWorkflow(): void {
    clearPendingWork();
    stage = 'draft';
    rejectionReason = undefined;
    setInputsDisabled(false);
    showValidation([]);
    ['request', 'manager', 'budget', 'purchase', 'result'].forEach((id) =>
      setStatus(id, id === 'request' ? 'draft' : 'waiting'),
    );
    connectorIds.forEach((id) => setConnector(id, 'default'));
    refreshAllContent();
    diagram.select([getNode('request')]);
    updateManagerHandles();
    byId<HTMLButtonElement>('submitRequest').disabled = false;
    byId<HTMLElement>('workflowMessage').textContent =
      'Enter the request details, then submit it for manager approval.';
  }

  // Copy the latest form values into the workflow request.
  function readForm(): void {
    request.item = byId<HTMLInputElement>('propertyItem').value;
    request.requester = byId<HTMLInputElement>('propertyRequester').value;
    request.reason = byId<HTMLTextAreaElement>('propertyReason').value;
    request.quantity = Number(byId<HTMLInputElement>('propertyQuantity').value);
    request.unitPrice = Number(
      byId<HTMLInputElement>('propertyUnitPrice').value,
    );
    showValidation([]);
    refreshAllContent();
  }

  // Keep the preview synchronized while the form is edited.
  [
    'propertyItem',
    'propertyRequester',
    'propertyReason',
    'propertyQuantity',
    'propertyUnitPrice',
  ].forEach((id) => {
    byId<HTMLElement>(id).addEventListener('input', readForm);
  });
  byId<HTMLButtonElement>('submitRequest').addEventListener(
    'click',
    submitRequest,
  );
  byId<HTMLButtonElement>('resetWorkflow').addEventListener(
    'click',
    resetWorkflow,
  );

  resetWorkflow();

};
