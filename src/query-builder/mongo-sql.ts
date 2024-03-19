import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { QueryBuilder, ColumnsModel, RuleModel, QueryLibrary } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';
import { Tab } from '@syncfusion/ej2-navigations';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { Dialog, Tooltip } from '@syncfusion/ej2/popups';
import { DropDownButton, DropDownButtonModel, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { getComponent } from '@syncfusion/ej2/base';

QueryBuilder.Inject(QueryLibrary);

// tslint:disable-next-line
(window as any).default = (): void => {
    loadCultureFiles();
    let currentvalue: any = {
        value: '',
        rule: ''
    };
    let items: ItemModel[] = [
        {
            text: 'Import Mongo Query'
        },
        {
            text: 'Import Inline Sql'
        },
        {
            text: 'Import Parameter Sql'
        },
        {
            text: 'Import Named Parameter Sql'
        }
    ];
    let columns: ColumnsModel[] = [
        { field: "EmployeeID", label: "Employee ID", type: "number" },
        { field: "FirstName", label: "First Name", type: "string" },
        { field: "LastName", label: "Last Name", type: "string" },
        { field: "Age", label: "Age", type: "number" },
        { field: "IsDeveloper", label: "Is Developer", type: "boolean" },
        { field: "PrimaryFramework", label: "Primary Framework", type: "string" },
        { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy" },
        { field: "Country", label: "Country", type: "string" },
    ]
    let importRules: RuleModel = {
        condition: "and",
        rules: [
            { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre" },
            { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'] },
            { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29 },
            {
                condition: "or", rules: [
                    { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true },
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
        ruleChange: updateRule,
    });
    qryBldrObj.appendTo('#querybuilder');
    let selectedIndex: number = 0;
    let selectedContent: HTMLElement;
    let queryType: string = 'inline';
    let radiobutton: RadioButton = new RadioButton({ label: 'Inline', cssClass: 'e-custom-radio-btn', name: 'state', checked: true, value: "Inline", change: change });
    // Render initialized RadioButton.
    radiobutton.appendTo('#element1');
    radiobutton = new RadioButton({ label: 'Parameterized', name: 'state', value: "Parameterized", change: change, cssClass: 'e-custom-radio-btn' });
    radiobutton.appendTo('#element2');
    radiobutton = new RadioButton({ label: 'Named Parameter', name: 'state', value: "NamedParameter", change: change, cssClass: 'e-custom-radio-btn' });
    radiobutton.appendTo('#element3');
    let content: string;
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
    function convertParameterSql(qbrule: RuleModel): void {
        content = JSON.stringify(qryBldrObj.getParameterizedSql(qbrule), null, 4);
    }

    function convertNamedParameterSql(qbrule: RuleModel): void {
        content = JSON.stringify(qryBldrObj.getParameterizedNamedSql(qbrule), null, 4)
    }
    let dialogObj: Dialog = new Dialog({
        content: document.getElementById("mongo-dlgContent"),
        showCloseIcon: true,
        visible: false,
        isModal: true,
        buttons: [
            {
                'click': () => {
                    dialogObj.hide();
                },
                buttonModel: {
                    cssClass: 'e-flat',
                    content: 'Cancel'
                }
            },
            {
                'click': () => {
                    importQuery();
                },
                buttonModel: {
                    content: 'Import',
                    isPrimary: true
                }
            }
        ],
        width: '700px',
        height: '420px',
        animationSettings: { effect: 'Zoom' },
        beforeOpen: onBeforeopen
    });
    dialogObj.appendTo('#mongo-dialog');
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
    let mongoTooltip: Tooltip = new Tooltip({
        opensOn: 'Click',
        content: 'Copied to clipboard'
    });
    mongoTooltip.appendTo('#mongoTooltip');
    let ddbOption: DropDownButtonModel = {
        items: items,
        cssClass: 'e-caret-hide',
        select: (args: MenuEventArgs) => {
            let validRule: RuleModel = qryBldrObj.getValidRules(qryBldrObj.rule);
            switch (args.item.text) {
                case 'Import Mongo Query':
                    let mongoQuery: string = JSON.parse(qryBldrObj.getMongoQuery(validRule));
                    mongoQuery = JSON.stringify(mongoQuery, null, 4);
                    currentvalue.value = mongoQuery;
                    currentvalue.rule = 'mongo';
                    currentvalue.header = "Mongo Query";
                    dialogObj.show();
                    break;
                case 'Import Inline Sql':
                    currentvalue.value = qryBldrObj.getSqlFromRules(validRule);
                    currentvalue.rule = 'sql';
                    currentvalue.header = "SQL";
                    dialogObj.show();
                    break;
                case 'Import Parameter Sql':
                    currentvalue.value = JSON.stringify(qryBldrObj.getParameterizedSql(validRule), null, 4);
                    currentvalue.rule = 'parameter';
                    currentvalue.header = "Parameter SQL";
                    dialogObj.show();
                    break;
                case 'Import Named Parameter Sql':
                    currentvalue.value = JSON.stringify(qryBldrObj.getParameterizedNamedSql(validRule), null, 4);
                    currentvalue.rule = 'namedparameter';
                    currentvalue.header = "NamedParameter SQL";
                    dialogObj.show();
                    break;
                default:
                    break;
            }
        }
    };
    let drpDownBtn: DropDownButton = new DropDownButton(ddbOption);
    drpDownBtn.appendTo('#element');
    function onBeforeopen(): void {
        let dlgContentElement: any = document.getElementById('mongo-dlgContent');
        let errorElem: HTMLElement = document.getElementById('dlgSpan');
        if (dlgContentElement) {
            dlgContentElement.value = currentvalue.value;
            dialogObj.header = currentvalue.header;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    }
    function importQuery(): void {
        try {
            let textAreacontent: any = document.getElementById('mongo-dlgContent') as HTMLTextAreaElement;
            if (currentvalue.rule != 'sql') {
                var textAreaValue = JSON.parse(textAreacontent.value);
            }
            switch (currentvalue.rule) {
                case 'mongo':
                    qryBldrObj.setMongoQuery(textAreacontent.value);
                    break;
                case 'namedparameter':
                    qryBldrObj.setParameterizedNamedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'parameter':
                    qryBldrObj.setParameterizedSql(JSON.parse(textAreacontent.value));
                    break;
                case 'sql':
                    qryBldrObj.setRulesFromSql(textAreacontent.value, true);
                    break;
                default:
                    break;
            }
            updateRule();
            dialogObj.hide();
        } catch (error) {
            let errorElem: HTMLElement = document.getElementById('dlgSpan') as HTMLElement;
            if (!errorElem.classList.contains("error")) {
                errorElem.style.visibility = 'visible';
                errorElem.classList.add("error");
            }
        }
    }
    function convertMongoQuery() {
        let validRule = qryBldrObj.getValidRules(qryBldrObj.rule);
        let mongoQuery = JSON.parse(qryBldrObj.getMongoQuery(validRule));
        content = JSON.stringify(mongoQuery, null, 4);
        (selectedContent.querySelector('.e-text-area-content') as any).value = content;
    }
    function updateRule() {
        switch(selectedIndex) {
            case 0:
                updateContent();
                break;
            case 1:
                convertMongoQuery();
                break;
        }
    }
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

    const copyMongoTooltip: HTMLElement = document.getElementById('copy-mongo');
    copyMongoTooltip?.addEventListener('click', (args: any) => {
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
