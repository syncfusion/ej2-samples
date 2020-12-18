import { loadCultureFiles } from '../common/culture-loader';
/**
 * Getting started -  Html Node
 */

import {
  Diagram, NodeModel, HtmlModel, NodeConstraints
} from '@syncfusion/ej2-diagrams';
import { expenseData, startDate, endDate, MyWindow } from './complexShapes.data';
import { DateRangePicker, RangeEventArgs } from '@syncfusion/ej2-calendars';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { extend } from '@syncfusion/ej2-base';
import {
  AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
  IAccTextRenderEventArgs, AccumulationSelection,
  Chart, ColumnSeries, Category, Legend, Tooltip, ChartAnnotation,
  LineSeries, AreaSeries, DateTime, Logarithmic, Crosshair
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection, ChartAnnotation);
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, ChartAnnotation, DateTime, Crosshair);
Chart.Inject(LineSeries, AreaSeries, DateTime, Logarithmic, Legend, Tooltip);
import { Grid, Page, Toolbar } from '@syncfusion/ej2-grids';
Grid.Inject(Page, Toolbar);
// custom code start
interface IExpense {
  UniqueId: string;
  DateTime: Date;
  Category: string;
  PaymentMode: string;
  TransactionType: string;
  Description: string;
  Amount: number;
}

interface IExpenseData {
  x: string;
  y: number;
  text: string;
}
// custom code end
let predicateStart: Predicate = new Predicate('DateTime', 'greaterthanorequal', window.startDate);
let predicateEnd: Predicate = new Predicate('DateTime', 'lessthanorequal', window.endDate);
let predicate: Predicate = predicateStart.and(predicateEnd);
// custom code start
declare let window: MyWindow;
let dataSource: Object[] = [];
/* tslint:disable */
function updateDate(list: any) {
  /* tslint:eanble */
  dataSource = list;
}
updateDate(expenseData);
let linechartObj: Chart;
let columnChartObj: Chart;
let pie: AccumulationChart;
let grid: Grid;
let pieLegendData: Object[] = [];
let pieRenderData: IExpenseData[] = [];
let tempData: IExpense[] = <IExpense[]>dataSource;
let legendData: IExpense[] = [];
let pieRenderingData: Object[] = [];
let category: string[] = [];
let expTotal: number = 0;
let dateRangePickerObject: DateRangePicker;
let groupValue: number = 0;
let hiGridData: Object[];
window.startDate = startDate;
window.endDate = endDate;
window.expenseData = expenseData;
let columnIncomeDS: any = [];
let columnExpenseDS: any = [];
let lineDS: any = [];
let tempChartIncomeDS: any = {};
let tempChartExpenseDS: any = {};
let tempChartLineDS: any = {};
let curDateTime: any;
let lineD: any = [];
// custom code end
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
  //   loadCultureFiles();
  let shape: HtmlModel = { type: 'HTML' };
  let constraints: any = NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate;
  let nodes: NodeModel[] = [{
    id: 'node', offsetX: 10, offsetY: 100, width: 1050, height: 450, shape: shape, constraints: constraints
  },
  {
    id: 'node2', offsetX: 276, offsetY: 550, width: 512, height: 408, shape: shape, constraints: constraints
  }, {
    id: 'node3', offsetX: -257, offsetY: 550, width: 512, height: 408, shape: shape, constraints: constraints
  }, {
    id: 'node4', offsetX: 409, offsetY: -151, width: 250, height: 30, shape: shape, constraints: constraints
  }, {
    id: 'node5', offsetX: -434, offsetY: -157, width: 250, height: 30, constraints: NodeConstraints.Default & ~NodeConstraints.Select,
    style: { fill: 'transparent', strokeColor: 'transparent' },
    annotations: [{
      content: 'EXPENSE TRACKER',
      style: { fontSize: 16, color: '#797979', bold: true }
    }]
  }]
  //initialize the diagram control
  let diagram: Diagram = new Diagram({
    width: '100%', height: '900px', nodes: nodes,
    backgroundColor: '#F5F5F5',
    nodeTemplate: '#nodetemplate', created: created
  });
  diagram.appendTo('#diagram');
  function created(): void {
    diagram.fitToPage();
  }
  getTotalExpense();
  initialRender();

  pie = new AccumulationChart({
    enableSmartLabels: true,
    width: '100%',
    height: '350px',
    series: getSeries(),
    legendSettings: { visible: true },
    textRender: (args: IAccTextRenderEventArgs) => {
      args.series.dataLabel.font.size = '13px';
      pie.animateSeries = true;
      if (args.text.indexOf('Others') > -1) {
        args.text = 'Others';
      }
    },
  });
  pie.appendTo('#pieChart');
  createLegendData('pie');
  grid = new Grid({
    width: '40%',
    dataSource: pieRenderData,
    rowTemplate: '#rowtemplate',
    columns: [
      { width: '10%', textAlign: 'Center' },
      { width: '50%' },
      { width: '20%' },
      { width: '20%' }
    ],
  });
  grid.appendTo('#grid');
  dateRangePickerObject = new DateRangePicker({
    format: 'MM/dd/yyyy',
    change: onDateRangeChange,
    startDate: window.startDate,
    endDate: window.endDate,
    min: new Date(2017, 0o5, 0o1),
    max: new Date(2017, 10, 30),
    showClearButton: false,
    allowEdit: false,
    presets: [
      { label: 'Last Month', start: new Date('10/1/2017'), end: new Date('10/31/2017') },
      { label: 'Last 3 Months', start: new Date('9/1/2017'), end: new Date('11/30/2017') },
      { label: 'All Time', start: new Date('6/1/2017'), end: new Date('11/30/2017') }
    ]
  });
  dateRangePickerObject.appendTo('#daterange');
  window.startDate = dateRangePickerObject.startDate;
  window.endDate = dateRangePickerObject.endDate;
  // custom code start
  function getSeries(): object[] {
    let series: object[] = [
      {
        dataSource: pieRenderingData,
        xName: 'text',
        yName: 'y',
        radius: '83%',
        startAngle: 0,
        endAngle: 360,
        innerRadius: '50%',
        dataLabel: {
          name: 'x',
          visible: true,
          position: 'Outside',
          connectorStyle: { length: '10%' },
          font: {
            color: 'Black',
            size: '14px',
            fontFamily: 'Roboto'
          }
        },
        animation: { enable: false },
        palettes: ['#61EFCD', '#CDDE1F', '#FEC200', '#CA765A', '#2485FA', '#F57D7D', '#C152D2',
          '#8854D9', '#3D4EB8', '#00BCD7']
      }
    ];
    return series;
  }
  // custom code end
  function onDateRangeChange(args: RangeEventArgs): void {
    window.startDate = args.startDate;
    window.endDate = args.endDate;
    lineDS = [];
    lineD = [];
    columnIncomeDS = [];
    columnExpenseDS = [];
    tempChartExpenseDS = [];
    tempChartIncomeDS = [];
    lineD = [];
    predicateStart = new Predicate("DateTime", "greaterthanorequal", args.startDate);
    predicateEnd = new Predicate("DateTime", "lessthanorequal", args.endDate);
    predicate = predicateStart.and(predicateEnd);
    // cardUpdate();
    /* tslint:disable */
    new DataManager(window.expenseData)
      .executeQuery(new Query().where(predicate.and("TransactionType", "equal", "Expense")))
      .then((e: any) => {
        getCoulmnChartExpenseDS(e);
      });
    /* tslint:enable */
    /* tslint:disable */
    new DataManager(window.expenseData)
      .executeQuery(new Query().where(predicate.and("TransactionType", "equal", "Income"))
      )
      .then((e: any) => {
        getCoulmnChartIncomeDS(e);
        columnChartObj.setProperties({
          //Initializing Chart Series
          primaryXAxis: { labelFormat: "MMM", valueType: "DateTime", edgeLabelPlacement: "Shift" },
          //Initializing Primary Y Axis
          primaryYAxis: { title: "Amount", labelFormat: "c0" },
          useGroupingSeparator: true,
          series: [
            {
              type: "Column", dataSource: columnIncomeDS, legendShape: "Circle", xName: "DateTime", width: 2, yName: "Amount", name: "Income",
              marker: { visible: true, height: 10, width: 10 }, fill: "#A16EE5", border: { width: 0.5, color: "#A16EE5" }, animation: { enable: false }
            },
            {
              type: "Column", dataSource: columnExpenseDS, legendShape: "Circle", xName: "DateTime", width: 2, yName: "Amount", name: "Expense",
              marker: { visible: true, height: 10, width: 10 }, fill: "#4472C4", animation: { enable: false }
            }
          ]
        });
        columnChartObj.refresh();
        lineD = [];
        getLineChartDS();
        linechartObj.setProperties({
          //Initializing Chart Series
          series: [{
            type: "Area", dataSource: lineDS, xName: "DateTime", width: 2, marker: {
              visible: true, width: 10, height: 10, fill: "white",
              border: { width: 2, color: "#0470D8" }
            }, legendShape: "Circle", yName: "Amount", name: "Amount", fill: "rgba(4, 112, 216, 0.3)",
            border: { width: 0.5, color: "#0470D8" }
          }
          ]
        });
        linechartObj.refresh();
      });
    getTotalExpense();
    pie.series = [
      {
        dataSource: pieRenderingData, xName: "text", yName: "y", radius: "83%", startAngle: 0, endAngle: 360, innerRadius: "50%", dataLabel: {
          name: "x", visible: true, position: "Outside", connectorStyle: { length: "10%" }, font: { color: "Black", size: "14px" }
        },
        palettes: ["#61EFCD", "#CDDE1F", "#FEC200", "#CA765A", "#2485FA", "#F57D7D", "#C152D2", "#8854D9", "#3D4EB8", "#00BCD7"]
      }
    ];
    pie.dataBind();
    pie.refresh();
    createLegendData("pieUpdate");
    grid.dataSource = pieRenderData;
    grid.dataBind();
    grid.refresh();
  }
  function initialRender(): void {
    window.startDate = startDate;
    window.endDate = endDate;
    window.expenseData = expenseData;
    predicateStart = new Predicate('DateTime', 'greaterthanorequal', window.startDate);
    predicateEnd = new Predicate('DateTime', 'lessthanorequal', window.endDate);
    predicate = predicateStart.and(predicateEnd);
    lineBarChart();
  }
  // custom code start
  // tslint:disable-next-line:max-func-body-length
  function lineBarChart() {
    new DataManager(window.expenseData)
      .executeQuery(new Query().where(predicate.and('TransactionType', 'equal', 'Expense')))
      .then((e: any) => {
        getCoulmnChartExpenseDS(e);
      });
    new DataManager(window.expenseData)
      .executeQuery(new Query().where(predicate.and('TransactionType', 'equal', 'Income')))
      .then((e: any) => {
        getCoulmnChartIncomeDS(e);
        columnChartObj = new Chart({
          width: '100%', height: '400px',
          //Initializing Primary X Axis
          primaryXAxis: { labelFormat: 'MMM', valueType: 'DateTime', intervalType: 'Months', edgeLabelPlacement: 'Shift' },
          //Initializing Primary Y Axis
          primaryYAxis: { minimum: 3000, maximum: 9000, labelFormat: 'c0' },
          useGroupingSeparator: true,
          series: [
            {
              type: 'Column', dataSource: columnIncomeDS, legendShape: 'Circle', xName: 'DateTime', width: 2, yName: 'Amount',
              name: 'Income', marker: { visible: true, height: 10, width: 10 },
              fill: '#A16EE5', border: { width: 0.5, color: '#A16EE5' }, animation: { enable: false },
            },
            {
              type: 'Column', dataSource: columnExpenseDS, legendShape: 'Circle', xName: 'DateTime', width: 2, yName: 'Amount',
              name: 'Expense', marker: { visible: true, height: 10, width: 10 }, fill: '#4472C4', animation: { enable: false },
            },
          ],
          annotations: [{
            // tslint:disable-next-line:max-line-length
            content: '<p style="font-family:Roboto;font-size: 16px;font-weight: 400;font-weight: 400;letter-spacing: 0.02em;line-height: 16px;color: #797979 !important;">Income - Expense</p>',
            x: '75px', y: '9%', coordinateUnits: 'Pixel', region: 'Chart'
          }],
          margin: { top: 90 }, legendSettings: { visible: true },
          titleStyle: { textAlignment: 'Near', fontWeight: '500', size: '16', color: '#000' },
          tooltip: {
            fill: '#707070', enable: true, shared: true, format: '${series.name} : ${point.y}',
            header: 'Month - ${point.x} '
          }
        });
        columnChartObj.appendTo('#barChart');
        getLineChartDS();
        line();
      });
  }
  function line(): void {
    // tslint:disable-next-line:max-line-length
    let content: string = '<p style="font-family:Roboto;font-size: 16px;font-weight: 400;font-weight: 400;letter-spacing: 0.02em;line-height: 16px;color: #797979 !important;">Account - Balance</p>';
    linechartObj = new Chart({
      width: '100%', height: '400px',
      //Initializing Primary X Axis
      primaryXAxis: { valueType: 'DateTime', labelFormat: 'MMM', majorGridLines: { width: 0 }, intervalType: 'Months' },
      //Initializing Primary Y Axis
      primaryYAxis: {
        maximum: 1800,
        interval: 300,
        labelFormat: 'c0',
      },
      useGroupingSeparator: true,
      chartArea: {
        border: {
          width: 0
        }
      },
      annotations: [{
        content: content,
        x: '75px', y: '9%', coordinateUnits: 'Pixel', region: 'Chart'
      }],
      titleStyle: {
        textAlignment: 'Near', fontWeight: '500', size: '16', color: '#000'
      },
      series: [
        {
          type: 'Area',
          dataSource: lineDS,
          xName: 'DateTime', width: 2, marker: {
            visible: true,
            width: 10,
            height: 10,
            fill: 'white',
            border: { width: 2, color: '#0470D8' },
          },
          yName: 'Amount', name: 'Amount',
          fill: 'rgba(4, 112, 216, 0.3)',
          border: { width: 0.5, color: '#0470D8' }
        },

      ],
      margin: { top: 90 },
      tooltip: {
        fill: '#707070',
        enable: true, shared: true,
        format: '${series.name} : ${point.y}',
        header: 'Month - ${point.x} '
      }
    });
    linechartObj.appendTo('#lineChart');
  }
  // custom code end
  function getTotalExpense(): void {
    let renderingData: IExpenseData[] = [];
    tempData.forEach(item => {
      if (item.TransactionType === 'Expense' && window.startDate.valueOf() <= item.DateTime.valueOf()
        && window.endDate.valueOf() >= item.DateTime.valueOf()) {
        expTotal += Number(item.Amount);
        legendData.push(item);
        if (category.indexOf(item.Category) < 0) {
          category.push(item.Category);
        }
      }
    });
    /* tslint:disable */
    category.forEach(str => {
      let total: number = 0;
      legendData.forEach(item => {
        if (str === item.Category) {
          total += Number(item.Amount);
        }
      });
      let percent: string = ((total / expTotal) * 100).toFixed(2) + '%';
      renderingData.push({ x: str, y: total, text: percent });
    });
    pieRenderingData = new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query().sortByDesc('y')));
    if (pieRenderingData.length > 10) {
      let temp: IExpenseData = <IExpenseData>new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query().sortByDesc('y').range(0, 9)))[8];
      groupValue = temp.y - 1;
      hiGridData = new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query().sortByDesc('y').skip(9)));
    }
  }
  // custom code start
  function createLegendData(initiate: string): void {
    if (pieRenderingData.length > 10) {
      pie.series[0].groupTo = groupValue.toString();
      pie.dataBind();
      pie.refresh();
    }
    if (initiate === 'pieUpdate' || pieLegendData.length === 0) {
      pieLegendData = [];
      pieLegendData = pie.visibleSeries[0].points;
    }
    pie.legendSettings.visible = false;
    pie.dataBind();
    pieRenderData = [];
    for (let i: number = 0; i < pieLegendData.length; i++) {
      let data: IExpenseData = <IExpenseData>pieLegendData[i];
      if (data.text.indexOf('Others') > -1) {
        data.x = ((data.y / expTotal) * 100).toFixed(2).toString() + '%';
      }
      pieRenderData.push(data);
    }
  }
  function getCoulmnChartExpenseDS(e: any): void {
    let result: Object[] = objectAssign(e);
    for (let i: number = 0; i < result.length - 1; i++) {
      let cur: any = result[i];
      if (cur.DateTime.getMonth() in tempChartExpenseDS) {
        curDateTime = tempChartExpenseDS[cur.DateTime.getMonth()];
        tempChartExpenseDS[cur.DateTime.getMonth()].Amount = parseInt(curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
      } else {
        tempChartExpenseDS[cur.DateTime.getMonth()] = cur;
        tempChartExpenseDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(tempChartExpenseDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
      }
    }
    for (let data in tempChartExpenseDS) {
      columnExpenseDS.push(tempChartExpenseDS[data]);
    }
  }
  function getCoulmnChartIncomeDS(e: any): void {
    let result: Object[] = objectAssign(e);
    for (let i: number = 0; i < result.length - 1; i++) {
      let cur: any = result[i];
      if (cur.DateTime.getMonth() in tempChartIncomeDS) {
        curDateTime = tempChartIncomeDS[cur.DateTime.getMonth()];
        tempChartIncomeDS[cur.DateTime.getMonth()].Amount = parseInt(curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
      } else {
        tempChartIncomeDS[cur.DateTime.getMonth()] = cur;
        tempChartIncomeDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(tempChartIncomeDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));;
      }
    }
    for (let data in tempChartIncomeDS) {
      columnIncomeDS.push(tempChartIncomeDS[data]);
    }
  }
  function objectAssign(e: any): Object[] {
    let result: Object[] = [];
    let obj: any;
    obj = extend(obj, e.result, {}, true);
    for (let data: number = 0; data <= Object.keys(e.result).length; data++) {
      result.push(obj[data]);
    }
    return result;
  }
  function getLineChartDS(): void {
    tempChartLineDS = columnIncomeDS.concat(columnExpenseDS);
    for (let i: number = 0; i < tempChartLineDS.length; i++) {
      let cur: any = tempChartLineDS[i];
      if (cur.DateTime.getMonth() in lineD) {
        curDateTime = lineD[cur.DateTime.getMonth()];
        lineD[cur.DateTime.getMonth()].Amount = Math.abs((parseInt(curDateTime.Amount, 0) - parseInt(cur.Amount, 0)));
      } else {
        lineD[cur.DateTime.getMonth()] = cur;
      }
    }
    for (let data: number = 0; data <= lineD.length; data++) {
      if (lineD[data]) {
        lineDS.push(lineD[data]);
      }
    }
  }
  // custom code end
};
