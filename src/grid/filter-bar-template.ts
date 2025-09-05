import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Filter, Page, Selection, Sort, PredicateModel, KeyboardEventArgs, IFilterUI } from '@syncfusion/ej2-grids';
import { productData } from './data-source';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-dropdowns';
import { closest } from '@syncfusion/ej2/base';

Grid.Inject(Filter, Page, Selection, Sort);

/**
 * Filter Bar Template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let numElement: HTMLInputElement;
    let stringElement: HTMLInputElement;
    let minElement: HTMLInputElement;
    let maxElement: HTMLInputElement;
    let ddElement: HTMLInputElement;

    let minTextBox: NumericTextBox;
    let maxTextBox: NumericTextBox;

    const templateOptionsNumericTextBox: IFilterUI = {
        create: (): Element => {
            const container: HTMLDivElement = document.createElement('div');
            const label: HTMLDivElement = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Id';
            numElement = document.createElement('input');
            numElement.classList.add('e-fltrtemp-focus');
            container.append(label);
            container.append(numElement);
            return container;
        },
        write: (): void => {
            const numericTextBox: NumericTextBox = new NumericTextBox({
                format: 'n'
            });
            numericTextBox.appendTo(numElement);
        },
    };

    const templateOptionsStringTextBox: IFilterUI = {
        create: (): Element => {
            const container: HTMLDivElement = document.createElement('div');
            const label: HTMLDivElement = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Name';
            stringElement = document.createElement('input');
            stringElement.classList.add('e-fltrtemp-focus');
            container.append(label);
            container.append(stringElement);
            return container;
        },
        write: (): void => {
            const stringTextBox: TextBox = new TextBox();
            stringTextBox.appendTo(stringElement);
        },
    };

    const templateOptionsMinMax: IFilterUI = {
        create: (): Element => {
            const container: HTMLDivElement = document.createElement('div');
            container.classList.add('e-flex-layout');
            const minContainer: HTMLDivElement = document.createElement('div');
            minContainer.classList.add('e-min-max-separator');
            const minLabel: HTMLDivElement = document.createElement('div');
            minLabel.classList.add('e-cus-label');
            minLabel.innerText = 'Min';
            minElement = document.createElement('input');
            minElement.classList.add('e-fltrtemp-focus');
            minContainer.append(minLabel);
            minContainer.append(minElement);
            const maxContainer: HTMLDivElement = document.createElement('div');
            const maxLabel: HTMLDivElement = document.createElement('div');
            maxLabel.classList.add('e-cus-label');
            maxLabel.innerText = 'Max';
            maxElement = document.createElement('input');
            maxElement.classList.add('e-fltrtemp-focus');
            maxContainer.append(maxLabel);
            maxContainer.append(maxElement);
            container.append(minContainer);
            container.append(maxContainer);
            return container;
        },
        write: (): void => {
            minTextBox = new NumericTextBox({
                format: 'n'
            });
            minTextBox.appendTo(minElement);
            maxTextBox = new NumericTextBox({
                format: 'n'
            });
            maxTextBox.appendTo(maxElement);
        },
    };

    const templateOptionsDropDown: IFilterUI = {
        create: (): Element => {
            const container: HTMLDivElement = document.createElement('div');
            const label: HTMLDivElement = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Status';
            ddElement = document.createElement('input');
            container.append(label);
            container.append(ddElement);
            return container;
        },
        write: (): void => {
            const dropDown: DropDownList = new DropDownList({
                cssClass: 'e-fltrtemp-focus',
                dataSource: ['Both', 'true', 'false'],
                value: 'Both',
                change: (args: ChangeEventArgs) => {
                    if (args.value !== 'Both') {
                        grid.filterByColumn('Discontinued', 'equal', args.value === 'true' ? true : false);
                    } else {
                        grid.removeFilteredColsByField('Discontinued');
                    }
                }
            });
            dropDown.appendTo(ddElement);
        },
    };

    const dataBound = (): void => {
        const filterBarOperatorDiv: HTMLDivElement = grid.getHeaderTable().querySelector('.e-filterdiv.e-fltrinputdiv');
        if (!filterBarOperatorDiv.querySelector('.e-cus-label')) {
            const label: HTMLDivElement = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Stock';
            filterBarOperatorDiv.insertBefore(label, filterBarOperatorDiv.firstChild);
        }
    };

    const keyPressed = (args: KeyboardEventArgs): void => {
        if (args.keyCode === 13) {
            const target: Element = args.target as Element;
            const th: Element = closest(target, 'th');
            if (th && th.classList.contains('e-filterbarcell') && th.hasAttribute('data-mappinguid')
                && grid.getColumnByUid(th.getAttribute('data-mappinguid')).field === 'UnitPrice') {
                args.cancel = true;
                if (minTextBox.element.value || maxTextBox.element.value) {
                    const filterColumns: PredicateModel[] = grid.filterSettings.columns.filter(data => data.field !== 'UnitPrice');
                    if (minTextBox.element.value) {
                        filterColumns.push({
                            field: 'UnitPrice',
                            operator: 'greaterthanorequal',
                            predicate: 'and',
                            value: parseFloat(minTextBox.element.value),
                        });
                    }
                    if (maxTextBox.element.value) {
                        filterColumns.push({
                            field: 'UnitPrice',
                            operator: 'lessthanorequal',
                            predicate: 'and',
                            value: parseFloat(maxTextBox.element.value),
                        });
                    }
                    setTimeout(() => {
                        grid.setProperties({ filterSettings: { columns: filterColumns } });
                    }, 0);
                } else {
                    const filterColumns: PredicateModel[] = grid.filterSettings.columns.filter(data => data.field === 'UnitPrice');
                    if (filterColumns.length) {
                        grid.removeFilteredColsByField('UnitPrice');
                    }
                }
            }
        }
    };

    const grid: Grid = new Grid(
        {
            dataSource: productData,
            allowPaging: true,
            allowFiltering: true,
            allowSorting: true,
            filterSettings: { showFilterBarOperator: true, showFilterBarStatus: false },
            gridLines: 'Both',
            columns: [
                {
                    field: 'ProductID',
                    headerText: 'Product ID',
                    width: 120,
                    textAlign: 'Right',
                    isPrimaryKey: true,
                    filterBarTemplate: templateOptionsNumericTextBox,
                },
                {
                    field: 'ProductName',
                    headerText: 'Product Name',
                    width: 220,
                    filterBarTemplate: templateOptionsStringTextBox,
                },
                {
                    field: 'UnitPrice',
                    headerText: 'Price',
                    width: 200,
                    format: 'C2',
                    textAlign: 'Right',
                    filterBarTemplate: templateOptionsMinMax
                },
                { field: 'UnitsInStock', headerText: 'Stock', width: 120, format: 'N', textAlign: 'Right' },
                {
                    field: 'Discontinued',
                    displayAsCheckBox: true,
                    type: 'boolean',
                    headerText: 'Discontinued',
                    width: 150,
                    filterBarTemplate: templateOptionsDropDown,
                },
            ],
            dataBound: dataBound,
            pageSettings: { pageCount: 5 },
            keyPressed: keyPressed
        });
    grid.appendTo('#Grid');
};
