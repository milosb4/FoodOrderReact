import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import Box from '@mui/material/Box';
import { Button, ButtonGroup, FormControl, Grid, Select, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import { loadOrders } from '../../../store/actions/orderActions';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    { field: 'templateId', headerName: 'ID', width: 90 },
    {
        field: 'date',
        headerName: 'Datum',
        type: 'date',
        valueGetter: ({ value }) => value && new Date(value),
        width: 150
    },
    {
        field: 'dayNumber',
        headerName: 'Dan',
        type: 'number',
        width: 150,
        editable: false
    },
    {
        field: 'templateName',
        headerName: 'Template',
        width: 110,
        editable: false
    },
    {
        field: 'shift',
        headerName: 'Smjena',
        type: 'number',
        width: 110,
        editable: false
    },
    {
        field: 'actions',
        type: 'actions',
        getActions: (params) => [<GridActionsCellItem icon={<EditIcon color={'warning'} />} label="Delete" />]
    }
];

const OrderTb = ({ orders, loadOrders }) => {
    const [shift, setShift] = useState(1);
    useEffect(() => {
        if (orders.length === 0) {
            loadOrders(1).catch((error) => {
                debugger;
                alert('Loading templates failed' + error);
            });
        }
    }, []);
    const handleShiftChange = (event) => {
        setShift(event.target.value);
        console.log(shift);
    };

    const handleAddOrder = () => {};

    return (
        <Grid item xs={12} md={12} lg={12}>
            <FormControl variant="outlined" sx={{ minWidth: 120 }} label="Smjene">
                <Select fullWidth label="Smjene" value={shift} onChange={handleShiftChange}>
                    <MenuItem value={1}>Prva/Druga</MenuItem>
                    <MenuItem value={3}>Treca</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        getRowId={(row) => row.date + row.dayOfWeek}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
                            setSelectedRows(selectedRows);
                        }}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        columnVisibilityModel={{
                            // Hide columns status and traderName, the other columns will remain visible
                            templateId: false
                        }}
                    />
                </Box>
            </Box>
            <Stack direction="row">
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button size="small" onClick={handleAddOrder}>
                        Dodaj ponudu
                    </Button>
                </ButtonGroup>
            </Stack>
        </Grid>
    );
};

OrderTb.propTypes = {
    orders: PropTypes.array.isRequired,
    loadOrders: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        orders: state.orders
    };
}

const mapDispatchToProps = {
    loadOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTb);
