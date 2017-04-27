import React, { Component, PropTypes } from 'react';

export default class confirm extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
    }

    handleConfirm() {
        const { accept } = this.props;

        accept();
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
                    <h5 class="modal-title">Confirm action</h5>
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
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={this.handleDiscard}
                    >Close</button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        onClick={this.handleConfirm}
                    >Submit</button>
                </div>
            </div>
        );
    }

}

const propTypes = {
    accept: PropTypes.func,
    discard: PropTypes.func,
    message: PropTypes.string,
};
const defaultProps = {};

confirm.propTypes = propTypes;
confirm.defaultProps = defaultProps;
