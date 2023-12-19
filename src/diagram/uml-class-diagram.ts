/**
 * class-diagram -  Annotation
 */

import {
    Diagram, NodeModel, ConnectorModel, UmlClassifierShapeModel,IDragEnterEventArgs
} from '@syncfusion/ej2-diagrams';
import { Connector, PaletteModel, SymbolInfo, SymbolPalette } from '@syncfusion/ej2/diagrams';
import { addEvents } from './script/diagram-common';

let diagram: Diagram;

//Set the default values of nodes.
function getNodeDefaults(obj: NodeModel): NodeModel {
    obj.style = { fill: '#26A0DA', strokeColor: 'white' };
    return obj;
}

//Set the default values of connectors.
function getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    return connector;
}

//Set an annoation style at runtime.
function setNodeTemplate(node: NodeModel): void {
    if (node.annotations.length > 0) {
        for (let i: number = 0; i < node.annotations.length; i++) {
            node.annotations[i].style.color = 'white';
        }
    }
}

//Create a connector.
function createConnector(id: string, sourceID: string, targetID: string): ConnectorModel {
    let connector: ConnectorModel = {};
    connector.id = id;
    connector.sourceID = sourceID;
    connector.targetID = targetID;
    return connector;
}

//Create class Diagram shapes.
function createNode(id: string, offsetX: number, offsetY: number, className: string): NodeModel {
    let node: NodeModel = {};
    node.id = id;
    node.offsetX = offsetX;
    node.offsetY = offsetY;
    node.shape = {
        type: 'UmlClassifier',
        classShape: {
            name: className,
        },
        classifier: 'Class'
    } as UmlClassifierShapeModel;
    return node;
}

//create class Property
function createProperty(name: string, type: string): object {
    return { name: name, type: type };
}

//create class Methods
function createMethods(name: string, type: string): object {
    return { name: name, type: type };
}


// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    let nodes: NodeModel[] = [
        {
            id: 'Patient',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    name: 'Patient',
                    attributes: [
                        createProperty('accepted', 'Date'),
                        createProperty('sickness', 'History'),
                        createProperty('prescription', 'String[*]'),
                        createProperty('allergies', 'String[*]'),
                    ],
                    methods: [
                        createMethods('getHistory', 'History')
                    ]
                },
                classifier: 'Class'
            } as UmlClassifierShapeModel,
            offsetX: 200,
            offsetY: 250
        },
        {
            id: 'Doctor',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    name: 'Doctor',
                    attributes: [
                        createProperty('specialist', 'String[*]'),
                        createProperty('locations', 'String[*]'),
                    ]
                },
                classifier: 'Class'
            } as UmlClassifierShapeModel,
            offsetX: 240,
            offsetY: 545,
        },
        {
            id: 'Person',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    name: 'Person',
                    attributes: [
                        createProperty('name', 'Name'),
                        createProperty('title', 'String[*]'),
                        createProperty('gender', 'Gender')
                    ]
                },
                classifier: 'Class'
            } as UmlClassifierShapeModel,
            offsetX: 405,
            offsetY: 105,
        },
        {
            id: 'Hospital',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    name: 'Hospital',
                    attributes: [
                        createProperty('name', 'Name'),
                        createProperty('address', 'Address'),
                        createProperty('phone', 'Phone'),
                    ],
                    methods: [
                        createMethods('getDepartment', 'String'),
                    ]
                },
                classifier: 'Class'
            } as UmlClassifierShapeModel,
            offsetX: 638,
            offsetY: 100,
        },
        {
            id: 'Department',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    name: 'Department',
                    methods: [
                        createMethods('getStaffCount', 'Int'),
                    ]
                },
                classifier: 'Class'
            } as UmlClassifierShapeModel,
            offsetX: 638,
            offsetY: 280,
        },
        {
            id: 'Staff',
            shape: {
                type: 'UmlClassifier',
                classShape: {
                    name: 'Staff',
                    attributes: [
                        createProperty('joined', 'Date'),
                        createProperty('education', 'string[*]'),
                        createProperty('certification', 'string[*]'),
                        createProperty('languages', 'string[*]'),
                    ],
                    methods: [
                        createMethods('isDoctor', 'bool'),
                        createMethods('getHistory', 'bool')
                    ]
                },
                classifier: 'Class'
            } as UmlClassifierShapeModel,
            offsetX: 635,
            offsetY: 455,
        },
        createNode('OperationStaff', 410, 455, 'OperationStaff'),
        createNode('Nurse', 410, 545, 'Nurse'),
        createNode('Surgeon', 240, 665, 'Surgeon'),
        createNode('AdministrativeStaff', 632, 605, 'AdministrativeStaff'),
        createNode('FrontDeskStaff', 630, 695, 'FrontDeskStaff'),
        createNode('TechnicalStaff', 928, 445, 'TechnicalStaff'),
        createNode('Technician', 815, 535, 'Technician'),
        createNode('Technologist', 1015, 535, 'Technologist'),
        createNode('SurgicalTechnologist', 1015, 630, 'SurgicalTechnologist')
    ];

    let connectors: ConnectorModel[] = [
        createConnector('connect1', 'Patient', 'Person'),
        createConnector('connect2', 'Person', 'Hospital'),
        createConnector('connect3', 'Department', 'Hospital'),
        createConnector('connect4', 'OperationStaff', 'Patient'),
        createConnector('connect5', 'Doctor', 'OperationStaff'),
        createConnector('connect6', 'Nurse', 'OperationStaff'),
        createConnector('connect7', 'Surgeon', 'Doctor'),
        createConnector('connect8', 'FrontDeskStaff', 'AdministrativeStaff'),
        createConnector('connect9', 'Technician', 'TechnicalStaff'),
        createConnector('connect10', 'Technologist', 'TechnicalStaff'),
        createConnector('connect11', 'SurgicalTechnologist', 'Technologist'),
        createConnector('connect12', 'Staff', 'Department'),
        createConnector('connect13', 'Staff', 'Person'),
        createConnector('connect14', 'OperationStaff', 'Staff'),
        createConnector('connect15', 'AdministrativeStaff', 'Staff'),
        createConnector('connect16', 'TechnicalStaff', 'Staff')
    ];


    diagram = new Diagram({
        width: '100%',
      height: '100%',
        nodes: nodes,
        connectors: connectors,
        //Sets the default values of nodes
        getNodeDefaults: getNodeDefaults,
        //Sets the default values of connectors
        getConnectorDefaults: getConnectorDefaults,
        //Customize the content of the node
        setNodeTemplate: setNodeTemplate,
        dragEnter:function(args: IDragEnterEventArgs): void{
            if(args.element instanceof Connector){
              args.element.targetPoint.x += 100;
              args.element.targetPoint.y += 20
            }
        },
    });
    diagram.appendTo('#diagram');
    diagram.fitToPage();

      // Initializes the palettes to be displayed in the symbol palette.
    let palettes: PaletteModel[] = [
        {
            id: 'UmlActivity', expanded: true, title: 'UML Classifier Nodes', symbols: [
            {
                id: 'class',
                style: {
                    fill: '#26A0DA',
                },
                borderColor: 'white',
                shape: {
                    type: 'UmlClassifier',
                    classShape: {
                        attributes: [
                            { name: 'accepted', type: 'Date', style: { color: "red", fontFamily: "Arial", textDecoration: 'Underline',  italic: true },isSeparator: true },
                            { name: 'sickness', type: 'History' },
                            { name: 'prescription', type: 'String[*]' },
                            { name: 'allergies', type: 'String[*]' }
                        ],
                        methods: [{ name: 'getHistory', style: {}, parameters: [{ name: 'Date', style: {} }], type: 'History' }],
                        name: 'Patient'
                    },
                    classifier: 'Class'
                },
            },
            {
                id: 'Interface',
                style: {
                    fill: '#26A0DA',
                }, borderColor: 'white',
                shape: {
                    type: 'UmlClassifier',
                    interfaceShape: {
                        name: "Bank Account",
                        attributes: [{
                                name: "owner",
                                type: "String[*]", style: {}
                            },
                            {
                                name: "balance",
                                type: "Dollars"
                            }],
                        methods: [{
                                name: "deposit", style: {},
                                parameters: [{
                                        name: "amount",
                                        type: "Dollars",
                                        style: {}
                                    }],
                            }]
                    },
                    classifier: 'Interface'
                },
            },
            {
                id: 'Enumeration',
                style: {
                    fill: '#26A0DA',
                }, borderColor: 'white',
                shape: {
                    type: 'UmlClassifier',
                    enumerationShape: {
                        name: 'AccountType',
                        members: [
                            {
                                name: 'Checking Account', style: {}
                            },
                            {
                                name: 'Savings Account'
                            },
                            {
                                name: 'Credit Account'
                            }
                        ]
                    },
                    classifier: 'Enumeration'
                },
            },
            ]
        },
        {
          id: 'umlConnectorrs', expanded: true, title: 'UML Classifier Connectors', symbols: [
            {
              id: 'Composition',
              sourcePoint: { x: 100, y: 200 },
              targetPoint: { x: 200, y: 300 },
              type: 'Straight',
              shape: { type: 'UmlClassifier', relationship: 'Composition' }
          },
          {
              id: 'BiDirectional',
              type: 'Straight',
              sourcePoint: { x: 300, y: 200 },
              targetPoint: { x: 400, y: 300 },
              shape: { type: 'UmlClassifier', relationship: 'Aggregation', associationType: 'BiDirectional' }
          },
          {
              id: 'Directional',
              type: 'Straight',
              sourcePoint: { x: 500, y: 200 },
              targetPoint: { x: 600, y: 300 },
              shape: { type: 'UmlClassifier', relationship: 'Association', associationType: 'Directional' }
          },
          {
              id: 'Association',
              type: 'Straight',
              sourcePoint: { x: 700, y: 200 },
              targetPoint: { x: 800, y: 300 },
              shape: { type: 'UmlClassifier', relationship: 'Association' }
          },
          {
              id: 'Inheritance',
              type: 'Straight',
              sourcePoint: { x: 900, y: 200 },
              targetPoint: { x: 1000, y: 300 },
              shape: { type: 'UmlClassifier', relationship: 'Inheritance' }
          },
          {
              id: 'Interfaces',
              type: 'Straight',
              sourcePoint: { x: 100, y: 400 },
              targetPoint: { x: 200, y: 500 },
              shape: { type: 'UmlClassifier', relationship: 'Interface' }
          },
          {
              id: 'Dependency',
              type: 'Straight',
              sourcePoint: { x: 300, y: 400 },
              targetPoint: { x: 400, y: 500 },
              shape: { type: 'UmlClassifier', relationship: 'Dependency' }
          },
          {
              id: 'Realization',
              type: 'Straight',
              sourcePoint: { x: 500, y: 400 },
              targetPoint: { x: 600, y: 500 },
              shape: { type: 'UmlClassifier', relationship: 'Realization' }
          },
          {
              id: "OneToMany",
              type: 'Straight',
              sourcePoint: {
                  x: 700,
                  y: 400
              },
              targetPoint: {
                  x: 800,
                  y: 500
              },
              annotations: [{
                      margin: {
                          top: 10,
                          left: 10,
                          right: 10,
                          bottom: 20
                      }
                  }
              ],
              shape: {
                  type: "UmlClassifier",
                  relationship: 'Dependency',
                  multiplicity: {
                      type: 'OneToMany',
                      source: {
                          optional: true,
                          lowerBounds: '89',
                          upperBounds: '67'
                      },
                      target: { optional: true, lowerBounds: '78', upperBounds: '90' }
                  }
              }
          },
          {
              id: "ManyToMany",
              sourcePoint: {
                  x: 900,
                  y: 400
              },
              targetPoint: {
                  x: 1000,
                  y: 500
              },
              annotations: [{
                      margin: {
                          top: 10,
                          left: 10,
                          right: 10,
                          bottom: 20
                      }
                  }
              ],
              shape: {
                  type: "UmlClassifier",
                  relationship: 'Dependency',
                  multiplicity: {
                      type: 'ManyToMany',
                      source: {
                          optional: true,
                          lowerBounds: '89',
                          upperBounds: '67'
                      },
                      target: { optional: true, lowerBounds: '78', upperBounds: '90' }
                  }
              }
          },
          {
              id: "OneToOne",
              sourcePoint: { x: 100, y: 600 },
              targetPoint: { x: 200, y: 700 },
              annotations: [{
                      margin: {
                          top: 10,
                          left: 10,
                          right: 10,
                          bottom: 20
                      }
                  }
              ],
              shape: {
                  type: "UmlClassifier",
                  relationship: 'Dependency',
                  multiplicity: {
                      type: 'OneToOne',
                      source: {
                          optional: true,
                          lowerBounds: '89',
                          upperBounds: '67'
                      },
                      target: { optional: true, lowerBounds: '78', upperBounds: '90' }
                  }
              }
          },
          {
              id: "ManyToOne",
              sourcePoint: { x: 300, y: 600 },
              targetPoint: { x: 400, y: 700 },
              annotations: [{
                      margin: {
                          top: 10,
                          left: 10,
                          right: 10,
                          bottom: 20
                      }
                  }
              ],
              shape: {
                  type: "UmlClassifier",
                  relationship: 'Dependency',
                  multiplicity: {
                      type: 'ManyToOne',
                      source: {
                          optional: true,
                          lowerBounds: '89',
                          upperBounds: '67'
                      },
                      target: { optional: true, lowerBounds: '78', upperBounds: '90' }
                  }
              }
          },
          {
              id: "OneToMany",
              sourcePoint: { x: 500, y: 600 },
              targetPoint: { x: 600, y: 700 },
              annotations: [{
                      margin: {
                          top: 10,
                          left: 10,
                          right: 10,
                          bottom: 20
                      }
                  }
              ],
              shape: {
                  type: "UmlClassifier",
                  relationship: 'Dependency',
                  multiplicity: {
                      type: 'OneToMany',
                  }
              }
          }
          ]
        }
    ];
    function setPaletteNodeDefaults(node:any) {
        node.width = 100;
        node.height = 100;
    }
    // Initializes symbol palette.
    let palette: SymbolPalette = new SymbolPalette({
        // sets the expandable mode of the symbol palette.
        expandMode: 'Multiple',
        // sets the palettes to be displayed in the symbol palette.
        palettes: palettes,
        getNodeDefaults: setPaletteNodeDefaults, 
        // sets the width and height of the palette.
        width: '100%', height: '100%',
        symbolMargin: { left: 12, right: 12, top: 12, bottom: 12 },
        symbolHeight: 90, symbolWidth: 90,
        getSymbolInfo: (symbol: NodeModel): SymbolInfo => {
            return { fit: true,description: { text: symbol.id, } ,tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
        },
    });
    palette.appendTo('#symbolpalette');
};

