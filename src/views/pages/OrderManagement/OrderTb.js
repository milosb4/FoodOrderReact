import React, { useCallback, useEffect, useState } from 'react';
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
import Popup from '../../dashboard/Default/modals/Popup';
import OrderAddForm from './OrderAddForm';
import OrderEditForm from './OrderEditForm';

const OrderTb = ({ orders, loadOrders }) => {
    const [shift, setShift] = useState(1);
    const [openPopup, setOpenPopup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
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
            getActions: (params) => [
                <GridActionsCellItem onClick={editOrder(params)} icon={<EditIcon color={'warning'} />} label="Delete" />
            ]
        }
    ];

    useEffect(() => {
        if (orders.length === 0) {
            loadOrders(1).catch((error) => {
                alert('Loading templates failed' + error);
            });
        }
        console.log(orders);
    }, []);
    const handleShiftChange = (event) => {
        setShift(event.target.value);
        loadOrders(event.target.value);
    };
    const handleAddOrder = () => {
        setOpenPopup(true);
    };
    const editOrder = React.useCallback(
        (params) => () => {
            setSelectedOrder(params.row);
            setOpenEditPopup(true);
            console.log(params.row);
        },
        []
    );

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
                        getRowId={(row) => row.date}
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
            <Popup title="Dodaj sablon" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <OrderAddForm shift={shift} />
            </Popup>
            <Popup title="Izmijeni sablon" openPopup={openEditPopup} setOpenPopup={setOpenEditPopup}>
                <OrderEditForm selectedOrder={selectedOrder} />
            </Popup>
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
