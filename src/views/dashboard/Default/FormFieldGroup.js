import React from 'react';
import Field from './FormField';
import FormControl from '@mui/material/FormControl';
const FieldGroup = ({ field, fieldChanged, values }) => {
    const fields = field.fields;

    return (
        <FormControl variant="standard" fullWidth>
            <fieldset key={field._uid}>
                {/*<h3>{field.label}</h3>*/}
                {fields.map((field) => {
                    return <Field key={field._uid} field={field} fieldChanged={fieldChanged} value={values[field._uid]} />;
                })}
            </fieldset>
        </FormControl>
    );
};

export default FieldGroup;
