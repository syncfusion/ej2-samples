import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, FieldList, IDataSet, ExcelExport, ExcelExportProperties, PdfExportProperties, ConditionalFormatting, PDFExport } from '@syncfusion/ej2-pivotview';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);
PivotView.Inject(FieldList, ExcelExport, ConditionalFormatting, PDFExport);

/**
 * PivotView Exporting Sample.
 */
/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [
                { name: 'Amount', format: 'C0' },
                { name: 'In_Stock', format: 'N0' },
                { name: 'Sold', format: 'N0' },
            ],
            columns: [{ name: 'Year', expandAll: true }, { name: 'Quarter' }],
            dataSource: Pivot_Data,
            expandAll: false,
            conditionalFormatSettings: [
                {
                    measure: 'In_Stock',
                    value1: 120,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#FF005C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    value1: 150,
                    measure: 'In_Stock',
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#35B65A',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'Sold',
                    value1: 1000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#FF005C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    value1: 1100,
                    measure: 'Sold',
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#35B65A',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'Amount',
                    value1: 7000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#FF005C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    value1: 12000,
                    measure: 'Amount',
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#35B65A',
                        color: 'white',
                        fontFamily: 'Segoe UI',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
            ],
            drilledMembers: [{ name: 'Country', items: ['France'] }],
            filterSettings: [
                { name: 'Year', type: 'Include', items: ['FY 2026'] },
                { name: 'Products', type: 'Include', items: ['Gloves', 'Fenders'] },
            ]
        },
        width: '100%',
        height: 350,
        allowExcelExport: true,
        allowPdfExport: true,
        showFieldList: true,
        gridSettings: { columnWidth: 140 },
        allowConditionalFormatting: true,
    });
    pivotObj.appendTo('#PivotView');

    let exportType: DropDownList = new DropDownList({
        index: 0
    });
    exportType.appendTo('#mode');
    let exportBtn: Button = new Button({
        isPrimary: true,
    });
    exportBtn.appendTo('#export-btn');
    document.getElementById('export-btn').onclick = () => {
        const today: string = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
        if (exportType.value === 'excel') {
            let excelExportProperties: ExcelExportProperties = {
                header: {
                    headerRows: 4,
                    rows: [
                        { cells: [{ colSpan: 10, value: "Sales Performance Report - Q1 2026", style: { fontColor: '#1B4965', fontSize: 20, hAlign: 'Center', bold: true } }] },
                        { cells: [{ colSpan: 10, value: "Region: Global | Currency: USD", style: { fontColor: '#35B65A', fontSize: 15, hAlign: 'Center', bold: true } }] }
                    ]
                },
                footer: {
                    footerRows: 4,
                    rows: [
                        { cells: [{ colSpan: 10, value: "Total In Stock: 1,863 | Total Units Sold: 6,327 | Total Sold Amount: $2,381,015", style: { fontColor: '#35B65A', fontSize: 15, hAlign: 'Center', bold: true } }] },
                        { cells: [{ colSpan: 10, value: `Report generated on: ${today}`, style: { fontColor: '#1B4965', fontSize: 15, hAlign: 'Center', bold: true } }] }
                    ]
                }
            };
            pivotObj.excelExport(excelExportProperties);
        } else if (exportType.value === 'csv') {
            pivotObj.csvExport();
        } else {
            let pdfExportProperties: PdfExportProperties = {
                header: {
                    fromTop: 0,
                    height: 130,
                    contents: [
                        {
                            type: 'Text',
                            value: 'Sales Performance Report - Q1 2026',
                            position: { x: 275, y: 30 },
                            style: { textBrushColor: '#1B4965', fontSize: 35 }
                        },
                        {
                            type: 'Text',
                            value: 'Region: Global | Currency: USD',
                            position: { x: 385, y: 80 },
                            style: { textBrushColor: '#35B65A', fontSize: 22 }
                        }
                    ]
                },
                footer: {
                    fromBottom: 160,
                    height: 150,
                    contents: [
                        {
                            type: 'Text',
                            value: "Total In Stock: 1,863 | Total Units Sold: 6,327 | Total Sold Amount: $2,381,015",
                            position: { x: 275, y: 0 },
                            style: { textBrushColor: '#35B65A', fontSize: 18 }
                        },
                        {
                            type: 'Text',
                            value: `Report generated on: ${today}`,
                            position: { x: 385, y: 25 },
                            style: { textBrushColor: '#1B4965', fontSize: 18 }
                        },
                        {
                            type: 'PageNumber',
                            pageNumberType: 'Numeric',
                            format: 'Page {$current} of {$total}',
                            position: { x: 915, y: 120 },
                            style: { textBrushColor: '#1B4965', fontSize: 20 }
                        }
                    ]
                }
            };
            pivotObj.pdfExport(pdfExportProperties);
        }
    };
};
