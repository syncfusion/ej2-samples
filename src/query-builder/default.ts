import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';
import { employeeData } from './data-source';
import { Dialog, Tooltip } from '@syncfusion/ej2/popups';
import { getComponent } from '@syncfusion/ej2/base';

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
        ruleChange: updateRule,
        created: createdControl
    });
    qryBldrObj.appendTo('#querybuilder');
    let content: string;
    let dialogObj: Dialog = new Dialog({
        header: 'JSON',
        content: document.getElementById("dlgContent"),
        showCloseIcon: true,
        visible: false,
        isModal: true,
        buttons: [
            {
                'click': () => {
                    dialogObj.hide();
                },
                buttonModel:{
                    cssClass:'e-flat',
                    content:'Cancel'
                }
            },
            {
                'click': () => {
                    importQuery();
                },
                buttonModel:{
                    content:'Import',
                    isPrimary: true
                    
                }
            }
        ],
        width: '700px',
        height: '420px',
        animationSettings: { effect: 'Zoom' },
        beforeOpen: onBeforeopen
    });
    dialogObj.appendTo('#dialog');
    function createdControl(): void {
        if (Browser.isDevice) {
           qryBldrObj.summaryView = true;
        }
        updateRule();
    }
    function onBeforeopen(): void {
        let dlgContentElement: any = document.getElementById('dlgContent');
        let errorElem: HTMLElement = document.getElementById('dlgSpan');
        if (dlgContentElement) {
            let validRule: any =  qryBldrObj.getValidRules( qryBldrObj.rule);
            content = JSON.stringify(validRule, null, 4);
            dlgContentElement.value = content;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    }
    let tooltip: Tooltip = new Tooltip({
        opensOn: 'Click',
        content: 'Copied to clipboard'
    });
    tooltip.appendTo('#tooltipclick');
    function importQuery(): void {
        try {
            let textAreacontent: any = document.getElementById('dlgContent') as HTMLTextAreaElement;
            qryBldrObj.setRules(JSON.parse(textAreacontent.value));
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
    function updateRule(): void {
        let validRule: any = qryBldrObj.getValidRules(qryBldrObj.rule);
        content = JSON.stringify(validRule, null, 4);
        (document.getElementById('json-texarea') as HTMLTextAreaElement ).value = content;
        (document.getElementById('json-texarea') as HTMLTextAreaElement ).readOnly = true;
    }
    document.getElementById('json-btn').onclick = (): void => {
        dialogObj.show();
    };
    const queryPreview: any = document.getElementsByClassName('e-query-json-preview')[0];
    const copyElem: any = document.getElementById('copy-tooltip');
    queryPreview?.addEventListener('mouseenter', () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        elem[0].style.display = 'block';
    });
    queryPreview?.addEventListener('mouseleave', () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        elem[0].style.display = 'none';
    });
    copyElem?.addEventListener('click', (args: any) => {
        let content: any = (document.getElementById('json-texarea') as HTMLTextAreaElement ).value
        navigator.clipboard.writeText(content);
        setTimeout(() => { 
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as any).close();
        },1000);
    });
};
