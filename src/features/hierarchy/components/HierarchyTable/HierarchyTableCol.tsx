import type { IHierarchyTable } from '~features/hierarchy/types/hierarchyTable.ts';
import {
    ChevronRight,
    Trash
} from 'lucide-react';
import {
    memo, useCallback
} from 'react';
import type { ICommonTableRowData } from '~types/commonTable.ts';

interface HierarchyTableColProps {
    row: IHierarchyTable;
    headerKey: string;
    onDelete?: (rowPath: ICommonTableRowData['id']) => void;
    onToggleAccordion?: (rowPath: ICommonTableRowData['id']) => void;
}

const HierarchyTableCol = memo(function HierarchyTableCol({
    row,
    headerKey,
    onDelete,
    onToggleAccordion
}: HierarchyTableColProps) {
    const handleToggleAccordion = useCallback(() => {
        onToggleAccordion?.(row.id);
    }, [row.id]);

    const handleDelete = useCallback(() => {
        onDelete?.(row.id);
    }, [row.id]);

    if (headerKey === 'accordion' && row.data.children?.length) {
        return (
            <button
                onClick={handleToggleAccordion}
                aria-label="Open the accordion"
                title="Open the accordion"
            >
                <ChevronRight />
            </button>
        );
    }

    if (headerKey === 'delete') {
        return (
            <button
                onClick={handleDelete}
                aria-label="Remove row"
                title="Remove row"
            >
                <Trash/>
            </button>
        );
    }

    return row.data.row?.[headerKey];
});

export default HierarchyTableCol;
