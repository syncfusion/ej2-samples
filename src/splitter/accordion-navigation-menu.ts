import { loadCultureFiles } from '../common/culture-loader';
import { Splitter } from '@syncfusion/ej2-layouts';
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';
import { Ajax } from '@syncfusion/ej2-base';
import { ListView } from '@syncfusion/ej2-lists';
/**
 *  Sample for accordion in splitter
 */
//tslint:disable: max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // tslint:disable:max-line-length
    let acrdnObj: Accordion = new Accordion({  //Initialize Accordion component
    items : [
        { header: 'ASP.NET', expanded: true, content: '<div id="nested_Acc1"></div>' },
        { header: 'ASP.NET MVC', content : '<div id="nested_Acc2"></div>' },
        { header: 'JavaScript', content: '<div id="nested_Acc3"></div>' }
    ],
    expanded: onexpanded,
    expanding: onexpanding
    });
    // tslint:enable:max-line-length
    acrdnObj.appendTo('#Accordion_default');
    let splitterObj: Splitter = new Splitter({
        height: '288px',
        paneSettings: [
            { size: '39%', min: '30%' },
            { size: '65%', min: '45%' }
        ],
        width: '100%'
    });
    splitterObj.appendTo('#splitter');
    // tslint:disable:max-line-length
    function onexpanded(e: ExpandEventArgs): void {
        if (e.isExpanded && [].indexOf.call(this.items, e.item) === 0) {
            if (e.element.querySelectorAll('.e-list-parent').length > 0) {
                return;
            }
            let data: { [key: string]: Object }[] = [
                { text: 'Grid', id: '1' },
                { text: 'Schedule', id: '2'},
                { text: 'Chart', id: '7'}
            ];
            let listObj: ListView = new ListView({
                dataSource: data,
                select: onselect
            });
            listObj.appendTo('#nested_Acc1');
        }
        if (e.isExpanded && [].indexOf.call(this.items, e.item) === 1) {
            if (e.element.querySelectorAll('.e-list-parent').length > 0) {
                return;
            }
            let data: { [key: string]: Object }[] = [
                { text: 'Grid', id: '3' },
                { text: 'Schedule', id: '4'},
                { text: 'Chart', id: '8'}
            ];
            let listObj1: ListView = new ListView({
                dataSource: data,
                select: onselect
            });
            listObj1.appendTo('#nested_Acc2');
        }
        if (e.isExpanded && [].indexOf.call(this.items, e.item) === 2) {
            if (e.element.querySelectorAll('.e-list-parent').length > 0) {
                return;
            }
            let data: { [key: string]: Object }[] = [
                { text: 'Grid', id: '5' },
                { text: 'Schedule', id: '6'},
                { text: 'Chart', id: '9'}
            ];
            let listObj2: ListView = new ListView({
                dataSource: data,
                select: onselect
            });
            listObj2.appendTo('#nested_Acc3');
        }
    }
    function onselect(e: any): void {
        let listid: string = e.item.dataset.uid;
        switch (listid) {
            case '1':
                let ajax: Ajax = new Ajax('./src/splitter/aspnet-grid-ajax.html', 'GET', true);
                ajax.send().then();
                ajax.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '2':
                let ajax1: Ajax = new Ajax('./src/splitter/aspnet-schedule-ajax.html', 'GET', true);
                ajax1.send().then();
                ajax1.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '3':
                let ajax2: Ajax = new Ajax('./src/splitter/aspnetmvc-grid-ajax.html', 'GET', true);
                ajax2.send().then();
                ajax2.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '4':
                let ajax3: Ajax = new Ajax('./src/splitter/aspnetmvc-schedule-ajax.html', 'GET', true);
                ajax3.send().then();
                ajax3.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '5':
                let ajax4: Ajax = new Ajax('./src/splitter/javascript-grid-ajax.html', 'GET', true);
                ajax4.send().then();
                ajax4.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '6':
                let ajax5: Ajax = new Ajax('./src/splitter/javascript-schedule-ajax.html', 'GET', true);
                ajax5.send().then();
                ajax5.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '7':
                let ajax6: Ajax = new Ajax('./src/splitter/aspnet-chart-ajax.html', 'GET', true);
                ajax6.send().then();
                ajax6.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '8':
                let ajax7: Ajax = new Ajax('./src/splitter/aspnetmvc-chart-ajax.html', 'GET', true);
                ajax7.send().then();
                ajax7.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
            case '9':
                let ajax8: Ajax = new Ajax('./src/splitter/javascript-chart-ajax.html', 'GET', true);
                ajax8.send().then();
                ajax8.onSuccess = (data: any) =>  {
                    splitterObj.paneSettings[1].content = data;
                };
                break;
        }
    }
    function onexpanding(e: any): void {
        let index: number = e.index;
        switch (index) {
            case 0:
                document.getElementById('accordion-splitter-content').innerHTML = '<h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.';
                break;
            case 1:
                document.getElementById('accordion-splitter-content').innerHTML = '<h4>About ASP.NET MVC</h4>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications. The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages.';
                break;
            case 2:
                document.getElementById('accordion-splitter-content').innerHTML = '<h4>About JavaScript</h4>JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.';
                break;
        }
    }
};
