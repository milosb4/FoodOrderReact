import React from 'react';
import InputLabel from '@mui/material/InputLabel';

const Field = ({ field, fieldChanged, type, value }) => {
    return (
        <div key={field._uid}>
            <InputLabel htmlFor={field._uid}>{field.label}</InputLabel>
            <input
                type={type || field.component}
                id={field._uid}
                name={field._uid}
                value={value}
                onChange={(e) => {
                    // Notify the main state list of the new value
                    fieldChanged(field._uid, e.target.value);
                }}
            />
        </div>
    );
};

export default Field;
