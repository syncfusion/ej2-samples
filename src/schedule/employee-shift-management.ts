import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, TimelineViews, Resize, DragAndDrop, CellClickEventArgs, Agenda, TimeScaleModel, EventClickArgs, PopupCloseEventArgs, NavigatingEventArgs, ResizeEventArgs, ActionEventArgs, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { DropDownList, ChangeEventArgs as DropDownChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { DragAndDropEventArgs, Toolbar, TreeView } from '@syncfusion/ej2-navigations';
import { closest, extend } from '@syncfusion/ej2-base';
import { Internationalization, DateFormatOptions } from '@syncfusion/ej2-base';
import { AnimationSettingsModel, Dialog, Tooltip, TooltipModel, ButtonPropsModel } from '@syncfusion/ej2-popups';
import { Button, ChipList } from '@syncfusion/ej2/buttons';

Schedule.Inject(TimelineViews, Agenda, Resize, DragAndDrop);
(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleObj: Schedule;
    let currentChipIndex: number = 0;
    let previousChipIndex: number = 0;
    let isDraggedItemDropped: boolean = false;
    let draggedItemId: string = '';
    let treeInstances: TreeView[] = [];
    let requestedShift: { id: string; name: string };
    let shiftDDL: DropDownList;
    let employeeDDL: DropDownList;
    let dropdownListObj: DropDownList;
    let dialogObj: Dialog;
    let selectedChipIndex = 0;
    let selectedDropdownValue: string | null = null;
    let allowDragAndDrop: boolean = true;
    let toolbarChipsRef: { current: ChipList | null } = { current: null };
    let allStaffsTreeview: TreeView;
    let doctorsTreeview: TreeView;
    let nursesTreeview: TreeView;
    let staffsTreeview: TreeView;
    let shiftsData: ShiftOption[] = [];
    let employeeNamesList: EmployeeOption[] = [];
    let selectedEmployee: EmployeeOption | null = null;
    let selectedShift: ShiftOption | null = null;
    const intl: Internationalization = new Internationalization();
    type EventClickHandler = (e: Event) => void;
    const tooltipInstances: Tooltip[] = [];
    interface AgendaTemplateProps {
        Subject: string;
        RoleId: string;
        DesignationId: string;
        Description: string;
        StartTime: Date;
        EndTime: Date;
    }
    interface EmployeeOption {
        id: string;
        name: string;
        employeeId: string;
    }
    interface ShiftOption {
        id: number;
        name: string;
        designationId: string;
        employeeId: string;
        eventId: string;
    }
    interface ShiftEventData {
        Id?: number;
        Subject: string;
        Description: string;
        StartTime: Date;
        EndTime: Date;
        [key: string]: any;
    }
    interface EmployeeRole {
        role: string;
        id: number;
    }
    interface Designation {
        name: string;
        id: number;
        groupId: number;
    }
    interface RequestShiftSwapArgs {
        element: HTMLElement;
        data: ShiftEventData
    }
    interface ChipBeforeClickArgs {
        index: number;
        cancel?: boolean;
    }
    interface EmployeeImage {
        name: string;
        image: string;
    }
    interface StaffMember {
        Id: number;
        Name: string;
        Description: string;
        role: string;
        ImageSrc?: string;
        [key: string]: any;
    }

    interface EventProps {
        Subject: string;
        Description: string;
        StartTime: Date;
        EndTime: Date;
        [key: string]: any;
    }

    interface EmployeeImage {
        name: string;
        image: string;
    }
    interface MajorSlotArgs {
        date: Date;
        groupIndex?: number;
    }

    const employeeRole: EmployeeRole[] = [
        { role: 'Doctors', id: 1 },
        { role: 'Nurses', id: 2 },
        { role: 'Support Staffs', id: 3 }
    ];

    const designationsData: Designation[] = [
        { name: 'Attending Physician', id: 1, groupId: 1 },
        { name: 'Hospitalist', id: 2, groupId: 1 },
        { name: 'General Pediatrician', id: 3, groupId: 1 },
        { name: 'Resident Doctor', id: 4, groupId: 1 },
        { name: 'Senior Nurse', id: 5, groupId: 2 },
        { name: 'Nurse Practitioner', id: 6, groupId: 2 },
        { name: 'Medical Assistant', id: 7, groupId: 3 },
        { name: 'Receptionist', id: 8, groupId: 3 }
    ];

    const imagePath: string = 'src/schedule/images/';
    const salamanImage: string = `${imagePath}salman@3x.png`;
    const brianImage: string = `${imagePath}brian@3x.png`;
    const jakeImage: string = `${imagePath}jake@3x.png`;
    const jenniferImage: string = `${imagePath}Jennifer.png`;
    const davidImage: string = `${imagePath}David.png`;
    const williammImage: string = `${imagePath}William.png`;
    const emmaImage: string = `${imagePath}Emma.png`;
    const lilyImage: string = `${imagePath}Lily.png`;
    const avaImage: string = `${imagePath}Ava.png`;
    const graceImage: string = `${imagePath}Grace.png`;
    const michaelImage: string = `${imagePath}Michael.png`;
    const thomasImage: string = `${imagePath}Thomas.png`;
    const rickyImage: string = `${imagePath}Ricky.png`;
    const jamesImage: string = `${imagePath}James.png`;
    const benjaminImage: string = `${imagePath}Benjamin.png`;
    const oliviaImage: string = `${imagePath}Olivia.png`;
    const chloeImage: string = `${imagePath}Chloe.png`;


    const employeeImages: EmployeeImage[] = [
        { name: 'John', image: `${imagePath}robert.png` },
        { name: 'Nashil', image: `${imagePath}nancy.png` },
        { name: 'Jennifer', image: jenniferImage },
        { name: 'William', image: williammImage },
        { name: 'David', image: davidImage },
        { name: 'Michael', image: michaelImage },
        { name: 'Thomas', image: thomasImage },
        { name: 'Daniel', image: `${imagePath}robson.png` },
        { name: 'Mark', image: `${imagePath}will-smith.png` },
        { name: 'Brian', image: brianImage },
        { name: 'Kevin', image: `${imagePath}alice.png` },
        { name: 'Salman', image: salamanImage },
        { name: 'Emma', image: emmaImage },
        { name: 'Lily', image: lilyImage },
        { name: 'Ava', image: avaImage },
        { name: 'Grace', image: graceImage },
        { name: 'Zoe', image: `${imagePath}laura.png` },
        { name: 'James', image: jamesImage },
        { name: 'Benjamin', image: benjaminImage },
        { name: 'Olivia', image: oliviaImage },
        { name: 'Chloe', image: chloeImage },
        { name: 'Ricky', image: rickyImage },
        { name: 'Jake', image: jakeImage }
    ];

    // Doctors data
    const doctorsData: StaffMember[] = [
        { Id: 1, Name: "Mark", Description: 'Attending Physician', role: 'Doctors' },
        { Id: 2, Name: "Brian", Description: 'Hospitalist', role: 'Doctors' },
        { Id: 3, Name: "Kevin", Description: 'General Pediatrician', role: 'Doctors' },
        { Id: 4, Name: "Salman", Description: 'Resident Doctor', role: 'Doctors' }
    ];

    // Nurses data
    const nursesData: StaffMember[] = [
        { Id: 5, Name: "Olivia", Description: 'Senior Nurse', role: 'Nurses' },
        { Id: 6, Name: "Zoe", Description: 'Nurse Practitioner', role: 'Nurses' }
    ];

    // Support Staffs data
    const staffsData: StaffMember[] = [
        { Id: 7, Name: "Ricky", Description: 'Medical Assistant', role: 'Support Staffs' },
        { Id: 8, Name: "Jake", Description: 'Receptionist', role: 'Support Staffs' }
    ];

    // Combine all data
    let allData: StaffMember[] = doctorsData.concat(nursesData, staffsData);
    // TreeView field settings
    const allStaffsTreeFields = { dataSource: allData, id: 'Id', text: 'Name' };
    const doctorsTreeFields = { dataSource: doctorsData, id: 'Id', text: 'Name' };
    const nursesTreeFields = { dataSource: nursesData, id: 'Id', text: 'Name' };
    const staffsTreeFields = { dataSource: staffsData, id: 'Id', text: 'Name' };
    const defaultImage = `${imagePath}default.png`;

    const employeeImageMap: Record<string, string> = employeeImages.reduce((map, emp) => {
        map[emp.name.toLowerCase()] = emp.image;
        return map;
    }, {} as Record<string, string>);

    // Update ImageSrc for all staff members in allData array
    allData.forEach((staff: StaffMember) => {
        const key = staff.Name.trim().toLowerCase();
        staff.ImageSrc = employeeImageMap[key] || defaultImage;
    });

    const getEventElement = (props: EventProps, element: HTMLElement): HTMLElement => {
        const { Subject = '', Description = '', StartTime, EndTime } = props;
        const isSwappedEvent: boolean = Subject.includes('swapped');
        const isLeaveReplacedEvent: boolean = Subject.includes('covers for');
        const isLeave: boolean = Description.toLowerCase().includes('leave') && !isLeaveReplacedEvent;
        // Determine the employee name
        const employeeName: string = isLeaveReplacedEvent ? Subject.split('covers for')[0].trim() : isSwappedEvent ? (Subject.match(/with ([A-Za-z]+)'s shift/)?.[1] ?? '') : Subject;

        // Find matching image
        const matchedEmployee: EmployeeImage[] = employeeImages.filter(item =>
            item.name === employeeName
        );
        const imageUrl: string | undefined = matchedEmployee[0]?.image;
        const templateWrap = document.createElement('div');
        templateWrap.className = 'template-wrap';
        const staffWrap = document.createElement('div');
        staffWrap.className = 'e-staff';
        const staffImage = document.createElement('img');
        staffImage.className = 'staff-image';
        if (imageUrl) {
            staffImage.src = imageUrl;
        }

        const staffInfo = document.createElement('div');
        staffInfo.className = 'staff-info';
        const nameElement = document.createElement('div');
        nameElement.className = 'e-name';
        nameElement.innerHTML = isLeave ? Description.split('(')[0].trim() : employeeName;
        const designation = document.createElement('div');
        designation.className = 'e-designation';
        designation.textContent = `${getTimeString(StartTime)} - ${getTimeString(EndTime)}`;
        staffInfo.append(nameElement, designation);
        staffWrap.append(staffImage, staffInfo);
        templateWrap.append(staffWrap);
        return templateWrap;
    };

    function onEventRendered(args: EventRenderedArgs): void {
        const data = args.data as ShiftEventData;
        const element = args.element as HTMLElement;
        const startHour = new Date(data.StartTime).getHours();
        element.classList.add(startHour === 7 ? 'morning-shift' : 'evening-shift');
        const innerWrap = element.querySelector<HTMLElement>('.e-inner-wrap');
        if (innerWrap) {
            innerWrap.innerHTML = '';
            const elementToAppend = getEventElement(data, element);
            const appointmentWidth = parseInt(element.style.width.split('px')[0], 10) - 5;
            element.style.width = appointmentWidth + 'px';
            innerWrap.appendChild(elementToAppend);
            if (!element.classList.contains('e-read-only')) {
                const groupIndex = parseInt(element.getAttribute('data-group-index') || '0', 10);
                const classToAdd =
                    groupIndex === 0 ? 'doctors-event' : groupIndex === 1 ? 'nurses-event' : 'staffs-event';
                element.classList.add(classToAdd);
            }
        }

        function appendTooltipIcon(
            element: HTMLElement,
            iconClass: string,
            tooltipText: string,
            onClick?: EventClickHandler
        ): void {
            let iconContainer = element.querySelector<HTMLElement>('.e-icon-element');
            if (!iconContainer) {
                iconContainer = document.createElement('span');
                iconContainer.className = 'e-icon-element';
                element.appendChild(iconContainer);
            }
            const icon = document.createElement('span');
            icon.className = `e-icons ${iconClass}`;
            icon.style.cursor = 'pointer';
            if (onClick) {
                icon.addEventListener('click', (e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick(e);
                });
            }
            iconContainer.appendChild(icon);

            const tooltipOptions: TooltipModel = {
                cssClass: 'shift-management-tooltip',
                content: tooltipText,
                position: 'RightCenter',
                opensOn: 'Hover'
            };
            const tooltip = new Tooltip(tooltipOptions, icon);
            tooltipInstances.push(tooltip);
        }

        // Add custom tooltip icons based on event status
        if (data.Description?.toLowerCase().includes('leave')) {
            element.classList.add('event-leave');
            if (scheduleObj.currentView !== 'Agenda') {
                appendTooltipIcon(
                    element,
                    'e-leave',
                    `${data.Subject} is on leave. To cover this shift, drag a staff member with the same designation from the available list and drop them here.`
                );
            }
        }

        if (data.Subject?.includes('covers for')) {
            element.classList.add('e-covers');
            element.classList.remove('event-leave');
            if (scheduleObj.currentView !== 'Agenda') {
                appendTooltipIcon(
                    element,
                    'e-replaced sf-icon-user-replace',
                    'Leave covered by replacement'
                );
            }
        }

        if (
            data.Description?.toLowerCase().includes('swap-request') &&
            !data.Subject?.toLowerCase().includes('swapped') &&
            scheduleObj.currentView !== 'Agenda'
        ) {
            element.classList.add('event-swap');
            appendTooltipIcon(
                element,
                'e-swap sf-icon-replace-request',
                'Click here to swap shift',
                (e: Event) => onSwapIconClick(e, element, data)
            );
        }

        if (data.Subject?.toLowerCase().includes('swapped')) {
            element.classList.remove('event-swap');
            element.classList.add('event-swapped');
            if (scheduleObj.currentView !== 'Agenda') {
                appendTooltipIcon(
                    element,
                    'e-swapped sf-icon-replace-accepted',
                    'This shift has been swapped'
                );
            }
        }
    }
    function onSwapIconClick(
        event: Event,
        element: HTMLElement,
        data: ShiftEventData
    ): void {
        event.preventDefault();
        event.stopPropagation();
        data.swapRequested = true;
        scheduleObj.saveEvent(data, 'Add');
        scheduleObj.refreshEvents();
        requestShiftSwap({ element, data });
    }

    function onPopupOpen(args: { type: string; cancel: boolean; element: HTMLElement }): void {
        const isEditorPopup: boolean = args.type === 'Editor';
        if (isEditorPopup) {
            if (!isDraggedItemDropped) {
                args.cancel = true;
                return;
            }
            args.element.classList.add('shift-management-editor-popup');
        }
    }

  function onPopupClose(args: PopupCloseEventArgs): void {
  if (args.type === 'Editor') {
    const target = args.event?.target as HTMLElement | null;

    target?.classList.contains('e-event-save') && isDraggedItemDropped && draggedItemId && (() => {
      const treeObj = treeInstances[previousChipIndex];
      const draggedId = parseInt(draggedItemId, 10);
      const dataSource = treeObj.fields.dataSource as StaffMember[];

      // Remove the dragged item from tree view data source
      treeObj.fields.dataSource = dataSource.filter(item => item.Id !== draggedId);
      treeObj.dataBind();

      // Remove from master list
      allData = allData.filter(item => item.Id !== draggedId);

      // Remove drag preview DOM element
      document.querySelectorAll('.e-drag-item.shift-management-treeview')
        .forEach(element => element.remove());

      // Replace 'Leave' with 'Available' in event description
      if (args.data?.Description?.includes('Leave')) {
        args.data.Description = args.data.Description.replace('Leave ', 'Available ');
      }
    })();

    isDraggedItemDropped = false;
  }
}


    // ——— onCellClick equivalent ———
    function onCellClick(args: CellClickEventArgs): void {
        // prevent creating events by clicking cells
        args.cancel = true;
    }

    // ——— onEventClick equivalent ———
    function onEventClick(args: EventClickArgs): void {
        // Guard against an array:
        const element = Array.isArray(args.element) ? args.element[0] : args.element;
        if (element.classList.contains('e-read-only')) {
            args.cancel = true;
        }
    }

    function majorSlotTemplate(props: MajorSlotArgs): string {
        const hour = props.date.getHours();
        return `<div>${hour === 7 ? 'Morning Shift' : 'Evening Shift'}</div>`;
    }

    const timeScale: TimeScaleModel = {
        interval: 480,
        slotCount: 3,
        majorSlotTemplate
    };
    const getTimeString = (value: Date): string => {
        const options: DateFormatOptions = { skeleton: 'h' };
        return intl.formatDate(value, options);
    };

    /**
     * Formats a Date to a short time string (e.g. “3:00 PM”).
     */
    const getShortTimeString = (value: Date): string => {
        const options: DateFormatOptions = { type: 'time', skeleton: 'short' };
        return intl.formatDate(value, options);
    };

    /**
     * Formats a Date to the abbreviated day of week (e.g. “Mon”, “Tue”).
     */
    const getDayString = (value: Date): string => {
        const options: DateFormatOptions = { skeleton: 'E' };
        return intl.formatDate(value, options);
    };

    const onActionComplete = (args: ActionEventArgs): void => {
        const currentView = scheduleObj.currentView;

        if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
            setAgendaContentHeight();
        } else if (args.requestType === 'toolBarItemRendered' && currentView === 'Agenda') {
            createAgendaToolbar();
            setTimeout(() => {
                setAgendaContentHeight();
            });
        }
    };

    scheduleObj = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2025, 2, 5),
        currentView: 'TimelineWeek',
        cssClass: 'schedule-shift-management',
        startHour: '07:00',
        endHour: '23:00',
        workHours: {
            start: '00:00',
            end: '23:59'
        },
        views: [
            { option: 'TimelineWeek' },
            { option: 'Agenda', eventTemplate: agendaTemplate }
        ],
        group: {
            enableCompactView: false,
            resources: ['Role', 'Designation']
        },
        resources: [
            {
                field: 'RoleId', title: 'Department',
                name: 'Role', allowMultiple: false,
                dataSource: [
                    { Text: 'Doctors', Id: 1 },
                    { Text: 'Nurses', Id: 2 },
                    { Text: 'Supporting Staffs', Id: 3 }
                ],
                textField: 'Text', idField: 'Id'
            },
            {
                field: 'DesignationId', title: 'Consultant',
                name: 'Designation', allowMultiple: false,
                dataSource: [
                    { Text: 'Attending Physician', Id: 1, GroupId: 1 },
                    { Text: 'Hospitalist', Id: 2, GroupId: 1 },
                    { Text: 'General Pediatrician', Id: 3, GroupId: 1 },
                    { Text: 'Resident Doctor', Id: 4, GroupId: 1 },
                    { Text: 'Senior Nurse', Id: 5, GroupId: 2 },
                    { Text: 'Nurse Practitioner', Id: 6, GroupId: 2 },
                    { Text: 'Medical Assistant', Id: 7, GroupId: 3 },
                    { Text: 'Receptionist', Id: 8, GroupId: 3 },
                ],
                textField: 'Text', idField: 'Id', groupIDField: 'GroupId'
            }
        ],
        toolbarItems: [
            { align: 'Left', name: 'Previous' },
            { align: 'Left', name: 'Next' },
            { align: 'Left', name: 'DateRangeText' },
            { align: 'Right', name: 'Views' }
        ],
        timeScale: timeScale,
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as Record<string, any>).employeeShiftData, null, true),
            fields: {
                subject: { title: 'Name', name: 'Subject' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' },
                description: { title: 'Reason', name: 'Description' }
            }
        },
        resizeStart: (args: ResizeEventArgs): void => {
            args.cancel = true;
        },
        allowDragAndDrop: false,
        editorHeaderTemplate: '#editorHeaderTemplate',
        eventRendered: onEventRendered,
        popupOpen: onPopupOpen,
        popupClose: onPopupClose,
        cellClick: onCellClick,
        eventClick: onEventClick,
        navigating: onNavigating,
        actionComplete: onActionComplete
    });
    scheduleObj.appendTo('#schedule');

    const handleChipBeforeClick = (
        args: ChipBeforeClickArgs,
        isExternalChipClick?: boolean
    ): void => {
        const current = args.index;
        const selChipsRaw = isExternalChipClick ? externalChipsRef.selectedChips : toolbarChipsRef.current!.selectedChips;
        let previous: number;
        if (Array.isArray(selChipsRaw)) {
            previous = Number(selChipsRaw[0]);
        } else if (typeof selChipsRaw === 'string') {
            previous = Number(selChipsRaw);
        } else {
            previous = selChipsRaw;
        }
        if (current === previous) {
            args.cancel = true;
        }
    };
    function chipClick(args: { index: number; text?: string }): void {
        const chipText = args?.text?.trim();
        if (!chipText) {
            return;
        }
        const newIndex = args.index;
        if (newIndex === -1) return;
        externalChipsRef.selectedChips = [newIndex];
        treeInstances.forEach(tree => {
            if (tree && tree.element) {
                tree.element.style.display = 'none';
            }
        });
        const activeTree = treeInstances[newIndex];
        if (activeTree && activeTree.element) {
            activeTree.element.style.display = '';
            const newData: StaffMember[] = newIndex === 0 ? allData : allData.filter(item =>
                item.role.toLowerCase().includes(chipText.toLowerCase())
            );

            activeTree.setProperties({
                fields: {
                    dataSource: newData,
                    id: 'Id',
                    text: 'Name'
                }
            });
            activeTree.dataBind();
        }
        previousChipIndex = newIndex;
    }
    function onTreeDragStart(args: DragAndDropEventArgs): void {
        draggedItemId = args.draggedNodeData.id as string;
        document.body.classList.add('e-disble-not-allowed');
    }
    function onTreeDragStop(event: DragAndDropEventArgs): void {
        const classElement = event.target.classList.contains('e-device-hover') ? event.target as HTMLElement : closest(event.target as Element, '.e-device-hover') as HTMLElement;
        if (classElement) classElement.classList.remove('e-device-hover');
        event.cancel = true;
        const scheduleElement = closest(event.target as Element, '.e-content-wrap');
        if (!scheduleElement) return;
        const target = closest(event.target as Element, '.e-appointment.event-leave');
        if (!target) return;
        const treeObj = treeInstances[previousChipIndex];
        const draggedId = parseInt((event.draggedNodeData as any).id, 10);
        draggedItemId = draggedId.toString();
        const treeviewData = treeObj.getTreeData() as StaffMember[];
        const draggedItem = treeviewData.find((item) => item.Id === draggedId);
        const eventDetails = { ...scheduleObj.getEventDetails(target) };
        const role = employeeRole.find(item => item.id === parseInt(eventDetails.RoleId, 10))?.role;
        const designation = designationsData.find(item => item.id === parseInt(eventDetails.DesignationId, 10))?.name;
        if (draggedItem && role === draggedItem.role && designation === draggedItem.Description) {
            eventDetails.Subject = `${draggedItem.Name} covers for ${eventDetails.Subject}`;
            eventDetails.Designation = draggedItem.Description;
            isDraggedItemDropped = true;
            scheduleObj.openEditor(eventDetails, 'EditOccurrence');
        }
        document.body.classList.remove('e-disble-not-allowed');
    }

    const externalChipsRef: ChipList = new ChipList({
        selection: 'Single',
        cssClass: 'e-outline',
        selectedChips: [0],
        chips: [
            { text: 'All' },
            { text: 'Doctors' },
            { text: 'Nurses' },
            { text: 'Staffs' }
        ],
        click: chipClick,
        beforeClick: (args) => handleChipBeforeClick(args, true)
    });
    externalChipsRef.appendTo('#chip-avatar');
    toolbarChipsRef.current = externalChipsRef;

    // TreeView: All Staff
    allStaffsTreeview = new TreeView({
        cssClass: 'shift-management-treeview',
        dragArea: '.shift-management-sample-wrapper',
        nodeTemplate: '#treeTemplate',
        fields: allStaffsTreeFields,
        nodeDragStop: onTreeDragStop,
        nodeDragStart: onTreeDragStart,
        allowDragAndDrop: allowDragAndDrop
    });
    allStaffsTreeview.appendTo('#allStaffsTreeview');

    // TreeView: Doctors
    doctorsTreeview = new TreeView({
        cssClass: 'shift-management-treeview',
        dragArea: '.shift-management-sample-wrapper',
        nodeTemplate: '#treeTemplate',
        fields: doctorsTreeFields,
        nodeDragStop: onTreeDragStop,
        nodeDragStart: onTreeDragStart,
        allowDragAndDrop: allowDragAndDrop
    });
    doctorsTreeview.appendTo('#doctorsTreeview');

    // TreeView: Nurses
    nursesTreeview = new TreeView({
        cssClass: 'shift-management-treeview',
        dragArea: '.shift-management-sample-wrapper',
        nodeTemplate: '#treeTemplate',
        fields: nursesTreeFields,
        nodeDragStop: onTreeDragStop,
        nodeDragStart: onTreeDragStart,
        allowDragAndDrop: allowDragAndDrop
    });
    nursesTreeview.appendTo('#nursesTreeview');

    // TreeView: Staffs
    staffsTreeview = new TreeView({
        cssClass: 'shift-management-treeview',
        dragArea: '.shift-management-sample-wrapper',
        nodeTemplate: '#treeTemplate',
        fields: staffsTreeFields,
        nodeDragStop: onTreeDragStop,
        nodeDragStart: onTreeDragStart,
        allowDragAndDrop: allowDragAndDrop
    });
    staffsTreeview.appendTo('#staffsTreeview');
    treeInstances = [
        allStaffsTreeview,
        doctorsTreeview,
        nursesTreeview,
        staffsTreeview
    ];
    function requestShiftSwap(args: RequestShiftSwapArgs): void {
        const eventsData = scheduleObj.eventSettings.dataSource as any[];
        const appointment = args.element.classList.contains('e-appointment') ? args.element : (closest(args.element, '.e-appointment') as HTMLElement);
        if (!eventsData || !appointment) {
            return;
        }
        if (tooltipInstances.length) {
            tooltipInstances.forEach(t => t.destroy && t.destroy());
            tooltipInstances.length = 0;
        }
        const eventDetails = scheduleObj.getEventDetails(appointment) as any;
        if (!eventDetails) { return; }
        const roleId = eventDetails.RoleId as string;
        const designationId = eventDetails.DesignationId as string;
        const employeeName = eventDetails.Subject as string;
        const filtered = eventsData.filter(item =>
            item.Description.toLowerCase().includes('swap-request') &&
            item.RoleId === roleId &&
            item.DesignationId === designationId &&
            item.Subject !== employeeName
        );
        const empList: { id: string; name: string; employeeId: string }[] = [];
        const shiftList: { id: number; name: string; designationId: string; employeeId: string; eventId: string }[] = [];
        filtered.forEach((item, idx) => {
            if (!empList.some(e => e.name === item.Subject)) {
                empList.push({ id: item.DesignationId, name: item.Subject, employeeId: item.EmployeeId });
            }
            shiftList.push({
                id: idx + 1,
                name:
                    intl.formatDate(new Date(item.StartTime), { skeleton: 'MMMd' }) + ' ' +
                    getDayString(new Date(item.StartTime)) + ' ' +
                    getShortTimeString(new Date(item.StartTime)) + ' - ' +
                    getShortTimeString(new Date(item.EndTime)),
                designationId: item.DesignationId,
                employeeId: item.EmployeeId,
                eventId: item.Id
            });
        });
        requestedShift = { id: eventDetails.Id, name: employeeName };
        shiftsData = shiftList;
        employeeNamesList = empList;

        if (employeeDDL) {
            employeeDDL.setProperties({
                dataSource: employeeNamesList as unknown as { [key: string]: Object }[]
            }, true);
        }
        if (shiftDDL) {
            shiftDDL.setProperties({
                dataSource: [] as []
            }, true);
        }
        setDialogVisible(true);
    }
    // ——— Dropdown Change Handlers ———
    function employeeNameChange(args: DropDownChangeEventArgs): void {
        if (args.itemData) {
            const employee = args.itemData as EmployeeOption;
            const filteredShifts: ShiftOption[] = shiftsData.filter((item) =>
                item.designationId === employee.id &&
                item.employeeId === employee.employeeId
            );
            shiftDDL.setProperties({
                dataSource: filteredShifts as unknown as { [key: string]: Object }[]
            }, true);
            selectedEmployee = employee;
        }
    }
    function shiftChange(args: DropDownChangeEventArgs): void {
        if (args.itemData) {
            selectedShift = args.itemData as ShiftOption;
        }
        const swapBtnElement = dialogObj.element.querySelector('.swap-shift-btn') as HTMLElement;
        if (!swapBtnElement) {
            return;
        }
        const swapBtnInstance = (swapBtnElement as any).ej2_instances?.[0] as Button;
        if (swapBtnInstance) {
            swapBtnInstance.disabled = !args.value;
        }
    }
    function setDialogVisible(visible: boolean): void {
        if (!dialogObj) return;
        if (visible) {
            dialogObj.show();
        } else {
            dialogObj.hide();
        }
    }
    const animationSettings: AnimationSettingsModel = {
        effect: 'Zoom'
    };
    dialogObj = new Dialog({
        target:'#schedule',
        header: 'Shift swap',
        cssClass: 'swap-dialog',
        height: '250px',
        width: '378px',
        isModal: true,
        showCloseIcon: true,
        animationSettings: animationSettings,
        buttons: getButtons(),
        content: (document.getElementById('dialogTemplate') as HTMLElement).innerHTML,
        visible: false,
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#dialogContainer');

    //  Employee DropDownList
    employeeDDL = new DropDownList({
        dataSource: employeeNamesList as any[],
        fields: { text: 'name', value: 'id' },
        placeholder: 'Select employee',
        change: employeeNameChange
    });
    employeeDDL.appendTo('#employeeDDL');
    //  Shift DropDownList
    shiftDDL = new DropDownList({
        dataSource: shiftsData as any[],
        fields: { text: 'name', value: 'id' },
        placeholder: 'Select shift',
        change: shiftChange
    });
    shiftDDL.appendTo('#shiftDDL');
    function dialogOpen(): void {
        const targetElement = document.getElementById('target');
        if (targetElement) {
            targetElement.style.display = 'block';
        }
        setDialogVisible(true);
    }

    function dialogClose(): void {
        if (employeeDDL) {
            employeeDDL.value = null;
            employeeDDL.dataSource = [];
        }
        if (shiftDDL) {
            shiftDDL.value = null;
            shiftDDL.dataSource = [];
        }
        setDialogVisible(false);
        const targetElement = document.getElementById('target');
        if (targetElement) {
            targetElement.style.display = 'none';
        }
    }
    function getButtons(): ButtonPropsModel[] {
        return [
            {
                click: () => {
                    setDialogVisible(false);
                },
                buttonModel: {
                    content: 'Cancel',
                }
            },
            {
                click: () => {
                    const dataSource = scheduleObj.eventSettings.dataSource as Record<string, any>[];
                    let requestingEventIndex = 0;
                    const requestedShiftId = requestedShift.id;
                    const requestingEvent = dataSource.filter((item, index) => {
                        if (item.Id === requestedShiftId) {
                            requestingEventIndex = index;
                            return true;
                        }
                        return false;
                    });
                    let approvedEventIndex = 0;
                    const approvedShiftId = selectedShift.eventId;
                    const approvedEvent = dataSource.filter((item, index) => {
                        if (item.Id === approvedShiftId) {
                            approvedEventIndex = index;
                            return true;
                        }
                        return false;
                    });
                    // Update the requesting event
                    requestingEvent[0].Description = requestingEvent[0].Description.replace(' - Swap-Request', '');
                    requestingEvent[0].Subject =
                        requestedShift.name + ' swapped the shift with ' +
                        selectedEmployee.name + "'s shift scheduled from " +
                        intl.formatDate(new Date(approvedEvent[0].StartTime), { skeleton: 'MMMd' }) + ', ' +
                        getTimeString(new Date(approvedEvent[0].StartTime)) + ' to ' +
                        getTimeString(new Date(approvedEvent[0].EndTime));
                    dataSource[requestingEventIndex] = requestingEvent[0];
                    // Update the approved event
                    approvedEvent[0].Description = approvedEvent[0].Description.replace(' - Swap-Request', '');
                    approvedEvent[0].Subject =
                        selectedEmployee.name + ' swapped the shift with ' +
                        requestedShift.name + "'s shift scheduled from " +
                        intl.formatDate(new Date(requestingEvent[0].StartTime), { skeleton: 'MMMd' }) + ', ' +
                        getTimeString(new Date(requestingEvent[0].StartTime)) + ' to ' +
                        getTimeString(new Date(requestingEvent[0].EndTime));
                    dataSource[approvedEventIndex] = approvedEvent[0];
                    scheduleObj.eventSettings.dataSource = dataSource;
                    scheduleObj.refreshEvents();
                    employeeNamesList.length = 0;
                    shiftsData.length = 0;
                    setDialogVisible(false);
                },
                buttonModel: {
                    content: 'Swap Shift',
                    disabled: true,
                    cssClass: 'swap-shift-btn'
                },
            }
        ];
    }
    function agendaTemplate(props: AgendaTemplateProps): string {
        const roleItem = employeeRole.find(
            (item) => item.id === parseInt(props.RoleId, 10)
        ) || { role: '' };
        const designationItem = designationsData.find(
            (item) => item.id === parseInt(props.DesignationId, 10)
        ) || { name: '' };
        const role = roleItem.role || '';
        const designation = designationItem.name || '';
        const isEmployeeLeave = props.Description.toLowerCase().includes('leave');
        const html =
            '<div class="agenda-event">' +
            '<div class="e-staff">' +
            '<div class="staff-image">' + props.Subject.charAt(0) + '</div>' +
            '<div class="event-details">' +
            '<div class="staff-info">' +
            '<span class="staff-name">' + props.Subject + '</span> ' +
            '<span class="staff-role">' + role + '</span> ' +
            '<span class="staff-designation">(' + designation + ')</span>' +
            (isEmployeeLeave ? '<span class="staff-availability"> - On Leave</span>' : '') +
            '</div>' +
            '<div class="event-time">Shift Time: ' +
            getTimeString(props.StartTime) +
            ' - ' +
            getTimeString(props.EndTime) +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    }
    function onNavigating(args: NavigatingEventArgs): void {
        const scheduleToolbar = scheduleObj.element.querySelector('.e-schedule-toolbar-container');
        if (!scheduleToolbar || args.action !== 'view') {
            return;
        }
        if (args.currentView === 'Agenda') {
            createAgendaToolbar();
        } else {
            const toolbarContainer = scheduleToolbar.querySelector('#agenda-toolbar-container');
            if (toolbarContainer && toolbarContainer.parentNode) {
                toolbarContainer.parentNode.removeChild(toolbarContainer);
            }
            const settings = scheduleObj.eventSettings;
            if (settings && settings.query) {
                settings.query.queries = [];
            }
        }
    }
    function agendaChipsClick(args: { index: number }): void {
        if (!dropdownListObj || !scheduleObj) return;
        selectedChipIndex = args.index;
        selectedDropdownValue = null;
        dropdownListObj.dataSource = [];
        dropdownListObj.value = null;
        dropdownListObj.dataBind();
        dropdownListObj.focusOut();
        if (args.index === 0) {
            scheduleObj.eventSettings.query = new Query();
        } else {
            const query = new Query().where('RoleId', 'contains', args.index.toString(), true);
            scheduleObj.eventSettings.query = query;
        }
        scheduleObj.refreshEvents();
    }
    function createAgendaToolbar(): void {
        const scheduleToolbar = scheduleObj.element.querySelector('.e-schedule-toolbar-container');
        if (!scheduleToolbar || scheduleToolbar.querySelector('.agenda-toolbar')) return;
        const toolbarElement = document.createElement('div');
        toolbarElement.id = 'agenda-toolbar-container';
        scheduleToolbar.appendChild(toolbarElement);
        let agendaToolbar = new Toolbar({
            cssClass: 'agenda-toolbar',
            overflowMode: 'Scrollable',
            width: '100%',
            items: [
                {
                    template: '<div id="chip-wrapper"></div>',
                    type: 'Input',
                    align: 'Left',
                },
                {
                    template: '<div id="ddl-wrapper" style="width:230px;"><input id="employee-ddl"/></div>',
                    type: 'Input',
                    align: 'Right',
                },
            ],
        });
        agendaToolbar.appendTo('#agenda-toolbar-container');
        agendaToolbar = agendaToolbar;
        const chipList = new ChipList({
            selection: 'Single',
            cssClass: 'e-outline',
            selectedChips: [0],
            chips: ['All', 'Doctors', 'Nurses', 'Staffs'],
            beforeClick: (args) => handleChipBeforeClick(args, false), // <-- FALSE here
            click: (args: any) => {
                agendaChipsClick(args);
            },
        });
        chipList.appendTo('#chip-wrapper');
        toolbarChipsRef.current = chipList;
        const ddl = new DropDownList({
            change: onDropDownListChange,
            beforeOpen: onDropDownListBeforeOpen,
            placeholder: 'Select an employee',
            popupHeight: '220px',
            showClearButton: true,
        });
        ddl.appendTo('#employee-ddl');
        dropdownListObj = ddl;
    }
    function onDropDownListChange(args: any) {
        const chipIndex = selectedChipIndex;
        const selectedName = args.value as string | null;
        let query = new Query();
        if (chipIndex !== 0) {
            query = query.where('RoleId', 'equal', chipIndex);
        }
        if (selectedName) {
            query = query.where('Subject', 'contains', selectedName, true);
        }
        scheduleObj.setProperties({ eventSettings: { query } }, false);
        scheduleObj.dataBind();
    }
    function onDropDownListBeforeOpen(): void {
        const chipIndex = selectedChipIndex;
        const allEvents = (scheduleObj.eventSettings.dataSource || []) as any[];
        const relevantEvents = chipIndex === 0 ? allEvents : allEvents.filter(item => Number(item.RoleId) === chipIndex);
        const uniqueSubjects = Array.from(new Set(
            relevantEvents
                .map(item => item.Subject as string)
                .filter(s => !/covers|swapped/i.test(s))
        ));
        setTimeout(() => {
            dropdownListObj.value = null;
            dropdownListObj.dataSource = uniqueSubjects;
            dropdownListObj.dataBind();
        }, 0);
    }
    const setAgendaContentHeight = (): void => {
        const scheduleElement = scheduleObj.element;
        if (!scheduleElement) return;
        const agendaContentElement = scheduleElement.querySelector(
            '.e-table-wrap.e-agenda-view .e-schedule-table .e-content-wrap'
        ) as HTMLElement | null;
        if (agendaContentElement && agendaContentElement.style.height) {
            const agendaToolbarHeight = 72; // px
            const currentHeight = parseFloat(agendaContentElement.style.height);
            if (!isNaN(currentHeight)) {
                agendaContentElement.style.height = `${currentHeight - agendaToolbarHeight}px`;
            }
        }
    };
};