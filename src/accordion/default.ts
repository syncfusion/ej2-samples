import { loadCultureFiles } from '../common/culture-loader';
/**
 * Accordion Default Sample
 */
import { Accordion } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    // tslint:disable:max-line-length
    let acrdnObj: Accordion = new Accordion({      //Initialize Accordion component
       items : [
           { header: 'ASP.NET', expanded: true, content: 'Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser. ASP.NET pages use a compiled,event-driven programming model that improves performance and enables the separation of application logic and user interface.' },
           { header: 'ASP.NET MVC', content : 'The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications. The ASP.NET MVC framework is a lightweight, highly testable presentation framework that (as with Web Forms-based applications) is integrated with existing ASP.NET features, such as master pages and membership-based authentication.' },
           { header: 'JavaScript', content: 'JavaScript (JS) is an interpreted computer programming language.It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.More recently, however, it has become common in both game development and the creation of desktop applications.' }
       ]
    });
    // tslint:enable:max-line-length
    acrdnObj.appendTo('#Accordion_default');      //Render initialized Accordion component
};