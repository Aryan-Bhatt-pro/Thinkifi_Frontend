import React from 'react';
import { useTable } from 'react-table';
import './Table.css'
const Table = (props) => {
  // Your table data
  const data = props.data;

  // Define table columns
  const columns = React.useMemo(() => [
    { Header: props.title, accessor: 'username' }
    // Add more columns as needed
  ], []);

  // Create an instance of the useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} style={{ width: '40%', marginLeft: '35rem', marginTop: '1rem'}} className="custom-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
