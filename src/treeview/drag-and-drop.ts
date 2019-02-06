import { loadCultureFiles } from '../common/culture-loader';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { ListView } from '@syncfusion/ej2-lists';
import { closest } from '@syncfusion/ej2-base';
import * as dataSource from './dataSource.json';

/**
 * TreeView drag and drop sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the first TreeView by mapping its fields property with data source properties
    let tree1Obj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).dragData1, id: 'id', text: 'name', child: 'child' },
        allowDragAndDrop: true,
        nodeDragStop: onDragStop
    });
    tree1Obj.appendTo('#tree1');
    // Render the second TreeView by mapping its fields property with data source properties
    let tree2Obj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).dragData2, id: 'id', text: 'name', child: 'child' },
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