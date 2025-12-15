import type {
    ICommonTableHeaderData
} from '~types/commonTable.ts';
import type {
    IHierarchyTable,
    IHierarchyData
} from '~features/hierarchy/types/hierarchyTable.ts';
import { getDeterministicPath } from '~utils/common.ts';

export function getCommonTableHeaders(data: IHierarchyData['data']): ICommonTableHeaderData[] {
    return Object
        .keys(data || {})
        .map<ICommonTableHeaderData>(header => ({
            label: header,
            key: header
        }));
}

export function getHierarchyTableData(
    hierarchyTableRows: IHierarchyData[],
    rootPath: string | null = null
): IHierarchyTable[] {
    return hierarchyTableRows.map((row, index) => {
        const rowPath = getDeterministicPath(rootPath, index);

        const children = row.children
            ? Object.values(row.children)
                .flatMap(child =>
                    getHierarchyTableData(child.records, rowPath)
                )
            : undefined;

        return {
            data: {
                row: row.data,
                children: children?.length ? children : undefined,
            },
            hasAccordion: !!children?.length,
            id: rowPath,
        };
    });
}

export function deleteHierarchyTableRow(
    originalRows: IHierarchyTable[],
    targetPath?: string
): IHierarchyTable[] {
    if (!originalRows?.length) {
        return originalRows;
    }

    let didRowChange = false;
    const updatedRows: IHierarchyTable[] = [];

    for (const originalRow of originalRows) {
        if (originalRow.id === targetPath) {
            didRowChange = true;

            continue;
        }

        let newRow = originalRow;

        if (originalRow.data.children?.length) {
            const newChildren = deleteHierarchyTableRow(originalRow.data.children, targetPath);

            if (newChildren !== originalRow.data.children) {
                newRow = {
                    ...originalRow,
                    data: {
                        ...originalRow.data,
                        children: newChildren.length
                            ? newChildren
                            : undefined,
                    },
                };
                didRowChange = true;
            }
        }

        updatedRows.push(newRow);
    }

    return didRowChange ? updatedRows : originalRows;
}

function updateHierarchyTableRowNode(
    row: IHierarchyTable,
    updateFn: (row: IHierarchyTable) => Partial<IHierarchyTable>,
    targetPath?: string
): [IHierarchyTable, didChildChange: boolean] {
    if (row.id === targetPath) {
        return [{
            ...row,
            ...updateFn(row)
        },
        true];
    }

    const children = row.data.children;

    if (!children?.length) {
        return [row, false];
    }

    let didChildChange = false;
    const updatedChildren = children.map(child => {
        const [updatedChild, didChange] = updateHierarchyTableRowNode(child, updateFn, targetPath);

        if (didChange) {
            didChildChange = true;
        }

        return updatedChild;
    });

    if (!didChildChange) {
        return [row, false];
    }

    return [{
        ...row,
        data: {
            ...row.data,
            children: updatedChildren,
        },
    },
    true];
}

export function updateHierarchyTableRow(
    originalRows: IHierarchyTable[],
    updateFn: (row: IHierarchyTable) => Partial<IHierarchyTable>,
    targetPath?: string
): IHierarchyTable[] {
    if (!originalRows?.length) {
        return originalRows;
    }

    let didRowsChange = false;
    const updatedRows = originalRows.map(row => {
        const [updatedRow, rowChanged] = updateHierarchyTableRowNode(row, updateFn, targetPath);

        if (rowChanged) {
            didRowsChange = true;
        }

        return updatedRow;
    });

    return didRowsChange ? updatedRows : originalRows;
}
