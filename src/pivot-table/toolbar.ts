import { loadCultureFiles } from '../common/culture-loader';
import {
    PivotView, FieldList, CalculatedField, Toolbar, RemoveReportArgs, ToolbarArgs,
    ConditionalFormatting, IDataSet, RenameReportArgs, SaveReportArgs, FetchReportArgs, LoadReportArgs, NumberFormatting
} from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

PivotView.Inject(FieldList, CalculatedField, Toolbar, ConditionalFormatting, NumberFormatting);

/**
 * PivotView Toolbar Sample
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            dataSource: Pivot_Data,
            expandAll: false,
            values: [{ name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        },
        width: '100%',
        height: 450,
        saveReport: function (args: SaveReportArgs): void {
            let reports: SaveReportArgs[] = [];
            let isSaved: boolean = false;
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reports = JSON.parse(localStorage.pivotviewReports);
            }
            if (args.report && args.reportName && args.reportName !== '') {
                reports.map(function (item: any): any {
                    if (args.reportName === item.reportName) {
                        item.report = args.report; isSaved = true;
                    }
                });
                if (!isSaved) {
                    reports.push(args);
                }
                localStorage.pivotviewReports = JSON.stringify(reports);
            }
        },
        fetchReport: function (args: FetchReportArgs): void {
            let reportCollection: string[] = [];
            let reeportList: string[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportCollection = JSON.parse(localStorage.pivotviewReports);
            }
            reportCollection.map(function (item: any): void { reeportList.push(item.reportName); });
            args.reportName = reeportList;
        },
        loadReport: function (args: LoadReportArgs): void {
            let reportCollection: string[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportCollection = JSON.parse(localStorage.pivotviewReports);
            }
            reportCollection.map(function (item: any): void {
                if (args.reportName === item.reportName) {
                    args.report = item.report;
                }
            });
            if (args.report) {
                pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
            }
        },
        removeReport: function (args: RemoveReportArgs): void {
            let reportCollection: any[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportCollection = JSON.parse(localStorage.pivotviewReports);
            }
            for (let i: number = 0; i < reportCollection.length; i++) {
                if (reportCollection[i].reportName === args.reportName) {
                    reportCollection.splice(i, 1);
                }
            }
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                localStorage.pivotviewReports = JSON.stringify(reportCollection);
            }
        },
        renameReport: function (args: RenameReportArgs): void {
            let reportCollection: any[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportCollection = JSON.parse(localStorage.pivotviewReports);
            }
            if (args.isReportExists) {
                for (let i: number = 0; i < reportCollection.length; i++) {
                    if (reportCollection[i].reportName === args.rename) {
                        reportCollection.splice(i, 1);
                    }
                }
            }
            reportCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                localStorage.pivotviewReports = JSON.stringify(reportCollection);
            }
        },
        newReport: function (): void {
            pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
        },
		toolbarRender: function (args: ToolbarArgs): void {
			args.customToolbar.splice(6, 0, {
				type: 'Separator' 
			});
			args.customToolbar.splice(9, 0, {
				type: 'Separator' 
			});
		},
        toolbar: ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'],
        allowExcelExport: true,
        allowConditionalFormatting: true,
        allowNumberFormatting: true,
        allowPdfExport: true,
        showToolbar: true,
        allowCalculatedField: true,
        displayOption: { view: 'Both' },
        chartSettings: {
            title: 'Sales Analysis',
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = (selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)) as ChartTheme;
            }
        },
        showFieldList: true,
        gridSettings: { columnWidth: 140 }
    });
    pivotObj.appendTo('#PivotView');
};
