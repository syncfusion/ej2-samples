import { loadCultureFiles } from '../common/culture-loader';
import { BlockEditor, BlockAction, BlockChange, BlockChangedEventArgs, ToolbarItemClickEventArgs } from "@syncfusion/ej2-blockeditor"
import { Button } from '@syncfusion/ej2/buttons';
import * as data from './blockData.json';

/**
 * Overview sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    const blocksFromJson = (data as any)["blockDataEvents"];
    let eventsBlockEditor: BlockEditor = new BlockEditor({
        blocks: blocksFromJson,
        height: "600px",
        // Inline toolbar event handlers for demonstrating toolbar interactions
        inlineToolbarSettings: {
            itemClick: (args: ToolbarItemClickEventArgs) => {
                // Log inline toolbar item click event to event log
                appendElement(`BlockEditor inline toolbar <b>${args.item.command}</b> clicked<hr>`);
            }
        },
        created: created,
        blockChanged: blockChangeEvent,
        selectionChanged: selectionChanged,
        blockDragStart: blockDragStart,
        blockDragging: blockDragging,
        blockDropped: blockDropped,
        focus: focusEvent,
        blur: blurEvent,
        beforePasteCleanup: beforePasteEvent,
        afterPasteCleanup: afterPasteEvent,
    });
    eventsBlockEditor.appendTo('#events-blockeditor');

    let clear: Button = new Button({});
    clear.appendTo('#clear');

    function created(): void {
        appendElement('BlockEditor <b>created</b> event called<hr>');
    }
    // Handle block change events by logging a summary of the actions performed
    function blockChangeEvent(args: BlockChangedEventArgs): void {
        const changesCount: number = args.changes.length;
        if (changesCount === 0) { return; }
    // Count occurrences of each action type in the changes
        const actionCounts: { [key in BlockAction]?: number } = {};
        args.changes.forEach((change: BlockChange) => {
            actionCounts[change.action] = (actionCounts[change.action] || 0) + 1;
        });

        let logMessage: string = 'BlockEditor <b>blockChanged</b> event called: ';
        const messages: string[] = [];
        // Helper function to generate pluralized strings for action counts
        const getPluralString = (count: number, noun: string) => {
            return count === 1 ? `${count} ${noun}` : `${count} ${noun}s`;
        };
        // Build descriptive messages for each action type if present
        if (actionCounts.Insertion) {
            messages.push(`${getPluralString(actionCounts.Insertion, 'block')} inserted`);
        }
        if (actionCounts.Deletion) {
            messages.push(`${getPluralString(actionCounts.Deletion, 'block')} deleted`);
        }
        if (actionCounts.Moved) {
            messages.push(`${getPluralString(actionCounts.Moved, 'block')} moved`);
        }
        if (actionCounts.Update) {
            messages.push(`${getPluralString(actionCounts.Update, 'block')} updated`);
        }

        logMessage += messages.join(', ') + '<hr>';
        appendElement(logMessage);
    }

    function selectionChanged(): void {
        appendElement('BlockEditor <b>selectionChanged</b> event called<hr>');
    }

    function blockDragging(): void {
        appendElement('BlockEditor <b>blockDragging</b> event called<hr>');
    }

    function blockDragStart(): void {
        appendElement('BlockEditor <b>blockDragStart</b> event called<hr>');
    }

    function blockDropped(): void {
        appendElement('BlockEditor <b>blockDropped</b> event called<hr>');
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

    // Append a new log entry to the event log container, prepending it to existing content
    function appendElement(html: string) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('eventLog');
        log.insertBefore(span, log.firstChild);
    }

    document.getElementById('clear').onclick = (): void => {
        document.getElementById('eventLog').innerHTML = '';
    };
};
