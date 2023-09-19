import { loadCultureFiles } from '../common/culture-loader';
import {
    PivotView, FieldList, GroupingBar, CalculatedField, Toolbar, RemoveReportArgs, ToolbarArgs,
    ConditionalFormatting, RenameReportArgs, SaveReportArgs, FetchReportArgs, LoadReportArgs, PDFExport, ExcelExport
} from '@syncfusion/ej2-pivotview';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/**
 * PivotView sample for Olap data source.
 */
/* tslint:disable */
PivotView.Inject(FieldList, GroupingBar, CalculatedField, Toolbar, ConditionalFormatting, PDFExport, ExcelExport);
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            catalog: 'Adventure Works DW 2008 SE',
            cube: 'Adventure Works',
            providerType: 'SSAS',
            enableSorting: true,
            url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
            localeIdentifier: 1033,
            rows: [
                { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' },
            ],
            columns: [
                { name: '[Product].[Product Categories]', caption: 'Product Categories' },
                { name: '[Measures]', caption: 'Measures' },
            ],
            values: [
                { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
                { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }
            ],
            filters: [
                { name: '[Date].[Fiscal]', caption: 'Date Fiscal' },
            ],
            filterSettings: [
                {
                    name: '[Date].[Fiscal]', items: ['[Date].[Fiscal].[Fiscal Quarter].&[2002]&[4]',
                        '[Date].[Fiscal].[Fiscal Year].&[2005]'],
                    levelCount: 3
                }
            ]
        },
        width: '100%',
        height: 500,
        toolbarRender: function (args: ToolbarArgs): void {
            args.customToolbar.splice(6, 0, {
                type: 'Separator'
            });
            args.customToolbar.splice(9, 0, {
                type: 'Separator'
            });
        },
        fetchReport: function (args: FetchReportArgs): void {
            let reportsCollection: string[] = [];
            let reeportList: string[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportsCollection = JSON.parse(localStorage.pivotviewReports);
            }
            reportsCollection.map(function (item: any): void { reeportList.push(item.reportName); });
            args.reportName = reeportList;
        },
        removeReport: function (args: RemoveReportArgs): void {
            let reportsCollection: any[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportsCollection = JSON.parse(localStorage.pivotviewReports);
            }
            for (let i: number = 0; i < reportsCollection.length; i++) {
                if (reportsCollection[i].reportName === args.reportName) {
                    reportsCollection.splice(i, 1);
                }
            }
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                localStorage.pivotviewReports = JSON.stringify(reportsCollection);
            }
        },
        loadReport: function (args: LoadReportArgs): void {
            let reportsCollection: string[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportsCollection = JSON.parse(localStorage.pivotviewReports);
            }
            reportsCollection.map(function (item: any): void {
                if (args.reportName === item.reportName) {
                    args.report = item.report;
                }
            });
            if (args.report) {
                pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
            }
        },
        newReport: function (): void {
            pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
        },
        renameReport: function (args: RenameReportArgs): void {
            let reportsCollection: any[] = [];
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reportsCollection = JSON.parse(localStorage.pivotviewReports);
            }
            if (args.isReportExists) {
                for (let i: number = 0; i < reportsCollection.length; i++) {
                    if (reportsCollection[i].reportName === args.rename) {
                        reportsCollection.splice(i, 1);
                    }
                }
            }
            reportsCollection.map(function (item: any): any { if (args.reportName === item.reportName) { item.reportName = args.rename; } });
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                localStorage.pivotviewReports = JSON.stringify(reportsCollection);
            }
        },
        toolbar: ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
            'Grid', 'Chart', 'MDX', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'],
        allowExcelExport: true,
        allowConditionalFormatting: true,
        enableFieldSearching: true,
        allowPdfExport: true,
        showToolbar: true,
        showGroupingBar: true,
        allowCalculatedField: true,
        displayOption: { view: 'Both' },
        chartSettings: {
            title: 'Sales Analysis',
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            }
        },
        showFieldList: true,
        gridSettings: { columnWidth: 160 },
        saveReport: function (args: SaveReportArgs): void {
            let report: SaveReportArgs[] = [];
            let isSave: boolean = false;
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                report = JSON.parse(localStorage.pivotviewReports);
            }
            if (args.report && args.reportName && args.reportName !== '') {
                report.map(function (item: any): any {
                    if (args.reportName === item.reportName) {
                        item.report = args.report; isSave = true;
                    }
                });
                if (!isSave) {
                    report.push(args);
                }
                localStorage.pivotviewReports = JSON.stringify(report);
            }
        }
    });
    pivotObj.appendTo('#PivotView');
};

