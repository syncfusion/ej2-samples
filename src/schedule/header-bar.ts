import { loadCultureFiles } from '../common/culture-loader';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { Schedule, Month, ActionEventArgs, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';

Schedule.Inject(Month, Resize, DragAndDrop);

/**
 *  Schedule header customization sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).employeeEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 1, 15),
        views: ['Month'],
        currentView: 'Month',
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView),
        actionBegin: (args: ActionEventArgs) => {
            if (args.requestType === 'toolbarItemRendering') {
                let userIconItem: ItemModel = { align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon' };
                args.items.push(userIconItem);
            }
        },
        actionComplete: (args: ActionEventArgs) => {
            if (args.requestType === 'toolBarItemRendered') {
                let userIconEle: HTMLElement = scheduleObj.element.querySelector('.e-schedule-user-icon') as HTMLElement;
                userIconEle.onclick = () => {
                    profilePopup.relateTo = userIconEle;
                    profilePopup.dataBind();
                    if (profilePopup.element.classList.contains('e-popup-close')) {
                        profilePopup.show();
                    } else {
                        profilePopup.hide();
                    }
                };
            }
        }
    });
    scheduleObj.appendTo('#Schedule');

    // custom code start
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

    let userIconEle: HTMLElement = scheduleObj.element.querySelector('.e-schedule-user-icon') as HTMLElement;
    let getDOMString: (data: object) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
        '</div><div class="content-wrap"><div class="name">Nancy</div>' +
        '<div class="destination">Product Manager</div><div class="status">' +
        '<div class="status-icon"></div>Online</div></div></div>');
    let output: NodeList = getDOMString({});
    let profilePopup: Popup = new Popup(userContentEle, {
        content: output[0] as HTMLElement,
        relateTo: userIconEle,
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' },
        targetType: 'relative',
        viewPortElement: scheduleObj.element,
        width: 185,
        height: 80
    });
    profilePopup.hide();
    // custom code end
};
