import { loadCultureFiles } from '../common/culture-loader';
 import {
    Diagram,
    Node,
    ConnectorEditing,
    NodeConstraints,
    ConnectorConstraints,
    SelectorConstraints,
    AnnotationConstraints,
    DiagramConstraints,
    DiagramContextMenu,
    UndoRedo,
    UserHandleModel,
    NodeModel,
    ConnectorModel,
    ISelectionChangeEventArgs,
    ToolBase,
  } from '@syncfusion/ej2-diagrams';
  import {
    CheckBox,
    ChangeEventArgs as CheckBoxChangeEventArgs,
  } from '@syncfusion/ej2-buttons';
  Diagram.Inject(DiagramContextMenu, ConnectorEditing, UndoRedo);

  let diagram: Diagram;
  let Zooming: CheckBox;
  let undoRedo: CheckBox;
  let Selectable: CheckBox;
  let Draggable: CheckBox;
  let contextMenu: CheckBox;
  let textedit: CheckBox;
  
  //Initializes the UserHandle for the diagram
  let handles: UserHandleModel[] = [
    {
      name: 'delete',
      pathData:
        'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76 96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04 91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z',
      visible: true,
      offset: 0.5,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    },
  ];
  //Initializes the nodes for the diagram
  let nodes: NodeModel[] = [
    {
      id: 'textNode1',
      // Position of the node
      offsetX: 340,
      offsetY: 50,
      // Size of the node
      width: 500,
      height: 50,
      //Sets type of the node
      shape: {
        type: 'Text',
        content:
          'Use Node Constraints to restrict end-users from performing certain operations on Node.',
      },
      //Customizes the appearances such as text, font, fill, and stroke.
      style: {
        strokeColor: 'none',
        fill: 'none',
        color: 'black',
        textAlign: 'Center',
      },
      constraints: NodeConstraints.None,
    },
    {
      id: 'rectangle',
      offsetX: 80,
      offsetY: 160,
      height: 65,
      shape: { type: 'Basic', shape: 'Rectangle' },
      annotations: [{ content: 'Selection = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Select,
    },
    {
      id: 'ellipse',
      offsetX: 190,
      offsetY: 160,
      height: 80,
      shape: { type: 'Basic', shape: 'Ellipse', cornerRadius: 10 },
      annotations: [{ content: 'Dragging = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Drag,
    },
    {
      id: 'heptagon',
      offsetX: 295,
      offsetY: 160,
      height: 80,
      shape: { type: 'Basic', shape: 'Heptagon' },
      annotations: [{ content: 'Delete = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Delete,
    },
    {
      id: 'directData',
      offsetX: 410,
      offsetY: 160,
      height: 80,
      rotateAngle: -45,
      shape: { type: 'Flow', shape: 'DirectData' },
      annotations: [{ content: 'Rotate = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Rotate,
    },
    {
      id: 'Plus',
      offsetX: 530,
      offsetY: 160,
      height: 80,
      shape: { type: 'Basic', shape: 'Plus' },
      annotations: [
        {
          content: 'TextEdit = False',
          constraints: AnnotationConstraints.ReadOnly,
        },
      ],
    },
    {
      id: 'decision',
      offsetX: 630,
      offsetY: 160,
      height: 80,
      shape: { type: 'Flow', shape: 'Decision' },
      annotations: [{ content: 'Resizing = False' }],
      constraints: NodeConstraints.Default & ~NodeConstraints.Resize,
    },
    {
      id: 'textNode2',
      // Position of the node
      offsetX: 350,
      offsetY: 280,
      // Size of the node
      width: 550,
      height: 50,
      //Sets type of the node
      shape: {
        type: 'Text',
        content:
          'Use Connector Constraints to restrict end-users from performing certain operations on Connector.',
      },
      //Customizes the appearances such as text, font, fill, and stroke.
      style: {
        strokeColor: 'none',
        fill: 'none',
        color: 'black',
        textAlign: 'Center',
      },
      constraints: NodeConstraints.None,
    },
  ];
  //Initialize Diagram connectors
  let connectors: ConnectorModel[] = [
    {
      id: 'select',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'Selection = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select,
      sourcePoint: {
        x: 40,
        y: 350,
      },
      targetPoint: {
        x: 120,
        y: 430,
      },
    },
    {
      id: 'connector2',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'Dragging = True',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        ConnectorConstraints.Default |
        ConnectorConstraints.DragSegmentThumb |
        ConnectorConstraints.Drag,
      sourcePoint: {
        x: 140,
        y: 350,
      },
      targetPoint: {
        x: 220,
        y: 430,
      },
    },
    {
      id: 'delete',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'Delete = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        (ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb) &
        ~(ConnectorConstraints.Delete | ConnectorConstraints.Drag),
      sourcePoint: {
        x: 250,
        y: 350,
      },
      targetPoint: {
        x: 320,
        y: 430,
      },
    },
    {
      id: 'endThumb',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'EndThumb = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        SelectorConstraints.All &
        ~(
          SelectorConstraints.ConnectorSourceThumb |
          SelectorConstraints.ConnectorTargetThumb
        ),
      sourcePoint: {
        x: 360,
        y: 350,
      },
      targetPoint: {
        x: 440,
        y: 430,
      },
    },
    {
      id: 'draggable',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'EndDraggable = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints:
        (ConnectorConstraints.Default | ConnectorConstraints.DragSegmentThumb) &
        ~(
          ConnectorConstraints.DragSourceEnd | ConnectorConstraints.DragTargetEnd
        ),
      sourcePoint: {
        x: 460,
        y: 350,
      },
      targetPoint: {
        x: 540,
        y: 430,
      },
    },
    {
      id: 'segmentThumb',
      type: 'Orthogonal',
      annotations: [
        {
          content: 'SegmentThumb = False',
          horizontalAlignment: 'Right',
          verticalAlignment: 'Bottom',
        },
      ],
      constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Drag,
      sourcePoint: {
        x: 580,
        y: 350,
      },
      targetPoint: {
        x: 660,
        y: 430,
      },
    },
  ];
  // Function to define default properties for nodes
  function nodeDefaults(nodes: NodeModel) {
    // Check if the node ID is not textNode1 or textNode2
      if(nodes.id !== "textNode1" && nodes.id !== "textNode2") {
      // Set default width and styling for nodes
      nodes.width = 80;
      nodes.style.fill = '#C7E6FF';
      nodes.style.strokeColor = '#1587FF';
      }
  }
  // Function to define default properties for connectors
  function connectorDefaults(connectors: ConnectorModel) {
    // Set default styling for connectors
    connectors.style.strokeColor = '#6BA5D7';
    connectors.style.fill = '#6BA5D7';
    connectors.style.strokeWidth = 2;
    // Set default styling for target decorator of connectors
    connectors.targetDecorator.style.fill = '#6BA5D7';
    connectors.targetDecorator.style.strokeColor = '#6BA5D7';
  }
  // Selection change method for handling diagram item selection events
  function selectionChange(args: ISelectionChangeEventArgs) {
    {
      // Handle selection change during the 'Changing' state
      if (args.state === 'Changing') {
        // Check if items are being added to selection
        if (args.type === 'Addition') {
          // Check if the newly selected item is 'endThumb'
          if (args.newValue.length > 0 && args.newValue[0].id === 'endThumb') {
            // Restrict selector constraints for 'endThumb' connector
            diagram.selectedItems.constraints =
              SelectorConstraints.All &
              ~(
                SelectorConstraints.ConnectorSourceThumb |
                SelectorConstraints.ConnectorTargetThumb
              );
          } else {
            // Set selector constraints for all other additions
            diagram.selectedItems.constraints = SelectorConstraints.All;
          }
        } else {
          // Set selector constraints for all other changes during 'Changing' state
          diagram.selectedItems.constraints = SelectorConstraints.All;
        }
      }
      // Handle selection change during the 'Changed' state
      if (args.state === 'Changed') {
        // Check if there are newly selected items and if the first item is a Node instance
        if (args.newValue.length > 0 && args.newValue[0] instanceof Node) {
          // Set selector constraints with user handles for nodes
          diagram.selectedItems = {
            constraints: SelectorConstraints.All | SelectorConstraints.UserHandle,
            userHandles: handles,
          };
        } else {
          // Check if there are newly selected items and if the first item is not 'endThumb'
          if (args.newValue.length > 0 && args.newValue[0].id !== 'endThumb') {
            // Set selector constraints for all other selected items
            diagram.selectedItems = {
              constraints:
                SelectorConstraints.All & ~SelectorConstraints.UserHandle,
            };
          } else {
            // Set selector constraints for all other selected items, excluding specific thumbs
            diagram.selectedItems = {
              constraints:
                SelectorConstraints.All &
                ~(
                  SelectorConstraints.UserHandle |
                  SelectorConstraints.ConnectorSourceThumb |
                  SelectorConstraints.ConnectorTargetThumb
                ),
            };
          }
        }
      }
    }
  }
  //used to delete object using user handle
  function getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (action === 'delete') {
      diagram.remove();
    }
    return tool;
  }
  
  // tslint:disable-next-line:max-func-body-length
  (window as any).default = (): void => {
    loadCultureFiles();
  //Initializes the diagram
  diagram= new Diagram({
    width: '100%',
    height: '550px',
    nodes: nodes,
    connectors: connectors,
    contextMenuSettings: {
    show: true,
  },
  // Function called after the diagram is created to set default values
  created: function () {
    // Loop through connectors to apply specific constraints
    for (let i = 0; i < diagram.connectors.length; i++) {
      // Check if the connector ID matches 'endThumb'
      if (diagram.connectors[i].id === 'endThumb') {
        // Adjust connector constraints to allow dragging segment thumb but not dragging
        diagram.connectors[i].constraints =
          (ConnectorConstraints.Default |
            ConnectorConstraints.DragSegmentThumb) &
          ~ConnectorConstraints.Drag;
      }
    }
  },
  // Settings to display rulers in the diagram
  rulerSettings: { showRulers: true },
  // Function to handle selection change events in the diagram
  selectionChange: selectionChange,
  // Function to provide custom tools for the diagram
  getCustomTool: getTool,
  // Initial selected items configuration with user handles
  selectedItems: {
    constraints: SelectorConstraints.UserHandle,
    userHandles: handles,
  },
   //Defines the default node and connector properties
   getNodeDefaults: nodeDefaults,
   getConnectorDefaults: connectorDefaults,
  });
  diagram.appendTo('#diagram');
    
//Enable or disable the AspectRatio for Node.
Zooming = new CheckBox({
    checked: true,
    label: 'Zooming',
    change: function () {
      diagram.constraints = diagram.constraints ^ DiagramConstraints.Zoom;
    },
  });
  Zooming.appendTo('#zooming');
  
   //CheckBox used to enable undo redo in diagram
  undoRedo = new CheckBox({
    label: 'Undo/Redo',
    checked: true,
    change: function () {
      diagram.constraints = diagram.constraints ^ DiagramConstraints.UndoRedo;
      diagram.dataBind();
    },
  });
  undoRedo.appendTo('#undoRedo');

  // CheckBox used to enable text editing in the diagram
  textedit = new CheckBox({
    label: 'Text Edit',
    checked: true,
    // Change event handler for checkbox state changes
    change: function (args:any) {
      // Loop through nodes in the diagram
      for (let i: number = 0; i < diagram.nodes.length; i++) {
        // Check if the node has annotations and content
        var node = diagram.nodes[i];
          if (node.annotations.length > 0 && node.annotations[0].content) {
            // Enable or disable text editing based on checkbox state
            if (args.checked) {
              // Allow editing if checkbox is checked, except for node with ID 'Plus'
              if (node.id !== 'Plus') {
                node.annotations[0].constraints =
                  node.annotations[0].constraints ^
                  AnnotationConstraints.ReadOnly;
              }
            } else {
              // Set read-only if checkbox is unchecked
              node.annotations[0].constraints =
                node.annotations[0].constraints | AnnotationConstraints.ReadOnly;
            }
          }
      }
      // Loop through connectors in the diagram
      for (let x: number = 0; x < diagram.connectors.length; x++) {
        var connector = diagram.connectors[x];
        // Check if the connector has annotations and content
          if (connector.annotations.length > 0 && connector.annotations[0].content) {
            // Enable or disable text editing based on checkbox state
            if (args.checked) {
              // Allow editing if checkbox is checked, handle special case for connector with ID 'select'
              if (connector.id === 'select') {
                connector.constraints =
                  connector.constraints & ~(ConnectorConstraints.Select);
              } else {
                connector.annotations[0].constraints =
                  connector.annotations[0].constraints ^
                  AnnotationConstraints.ReadOnly;
              }
            } else {
              // Set read-only if checkbox is unchecked
              connector.annotations[0].constraints =
                connector.annotations[0].constraints ^
                AnnotationConstraints.ReadOnly;
            }
        }
      }
      diagram.dataBind(); // Apply changes to the diagram
    },
  });
  textedit.appendTo('#textedit');
  
  // CheckBox used to enable selection in diagram
  Selectable = new CheckBox({
    label: 'Selectable',
    checked: true,
    // Change event handler for checkbox state changes
    change: function (args:any) {
      // Loop through nodes in the diagram
      for (let i: number = 0; i < diagram.nodes.length; i++) {
        let node = diagram.nodes[i];
        // Exclude node with ID 'rectangle' from selection toggle
        if (node.id != 'rectangle') {
          // Enable or disable node selection based on checkbox state
          if (args.checked) {
            node.constraints = node.constraints | NodeConstraints.Select;
          } else {
            node.constraints = node.constraints & ~NodeConstraints.Select;
          }
        }
        diagram.dataBind(); // Apply changes to the diagram
      }
       // Loop through connectors in the diagram
      for (let j: number = 0; j < diagram.connectors.length; j++) {
        let connector = diagram.connectors[j];
        // Exclude connector with ID 'select' from selection toggle
        if (connector.id != 'select') {
          // Enable or disable connector selection based on checkbox state
          if (args.checked) {
            connector.constraints =
              connector.constraints | ConnectorConstraints.Select;
          } else {
            connector.constraints =
              connector.constraints & ~ConnectorConstraints.Select;
          }
        }
        diagram.dataBind(); // Apply changes to the diagram
      }
    },
  });
  // Append checkbox to HTML element with id 'selectable'
  Selectable.appendTo('#selectable');
  
  // CheckBox used to enable dragging interactions in diagram
  Draggable = new CheckBox({
    label: 'Draggable',
    checked: true,
    change: function (args:any) { // Change event handler for checkbox state changes
      // Loop through nodes in the diagram  
      for (let i: number = 0; i < diagram.nodes.length; i++) {
        let nodes: any = diagram.nodes[i];
        // Enable or disable node dragging based on checkbox state
        if (args.checked) {
        // Toggle drag constraint for node with ID 'ellipse'
          if (nodes.id === 'ellipse') {
            nodes.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
          } else {
            nodes.constraints = nodes.constraints | NodeConstraints.Drag;
          }
        } else {
          nodes.constraints = nodes.constraints & ~NodeConstraints.Drag;
        }
        diagram.dataBind(); //Apply changes to the diagram 
      }
       // Loop through connectors in the diagram
      for (let j: number = 0; j < diagram.connectors.length; j++) {
        let connectors: any = diagram.connectors[j];
        // Enable or disable connector dragging based on checkbox state
        if (args.checked) {
          connectors.constraints =
            connectors.constraints | ConnectorConstraints.Drag;
        } else {
          connectors.constraints =
            connectors.constraints & ~ConnectorConstraints.Drag;
        }
        diagram.dataBind(); // Apply changes to the diagram
      }
    },
  });
  // Append checkbox to HTML element with id 'draggablee'
  Draggable.appendTo('#draggablee');
  
  // CheckBox used to enable context menu on right click
  contextMenu = new CheckBox({
    label: 'Context Menu',
    checked: true,
    // Change event handler for checkbox state changes
    change: function (args) {
      if (args.checked) {
        // If checkbox is checked
        diagram.contextMenuSettings.show = true;
        diagram.refresh(); // Refresh the diagram to apply changes
      } else {
        diagram.contextMenuSettings.show = false;
      }
      diagram.dataBind(); // Apply changes to the diagram UI
    },
  });
  // Append checkbox to HTML element with id 'contextMenu'
  contextMenu.appendTo('#contextMenu');
};
  
 