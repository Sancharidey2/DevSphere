import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SearchAppBar from './navbar';
import { Link } from 'react-router-dom';

export default function DataTable() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const handleDeleteRow = async (rowId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/users/${rowId}`)
      // Filter out the row with the matching ID
      const updatedRows = rows.filter((item) => item._id !== rowId);
      // Update the state with the new rows
      setRows(updatedRows);
      const filterupdatedRows = filteredRows.filter((item) => item._id !== rowId);
      // Update the state with the new rows
      setFilteredRows(filterupdatedRows);
    }
    catch (e) {
      console.error(e)
    }

  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    console.log("query=",query)
    setSearchQuery(query);
    const filtered = rows.filter((row) => {
      const fullName = `${row.firstname} ${row.lastname} ${row.handle}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
    setFilteredRows(filtered);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'firstname', headerName: 'First name', width: 180 },
    { field: 'lastname', headerName: 'Last name', width: 180 },
    {
      field: 'handle',
      headerName: 'Social Media Handle',
      width: 180,
    },
    {
      field: 'followers',
      headerName: 'Followers',
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 200,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteRow(params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: 'edit',
      headerName: 'edit',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => navigate(`/edit?first=${params.row.firstname}&last=${params.row.lastname}&handle=${params.row.handle}&followers=${params.row.followers}&id=${params.row._id}`)}
        >
          <EditIcon />
        </IconButton>
      ),
    }
  ];
  useEffect(() => {
    async function show() {
      try {
        const res = await axios.get("http://localhost:5000/all_users",)
        const newrows = res.data.map((item) => {
          const newitem = { ...item, id: item._id }
          return newitem
        })
        setRows(newrows)
        setFilteredRows(newrows)
      }
      catch (e) {
        // Handle API errors here
        console.error('Error fetching data:', e);
      }
    }
    show()
  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <SearchAppBar rows={handleSearchInputChange} value={searchQuery} />
      <DataGrid

        rows={searchQuery ? filteredRows : rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      // checkboxSelection
      // checkboxDeletion
      />
      <Link to={'/new'}><Button variant="contained"color="success" sx={{ mt: '12px' }}
      >
        ADD INFLUENCER
      </Button></Link>
    </div>
  );
}