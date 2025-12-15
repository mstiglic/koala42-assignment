import {
    type ReactNode,
    useMemo
} from 'react';
import type {
    ICommonTableAccordionRendererProps,
    ICommonTableColRendererProps,
    ICommonTableHeaderData,
    ICommonTableRowData
} from '~types/commonTable.ts';
import CommonTableRow from '~components/CommonTable/CommonTableRow.tsx';

interface CommonTableProps<D> {
    headers: ICommonTableHeaderData[];
    rows: ICommonTableRowData<D>[];
    ColRenderer?: (props: ICommonTableColRendererProps<D>) => ReactNode;
    AccordionRenderer?: (props: ICommonTableAccordionRendererProps<D>) => ReactNode;
    EmptyTableRenderer?: () => ReactNode;
}

function CommonTable<D extends object>({
    headers,
    rows,
    EmptyTableRenderer,
    AccordionRenderer,
    ColRenderer
}: CommonTableProps<D>): ReactNode {
    const localHeaders = useMemo(() => headers, [headers]);

    return (
        <table>
            <thead className="bg-blue-400">
                <tr>
                    {localHeaders.map((header, index) => (
                        <th
                            className="min-w-4"
                            key={`${header.label || ''}-${header.key}-${index}`}
                        >
                            {header?.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {!rows.length
                    ? (
                        <tr>
                            <td colSpan={localHeaders.length}>
                                {EmptyTableRenderer ? <EmptyTableRenderer /> : 'Not data'}
                            </td>
                        </tr>
                    )
                    : rows.map((row, rowIndex) => (
                        <CommonTableRow
                            key={`common-table-row-${row.id}`}
                            isRowEven={!!(rowIndex % 2)}
                            row={row}
                            headers={localHeaders}
                            ColRenderer={ColRenderer}
                            AccordionRenderer={AccordionRenderer}
                        />

                    ))}
            </tbody>
        </table>
    );
}

export default CommonTable;
