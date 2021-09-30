import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';

/**
 * Default querybuilder sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let columnData: ColumnsModel[] = [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string' },
        { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
        { field: 'Title', label: 'Title', type: 'string' },
        { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
        { field: 'Country', label: 'Country', type: 'string' },
        { field: 'City', label: 'City', type: 'string' }
    ];
    let importRules: RuleModel = {
        'condition': 'and',
        'rules': [{
            'label': 'EmployeeID',
            'field': 'EmployeeID',
            'type': 'number',
            'operator': 'equal',
            'value': 1
        },
        {
            'label': 'Title',
            'field': 'Title',
            'type': 'string',
            'operator': 'equal',
            'value': 'Sales Manager'
        }]
    };
    let qryBldrObj: QueryBuilder = new QueryBuilder({
        dataSource: employeeData,
        columns: columnData,
        rule: importRules,
        created: createdControl
    });
    qryBldrObj.appendTo('#querybuilder');
    function createdControl(): void {
        if (Browser.isDevice) {
           qryBldrObj.summaryView = true;
        }
    }
};