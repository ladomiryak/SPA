import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ConfirmPopup from './Confirm';
import InfoPopup from './Info';
import {
    close as closeAction,
} from '../../actions/popup';

@connect(
    function mapStateToProps(state) {
        return {
            popupData: state.popup,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class Base extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm() {
        const { dispatch, popupData } = this.props;

        dispatch({
            type: popupData.action,
            payload: {},
        });
        dispatch(closeAction());
    }

    handleDiscard() {
        const { dispatch } = this.props;

        dispatch(closeAction());
    }

    render() {
        const { popupData } = this.props;
        const visible = popupData.show;
        let container;

        if (visible && popupData.confirm) {
            container = (
                <ConfirmPopup
                    accept={this.handleConfirm}
                    discard={this.handleDiscard}
                    message={popupData.message}
                />
            );
        } else if (visible && popupData.info) {
            container = (
                <InfoPopup
                    discard={this.handleDiscard}
                    message={popupData.message}
                />
            );
        } else {
            container = null;
        }

        return (
            <div class={`modal fade ${visible ? 'show' : ''}`}>
                <div class="modal-dialog">
                    {container}
                </div>
            </div>
        );
    }

}

const propTypes = {
    popupData: PropTypes.object,
    dispatch: PropTypes.func,
};
const defaultProps = {};

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;
