import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { closest } from '@syncfusion/ej2-base';

/**
 * TreeView drag and drop sample
 */
this.default = () => {
    // Hierarchical data source for first TreeView component
    let productTeam1: { [key: string]: Object }[] = [
        {
            id: 't1', name: 'ASP.NET MVC Team', expanded: true,
            child: [
                { id: 't2', name: 'Smith' },
                { id: 't3', name: 'Johnson' },
                { id: 't4', name: 'Anderson' },
            ]
        },
        {
            id: 't5', name: 'Windows Team', expanded: true,
            child: [
                { id: 't6', name: 'Clark' },
                { id: 't7', name: 'Wright' },
                { id: 't8', name: 'Lopez' },
            ]
        }
    ];
    // Hierarchical data source for second TreeView component
    let productTeam2: { [key: string]: Object }[] = [
        {
            id: 't9', name: 'Web Team', expanded: true,
            child: [
                { id: 't10', name: 'Joshua' },
                { id: 't11', name: 'Matthew' },
                { id: 't12', name: 'David' },
            ]
        },
        {
            id: 't13', name: 'Build Team', expanded: true,
            child: [
                { id: 't14', name: 'Ryan' },
                { id: 't15', name: 'Justin' },
                { id: 't16', name: 'Robert' },
            ]
        }
    ];
    // Render the first TreeView by mapping its fields property with data source properties
    let tree1Obj: TreeView = new TreeView({
        fields: { dataSource: productTeam1, id: 'id', text: 'name', child: 'child' },
        allowDragAndDrop: true,
        nodeDragStop: onDragStop
    });
    tree1Obj.appendTo('#tree1');
    // Render the second TreeView by mapping its fields property with data source properties
    let tree2Obj: TreeView = new TreeView({
        fields: { dataSource: productTeam2, id: 'id', text: 'name', child: 'child' },
        allowDragAndDrop: true,
        nodeDragStop: onDragStop
    });
    tree2Obj.appendTo('#tree2');
    // Render the ListView with custom template
    let listObj: ListView = new ListView({
        dataSource: [],
        cssClass: 'custom-list',
        template: '<div><span>${text}</span><span id=${iconId} class=${class}></span></div>',
    });
    listObj.appendTo('#list');
    // Drop the dragged TreeView node into ListView
    let id: number = 1;
    function onDragStop(event: DragAndDropEventArgs): void {
        let targetEle: Element = <Element>closest(event.target, '.e-droppable');
        targetEle = targetEle ? targetEle : event.target;
        // Check the target as ListView or not
        if (targetEle && targetEle.classList.contains('custom-list')) {
            event.cancel = true;
            let newData: { [key: string]: Object }[] = [];
            if (event.draggedNode.classList.contains('e-active')) {
                let selNodes: string[] = this.selectedNodes;
                for (let i: number = 0, len: number = selNodes.length; i < len; i++) {
                    let nodeEle: Element = document.querySelector('[data-uid="' + selNodes[i] + '"]').querySelector('.e-list-text');
                    let nodeText: string = nodeEle.textContent;
                    let newNode: { [key: string]: Object } = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                    id++;
                    newData.push(newNode);
                }
            } else {
                let text: string = 'text';
                let nodeText: string = event.draggedNodeData[text] as string;
                let newNode: { [key: string]: Object } = { id: 'l' + id, text: nodeText, class: 'custom-delete', iconId: 'i' + id };
                id++;
                newData.push(newNode);
            }
            listObj.addItem(newData, undefined);
        }
    }
    // Add the custom action for delete icon in ListView
    document.getElementById('list').addEventListener('mousedown', (event: any) => {
        if (event.target.classList.contains('custom-delete')) {
            let node: Element = <Element>closest(event.target, 'li');
            listObj.removeItem(node);
        }
    });
    document.getElementById('overlay').addEventListener('mousedown', (event: any) => {
        document.getElementById('overlay').style.display = 'none';
    });
};