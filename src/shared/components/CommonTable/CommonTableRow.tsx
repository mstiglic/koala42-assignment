import {
    Fragment,
    memo,
    useMemo,
    type ReactNode
} from 'react';
import type {
    ICommonTableHeaderData,
    ICommonTableRowData
} from '~types/commonTable.ts';
import clsx from 'clsx';

interface CommonTableRowProps<D> {
    headers: ICommonTableHeaderData[];
    row: ICommonTableRowData<D>;
    isRowEven?: boolean;
    AccordionRenderer?: (props: { row: ICommonTableRowData<D> }) => ReactNode;
    ColRenderer?: (props: { row: ICommonTableRowData<D>, headerKey: ICommonTableHeaderData['key']}) => ReactNode;
}

function CommonTableRowInner<D extends object>({
    row,
    isRowEven,
    headers,
    AccordionRenderer,
    ColRenderer
}: CommonTableRowProps<D>) {
    const rowClassName = useMemo(() => clsx(
        isRowEven ? 'bg-white' : 'bg-gray-300'
    ), []);

    return (
        <Fragment key={`inner-row-${row.id}`}>
            <tr className={rowClassName} id={row.id}>
                {headers.map((header) => (
                    <td key={`common-table-col-${row.id}_${header.key}`}>
                        {ColRenderer && <ColRenderer row={row} headerKey={header.key} />}
                    </td>
                ))}
            </tr>
            {row?.isAccordionOpen && row?.hasAccordion && (
                <tr className={rowClassName} data-row-type="accordion">
                    <td colSpan={headers.length}>
                        {AccordionRenderer && <AccordionRenderer row={row} />}
                    </td>
                </tr>
            )}
        </Fragment>
    );
}

const CommonTableRow = memo(
    CommonTableRowInner
) as <D extends object>(
    props: CommonTableRowProps<D>
) => ReactNode;

export default CommonTableRow;
