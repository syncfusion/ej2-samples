import { loadCultureFiles } from '../common/culture-loader';

import { Dialog } from '@syncfusion/ej2-popups';
import { Tab, SelectEventArgs } from '@syncfusion/ej2-navigations';
import { Grid, Selection, Page } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { orderData } from './gridData';
import { Chart, LineSeries, DateTime, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, DragEventArgs } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);
Chart.Inject(LineSeries, DateTime, Legend, Tooltip);
Grid.Inject(Selection, Page);
Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Default Dialog sample
 */

let dialogObj: Dialog;
let chart: Chart;
let tabObj: Tab;
let grid: Grid;
let scheduleObj: Schedule;
let defaultRTE: RichTextEditor;
let initRte: boolean = true;
let initchart: boolean = true;
let initschedule: boolean = true;
(window as any).default = (): void => {
  loadCultureFiles();
  renderdialog();
  rendertab();
  rendergrid();
  renderschedule();
  renderRTE();
  // Button has been created to open the Dialog
  let button: Button = new Button({});
  button.appendTo('#dialogBtn');
  renderchart();
  document.getElementById('dialogBtn').onclick = (): void => {
    dialogObj.show();
  };
  // Initialize Submit button
  let buttonFormValidate: Button = new Button({ isPrimary: true });
  buttonFormValidate.appendTo('#validateSubmit');
  // Initialize Reset button
  let buttonReset: Button = new Button({});
  buttonReset.appendTo('#resetbtn');
  // Initialize Custom placement
  let option: FormValidatorModel = {
    rules: {
      // Initialize the CustomPlacement.
      User: { required: true },
      DOB: { date: [true, 'Enter valid format'] },
      City: { required: true },
      State: { required: true },
    }
  };
  // Initialize Form validation
  let formObj: FormValidator;
  formObj = new FormValidator('#formId', option);
  let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
  document.getElementById('formId').addEventListener(
    'submit',
    (e: Event) => {
      e.preventDefault();
      if (formObj.validate()) {
        alert('Customer details added!');
        formObj.reset();
      }
    });
  let datepickerObject: DatePicker = new DatePicker({
    placeholder: 'Date of Birth'
  });
  // render initialized datepicker
  datepickerObject.appendTo('#dob');
};

// Navigate to corresponding link
function dlgButtonClick(): void {
  dialogObj.hide();
}

// 'Open' Button will be shown, if Dialog is closed
function dialogClose(): void {
  document.getElementById('dialogBtn').style.display = 'block';
}

// 'Open' Button will be hidden, if Dialog is opened
function dialogOpen(): void {
  document.getElementById('dialogBtn').style.display = 'none';
}

function selected(args: SelectEventArgs): void {
  if (args.selectedIndex === 1 && initschedule) {
    scheduleObj.refresh();
    initschedule = false;
  }
  if (args.selectedIndex === 2 && initchart) {
    chart.refresh();
    initchart = false;
  }
  if (args.selectedIndex === 3 && initRte) {
    defaultRTE.refresh();
    initRte = false;
  }
}

function renderdialog(): void {
  dialogObj = new Dialog({
    header: 'Syncfusion Components inside Dialog',
    target: document.getElementById('target'),
    animationSettings: { effect: 'None' },
    showCloseIcon: true,
    width: '700px',
    buttons: [{
      click: dlgButtonClick,
      buttonModel: { content: 'OK', isPrimary: true }
    },
    {
      click: dlgButtonClick,
      buttonModel: { content: 'Cancel', cssClass: 'e-flat' }
    }],
    open: dialogOpen,
    close: dialogClose
  });
  dialogObj.appendTo('#defaultDialog');
}

function rendertab(): void {
  tabObj = new Tab({
    items: [
      {
        header: { 'text': 'Grid' }, content: '#Grid'
      },
      {
        header: { 'text': 'Scheduler' }, content: '#scheduleComponent'
      },
      {
        header: { 'text': 'Chart' }, content: '#chartComponent'
      },
      {
        header: { 'text': 'Rich Text Editor' }, content: '#rteComponent'
      },
      {
        header: { 'text': 'Forms' }, content: '#formComponent'
      }
    ],
    selected: selected
  });
  //Render initialized Tab component
  tabObj.appendTo('#tab_default');
}

function rendergrid(): void {
  let gridData: Object = new DataManager(orderData as JSON[]).executeLocal(new Query().take(15));
  grid = new Grid(
    {
      dataSource: gridData,
      allowPaging: true,
      columns: [
        { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
        { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
        { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
        { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
        { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right' },
        { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
      ],
      pageSettings: { pageSizes: true, pageSize: 5 }
    });
  grid.appendTo('#Grid');
}

function renderchart(): void {
  chart = new Chart({
    primaryXAxis: {
      valueType: 'DateTime',
      labelFormat: 'y',
      intervalType: 'Years',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 }
    },
    primaryYAxis:
    {
      labelFormat: '{value}%',
      rangePadding: 'None',
      minimum: 0,
      maximum: 100,
      interval: 20,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 }
    },
    chartArea: {
      border: {
        width: 0
      }
    },
    //Initializing Chart Series
    series: [
      {
        type: 'Line',
        dataSource: [
          { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
          { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
          { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
          { x: new Date(2011, 0, 1), y: 70 }
        ],
        xName: 'x', width: 2, marker: {
          visible: true,
          width: 10,
          height: 10
        },
        yName: 'y', name: 'Germany',
      },
      {
        type: 'Line',
        dataSource: [
          { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
          { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
          { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
        ],
        xName: 'x', width: 2, marker: {
          visible: true,
          width: 10,
          height: 10
        },
        yName: 'y', name: 'England',
      }
    ],
    //Initializing Chart title
    title: 'Inflation - Consumer Price',
    //Initializing User Interaction Tooltip
    tooltip: {
      enable: true
    },
    height: '300px',
    load: (args: ILoadedEventArgs) => {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Material';
      args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
    }
  });
  chart.appendTo('#chart');
}

function renderschedule(): void {
  let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
  scheduleObj = new Schedule({
    height: '300px',
    selectedDate: new Date(2019, 0, 10),
    eventSettings: { dataSource: data },
    dragStart: (args: DragEventArgs) => {
      args.navigation.enable = true;
    }
  });
  scheduleObj.appendTo('#Schedule');
}

function renderRTE(): void {
  defaultRTE = new RichTextEditor({});
  defaultRTE.appendTo('#defaultRTE');
}
