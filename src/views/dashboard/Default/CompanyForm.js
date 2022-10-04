import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from './controls/Controls';
import { useForm, Form } from './useForm';

const initialFValues = {
    companyName: ''
};

export default function CompanyForm(props) {
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
        if (validate()) {
            debugger;
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
                </Grid>
            </Grid>
        </Form>
    );
}
