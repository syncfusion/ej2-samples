import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel, RuleChangeEventArgs } from '@syncfusion/ej2-querybuilder';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
import { hardwareData } from './data-source';
import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
Grid.Inject(Page, Selection);

/**
 * Integration with Data Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnData: ColumnsModel[] = [
        { field: 'TaskID', label: 'Task ID', type: 'number' },
        { field: 'Name', label: 'Name', type: 'string' },
        { field: 'Category', label: 'Category', type: 'string' },
        { field: 'SerialNo', label: 'Serial No', type: 'string' },
        { field: 'InvoiceNo', label: 'Invoice No', type: 'string' },
        { field: 'Status', label: 'Status', type: 'string' }
    ];
    let importRules: RuleModel = {
        'condition': 'or',
        'rules': [{
            'label': 'Category',
            'field': 'Category',
            'type': 'string',
            'operator': 'equal',
            'value': 'Laptop'
        }]
    };

    let qryBldrObj: QueryBuilder = new QueryBuilder({
        dataSource: hardwareData,
        columns: columnData,
        rule: importRules,
        ruleChange: updateRule
    });
    qryBldrObj.appendTo('#querybuilder');
    let grid: Grid;
    createGrid(new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']));
    updateRule({rule: qryBldrObj.getValidRules(qryBldrObj.rule) });
    function updateRule(args: RuleChangeEventArgs): void {
        let predicate: Predicate = qryBldrObj.getPredicate(args.rule);
        let query: Query;
        if (isNullOrUndefined(predicate)) {
            query = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']);
        } else {
            query = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status'])
                .where(predicate);
        }
        grid.query = query;
        grid.refresh();
    }

    function createGrid(query: Query): void {
        grid = new Grid(
            {
                dataSource: new DataManager(hardwareData),
                query: query,
                width: '100%',
                allowPaging: true,
                columns: [
                    { field: 'TaskID', headerText: 'Task ID', width: 100, textAlign: 'Right' },
                    { field: 'Name', headerText: 'Name', width: 140 },
                    { field: 'Category', headerText: 'Category', width: 120, textAlign: 'Right' },
                    { field: 'InvoiceNo', headerText: 'Invoice No', width: 130 },
                    { field: 'Status', headerText: 'Status', width: 110 },
                    { field: 'SerialNo', headerText: 'Serial No', width: 140 },
                ],
                pageSettings: { pageSize: 8, pageCount: 5 },
            });
        grid.appendTo('#Grid');
    }
};