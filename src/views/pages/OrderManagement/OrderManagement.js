import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { Button, Grid, Select } from '@mui/material';
import { PropTypes } from 'prop-types';
import { loadMeals, updateMealsIsActive } from '../../../store/actions/mealActions';
import { loadTemplates, deleteTemplate, assignMeals } from '../../../store/actions/templateActions';
import { deleteMeals } from '../../../store/actions/mealActions';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TemplateForm from '../../dashboard/Default/modals/AddTemplate';
import Popup from '../../dashboard/Default/modals/Popup';
import EditTemplateForm from '../../dashboard/Default/modals/EditTemplate';
import MealsTb from './MealsTb';
import AddMealForm from '../../dashboard/Default/modals/AddMealForm';
import EditMealForm from '../../dashboard/Default/modals/EditMeal';

const OrderManagement = ({ loadTemplates, templates, deleteTemplate, loadMeals, meals, deleteMeals, assignMeals, updateMealsIsActive }) => {
    const [isLoading, setLoading] = useState(true);
    const [template, setTemplate] = useState({});
    const [openTemplatePopup, setOpenTemplatePopup] = useState(false);
    const [openEditTemplatePopup, setOpenEditTemplatePopup] = useState(false);
    const [openAddMealPopup, setAddMealPopup] = useState(false);
    const [openEditMealPopup, setEditMealPopup] = useState(false);
    const [editMeal, setEditMeal] = useState({});
    useEffect(() => {
        setLoading(false);
        if (templates.length === 0) {
            loadTemplates().catch((error) => {
                alert('Loading templates failed' + error);
            });
        }
        if (meals.length === 0) {
            loadMeals().catch((error) => {
                alert('Loading meals failed' + error);
            });
        }
    }, []);

    const handleTemplateChange = (event) => {
        setTemplate(event.target.value);
        updateMealsIsActive(event.target.value.foodIds);
    };

    const openMealAddInPopup = () => {
        setAddMealPopup(true);
    };

    const setTemp = () => {
        setTemplate(template);
    };

    const handleAssignMeals = (selectedRows) => {
        const tempMeals = selectedRows.map((x) => x.id);
        assignMeals({ id: template.id, meals: tempMeals });
        return updateMealsIsActive(tempMeals);
    };

    return (
        <MainCard title="Upravljanje hranom">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={3} lg={3}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={12}>
                                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-standard-label">Sabloni</InputLabel>
                                        <Select fullWidth value={template} label="Templejti" onChange={handleTemplateChange}>
                                            {templates.map((template) => (
                                                <MenuItem key={template.id} value={template}>
                                                    {template.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Stack direction="row" spacing={0.4} sx={{ marginTop: 1 }}>
                                        <FormControl variant="standard">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                startIcon={<AddIcon sx={{ textAlign: 'center', marginLeft: '8px' }} />}
                                                sx={{
                                                    minHeight: '20px',
                                                    width: '3px',
                                                    minWidth: '25px',
                                                    alignContent: 'center'
                                                }}
                                                onClick={() => {
                                                    setOpenTemplatePopup(true);
                                                }}
                                            ></Button>
                                        </FormControl>
                                        <FormControl variant="standard">
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                size="small"
                                                startIcon={<EditIcon sx={{ textAlign: 'center', marginLeft: '8px' }} />}
                                                sx={{
                                                    minHeight: '20px',
                                                    width: '3px',
                                                    minWidth: '25px',
                                                    alignContent: 'center'
                                                }}
                                                onClick={() => {
                                                    setOpenEditTemplatePopup(true);
                                                }}
                                            ></Button>
                                        </FormControl>
                                        <FormControl variant="standard">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon sx={{ textAlign: 'center', marginLeft: '8px' }} />}
                                                sx={{
                                                    minHeight: '20px',
                                                    width: '3px',
                                                    minWidth: '25px',
                                                    alignContent: 'center'
                                                }}
                                                onClick={() => {
                                                    deleteTemplate(template);
                                                }}
                                            ></Button>
                                        </FormControl>
                                        {/*<FormControl variant="standard" sx={{ p: 2 }}>*/}
                                        {/*    <Button*/}
                                        {/*        variant="contained"*/}
                                        {/*        color="error"*/}
                                        {/*        size="small"*/}
                                        {/*        startIcon={<DeleteIcon />}*/}
                                        {/*        onClick={() => {*/}
                                        {/*            handleDeleteCompanyChange('');*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        Obrisi*/}
                                        {/*    </Button>*/}
                                        {/*</FormControl>*/}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={9} lg={9}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <MealsTb
                                        rows={meals}
                                        handleAssignMeals={handleAssignMeals}
                                        openMealAddInPopup={openMealAddInPopup}
                                        deleteMeals={deleteMeals}
                                        updateMealsIsActive={updateMealsIsActive}
                                        setEditMeal={setEditMeal}
                                        setEditMealPopup={setEditMealPopup}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Popup title="Dodaj sablon" openPopup={openTemplatePopup} setOpenPopup={setOpenTemplatePopup}>
                <TemplateForm />
            </Popup>
            <Popup title="Izmijeni sablon" openPopup={openEditTemplatePopup} setOpenPopup={setOpenEditTemplatePopup}>
                <EditTemplateForm template={template} />
            </Popup>
            <Popup title="Dodaj jelo" openPopup={openAddMealPopup} setOpenPopup={setAddMealPopup}>
                <AddMealForm />
            </Popup>
            <Popup title="Dodaj jelo" openPopup={openEditMealPopup} setOpenPopup={setEditMealPopup}>
                <EditMealForm meal={editMeal} />
            </Popup>
        </MainCard>
    );
};

OrderManagement.propTypes = {
    templates: PropTypes.array.isRequired,
    loadTemplates: PropTypes.func.isRequired,
    deleteTemplate: PropTypes.func.isRequired,
    deleteMeals: PropTypes.func.isRequired,
    assignMeals: PropTypes.func.isRequired,
    updateMealsIsActive: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        templates: state.templates,
        meals: state.meals
    };
}

const mapDispatchToProps = {
    loadTemplates,
    loadMeals,
    deleteTemplate,
    deleteMeals,
    assignMeals,
    updateMealsIsActive
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagement);
