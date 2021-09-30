import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel, ActionEventArgs } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { RadioButton } from '@syncfusion/ej2-buttons';

/**
 * Rule Template sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let filter: ColumnsModel[] = [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string'},
        { field: 'LastName', label: 'Last Name', type: 'string'},
        { field: 'BirthDate', label: 'Hire Date', type: 'date'},
        { field: 'Country', label: 'Country', type: 'string', ruleTemplate:"#ruleTemplate"}
    ];
    let fieldObj: DropDownList;
    let valueObj: DropDownList;
    let operatorObj0: RadioButton;
    let operatorObj1: RadioButton;

    let val: { [key: string]: Object }[] = [
        { field: 'USA', label: 'USA' },
        { field: 'england', label: 'England' },
        { field: 'india', label: 'India' },
        { field: 'spain', label: 'Spain'}
    ];

    let importRules: RuleModel = {
        'condition': 'and',
        'rules': [
            {
                'label': 'Last Name',
                'field': 'LastName',
                'type': 'string',
                'operator': 'equal',
                'value': 'Davolio'
            },
            {
                'label': 'Country',
                'field': 'Country',
                'type': 'string',
                'operator': 'equal',
                'value': "USA"
            }
        ]
    };
    let qryBldrObj: QueryBuilder = new QueryBuilder({
        dataSource: employeeData,
        columns: filter,
        rule: importRules,
        actionBegin: actionBegin
    });
    qryBldrObj.appendTo('#querybuilder');

    function actionBegin(args: ActionEventArgs): void {
        if (args.requestType === 'template-create') {         
            fieldObj = new DropDownList ({
                dataSource: this.columns,
                fields: args.fields,
                value: args.rule.field,
                change: (e: any) => {
                    qryBldrObj.notifyChange(e.value, e.element, 'field');
                }
            });
            fieldObj.appendTo('#' + args.ruleID + '_filterkey');
            operatorObj0 = new RadioButton ({
                label:'Is Equal',
                name:'operator',
                value:'equal',
                checked: args.rule.operator === 'equal'? true : false,
                change: function (e) {
                    qryBldrObj.notifyChange(e.value, e.event.target as Element, 'operator');
                }
            });
            operatorObj0.appendTo('#' + args.ruleID + '_operatorkey0');
            operatorObj1 = new RadioButton ({
                label:'Is Not Equal',
                name:'operator',
                value:'notequal',
                checked: args.rule.operator === 'notequal'? true : false,
                change: function (e) {
                    qryBldrObj.notifyChange(e.value, e.event.target as Element, 'operator');
                }
            });

            operatorObj1.appendTo('#' + args.ruleID + '_operatorkey1');
            valueObj = new DropDownList ({
                dataSource: val,
                fields: args.fields,
                value: args.rule.value as any,
                change: (e: any) => {
                    qryBldrObj.notifyChange(e.value, e.element, 'value');
                }
            });
            valueObj.appendTo('#' + args.ruleID + '_valuekey');
        }
    }
};