import { loadCultureFiles } from '../common/culture-loader';
import {
    NodeModel,
    Node,
    Diagram,
    ISelectionChangeEventArgs,
    SelectorConstraints,
    UserHandleModel,
    UserHandleEventsArgs,
    ConnectorConstraints,
    SnapConstraints,
    PortConstraints,
    PortVisibility,
    ConnectorEditing,
    DiagramContextMenu,
    Snapping,
    UndoRedo,
    ConnectorModel,
    IRotationEventArgs,
    Gridlines,
  } from '@syncfusion/ej2-diagrams';
import { CheckBox, RadioButton } from '@syncfusion/ej2/buttons';
import { ColorPicker, NumericTextBox } from '@syncfusion/ej2/inputs';
Diagram.Inject(DiagramContextMenu,UndoRedo,Snapping, ConnectorEditing);

let diagram: Diagram;
let showGridlines: CheckBox;
let snapToObject:CheckBox;
let drawingNode:any;
  let fontSize:any;
  let snappingInterval:NumericTextBox 

let nodes: NodeModel[]  = [
    {
        id:'node_1',width:100,height:100,offsetX:350,offsetY:250,
        ports:[
            {id:'port1',offset:{x:0.5,y:0.5},visibility:PortVisibility.Visible,
            style:{fill:'black'},
            constraints:PortConstraints.Default|PortConstraints.Draw
        }],
        annotations:[{id:'annot1',content:'Shape 1',offset:{x:0.5,y:1.2},style:{bold:true}}]
    },
    {
        id:'node_2',width:100,height:100,offsetX:650,offsetY:250,
        ports:[
            {id:'port11', offset:{x:0.5,y:0.5},visibility: PortVisibility.Visible,style:{fill:'black'},
            constraints:PortConstraints.Default|PortConstraints.Draw
        },{
            id:'port2',offset:{x:0,y:0.5},visibility:PortVisibility.Visible,
            style:{fill:'black'},
            constraints:PortConstraints.Default|PortConstraints.Draw,
            height:100,width:7
        }],
        annotations:[{id:'annot1',content:'Shape 2',offset:{x:0.5,y:1.2},style:{bold:true}}]

    },
    {
        id:'node_3',width:100,height:100,offsetX:500,offsetY:400,
        annotations:[{id:'annot1',content:'Shape 3',offset:{x:0.5,y:1.2},style:{bold:true}}]

    },
];

let connectors: ConnectorModel[]  = [
    {
        id:'connector_1',sourceID:'node_1',targetID:'node_3',type:'Orthogonal',
    }
];

let contextMenu:any = {
    show: true,
    showCustomMenuOnly: false,
};
let handles: UserHandleModel[] = [
    {
        name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z',
        visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z',
        visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
    {
        name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z',
        visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
    },
];
function created(){
    diagram.fitToPage({mode:'Width'});
}
function selectionChange(args:ISelectionChangeEventArgs){
    if (args.state === 'Changed') {
        let selectedItems:any = diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(
          (diagram.selectedItems as any).connectors
        );
        if (selectedItems.length > 0) {
          if (
            args.newValue.length > 0 &&
            args.newValue[0] instanceof Node
          ) {
            diagram.selectedItems = {
              constraints:
                SelectorConstraints.All |
                SelectorConstraints.UserHandle,
              userHandles: handles,
            };
            if (diagram.selectedItems.nodes.length > 0) {
              drawingNode =
                diagram.selectedItems.nodes[
                  diagram.selectedItems.nodes.length - 1
                ];
            }
          } else {
            diagram.selectedItems = {
              constraints:
                SelectorConstraints.All &
                ~SelectorConstraints.UserHandle,
            };
          }
        }
      }
}
function getConnectorDefaults(obj:Node){
    obj.constraints = ConnectorConstraints.Default|ConnectorConstraints.DragSegmentThumb;
}
function getNodeDefaults(obj: ConnectorModel){
    obj.style = {fill:'orange',strokeColor:'orange'};
}
function rotateChange(args:IRotationEventArgs){
    if(args.state === 'Start' || args.state === 'Progress')
{
    diagram.selectedItems = { constraints: SelectorConstraints.All&~SelectorConstraints.UserHandle};
}
if(args.state === 'Completed'){
    diagram.selectedItems = { constraints: SelectorConstraints.All|SelectorConstraints.UserHandle, userHandles: handles };
}
}
function userHandelClick(args:UserHandleEventsArgs){
    switch(args.element.name)
    {
        case 'Delete':
            diagram.remove();
            break;
        case 'Clone':
           diagram.paste(diagram.selectedItems.selectedObjects);
           break;
        case 'Draw':
            diagram.drawingObject.shape = {};
                (diagram.drawingObject as any).type = (diagram
                  .drawingObject as any).type
                  ? (diagram.drawingObject as any).type
                  : 'Orthogonal';
                (diagram.drawingObject as any).sourceID = drawingNode.id;
                diagram.dataBind();
            break;
    }
}

function scale() {
    (diagram.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] =
    snappingInterval.value;
    (diagram.snapSettings.verticalGridlines as Gridlines).scaledIntervals[0] =
    snappingInterval.value;
    diagram.dataBind();
  }
  function snapToLines(args:any) {
    if (showGridlines.checked && snapToObject.checked) {
      diagram.snapSettings.constraints = SnapConstraints.All;
    } else if (showGridlines.checked && !snapToObject.checked) {
      diagram.snapSettings.constraints =
        SnapConstraints.All & ~SnapConstraints.SnapToObject;
    } else if (!showGridlines.checked && snapToObject.checked) {
      diagram.snapSettings.constraints =
        SnapConstraints.All & ~SnapConstraints.ShowLines;
    } else if (!showGridlines.checked && !snapToObject.checked) {
      diagram.snapSettings.constraints =
        SnapConstraints.All &
        ~(SnapConstraints.ShowLines | SnapConstraints.SnapToObject);
    }
    switch (args.value) {
      case 'Snap To Gridlines':
        diagram.snapSettings.constraints =
          SnapConstraints.All | SnapConstraints.SnapToLines;
        if (!showGridlines.checked && !snapToObject.checked) {
          diagram.snapSettings.constraints =
            SnapConstraints.All &
            ~(SnapConstraints.ShowLines | SnapConstraints.SnapToObject);
        } else if (!snapToObject.checked && showGridlines.checked) {
          diagram.snapSettings.constraints =
            SnapConstraints.All & ~SnapConstraints.SnapToObject;
        } else if (snapToObject.checked && !showGridlines.checked) {
          diagram.snapSettings.constraints =
            SnapConstraints.All & ~SnapConstraints.ShowLines;
        }
        break;
      case 'Snap To Horizontal Gridlines':
        diagram.snapSettings.constraints =
          diagram.snapSettings.constraints ^
          SnapConstraints.SnapToVerticalLines;
        break;
      case 'Snap To Vertical Gridlines':
        diagram.snapSettings.constraints =
          diagram.snapSettings.constraints ^
          SnapConstraints.SnapToHorizontalLines;
        break;
      case 'None':
        diagram.snapSettings.constraints =
          SnapConstraints.All &
          ~(
            SnapConstraints.SnapToHorizontalLines |
            SnapConstraints.SnapToVerticalLines |
            SnapConstraints.SnapToLines
          );
        if (!showGridlines.checked && !snapToObject.checked) {
          diagram.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.ShowLines |
              SnapConstraints.SnapToObject |
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
        } else if (showGridlines.checked && !snapToObject.checked) {
          diagram.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.SnapToObject |
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
        } else if (!showGridlines.checked && snapToObject.checked) {
          diagram.snapSettings.constraints =
            SnapConstraints.All &
            ~(
              SnapConstraints.ShowLines |
              SnapConstraints.SnapToHorizontalLines |
              SnapConstraints.SnapToVerticalLines |
              SnapConstraints.SnapToLines
            );
        }
        break;
    }
    diagram.dataBind();
    scale();
  }
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initializtion of the diagram.
    diagram = new Diagram({
        width: '100%', height: '645px', nodes: nodes,
        rulerSettings:{showRulers:true},
        scrollSettings:{scrollLimit:'Infinity'},
        drawingObject:{type:'Orthogonal'},
        contextMenuSettings: contextMenu,
        onUserHandleMouseDown:userHandelClick,
        connectors:connectors,
        snapSettings:{snapAngle:5},
        getNodeDefaults:getNodeDefaults,
        getConnectorDefaults:getConnectorDefaults,
        created:created,
        selectionChange:selectionChange,
        rotateChange:rotateChange
    });
    diagram.appendTo('#diagram');

    snappingInterval = new NumericTextBox({
        min: 1,
        step: 1,
        width:150,
        value:20,
        format: 'n0',
        change: function (args:any) {
            diagram.snapSettings.horizontalGridlines.snapIntervals[0] = args.value;
            diagram.snapSettings.verticalGridlines.snapIntervals[0] = args.value;
            (diagram.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] = args.value;
            (diagram.snapSettings.horizontalGridlines as Gridlines).scaledIntervals[0] = args.value;
            diagram.dataBind();
       }
    });
    snappingInterval.appendTo('#snappingInterval');

    let snappingAngle:NumericTextBox = new NumericTextBox({
        min: 1,
        step: 1,
        value:5,
        format: 'n0',
        change: function (args:any) {
            diagram.snapSettings.snapAngle =args.value;
            diagram.dataBind();
       }
    });
    snappingAngle.appendTo('#snappingAngle');

    let snappingLineColor:ColorPicker = new ColorPicker({
        mode: 'Palette',
        showButtons:false,
        value:'#07EDE1',
        change: function (args:any){
            diagram.snapSettings.snapLineColor = args.value;
            diagram.dataBind();                
         }
    });
    snappingLineColor.appendTo('#snappingLineColor');

    showGridlines = new CheckBox({ label: 'Show Gridline', checked: true,
    change: function () { 
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
        diagram.dataBind();
        scale();
     }});
    showGridlines.appendTo('#showGridlines');

     snapToObject = new CheckBox({ label: 'Snapping To Objects', checked: true,
     change: function () { 
         diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
         diagram.dataBind();
         scale();
      }});
      snapToObject.appendTo('#snapToObject');

    let radioButton:RadioButton = new RadioButton({ label: 'Snap To Gridlines', name: 'snapToLines', value: 'Snap To Gridlines', checked: true,change:snapToLines });
    radioButton.appendTo('#radio1');

    let radioButton1:RadioButton = new RadioButton({ label: 'Snap To Horizontal Gridlines', name: 'snapToLines', value: 'Snap To Horizontal Gridlines',change:snapToLines });
    radioButton1.appendTo('#radio2');

    let radioButton2:RadioButton = new RadioButton({ label: 'Snap To Vertical Gridlines', name: 'snapToLines', value: 'Snap To Vertical Gridlines',change:snapToLines });
    radioButton2.appendTo('#radio3');

   let radioButton3:RadioButton = new RadioButton({ label: 'None', name: 'snapToLines', value: 'None',change:snapToLines });
    radioButton3.appendTo('#radio4');

};
