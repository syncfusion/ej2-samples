import { loadCultureFiles } from '../common/culture-loader';
import {
  Diagram, Node, NodeModel, ConnectorModel, SnapConstraints, NodeConstraints,
  UserHandleEventsArgs, UserHandleModel, ConnectorConstraints,
  HtmlModel, ISelectionChangeEventArgs, randomId,
  SelectorConstraints,  DiagramTools,  DiagramConstraints
} from '@syncfusion/ej2-diagrams';
import { Dialog } from '@syncfusion/ej2-popups';
import { TextBox, TextArea, FormValidator } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
loadCultureFiles();

// Timeline Event Index Table
const indexTable: string[] = [];
// Timeline Events
const timelineEvents: TimelineEvent[] = [
  { year: '1969', title: 'ARPANET', description: 'ARPANET, the precursor to the Internet, is created by the U.S. Department of Defense\'s Advanced Research Projects Agency (ARPA).', icon: 'sf-icon-arpanet' },
  { year: '1983', title: 'Birth of the Internet', description: 'ARPANET switches to TCP/IP, marking the official birth of the Internet.', icon: 'sf-icon-birth-internet' },
  { year: '1991', title: 'Internet Goes Public', description: 'The World Wide Web is released to the public, making the Internet accessible to a broader audience.', icon: 'sf-icon-internet-public' },
  { year: '1993', title: 'First Web Browser', description: 'The first web browser, Mosaic, is released, making it easier for people to access the World Wide Web.', icon: 'sf-icon-first-web-browser' },
  { year: '1995', title: 'Commercialization of the Internet', description: 'The U.S. government lifts restrictions on commercial use of the Internet, leading to the rise of commercial websites and e-commerce.', icon: 'sf-icon-commercialization' },
  { year: '1998', title: 'Google Founded', description: 'Google is founded by Larry Page and Sergey Brin, revolutionizing how people search for information online.', icon: 'sf-icon-google-found' },
  { year: '2004', title: 'Social Media Boom', description: 'Facebook is launched, marking the beginning of the social media era.', icon: 'sf-icon-social-media' },
  { year: '2005', title: 'YouTube Launched', description: 'YouTube is launched, becoming a major platform for sharing and viewing video content.', icon: 'sf-icon-youtube' },
  { year: '2007', title: 'iPhone Released', description: 'Apple releases the first iPhone, transforming mobile internet usage and leading to the proliferation of mobile apps.', icon: 'sf-icon-i-phone' },
  { year: '2010', title: 'Cloud Computing', description: 'Cloud computing becomes mainstream, allowing for more flexible and scalable internet services.', icon: 'sf-icon-cloud-computing' },
  { year: '2014', title: 'Internet of Things (IoT)', description: 'The Internet of Things (IoT) gains significant traction, connecting everyday devices to the internet.', icon: 'sf-icon-internet-of-things' },
  { year: '2020', title: 'Remote Work', description: 'The COVID-19 pandemic accelerates the adoption of remote work, online education, and digital communication.', icon: 'sf-icon-remote-work' },
  { year: '2021', title: '5G Rollout', description: 'The global rollout of 5G networks begins, promising significantly faster internet speeds and lower latency.', icon: 'sf-icon-5g-network' },
  { year: '2022', title: 'Metaverse Development', description: 'Major technology companies begin to invest heavily in the development of the metaverse, virtual and augmented reality spaces.', icon: 'sf-icon-metaverse' },
  { year: '2023', title: 'Quantum Internet', description: 'Continued research and development in quantum computing and quantum internet technology aim to revolutionize data security and processing speeds.', icon: 'sf-icon-quantum-internet' },
  { year: '2025', title: 'IoT Pervasiveness', description: 'The Internet of Things becomes more pervasive, with smart devices deeply integrated into daily life and industry.', icon: 'sf-icon-iot-pervasiveness' },
  { year: '2030', title: 'Autonomous Vehicles', description: 'The widespread adoption of autonomous vehicles becomes more common, relying heavily on the internet for communication, navigation, and updates.', icon: 'sf-icon-autonomous-vehicle' },
  { year: '2035', title: 'Advanced AI Integration', description: 'Advanced AI systems are fully integrated into internet services, offering more personalized and efficient user experiences.', icon: 'sf-icon-advance-ai' },
];

// Components
let diagram: Diagram;
let dialog: Dialog;
let yearTextBox: TextBox;
let titleTextBox: TextBox;
let describeTextBox: TextArea;
let imageTextBox: TextBox;
let formValidator: FormValidator;

const nodes: NodeModel[] = [];
const connectors: ConnectorModel[] = [];
// Represent current selected event index in index table
let editTimeLineIndex: number;
let selectedNode: NodeModel;
let selectedUserHandle: string;
const eventColors: string[] = [
  '#FEC200', '#43C94C', '#3D95F6', '#FF3343', '#CDDE1F','#00897B',
  '#7F38CD', '#FF2667', '#00BCD7', '#F47B10', '#576ADE', '#91521B'
];

const startX: number = 100;
const startY: number = 100;
const nodeSpacing: number = 200;
const alternateOffset: number = 200;
const baseLine: number = 300;

function createTimelineNodes(): void {
  // Create main timeline line
  const timelineLine: NodeModel = {
    id: 'timeline_line',
    offsetX: (timelineEvents.length * nodeSpacing) / 2,
    offsetY: baseLine,
    width: (timelineEvents.length) * nodeSpacing,
    height: 10,
    constraints: NodeConstraints.None,
    shape: {
      type: 'HTML',
      content: `
  <div style="display: flex; width: 100%; height: 100%;">
    ${timelineEvents.map((_event, index) => {
        const colorIndex = index % eventColors.length;
        const nodeColor = eventColors[colorIndex];
        return `<div style="flex: 1; background-color: ${nodeColor}; height: 100%;"></div>`;
      }).join('')}
  </div>
`,
    },
  };
  nodes.push(timelineLine);

  timelineEvents.forEach((event, index) => {
    const colorIndex: number = index % eventColors.length;
    const nodeColor: string = eventColors[colorIndex];

    const isOdd: boolean = (index + 1) % 2 !== 0;
    const x: number = startX + (index * nodeSpacing);
    const y: number = isOdd ? startY : baseLine + alternateOffset;

    // Timeline Event Node
    const timelineNode: NodeModel = {
      id: `timeline_${index}`,
      offsetX: x,
      offsetY: y,
      width: 130,
      height: 100,
      constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) &~ NodeConstraints.Select,
      tooltip: {
        content: `${event.year}: ${event.description}`,
        position: isOdd ? 'TopCenter' : 'BottomCenter',
        relativeMode: 'Object',
        animation: { open: { delay: 1000 } }
      },
      style: { fill: 'none' },
      shape: {
        type: 'HTML',
        content: getEventNodeTemplate(nodeColor, event)
      }
    };

    //Timeline Year Marker Node
    const yearMarker: NodeModel = {
      id: `marker_${index}`,
      offsetX: x,
      offsetY: baseLine,
      width: 150,
      height: 50,
      constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~(NodeConstraints.Drag | NodeConstraints.Delete),
      addInfo: { eventIndex: index }, // Store the event index for reference
      shape: {
        type: 'HTML',
        content: getYearNodeTemplate(event.year)
      }
    };

    nodes.push(timelineNode, yearMarker);
    // Push node to index table to maintain event order
    indexTable.push(index.toString());
  });
}

function createTimelineConnectors(): void {
  timelineEvents.forEach((_event, index) => {
    const colorIndex: number = index % eventColors.length;
    const strokeColor: string = eventColors[colorIndex];
    const connector: ConnectorModel = {
      id: `connector_${index}`,
      sourceID: `timeline_${index}`,
      targetID: `marker_${index}`,
      constraints: ConnectorConstraints.None,
      style: {
        strokeColor: strokeColor,
        strokeWidth: 2
      },
      type: 'Straight',
      targetDecorator: {
        shape: 'None'
      },
      sourceDecorator: {
        shape: 'None'
      },
    };

    connectors.push(connector);
  });
}

// Function to Edit current selected event node
function editTimelineNode(editTimeLineIndex: number, timeLine: TimelineEvent): void {
  // Update the timeline node content
  const timelineNode: NodeModel = diagram.getObject(`timeline_${indexTable[editTimeLineIndex]}`) as NodeModel;
  if (timelineNode) {
    const colorIndex: number = editTimeLineIndex % eventColors.length;
    const nodeColor: string = eventColors[colorIndex];

    (timelineNode.shape as HtmlModel).content = getEventNodeTemplate(nodeColor, timeLine);

    // Update tooltip
    if (timelineNode.tooltip) {
      timelineNode.tooltip.content = `${timeLine.year}: ${timeLine.description}`;
    }
  }

  // Update the year marker content
  const markerNode: NodeModel = diagram.getObject(`marker_${indexTable[editTimeLineIndex]}`) as NodeModel;
  if (markerNode) {
    (markerNode.shape as HtmlModel).content = getYearNodeTemplate(timeLine.year);
  }
}

// Function to update node positions after inserting a new event
function updateNodePositions(fromIndex: number): void {
  // Update positions for all nodes from the insertion point onwards
  for (let i: number = fromIndex; i < indexTable.length; i++) {
    const isOdd: boolean = (i + 1) % 2 !== 0;
    const x: number = startX + (i * nodeSpacing);
    const y: number = isOdd ? startY : baseLine + alternateOffset;
    const colorIndex: number = i % eventColors.length;
    const nodeColor: string = eventColors[colorIndex];
    // Update timeline node position
    const timelineNode: NodeModel = diagram.getObject(`timeline_${indexTable[i]}`) as NodeModel;
    if (timelineNode) {
      timelineNode.offsetX = x;
      timelineNode.offsetY = y;
      // Updating time line node color to match time line event segment color
      (timelineNode.shape as HtmlModel).content = getEventNodeTemplate(nodeColor, timelineEvents[i]);
      timelineNode.tooltip!.position = isOdd ? 'TopCenter' : 'BottomCenter';
    }

    // Update marker node position
    const markerNode: NodeModel = diagram.getObject(`marker_${indexTable[i]}`) as NodeModel;
    if (markerNode) {
      markerNode.offsetX = x;
      (markerNode.addInfo as any).eventIndex = i;
    }

    // Update connector color
    const connector: ConnectorModel = diagram.getObject(`connector_${indexTable[i]}`) as ConnectorModel;
    if (connector) {
      connector.style!.strokeColor = nodeColor;
    }
  }

  // Update timeline line width
  const timelineLine: NodeModel = diagram.getObject('timeline_line') as NodeModel;
  if (timelineLine) {
    timelineLine.offsetX = (timelineEvents.length * nodeSpacing) / 2;
    timelineLine.width = (timelineEvents.length) * nodeSpacing;

    // Update timeline line content with new colors
    (timelineLine.shape as HtmlModel).content = `
  <div style="display: flex; width: 100%; height: 100%;">
    ${timelineEvents.map((_event, index) => {
      const colorIndex = index % eventColors.length;
      const nodeColor = eventColors[colorIndex];
      return `<div style="flex: 1; background-color: ${nodeColor}; height: 100%;"></div>`;
    }).join('')}
  </div>
`;
  }
}

// Function to add a new timeline event node
function addNewTimelineEvent(insertIndex: number, newEvent: TimelineEvent): void {
  const colorIndex: number = insertIndex % eventColors.length;
  const nodeColor: string = eventColors[colorIndex];
  const isOdd: boolean = (insertIndex + 1) % 2 !== 0;
  const x: number = startX + (insertIndex * nodeSpacing);
  const y: number = isOdd ? startY : baseLine + alternateOffset;
  const id: string = randomId();
  // Create new timeline node
  const timelineNode: NodeModel = {
    id: `timeline_${id}`,
    offsetX: x,
    offsetY: y,
    width: 130,
    height: 100,
    constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) &~ NodeConstraints.Select,
    style: { fill: 'none' },
    tooltip: {
      content: `${newEvent.year}: ${newEvent.description}`,
      position: isOdd ? 'TopCenter' : 'BottomCenter',
      relativeMode: 'Object',
      animation: { open: { delay: 1000 } }
    },
    shape: {
      type: 'HTML',
      content: getEventNodeTemplate(nodeColor, newEvent),
    }
  };

  // Create new year marker node
  const yearMarker: NodeModel = {
    id: `marker_${id}`,
    offsetX: x,
    offsetY: baseLine,
    width: 170,
    height: 50,
    constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~(NodeConstraints.Drag | NodeConstraints.Delete),
    addInfo: { eventIndex: insertIndex },
    shape: {
      type: 'HTML',
      content: getYearNodeTemplate(newEvent.year)
    }
  };

  // Create new connector
  const connector: ConnectorModel = {
    id: `connector_${id}`,
    sourceID: `timeline_${id}`,
    targetID: `marker_${id}`,
    constraints: ConnectorConstraints.None,
    style: {
      strokeColor: nodeColor,
      strokeWidth: 2
    },
    type: 'Straight',
    targetDecorator: { shape: 'None' },
    sourceDecorator: { shape: 'None' },
  };

  // Push node to index table to maintain event order
  indexTable.splice(insertIndex, 0, id);
  // Add new nodes and connector to diagram
  diagram.add(timelineNode);
  diagram.add(yearMarker);
  diagram.add(connector);
}
// functions to return HTML Templates
function getEventNodeTemplate(nodeColor: string, event: TimelineEvent) {
  if (event.imageUrl) {
    return `<div style="width: 100%; height: 100%; background-color: ${nodeColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 5px; padding: 5px; box-sizing: border-box;">
                <div style="margin-bottom: 4px;">
                    <img src="${event.imageUrl}" alt="Event Image" style="max-width: 100%; max-height: 60px; border-radius: 3px;" />
                </div>
                <div style="font-size: 12px; color: #333; text-align: center; line-height: 1.2;">
                    <strong>${event.title}</strong>
                </div>
            </div>`
  }
  else {
    return `<div style="width: 100%; height: 100%; background-color: ${nodeColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 5px; padding: 5px; box-sizing: border-box;">
                <div class="${event.icon}" style="margin-bottom: 4px;"></div>
                <div style="font-size: 12px; color: #333; text-align: center; line-height: 1.2;">
                    <strong>${event.title}</strong>
                </div>
            </div>`
  }
}
function getYearNodeTemplate(year: string) {
  return `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="width: 50px; height: 50px; background-color: #333333; color: white; border-radius: 50%; font-size: 12px; display: flex; align-items: center; justify-content: center;">
            ${year}
          </div>
        </div>`
}

function checkYearValidity(args: { [key: string]: string }): boolean {
  const previousYearIndex: number = selectedUserHandle === 'Edit Event' ? editTimeLineIndex - 1 : editTimeLineIndex;
  const currentYear: number = Number(args.value);

  // Validate the current year against the previous event's year, if applicable
  const hasPreviousEvent = previousYearIndex >= 0;
  if (hasPreviousEvent && Number(timelineEvents[previousYearIndex].year) >= currentYear) {
    return false;
  }

  // Validate the current year against the next event's year, if applicable
  const nextYearIndex = editTimeLineIndex + 1;
  const hasNextEvent = nextYearIndex < timelineEvents.length;
  if (hasNextEvent && Number(timelineEvents[nextYearIndex].year) <= currentYear) {
    return false;
  }

  return true;
}

// Check whether next year is immediate year
function checkImmediateEventYear(currentYear: number): boolean{
  // Ensure no Immediate next year event before adding new event
  const nextYearIndex = currentYear + 1;
  const hasNextEvent = nextYearIndex < timelineEvents.length;
  // Toggle off the new event handle for immediate next year event
  const isImmediateNext = hasNextEvent &&
          Number(timelineEvents[nextYearIndex].year) - Number(timelineEvents[editTimeLineIndex].year) === 1;
  return isImmediateNext;
}

// Dialog Submit Button Clicked
function handleDialogSubmit() {
  // Validate Dialog form
  if (!formValidator.validate()) {
    return;
  }
  const year: string = yearTextBox.value;
  const title: string = titleTextBox.value;
  const description: string = describeTextBox.value;
  const imageUrl: string = imageTextBox.value;
  const icon: string = 'sf-icon-internet-public';
  const timeLine: TimelineEvent = { year, title, description, icon: icon, imageUrl: imageUrl };

  if (selectedUserHandle === 'New Event') {
    // Insert new event after the selected node
    const insertIndex: number = editTimeLineIndex + 1;
    // Insert the new event in Event collection
    timelineEvents.splice(insertIndex, 0, timeLine);
    // Add the new event node after selected node
    addNewTimelineEvent(insertIndex, timeLine);
    // Update positions of all nodes after insertion point
    updateNodePositions(insertIndex + 1);
  }
  else if (selectedUserHandle === 'Edit Event') {
    timeLine.icon = timelineEvents[editTimeLineIndex].icon;
    // Update the timeline event data
    timelineEvents[editTimeLineIndex] = timeLine;
    // Edit the selected event node
    editTimelineNode(editTimeLineIndex, timeLine);
  }
  const isImmediateNext: boolean = checkImmediateEventYear(editTimeLineIndex);
  diagram.selectedItems.userHandles![0].visible = !isImmediateNext;
  // Refresh the diagram to show updated changes
  diagram.dataBind();
  dialog.hide();
}

// User handles to create/edit timeline node
const userHandles: UserHandleModel[] = [
  {
    name: 'New Event',
    pathData: 'M12.099998,0L19.799995,0 19.799995,12.1 32,12.1 32,19.799996 19.900002,19.799996 19.900002,31.999999 12.199997,31.999999 12.199997,19.900003 0,19.900003 0,12.199999 12.099998,12.199999z',
    offset: 0.5,
    side: 'Right',
    tooltip: { content: 'Add Event' },
  },
  {
    name: 'Edit Event',
    pathData: 'M20.638062,9.6380005L6.6380615,23.638 8.3620605,25.362 22.362061,11.362z M20.5,4.5L27.5,11.5 9,30 0,32 2,23z M27,0C29.760986,0 32,2.2389832 32,5 32,6.1259766 31.628052,7.1640015 31,8L29,10 22,3 24,1C24.83606,0.37197876,25.874023,0,27,0z',
    offset: 0.5,
    side: 'Bottom',
    tooltip: { content: 'Edit Event' },
  },
];

function initializeComponents(): void {
  let diagramCreated: boolean = false;
  // Initialize Diagram Component
  diagram = new Diagram({
    width: '100%',
    height: '600px',
    nodes: nodes,
    connectors: connectors,
    tool: DiagramTools.ZoomPan | DiagramTools.SingleSelect,
    constraints: DiagramConstraints.Default &~ DiagramConstraints.PanY,
    snapSettings: { constraints: SnapConstraints.None },
    selectedItems: {
      userHandles: userHandles,
      constraints: SelectorConstraints.None | SelectorConstraints.UserHandle | SelectorConstraints.ToolTip
    },
    selectionChange: (args: ISelectionChangeEventArgs): void => {
      if (args.state === 'Changed' && diagram.selectedItems.nodes!.length === 1) {
        selectedNode = diagram.selectedItems.nodes![0];
        // Fetch the eventIndex from node's info
        const nodeInfo = (selectedNode as any).addInfo;
        if (nodeInfo && nodeInfo.eventIndex !== undefined) {
          editTimeLineIndex = nodeInfo.eventIndex;
          const isImmediateNext: boolean = checkImmediateEventYear(editTimeLineIndex);
          diagram.selectedItems.userHandles![0].visible = !isImmediateNext;
          diagram.selectedItems.userHandles![1].visible = true;
        } else {
          editTimeLineIndex = -1;
          diagram.selectedItems.userHandles![0].visible = false;
          diagram.selectedItems.userHandles![1].visible = false;
        }
        diagram.dataBind();
      }
    },
    onUserHandleMouseDown: function (args: UserHandleEventsArgs) {
      formValidator.reset();
      if (args.element.name === 'New Event') {
        dialog.header = selectedUserHandle = 'New Event';
        yearTextBox.value = '';
        titleTextBox.value = '';
        describeTextBox.value = '';
        imageTextBox.value = '';
      } else if (args.element.name === 'Edit Event') {
        dialog.header = selectedUserHandle = 'Edit Event';
        const timeLine: TimelineEvent = timelineEvents[editTimeLineIndex];
        yearTextBox.value = timeLine.year;
        titleTextBox.value = timeLine.title;
        describeTextBox.value = timeLine.description;
        imageTextBox.value = timeLine.imageUrl ?  timeLine.imageUrl : '';
      }

      dialog.show();
    },
    commandManager: {
      commands: [
        {
          name: 'copy',
          canExecute: () => false
        },
        {
          name: 'paste',
          canExecute: () => false
        }
      ]
    },
    click: (args) => {
      if ((args.element instanceof Diagram) && diagram.selectedItems.nodes?.length > 0) {
        diagram.clearSelection();
      }
    },
    created: () => {
      diagramCreated = true;
      diagram.fitToPage({mode: 'Height'});
    },
    load: () => {
      if (diagramCreated) {
        diagram.fitToPage({mode: 'Height'});
      }
    }
  });
  diagram.appendTo('#timeline-diagram');

  // Initialize Dialog component
  dialog = new Dialog({
    visible: false,
    width: '300px',
    isModal: true,
    target: document.getElementById('timeline-container'),
    animationSettings: { effect: 'Zoom' },
    content: `<div style="padding: 0px 15px 15px 15px;">
  <form id="form-element" class="form-horizontal">
    <div class="form-group">
        <label for="yearInput">Year:</label>
        <input id="yearInput" />
    </div>
    <div class="form-group">
        <label for="titleInput">Title:</label>
        <input id="titleInput" />
    </div>
    <div class="form-group">
        <label for="descriptionInput">Description:</label>
        <textarea rows="2" id="descriptionInput"></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image Url:</label>
        <input id="imageUrl" />
    </div>
  </form>
</div>
`,
    buttons: [
      {
        buttonModel: { content: 'Submit', isPrimary: true },
        click: handleDialogSubmit
      },
      {
        buttonModel: { content: 'Cancel' },
        click: () => { dialog.hide(); }
      }
    ],
    overlayClick: () => { dialog.hide(); }
  });
  dialog.appendTo('#dialog');
  // Initialize Dialog Input Controls
  yearTextBox = new TextBox({ floatLabelType: 'Never', placeholder: "e.g., 2025", cssClass: 'e-outline' }, '#yearInput');
  titleTextBox = new TextBox({ floatLabelType: 'Never', placeholder: "Event Title", cssClass: 'e-outline' }, '#titleInput');
  describeTextBox = new TextArea({ floatLabelType: 'Never', cssClass: 'e-outline', placeholder: "Brief description of the event", resizeMode: 'Vertical' }, '#descriptionInput');
  imageTextBox = new TextBox({ floatLabelType: 'Never', placeholder: "https://example.com/image.jpg", cssClass: 'e-outline' }, '#imageUrl');
  formValidator = new FormValidator('#form-element', {
    rules: {
      yearInput: {
        required: true, digits: true, min: 0, maxLength: 4,
        custom: [checkYearValidity, 'Year must be within valid range compared to adjacent events']
      },
      titleInput: { required: true },
      descriptionInput: { required: true }
    }
  });
}

function renderTimeline() {
  createTimelineNodes();
  createTimelineConnectors();
}

renderTimeline();
initializeComponents();
};

// Timeline data type
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}