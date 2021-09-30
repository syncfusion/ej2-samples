import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel, RuleChangeEventArgs, ActionEventArgs } from '@syncfusion/ej2-querybuilder';
import { closest } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { employeeData } from './data-source';

/**
 * Header Template sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let filter: ColumnsModel[] = [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string'},
        { field: 'LastName', label: 'Last Name', type: 'string'},
        { field: 'HireDate', label: 'Hire Date', type: 'date'},
        { field: 'Country', label: 'Country', type: 'string'}
    ];

    let importRules: RuleModel = {
            'condition': 'and',
            'rules': [{
                'label': 'First Name',
                'field': 'FirstName',
                'type': 'string',
                'operator': 'equal',
                'value': 'Nancy'
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
        headerTemplate: '#headerTemplate',
        actionBegin: actionBegin
    });
    qryBldrObj.appendTo('#querybuilder');

    function actionBegin(args: ActionEventArgs): void {
        if (args.requestType === 'header-template-create') {
            let ds: { [key: string]: Object }[] = [{'key': 'AND', 'value': 'and'},{'key': 'OR', 'value': 'or'}];
            let btnObj: DropDownList= new DropDownList({
                dataSource: ds,
                fields: { text: 'key', value: 'value' },
                value: args.condition,
                cssClass: 'e-custom-group-btn e-active-toggle',
                change: (e: any) => {
                    qryBldrObj.notifyChange(e.value, e.element, 'condition');
                }
            });
            btnObj.appendTo('#' + args.ruleID + '_cndtnbtn');
            let addGroup: Element =  document.getElementById(args.ruleID).querySelector('.e-grp-btn');
            if (addGroup) {
                (addGroup as HTMLElement).onclick = function (e:any) {
                    let addbtn: Element = closest(e.target,'.e-grp-btn');  let ddb: string[]= addbtn.id.split('_');
                    qryBldrObj.addGroups([{condition: 'and', 'rules': [{}]}], ddb[1]);
                }
            }
            let addCond: Element =  document.getElementById(args.ruleID).querySelector('.e-cond-btn');
            if (addCond) {
                (addCond as HTMLElement).onclick = function (e:any) {
                    let addbtn: Element = closest(e.target,'.e-cond-btn');  let ddb: string[]= addbtn.id.split('_');
                    qryBldrObj.addRules([{}], ddb[1]);
                }
            }
            let deleteGroup: Element =  document.getElementById(args.ruleID).querySelector('.e-del-btn');
            if (deleteGroup) {
                (deleteGroup as HTMLElement).onclick = function (e:any) {
                    qryBldrObj.deleteGroup(closest(e.target.offsetParent, '.e-group-container'));
                }
            }
        }
    }
};