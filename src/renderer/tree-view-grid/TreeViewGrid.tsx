import React, { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTable, useExpanded, Column } from 'react-table';
import { LabelCell } from './LabelCell';
import { getData, RowData } from './data';

const columns: Column<RowData>[] = [
  {
    Header: 'Label',
    accessor: 'label',
    Cell: LabelCell,
  },
  {
    Header: 'Namespace',
    accessor: 'namespace',
  }
];

const TreeViewGrid: React.FC = () => {
  const data = useMemo(() => {
    const [root] = getData();
    return [root];
  }, []);

  const tableInstance = useTable({
    columns,
    data,
    getSubRows: (row) => row.children,
  }, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <TableContainer component={Paper} sx={{ flex: 1 }}>
      <Table size='small' {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreeViewGrid;
