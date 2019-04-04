import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, IAxisSet, LoadEventArgs } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import * as localData from './pivot-data/rData.json';
enableRipple(false);
/**
 * PivotView sample for cell template.
 */
/* tslint:disable */
let data: IDataSet[] = (localData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            expandAll: true,
            enableSorting: true,
            drilledMembers: [{ name: 'Year', items: ['FY 2015', 'FY 2017', 'FY 2018'] }],
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' }
            ],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            values: [
                { name: 'ProCost', caption: 'Revenue Growth' }
            ],
            filters: []
        },
        dataBound(): void {
            trend();
        },
        load(args: LoadEventArgs): void {
            groupDate(args);
        },
        height: 300,
        width: '100%',
        cellTemplate: '${getCellContent(data)}',
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');

    (<{ getCellContent?: Function }>window).getCellContent = (e: any): any => {
        let template: string;
        if (e && e.targetCell.className.indexOf('e-valuescontent') > -1) {
            template = '<span class="tempwrap sb-icon-neutral pv-icons"></span>';
        } else {
            template = '';
        }
        return template;
    };

    /* jshint ignore:start */
    function trend() {
        let cTable: HTMLElement[] = [].slice.call(document.getElementsByClassName("e-table"));
        let colLen: number = pivotGridObj.pivotValues[3].length;
        let cLen: number = cTable[3].children[0].children.length;
        let rLen: number = cTable[3].children[1].children.length;
        let rowIndx: number;

        for (let k = 0; k < rLen; k++) {
            if (pivotGridObj.pivotValues[k] && pivotGridObj.pivotValues[k][0] !== undefined) {
                rowIndx = ((pivotGridObj.pivotValues[k][0]) as IAxisSet).rowIndex;
                break;
            }
        }
        var rowHeaders = [].slice.call(cTable[2].children[1].querySelectorAll('td'));
        var rows = pivotGridObj.dataSource.rows;
        if (rowHeaders.length > 1) {
            for (var i = 0, Cnt = rows; i < Cnt.length; i++) {
                var fields = {};
                var fieldHeaders = [];
                for (var j = 0, Lnt = rowHeaders; j < Lnt.length; j++) {
                    var header = rowHeaders[j];
                    if (header.className.indexOf('e-gtot') === -1 && header.className.indexOf('e-rowsheader') > -1 && header.getAttribute('fieldname') === rows[i].name) {
                        var headerName = rowHeaders[j].getAttribute('fieldname') + '_' + rowHeaders[j].textContent;
                        fields[rowHeaders[j].textContent] = j;
                        fieldHeaders.push(rowHeaders[j].textContent);
                    }
                }
                if (i === 0) {
                    for (let rnt: number = 0, Lnt = fieldHeaders; rnt < Lnt.length; rnt++) {
                        if (rnt !== 0) {
                            let row: number = fields[fieldHeaders[rnt]];
                            let prevRow: number = fields[fieldHeaders[rnt - 1]];
                            for (var j = 0, ci = 1; j < cLen && ci < colLen; j++ , ci++) {
                                let node: HTMLElement = cTable[3].children[1].children[row].childNodes[j] as HTMLElement;
                                let prevNode: HTMLElement = cTable[3].children[1].children[prevRow].childNodes[j] as HTMLElement;
                                let ri: string = undefined;
                                let prevRi: string = undefined;
                                if (node) {
                                    ri = node.getAttribute("index");
                                }
                                if (prevNode) {
                                    prevRi = prevNode.getAttribute("index");
                                }
                                if (ri && ri < [].slice.call(pivotGridObj.pivotValues).length) {
                                    if ((pivotGridObj.pivotValues[prevRi][ci]).value > (pivotGridObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap')) {
                                        let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-loss');
                                    } else if ((pivotGridObj.pivotValues[prevRi][ci]).value < (pivotGridObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap')) {
                                        let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-profit');
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let rnt: number = 0, Lnt = fieldHeaders; rnt < Lnt.length; rnt++) {
                        var row = fields[fieldHeaders[rnt]];
                        for (let j: number = 0, ci = 1; j < cLen && ci < colLen; j++ , ci++) {
                            let node: HTMLElement = cTable[3].children[1].children[row].childNodes[j] as HTMLElement;
                            let prevNode: HTMLElement = cTable[3].children[1].children[row - 1].childNodes[j] as HTMLElement;
                            let ri: string = undefined;
                            let prevRi: string = undefined;
                            if (node) {
                                ri = node.getAttribute("index");
                            }
                            if (prevNode) {
                                prevRi = prevNode.getAttribute("index");
                            }
                            if (ri && ri < [].slice.call(pivotGridObj.pivotValues).length) {
                                let cRowFieldName: string = (cTable[2].children[1].children[row].childNodes[0] as HTMLElement).getAttribute('fieldname');
                                let prevRowFieldName: string = (cTable[2].children[1].children[row - 1].childNodes[0] as HTMLElement).getAttribute('fieldname');
                                if ((pivotGridObj.pivotValues[prevRi][ci]).value > (pivotGridObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-loss');
                                } else if ((pivotGridObj.pivotValues[prevRi][ci]).value < (pivotGridObj.pivotValues[ri][ci]).value && node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-profit');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /* jshint ignore:end */

    function groupDate(args: LoadEventArgs): void {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2 ' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        args.dataSource.data = data;
    }
    /* tslint:enable */
};
