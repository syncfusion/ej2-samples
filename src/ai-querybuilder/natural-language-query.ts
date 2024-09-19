
import { enableRipple, isNullOrUndefined } from '@syncfusion/ej2-base';
import { QueryBuilder, ColumnsModel } from '@syncfusion/ej2-querybuilder';
import { Button } from '@syncfusion/ej2/buttons';
import { Tab } from '@syncfusion/ej2/navigations';
import { Grid } from '@syncfusion/ej2/grids';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';


enableRipple(true);

(window as any).default = (): void => {

    function generateRandomUsers(count: number): object[] {
    const names: string[] = ["John", "Jane", "Bob", "Alice", "Tom", "Sally", "Jim", "Mary", "Peter", "Nancy"];
    const cities: string[] = ["Los Angeles", "San Diego", "New York", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "Dallas", "San Jose"];
    const states: string[] = ["California", "New York", "Illinois", "Texas", "Arizona", "Pennsylvania"];
    const streets: string[] = ["Elm St", "Oak St", "Maple Ave", "Pine St", "Cedar St", "Birch St"];
    const emails: string[] = ["example.com", "test.com", "demo.com"];
    const users: object[] = [];

    for (let i = 0; i < count; i++) {
        const id: number = i + 1;
        const name: string = names[Math.floor(Math.random() * names.length)];
        const email: string = `${name.toLowerCase()}${id}@${emails[Math.floor(Math.random() * emails.length)]}`;
        const address: string = `${Math.floor(Math.random() * 10000)} ${streets[Math.floor(Math.random() * streets.length)]}`;
        const city: string = cities[Math.floor(Math.random() * cities.length)];
        const state: string = states[Math.floor(Math.random() * states.length)];
        const zipcode: string = `${Math.floor(10000 + Math.random() * 90000)}`;
        const credits: number = Math.floor(Math.random() * 2001);
        users.push({ id, name, email, address, city, state, zipcode, credits });
    }

    return users;
    }

    const users = generateRandomUsers(20);

    let tabObj: Tab = new Tab({ items: [
    { header: { 'text': 'Natural Language Query' }, content: '#prompt-ui' },
    { header: { 'text': 'Query Builder UI' }, content: '#querybuilder-ui' }
    ]});

    tabObj.appendTo('#tab');

    createSpinner({
    target: document.getElementById('grid') as HTMLElement
    });


    let textAreaEle = document.getElementById('text-area') as any;
    if (textAreaEle) {
        textAreaEle.value = 'find all users who lives in los angeles and have over 1000 credits';
    }
    let grid: Grid = new Grid({
    dataSource: users,
    allowPaging: true,
    pageSettings: { pageSize: 10 },
    columns: [
        { field: 'id', headerText: 'ID', textAlign: 'Right', width: 120 },
        { field: 'name', headerText: 'Name', width: 120 },
        { field: 'email', headerText: 'Email', width: 150 },
        { field: 'address', headerText: 'Address', width: 120 },
        { field: 'city', headerText: 'City', width: 120 },
        { field: 'state', headerText: 'State', width: 120 },
        { field: 'credits', headerText: 'Credits', width: 120 }
    ]
    });

    grid.appendTo('#grid');

    let columnData: ColumnsModel[] = [
    { field: 'id', label: 'ID', type: 'number' },
    { field: 'name', label: 'Name', type: 'string' },
    { field: 'email', label: 'Email', type: 'string' },
    { field: 'address', label: 'Address', type: 'string' },
    { field: 'city', label: 'City', type: 'string' },
    { field: 'state', label: 'State', type: 'string' },
    { field: 'credits', label: 'Credits', type: 'number' }
    ];

    let qryBldrObj: QueryBuilder = new QueryBuilder({
    dataSource: users,
    columns: columnData
    });
    qryBldrObj.appendTo('#querybuilder');


    let button: Button = new Button({
    iconCss: 'e-icons e-reset'
    });
    button.appendTo('#submit');

    if (button.element) {
        button.element.onclick = (): void => {
        showSpinner(document.getElementById('grid') as HTMLElement);
        let textArea = "write SQL query to " + (document.querySelector('#text-area') as any).value + " from the single table without changing the given values"; 
        let aiOutput = (window as any).getAzureChatAIRequest(textArea);
        aiOutput.then((result: any) => {
            let val: string =  (result as any).split("```sql")[1].split("WHERE ")[1].split(";\n")[0];
            val = val.replace("\n", "");
            qryBldrObj.setRulesFromSql(val);
            let predicate: Predicate = qryBldrObj.getPredicate(qryBldrObj.getValidRules());
            let query: Query;
            if (isNullOrUndefined(predicate)) {
                query = new Query();
            } else {
                query = new Query().where(predicate);
            }
            grid.query = query;
            grid.refresh();
            hideSpinner(document.getElementById('grid') as HTMLElement);
        });
        };
    }
}

// Sample Queries to tryout
// find all users who lives in los angeles and have over 1000 credits
// find all users who lives in california and have over 1000 credits
// find all users who have over 1000 credits
