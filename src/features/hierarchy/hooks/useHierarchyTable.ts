import type {
    IHierarchyData, IHierarchyTable
} from '~features/hierarchy/types/hierarchyTable.ts';
import {
    useCallback,
    useState,
    useEffect
} from 'react';
import type {
    ICommonTableRowData
} from '~types/commonTable.ts';
import {
    deleteHierarchyTableRow, getHierarchyTableData, updateHierarchyTableRow
} from '~features/hierarchy/utils/hierarchyTable.ts';

interface UseHierarchyTable {
    hierarchyTableData: IHierarchyTable[];
    deleteHierarchyTableRow: (rowPath: ICommonTableRowData['id']) => void;
    toggleAccordion: (rowPath: ICommonTableRowData['id']) => void;
}

export function useHierarchyTable(hierarchyData: IHierarchyData[]): UseHierarchyTable {
    const [localData, setLocalData] = useState<IHierarchyTable[]>([]);

    useEffect(() => {
        const data = getHierarchyTableData(hierarchyData);

        setLocalData(data);
    }, []);

    const toggleAccordion = useCallback((rowPath: string) => {
        setLocalData((prev) => updateHierarchyTableRow(
            prev,
            (row) => ({ isAccordionOpen: !row.isAccordionOpen }),
            rowPath));
    }, []);

    const deleteRow = useCallback((rowPath: string) => {
        setLocalData((prev) => deleteHierarchyTableRow(prev, rowPath));
    }, []);

    return {
        toggleAccordion: toggleAccordion,
        deleteHierarchyTableRow: deleteRow,
        hierarchyTableData: localData,
    };
}
