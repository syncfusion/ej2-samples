import { loadCultureFiles } from '../common/culture-loader';
import {
    PivotView, FieldList, CalculatedField, Toolbar, RemoveReportArgs, ToolbarArgs,
    ConditionalFormatting, IDataSet, RenameReportArgs, SaveReportArgs, FetchReportArgs, LoadReportArgs, NumberFormatting,
    VirtualScroll, Grouping, GroupingBar, DrillThrough, IAxisSet, PDFExport, ExcelExport
} from '@syncfusion/ej2-pivotview';
import { enableRipple, select, createElement } from '@syncfusion/ej2-base';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import * as data from './pivot-data/universitydata.json';
import { ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
enableRipple(false);

PivotView.Inject(FieldList, CalculatedField, Toolbar, ConditionalFormatting, NumberFormatting, VirtualScroll, Grouping, GroupingBar, DrillThrough, PDFExport, ExcelExport);

/**
 * PivotView Overview Sample
 */
/* tslint:disable */
let Universitydata: IDataSet[] = (data as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            columns: [{ name: 'region', caption: 'Region' },
            { name: 'country', caption: 'Country' }],
            rows: [{ name: 'rank_display', caption: 'Rank', expandAll: true, allowDragAndDrop: false },
            { name: 'university', caption: 'University', expandAll: true, allowDragAndDrop: false }],
            formatSettings: [{ name: 'international_students', format: 'N0' },
            { name: 'faculty_count', format: 'N0' }],
            dataSource: Universitydata,
            expandAll: false,
            values: [{ name: 'international_students', caption: 'Students' },
            { name: 'faculty_count', caption: 'Faculty' }],
            filters: [{ name: 'type', caption: 'University Type' }],
            fieldMapping: [{ name: 'rank_display', dataType: 'number' },
            { name: 'country', caption: 'Country' },
            { name: 'city', caption: 'City' },
            { name: 'region', caption: 'Region' },
            { name: 'research_output', caption: 'Research Output' },
            { name: 'student_faculty_ratio', caption: 'Student faculty ratio' }],
            groupSettings: [{ name: 'rank_display', type: 'Number', rangeInterval: 100 }],
            filterSettings: [{ name: 'region', type: 'Exclude', items: ['Africa', 'Latin America'] }],
            conditionalFormatSettings: [
                {
                    measure: 'international_students',
                    value1: 1,
                    value2: 5000,
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#E10000',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'international_students',
                    value1: 50000,
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#0C860C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'faculty_count',
                    value1: 1,
                    value2: 1000,
                    conditions: 'Between',
                    style: {
                        backgroundColor: '#E10000',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'faculty_count',
                    value1: 10000,
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#0C860C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                }
            ],
            showHeaderWhenEmpty: false,
            emptyCellsTextContent: '-',
            excludeFields: ['link', 'logo']
        },
        width: '100%',
        height: 600,
        saveReport: function (args: SaveReportArgs): void {
            let reports: SaveReportArgs[] = [];
            let isSaved: boolean = false;
            if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
                reports = JSON.parse(localStorage.pivotviewReports);
            }
            if (args.report && args.reportName && args.reportName !== '') {
                let report = JSON.parse(args.report);
                report.dataSourceSettings.dataSource = [];
                report.pivotValues = [];
                args.report = JSON.stringify(report);
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
                let report = JSON.parse(args.report);
                report.dataSourceSettings.dataSource = pivotObj.dataSourceSettings.dataSource;
                pivotObj.dataSourceSettings = report.dataSourceSettings;
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
        enableVirtualization: true,
        allowDeferLayoutUpdate: true,
        allowDrillThrough: true,
        showGroupingBar: true,
        allowGrouping: true,
        enableValueSorting: true,
        displayOption: { view: 'Both' },
        exportAllPages: false,
        maxNodeLimitInMemberEditor: 50,
        chartSettings: {
            title: 'Top Universities Analysis',
            primaryYAxis: { border: { width: 0 } },
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            }
        },
        chartSeriesCreated: function () {
            pivotObj.chartSettings.chartSeries.legendShape = pivotObj.chartSettings.chartSeries.type === 'Polar' ? 'Rectangle' : 'SeriesType';
        },
        showFieldList: true,
        gridSettings: {
            columnWidth: 120, rowHeight: 36, allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Single', cellSelectionMode: 'Box' },
            excelQueryCellInfo: function (args: ExcelQueryCellInfoEventArgs): void {
                if ((args.cell as IAxisSet).axis === 'value' && (args.cell as IAxisSet).value === undefined) {
                    args.style.numberFormat = undefined;
                }
            }
        },
        cellTemplate: '${getCellContent(data)}',
    });
    pivotObj.appendTo('#PivotView');

    (<{ getCellContent?: Function }>window).getCellContent = (args: any): any => {
        if (args.cellInfo && args.cellInfo.axis === 'value' && pivotObj.pivotValues[args.cellInfo.rowIndex] && (pivotObj.pivotValues[args.cellInfo.rowIndex][0] as IAxisSet).hasChild) {
            if (args.targetCell.classList.contains(args.cellInfo.cssClass)) {
                args.targetCell.classList.remove(args.cellInfo.cssClass);
                args.cellInfo.style = undefined;
            }
        }
        if (args.cellInfo && args.cellInfo.axis === 'row' && args.cellInfo.valueSort.axis === 'university') {
            let imgElement: Element = createElement('img', {
                className: 'university-logo',
                attrs: {
                    'src': Universitydata[args.cellInfo.index[0]].logo as string,
                    'alt': args.cellInfo.formattedText as string,
                    'width': '30',
                    'height': '30'
                },
            });
            let cellValue: Element = select('.e-cellvalue', args.targetCell);
            cellValue.classList.add('e-hyperlinkcell');
            cellValue.addEventListener('click', hyperlinkCellClick.bind(pivotObj));
            args.targetCell.insertBefore(imgElement, cellValue);
        }
        return '';
    };

    function hyperlinkCellClick(args: MouseEvent) {
        let cell: Element = (args.target as Element).parentElement;
        let pivotValue: IAxisSet = pivotObj.pivotValues[Number(cell.getAttribute('index'))][Number(cell.getAttribute('data-colindex'))] as IAxisSet;
        let link: string = Universitydata[pivotValue.index[0]].link as string;
        window.open(link, '_blank');
    }
};
