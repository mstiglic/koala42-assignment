import type { ICommonTableRowData } from '~types/commonTable.ts';

export interface IHierarchyDataChildren {
    records: IHierarchyData[];
}

export interface IHierarchyData {
    data: Record<string, string | number | boolean>;
    children?: Record<string, IHierarchyDataChildren>;
}

export type IHierarchyTable = ICommonTableRowData<{
    row: IHierarchyData['data'];
    children?: IHierarchyTable[];
}>
