import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel, RuleChangeEventArgs } from '@syncfusion/ej2-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { CheckBox, RadioButton } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider } from '@syncfusion/ej2-inputs';
import { expenseData } from './data-source';

/**
 * Template sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let elem: HTMLElement;
    let boxObj: CheckBox;
    let slider: Slider;
    let filter: ColumnsModel[] = [
        { field: 'Category', label: 'Category', type: 'string' },
        { field: 'PaymentMode', label: 'Payment Mode', type: 'string', template: {
                create: () => {
                    elem = document.createElement('input');
                    elem.setAttribute('type', 'text');
                    return elem;
                },
                destroy: (args: { elementId: string }) => {
                    let dropdown: DropDownList = (getComponent(document.getElementById(args.elementId), 'dropdownlist') as DropDownList);
                    if (dropdown) {
                        dropdown.destroy();
                    }
                },
                write: (args: { elements: Element, values: string[] | string, operator: string }) => {
                    let ds: string[] = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'];
                    let dropDownObj: DropDownList = new DropDownList({
                            dataSource: ds,
                            value: args.values as string,
                            change: (e: any) => {
                                qryBldrObj.notifyChange(e.itemData.value, e.element);
                            }
                        });
                    dropDownObj.appendTo('#' + args.elements.id);
                }
            },
            operators: [
                { value: 'equal', key: 'Equal' },
                { value: 'notequal', key: 'Not Equal' }
            ],
        },
        {
            field: 'TransactionType', label: 'Transaction Type', type: 'boolean', template: {
                create: () => {
                    elem = document.createElement('input');
                    elem.setAttribute('type', 'checkbox');
                    return elem;
                },
                destroy: (args: { elementId: string }) => {
                    (getComponent(document.getElementById(args.elementId), 'checkbox') as CheckBox).destroy();
                },
                write: (args: { elements: Element, values: string }) => {
                    let checked: boolean = args.values === 'IsExpensive' ? true : false;
                    boxObj = new CheckBox({
                        label: 'Is Expensive',
                        checked: checked,
                        change: (e: any) => {
                            qryBldrObj.notifyChange(e.checked ? 'expensive' : 'income', e.event.target);
                        }
                    });
                    boxObj.appendTo('#' + args.elements.id);
                }
            },
            operators: [
                { key: 'Equal', value: 'equal' },
                { key: 'Not Equal', value: 'notequal' }],
        },
        { field: 'Description', label: 'Description', type: 'string' },
        { field: 'Date', label: 'Date', type: 'date' },
        { field: 'Amount', label: 'Amount', type: 'number', template: {
                create: () => {
                    elem = document.createElement('div');
                    elem.setAttribute('class', 'ticks_slider');
                    return elem;
                },
                destroy: (args: { elementId: string }) => {
                    (getComponent(document.getElementById(args.elementId), 'slider') as Slider).destroy();
                },
                write: (args: { elements: Element, values: number }) => {
                     slider = new Slider({
                        value: args.values,
                        min: 0,
                        max: 100,
                        type: 'MinRange',
                        // Initialize tooltip with placement and showOn
                        tooltip: { isVisible: true, placement: 'Before', showOn: 'Hover' },
                        change: (e: any) => {
                            if (e.isInteracted) {
                                qryBldrObj.notifyChange(e.value, args.elements);
                            }
                        }
                    });
                     slider.appendTo('#' + args.elements.id);
                }
            },
            operators: [
                { key: 'Equal', value: 'equal' },
                { key: 'Not equal', value: 'notequal' },
                { key: 'Greater than', value: 'greaterthan' },
                { key: 'Less than', value: 'lessthan' },
                { key: 'Less than or equal', value: 'lessthanorequal' },
                { key: 'Greater than or equal', value: 'greaterthanorequal' }
            ],
        }
    ];

    let importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'Category',
            'field': 'Category',
            'type': 'string',
            'operator': 'in',
            'value': ['Clothing']
        },
        {
            'condition': 'or',
            'rules': [{
                'label': 'TransactionType',
                'field': 'TransactionType',
                'type': 'boolean',
                'operator': 'equal',
                'value': 'Income'
            },
            {
                'label': 'PaymentMode',
                'field': 'PaymentMode',
                'type': 'string',
                'operator': 'equal',
                'value': 'Cash'
            }]
        }, {
            'label': 'Amount',
            'field': 'Amount',
            'type': 'number',
            'operator': 'equal',
            'value': 10
        }
        ]
    };
    let qryBldrObj: QueryBuilder = new QueryBuilder({
        dataSource: expenseData,
        columns: filter,
        width: '100%',
        rule: importRules,
        ruleChange: updateRule
    });
    qryBldrObj.appendTo('#querybuilder');
    let radioButton: RadioButton = new RadioButton({
        label: 'JSON Rule',
        name: 'rule',
        value: 'json',
        checked: true,
        change: changeValue
    });
    radioButton.appendTo('#radio1');

    radioButton = new RadioButton({
        label: 'SQL Rule',
        name: 'rule',
        value: 'sql',
        change: changeValue
    });
    radioButton.appendTo('#radio2');
    let element: Element = document.getElementById('ruleContent');
    function updateRule(args: RuleChangeEventArgs): void {
        if ((getComponent(radioButton.element as HTMLElement, 'radio') as RadioButton).checked) {
            element.textContent = qryBldrObj.getSqlFromRules(args.rule);
        } else {
            element.textContent = JSON.stringify(args.rule, null, 4);
        }
    }
    element.textContent = JSON.stringify(qryBldrObj.getValidRules(qryBldrObj.rule), null, 4);
    function changeValue(): void {
        element = document.getElementById('ruleContent');
        let validRule: RuleModel = qryBldrObj.getValidRules(qryBldrObj.rule);
        if ((getComponent(radioButton.element as HTMLElement, 'radio') as RadioButton).checked) {
            element.textContent = qryBldrObj.getSqlFromRules(validRule);
        } else {
            element.textContent = JSON.stringify(validRule, null, 4);

        }
    }
    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        let sliderObj: Slider[] = [slider];
        sliderObj.forEach((sliderObj: any) => {
            sliderObj.refreshTooltip();
        });
    }
};