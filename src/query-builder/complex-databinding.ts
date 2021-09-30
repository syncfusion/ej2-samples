import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';
import { complexData } from './data-source';

/**
 * Default querybuilder sample
 */
// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let columns: ColumnsModel[] = [
        {field: 'Employee', label: 'Employee', columns: [
            { field: 'ID', label: 'ID', type: 'number'},
            { field: 'DOB', label: 'Date of birth', type: 'date'},
            { field: 'HireDate', label: 'Hire Date', type: 'date'},
            { field: 'Salary', label: 'Salary', type: 'number'},
            { field: 'Age', label: 'Age', type: 'number'},
            { field: 'Title', label: 'Title', type: 'string'}
        ]},
        {field: 'Name', label: 'Name', columns: [
            { field: 'FirstName', label: 'First Name', type: 'string'}, 
            { field: 'LastName', label: 'Last Name', type: 'string'}
        ]},
        {field: 'Country', label: 'Country', columns : [
            { field: 'State', label: 'State', columns : [
                { field: 'City', label: 'City', type: 'string'}, 
                { field: 'Zipcode', label: 'Zip Code', type: 'number'}] },
            { field: 'Region', label: 'Region', type: 'string'},
            { field: 'Name', label: 'Name', type: 'string'}
        ]}
    ]
    let importRules: RuleModel = {
        condition: 'and',
        rules: [{
            label: 'ID',
            field: 'Employee.ID',
            type: 'number',
            operator: 'equal',
            value: 1001
        },
        {
            label: 'First Name',
            field: 'Name.FirstName',
            type: 'string',
            operator: 'equal',
            value: 'Mark'
        },
        {
            condition: 'or',
            rules: [{
                label: 'City',
                field: 'Country.State.City',
                operator: 'equal',
                type: 'string',
                value: 'Jersey City'
            }, {
                label: 'Date of birth',
                field: 'Employee.DOB',
                operator: 'equal',
                type: 'date',
                value: '7/7/96'
            }]
        }
        ]
    };
    let qryBldrObj: QueryBuilder = new QueryBuilder({
        dataSource: complexData,
        separator: '.',
        columns: columns,
        rule: importRules,
        fieldMode: 'DropdownTree'
    });
    qryBldrObj.appendTo('#querybuilder');
};