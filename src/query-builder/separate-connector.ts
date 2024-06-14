import { loadCultureFiles } from '../common/culture-loader';
import { QueryBuilder, ColumnsModel, RuleModel, QueryLibrary } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';
import { getComponent } from '@syncfusion/ej2/base';
import { Tab } from '@syncfusion/ej2-navigations';
import { Tooltip } from '@syncfusion/ej2/popups';
import { RadioButton } from '@syncfusion/ej2-buttons';
QueryBuilder.Inject(QueryLibrary);

// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let content: string = "";
    let  selectedIndex: number = 0;
    let selectedContent: HTMLElement;
    let dateOperators: any = [
        { value: 'equal', key: 'Equal' },
        { value: 'greaterthan', key: 'Greater Than' },
        { value: 'greaterthanorequal', key: 'Greater Than Or Equal' },
        { value: 'lessthan', key: 'Less Than' },
        { value: 'lessthanorequal', key: 'Less Than Or Equal' },
        { value: 'notequal', key: 'Not Equal' },
        { value: 'between', key: 'Between' },
        { value: 'notbetween', key: 'Not Between' }
    ];
    let boolOperators: any = [
        { value: 'equal', key: 'Equal' },
    ];
    let columns: ColumnsModel[] = [
        { field: "EmployeeID", label: "Employee ID", type: "number" },
        { field: "FirstName", label: "First Name", type: "string" },
        { field: "LastName", label: "Last Name", type: "string" },
        { field: "Age", label: "Age", type: "number" },
        { field: "IsDeveloper", label: "Is Developer", type: "boolean", operators: boolOperators },
        { field: "PrimaryFramework", label: "Primary Framework", type: "string" },
        { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy", operators: dateOperators },
        { field: "Country", label: "Country", type: "string" },
    ]
    let importRules: RuleModel = {
        condition: "",
        rules: [
            { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre", condition: "and" },
            { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'], condition: "or" },
            { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29, condition: "and" },
            {
                condition: "or", rules: [
                    { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true, condition: "and" },
                    { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                ]
            },
            { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["11/22/2023", "11/30/2023"] },
        ],
    };
    let qryBldrObj: QueryBuilder = new QueryBuilder({
        dataSource: employeeData,
        columns: columns,
        rule: importRules,
        enableSeparateConnector: true,
        ruleChange: updateRule
    });
    qryBldrObj.appendTo('#querybuilder');
    let queryType: string = 'inline';
    let radiobutton: RadioButton = new RadioButton({ label: 'Inline', cssClass: 'e-custom-radio-btn', name: 'state', checked: true, value: "Inline", change: change });
    // Render initialized RadioButton.
    radiobutton.appendTo('#element1');
    radiobutton = new RadioButton({ label: 'Parameterized', name: 'state', value: "Parameterized", change: change, cssClass: 'e-custom-radio-btn' });
    radiobutton.appendTo('#element2');
    radiobutton = new RadioButton({ label: 'Named Parameter', name: 'state', value: "NamedParameter", change: change, cssClass: 'e-custom-radio-btn' });
    radiobutton.appendTo('#element3');
    function change(args: any): void {
        queryType = args.value.toLowerCase();
        updateContent();
    }
    function updateContent(): void {
        let qbrule: RuleModel = qryBldrObj.getValidRules();
        switch (queryType) {
            case 'inline':
                content = qryBldrObj.getSqlFromRules(qbrule);;
                break;
            case 'parameterized':
                convertParameterSql(qbrule);
                break;
            default:
                convertNamedParameterSql(qbrule);
                break;
        }
        (document.getElementsByClassName('e-text-area-content')[0] as any).value = content;
    }
    function tabChange(args: any) {
        selectedIndex = args.selectedIndex;
        selectedContent = args.selectedContent;
        updateRule();
    }
    function updateRule() {
        switch(selectedIndex) {
            case 0:
                updateContent();
                break;
            case 1:
                updateJsonContent();
                break;
        }
    }
    function updateJsonContent() {
        let validRule: any =  qryBldrObj.getValidRules( qryBldrObj.rule);
        content = JSON.stringify(validRule, null, 4);
        (selectedContent.querySelector('.e-text-area-content') as any).value = content;
    }
    function convertParameterSql(qbrule: RuleModel): void {
        content = JSON.stringify(qryBldrObj.getParameterizedSql(qbrule), null, 4);
    }

    function convertNamedParameterSql(qbrule: RuleModel): void {
        content = JSON.stringify(qryBldrObj.getParameterizedNamedSql(qbrule), null, 4)
    }

    let tabObj: Tab = new Tab({
        height: 320,
        created: updateContent,
        selected: tabChange
    });
    //Render initialized Tab component
    tabObj.appendTo('#tab_orientation');

    let sqlTooltip: Tooltip = new Tooltip({
        opensOn: 'Click',
        content: 'Copied to clipboard'
    });
    sqlTooltip.appendTo('#sqlTooltip');
    let jsonTooltip: Tooltip = new Tooltip({
        opensOn: 'Click',
        content: 'Copied to clipboard'
    });
    jsonTooltip.appendTo('#jsonTooltip');
    const queryPreview: HTMLElement = document.getElementById('e-query-preview');
    queryPreview?.addEventListener('mouseenter', () => {
        let elem: any= document.getElementsByClassName("copy-tooltip");
        for (let i: number = 0; i < elem.length; i++) {
            if (selectedIndex == i) {
                elem[i].style.display = 'block';
            }
        }
    });
    queryPreview?.addEventListener('mouseleave', () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        for (let i: number = 0; i < elem.length; i++) {
            if (selectedIndex == i) {
                elem[i].style.display = 'none';
            }
        }
    });

    const copyJsonTooltip: HTMLElement = document.getElementById('copy-json');
    copyJsonTooltip?.addEventListener('click', (args: any) => {
        navigator.clipboard.writeText(content);
        setTimeout(() => { 
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        },1000);
    });
    const copySQLTooltip: HTMLElement = document.getElementById('copy-sql');
    copySQLTooltip?.addEventListener('click', (args: any) => {
        navigator.clipboard.writeText(content);
        setTimeout(() => { 
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        },1000);
    });
};