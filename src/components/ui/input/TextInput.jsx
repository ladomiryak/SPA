import React, { Component, PropTypes } from 'react';

class TextInput extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            input: {
                name,
            },
            meta: {
                touched,
                error,
            },
            label,
            input,
            type,
        } = this.props;

        return (
            <div class={error && touched ? 'is-invalid' : ''}>
                <label htmlFor={name}>{label}</label>
                <input {...input} type={type} name={name} id={name} />
                {touched && error ? <span class="error">{error}</span> : ''}
            </div>
        );
    };
}

TextInput.propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    input: PropTypes.object,
    type: PropTypes.string,
    meta: PropTypes.object,
};

export default TextInput;
