import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, useGridApiRef } from '@mui/x-data-grid';
import { ButtonGroup, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { PropTypes } from 'prop-types';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Naziv jela',
        width: 150,
        editable: false
    },
    {
        field: 'isActive',
        headerName: 'Izabran',
        type: 'boolean',
        width: 110,
        editable: false
    }
];

const MealsTb = (props) => {
    const { rows, handleAssignMeals, openMealAddInPopup, deleteMeals, editMeal, setEditMeal, setEditMealPopup } = props;
    const [selectedRows, setSelectedRows] = React.useState([]);
    const apiRef = useGridApiRef();
    const handleDeleteMeals = () => {
        return deleteMeals(selectedRows.map((x) => x.id));
    };
    const handleEditMeals = () => {
        if (selectedRows.length > 1) {
            return alert('Izaberite samo jedo jelo');
        }
        setEditMeal(selectedRows);
        setEditMealPopup(true);
        return;
    };
    const callAssignMeals = () => {
        return handleAssignMeals(selectedRows);
    };
    // const handleAddRow = () => {
    //     apiRef.current.updateRows([createRandomRow()]);
    // };
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
                    <Button size="small" onClick={openMealAddInPopup}>
                        Dodaj jelo
                    </Button>
                    <Button size="small" onClick={handleDeleteMeals}>
                        Obrisi jela
                    </Button>
                    <Button size="small" onClick={handleEditMeals}>
                        Izmijeni jelo
                    </Button>
                    <Button size="small" onClick={callAssignMeals}>
                        Sacuvaj jela na Sablon
                    </Button>
                </ButtonGroup>
            </Stack>
        </Box>
    );
};

MealsTb.propTypes = {
    // openAddUserInPopup: PropTypes.func.isRequired,
};

export default MealsTb;
