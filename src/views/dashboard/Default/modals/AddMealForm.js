import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import { addMeal } from '../../../../store/actions/mealActions';
import PropTypes from 'prop-types';

const initialFValues = {
    name: ''
};

const AddMealForm = ({ addMeal }) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Polje je obavezno.';
        setErrors({
            ...temp
        });
        if (fieldValues == values) return Object.values(temp).every((x) => x == '');
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        const { name, value } = e.target;
        e.preventDefault();
        if (validate()) {
            addMeal(values.name)
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    alert('Cuvanje jela nije uspjelo' + error);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input name="name" label="Naziv jela" value={values.name} onChange={handleInputChange} error={errors.name} />
                    <div>
                        <Controls.Button type="submit" text="Posalji" />
                        <Controls.Button text="Resetuj" color="default" onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
};

AddMealForm.propTypes = {
    addMeal: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    addMeal
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMealForm);
