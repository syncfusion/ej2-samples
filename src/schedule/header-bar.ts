import { loadCultureFiles } from '../common/culture-loader';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { Schedule, Month, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';

Schedule.Inject(Month, Resize, DragAndDrop);

/**
 *  Schedule header customization sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).employeeEventData, null, true);
    const onIconClick = (): void => {
        if (profilePopup.element.classList.contains('e-popup-close')) {
            profilePopup.show();
        } else {
            profilePopup.hide();
        }
    }
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 1, 15),
        views: ['Month'],
        currentView: 'Month',
        eventSettings: { dataSource: data },
        toolbarItems: [{ name: 'Previous', align: 'Left' }, { name: 'Next', align: 'Left' }, { name: 'DateRangeText', align: 'Left' }, { name: 'Today', align: 'Right' }, { align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon', click: onIconClick }],
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView),
        // custom code start
        destroyed: () => {
            document.removeEventListener('keydown', hidePopup);
            document.removeEventListener('click', hidePopup);
        }
        // custom code end
    });
    scheduleObj.appendTo('#Schedule');

    let headerBarCheckObj: CheckBox = new CheckBox({
        label: 'Show/Hide Header bar', checked: true,
        change: (args: ChangeEventArgs) => {
            profilePopup.hide();
            scheduleObj.showHeaderBar = args.checked;
            scheduleObj.dataBind();
        }
    });
    headerBarCheckObj.appendTo('#headerbar');

    let userContentEle: HTMLElement = createElement('div', {
        className: 'e-profile-wrapper'
    });
    scheduleObj.element.parentElement.appendChild(userContentEle);

    let getDOMString: (data: object) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
        '</div><div class="content-wrap"><div class="name">Nancy</div>' +
        '<div class="destination">Product Manager</div><div class="status">' +
        '<div class="status-icon"></div>Online</div></div></div>');
    let output: NodeList = getDOMString({});
    let profilePopup: Popup = new Popup(userContentEle, {
        content: output[0] as HTMLElement,
        relateTo: '.e-schedule-user-icon',
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' },
        targetType: 'relative',
        viewPortElement: scheduleObj.element,
        width: 185,
        height: 80
    });
    profilePopup.hide();

    // custom code start
    document.addEventListener('keydown', hidePopup);
    document.addEventListener('click', hidePopup);

    function hidePopup(event: KeyboardEvent | MouseEvent): void {
        if (profilePopup.element.classList.contains('e-popup-open') && (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape') ||
            (event.type === 'click' && event.target && !((event.target as HTMLElement).closest('.e-schedule-user-icon') ||
                (event.target as HTMLElement).closest('.e-profile-wrapper'))))) {
            profilePopup.hide();
        }
    }
    // custom code end
};
