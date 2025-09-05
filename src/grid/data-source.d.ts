export declare function getTradeData(dataCount?: number): object;
export declare let lazyLoadData: Object[];
export declare function createLazyLoadData(): void;
export declare let virtualData: Object[];
export declare function dataSource(): void;
export declare let OverallData: Object[];
export declare let energyData: any[];
export declare let productData: Object[];
export declare let employeeDetail: Object[];
export declare let taskDetail: Object[];
export declare let employeeData: Object[];
export declare const orderDataSource: Object[];
export declare const orderData: Object[];
export declare const categoryData: Object[];
export declare const customerData: Object[];
export declare const data: Object[];
export declare const data1: Object[];
export declare const inventoryData: Object[];
export interface ColumnSpanDataType {
    EmployeeID: number;
    EmployeeName: string;
    '9:00': string;
    '9:30': string;
    '10:00': string;
    '10:30': string;
    '11:00': string;
    '11:30': string;
    '12:00': string;
    '12:30': string;
    '1:00': string;
    '1:30': string;
    '2:00': string;
    '2:30': string;
    '3:00': string;
    '3:30': string;
    '4:00': string;
    '4:30': string;
    '5:00': string;
}
export declare let columnSpanData: ColumnSpanDataType[];
export declare const orderDetails: Object[];
export declare const employeeDetails: Object[];
export declare let hierarchyOrderdata: Object[];
export interface FifaDetails {
    Year: number;
    Host: string;
    Champions: string;
    Coach: string;
    TopScorer: string;
    TopScorerCountry: string;
    TotalGoal: number;
    BestPlayerAward: string;
    BestPlayerCountry: string;
}
export declare let fifaData: FifaDetails[];
export declare let webpfiles: string[];
export declare let countryInfo: Object[];
export declare let teamInfo: Object[];
export declare let coachInfo: Object[];
export declare let topScrorerInfo: Object[];
export declare let bestPlayerInfo: Object[];
export interface Meeting {
    Id: number;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsReadonly: boolean;
}
export interface Details {
    EmployeeID: number;
    Meetings: Meeting[];
}
export declare let detailEmployeeData: Object[];
export declare function createDetailEmployeeData(): void;
export declare let detailSalesData: Object[];
export declare function createDetailSalesData(): void;
export declare let pizzaData: Object[];
export declare let stackedHeaderData: Object[];
export declare const sales: object[];
export declare let telecastData: Object[];
