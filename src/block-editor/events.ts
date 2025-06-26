import { loadCultureFiles } from '../common/culture-loader';
import { BlockEditor } from "@syncfusion/ej2-blockeditor"
import { Button } from '@syncfusion/ej2/buttons';
import { blockDataEvents } from './blockData';

/**
 * Overview sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let eventsBlockEditor: BlockEditor = new BlockEditor({
        blocks: blockDataEvents,
        created: created,
        contentChanged: contentChanged,
        selectionChanged: selectionChanged,
        blockAdded: blockAdded,
        blockRemoved: blockRemoved,
        blockMoved: blockMoved,
        blockDrag: blockDrag,
        blockDragStart: blockDragStart,
        blockDrop: blockDrop,
        focus: focusEvent,
        blur: blurEvent,
        beforePaste: beforePasteEvent,
        afterPaste: afterPasteEvent,
        undoRedoPerformed: undoRedoPerformedEvent
    });    
    eventsBlockEditor.appendTo('#events-blockeditor');

    let clear: Button = new Button({});
    clear.appendTo('#clear');

    document.getElementById('clear').onclick = (): void => {
        document.getElementById('eventLog').innerHTML = '';
    };

    function created(): void {
        appendElement('BlockEditor <b>created</b> event called<hr>');
    }

    function contentChanged(): void {
        appendElement('BlockEditor <b>contentChanged</b> event called<hr>');
    }

    function selectionChanged(): void {
        appendElement('BlockEditor <b>selectionChanged</b> event called<hr>');
    }

    function blockAdded(): void {
        appendElement('BlockEditor <b>blockAdded</b> event called<hr>');
    }

    function blockRemoved(): void {
        appendElement('BlockEditor <b>blockRemoved</b> event called<hr>');
    }

    function blockMoved(): void {
        appendElement('BlockEditor <b>blockMoved</b> event called<hr>');
    }

    function blockDrag(): void {
        appendElement('BlockEditor <b>blockDrag</b> event called<hr>');
    }

    function blockDragStart(): void {
        appendElement('BlockEditor <b>blockDragStart</b> event called<hr>');
    }

    function blockDrop(): void {
        appendElement('BlockEditor <b>blockDrop</b> event called<hr>');
    }

    function focusEvent(): void {
        appendElement('BlockEditor <b>focus</b> event called<hr>');
    }

    function blurEvent(): void {
        appendElement('BlockEditor <b>blur</b> event called<hr>');
    }

    function beforePasteEvent(): void {
        appendElement('BlockEditor <b>beforePaste</b> event called<hr>');
    }

    function afterPasteEvent(): void {
        appendElement('BlockEditor <b>afterPaste</b> event called<hr>');
    }

    function undoRedoPerformedEvent(args: any): void {
        appendElement(`BlockEditor <b>${args.isUndo ? 'Undo' : 'Redo'}</b> action performed<hr>`);
    }

    function appendElement(html: string) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('eventLog');
        log.insertBefore(span, log.firstChild);
    }
};
