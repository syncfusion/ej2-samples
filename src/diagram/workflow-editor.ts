import { loadCultureFiles } from '../common/culture-loader';
import { Diagram, DiagramTools, NodeConstraints, ConnectorModel, NodeModel, BpmnDiagrams, UndoRedo, SnapConstraints, SelectorConstraints, AnnotationConstraints, randomId, SymbolPalette, UserHandleModel, AnnotationModel } from '@syncfusion/ej2-diagrams';
import { Toolbar, ClickEventArgs, ItemModel } from '@syncfusion/ej2-navigations';
import { Switch } from '@syncfusion/ej2-buttons';
import { Tooltip } from '@syncfusion/ej2-popups';

// Inject UndoRedo and BpmnDiagrams modules into the Diagram for extended functionality.
Diagram.Inject(UndoRedo, BpmnDiagrams);
SymbolPalette.Inject(BpmnDiagrams);

(window as any).default = (): void => {
  loadCultureFiles();
  // Initialize variables
  let flowTimeOut1: any, flowTimeOut2: any;
  let isPaused = false;
  let animationIntervals: any[] = [];
  const connectorBeforeAnimationColor = "#B0B0B0";
  const connectorDuringAnimationColor = "#FF7F50";
  const connectorAfterAnimationColor = "green";
  const connectorAnnotationColor = "#32CD32";
  const nodeStrokeBeforeAnimationColor = "black";
  const nodeStrokeAfterAnimationColor = "green";
  let nodes: NodeModel[] = [
    {
      id: "start",
      offsetX: 100,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Event",
        event: { event: "Start", trigger: "None" },
      },
      annotations: [{ content: "Start" }],
    },
    {
      id: "liquidInput",
      offsetX: 300,
      offsetY: 280,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Liquid Input" }],
    },
    {
      id: "dryInput",
      offsetX: 300,
      offsetY: 480,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Dry Input" }],
    },
    {
      id: "condensed",
      offsetX: 500,
      offsetY: 180,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Condensed" }],
    },
    {
      id: "cream",
      offsetX: 500,
      offsetY: 260,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Cream" }],
    },
    {
      id: "caneSugar",
      offsetX: 500,
      offsetY: 340,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Cane Sugar" }],
    },
    {
      id: "water",
      offsetX: 500,
      offsetY: 420,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Water" }],
    },
    {
      id: "ingredients",
      offsetX: 500,
      offsetY: 500,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Ingredients" }],
    },
    {
      id: "flavour",
      offsetX: 500,
      offsetY: 580,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Flavour" }],
    },
    {
      id: "fruitsAndNuts",
      offsetX: 500,
      offsetY: 660,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Fruits and Nuts" }],
    },
    {
      id: "blending",
      offsetX: 700,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Blending" }],
    },
    {
      id: "coolingAging",
      offsetX: 840,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Cooling/Aging" }],
    },
    {
      id: "packaging",
      offsetX: 980,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Packaging" }],
    },
    {
      id: "storageDistribution",
      width: 140,
      offsetX: 1130,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Storage/Distribution" }],
    },
    {
      id: "end",
      offsetX: 1260,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Event",
        event: { event: "End", trigger: "None" },
      },
      annotations: [{ content: "End" }],
    },
  ];
  let connectors: ConnectorModel[] = [
    { id: "c1", sourceID: "start", targetID: "liquidInput" },
    { id: "c2", sourceID: "start", targetID: "dryInput" },
    { id: "c3", sourceID: "liquidInput", targetID: "condensed" },
    { id: "c4", sourceID: "liquidInput", targetID: "cream" },
    { id: "c5", sourceID: "liquidInput", targetID: "caneSugar" },
    { id: "c6", sourceID: "liquidInput", targetID: "water" },
    { id: "c7", sourceID: "liquidInput", targetID: "ingredients" },
    {
      id: "c8",
      sourceID: "dryInput",
      targetID: "flavour",
    },
    {
      id: "c9",
      sourceID: "dryInput",
      targetID: "fruitsAndNuts",
    },
    { id: "c10", sourceID: "condensed", targetID: "blending" },
    { id: "c11", sourceID: "cream", targetID: "blending" },
    { id: "c12", sourceID: "caneSugar", targetID: "blending" },
    { id: "c13", sourceID: "water", targetID: "blending" },
    { id: "c14", sourceID: "ingredients", targetID: "blending" },
    { id: "c15", sourceID: "flavour", targetID: "blending" },
    { id: "c16", sourceID: "fruitsAndNuts", targetID: "blending" },
    { id: "c17", sourceID: "blending", targetID: "coolingAging" },
    { id: "c18", sourceID: "coolingAging", targetID: "packaging" },
    { id: "c19", sourceID: "packaging", targetID: "storageDistribution" },
    { id: "c20", sourceID: "storageDistribution", targetID: "end" },
  ];
 

  // Node defaults
  const getNodeDefaults = (node: NodeModel): NodeModel => {
    node.constraints = (NodeConstraints.Default & ~NodeConstraints.Rotate) | NodeConstraints.HideThumbs;
    if (node.width === undefined || node.height === undefined) {
      const dimensions = {
        Event: { width: 60, height: 60 },
        Gateway: { width: 90, height: 70 },
        Activity: { width: 90, height: 50 },
      };
      const shapeType = (node.shape as { shape: 'Event' | 'Gateway' | 'Activity' }).shape;
      node.width = node.width || dimensions[shapeType].width;
      node.height = node.height || dimensions[shapeType].height;
    }
    return node;
  };

  // Connector defaults
  const getConnectorDefaults = (connector: ConnectorModel): ConnectorModel => {
    connector.type = "Straight";
    connector.style.strokeColor =
      connector.targetDecorator.style.strokeColor =
      connector.targetDecorator.style.fill =
      connectorBeforeAnimationColor;

    connector.annotations = [
      {
        content: "",
        height: 16,
        width: 16,
        offset: 0,
        style: { fill: "transparent", fontSize: 24 },
      },
    ];
    return connector;
  };

  let userHandles: UserHandleModel[] = [
    {
      name: "delete",
      pathData: "M0.97,3.04 L12.78,3.04 L12.78,12.21 C12.78,12.64,12.59,13,12.2,13.3 C11.82,13.6,11.35,13.75,10.8,13.75 L2.95,13.75 C2.4,13.75,1.93,13.6,1.55,13.3 C1.16,13,0.97,12.64,0.97,12.21 Z M4.43,0 L9.32,0 L10.34,0.75 L13.75,0.75 L13.75,2.29 L0,2.29 L0,0.75 L3.41,0.75 Z",
      tooltip: { content: "Delete Node" },
      side: "Bottom",
      offset: 0.5,
      margin: { bottom: 5 },
      disableConnectors: true,
    },
    {
      name: "drawConnector",
      pathData:
        "M6.09,0 L13.75,6.88 L6.09,13.75 L6.09,9.64 L0,9.64 L0,4.11 L6.09,4.11 Z",
      tooltip: { content: "Draw Connector" },
      side: "Right",
      offset: 0.5,
      margin: { right: 5 },
      disableConnectors: true,
    },
    {
      name: "stopAnimation",
      pathData: "M4.75,0.75 L9.25,0.75 L9.25,9.25 L4.75,9.25 Z", // Stop icon
      tooltip: { content: "Enable Animation" },
      disableNodes: true
    },
  ];

  let diagram: Diagram = new Diagram({
    width: "100%",
    height: "600px",
    scrollSettings: { scrollLimit: "Infinity", canAutoScroll: true },
    tool: DiagramTools.ZoomPan,
    nodes: nodes,
    connectors: connectors,
    getNodeDefaults: getNodeDefaults,
    getConnectorDefaults: getConnectorDefaults,
    selectedItems: {
      userHandles: userHandles,
      // constraints: SelectorConstraints.UserHandle
    },
    created: () => diagram.fitToPage(),
  });
  diagram.appendTo("#diagram");

  diagram.selectionChange = (args) => {
    if (args.state !== "Changed") return;
    var connector = diagram.selectedItems.connectors[0];
    var handle = null;
    for (var i = 0; i < diagram.selectedItems.userHandles.length; i++) {
      if (diagram.selectedItems.userHandles[i].name === "stopAnimation") {
        handle = diagram.selectedItems.userHandles[i];
        break;
      }
    }
    if (connector && handle) {
      var isStopped =
        connector.addInfo && (connector.addInfo as any).stopAnimation === true;
      if (isStopped) {
        handle.pathData = "M2,0 L10,8 L2,16 L2,0 Z"; // Play icon (start animation)
      } else {
        handle.pathData = "M5.25,1.25 L8.75,1.25 L8.75,8.75 L5.25,8.75 Z"; // Stop icon
      }
      if (isStopped) {
        handle.tooltip.content = "Enable Animation";
      } else {
        handle.tooltip.content = "Disable Animation";
      }
      handle.visible = true;
    } else if (handle) {
      handle.visible = false;
    }
  };

  diagram.onUserHandleMouseDown = (args) => {
    var handleName = args.element.name;
    switch (handleName) {
      case "delete":
        diagram.remove(diagram.selectedItems.nodes[0]);
        break;
      case "drawConnector":
        var sourceNode = diagram.selectedItems.nodes[0];
        if (!sourceNode) return;
        diagram.drawingObject = { type: "Straight", sourceID: sourceNode.id };
        diagram.tool = DiagramTools.DrawOnce;
        break;
      case "stopAnimation":
        var connector = diagram.selectedItems.connectors[0];
        if (connector) {
          if (!connector.addInfo) connector.addInfo = {};
          (connector.addInfo as any).stopAnimation = !(connector.addInfo as any).stopAnimation;

          // Update path and tooltip
          var handle = diagram.selectedItems.userHandles.find(function (h) {
            return h.name === "stopAnimation";
          });
          if (handle) {
            var isStopped = (connector.addInfo as any).stopAnimation;

            if (isStopped) {
              handle.pathData = "M2,0 L10,8 L2,16 L2,0 Z"; // Play icon
              handle.tooltip.content = "Enable Animation";
            } else {
              handle.pathData = "M4.75,0.75 L9.25,0.75 L9.25,9.25 L4.75,9.25 Z"; // Stop icon
              handle.tooltip.content = "Disable Animation";
            }
          }
        }
        break;
    }
  };

  function startWorkflow() {
    if (!isPaused && animationIntervals.length) {
      isPaused = true;
      updateExecuteButton("Resume");
      clearAnimationIntervals();
      return;
    }

    if (isPaused) {
      isPaused = false;
      updateExecuteButton("Pause");
      resumeWorkflow();
      return;
    }

    isPaused = false;
    resetWorkflow();
    updateExecuteButton("Pause");

    const startNodes = diagram.nodes.filter((node) =>
      node.shape && node.shape.type === "Bpmn" && (node.shape as any).shape === "Event" && (node.shape as any).event.event === "Start"
    );
    if (startNodes.length === 0) {
      console.error("No start nodes found.");
      return;
    }
    startNodes.forEach((startNode) => {
      animateNode(startNode.id);
    });
  }

  function resumeWorkflow() {
    diagram.connectors.forEach((connector) => {
      const lastAnn = connector.annotations[connector.annotations.length - 1];
      if (lastAnn && lastAnn.offset > 0 && lastAnn.offset < 0.9) {
        lastAnn.content = "●";
        if (lastAnn.style) lastAnn.style.color = connectorAnnotationColor;

        const sourceNode = diagram.getObject(connector.sourceID) as NodeModel;
        const isStartNode = sourceNode && sourceNode.shape.type === "Bpmn" && (sourceNode.shape as any).shape === "Event" && (sourceNode.shape as any).event.event === "Start";

        if (isStartNode || (sourceNode && sourceNode.style.strokeColor === nodeStrokeAfterAnimationColor)) {
          animateConnector(connector, (targetId: string) => {
            const targetNode = diagram.getObject(targetId) as NodeModel;
            if (targetNode) {
              createLoadingAnimation(targetNode);
              setTimeout(() => {
                completeNodeAnimation(targetNode);
                animateNode(targetId);
              }, 1000);
            }
          });
        }
      }
    });
  }

  function animateNode(nodeId: string) {
    const currentConnectors = diagram.connectors.filter((conn) => conn.sourceID === nodeId);

    currentConnectors.forEach((connector) => {
      if (!(connector.addInfo && (connector.addInfo as any).stopAnimation === true)) {
        animateConnector(connector, (targetNodeId: string) => {
          const targetNode = diagram.getObject(targetNodeId) as NodeModel;

          if (targetNode) {
            createLoadingAnimation(targetNode);

            flowTimeOut1 = setTimeout(() => {
              Array.from(document.getElementsByClassName("loading-indicator")).forEach((el) => (el as HTMLElement).style.display = "none");
              Array.from(document.getElementsByClassName("tick")).forEach((el) => (el as HTMLElement).style.display = "block");

              targetNode.style.strokeColor = nodeStrokeAfterAnimationColor;
              diagram.dataBind();

              if (targetNode.shape && targetNode.shape.type === "Bpmn" && (targetNode.shape as any).shape === "Event" && (targetNode.shape as any).event.event === "End") {
                updateExecuteButton("Execute");
                animationIntervals.length = 0;
              } else {
                animateNode(targetNodeId);
              }
            }, 1000);
          }
        });
      }
    });
  }

  function animateConnector(connector: ConnectorModel, callback: (targetId: string) => void) {
    const lastAnn = connector.annotations[connector.annotations.length - 1];
    lastAnn.offset = lastAnn.offset || 0.02;
    lastAnn.content = "●";
    lastAnn.style.color = connectorAnnotationColor;
    diagram.dataBind();

    let flowInterval = setInterval(() => {
      if (isPaused) {
        return;
      }
      if (lastAnn.offset < 0.9) {
        lastAnn.offset += 0.025;
        connector.style.strokeColor = connector.targetDecorator.style.strokeColor = connector.targetDecorator.style.fill = connectorDuringAnimationColor;
        diagram.dataBind();
      } else {
        clearInterval(flowInterval);
        lastAnn.style.color = "transparent";
        connector.style.strokeColor = connector.targetDecorator.style.strokeColor = connector.targetDecorator.style.fill = connectorAfterAnimationColor;
        diagram.dataBind();
        callback(connector.targetID);
      }
    }, 120);

    animationIntervals.push(flowInterval);
  }

  function createLoadingAnimation(targetNode: NodeModel) {
    if (!targetNode || !targetNode.annotations) {
      return;
    }
    const htmlTemplate = '<div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; margin-left: -3px; margin-top: -3px;"><div class="loading-indicator"></div><div class="tick" style="display: none;"><i class="e-icons e-check"></i></div></div>';

    const annotation:any = {
      template: htmlTemplate,
      offset: { x: 0, y: 0 },
      verticalAlignment: "Top",
      horizontalAlignment: "Left",
      style: { fill: "transparent" },
    };

    diagram.addLabels(targetNode, [annotation]);
  }

  function completeNodeAnimation(node: NodeModel) {
    document.querySelectorAll(".loading-indicator").forEach((el) => (el as HTMLElement).style.display = "none");
    document.querySelectorAll(".tick").forEach((el) => (el as HTMLElement).style.display = "block");

    if (node.style) {
      node.style.strokeColor = nodeStrokeAfterAnimationColor;
    }
    diagram.dataBind();
  }

  function resetWorkflow() {
    isPaused = false;
    clearTimeout(flowTimeOut1);
    clearTimeout(flowTimeOut2);
    clearAnimationIntervals();

    document.querySelectorAll(".loading-indicator, .tick").forEach((el) => el.remove());

    diagram.nodes.forEach((node) => {
      if (node.style) node.style.strokeColor = nodeStrokeBeforeAnimationColor;
    });

    diagram.connectors.forEach((connector) => {
      connector.style.strokeColor = connector.targetDecorator.style.strokeColor = connector.targetDecorator.style.fill = connectorBeforeAnimationColor;
      connector.annotations.forEach((ann) => {
        ann.offset = 0;
        ann.content = "";
        ann.style.color = connectorAnnotationColor;
      });
    });

    diagram.dataBind();
  }

  function clearAnimationIntervals() {
    animationIntervals.forEach(clearInterval);
    animationIntervals.length = 0;
  }

  const toolbarItems: ItemModel[] = [
    {
      id: "New",
      text: "New",
      tooltipText: "New Diagram",
      prefixIcon: "e-icons e-circle-add",
    },
    {
      id: "Open",
      text: "Open",
      tooltipText: "Open Diagram",
      prefixIcon: "e-icons e-folder-open",
    },
    {
      id: "Save",
      text: "Save",
      tooltipText: "Save Diagram",
      prefixIcon: "e-icons e-save",
    },
    { type: "Separator" },
    {
      id: "Execute",
      width: 90,
      text: "Execute",
      tooltipText: "Start Workflow",
      prefixIcon: "e-icons e-play",
      overflow: 'Show'
    },
    {
      id: "Reset",
      text: "Reset",
      tooltipText: "Reset View/State",
      prefixIcon: "e-icons e-reset",
      overflow: 'Show'
    },
    {
      id: "Delete",
      text: "Delete",
      tooltipText: "Delete Selected",
      prefixIcon: "e-icons e-trash",
    },
    { type: "Separator" },
    {
      id: "Select",
      text: "Select",
      tooltipText: "Select Tool",
      prefixIcon: "e-icons e-mouse-pointer",
      overflow: 'Show'
    },
    {
      id: "Pan",
      text: "Pan",
      tooltipText: "Pan Tool",
      prefixIcon: "e-icons e-pan",
      overflow: 'Show'
    },
    { type: "Separator" },
    {
      id: "palette",
      template: '<aside id="symbolPalette"></aside>',
      overflow: 'Show'
    },
  ];


  const toolbarObj = new Toolbar({
    // enableToggle: true,
    overflowMode: 'Popup',
    items: toolbarItems,
    clicked: (args: ClickEventArgs) => {
      if (args.item === undefined || args.item.text === undefined) {
        return;
      }
      switch (args.item.id) {
        case "New":
          updateExecuteButton("Execute");
          clearAnimationIntervals();
          diagram.clear();
          break;
        case "Open":
          document.getElementById("fileInput")!.click();
          break;
        case "Save":
          saveDiagram();
          break;
        case "Execute":
        case "Pause":
        case "Resume":
          diagram.clearSelection();
          startWorkflow();
          break;
        case "Reset":
          resetWorkflow();
          updateExecuteButton("Execute");
          break;
        case "Delete":
          diagram.remove();
          break;
        case "Select":
          diagram.tool = DiagramTools.MultipleSelect;
          break;
        case "Pan":
          diagram.tool = DiagramTools.ZoomPan;
          break;
      }
    },
  });
  toolbarObj.appendTo("#Diagramtoolbar");

  const toolbarObjForToggleSwitch = new Toolbar({
    // enableToggle: true,
    items: [
      {
        id: "toggleBtn",
        template: '<div id="switch-container"><span id="editLabel" style="font-size: 14px; margin-right: 6px;">Edit</span><input type="checkbox" id="switchMode" /></div>',
      },
    ],
  });
  toolbarObjForToggleSwitch.appendTo("#DiagramtoolbarWithToggleSwitch");

  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.id = "fileInput";
  input.style.display = "none";
  document.body.appendChild(input);

  input.addEventListener("change", function (e: Event) {
    const file = (e.target as HTMLInputElement).files![0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt: ProgressEvent<FileReader>) {
      const json = JSON.parse(evt.target!.result as string);
      diagram.loadDiagram(json);
      updateExecuteButton("Execute");
      clearAnimationIntervals();
      diagram.tool = DiagramTools.ZoomPan;
      input.value = "";
      diagram.fitToPage();
    };
    reader.readAsText(file);
  });
  // Define the WorkflowState type using the clipboard content
  type WorkflowState = 'Pause' | 'Resume' | 'Execute';

  function updateExecuteButton(state: WorkflowState) {
    const btn = toolbarObj.items[4];
    const states = {
      Pause: {
        id: "Pause",
        text: "Pause",
        tooltipText: "Pause Workflow",
        prefixIcon: "e-icons e-pause",
      },
      Resume: {
        id: "Resume",
        text: "Resume",
        tooltipText: "Resume Workflow",
        prefixIcon: "e-icons e-play",
      },
      Execute: {
        id: "Execute",
        text: "Execute",
        tooltipText: "Start Workflow",
        prefixIcon: "e-icons e-play",
      },
    };

    const newState = states[state];
    Object.assign(btn, newState);
  }

  function saveDiagram() {
    const fileName = "Diagram.json";
    const jsonData = diagram.saveDiagram();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  var palette = new SymbolPalette({
    enableAnimation: false,
    // showHeader: false,
    palettes: [
      {
        id: "BPMN",
        expanded: true,
        symbols: [
          {
            id: "Start",
            shape: { type: "Bpmn", shape: "Event" },
            annotations: [{ content: "Start" }],
            tooltip: { content: "Start", relativeMode: "Object" },
            constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
          },
          {
            id: "Decision",
            shape: { type: "Bpmn", shape: "Gateway" },
            annotations: [{ content: "Decision" }],
            tooltip: { content: "Decision", relativeMode: "Object" },
            constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
          },
          {
            id: "Task",
            shape: { type: "Bpmn", shape: "Activity" },
            annotations: [{ content: "Task" }],
            tooltip: { content: "Task", relativeMode: "Object" },
            constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
          },
          {
            id: "End",
            shape: {
              type: "Bpmn",
              shape: "Event",
              event: { event: "End", trigger: "None" },
            },
            annotations: [{ content: "End" }],
            tooltip: { content: "End", relativeMode: "Object" },
            constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
          },
        ],
        iconCss: "",
      },
    ],
    width: "100%",
    height: "100%",
    symbolHeight: 45,
    symbolWidth: 45,
    getSymbolInfo: function () {
      return { fit: true };
    },
    paletteExpanding: function (args) {
      args.cancel = true;
    },
  });
  palette.appendTo("#symbolPalette");

  const toggleSwitch = new Switch({
    checked: false,
    cssClass: "custom-switch",
    change: (args) => {
      applyModeState(args.checked);
      updateTooltipContent(args.checked);
    },
  });

  toggleSwitch.appendTo("#switchMode");
  const switchTooltip = new Tooltip({
    content: "Enable Editing",
    target: "#switch-container",
    position: "TopCenter",
    opensOn: "Hover",
  });
  switchTooltip.appendTo("#switch-container");

  function updateTooltipContent(isChecked: boolean) {
    switchTooltip.content = isChecked ? "Disable Editing" : "Enable Editing";
  }

  function applyModeState(isEditMode: boolean) {
    const buttonsToToggle = ["Select", "Delete", "Save"];

    if (toolbarObj) {
      toolbarObj.items.forEach((item) => {
        if (buttonsToToggle.indexOf(item.id) !== -1) {
          item.disabled = !isEditMode;
        }
      });

      const items = toolbarObj.items;
      const lastSepIndex = items.findIndex((item) => item.type === "Separator" && items.indexOf(item) > 7);
      if (lastSepIndex !== -1) {
        items[lastSepIndex].visible = isEditMode;
      }
    }

    const palette = document.getElementById("symbolPalette");
    if (palette) {
      palette.style.display = isEditMode ? "flex" : "none"
    }

    if (diagram) {
      diagram.tool = isEditMode ? DiagramTools.MultipleSelect : DiagramTools.ZoomPan;
    }
  }
  applyModeState(toggleSwitch.checked);
  updateTooltipContent(toggleSwitch.checked);

  const toolbarButton = document.querySelector(".e-toolbar-item button");
  if (toolbarButton) {
    const buttonStyle = getComputedStyle(toolbarButton);
    const buttonColor = buttonStyle.color;
    const editLabel = document.getElementById("editLabel") as HTMLElement;
    editLabel.style.color = buttonColor;
  }
};