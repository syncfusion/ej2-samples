import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, Agenda, TimelineViews, ExcelExport, Print, PopupOpenEventArgs, ResourcesModel, EventRenderedArgs, CellClickEventArgs, ActionEventArgs, PopupCloseEventArgs } from '@syncfusion/ej2-schedule';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, ChangeEventArgs, DropDownListModel } from '@syncfusion/ej2-dropdowns';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2/splitbuttons';
import { extend, Internationalization, addClass, removeClass, closest } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import * as dataSource from './datasource.json';

Schedule.Inject(Day, Week, Agenda, TimelineViews, ExcelExport, Print);

(window as any).default = (): void => {
  loadCultureFiles();
  let eventdata: Record<string, any>[] = extend([], (dataSource as any).TechnicalEventData, null, true) as Record<string, any>[];
  let rooms: Record<string, any>[] = [
    { RoomId: 1, RoomName: 'Room A', RoomCapacity: 100, RoomColor: '#0F6CBD' },
    { RoomId: 2, RoomName: 'Room B', RoomCapacity: 200, RoomColor: '#B71C1C' },
    { RoomId: 3, RoomName: 'Room C', RoomCapacity: 300, RoomColor: '#E65100' },
    { RoomId: 4, RoomName: 'Room D', RoomCapacity: 400, RoomColor: '#558B2F' }
  ];
  const roomsData: Record<string, any>[] = [
    { RoomId: 0, RoomName: 'All' },
    { RoomId: 1, RoomName: 'Room A' },
    { RoomId: 2, RoomName: 'Room B' },
    { RoomId: 3, RoomName: 'Room C' },
    { RoomId: 4, RoomName: 'Room D' }
  ];
  const printExportItems: ItemModel[] = [
    { text: 'Print', id: 'print' },
    { text: 'Export', id: 'export' }
  ];
  const unplannedEvents: string[] = ['', 'Cloud Security Essentials', 'AI for Automation'];

  const unPlannedEventsList = unplannedEvents.map((name, index) => ({
    id: index.toString(),
    name: name === '' ? 'All' : name
  }));

  const unplannedEvent1Data: Record<string, any>[] = extend([], (dataSource as any).CloudSecurityEventData, null, true) as Record<string, any>[];
  const unplannedEvent2Data: Record<string, any>[] = extend([], (dataSource as any).AIAutomationEventData, null, true) as Record<string, any>[];
  let allUnplannedEventsData: Record<string, any>[] = unplannedEvent1Data.concat(unplannedEvent2Data);

  const allUnplannedEventsTreeFields = {
    dataSource: allUnplannedEventsData,
    id: 'Id',
    text: 'Subject'
  };

  const unplannedEvent1TreeFields = {
    dataSource: unplannedEvent1Data,
    id: 'Id',
    text: 'Subject'
  };

  const unplannedEvent2TreeFields = {
    dataSource: unplannedEvent2Data,
    id: 'Id',
    text: 'Subject'
  };

  let scheduleObj: Schedule = new Schedule({
    height: '550px',
    width: '100%',
    cssClass: 'schedule-event-management',
    selectedDate: new Date(2025, 1, 24),
    currentView: 'Day',
    toolbarItems: [
      { align: 'Left', name: 'Previous' },
      { align: 'Left', name: 'Next' },
      { align: 'Left', name: 'DateRangeText' },
      { align: 'Right', name: 'Views' },
      { type: 'Separator', align: 'Right', cssClass: 'toolbar-post-agenda' },
      {
        name: 'Custom',
        type: 'Input',
        template: '#roomFilterTemplate',
        align: 'Right',
        cssClass: 'toolbar-post-agenda room-filter'
      },
      { type: 'Separator', align: 'Right', cssClass: 'toolbar-post-agenda' },
      {
        name: 'Custom',
        type: 'Button',
        prefixIcon: 'e-icons e-show-unplanned-events',
        align: 'Right',
        showTextOn: 'Overflow',
        overflow: 'Show',
        id: 'overview_toolbar_settings_unplanned_events',
        cssClass: 'toolbar-post-agenda',
        click: toggleUnplannedEventsElement
      },
      {
        name: 'Custom',
        type: 'Button',
        prefixIcon: 'e-icons e-print-export',
        showTextOn: 'Overflow',
        overflow: 'Show',
        align: 'Right',
        cssClass: 'toolbar-post-agenda',
        template: '#printExportTemplate'
      }
    ],
    startHour: '08:00',
    endHour: '18:00',
    timeScale: { slotCount: 3 },
    allowOverlap: false,
    views: [
      { option: 'Day' },
      { option: 'Week' },
      { option: 'Agenda', eventTemplate: agendaTemplate }
    ],
    eventSettings: {
      dataSource: eventdata,
      fields: {
        id: 'Id',
        subject: { name: 'Subject' },
        location: { name: 'Title', title: 'Event' },
        description: { name: 'Capacity', title: 'Participants Count' },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } }
      }
    },
    group: { resources: ['Rooms'] },
    resources: [{
      field: 'RoomId',
      title: 'Rooms',
      name: 'Rooms',
      dataSource: rooms,
      textField: 'RoomName',
      idField: 'RoomId',
      colorField: 'RoomColor'
    }],
    resourceHeaderTemplate: resourceHeaderTemplate,
    quickInfoTemplates: {
      header: quickInfoHeader,
      content: quickInfoContent
    },
    popupOpen: onPopupOpen,
    eventRendered: onEventRendered,
    cellClick: onCellClick,
    popupClose: onPopupClose,
    actionComplete: onActionComplete
  });

  let dropDownList = new DropDownList({
    dataSource: unPlannedEventsList,
    fields: { text: 'name', value: 'id' },
    value: '0',
    change: onUnplannedEventSelect
  });

  let treeViewAll = new TreeView({
    cssClass: 'event-management-treeview',
    fields: allUnplannedEventsTreeFields,
    nodeTemplate: '#treeTemplate',
    dragArea: '.event-management-wrapper',
    allowDragAndDrop: true,
    nodeDragStart: onTreeDragStart,
    nodeDragging: onTreeDragging,
    nodeDragStop: onTreeDragStop
  });

  let treeViewCloudSecurity = new TreeView({
    cssClass: 'event-management-treeview',
    fields: unplannedEvent1TreeFields,
    nodeTemplate: '#treeTemplate',
    dragArea: '.event-management-wrapper',
    allowDragAndDrop: true,
    nodeDragStart: onTreeDragStart,
    nodeDragging: onTreeDragging,
    nodeDragStop: onTreeDragStop
  });

  let treeViewAI = new TreeView({
    cssClass: 'event-management-treeview',
    fields: unplannedEvent2TreeFields,
    nodeTemplate: '#treeTemplate',
    dragArea: '.event-management-wrapper',
    allowDragAndDrop: true,
    nodeDragStart: onTreeDragStart,
    nodeDragging: onTreeDragging,
    nodeDragStop: onTreeDragStop
  });

  let alertDialog = new Dialog({
    cssClass: 'alert-dialog',
    isModal: true,
    header: 'Notice',
    height: '240px',
    width: '335px',
    showCloseIcon: true,
    animationSettings: { effect: 'None' },
    visible: false,
    buttons: [{
      click: dlgButtonClick,
      buttonModel: { content: 'OK', isPrimary: true }
    }],
    target: '#target'
  });

  const intl: Internationalization = new Internationalization();
  let isDraggedItemDropped: boolean = false;
  let draggedItemId: number;
  let draggedItemSpeakers: object[];
  let draggedItemDescription: string;
  let selectedUnplannedEventItem: number = 0;

  function onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'toolBarItemRendered') {
      let btnObj: DropDownButton = new DropDownButton({
        items: printExportItems,
        select: handlePrintExportSelect,
        iconCss: 'e-icons e-print-export',
        cssClass: 'e-caret-hide e-tbar-btn'
      });
      btnObj.appendTo('#printExportBtn');
      const container: HTMLElement | null = document.querySelector('#roomFilterDropdown');

      if (container) {
          const existingInstance = (container as any).ej2_instances?.[0] as DropDownList | undefined;

          if (existingInstance) {
              existingInstance.destroy();
              container.innerHTML = '';
          }

          const dropDownOptions: DropDownListModel = {
              dataSource: roomsData,
              fields: { text: 'RoomName', value: 'RoomId' },
              value: 0,
              valueTemplate: '#roomValueTemplate',
              change: onRoomChange
          };

          const roomDropDown: DropDownList = new DropDownList(dropDownOptions);
          roomDropDown.appendTo(container);
      }
    }
  }

  function dlgButtonClick(): void {
    alertDialog.hide();
  }

  function onTreeDragStart(): void {
    document.body.classList.add('e-disble-not-allowed');
  }

  function onTreeDragging(event: DragAndDropEventArgs): void {
    document.body.classList.add('tree-item-dragging');

    if (scheduleObj.isAdaptive) {
      const classElement = scheduleObj.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if ((event.target as HTMLElement).classList.contains('e-work-cells')) {
        (event.target as HTMLElement).classList.add('e-device-hover');
      }
    }

    if ((event.target as HTMLElement).classList.contains('e-work-cells')) {
      (event.target as HTMLElement).classList.remove('not-allowed-cursor');
    } else {
      (event.target as HTMLElement).classList.add('not-allowed-cursor');
    }
  }

  function onTreeDragStop(event: DragAndDropEventArgs): void {
    document.body.classList.remove('tree-item-dragging');

    document.querySelectorAll('.not-allowed-cursor').forEach(el =>
      el.classList.remove('not-allowed-cursor')
    );

    const treeviewElement = closest(event.target as Element, '.e-treeview');
    const classElement = scheduleObj.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }

    if (!treeviewElement) {
      event.cancel = true;
      const scheduleElement = closest(event.target as Element, '.e-content-wrap');
      if (scheduleElement) {
        const treeviewData = treeViewAll.fields.dataSource as Record<string, any>[];
        if ((event.target as HTMLElement).classList.contains('e-work-cells')) {
          const draggedId = parseInt(event.draggedNodeData.id as string, 10);
          const filteredData = treeviewData.filter((item: any) => item.Id === draggedId);

          if (filteredData.length === 0) return;

          const { Subject, Capacity, Speakers, Description, Duration, EventType, TargetAudience, EventLevel, EventTags, Title } = filteredData[0];
          const cellData: CellClickEventArgs = scheduleObj.getCellDetails(event.target as Element);
          const StartTime = cellData.startTime;
          let EndTime: Date;

          const [durationValue, durationUnit] = Duration.split(' ');
          const copyStartTime = new Date(StartTime);

          if (durationUnit === 'hour' || durationUnit === 'hours') {
            copyStartTime.setHours(copyStartTime.getHours() + parseInt(durationValue));
          } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
            copyStartTime.setMinutes(copyStartTime.getMinutes() + parseInt(durationValue));
          }
          EndTime = copyStartTime;

          const resourceDetails = scheduleObj.getResourcesByIndex(cellData.groupIndex);
          const roomId = resourceDetails.resourceData.RoomId;
          const isRoomFiltered = (scheduleObj.resourceCollection[0].dataSource as any[]).length === 1;
          const isRoomAvailable = scheduleObj.isSlotAvailable(StartTime, EndTime, !isRoomFiltered ? roomId - 1 : 0);
          const isCapacityAvailable = checkRoomCapacity(Capacity, roomId);

          if (!isRoomAvailable || !isCapacityAvailable) {
            alertDialog.content = !isRoomAvailable
              ? 'This room is already booked for this time slot. Please select a different room or time.'
              : 'This room cannot accommodate the stated number of attendees. Please select a room with a suitable capacity.';
            alertDialog.show();
            return;
          }

          const eventData = {
            Subject,
            Title,
            StartTime,
            EndTime,
            RoomId: roomId,
            Capacity,
            Duration,
            EventType,
            TargetAudience,
            EventLevel,
            EventTags
          };

          isDraggedItemDropped = true;
          draggedItemId = draggedId;
          draggedItemSpeakers = Speakers;
          draggedItemDescription = Description;

          scheduleObj.openEditor(eventData, 'Add', true);
        }
      }
    }

    document.body.classList.remove('e-disble-not-allowed');
  }

  function checkRoomCapacity(capacity: number, roomId: number): boolean {
    const room = rooms.find(r => r.RoomId === roomId);
    return room && room.RoomCapacity >= capacity;
  }

  function onPopupClose(args: PopupCloseEventArgs): void {
    if (args.type === 'Editor') {
      const targetElement: HTMLElement = args.event?.target as HTMLElement;
      const isSaveAction: boolean = targetElement?.classList.contains('e-event-save') || targetElement?.classList.contains('e-save-icon');

      if (isSaveAction) {
        const roomId: number = args.data.RoomId;
        const startTime: Date = args.data.StartTime;
        const endTime: Date = args.data.EndTime;
        const capacity: number = args.data.Capacity;

        const isRoomFiltered: boolean = (scheduleObj.resourceCollection[0].dataSource as Record<string, any>[]).length === 1;

        const isRoomAvailable: boolean = scheduleObj.isSlotAvailable(startTime, endTime, !isRoomFiltered ? roomId - 1 : 0) &&
          startTime.getHours() >= 8 &&
          (endTime.getHours() < 18 || (endTime.getHours() === 18 && endTime.getMinutes() === 0));

        const isCapacityAvailable: boolean = checkRoomCapacity(capacity, roomId);

        if (!isRoomAvailable) {
          const timeElement: Element = args.element.querySelector('.e-start-end-row');
          if (!args.element.querySelector('.time-alert')) {
            const newDiv: HTMLElement = document.createElement('div');
            newDiv.classList.add('time-alert');
            newDiv.textContent = 'Select an open time between 8 a.m. and 6 p.m.';
            timeElement.insertAdjacentElement('afterend', newDiv);
          }
        } else {
          const timeAlert = args.element.querySelector('.time-alert');
          if (timeAlert) timeAlert.remove();
        }

        if (!isCapacityAvailable) {
          const descElement: Element = args.element.querySelector('.e-description-row');
          if (!args.element.querySelector('.capacity-alert')) {
            const newDiv: HTMLElement = document.createElement('div');
            newDiv.classList.add('capacity-alert');
            newDiv.textContent = "Number of participants exceeds the room's limit.";
            descElement.insertAdjacentElement('afterend', newDiv);
          }
        } else {
          const capAlert = args.element.querySelector('.capacity-alert');
          if (capAlert) capAlert.remove();
        }

        if (!isRoomAvailable || !isCapacityAvailable) {
          args.cancel = true;
          return;
        }

        const unplannedTreeViews = [treeViewAll, treeViewCloudSecurity, treeViewAI];
        const activeTreeView = unplannedTreeViews[selectedUnplannedEventItem];

        const treeData = activeTreeView.fields.dataSource as Record<string, any>[];
        const updatedData = treeData.filter(item => item.Id !== draggedItemId);

        activeTreeView.fields.dataSource = updatedData;
        allUnplannedEventsData = allUnplannedEventsData.filter(item => item.Id !== draggedItemId);

        handleEmptyDataSourceDisplay(activeTreeView, updatedData);

        args.data.Speakers = draggedItemSpeakers;
        args.data.Description = draggedItemDescription;
      }

      isDraggedItemDropped = false;
    }
  }

  function toggleUnplannedEventsElement(args: ActionEventArgs): void {
    const settingsPanel: HTMLElement = document.querySelector('.unplanned-events-container') as HTMLElement;

    const toggleButton: HTMLElement = scheduleObj.element.querySelector('.e-show-unplanned-events') ||
      scheduleObj.element.querySelector('.e-hide-unplanned-events') as HTMLElement;

    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-hide-unplanned-events', 'e-show-unplanned-events');
    } else {
      addClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-show-unplanned-events', 'e-hide-unplanned-events');
    }
  }

  function resourceHeaderTemplate(props: any): string {
    return `
      <div class="template-wrap">
          <div class="resource-detail">
            <div class="resource-name">${getRoomName(props)}</div>
            <div class="capacity-wrap">
              <span class='e-icons e-capacity-icon'></span>
              <span class='e-capacity'>${getRoomCapacity(props.resourceData.RoomCapacity.toString())}</span>
            </div>
          </div>
        </div>`;
  }

  function getRoomName(value: any): string {
    if (value.resourceData && value.resource && value.resource.textField) {
      return value.resourceData[value.resource.textField];
    } else {
      return value.resourceName;
    }
  }

  function getRoomCapacity(capacity: string | number): string {
    return 'Capacity - ' + capacity;
  }

  function quickInfoHeader(props: Record<string, any>): string {
    return `
    <div class="e-event-header e-popup-header">
        <div class="e-header-icon-wrapper">
          <button id="close" class="e-close e-icons" title="CLOSE"/>
        </div>
        <div class="quick-info-header-content" style="${getQuickInfoHeaderStyle(props)}">
          <div class="quick-info-title">${props.Subject}</div>
          <div class="duration-text">${getQuickInfoDurationText(props)}</div>
        </div>
      </div>`;
  }

  function quickInfoContent(props: Record<string, any>): string {
    let room: string = '';

    if (props.elementType !== 'cell') {
      const matchedRoom = rooms.find((room: { RoomId: number }) => room.RoomId === props.RoomId);
      room = matchedRoom ? matchedRoom.RoomName : '';
    }

    let speakersContent = '';

    if (props.Speakers && props.Speakers.length > 0) {
      const label = props.Speakers.length > 1 ? 'Speakers' : 'Speaker';
      const speakersFormatted = props.Speakers.map((speaker: any, index: number) => {
        const suffix = index < props.Speakers.length - 1
          ? (index === props.Speakers.length - 2 ? ' and ' : ', ')
          : '';
        return `${speaker.Name} (${speaker.Title})${suffix}`;
      }).join('');

      speakersContent = `
        <div class="e-speaker e-content-item">
            <label>${label}</label><span class="colon">:</span>
            <span class="e-content">${speakersFormatted}</span>
        </div>`;
    }

    return `
    <div class="quick-info-content">
        <div class="event-content">
            <div class="e-room e-content-item">
                <label>Room</label><span class="colon">:</span>
                <span class="e-content">${room}</span>
            </div>
            <div class="e-event e-content-item">
                <label>Event</label><span class="colon">:</span>
                <span class="e-content">${props.Title}</span>
            </div>
            ${speakersContent}
            <div class="e-count e-content-item">
                <label>Participant count</label><span class="colon">:</span>
                <span class="e-content">${props.Capacity}</span>
            </div>
        </div>
    </div>`;
  }

  function getResourceData(roomId: number): Record<string, any> {
    const resources: ResourcesModel = scheduleObj.getResourceCollections().slice(-1)[0];
    return (resources.dataSource as any[]).find(r => r.RoomId === roomId);
  }

  function getQuickInfoHeaderStyle(data: any): string {
    const resourceData = getResourceData(data.RoomId);
    return `background: ${resourceData.RoomColor}; color: #FFFFFF;`;
  }

  function getQuickInfoDurationText(data: Record<string, any>): string {
    return intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
      intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
  }

  function onPopupOpen(args: PopupOpenEventArgs): void {
    const isQuickInfoPopup: boolean = args.type === 'QuickInfo' || args.type === 'ViewEventInfo';
    const isEditorPopup: boolean = args.type === 'Editor';
    const isBreakEvent: boolean = (args.target as HTMLElement)?.classList?.contains('e-break-event');

    if ((isQuickInfoPopup && isBreakEvent) || (isEditorPopup && !isDraggedItemDropped)) {
      args.cancel = true;
      return;
    }

    if (isQuickInfoPopup) {
      args.element.classList.add('event-management-quick-popup');
    }

    if (isEditorPopup) {
      args.element.classList.add('event-management-editor-popup');

      const capacityAlert = args.element.querySelector('.capacity-alert');
      const timeAlert = args.element.querySelector('.time-alert');
      if (capacityAlert) capacityAlert.remove();
      if (timeAlert) timeAlert.remove();

      const startTimeElement = args.element.querySelector('.e-start-end-row .e-start.e-control.e-datetimepicker') as HTMLElement;
      const endTimeElement = args.element.querySelector('.e-start-end-row .e-end.e-control.e-datetimepicker') as HTMLElement;

      if (startTimeElement && endTimeElement) {
        const startPicker = (startTimeElement as any).ej2_instances?.[0] as DateTimePicker;
        const endPicker = (endTimeElement as any).ej2_instances?.[0] as DateTimePicker;

        if (startPicker && endPicker) {
          startPicker.change = () => {
            const startTime: Date = new Date(startPicker.value as Date);

            if (args.data && args.data['Duration']) {
              const durationText: string = args.data['Duration'];
              const match = durationText.match(/(\d+)\s+(hour|hours|minute|minutes)/i);

              if (match) {
                const durationVal = parseInt(match[1], 10);
                const unit = match[2].toLowerCase();
                const newEnd = new Date(startTime);

                if (unit === 'hour' || unit === 'hours') {
                  newEnd.setHours(newEnd.getHours() + durationVal);
                } else if (unit === 'minute' || unit === 'minutes') {
                  newEnd.setMinutes(newEnd.getMinutes() + durationVal);
                }
                endPicker.value = newEnd;
              }
            }
          };
        }
      }
    }
  }

  function onEventRendered(args: EventRenderedArgs): void {
    const data: Record<string, any> = args.data;
    const subject: string = data.Subject?.toLowerCase() || '';

    const isBreakEvent: boolean = subject.includes('break') || subject.includes('lunch');

    if (isBreakEvent) {
      const element: HTMLElement = args.element as HTMLElement;

      if (element.classList.contains('e-agenda-item')) {
        const appointmentElem = element.querySelector('.e-appointment');
        if (appointmentElem) {
          appointmentElem.classList.add('e-break-event');
        }
      } else {
        element.classList.add('e-break-event');
      }
    }
  }

  function onCellClick(args: CellClickEventArgs): void {
    args.cancel = true;
  }

  function getTimeString(value: Date): string {
    return intl.formatDate(value, { type: 'time', skeleton: 'short' });
  }

  function agendaTemplate(props: Record<string, any>): string {
    const isBreak = props.Subject.toLowerCase().includes('break') || props.Subject.toLowerCase().includes('lunch');

    const speakerTemplate = props.Speakers && props.Speakers.length > 0 ? `
      <div class="event-speaker">
        <div class="separator-line"></div>
        <label>${props.Speakers.length > 1 ? 'Speakers' : 'Speaker'}</label>
        ${props.Speakers.map((speaker: Record<string, any>) => `
          <div class="speaker-details">
            <div class="speaker-image">${speaker.Name.charAt(0)}</div>
            <div class="speaker-info">
              <div class="speaker-name">${speaker.Name}</div>
              <div class="speaker-title">${speaker.Title}</div>
              <div class="speaker-note">${speaker.Note}</div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const durationAudience = !isBreak ? `
      <div class="event-duration-audience">
        <div class="event-duration">
          <span class="e-icons e-duration-icon"></span>
          <span class="e-duration">${getTimeString(props.StartTime)} - ${getTimeString(props.EndTime)}</span>
        </div>
        <div class="event-audience">
          <span class="e-icons e-audience-icon"></span>
          <span class="e-audience-count">Audience : ${props.Capacity}</span>
        </div>
      </div>
    ` : '';

    return `
      <div class="agenda-event">
        <div class="event-subject">${props.Subject}</div>
        <div class="event-description">${props.Description}</div>
        ${durationAudience}
        ${speakerTemplate}
      </div>
    `;
  }

  function onRoomChange(e: ChangeEventArgs): void {
    const value: number = e.value as number;
    const previousItemData: any = e.previousItemData;
    if (!previousItemData) return;

    if (value === 0) {
      scheduleObj.removeResource(previousItemData.RoomId, 'Rooms');
      scheduleObj.addResource(rooms, 'Rooms', value);
    } else {
      if (previousItemData.RoomId === 0) {
        const toRemove = rooms.filter((room) => room.RoomId !== value);
        toRemove.forEach((room) => {
          scheduleObj.removeResource(room.RoomId, 'Rooms');
        });
      } else {
        scheduleObj.removeResource(previousItemData.RoomId, 'Rooms');
        const selectedRoom = rooms.find((room) => room.RoomId === value);
        if (selectedRoom) {
          scheduleObj.addResource(selectedRoom, 'Rooms', value);
        }
      }
    }
  }

  function handlePrintExportSelect(args: MenuEventArgs): void {
    switch (args.item.id) {
      case 'print':
        document.querySelectorAll('.toolbar-post-agenda').forEach(item => {
          (item as HTMLElement).style.display = 'none';
        });
        scheduleObj.print();  
        setTimeout(() => {
          document.querySelectorAll('.toolbar-post-agenda').forEach(item => {
            (item as HTMLElement).style.display = 'inline-block';
          });
        }, 1000);
        break;
      case 'export':
        const exportOptions = {
          fields: ['Id', 'Subject', 'Title', 'StartTime', 'EndTime', 'RoomId', 'Capacity']
        };
        scheduleObj.exportToExcel(exportOptions);
        break;
    }
  }

  function onUnplannedEventSelect(args: ChangeEventArgs): void {
    const treeViewRefs = [treeViewAll, treeViewCloudSecurity, treeViewAI];
    const previouslySelectedItem = parseInt((args.previousItemData as any).id, 10);
    selectedUnplannedEventItem = parseInt(args.value as any, 10);

    treeViewRefs[previouslySelectedItem].element.style.display = 'none';

    const currentTreeView = treeViewRefs[selectedUnplannedEventItem];
    currentTreeView.element.style.display = '';

    if (selectedUnplannedEventItem === 0) {
      currentTreeView.fields = {
        ...currentTreeView.fields,
        dataSource: allUnplannedEventsData
      };
    } else {
      const filteredData = unplannedEventsUpdatedData(allUnplannedEventsData, unplannedEvents[selectedUnplannedEventItem]);
      currentTreeView.fields = {
        ...currentTreeView.fields,
        dataSource: filteredData
      };
    }

    const newDataSource = currentTreeView.fields.dataSource as Record<string, any>[];
    handleEmptyDataSourceDisplay(currentTreeView, newDataSource);
  }

  function unplannedEventsUpdatedData(dataSource: Record<string, any>[], value: string): Record<string, any>[] {
    return dataSource.filter((data) => data.Title === value);
  }

  function handleEmptyDataSourceDisplay(treeView: TreeView, dataSource: Record<string, any>[]): void {
    const noEventsElement: HTMLElement = document.querySelector('.no-events-message') as HTMLElement;
    if (!noEventsElement) return;

    if (isDataSourceEmpty(dataSource)) {
      treeView.element.style.display = 'none';
      noEventsElement.classList.remove('hidden');
    } else {
      treeView.element.style.display = 'block';
      noEventsElement.classList.add('hidden');
    }
  }

  function isDataSourceEmpty(dataSource: Record<string, any>[]): boolean {
    return !dataSource || dataSource.length === 0;
  }

  scheduleObj.appendTo('#Schedule');
  dropDownList.appendTo('#unplannedEventDropdown');
  treeViewAll.appendTo('#treeViewAll');
  treeViewCloudSecurity.appendTo('#treeViewCloudSecurity');
  treeViewAI.appendTo('#treeViewAI');
  alertDialog.appendTo('#modalDialog');
};