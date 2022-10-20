import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../dashboard/Default/controls/Controls';
import { useForm, Form } from '../../dashboard/Default/useForm';
import { connect } from 'react-redux';
import { addOrder, editOrder } from '../../../store/actions/orderActions';
import PropTypes from 'prop-types';

const initialFValues = {
    templateId: '',
    templateName: '',
    date: new Date(),
    dayNumber: 0,
    shift: ''
};

const OrderAddForm = ({ templates, addOrder, editOrder, shift }) => {
    initialFValues.shift = shift;

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

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
            values.date.setHours(12, 0, 0, 1);
            values.templateName = templates.find((x) => x.id == values.templateId).name;
            values.dayNumber = values.date.getDay();
            addOrder(values)
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    alert('Cuvanje jela-a nije uspjelo' + error);
                });
        }
    };
    // <Select fullWidth value={template} label="Templejti" onChange={handleTemplateChange}>
    //     {templates.map((template) => (
    //         <MenuItem key={template.id} value={template}>
    //             {template.name}
    //         </MenuItem>
    //     ))}
    // </Select>
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
                    <Controls.DatePicker name="date" label="Datum" value={values.date} onChange={handleInputChange} />
                    <div>
                        <Controls.Button type="submit" text="Posalji" />
                        <Controls.Button text="Resetuj" color="default" onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
};

OrderAddForm.propTypes = {
    addOrder: PropTypes.func.isRequired,
    templates: PropTypes.array.isRequired,
    editOrder: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        templates: state.templates
    };
}

const mapDispatchToProps = {
    addOrder,
    editOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAddForm);
