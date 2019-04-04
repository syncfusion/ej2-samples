import { loadCultureFiles } from '../common/culture-loader';
import {
  PivotView,
  IDataSet,
  FieldList,
  PivotChart
} from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

PivotView.Inject(PivotChart, FieldList);

/**
 * PivotView Sample with Chart integration.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
  loadCultureFiles();
  let pivotGridObj: PivotView = new PivotView({
    dataSource: {
      enableSorting: true,
      columns: [
        { name: 'Year' },
        { name: 'Order_Source', caption: 'Order Source' }
      ],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      valueSortSettings: { headerDelimiter: ' - ' },
      data: Pivot_Data,
      formatSettings: [{ name: 'Amount', format: 'C' }],
      values: [{ name: 'Amount', caption: 'Sales Amount' }],
      filters: []
    },
    showFieldList: true,
    displayOption: { view: 'Chart' },
    chartSettings: {
      title: 'Sales Analysis',
      chartSeries: { type: 'Column' },
      load: (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() +
          selectedTheme.slice(1)) as ChartTheme;
      }
    }
  });
  pivotGridObj.appendTo('#PivotView');

  let chartTypesDropDown: DropDownList = new DropDownList({
    placeholder: 'Chart Types',
    floatLabelType: 'Auto',
    change: (args: ChangeEventArgs) => {
      pivotGridObj.chartSettings.chartSeries.type = args.value as any;
    }
  });
  chartTypesDropDown.appendTo('#charttypesddl');
};
