import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../controls/Controls';
import { useForm, Form } from '../useForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../../../store/actions/userActions';

const initialFValues = {
    firstName: '',
    lastName: '',
    email: '',
    locationId: '',
    role: ''
};

const getRolesCollection = () => [
    { id: 'Client', title: 'Client' },
    { id: 'Sales', title: 'Sales' }
];

const AddUserForm = ({ addUser, location }) => {
    initialFValues.locationId = location;
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('firstName' in fieldValues) temp.firstName = fieldValues.firstName ? '' : 'Ovo polje je obavezno.';
        if ('lastName' in fieldValues) temp.lastName = fieldValues.lastName ? '' : 'Ovo polje je obavezno.';
        if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email nije validan.';
        if ('role' in fieldValues) temp.role = fieldValues.role ? '' : 'Ovo polje je obavezno.';
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
            addUser(values)
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
                        name="firstName"
                        label="Ime"
                        value={values.companyName}
                        onChange={handleInputChange}
                        error={errors.companyName}
                    />
                    <Controls.Input
                        label="Prezime"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Controls.Input label="Email" name="email" value={values.email} onChange={handleInputChange} error={errors.email} />
                    <Controls.Select
                        name="role"
                        label="Uloga"
                        value={values.role}
                        onChange={handleInputChange}
                        options={getRolesCollection()}
                        error={errors.role}
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

AddUserForm.propTypes = {
    addUser: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {};
}

const mapDispatchToProps = {
    addUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
