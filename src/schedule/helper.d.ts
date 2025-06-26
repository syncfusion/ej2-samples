import { EventRenderedArgs, View } from '@syncfusion/ej2-schedule';
export declare function applyCategoryColor(args: EventRenderedArgs, currentView: View): void;
export declare function generateObject(start?: number, end?: number, isWeekDaysOnly?: boolean): Object[];
export declare function getReadOnlyEventsData(): Object[];
export declare function getReminderEvents(): Record<string, any>[];
export declare function generateResourceData(startId: number, endId: number, text: string): Record<string, any>[];
