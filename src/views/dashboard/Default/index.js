import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// material-ui
import { Grid, Select, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { gridSpacing } from 'store/constant';
import { addCompany, loadCompany } from '../../../store/actions/companyActions';
import { loadLocations } from '../../../store/actions/locationActions';
import { PropTypes } from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Popup from './Popup';
import Form from './Form';
import { formData } from './formData';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = ({ companies, loadCompany, locations, loadLocations, addCompany }) => {
    const [isLoading, setLoading] = useState(true);
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    useEffect(() => {
        setLoading(false);
        if (companies.length === 0) {
            loadCompany().catch((error) => {
                alert('Loading companies failed' + error);
            });
        }
    }, []);

    const handleAddCompanyChange = (event) => {};

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
        loadLocations(event.target.value).catch((error) => {
            alert('Loading locations failed' + error);
        });
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const openInPopup = (item) => {
        setOpenPopup(true);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <Stack direction="row" spacing={0.4}>
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Kompanije</InputLabel>
                                <Select fullWidth value={company} label="Kompanije" onChange={handleCompanyChange}>
                                    {companies.map((company) => (
                                        <MenuItem key={company.companyId} value={company.companyId}>
                                            {company.companyName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        openInPopup('');
                                    }}
                                >
                                    Dodaj
                                </Button>
                            </FormControl>
                            <FormControl variant="standard" sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        openInPopup('');
                                    }}
                                >
                                    Obrisi
                                </Button>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack direction="row" spacing={0.4}>
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Lokacije</InputLabel>
                                <Select fullWidth value={location} label="Lokacije" onChange={handleLocationChange}>
                                    {locations.map((location) => (
                                        <MenuItem key={location.id} value={location.id}>
                                            {location.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        openInPopup('');
                                    }}
                                >
                                    Dodaj
                                </Button>
                            </FormControl>
                            <FormControl variant="standard" sx={{ p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        openInPopup('');
                                    }}
                                >
                                    Obrisi
                                </Button>
                            </FormControl>
                            <Popup title="Employee Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                                <Form formData={formData} />
                            </Popup>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={12} sm={12} xs={12}></Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}></Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

Dashboard.propTypes = {
    companies: PropTypes.array.isRequired,
    loadCompany: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    loadLocations: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        companies: state.companies,
        locations: state.locations
    };
}

const mapDispatchToProps = {
    loadCompany,
    loadLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
