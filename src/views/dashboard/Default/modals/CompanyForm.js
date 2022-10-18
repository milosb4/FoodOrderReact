import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import { addCompany } from '../../../../store/actions/companyActions';
import PropTypes from 'prop-types';

const initialFValues = {
    companyName: ''
};

const CompanyForm = ({ addCompany }) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('companyName' in fieldValues) temp.companyName = fieldValues.companyName ? '' : 'Polje je obavezno.';
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
            addCompany(values.companyName)
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    alert('Cuvanje kompanije nije uspjelo' + error);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="companyName"
                        label="Naziv kompanije"
                        value={values.companyName}
                        onChange={handleInputChange}
                        error={errors.companyName}
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

CompanyForm.propTypes = {
    addCompany: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    addCompany
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
