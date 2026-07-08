import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Filter, Selection, DomVirtualization } from '@syncfusion/ej2-grids';
import { Rating } from '@syncfusion/ej2-inputs';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Selection, Sort, Filter, DomVirtualization);

/**
 * Grid DOM Virtualization sample
 */

 const avatarColorClasses: string[] = [
    'avatar-red', 'avatar-blue', 'avatar-green', 'avatar-orange', 'avatar-purple'
];

function getInitials(name: string): string {
    const parts: string[] = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function getAvatarClass(name: string): string {
    let sum: number = 0;
    for (let i: number = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return avatarColorClasses[sum % avatarColorClasses.length];
}

(<{ empAvatarDetail?: Function }>window).empAvatarDetail = (e: any): any => {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'customer-details';

    const avatarDiv: HTMLElement = document.createElement('div');
    avatarDiv.className = 'customer-avatar ' + getAvatarClass(e.Employees);
    avatarDiv.textContent = getInitials(e.Employees);

    const infoDiv: HTMLElement = document.createElement('div');
    infoDiv.className = 'customer-info';

    const namePara: HTMLElement = document.createElement('p');
    namePara.className = 'customer-name';
    namePara.textContent = e.Employees;

    const emailPara: HTMLElement = document.createElement('p');
    emailPara.className = 'customer-email';
    emailPara.textContent = e.Mail;

    infoDiv.appendChild(namePara);
    infoDiv.appendChild(emailPara);
    wrapper.appendChild(avatarDiv);
    wrapper.appendChild(infoDiv);

    return wrapper.outerHTML;
};

(<{ ratingDetail?: Function }>window).ratingDetail = (e: any): any => {
    let temp: HTMLTemplateElement = document.getElementsByTagName("template")[0];
    var cloneTemplate: any = temp.content.cloneNode(true);
    let ratingElement: HTMLElement = cloneTemplate.querySelector(".rating");
    const rating: Rating = new Rating({
        value: e.Rating,
        readOnly: true,
        cssClass: 'custom-rating'
    });
    rating.appendTo(ratingElement);
    return (ratingElement as any).ej2_instances[0].wrapper.outerHTML;
};

(<{ progessDetail?: Function }>window).progessDetail = (e: any): any => {
    const myProgress: Element = document.createElement('div');
    myProgress.id = 'myProgress';
    myProgress.className = 'pbar';
    const myBar: Element = document.createElement('div');
    myBar.id = 'myBar';
    myBar.className = 'bar';
    if (e.Status === 'Inactive') {
        myBar.classList.add('progressdisable');
    }
    if (e.Software <= 20) {
        e.Software = e.Software + 30;
    }
    (myBar as HTMLElement).style.width = e[e.column.field] + '%';
    const pbarlabel: Element = document.createElement('div');
    pbarlabel.id = 'pbarlabel';
    pbarlabel.className = 'barlabel';
    pbarlabel.textContent = e.Software + '%';
    myBar.appendChild(pbarlabel);
    myProgress.appendChild(myBar);
    return myProgress.outerHTML;
};

(<{ statusDetail?: Function }>window).statusDetail = (e: any): any => {
    const div: Element = document.createElement('div');
    const span: Element = document.createElement('span');
    if (e.Status === 'Active') {
        span.className = 'statustxt e-activecolor';
        span.textContent = 'Active';
        div.className = 'statustemp e-activecolor';
    } else {
        span.className = 'statustxt e-inactivecolor';
        span.textContent = 'Inactive';
        div.className = 'statustemp e-inactivecolor';
    }
    div.appendChild(span);
    return div.outerHTML;
};

let urlapi: DataManager = new DataManager({
    url: "https://services.syncfusion.com/js/production/api/UrlDataSource",
    adaptor: new UrlAdaptor()
});

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
    dataSource: urlapi,
    query: new Query().addParams('dataCount', '100000'),
    allowSelection: true,
    allowFiltering: true,
    allowSorting: true,
    enableVirtualization: true,
    enableDomVirtualization: true,
    domVirtualizationSettings: { rowBuffer: 10 },
    pageSettings: { pageSize: 100 },
    filterSettings: { type: 'CheckBox' },
    height: 400,
    rowHeight: 50,
    clipMode: 'EllipsisWithTooltip',
    columns: [
        { field: 'EmployeeID', visible: true, headerText: 'Employee ID', isPrimaryKey: true, width: '150', textAlign: 'Right' },
        {
            field: 'Employees', headerText: 'Employee Name', width: '260',
            template: '#empAvatarTemplate'
        },
        {
            field: 'Designation', headerText: 'Designation', width: '170'
        },
        {
            field: 'Status', headerText: 'Status',
            width: '150', template: '#statusTemplate'
        },
        {
            field: 'Trustworthiness', headerText: 'Trustworthiness',
            width: '160', template: '#trustTemplate', visible: false
        },
        {
            field: 'Rating', headerText: 'Rating',
            width: '160', template: '#ratingTemplate', visible: false
        },
        {
            field: 'Software', allowFiltering: false, allowSorting: false, headerText: 'Software Proficiency',
            width: '180', template: '#progessTemplate', visible: false
        },
        {
            field: 'CurrentSalary', headerText: 'Current Salary', format: 'C2',
            textAlign: 'Right', width: '160'
        },
        {
            field: 'Location', width: '160', headerText: 'Location'
        },
        { field: 'Address', headerText: 'Address', width: '240' },
    ]
});
grid.appendTo('#DOMVirtualGrid');
};
