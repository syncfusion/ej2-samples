/**
 * Event Details
 */
import { ListView } from '@syncfusion/ej2-lists';
import { DiagramAction } from '@syncfusion/ej2-diagrams';

export function getEventDetails(args: any): void {
    let listView: any = document.getElementById('listview-def');
    let listViewComponent: ListView = listView.ej2_instances[0];
    let selectedItems: any = listViewComponent.getSelectedItems();
    if (selectedItems.data.length > 0) {
        let elementName: boolean = getName(selectedItems, args);
        if (elementName) {
            eventInformation(args);
        }
    } 
}

function getName(selectedItems: any, args: any): boolean {
    for (let i: number = 0; i < selectedItems.data.length; i++) {
        let eventName: string = selectedItems.data[i].id;
        if (eventName === args.name) {
            return true;
        }
    }
    return false;
}

function getCause(cause: DiagramAction): string {
    switch (cause) {
        case DiagramAction.Render:
            return 'Rendering';
        case DiagramAction.PublicMethod:
            return 'PublicMethod';
        case DiagramAction.ToolAction:
            return 'ToolAction';
        case DiagramAction.UndoRedo:
            return 'UndoRedo';
        case DiagramAction.TextEdit:
            return 'TextEdit';
        case DiagramAction.Group:
            return 'Group';
        case DiagramAction.Clear:
            return 'Clear';
        case DiagramAction.PreventClearSelection:
            return 'PreventClearSelection';
        case DiagramAction.Interactions:
            return 'Interactions';
        case DiagramAction.PreventHistory:
            return 'PreventHistory';
    }
    return '';
}

// tslint:disable-next-line:max-func-body-length
function eventInformation(args: any): void {
    let data: HTMLDivElement = document.createElement('div');
    data.className = 'eventData';
    let eventObject: object[] = [];
    switch (args.name) {
        case 'click':
            if (args.element && args.element.id) {
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
                { 'actualObject': args.actualObject ? args.actualObject.id : 'null' }, { 'count': args.count },
                { 'position.x': args.position.x },
                { 'position.y': args.position.y }];
            }
            break;
        case 'dragEnter':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
            { 'diagram': args.diagram.getModuleName() }, { 'source': args.source.getModuleName() }];
            break;
        case 'dragLeave':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
            { 'diagram': args.diagram.getModuleName() }];
            break;
        case 'dragOver':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
            { 'target': args.target.id }, { 'mousePosition.x': args.mousePosition.x }, { 'mousePosition.y': args.mousePosition.y },
            { 'diagram': args.diagram.getModuleName() }];
            break;
        case 'historyChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'cause': getCause(args.cause) },
            { 'type': args.type }, { 'source': args.source[0].id }];
            break;
        case 'doubleClick':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' },
            { 'position.x': args.position.x }, { 'position.y': args.position.y }, { 'source': args.source.id }];
            break;
        case 'textEdit':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue': args.newValue },
            { 'oldValue': args.oldValue }];
            break;
        case 'scrollChange':
            eventObject = [
                { 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue.CurrentZoom': args.newValue.CurrentZoom },
                { 'newValue.HorizontalOffset': args.newValue.HorizontalOffset }, { 'source': args.source.getModuleName() },
                { 'newValue.VerticalOffset': args.newValue.VerticalOffset },
                { 'newValue.ViewportHeight': args.newValue.ViewportHeight }, { 'newValue.ViewportWidth': args.newValue.ViewportWidth },
                { 'oldValue.CurrentZoom': args.oldValue.CurrentZoom }, { 'oldValue.HorizontalOffset': args.oldValue.HorizontalOffset },
                { 'oldValue.VerticalOffset': args.oldValue.VerticalOffset }, { 'oldValue.ViewportHeight': args.oldValue.ViewportHeight },
                { 'oldValue.ViewportWidth': args.oldValue.ViewportWidth }
            ];
            break;
        case 'selectionChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue': args.newValue ? args.newValue.length : 0 },
            { 'oldValue': args.oldValue ? args.oldValue.length : 0 }, { 'type': args.type }, { 'state': args.state }];
            break;
        case 'sizeChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue.offsetX': args.newValue.offsetX },
            { 'newValue.offsetY': args.newValue.offsetY }, { 'oldValue.offsetX': args.oldValue.offsetX },
            { 'oldValue.offsetY': args.oldValue.offsetY }, { 'source': args.source.propName }, { 'state': args.state }];
            break;
        case 'connectionChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'connector': args.connector.id },
            { 'connectorEnd': args.connectorEnd }, { 'newValue.nodeId': args.newValue.nodeId }, { 'newValue.portId': args.newValue.portId },
            { 'oldValue.nodeId': args.oldValue.nodeId }, { 'oldValue.portId': args.oldValue.portId }, { 'state': args.state }];
            break;
        case 'sourcePointChange':
        case 'targetPointChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'connector': args.connector.id },
            { 'newValue.x': args.newValue.x }, { 'newValue.y': args.newValue.y }, { 'oldValue.x': args.oldValue.x },
            { 'oldValue.y': args.oldValue.y }, { 'targetNode': args.targetNode }, { 'targetPort': args.targetPort },
            { 'state': args.state }];
            break;
        case 'propertyChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'cause': getCause(args.cause) },
            { 'newValue': args.newValue }, { 'oldValue': args.oldValue }, { 'element': args.element }];
            break;
        case 'positionChange':
            eventObject = [
                { 'eventName': args.name }, { 'arguments': 'value' }, { 'allowDrop': args.allowDrop },
                { 'newValue.offsetX': args.newValue.offsetX }, { 'newValue.offsetY': args.newValue.offsetY },
                { 'oldValue.offsetX': args.oldValue.offsetX }, { 'oldValue.offsetY': args.oldValue.offsetY },
                { 'targetPosition.x': args.targetPosition.x }, { 'targetPosition.y': args.targetPosition.y },
                { 'source': args.source.propName }, { 'target': args.target }, { 'state': args.state },
            ];
            break;
        case 'rotateChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue': args.newValue.rotateAngle },
            { 'oldValue': args.oldValue.rotateAngle }, { 'source': args.source.propName }, { 'state': args.state }];
            break;
        case 'collectionChange':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'cause': getCause(args.cause) },
            { 'element': args.element.id }, { 'type': args.type }, { 'state': args.state }];
            break;
        case 'mouseEnter':
        case 'mouseLeave':
        case 'mouseOver':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'actualObject': args.actualObject },
            { 'element': args.element }, { 'targets': args.targets }];
            break;
        case 'contextMenuOpen':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'items': args.items }, { 'element': args.element.id },
            { 'hiddenItems': args.hiddenItems }, { 'left': args.left }, { 'top': args.top }, { 'parentItem': args.parentItem }];
            break;
        case 'contextMenuBeforeItemRender':
        case 'contextMenuClick':
            eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
            { 'item': args.item.id }];
            break;
    }
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = 'Diagram ' + args.name.bold() + ' event called' + '<hr>';
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}

function setEventsArguments(data: object[]): HTMLTableElement {
    let table: HTMLTableElement = document.createElement('table');
    table.style.marginTop = '15px';
    let tableBody: HTMLTableSectionElement = document.createElement('tbody');
    for (let i: number = 0; i < data.length; i++) {
        let row: HTMLTableRowElement = document.createElement('tr');
        Object.keys(data[i]).forEach((key: string) => {
            let firstColumn: HTMLTableDataCellElement = document.createElement('td');
            firstColumn.appendChild(document.createTextNode(key));
            row.appendChild(firstColumn);
            let thirdColumn: HTMLTableDataCellElement = document.createElement('td');
            thirdColumn.appendChild(document.createTextNode('<b>' + data[i][key] + '</b>'));
            row.appendChild(thirdColumn);
        });
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    return table;
}