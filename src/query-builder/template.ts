import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel, RuleChangeEventArgs } from '@syncfusion/ej2-querybuilder';
import { getComponent } from '@syncfusion/ej2-base';
import { CheckBox, RadioButton } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider } from '@syncfusion/ej2-inputs';
import { expenseData } from './data-source';
import { Tab } from '@syncfusion/ej2-navigations';
import { getCELQuery, getSpELQuery } from './util';
import { Tooltip } from '@syncfusion/ej2/popups';

/**
 * Template sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let content: string = "";
    let  selectedIndex: number = 0;
    let selectedContent: HTMLElement;
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
        ruleChange: updateContentTemplate,
    });
    qryBldrObj.appendTo('#querybuilder');
    let tabObj: Tab = new Tab({
        height: 320,
        created: updateCELContentTemplate,
        selected: tabChange
    });
    //Render initialized Tab component
    tabObj.appendTo('#tab_orientation');
    let celTooltip: Tooltip = new Tooltip({
        opensOn: 'Click',
        content: 'Copied to clipboard'
    });
    celTooltip.appendTo('#celTooltip');
    let spelTooltip: Tooltip = new Tooltip({
        opensOn: 'Click',
        content: 'Copied to clipboard'
    });
    spelTooltip.appendTo('#spelTooltip');
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

    function tabChange(args: any) {
        selectedIndex = args.selectedIndex;
        selectedContent = args.selectedContent;
        setTimeout(function() {
            updateContentTemplate();
        }, 100);
    }

    function updateCELContentTemplate(): void {
        const allRules = qryBldrObj.getValidRules();
        let celQuery: string = '';
        celQuery = getCELQuery(allRules, celQuery);
        content = celQuery
        document.getElementsByClassName('e-cel-content')[0].textContent = content;
        (document.getElementsByClassName('e-cel-content')[0] as HTMLElement).style.display = 'block';
    }

    function updateContentTemplate(): void {
        switch (selectedIndex) {
            case 0:
                updateCELContentTemplate();
                break;
            case 1:
                updateSpCELContentTemplate();
                break;
        }
    };

    function updateSpCELContentTemplate(): void {
        const allRules: any = qryBldrObj.getValidRules();
        content = getSpELQuery(allRules);
        document.getElementsByClassName('e-spel-content')[0].textContent = content;
        (document.getElementsByClassName('e-spel-content')[0] as HTMLElement).style.display = 'block';
    }

    const queryPreview: HTMLElement = document.getElementById('e-query-preview');

    queryPreview?.addEventListener('mouseenter', () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (var i: number = 0; i< elem.length; i++) {
            if(tabObj.selectedItem == i) {
                elem[i].style.display = 'block';
            }
        }
    });

    queryPreview?.addEventListener('mouseleave', () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (let i: number = 0; i< elem.length; i++) {
            if(tabObj.selectedItem == i) {
                elem[i].style.display = 'none';
            }
        }
    });
    const celElem: HTMLElement = document.getElementById('copy-cel');
    const spelElem: HTMLElement = document.getElementById('copy-spel');
    celElem?.addEventListener('click', (args: any) => {
        navigator.clipboard.writeText(content);
        setTimeout(() => { 
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        },1000);
    });
    spelElem?.addEventListener('click', (args: any) => {
        navigator.clipboard.writeText(content);
        setTimeout(() => { 
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        },1000);
    });
};
