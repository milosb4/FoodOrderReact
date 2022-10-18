import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import { addTemplate, editTemplate } from '../../../../store/actions/templateActions';
import PropTypes from 'prop-types';

const initialFValues = {
    id: '',
    name: ''
};

const EditTemplateForm = ({ editTemplate, template }) => {
    initialFValues.id = template.id;
    initialFValues.name = template.name;
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
            editTemplate({ id: values.id, name: values.name })
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
                        name="name"
                        label="Naziv templejta"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
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

EditTemplateForm.propTypes = {
    editTemplate: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    editTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateForm);
