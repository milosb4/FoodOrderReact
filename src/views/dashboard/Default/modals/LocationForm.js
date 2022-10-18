import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import { addLocation } from '../../../../store/actions/locationActions';
import PropTypes from 'prop-types';

const initialFValues = {
    locationName: ''
};

const LocationForm = ({ addLocation, companyId }) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('locationName' in fieldValues) temp.locationName = fieldValues.locationName ? '' : 'Polje je obavezno.';
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
            addLocation({ name: values.locationName, companyId: companyId })
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    alert('Cuvanje lokacije nije uspjelo' + error);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="locationName"
                        label="Naziv lokacije"
                        value={values.locationName}
                        onChange={handleInputChange}
                        error={errors.locationName}
                    />
                    <div>
                        <Controls.Button type="submit" text="Posalji" />
                        <Controls.Button text="Resetuj" color="default" onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
};

LocationForm.propTypes = {
    addLocation: PropTypes.func.isRequired,
    companyId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    addLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
