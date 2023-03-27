import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Filter, Page, Selection, ColumnModel, CheckBoxChangeEventArgs, DataStateChangeEventArgs, Sorts } from '@syncfusion/ej2-grids';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-dropdowns';
import { AdaptorOptions, DataManager, DataResult, ODataAdaptor, ODataV4Adaptor, Query, UrlAdaptor, WebApiAdaptor } from '@syncfusion/ej2/data';
import { addClass, Ajax, removeClass } from '@syncfusion/ej2/base';
import { TextBox } from '@syncfusion/ej2/inputs';

Grid.Inject(Filter, Page, Selection);

(window as any).default = (): void => {
    loadCultureFiles();
    let changedAdaptor: string = 'ODataV4Adaptor';
    let selectedService: string = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/';
    let defaultParam: string;
    let defaultHeader: string;
    let header: [string];
    let params: [string];
    const serviceURL: { [key: string]: Object }[] = [
        { text: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/', value: 'ODataV4Adaptor' },
        { text: 'https://js.syncfusion.com/ejServices/Wcf/Northwind.svc/Orders/', value: 'ODataAdaptor' },
        { text: 'https://services.syncfusion.com/js/production/api/Orders', value: 'WebApiAdaptor' },
        { text: 'https://services.syncfusion.com/js/production/api/UrlDataSource', value: 'UrlAdaptor' },
        { text: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders', value: 'Custom Binding' }
    ];
    let defaultColumns: ColumnModel[] = [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID' },
        { field: 'EmployeeID', headerText: 'Employee ID', width: 120, textAlign: 'Right' },
        { field: 'ShipCity', headerText: 'Ship City', width: 140 },
    ];
    let empColumns: ColumnModel[] = [
        { field: 'EmployeeID', headerText: 'Employee ID', width: 130, textAlign: 'Right' },
        { field: 'Employees', headerText: 'Employee Name', width: 150 },
        { field: 'Designation', headerText: 'Designation', width: 130 },
        { field: 'CurrentSalary', headerText: 'Current Salary', format: "C2", textAlign: 'Right', width: 140 }
    ];
    let serviceDropdown: DropDownList = new DropDownList({
        dataSource: serviceURL,
        popupWidth: 'auto',
        text: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
        fields: { text: 'text', value: 'value' },
        change: function (e: ChangeEventArgs) {
            selectedService = e.itemData.text;
            changedAdaptor = e.itemData.value;
            (document.getElementById('adaptor_txt') as any).value = changedAdaptor;
            let paramElements = document.querySelectorAll('.params_show_hide');
            let headerElements = document.querySelectorAll('.header_show_hide');
            removeClass(paramElements, 'hide_elem');
            removeClass(headerElements, 'hide_elem');
            if (changedAdaptor === 'ODataAdaptor') {
                addClass(headerElements, 'hide_elem');
            }
            if (changedAdaptor === 'Custom Binding') {
                addClass(paramElements, 'hide_elem');
                addClass(headerElements, 'hide_elem');
            }
        }
    });
    serviceDropdown.appendTo('#service_drop');

    let adaptorTxtBox = new TextBox({
        value: 'ODataV4Adaptor',
        readonly: true,
    });
    adaptorTxtBox.appendTo('#adaptor_txt');

    var defaultData = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
        adaptor: new ODataV4Adaptor(),
        crossDomain: true
    });
    var grid = new Grid({
        dataSource: defaultData,
        columns: defaultColumns,
        allowPaging: true,
    });
    grid.appendTo('#Grid');

    document.getElementById('payload-detail').innerHTML = "<b><u>Payload Information</u></b><br> Service URL: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/' <br> Adaptor Type: ODataV4Adaptor";

    var pagerCheckbox: CheckBox = new CheckBox({
        checked: true,
        cssClass: "prop_page",
        label: 'Enable Paging'
    });
    pagerCheckbox.appendTo('#pageCheckbox');

    document.getElementById('additionalParams').addEventListener('click', () => {
        httpAdditionalInfo("paramsKey", "paramsValue", "addParams")
    })

    document.getElementById('headerId').addEventListener('click', () => {
        httpAdditionalInfo("hkey", "hvalue", "hdvalue")
    })

    function createObjectArray(headers: any) {
        let result = headers.trim().split('\n').map((head: any) => JSON.parse(head))
        return result;
    }

    const BASE_URL = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';
    const ajax: Ajax = new Ajax({
        type: 'GET', mode: true,
        onFailure: (e: Error) => { return false; }
    });

    async function executeCustomData(state: DataStateChangeEventArgs) {
        let result = await getData(state);
        grid.changeDataSource(result, defaultColumns)
    }

    function getData(state: DataStateChangeEventArgs): Promise<DataResult> {
        defaultParam = (document.getElementById("addParams") as any).value
        params = defaultParam ? createObjectArray(defaultParam) : [];
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        if (document.getElementById("pageCheckbox")['ej2_instances'][0].checked) {
            ajax.url = BASE_URL + "?" + pageQuery + "&$inlinecount=allpages&$format=json";
        }
        else {
            ajax.url = BASE_URL + "?" + "&$inlinecount=allpages&$format=json";
        }
        ajax.data = Object.assign({}, ...params);
        return ajax.send().then((response: any) => {
            let data: any = JSON.parse(response);
            return { result: data['d']['results'], count: parseInt(data['d']['__count'], 10) };
        });
    }

    changedAdaptor = (document.getElementById('service_drop') as any).ej2_instances[0].value
    document.getElementById('validateSubmit').onclick = function (e) {
        grid.query.params = [];
        grid.query.queries = [];
        defaultParam = (document.getElementById("addParams") as any).value
        defaultHeader = (document.getElementById('hdvalue') as any).value;
        header = defaultHeader ? createObjectArray(defaultHeader) : [];
        params = defaultParam ? createObjectArray(defaultParam) : [];
        let newDataSource: any;
        let checkboxState: boolean = document.getElementById("pageCheckbox")['ej2_instances'][0].checked;
        let newQuery: Query = new Query();
        params.forEach((obj: any) => {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    newQuery.addParams(key, value);
                    if (changedAdaptor !== 'UrlAdaptor' && changedAdaptor !== 'Custom Binding' && !checkboxState) {
                        if (key == 'skip') {
                            newQuery.skip(value);
                        }
                        if (key == 'take') {
                            newQuery.take(value);
                        }
                    }
                }
            }
        });
        grid.setProperties({ query: newQuery, allowPaging: checkboxState }, true);
        if (changedAdaptor === 'Custom Binding') {
            let state = { skip: 0, take: 12 };
            executeCustomData(state);
            grid.dataStateChange = function (args: DataStateChangeEventArgs) {
                executeCustomData(args);
            };
        }
        else {
            let col = changedAdaptor === 'UrlAdaptor' ? empColumns : defaultColumns;
            if (changedAdaptor === 'ODataV4Adaptor') {
                newDataSource = new DataManager({
                    url: 'https://services.syncfusion.com/js/production/api/Orders',
                    adaptor: new ODataV4Adaptor(),
                    headers: header,
                    crossDomain: true
                });
            }
            else if (changedAdaptor === 'UrlAdaptor') {
                newDataSource = new DataManager({
                    url: 'https://services.syncfusion.com/js/production/api/UrlDataSource',
                    adaptor: new UrlAdaptor(),
                    headers: header,
                    crossDomain: true
                });
            }
            else if (changedAdaptor === 'WebApiAdaptor') {
                newDataSource = new DataManager({
                    url: 'https://services.syncfusion.com/js/production/api/Orders',
                    adaptor: new WebApiAdaptor(),
                    headers: header,
                    crossDomain: true
                });
            }
            else if (changedAdaptor === 'ODataAdaptor') {
                newDataSource = new DataManager({
                    url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
                    adaptor: new ODataAdaptor(),
                    crossDomain: true
                });
            }
            grid.changeDataSource(newDataSource, col)
        }
        let payloadInfo: string;
        if (changedAdaptor === 'Custom Binding') {
            payloadInfo = `<b><u>Payload Information</u></b><br> Custom Binding <br> Service URL: ${selectedService}`;
        }
        else if (changedAdaptor === 'ODataAdaptor') {
            payloadInfo = `<b><u>Payload Information</u></b><br> Service URL: ${selectedService} <br> Adaptor Type: ${changedAdaptor} <br> Additional Parameters: ${defaultParam}`;
        }
        else {
            payloadInfo = `<b><u>Payload Information</u></b><br> Service URL: ${selectedService} <br> Adaptor Type: ${changedAdaptor} <br> Additional Parameters: ${defaultParam} <br> Headers: ${defaultHeader}`;
        }
        document.getElementById('payload-detail').innerHTML = '';
        document.getElementById('payload-detail').innerHTML += payloadInfo;
        (document.getElementById("addParams") as any).value = '';
        (document.getElementById("hdvalue") as any).value = '';
    }

    var httpAdditionalInfo = (name: string, val: string, btn: string) => {
        let parameterKey = (document.getElementById(name) as any).value;
        let parameterValue = (document.getElementById(val) as any).value;
        parameterKey && parameterValue ? (document.getElementById(btn) as any).value += `{"${parameterKey}": "${parameterValue}"}\n` : null;
        (document.getElementById(name) as any).value = '';
        (document.getElementById(val) as any).value = '';
    }
};
