/**
 * Expense analyze show case sample
 */
import { merge, isNullOrUndefined, select, isVisible } from '@syncfusion/ej2-base';
import { Internationalization } from '@syncfusion/ej2-base';
import { Chart, ColumnSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-charts';
import { ChartModel } from '@syncfusion/ej2-charts/src/chart/chart-model';
import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { GridModel } from '@syncfusion/ej2-grids/src/grid/base/grid-model';
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { ListViewModel } from '@syncfusion/ej2-lists/src/list-view/list-view-model';
import { Dialog } from '@syncfusion/ej2-popups';
import { DialogModel } from '@syncfusion/ej2-popups/src/dialog/dialog-model';
import { DataManager } from '@syncfusion/ej2-data';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip);
Grid.Inject(Page, Selection);

export class ExpenseAnalyze {
    public chartObj: Chart;
    public gridObj: Grid;
    public dialogObj: Dialog;
    private leftListObj: ListView;
    private headerHeight: number;
    private leftPane: HTMLElement;
    private rightPane: HTMLElement;
    private header: HTMLElement;
    private slideNav: HTMLElement;
    private headerTitle: HTMLElement;
    private needResponsive: boolean = true;
    private categoryListObj: ListView;
    private categoryGridObj: Grid;


    private chartDS: { [key: string]: object[] };
    private auto: { [key: string]: object[] };
    private charity: { [key: string]: object[] };
    private education: { [key: string]: object[] };
    private entertainment: { [key: string]: object[] };
    private food: { [key: string]: object[] };
    private healthCare: { [key: string]: object[] };
    private home: { [key: string]: object[] };
    private shopping: { [key: string]: object[] };
    private utilities: { [key: string]: object[] };
    private allCategory: { [key: string]: object[] };
    private loader: HTMLElement;
    private loadingOverlay: HTMLElement;
    private isMobile: boolean;
    private splitPane: HTMLElement;

    public model: ExpenseAnalyzeModel = {
        gridModel: {
            dataSource: [],
            allowSorting: true,
            enableHover: false,
            allowKeyboard: true,
            allowPaging: true,
            width: 'auto',
            pageSettings: {
                pageCount: 4,
                pageSize: 14
            },
            columns: [{
                field: 'Items',
                headerText: 'Items',
                textAlign: 'Left',
                width: 170
            }, {
                field: 'Spent',
                headerText: 'Spent',
                width: 120,
                format: 'C2',
            }, {
                field: 'PaymentMode',
                headerText: 'Payment Mode',
                width: 170,
                template: '<span class="expense-icons ${PaymentMode}"></span>'
            }, {
                field: 'DateTime',
                headerText: 'Date',
                textAlign: 'Right',
                width: 120,
                format: 'yMd',
            }]
        },
        chartModel: {
            chartArea:
            {
                border: { width: 1 }
            },

            primaryXAxis: {
                valueType: 'Category',
                interval: 1,
                labelIntersectAction: 'Rotate90'
            },

            primaryYAxis:
            {
                title: 'Budget',
                minimum: 0,
                maximum: 1500,
                interval: 500,
                labelFormat: '${value}'
            },
            title: 'TRENDS',
            legendSettings: { visible: false },
            tooltip: { enable: true, format: 'Amount: ${point.y}' },
            selectionMode: 'Point',
        },
        dialogModel: {
            width: '100%',
            height: '100%',
            target: document.body,
            header: '<div><span id="backButton" class="e-icons e-icon-back"></span><span class="header-title">Auto</span></div>'
        },
        listViewModel: {
            dataSource: [{ 'id': '1', 'text': 'OVERVIEW' }, { 'id': '2', 'text': 'TRENDS' }],
            fields: { text: 'text', id: 'id' },
            template: '<span class="expense-icons ${text}"></span><span>${text}</span>'
        },
        categoryListModel: {
            dataSource: [],
            headerTitle: 'Category',
            template: '<span class="expense-icons ${Category}"></span><span class="expense-category">${Category}</span>' +
            '<div class="expense-budget"><span>${Budget}</span><span>Budget</span></div><div class="expense-spent">' +
            '<span class="${high}">${Spent}</span><span>Spent</span></div>',
            fields: { text: 'Category', id: 'id' },
            showHeader: true
        }
    };

    constructor(model?: ExpenseAnalyzeModel) {
        if (model) {
            merge(this.model, model);
        }
        this.loader = <HTMLElement>select('#sb-loading');
        this.loadingOverlay = <HTMLElement>select('#loading-overlay');
        if (isVisible(this.loader)) {
            this.loadingOverlay.classList.add('loading-overlay');
        }
        this.splitPane = <HTMLElement>select('.expense-splitpane');
        this.header = <HTMLElement>select('.expense-header');
        this.headerTitle = <HTMLElement>select('.expense-header-title');
        this.leftPane = <HTMLElement>select('.expense-left-pane');
        this.rightPane = <HTMLElement>select('.expense-right-pane');
        this.model.listViewModel.select = (e: SelectEventArgs) => {
            this.onLeftPaneListClick(e);
        };
        this.leftListObj = new ListView(this.model.listViewModel);
        this.leftListObj.appendTo('#listview');
        this.leftListObj.selectItem({ 'id': '1', 'text': 'OVERVIEW' });
        this.rightPane.addEventListener('click', (e: MouseEvent) => {
            this.OnRightPaneClick(e);
        });
        this.gridObj = new Grid(this.model.gridModel);
        this.gridObj.appendTo('#categoryGrid');
        this.model.categoryListModel.select = (args: SelectEventArgs) => {
            this.onClickCategory(args);
        };
        this.categoryListObj = new ListView(this.model.categoryListModel);
        this.categoryListObj.appendTo('#categoryList');
        let formatInstance: Internationalization = new Internationalization();
        let dFormatter: Function = formatInstance.getDateFormat({ skeleton: 'full', type: 'dateTime' });
        let currentDate: string = dFormatter(new Date());
        this.changeMonth(currentDate.split(',')[0].split(' ')[0]);
        select('.slide-nav').addEventListener('click', (e: MouseEvent) => {
            this.onOpenClick(e);
        });
        window.onresize = (event: Event): void => {
            if (this.needResponsive) {
                this.setResponsive();
            }
        };
        this.setResponsive();
    }
    private onLeftPaneListClick(e: SelectEventArgs): void {
        let overviewElement: HTMLElement = <HTMLElement>select('.expense-overview');
        let trendsElement: HTMLElement = <HTMLElement>select('#expense-chart');
        let chartTargetElement: HTMLElement = <HTMLElement>select('.expense-chart');
        overviewElement.style.display = 'none';
        if (e.text === 'OVERVIEW') {
            overviewElement.style.display = 'block';
            trendsElement.style.display = 'none';
            chartTargetElement.classList.remove('chart-target');
            this.setResponsive();
        } else {
            if (isVisible(this.leftPane) && window.innerWidth <= 768) {
                this.slideOut();
            }
            chartTargetElement.classList.add('chart-target');
            overviewElement.style.display = 'none';
            trendsElement.style.display = 'block';
            if (!isNullOrUndefined(this.chartObj)) {
                this.chartObj.refresh();
            } else {
                this.model.chartModel.series = [{
                    type: 'Column',
                    dataSource: this.chartDS,
                    fill: '#9e94ed',
                    xName: 'month', yName: 'Spent'
                }];
                this.chartObj = new Chart(this.model.chartModel);
                this.chartObj.appendTo('#expense-chart');
            }
        }
    }

    private OnRightPaneClick(e: MouseEvent): void {
        if (isVisible(this.leftPane) && isVisible(select('.slide-nav'))) {
            this.slideOut();
        }
    }

    private onClickCategory(args: SelectEventArgs): void {
        if (this.isMobile) {
            select('#backButton').addEventListener('click', (args: any) => {
                this.dialogObj.hide();
            });
            let dialogHeaderTitle: HTMLElement = <HTMLElement>select('.header-title');
            dialogHeaderTitle.textContent = args.text;
            this.dialogObj.show(true);
        }
        let element: HTMLElement = <HTMLElement>select('.expense-grid-header');
        element.textContent = args.text;
        switch (args.text) {
            case 'All':
                this.gridObj.dataSource = this.allCategory;
                this.gridObj.dataBind();
                break;
            case 'Auto':
                this.gridObj.dataSource = this.auto;
                this.gridObj.dataBind();
                break;
            case 'Charity':
                this.gridObj.dataSource = this.charity;
                this.gridObj.dataBind();
                break;
            case 'Education':
                this.gridObj.dataSource = this.education;
                this.gridObj.dataBind();
                break;
            case 'Entertainment':
                this.gridObj.dataSource = this.entertainment;
                this.gridObj.dataBind();
                break;
            case 'Food':
                this.gridObj.dataSource = this.food;
                this.gridObj.dataBind();
                break;
            case 'Health Care':
                this.gridObj.dataSource = this.healthCare;
                this.gridObj.dataBind();
                break;
            case 'Home':
                this.gridObj.dataSource = this.home;
                this.gridObj.dataBind();
                break;
            case 'Shopping':
                this.gridObj.dataSource = this.shopping;
                this.gridObj.dataBind();
                break;
            case 'Utilities':
                this.gridObj.dataSource = this.utilities;
                this.gridObj.dataBind();
                break;
        }
    }

    private onOpenClick(arg: MouseEvent): void {
        let element: HTMLElement = <HTMLElement>select('.expense-overlay');
        this.dispatchResize();
        if (!this.leftPane.classList.contains('toggled')) {
            element.classList.add('toggle-overlay');
            this.leftPane.classList.add('toggled');
        } else {
            element.classList.remove('toggle-overlay');
            this.slideOut();
        }
        arg.stopPropagation();
    }

    private setResponsive(): void {
        let headerHeight: number = this.header.offsetHeight;
        let contentHeight: string = (window.innerHeight - (headerHeight)).toString();
        this.rightPane.style.height = contentHeight + 'px';
        let listHeight: string = (window.innerHeight - (headerHeight)).toString();
        this.leftPane.style.height = listHeight + 'px';
        if (isVisible(this.leftPane) && window.innerWidth <= 768) {
            this.slideOut();
            this.isMobile = true;
            this.model.dialogModel.content = <HTMLElement>select('#categoryGrid');
            this.dialogObj = new Dialog(this.model.dialogModel);
            this.dialogObj.appendTo('#categoryDialog');
            this.dialogObj.hide();
        } else {
            this.isMobile = false;
            if (!isNullOrUndefined(this.dialogObj)) {
                this.dialogObj.hide();
            }
            select('#gridTarget').appendChild(<HTMLElement>select('#categoryGrid'));
        }
    }

    private dispatchResize(): void {
        this.needResponsive = false;
        window.dispatchEvent(new Event('resize'));
        this.needResponsive = true;
    }
    private slideOut(): void {
        this.leftPane.classList.remove('toggled');
        let element: HTMLElement = <HTMLElement>select('.expense-overlay');
        element.classList.remove('toggle-overlay');
    }
    private changeMonth(month: string): void {
        this.updateGridChart(month);
    }

    private updateGridChart(month: string): void {
        let dataManger: DataManager = new DataManager({
            url: 'http://js.syncfusion.com/ejServices/' + 'api/expenseanalysis/get?month=' + month,
            offline: true,
            crossDomain: true,
            requiresFormat: false
        });
        dataManger.ready.then((e: Object) => {
            let response: ResultData = (e as ResultData);
            this.allCategory = <{ [key: string]: object[] }>response.result[12];
            this.auto = <{ [key: string]: object[] }>response.result[2];
            this.charity = <{ [key: string]: object[] }>response.result[3];
            this.education = <{ [key: string]: object[] }>response.result[4];
            this.entertainment = <{ [key: string]: object[] }>response.result[5];
            this.food = <{ [key: string]: object[] }>response.result[6];
            this.healthCare = <{ [key: string]: object[] }>response.result[7];
            this.home = <{ [key: string]: object[] }>response.result[8];
            this.shopping = <{ [key: string]: object[] }>response.result[9];
            this.utilities = <{ [key: string]: object[] }>response.result[10];
            this.chartDS = <{ [key: string]: object[] }>response.result[11];
            this.categoryListObj.dataSource = <any>response.result[1];
            this.categoryListObj.dataBind();
            if (!(window.innerWidth <= 768)) {
                this.categoryListObj.selectItem({ 'id': '0', 'text': 'All' });
            }
            if (isVisible(this.loader)) {
                this.loader.style.display = 'none';
                this.loadingOverlay.classList.remove('loading-overlay');
                this.splitPane.classList.remove('opacity');
            }
        }).catch((e: Object) => {
            throw (e);
        });
    }
}
export interface ExpenseAnalyzeModel {
    chartModel: ChartModel;
    gridModel: GridModel;
    dialogModel: DialogModel;
    listViewModel: ListViewModel;
    categoryListModel: ListViewModel;
}
interface ResultData {
    result: { [key: string]: object[] }[] | string[] | {
        [key: string]: Object;
    }[];
}
interface Points {
    x: string;
}