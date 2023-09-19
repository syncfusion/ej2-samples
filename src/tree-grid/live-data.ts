import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Selection } from '@syncfusion/ej2-treegrid';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { getTradeData } from './data-source';

TreeGrid.Inject(Selection);

/**
 * Live Data sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    const feedDelayInput: NumericTextBox = new NumericTextBox({
        value: 1000,
        format: 'N0',
        min: 100,
        max: 5000,
        step: 1,
        width: "150px",
        floatLabelType: "Auto"
    }, '#feeddelay');

    const updateButton: Button = new Button({}, '#update');
    const clearButton: Button = new Button({ disabled: true }, '#clear');
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: getTradeData,
            allowSelection: false,
            queryCellInfo: queryCellInfo,
            height: 350,
            enableHover: false,
            treeColumnIndex: 1,
            childMapping: 'subtasks',
            columns: [
                { field: 'id', headerText: 'ID', width: '140', isPrimaryKey: true, visible: false },
                { field: 'indexfunds', headerText: 'Index Funds', width: '200' },
                {
                    field: 'Ltp',
                    headerText: 'Last Traded Price',
                    width: '150',
                    format: 'C2',
                    type: 'number',
                    textAlign: 'Right',
                },
                {
                    field: 'Change',
                    headerText: 'Change',
                    width: '100',
                    format: 'C2',
                    type: 'number',
                    textAlign: 'Right'
                },
                {
                    field: 'PercentageChange',
                    headerText: '% Change',
                    width: '110',
                    format: 'N0',
                    textAlign: 'Right'
                },
                { field: 'Open', headerText: 'Open Price', width: '150' },
                { field: 'High', headerText: 'High Price', width: '170' },
                { field: 'Low', headerText: 'Low Price', width: '150' },
                { field: 'Weekhigh', headerText: '52W H', width: '130', textAlign: 'Right' },
                { field: 'Weeklow', headerText: '52W L', width: '130', textAlign: 'Right' }
            ]

        });
    treegrid.appendTo('#TreeGrid');

    let initial: boolean = true;
    treegrid.grid.on('data-ready', function () {
        if (initial) {
            updateButton.element.click();
            initial = false;
            feedDelayInput.element.addEventListener('keypress', (e: any) => {
                if (e && e.key === 'Enter' && feedDelayInput.element.parentElement.classList.contains('e-input-focus')) {
                    feedDelayInput.value = parseInt(feedDelayInput.element.value);
                    feedDelayInput.focusOut();
                    updateButton.element.click();
                }
            });
        }
    });
    treegrid.grid.on('destroy', function () {
        if (timerID) {
            clearInterval(timerID);
            timerID = undefined;
        }
    });
    let isDataBound: boolean = true;
    function queryCellInfo(args: QueryCellInfoEventArgs) {
        if (args.column.field === 'Ltp') {
            if (args.data['Ltp'] < 3000) {
                args.cell.classList.remove('e-increase');
                args.cell.classList.add('e-decrease');
            } else if (args.data['Ltp'] > 3000) {
                args.cell.classList.remove('e-decrease');
                args.cell.classList.add('e-increase');
            }
        } else if (args.column.field === 'PercentageChange') {
            if (args.data['PercentageChange'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column.field === 'Change') {
            if (args.data['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column.field === 'indexfunds' && args.data['hasChildRecords']) {
            args.cell.getElementsByClassName('e-treecell')[0].classList.add('e-parent');
        }
        isDataBound = true;
    }
    function updateCellDetails(cell: Element, className: string) {
        const div: Element = document.createElement('div');
        const span1: Element = document.createElement('span');
        span1.classList.add('rowcell-left');
        div.classList.add(className);
        span1.innerHTML = cell.innerHTML;
        cell.innerHTML = '';
        div.appendChild(span1);
        cell.appendChild(div);
    }
    let timerID: any;
    updateButton.element.onclick = function () {
        if (!timerID) {
            updateButton.disabled = true;
            feedDelayInput.enabled = false;
            clearButton.disabled = false;
            timerID = setInterval(
                updateCellValues,
                parseInt(feedDelayInput.value.toString())
            );
        }
    };
    clearButton.element.onclick = function () {
        if (timerID) {
            updateButton.disabled = false;
            feedDelayInput.enabled = true;
            clearButton.disabled = true;
            clearInterval(timerID);
            timerID = undefined;
        }
    };
    function updateCellValues() {
        let oldValue;
        for (let i = 0; i < treegrid.grid.currentViewData.length; i++) {
            if (treegrid.grid.currentViewData[i] === undefined) {
                return;
            }
            let num = Math.floor(Math.random() * 40) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = treegrid.grid.currentViewData[i]['Change'];
            if (i % 2 === 0) {
                num = num * 0.25;
            } else if (i % 3 === 0) {
                num = num * 0.83;
            } else if (i % 5 === 0) {
                num = num * 0.79;
            } else if (i % 4 === 0) {
                num = num * 0.42;
            } else {
                num = num * 0.51;
            }
            isDataBound = true;
            const maxChange = 2 - treegrid.grid.currentViewData[i]['Change'];
            const minChange = -2 - treegrid.grid.currentViewData[i]['Change'];
            const newChange = Math.max(Math.min(num, maxChange), minChange);
            treegrid.grid.setCellValue(
                treegrid.grid.currentViewData[i]['id'],
                'Change',
                parseFloat(newChange.toFixed(2))
            );
            isDataBound = true;
            let newPercentageChange;
            if (treegrid.grid.currentViewData[i]['indexfunds'] === "NIFTY 50") {
                newPercentageChange = Math.max(Math.min(newChange, 2), -2);
            } else if (treegrid.grid.currentViewData[i]['indexfunds'] === "NIFTY BANK") {
                newPercentageChange = Math.max(Math.min(newChange, 4), -4);
            } else {
                const maxPercentageChange = 2 - treegrid.grid.currentViewData[i]['PercentageChange'];
                const minPercentageChange = -2 - treegrid.grid.currentViewData[i]['PercentageChange'];
                newPercentageChange = Math.max(Math.min(newChange, maxPercentageChange), minPercentageChange);
            }
            treegrid.grid.setCellValue(
                treegrid.grid.currentViewData[i]['id'],
                'PercentageChange',
                parseFloat(newPercentageChange.toFixed(2))
            );
            isDataBound = true;
            const val = treegrid.grid.currentViewData[i]['Ltp'] + newPercentageChange;
            treegrid.grid.setCellValue(treegrid.grid.currentViewData[i]['id'], 'Ltp', val);
        }
    }
};
