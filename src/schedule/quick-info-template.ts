import { loadCultureFiles } from '../common/culture-loader';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TextBox } from '@syncfusion/ej2-inputs';
import {
    Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop,
    ResourcesModel, PopupOpenEventArgs, EJ2Instance, CellClickEventArgs, CurrentAction
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule quick info template sample
 */

// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    interface TemplateFunction extends Window {
        getHeaderDetails?: Function;
        getHeaderStyles?: Function;
        getEventType?: Function;
        getResourceData?: Function;
    }

    (window as TemplateFunction).getResourceData = (data: { [key: string]: Object }) => {
        let resources: ResourcesModel = scheduleObj.getResourceCollections().slice(-1)[0];
        let resourceData: { [key: string]: Object } = (resources.dataSource as Object[]).filter((resource: { [key: string]: Object }) =>
            resource.Id === data.RoomId)[0] as { [key: string]: Object };
        return resourceData;
    };

    (window as TemplateFunction).getHeaderDetails = (data: { [key: string]: Date }) => {
        let intl: Internationalization = new Internationalization();
        return intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' + intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    };

    (window as TemplateFunction).getHeaderStyles = (data: { [key: string]: Object }) => {
        if (data.elementType === 'cell') {
            return 'align-items: center; color: #919191;';
        } else {
            let resourceData: { [key: string]: Object } = (window as TemplateFunction).getResourceData(data);
            return 'background:' + resourceData.Color + '; color: #FFFFFF;';
        }
    };

    let buttonClickActions: Function = (e: Event) => {
        let quickPopup: HTMLElement = scheduleObj.element.querySelector('.e-quick-popup-wrapper') as HTMLElement;
        let getSlotData: Function = (): { [key: string]: Object } => {
            let cellDetails: CellClickEventArgs = scheduleObj.getCellDetails(scheduleObj.getSelectedElements());
            let addObj: { [key: string]: Object } = {};
            addObj.Id = scheduleObj.getEventMaxID();
            addObj.Subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBox).value;
            addObj.StartTime = new Date(+cellDetails.startTime);
            addObj.EndTime = new Date(+cellDetails.endTime);
            addObj.Description = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBox).value;
            addObj.RoomId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownList).value;
            return addObj;
        };
        if ((e.target as HTMLElement).id === 'add') {
            let addObj: { [key: string]: Object } = getSlotData();
            scheduleObj.addEvent(addObj);
        } else if ((e.target as HTMLElement).id === 'delete') {
            let eventDetails: { [key: string]: Object } = scheduleObj.activeEventData.event as { [key: string]: Object };
            let currentAction: CurrentAction;
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            scheduleObj.deleteEvent(eventDetails, currentAction);
        } else {
            let isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            let eventDetails: { [key: string]: Object } = isCellPopup ? getSlotData() :
                scheduleObj.activeEventData.event as { [key: string]: Object };
            let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        scheduleObj.closeQuickInfoPopup();
    };

    (window as TemplateFunction).getEventType = (data: { [key: string]: Date }) => {
        let resourceData: { [key: string]: Object } = (window as TemplateFunction).getResourceData(data);
        return resourceData.Name;
    };

    let data: Object[] = <Object[]>extend([], (dataSource as any).quickInfoTemplateData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2020, 0, 9),
        eventSettings: { dataSource: data },
        resources: [{
            field: 'RoomId', title: 'Room Type', name: 'MeetingRoom', textField: 'Name', idField: 'Id', colorField: 'Color',
            dataSource: [
                { Name: 'Jammy', Id: 1, Capacity: 20, Color: '#ea7a57', Type: 'Conference' },
                { Name: 'Tweety', Id: 2, Capacity: 7, Color: '#7fa900', Type: 'Cabin' },
                { Name: 'Nestle', Id: 3, Capacity: 5, Color: '#5978ee', Type: 'Cabin' },
                { Name: 'Phoenix', Id: 4, Capacity: 15, Color: '#fec200', Type: 'Conference' },
                { Name: 'Mission', Id: 5, Capacity: 25, Color: '#df5286', Type: 'Conference' },
                { Name: 'Hangout', Id: 6, Capacity: 10, Color: '#00bdae', Type: 'Cabin' },
                { Name: 'Rick Roll', Id: 7, Capacity: 20, Color: '#865fcf', Type: 'Conference' },
                { Name: 'Rainbow', Id: 8, Capacity: 8, Color: '#1aaa55', Type: 'Cabin' },
                { Name: 'Swarm', Id: 9, Capacity: 30, Color: '#df5286', Type: 'Conference' },
                { Name: 'Photogenic', Id: 10, Capacity: 25, Color: '#710193', Type: 'Conference' }
            ]
        }],
        quickInfoTemplates: {
            header: '#header-template',
            content: '#content-template',
            footer: '#footer-template'
        },
        eventRendered: (args: EventRenderedArgs) => {
            let categoryColor: string = args.data.CategoryColor as string;
            if (!args.element || !categoryColor) {
                return;
            }
            if (scheduleObj.currentView === 'Agenda') {
                (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
            } else {
                args.element.style.backgroundColor = categoryColor;
            }
        },
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.type === 'QuickInfo') {
                let titleObj: TextBox = new TextBox({ placeholder: 'Title' });
                titleObj.appendTo(args.element.querySelector('#title') as HTMLElement);
                let typeObj: DropDownList = new DropDownList({
                    dataSource: scheduleObj.getResourceCollections().slice(-1)[0].dataSource as { [key: string]: Object }[],
                    placeholder: 'Choose Type',
                    fields: { text: 'Name', value: 'Id' },
                    index: 0
                });
                typeObj.appendTo(args.element.querySelector('#eventType') as HTMLElement);
                let notesObj: TextBox = new TextBox({ placeholder: 'Notes' });
                notesObj.appendTo(args.element.querySelector('#notes') as HTMLElement);

                let moreDetailsBtn: HTMLButtonElement = args.element.querySelector('#more-details') as HTMLButtonElement;
                if (moreDetailsBtn) {
                    let moreObj: Button = new Button({
                        content: 'More Details', cssClass: 'e-flat',
                        isPrimary: args.element.firstElementChild.classList.contains('e-event-popup')
                    });
                    moreObj.appendTo(moreDetailsBtn);
                    moreDetailsBtn.onclick = (e: Event) => { buttonClickActions(e); };
                }
                let addBtn: HTMLButtonElement = args.element.querySelector('#add') as HTMLButtonElement;
                if (addBtn) {
                    new Button({ content: 'Add', cssClass: 'e-flat', isPrimary: true }, addBtn);
                    addBtn.onclick = (e: Event) => { buttonClickActions(e); };
                }
                let deleteBtn: HTMLButtonElement = args.element.querySelector('#delete') as HTMLButtonElement;
                if (deleteBtn) {
                    new Button({ content: 'Delete', cssClass: 'e-flat' }, deleteBtn);
                    deleteBtn.onclick = (e: Event) => { buttonClickActions(e); };
                }
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
