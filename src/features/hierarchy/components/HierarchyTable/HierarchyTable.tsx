import {
    type ReactNode, useCallback, useMemo
} from 'react';
import CommonTable from '~components/CommonTable/CommonTable.tsx';

import type { IHierarchyTable } from '~features/hierarchy/types/hierarchyTable.ts';
import { getCommonTableHeaders } from '~features/hierarchy/utils/hierarchyTable.ts';
import type {
    ICommonTableAccordionRendererProps, ICommonTableColRendererProps, ICommonTableHeaderData,
    ICommonTableRowData
} from '~types/commonTable.ts';
import HierarchyTableCol from '~features/hierarchy/components/HierarchyTable/HierarchyTableCol.tsx';

interface HierarchyTableProps {
    data: IHierarchyTable[]
    onDelete?: (rowPath: ICommonTableRowData['id']) => void;
    onToggleAccordion?: (rowPath: ICommonTableRowData['id']) => void;
}

function HierarchyTable({
    data,
    onDelete,
    onToggleAccordion,
}: HierarchyTableProps): ReactNode {
    const headers = useMemo<ICommonTableHeaderData[]>(() => ([
        {
            key: 'accordion',
        },
        ...getCommonTableHeaders(data?.[0]?.data?.row),
        {
            key: 'delete',
            label: 'Delete'
        },
    ]), [data?.[0]?.data?.row]);

    const colRenderer = useCallback(
        ({
            row,
            headerKey
        }: ICommonTableColRendererProps<IHierarchyTable['data']>) => (
            <HierarchyTableCol
                row={row}
                headerKey={headerKey}
                onDelete={onDelete}
                onToggleAccordion={onToggleAccordion}
            />
        ),
        [onDelete, onToggleAccordion]
    );

    const accordionRenderer = useCallback(
        ({ row }: ICommonTableAccordionRendererProps<IHierarchyTable['data']>) => {
            if (row.data.children?.length) {
                return (
                    <div className="ps-12">
                        <HierarchyTable
                            data={row.data.children}
                            onDelete={onDelete}
                            onToggleAccordion={onToggleAccordion}
                        />
                    </div>
                );
            }
        },
        [onDelete, onToggleAccordion]
    );

    if (!data.length) {
        return (
            <div className="w-32 h-24 bg-gray-300 flex items-center justify-center">
                <span>No data</span>
            </div>
        );
    }

    return (
        <CommonTable
            headers={headers}
            rows={data}
            ColRenderer={colRenderer}
            AccordionRenderer={accordionRenderer}
        />
    );
}

export default HierarchyTable;
