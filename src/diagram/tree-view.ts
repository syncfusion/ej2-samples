import { loadCultureFiles } from '../common/culture-loader';

import {
    Diagram,
    NodeModel,
    DataBinding,
    HierarchicalTree
  } from '@syncfusion/ej2-diagrams';
  import { Toolbar, ClickEventArgs, TreeView } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { NodeConstraints, SnapConstraints, UndoRedo } from '@syncfusion/ej2-diagrams';
Diagram.Inject(DataBinding, HierarchicalTree, UndoRedo);

let diagram: Diagram

//collecton of data
let workingData:object[] = [
    { Name: 'Plant Manager', Id: '1', hasChild: true, expanded: true },
    {
      Name: 'Production Manager',
      Id: '2',
      ParentId: '1',
      hasChild: true,
      expanded: true,
    },
    {
      Name: 'Control Room',
      Id: '3',
      ParentId: '2',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Foreman1', Id: '4', ParentId: '3', hasChild: true, expanded: true },
    { Name: 'Craft Personnel5', Id: '5', ParentId: '4' },
    { Name: 'Craft Personnel6', Id: '6', ParentId: '4' },
    {
      Name: 'Plant Operator',
      Id: '7',
      ParentId: '2',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Foreman2', Id: '8', ParentId: '7', hasChild: true, expanded: true },
    { Name: 'Craft Personnel7', Id: '9', ParentId: '8' },
    { Name: 'Administrative Officer', Id: '10', ParentId: '1' },
    {
      Name: 'Maintenance Manager',
      Id: '11',
      ParentId: '1',
      hasChild: true,
      expanded: true,
    },
    {
      Name: 'Electrical Supervisor',
      Id: '12',
      ParentId: '11',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Craft Personnel1', Id: '13', ParentId: '12' },
    { Name: 'Craft Personnel2', Id: '14', ParentId: '12' },
    {
      Name: 'Mechanical Supervisor',
      Id: '15',
      ParentId: '11',
      hasChild: true,
      expanded: true,
    },
    { Name: 'Craft Personnel3', Id: '16', ParentId: '15' },
    { Name: 'Craft Personnel4', Id: '17', ParentId: '15' },
  ];
  let items: DataManager = new DataManager(workingData as JSON[], new Query().take(7));

  let index = 1;
  let deleteButton:Button;
  let addButton:Button;
  let treeObj:TreeView;
  let targetNodeId:any;
  let elementNodeId:any;
  //drag enter event
  function dragEnter(args:any) {
    let label = '';
    if (args.dragData) {
        label = args.dragData.text;
    }
    let node =
    {
        id: 'node' + index,
        data: { Name: label, Id: 'node' + index },
        annotations: [{ content: label }]
    };
    args.dragItem = node;
}

//check data function
function checkData(a:any) {
    return a.Id === targetNodeId;
}

//check element data function
function checkElementData(a:any) {
    return a.Id === elementNodeId;
}

//Drop a node from the palette into the diagram
function drop(args:any) {
    let connector:any;
    let tempData:any;
    setTimeout(function () {
        targetNodeId = args.target.id;
        tempData = workingData.filter(checkData);
        if(tempData.length > 0){
        tempData[0].hasChild = true;
        tempData[0].expanded = true;
        }
        if (args.element.inEdges.length === 0) {
            let id = args.element.id;
            let item = {
                Name: args.element.annotations[0].content, Id: args.element.id, ParentId: targetNodeId, hasChild: false, expanded: false
            };
            treeObj.addNodes([item], targetNodeId, null);
            if (args.target instanceof Node && targetNodeId && id) {
            connector = { sourceID: targetNodeId, targetID: id };
            diagram.add(connector);
            diagram.doLayout();
             diagram.fitToPage();
            }
            index++;
            workingData.push(item);
        } else {
            connector = diagram.getObject(args.element.inEdges[0]);
            connector.sourceID = targetNodeId;
            diagram.dataBind();
            diagram.doLayout();
            elementNodeId = args.element.id;
            tempData = workingData.filter(checkElementData);
            tempData[0].ParentId = targetNodeId;
            treeObj.fields = {
                dataSource: workingData as any,
                id: 'Id',
                text: 'Name',
                parentID: 'ParentId',
                hasChildren: 'hasChild',
            };
            treeObj.refresh();
        }
    }, 0);

}

//Change the annotation of the node
function textEdit(args:any) {
    setTimeout(function () {
        if (args.annotation) {
            elementNodeId = args.element.id;
            let tempData:any = workingData.filter(checkElementData);
            let node = treeObj.getNode((tempData[0] as any).Id);
            treeObj.updateNode((tempData[0] as any).Id, args.annotation.content);
        }
    }, 0);
}

//Enable the add and delete button
function nodeSelected() {
    deleteButton.disabled = false;
    addButton.disabled = false;
}

//node click event
function nodeClicked() {
    let node = diagram.getObject(treeObj.selectedNodes[0]);
    diagram.select([node]);
}

// Key Press Event
function keyPress(args:any) {
    if (args.event.key === 'Enter') {
        add();
    }
}

//node edited event
function nodeEdited(args:any) {
    let node:any = diagram.getObject(args.nodeData.id);
    node.annotations[0].content = args.newText;
    treeObj.selectedNodes = [args.nodeData.id];
}

//Remove node
function remove() {
    let nodeId:any;
    if (diagram.selectedItems.nodes.length > 0) {
        nodeId = diagram.selectedItems.nodes[0].id;
        removeSubChild(diagram.selectedItems.nodes[0], true);
        diagram.doLayout();
    } else if (treeObj.selectedNodes.length > 0) {
        nodeId = treeObj.selectedNodes[0];
        treeObj.removeNodes([nodeId]);
        let node = diagram.getObject(nodeId);
        removeSubChild(node, false);
    }
    for (let i = workingData.length - 1; i >= 0; i--) {
        if ((workingData[i] as any).id === nodeId) {
            workingData.splice(i, 1);
        }
    }
    diagram.doLayout();

}

//Remove sub child node
function removeSubChild(node:any, canDelete:any) {
    let childNode:any;
    let connector:any;
    for (let i = node.outEdges.length - 1; i >= 0; i--) {
        connector = diagram.getObject(node.outEdges[i]);
        childNode = diagram.getObject(connector.targetID);
        if (childNode != null && childNode.outEdges.length > 0) {
            removeSubChild(childNode, canDelete);
        }
        else {
            diagram.remove(childNode);
            if (canDelete) {
                treeObj.removeNodes([childNode.id]);
            }
            for (let j:number = workingData.length - 1; j >= 0; j--) {
                if ((workingData[j] as any).id === childNode.id) {
                    workingData.splice(j, 1);
                }
            }
        }
    }
    for (let k:number = node.inEdges.length - 1; k >= 0; k--) {
        connector = diagram.getObject(node.inEdges[k]);
        childNode = diagram.getObject(connector.sourceID);
        let index:any = childNode.outEdges.indexOf(connector.id);
        if (childNode.outEdges.length > 1 && index === 0) {
            index = childNode.outEdges.length;
        }
        if (index > 0) {
            let node1 = childNode.outEdges[index - 1];
            let connector1:any = diagram.getObject(node1);
            let node2 = diagram.getObject(connector1.targetID);
            diagram.select([node2]);
        }
        else {
            diagram.select([childNode]);
        }
    }
    diagram.remove(node);
    if (canDelete) {
        treeObj.removeNodes([node.id]);
    }
    for (let t:number = workingData.length - 1; t >= 0; t--) {
        if ((workingData[t] as any).id === node.id) {
            workingData.splice(t, 1);
        }
    }
}

//add function
function add() {
    let nodeId:any;
    if (diagram.selectedItems.nodes.length > 0) {
        nodeId = diagram.selectedItems.nodes[0].id;
        addNode(nodeId);
    } else if (treeObj.selectedNodes.length > 0) {
        nodeId = treeObj.selectedNodes[0];
        addNode(nodeId);
    }
}

//filter Node Data Function
function filterNodeData(a:any) {
    return a.data.Id === targetNodeId;
}

//add Node Function
function addNode(nodeId:any) {
    targetNodeId = nodeId ? nodeId : treeObj.selectedNodes[0];
    let tempData:any = workingData.filter(checkData);
    tempData[0].hasChild = true;
    tempData[0].expanded = true;
    let id = 'tree_' + index;
    let item = {
        Name: "Node", Id: id, ParentId: targetNodeId, hasChild: false, expanded: false
    };
    treeObj.addNodes([item], targetNodeId, null);
    treeObj.beginEdit(id);
    let node = { id: id, data: item };
    let targetId;
    if (diagram.selectedItems.nodes.length > 0) {
        targetId = diagram.selectedItems.nodes[0].id;
    } else {
        let temp:any = diagram.nodes.filter(filterNodeData);
        targetId = temp[0].id;
    }
    let connector = { sourceID: targetId, targetID: id };
    diagram.add(node);
    diagram.add(connector);
    diagram.doLayout();
    index++;
    workingData.push(item);
}

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%', height: '700px', snapSettings: { constraints: SnapConstraints.None },
        //configures data source settings
        dataSourceSettings:{
            id: 'Id',
            parentId: 'ParentId',
            dataSource: items,
            doBinding: (  nodeModel: NodeModel,
                data: object,
                diagram: Diagram) => {
              nodeModel.id = (data as any).Id;
            },
          },
        layout: {
            type: 'HierarchicalTree', verticalSpacing: 50, horizontalSpacing: 40,
            enableAnimation: true
        },
        //Sets the default values of a node
        getNodeDefaults: function (node:any) {
            node.width = 100;
            node.height = 40;
            node.style = { strokeWidth: 1, strokeColor: 'whitesmoke', fill: 'CornflowerBlue' };
            node.annotations = [{ content: node.data.Name, style: { color: 'white' } }];
            node.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
            return node;
        },
        //Sets the default values of a Connector.
        getConnectorDefaults: function (obj:any) {
            obj.type = 'Orthogonal';
            obj.style = { strokeColor: 'CornflowerBlue' };
            obj.targetDecorator = { shape: 'Arrow', height: 10, width: 10, style: { fill: 'CornflowerBlue', strokeColor: 'white' } };
        },
        selectionChange: function (args) {
            if (args.state === 'Changed') {
                if (args.type === "Addition") {
                    deleteButton.disabled = false;
                    addButton.disabled = false;
                } else {
                    deleteButton.disabled = true;
                    addButton.disabled = true;
                }
                let selectedItems: any = diagram.selectedItems.nodes.concat((diagram.selectedItems as any).connectors);
                if(selectedItems.length==0)
                {
                    treeObj.selectedNodes=[];
                }
            }
        },
        click: function (args:any) {
            if(args.element.propName === "nodes"){
            treeObj.selectedNodes = [args.element.data.Id];
            }
        },
        textEdit: textEdit,
        dragEnter: dragEnter,
        drop: drop
    });
    diagram.appendTo('#diagram');

        // Button Initialization

        addButton = new Button({ isPrimary: true, disabled: true });
        addButton.appendTo('#addButton');
    
        deleteButton = new Button({ isPrimary: true, disabled: true });
        deleteButton.appendTo('#deleteButton');

        //add button on click
        document.getElementById('addButton').onclick = function () {
            add();
        };
        
        //delete button on click
        document.getElementById('deleteButton').onclick = function () {
            if ((diagram.selectedItems.nodes[0].data as any).Id !== "1") {
                remove();
            }
        };
        // Treeview Initialization
        treeObj = new TreeView({
            fields: {
                dataSource: workingData as any,
                id: 'Id',
                text: 'Name',
                parentID: 'ParentId',
                hasChildren: 'hasChild',
            },
            allowEditing: true,
            keyPress: keyPress,
            nodeEdited: nodeEdited,
            nodeSelected: nodeSelected,
            allowDragAndDrop: true,
            nodeClicked: nodeClicked
        });
    
        treeObj.appendTo('#tree');

};
