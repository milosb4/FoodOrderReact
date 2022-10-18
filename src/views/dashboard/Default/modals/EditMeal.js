import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editMeal } from '../../../../store/actions/mealActions';

const initialFValues = {
    id: '',
    name: '',
    isActive: false
};

const EditMealForm = ({ editMeal, meal }) => {
    initialFValues.id = meal[0].id;
    initialFValues.name = meal[0].name;
    initialFValues.isActive = meal[0].isActive;
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
            editMeal({ id: initialFValues.id, name: values.name })
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    alert('Cuvanje jela-a nije uspjelo' + error);
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

EditMealForm.propTypes = {
    editMeal: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    editMeal
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMealForm);
