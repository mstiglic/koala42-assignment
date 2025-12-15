export interface ICommonTableHeaderData {
    label?: string;
    key: string;
}

export interface ICommonTableRowData<D = Record<string, unknown>> {
    data: D,
    hasAccordion?: boolean;
    isAccordionOpen?: boolean;
    id: string;
}

export interface ICommonTableColRendererProps<D> {
    row: ICommonTableRowData<D>;
    headerKey: ICommonTableHeaderData['key']
}

export interface ICommonTableAccordionRendererProps<D> {
    row: ICommonTableRowData<D>;
}
