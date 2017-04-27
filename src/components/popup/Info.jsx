import React, { Component, PropTypes } from 'react';

export default class Info extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleDiscard = this.handleDiscard.bind(this);
    }

    handleDiscard() {
        const { discard } = this.props;

        discard();
    }

    render() {
        const { message } = this.props;

        return (
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Information</h5>
                    <button
                        type="button"
                        class="close"
                        onClick={this.handleDiscard}
                    >
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{message}</p>
                </div>
            </div>
        );
    }

}

const propTypes = {
    discard: PropTypes.func,
    message: PropTypes.string,
};
const defaultProps = {};

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;
