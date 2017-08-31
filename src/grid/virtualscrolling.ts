import { VirtualScroll, Grid } from '@syncfusion/ej2-grids';

/**
 * virtualscrolling sample
 */
Grid.Inject(VirtualScroll);

this.default = (): void => {
    let virtualData: Object[] = [];
    let names: string[] = ['hardire', 'abramjo01', 'aubucch01', 'Hook', 'Rumpelstiltskin', 'Belle', 'Emma', 'Regina', 'Aurora', 'Elsa',
    'Anna', 'Snow White', 'Prince Charming', 'Cora', 'Zelena', 'August', 'Mulan', 'Graham', 'Discord', 'Will', 'Robin Hood',
    'Jiminy Cricket', 'Henry', 'Neal', 'Red', 'Aaran', 'Aaren', 'Aarez', 'Aarman', 'Aaron', 'Aaron-James', 'Aarron', 'Aaryan', 'Aaryn',
    'Aayan', 'Aazaan', 'Abaan', 'Abbas', 'Abdallah', 'Abdalroof', 'Abdihakim', 'Abdirahman', 'Abdisalam', 'Abdul', 'Abdul-Aziz',
    'Abdulbasir', 'Abdulkadir', 'Abdulkarem', 'Abdulkhader', 'Abdullah', 'Abdul-Majeed', 'Abdulmalik', 'Abdul-Rehman', 'Abdur',
    'Abdurraheem', 'Abdur-Rahman', 'Abdur-Rehmaan', 'Abel', 'Abhinav', 'Abhisumant', 'Abid', 'Abir', 'Abraham', 'Abu', 'Abubakar',
    'Ace', 'Adain', 'Adam', 'Adam-James', 'Addison', 'Addisson', 'Adegbola', 'Adegbolahan', 'Aden', 'Adenn', 'Adie', 'Adil', 'Aditya',
    'Adnan', 'Adrian', 'Adrien', 'Aedan', 'Aedin', 'Aedyn', 'Aeron', 'Afonso', 'Ahmad', 'Ahmed', 'Ahmed-Aziz', 'Ahoua', 'Ahtasham',
    'Aiadan', 'Aidan', 'Aiden', 'Aiden-Jack', 'Aiden-Vee'];
    for (let i: number = 0; i < 5000; i++) {
        virtualData.push({
            'FIELD1': names[Math.floor(Math.random() * names.length)],
            'FIELD2': 1967 + (i % 10),
            'FIELD3': Math.floor(Math.random() * 200),
            'FIELD4': Math.floor(Math.random() * 100),
            'FIELD5': Math.floor(Math.random() * 2000),
            'FIELD6': Math.floor(Math.random() * 1000),
            'FIELD7': Math.floor(Math.random() * 100),
            'FIELD8': Math.floor(Math.random() * 10),
            'FIELD9': Math.floor(Math.random() * 10),
            'FIELD10': Math.floor(Math.random() * 100),
            'FIELD11': Math.floor(Math.random() * 100),
            'FIELD12': Math.floor(Math.random() * 1000),
            'FIELD13': Math.floor(Math.random() * 10),
            'FIELD14': Math.floor(Math.random() * 10),
            'FIELD15': Math.floor(Math.random() * 1000),
            'FIELD16': Math.floor(Math.random() * 200),
            'FIELD17': Math.floor(Math.random() * 300),
            'FIELD18': Math.floor(Math.random() * 400),
            'FIELD19': Math.floor(Math.random() * 500),
            'FIELD20': Math.floor(Math.random() * 700),
            'FIELD21': Math.floor(Math.random() * 800),
            'FIELD22': Math.floor(Math.random() * 1000),
            'FIELD23': Math.floor(Math.random() * 2000),
            'FIELD24': Math.floor(Math.random() * 150),
            'FIELD25': Math.floor(Math.random() * 1000),
            'FIELD26': Math.floor(Math.random() * 100),
            'FIELD27': Math.floor(Math.random() * 400),
            'FIELD28': Math.floor(Math.random() * 600),
            'FIELD29': Math.floor(Math.random() * 500),
            'FIELD30': Math.floor(Math.random() * 300),
        });
    }
    let grid: Grid = new Grid(
        {
            dataSource: virtualData,
            enableVirtualization: true,
            enableColumnVirtualization: true,
            height: 400,
            columns: [
                { field: 'FIELD1', headerText: 'Player Name', width: 140 },
                { field: 'FIELD2', headerText: 'Year', width: 120 },
                { field: 'FIELD3', headerText: 'Stint', width: 120 },
                { field: 'FIELD4', headerText: 'TMID', width: 120 },
                { field: 'FIELD5', headerText: 'LGID', width: 120 },
                { field: 'FIELD6', headerText: 'GP', width: 120 },
                { field: 'FIELD7', headerText: 'GS', width: 120 },
                { field: 'FIELD8', headerText: 'Minutes', width: 120 },
                { field: 'FIELD9', headerText: 'Points', width: 120 },
                { field: 'FIELD10', headerText: 'oRebounds', width: 130 },
                { field: 'FIELD11', headerText: 'dRebounds', width: 130 },
                { field: 'FIELD12', headerText: 'Rebounds', width: 120 },
                { field: 'FIELD13', headerText: 'Assists', width: 120 },
                { field: 'FIELD14', headerText: 'Steals', width: 120 },
                { field: 'FIELD15', headerText: 'Blocks', width: 120 },
                { field: 'FIELD16', headerText: 'Turnovers', width: 130 },
                { field: 'FIELD17', headerText: 'PF', width: 130 },
                { field: 'FIELD18', headerText: 'fgAttempted', width: 150 },
                { field: 'FIELD19', headerText: 'fgMade', width: 120 },
                { field: 'FIELD20', headerText: 'ftAttempted', width: 150 },
                { field: 'FIELD21', headerText: 'ftMade', width: 120 },
                { field: 'FIELD22', headerText: 'ThreeAttempted', width: 150 },
                { field: 'FIELD23', headerText: 'ThreeMade', width: 130 },
                { field: 'FIELD24', headerText: 'PostGP', width: 120 },
                { field: 'FIELD25', headerText: 'PostGS', width: 120 },
                { field: 'FIELD26', headerText: 'PostMinutes', width: 120 },
                { field: 'FIELD27', headerText: 'PostPoints', width: 130 },
                { field: 'FIELD28', headerText: 'PostoRebounds', width: 130 },
                { field: 'FIELD29', headerText: 'PostdRebounds', width: 130 },
                { field: 'FIELD30', headerText: 'PostRebounds', width: 130 }]
        });
    grid.appendTo('#Grid');
};

