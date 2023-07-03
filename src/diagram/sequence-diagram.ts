import { loadCultureFiles } from '../common/culture-loader';
 import {
    Diagram,
  ConnectorModel,
  UndoRedo,
  DiagramTools,
  NodeModel,
  PortVisibility,
  } from '@syncfusion/ej2-diagrams';

  Diagram.Inject(UndoRedo);


//Initializes the nodes for the diagram
let nodes: NodeModel[] = [
    {
      id: 'employee',
      width: 100,
      height: 60,
      offsetX: 100,
      offsetY: 100,
      shape: { type: 'Text', content: 'Employee' },
      style: { fill: 'transparent', bold: true },
    },
    {
      id: 'teamLead',
      width: 100,
      height: 60,
      offsetX: 350,
      offsetY: 100,
      shape: { type: 'Text', content: 'Team Lead' },
      style: { fill: 'transparent', bold: true },
    },
    {
      id: 'dashboard',
      width: 100,
      height: 60,
      offsetX: 600,
      offsetY: 100,
      shape: { type: 'Text', content: 'Dashboard' },
      style: { fill: 'transparent', bold: true },
    },
    {
      id: 'manager',
      width: 100,
      height: 60,
      offsetX: 850,
      offsetY: 100,
      shape: { type: 'Text', content: 'Manager' },
      style: { fill: 'transparent', bold: true },
    },
    {
      id: 'leaveRequest',
      width: 100,
      height: 60,
      offsetX: 225,
      offsetY: 250,
      shape: { type: 'Text', content: 'Leave Request' },
      style: { fill: 'transparent' },
    },
    {
      id: 'leaveApproval',
      width: 100,
      height: 60,
      offsetX: 225,
      offsetY: 484,
      shape: { type: 'Text', content: 'Leave Approval' },
      style: { fill: 'transparent' },
    },
    {
      id: 'checkEmplyeeAvail',
      shape: {
        type: 'Text',
        content: 'Check Employee availability and task status',
      },
      height: 30,
      width: 175,
      offsetX: 470,
      offsetY: 345,
      style: { fill: 'transparent' },
    },
    {
      id: 'forwardLeaveMssg',
      shape: { type: 'Text', content: 'Forward Leave Request' },
      height: 30,
      width: 150,
      offsetX: 600,
      offsetY: 420,
      style: { fill: 'transparent' },
    },
    {
      id: 'noObjection',
      shape: { type: 'Text', content: 'No Objection' },
      height: 30,
      width: 150,
      offsetX: 600,
      offsetY: 460,
      style: { fill: 'transparent' },
    },
    // Normal nodes
    {
      id: 'employeeNode',
      shape: { type: 'Basic', shape: 'Rectangle' },
      width: 10,
      height: 250,
      offsetX: 100,
      offsetY: 350,
      style: { fill: 'orange', strokeColor: 'orange' },
      ports: [
        {
          id: 'p1',
          offset: { x: 1, y: 0.05 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: 'p2',
          offset: { x: 1, y: 0.97 },
          visibility: PortVisibility.Hidden,
        },
      ],
    },
    {
      id: 'teamLeadNode',
      shape: { type: 'Basic', shape: 'Rectangle' },
      width: 10,
      height: 190,
      offsetX: 350,
      offsetY: 320,
      style: { fill: 'orange', strokeColor: 'orange' },
      ports: [
        {
          id: 'p1',
          offset: { x: 0, y: 0.07 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: 'p2',
          offset: { x: 1, y: 0.92 },
          visibility: PortVisibility.Hidden,
        },
        { id: 'p3', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
      ],
    },
    {
      id: 'dashboardNode',
      shape: { type: 'Basic', shape: 'Rectangle' },
      width: 10,
      height: 25,
      offsetX: 600,
      offsetY: 320,
      style: { fill: 'orange', strokeColor: 'orange' },
      ports: [
        { id: 'p1', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
      ],
    },
    {
      id: 'managerNode',
      shape: { type: 'Basic', shape: 'Rectangle' },
      width: 10,
      height: 50,
      offsetX: 850,
      offsetY: 420,
      style: { fill: 'orange', strokeColor: 'orange' },
      ports: [
        { id: 'p1', offset: { x: 0, y: 0.1 }, visibility: PortVisibility.Hidden },
        { id: 'p2', offset: { x: 0, y: 0.9 }, visibility: PortVisibility.Hidden },
      ],
    },
  ];
  //Initializes the Connectors for the diagram
  let connectors: ConnectorModel[] = [
    {
      id: 'employeeCon1',
      type: 'Straight',
      sourcePoint: { x: 100, y: 120 },
      targetPoint: { x: 100, y: 225 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'employeeCon2',
      type: 'Straight',
      sourcePoint: { x: 100, y: 475 },
      targetPoint: { x: 100, y: 600 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'teamLeanCon1',
      type: 'Straight',
      sourcePoint: { x: 350, y: 120 },
      targetPoint: { x: 350, y: 225 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'teamLeanCon2',
      type: 'Straight',
      sourcePoint: { x: 350, y: 415 },
      targetPoint: { x: 350, y: 600 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'dashboardCon1',
      type: 'Straight',
      sourcePoint: { x: 600, y: 120 },
      targetPoint: { x: 600, y: 307 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'dashboardCon2',
      type: 'Straight',
      sourcePoint: { x: 600, y: 333 },
      targetPoint: { x: 600, y: 600 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'managerCon1',
      type: 'Straight',
      sourcePoint: { x: 850, y: 120 },
      targetPoint: { x: 850, y: 395 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
    {
      id: 'managerCon2',
      type: 'Straight',
      sourcePoint: { x: 850, y: 445 },
      targetPoint: { x: 850, y: 600 },
      targetDecorator: { shape: 'None' },
      style: { strokeColor: '#A5A6A7' },
    },
  
    // arrow connectors
    {
      id: 'empToTeamLead',
      type: 'Straight',
      sourceID: 'employeeNode',
      sourcePortID: 'p1',
      targetID: 'teamLeadNode',
      targetPortID: 'p1',
    },
    {
      id: 'teamLeadToEmp',
      type: 'Straight',
      sourcePoint: { x: 350, y: 465 },
      style: { strokeDashArray: '4 4' },
      targetID: 'employeeNode',
      targetPortID: 'p2',
    },
    {
      id: 'teamLeadToDash',
      type: 'Straight',
      sourceID: 'teamLeadNode',
      sourcePortID: 'p3',
      targetID: 'dashboardNode',
      targetPortID: 'p1',
    },
    {
      id: 'teamLeadToManager',
      type: 'Straight',
      sourceID: 'teamLeadNode',
      sourcePortID: 'p2',
      targetID: 'managerNode',
      targetPortID: 'p1',
    },
    {
      id: 'managerToTeamLead',
      type: 'Straight',
      sourceID: 'managerNode',
      sourcePortID: 'p2',
      targetPoint: { x: 350, y: 440 },
      style: { strokeDashArray: '4 4' },
    },
  ];
  
  function getConnectorDefaults(obj: ConnectorModel): any {
    obj.targetDecorator.style = { fill: '#489ECC', strokeColor: '#489ECC' };
    if (obj.targetDecorator.shape === 'Arrow') {
      obj.style = { strokeColor: '#489ECC', strokeWidth: 2 };
    }
  }

  // tslint:disable-next-line:max-func-body-length
  (window as any).default = (): void => {
    loadCultureFiles();
  //Initializes the nodes for the diagram
  let diagram: Diagram= new Diagram({
    width: '100%',
    height: '700px',
    nodes: nodes,
    tool: DiagramTools.ZoomPan,
    connectors: connectors,
    snapSettings: { constraints: 0 },
    getConnectorDefaults: getConnectorDefaults,
  });
  diagram.appendTo('#diagram');
  diagram.fitToPage();
};
  
 