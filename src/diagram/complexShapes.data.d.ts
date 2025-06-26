export declare let startDate: Date;
export declare let endDate: Date;
export declare let userInfo: any;
export declare let virtualizationData: any;
export declare let categoryIncomeData: {
    [key: string]: Object;
}[];
export declare let categoryExpenseData: {
    [key: string]: Object;
}[];
export interface MyWindow extends Window {
    expense: () => void;
    about: () => void;
    settings: () => void;
    dashboard: () => void;
    getDate: (value: Date) => string;
    getCurrencyVal: (value: number) => string;
    getNumberVal: (value: number) => string;
    expenseData: Object;
    startDate: Date;
    endDate: Date;
    userName: string;
    userFirstName: string;
}
export declare let expenseData: Object[];
