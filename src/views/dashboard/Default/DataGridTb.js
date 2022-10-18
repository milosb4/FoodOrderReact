import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid';
import { ButtonGroup, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { PropTypes } from 'prop-types';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'fullName',
        headerName: 'Puno ime',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    {
        field: 'firstName',
        headerName: 'Ime',
        width: 150,
        editable: false
    },
    {
        field: 'lastName',
        headerName: 'Prezime',
        width: 150,
        editable: false
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        width: 110,
        editable: false
    },
    {
        field: 'isActive',
        headerName: 'Aktivan',
        type: 'boolean',
        width: 110,
        editable: false
    },
    {
        field: 'role',
        headerName: 'Uloga',
        type: 'string',
        width: 110,
        editable: false
    }
];

const getRolesCollection = () => [
    { id: 'Client', title: 'Client' },
    { id: 'Sales', title: 'Sales' }
];

const DataGridTb = (props) => {
    const { rows, openAddUserInPopup, deactivateUsers, activateUsers } = props;
    const [selectedRows, setSelectedRows] = React.useState([]);
    const apiRef = useGridApiRef();
    // const handleAddRow = () => {
    //     apiRef.current.updateRows([createRandomRow()]);
    // };
    const handleDeactivateUsers = () => {
        return deactivateUsers(selectedRows);
    };

    const handleActivateUsers = () => {
        return activateUsers(selectedRows);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
                        setSelectedRows(selectedRows);
                    }}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    columnVisibilityModel={{
                        // Hide columns status and traderName, the other columns will remain visible
                        id: false
                    }}
                />
            </Box>
            <Stack direction="row">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button size="small" onClick={openAddUserInPopup}>
                        Dodaj korisnika
                    </Button>
                    <Button size="small" onClick={handleActivateUsers}>
                        Aktiviraj korisnika
                    </Button>
                    <Button size="small" onClick={handleDeactivateUsers}>
                        Deaktiviraj korisnika
                    </Button>
                </ButtonGroup>
            </Stack>
        </Box>
    );
};

DataGridTb.propTypes = {
    openAddUserInPopup: PropTypes.func.isRequired,
    deactivateUsers: PropTypes.func.isRequired
};

export default DataGridTb;
