import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../dashboard/Default/controls/Controls';
import { useForm, Form } from '../../dashboard/Default/useForm';
import { connect } from 'react-redux';
import { editOrder } from '../../../store/actions/orderActions';
import PropTypes from 'prop-types';

const initialFValues = {
    templateId: '',
    templateName: '',
    date: new Date(),
    dayNumber: 0,
    shift: ''
};

const OrderEditForm = ({ templates, editOrder, selectedOrder, shift }) => {
    initialFValues.shift = selectedOrder.shift;
    initialFValues.templateId = selectedOrder.templateId;
    initialFValues.date = selectedOrder.date;
    initialFValues.dayNumber = selectedOrder.dayNumber;
    initialFValues.templateName = selectedOrder.templateName;

    const getTemplateSelect = () => {
        return templates.map((x) => {
            return { id: x.id, title: x.name };
        });
    };

    const validate = (fieldValues = values) => {
        debugger;
        let temp = { ...errors };
        if ('templateId' in fieldValues) temp.templateId = fieldValues.templateId ? '' : 'Polje je obavezno.';
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
            values.templateName = templates.find((x) => x.id == values.templateId).name;
            editOrder(values)
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
                    <Controls.Select
                        name="templateId"
                        label="Izaberi sablon"
                        value={values.templateId}
                        onChange={handleInputChange}
                        options={getTemplateSelect()}
                        error={errors.templateId}
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

OrderEditForm.propTypes = {
    templates: PropTypes.array.isRequired,
    editOrder: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        templates: state.templates
    };
}

const mapDispatchToProps = {
    editOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEditForm);
