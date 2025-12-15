import exampleData from '../../../data/example-data.json';
import type {
    IHierarchyData
} from '~features/hierarchy/types/hierarchyTable.ts';
import { useHierarchyTable } from '~features/hierarchy/hooks/useHierarchyTable.ts';
import HierarchyTable from '~features/hierarchy/components/HierarchyTable/HierarchyTable.tsx';

function HierarchyPage() {
    const data = exampleData as IHierarchyData[];
    const {
        deleteHierarchyTableRow,
        toggleAccordion,
        hierarchyTableData,
    } = useHierarchyTable(data);

    return (
        <div className="flex flex-1 justify-center items-center">
            <HierarchyTable
                data={hierarchyTableData}
                onDelete={deleteHierarchyTableRow}
                onToggleAccordion={toggleAccordion}
            />
        </div>
    );
}

export default HierarchyPage;
