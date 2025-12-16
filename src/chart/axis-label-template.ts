import { loadCultureFiles } from '../common/culture-loader';
import { Chart, StackingColumnSeries, Category, Legend, Tooltip, ILoadedEventArgs, DataLabel, ChartAnnotation } from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Legend, Tooltip, DataLabel, ChartAnnotation);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

// Data
const olympicsGoldData = [
  { Country: 'USA', Count: 40 },
  { Country: 'China', Count: 40 },
  { Country: 'Great Britain', Count: 14 },
  { Country: 'France', Count: 16 },
  { Country: 'Australia', Count: 18 },
  { Country: 'Japan', Count: 20 },
  { Country: 'Italy', Count: 12 },
  { Country: 'Netherlands', Count: 15 },
  { Country: 'Germany', Count: 12 },
  { Country: 'South Korea', Count: 13 }
];

const olympicsSilverData = [
  { Country: 'USA', Count: 44 },
  { Country: 'China', Count: 27 },
  { Country: 'Great Britain', Count: 22 },
  { Country: 'France', Count: 26 },
  { Country: 'Australia', Count: 19 },
  { Country: 'Japan', Count: 12 },
  { Country: 'Italy', Count: 13 },
  { Country: 'Netherlands', Count: 7 },
  { Country: 'Germany', Count: 13 },
  { Country: 'South Korea', Count: 9 }
];

const olympicsBronzeData = [
  { Country: 'USA', Count: 42 },
  { Country: 'China', Count: 24 },
  { Country: 'Great Britain', Count: 29 },
  { Country: 'France', Count: 22 },
  { Country: 'Australia', Count: 16 },
  { Country: 'Japan', Count: 13 },
  { Country: 'Italy', Count: 15 },
  { Country: 'Netherlands', Count: 12 },
  { Country: 'Germany', Count: 8 },
  { Country: 'South Korea', Count: 10 }
];

// App entry
(window as any).default = (): void => {
    loadCultureFiles();
  const chart = new Chart({
    title: "Olympic medal standings 2024",
    subTitle: 'Source: www.olympics.com',
    titleStyle: { textOverflow: 'Wrap' }, isTransposed: true,
    subTitleStyle: { textOverflow: 'Wrap' },
    width: Browser.isDevice ? '100%' : '75%',
    legendSettings: { visible: true },
    tooltip: { enable: true },
    chartArea: { border: { width: 0 } },
    annotations: [
      {
        content: '<img style="margin-top:15px;height:150px;width:220px;opacity:0.5" src="src/chart/images/medals.png" alt="Medals" />', x: 'Netherlands', y: Browser.isDevice ? '90' : '110', coordinateUnits: 'Point'
      }
    ],
    primaryXAxis: {
      valueType: 'Category',
      majorGridLines: { width: 0 }, lineStyle: { width: 0 },
      majorTickLines: { width: 0 }, isInversed: true,
      labelTemplate: '#AxisLabelTemplate'
    },

    primaryYAxis: {
      visible: false, maximum: 130
    },

    series: [
      {
        dataSource: olympicsGoldData,
        xName: 'Country', fill: '#FFD700', legendShape: 'Rectangle',
        yName: 'Count', name: 'Gold',
        type: 'StackingColumn', marker: { dataLabel: { visible: true, position: 'Middle' } }
      },
      {
        dataSource: olympicsSilverData,
        xName: 'Country', fill: '#C0C0C0', legendShape: 'Rectangle',
        yName: 'Count', name: 'Silver',
        type: 'StackingColumn', marker: { dataLabel: { visible: true, position: 'Middle' } }
      },
      {
        dataSource: olympicsBronzeData,
        xName: 'Country', fill: '#CD7F32', legendShape: 'Rectangle',
        yName: 'Count', name: 'Bronze',
        type: 'StackingColumn', marker: { dataLabel: { visible: true, position: 'Middle' } }
      }
    ],

    load: (args: ILoadedEventArgs) => {
      loadChartTheme(args);
    },
    loaded: (args: ILoadedEventArgs) => {
      const isDark: boolean = args.chart.theme.includes('Dark') || args.chart.theme.includes('HighContrast');
      const labels: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>('#labelTemplate');
      labels.forEach((element: HTMLElement) => {
        element.classList.remove('dark-bg', 'light-bg');
        element.classList.add(isDark ? 'dark-bg' : 'light-bg');
      });
    }
  });

  chart.appendTo('#container');
};