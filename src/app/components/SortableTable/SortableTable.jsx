/*
base filtering and pagination code is from examples in https://tanstack.com/table/v8
*/

import React, { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table as BTable } from 'react-bootstrap';
import styles from './index.css';

const SortableTable = (props) => {
    // set defaults
    const data = props.data || [];
    const columns = props.columns || [];
    const defaultData = props.defaultData || [];
    const height = props.height || '520px';
    const width = props.width || '760px';

    /***** FUNCTIONS *****/
    const fuzzyFilter = (row, columnId, value, addMeta) => {
        // Rank the item
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const itemRank = rankItem(row.getValue(columnId), value);

        // Store the itemRank info
        addMeta({
            itemRank,
        });

        // Return if the item should be filtered in/out
        return itemRank.passed;
    };

    /***** CONSTANTS *****/
    const [pageNum, setPageNum] = useState(1);
    const [globalFilter, setGlobalFilter] = useState('');
    const [globalSearchText, setGlobalSearchText] = useState('');

    /***** TABLE DATA *****/
    // table variable
    const table = useReactTable({
        data: data || defaultData,
        columns: columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 15,
                pageIndex: 0,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });

    const currentPage = table.getState().pagination.pageIndex + 1;
    const maxPages = table.getPageCount();

    /***** RENDERING *****/
    return (
        <div className="container flex flex-col items-center justify-center gap-3 px-4 py-16 " style={{ maxWidth: width, marginBottom: '0px', padding: 0 }}>
            {/*** PAGINATION ***/}
            {/*** GLOBAL SEARCH ***/}
            <div style={{ marginBottom: '5px' }}>
                <input
                    value={globalSearchText ?? ''}
                    onChange={(e) => {
                        setGlobalSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setGlobalFilter(globalSearchText);
                        }
                    }}
                    className="font-lg border-block border p-2 shadow"
                    placeholder="Search all columns..."
                />
            </div>
            {/*** TABLE ***/}
            <div style={{ maxHeight: height, minHeight: height, marginBottom: '5px', overflowY: 'scroll' }}>
                <BTable striped bordered hover size="sm" variant="dark" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        {table.getHeaderGroups().map(
                            (
                                headerGroup // we currently only have 1 group
                            ) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{
                                                width: header.getSize(),
                                                whiteSpace: 'unset',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div
                                                        {...{
                                                            className: header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                            onClick: header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: ' 🔼',
                                                            desc: ' 🔽',
                                                        }[header.column.getIsSorted().toString()] ?? null}
                                                    </div>
                                                </>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            )
                        )}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} style={{ whiteSpace: 'unset', overflowWrap: 'break-word' }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </BTable>
            </div>
            {/* buttons */}
            <div className={['flex items-center gap-2', styles.navContainer].join(' ')}>
                <button
                    className="rounded border p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    display={currentPage > 1 ? 'block' : 'hidden'}
                >
                    {'<<'}
                </button>
                <button
                    className="rounded border p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    display={currentPage > 1 ? 'block' : 'hidden'}
                >
                    {'<'}
                </button>
                <button
                    className="rounded border p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    display={currentPage < maxPages ? 'block' : 'hidden'}
                >
                    {'>'}
                </button>
                <button
                    className="rounded border p-1"
                    onClick={() => table.setPageIndex(maxPages - 1)}
                    disabled={!table.getCanNextPage()}
                    display={currentPage < maxPages ? 'block' : 'hidden'}
                >
                    {'>>'}
                </button>
                {/* label */}
                <span
                    className="flex items-center gap-1"
                    style={{ marginLeft: '10px' }}
                >
                    {'Page '}
                    <strong>
                        {currentPage} of {maxPages}
                    </strong>
                </span>
                {/* jump to page */}
                <div
                    className="flex items-center gap-1"
                    style={{ display: 'flex', alignItems: 'center', float: 'right' }}
                >
                    <span style={{ marginRight: '5px' }}>
                        {'Jump to page: '}
                        <input
                            type="number"
                            defaultValue={currentPage}
                            onChange={(e) => {
                                setPageNum(e.target.value ? Number(e.target.value) - 1 : 0);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    table.setPageIndex(pageNum);
                                }
                            }}
                            className={['w-16 rounded border p-1 ', styles.input].join(' ')}
                            min="1"
                            max={maxPages}
                            style={{ minWidth: '60px' }}
                        />
                    </span>
                    <div style={{ marginRight: '5px' }}>|</div>
                    {/*** PAGE SIZE ***/}
                    <div>
                        {'Entries/Page: '}
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[15, 30, 50, 75, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortableTable;
