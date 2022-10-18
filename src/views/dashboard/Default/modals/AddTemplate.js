import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import { addTemplate } from '../../../../store/actions/templateActions';
import PropTypes from 'prop-types';

const initialFValues = {
    templateName: ''
};

const TemplateForm = ({ addTemplate }) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('templateName' in fieldValues) temp.templateName = fieldValues.templateName ? '' : 'Polje je obavezno.';
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
            addTemplate(values.templateName)
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    alert('Cuvanje template-a nije uspjelo' + error);
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        name="templateName"
                        label="Naziv templejta"
                        value={values.templateName}
                        onChange={handleInputChange}
                        error={errors.templateName}
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

TemplateForm.propTypes = {
    addTemplate: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    addTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
