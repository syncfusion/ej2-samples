import { loadCultureFiles } from '../common/culture-loader';
import {
  PivotView,
  IDataSet,
  PivotChart,
  CalculatedField,
  PivotFieldList,
  Toolbar as PivotToolbar
} from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser, setStyleAttribute, enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
import { Switch } from '@syncfusion/ej2-buttons';
import { Sidebar, Toolbar } from '@syncfusion/ej2-navigations';
enableRipple(false);

PivotView.Inject(PivotChart, PivotToolbar);
PivotFieldList.Inject(CalculatedField);

/**
 * PivotView Sample with Chart integration.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
  loadCultureFiles();
  let displayOptionDropDown: DropDownList;
  let primaryViewDropDown: DropDownList;
  let isInitial = false;
  let isChecked = true;
  let displayOption = 'Both';
  let preference = 'Chart';

  let pivotObj: PivotView = new PivotView({
    enginePopulated: () => {
      if (!Browser.isDevice && fieldlistObj && pivotObj) {
        fieldlistObj.update(pivotObj);
      }
    },
    dataBound: function (args) {
      if (document.getElementById('displayOptionddl') && document.getElementById('displayOptionddl') && document.getElementById('toolbar-switch') && !isInitial) {
        isInitial = true;
        displayOptionDropDown = new DropDownList({
          floatLabelType: 'Auto',
          width: 100,
          value: displayOption,
          change: (args: any) => {
            displayOption = args.value;
            if (args.value !== 'Both') {
              pivotObj.displayOption = { view: args.value as any };
            } else if (args.value == 'Both') {
              pivotObj.displayOption = {
                view: args.value,
                primary: primaryViewDropDown.value as any,
              };
            }
            pivotObj.refresh();
          }
        });
        displayOptionDropDown.appendTo('#displayOptionddl');
        primaryViewDropDown = new DropDownList({
          floatLabelType: 'Auto',
          width: 100,
          value: preference,
          change: (args: any) => {
            preference = args.value;
            if (pivotObj.displayOption.view == 'Both') {
              pivotObj.displayOption = { view: 'Both', primary: args.value as any };
              pivotObj.refresh();
            }
          }
        });
        primaryViewDropDown.appendTo('#primaryViewddl');
        let layoutSwitch: Switch = new Switch({
          checked: isChecked,
          cssClass: 'pivot-toolbar-switch',
          change: (args) => {
            isChecked = args.checked;
            pivotObj.showToolbar = !pivotObj.showToolbar;
            pivotObj.refresh();
          }
        });
        layoutSwitch.appendTo('#toolbar-switch');
      }
    },
    width: '99%',
    height: 350,
    toolbar: ['Grid', 'Chart'],
    showToolbar: true,
    displayOption: { view: 'Both', primary: 'Chart' },
    chartSettings: {
      title: 'Sales Analysis',
      chartSeries: { type: 'Column' },
      load: (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
          selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
      }
    },
    gridSettings: { columnWidth: 140 }
  });
  pivotObj.appendTo('#PivotView');
  let fieldlistObj: PivotFieldList = new PivotFieldList({
    dataSourceSettings: {
      dataSource: Pivot_Data,
      expandAll: false,
      allowLabelFilter: true,
      allowValueFilter: true,
      columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
      { name: 'Amount', caption: 'Sold Amount' }],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
      enableSorting: true
    },
    allowCalculatedField: true,
    enableFieldSearching: true,
    renderMode: 'Fixed',
    load: (): void => {
      if (Browser.isDevice) {
        fieldlistObj.renderMode = 'Popup';
        fieldlistObj.target = '.control-section';
        setStyleAttribute(document.getElementById('PivotFieldList'), {
          width: '0',
          height: '0',
          float: 'left',
          'display': 'none'
        });
      }
    },
    dataBound: (): void => {
      if (Browser.isDevice) {
        pivotObj.element.style.width = '100%';
        pivotObj.allowCalculatedField = true;
        pivotObj.showFieldList = true;
      }
      pivotObj.tooltip.destroy();
      pivotObj.refresh();
    },
    enginePopulated: (): void => {
      fieldlistObj.updateView(pivotObj);
    }
  });
  fieldlistObj.appendTo('#PivotFieldList');

  let toolbarObj: Toolbar = new Toolbar({
    cssClass: "defaultToolbar",
    height: "50px",
    clicked: ToolbarCliked,
    items: [
      {
        template: '<div class="toolbar-template" id="layout_switch"><label for="toolbar-switch" class="label_option">Show/hide Toolbar:</label><div id="toolbar-switch"></div></div>',
        id: 'layout'
      },
      {
        template: '<div class="toolbar-template toolbar-temp"><label class="label_option display_label">Display Option:</label><select id="displayOptionddl" name="ddl-display-option"><option value="Both">Both</option><option value="Table">Table</option><option value="Chart">Chart</option></select></div>',
        id: 'display'
      },
      {
        template: '<div class="toolbar-template toolbar-temp"><label class="label_option display_label">Primary View:</label><select id="primaryViewddl" name="ddl-primary-view"><option value="Table">Table</option><option value="Chart">Chart</option></select></div>',
        id: 'preference'
      },
      { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu", align: 'Right' },
    ],
    beforeCreate: function (args) {
      isInitial = false;
      pivotObj.layoutRefresh();
    }
  });
  toolbarObj.appendTo("#defaultToolbar");

  let sideObj: Sidebar = new Sidebar({
    target: ".maincontent",
    type: "Auto",
    isOpen: true,
    position: 'Right',
    enableGestures: false,
    change: function (args) {
      pivotObj.layoutRefresh();
    }
  });
  sideObj.appendTo("#defaultSidebar");

  function ToolbarCliked(args: any): void {
    if (args.item.tooltipText == "Menu") {
      sideObj.toggle();
    }
  }

  setTimeout(() => {
    pivotObj.layoutRefresh();
  }, 700);
};