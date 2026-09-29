import { loadCultureFiles } from '../common/culture-loader';
import {
  Schedule,
  TimelineViews,
  Resize,
  DragAndDrop,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';

Schedule.Inject(TimelineViews, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
const employeeData: { Text: string; Id: number; Color: string }[] = [
  { Text: 'Sarah', Id: 1, Color: '#EF4444' },
  { Text: 'John', Id: 2, Color: '#10B981' },
  { Text: 'Emma', Id: 3, Color: '#3B82F6' },
  { Text: 'Michael', Id: 4, Color: '#F59E0B' },
  { Text: 'Lisa', Id: 5, Color: '#8B5CF6' },
  { Text: 'David', Id: 6, Color: '#EC4899' },
];

let eventData: Object[] = <Object[]>extend([], (dataSource as any).taskData, null, true);

const STATUS_MAP: Record<string, { icon: string; color: string }> = {
  pending: { icon: 'e-clock', color: '#DC2626' },
  'in-progress': { icon: 'e-play', color: '#3B82F6' },
  review: { icon: 'e-eye', color: '#F59E0B' },
  done: { icon: 'e-check', color: '#10B981' },
};

const eventTemplate = (data: Record<string, any>): string => {
  const config = STATUS_MAP[data.Status] || STATUS_MAP.pending;
  const progressText: string = (data.Progress || 0) + '%';
  const statusLabel: string = data.Status || 'pending';

  return [
    '<div class="custom-event" style="--status-color: ',
    config.color,
    ';" title="',
    data.Subject || 'Task',
    '">',

    '<div class="event-header">',
    '<div class="event-subject">',
    data.Subject || 'Task',
    '</div>',
    '<div class="event-progress-percent">',
    progressText,
    '</div>',
    '</div>',

    '<div class="event-footer">',
    '<div class="label-wrapper">',
    '<span class="e-icons ',
    config.icon,
    ' status-icon"></span>',
    '<span class="status-label">',
    statusLabel,
    '</span>',
    '</div>',
    '</div>',

    '</div>',
  ].join('');
};

function onPopupOpen(args: PopupOpenEventArgs): void {
  if (args.type !== 'Editor') return;

  const dialog: HTMLElement = (args.element as HTMLElement).closest(
    '.e-dialog'
  ) as HTMLElement;
  if (dialog) {
    const elementsToHide: NodeListOf<HTMLElement> = dialog.querySelectorAll(
      '.e-repeat-parent-row, .e-recurrenceeditor'
    );
    elementsToHide.forEach((el: HTMLElement) => {
      el.style.display = 'none';
    });
  }

  const form: HTMLElement = args.element.querySelector(
    '.e-schedule-form'
  ) as HTMLElement;
  if (!form) return;

  const existingCustomFields: Element | null = form.querySelector('.custom-fields');
  if (existingCustomFields) {
    existingCustomFields.remove();
  }

  const container: HTMLElement = document.createElement('div');
  container.className = 'custom-fields';

  container.innerHTML = [
    '<div class="e-field-group e-custom-row">',
    '<input id="statusDropdown" name="Status" type="text" class="e-field" />',
    '</div>',

    '<div class="e-field-group e-custom-row">',
    '<div class="e-float-input e-control-wrapper e-input-group">',
    '<input id="progressInput"',
    ' name="Progress"',
    ' type="number"',
    ' min="0"',
    ' max="100"',
    ' step="1"',
    ' class="e-field e-input"',
    ' value="',
    (args.data as any).Progress || '0',
    '" />',
    '<label class="e-float-text e-label-top">Progress (%)</label>',
    '</div>',
    '</div>',
  ].join('');

  form.appendChild(container);

  const progressEl = container.querySelector(
    '[name="Progress"]'
  ) as HTMLInputElement;

  const statusDropdown: DropDownList = new DropDownList({
    dataSource: [
      { text: 'Pending', value: 'pending' },
      { text: 'In-Progress', value: 'in-progress' },
      { text: 'Review', value: 'review' },
      { text: 'Done', value: 'done' },
    ],
    fields: { text: 'text', value: 'value' },
    value: (args.data as any).Status || 'pending',
    change: (e: any) => {
      applyStatusRules(e.value);
    },
    placeholder: 'Status',
    floatLabelType: 'Auto',
  });

  statusDropdown.appendTo('#statusDropdown');

  progressEl.value =
    (args.data as any).Progress !== undefined &&
    (args.data as any).Progress !== null
      ? (args.data as any).Progress
      : 0;

  applyStatusRules(statusDropdown.value as string);

  progressEl.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    let value: number = Number(target.value) || 0;
    const currentStatus: string = statusDropdown.value as string;

    if (currentStatus === 'in-progress') {
      if (value >= 99) value = 98;
      if (value <= 0) value = 0;
    }

    target.value = value.toString();
  });

  function applyStatusRules(status: string): void {
    if (status === 'done') {
      progressEl.value = '100';
      progressEl.disabled = true;
    } else if (status === 'review') {
      progressEl.value = '99';
      progressEl.disabled = true;
    } else if (status === 'pending') {
      progressEl.value = '0';
      progressEl.disabled = true;
    } else if (status === 'in-progress') {
      const currentValue: number = Number(progressEl.value) || 0;
      if (currentValue >= 99) {
        progressEl.value = '98';
      }
      progressEl.disabled = false;
    } else {
      progressEl.disabled = false;
    }
  }
}

const scheduleObj: Schedule = new Schedule({
  cssClass: 'event-customization-schedule',
  width: '100%',
  height: '550px',
  selectedDate: new Date(2026, 3, 24),
  currentView: 'TimelineWeek',
  popupOpen: onPopupOpen,
  allowOverlap: false,
  startHour: '09:00',
  endHour: '18:00',
  showWeekend: false,
  views: ['TimelineWeek'],
  group: { resources: ['Employees'] },
  resources: [
    {
      field: 'EmployeeId',
      name: 'Employees',
      dataSource: employeeData,
      textField: 'Text',
      idField: 'Id',
      colorField: 'Color',
    },
  ],
  eventSettings: {
    dataSource: eventData,
    fields: {
      id: 'Id',
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
      description: { name: 'Description' },
    },
    template: eventTemplate,
  },
});

scheduleObj.appendTo('#Schedule');
};