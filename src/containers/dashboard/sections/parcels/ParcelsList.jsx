import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ParcelsItem from './ParcelsItem'
import Popup  from '../../../../components/popup/Base'
import {fetchParcels} from '../../../../actions/additional';
import {removeParcel} from '../../../../actions/additional';
import {showConfirmPopup} from '../../../../actions/popup';


@connect(
    function mapStateToProps(state) {
        return {
            list: state.additional
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class ParcelsList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.removeParcel = this.removeParcel.bind(this);
        this.showModal = this.showModal.bind(this);
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchParcels());
    }

    removeParcel (id) {
        const {dispatch} = this.props;
        dispatch(removeParcel(id));
    }

    showModal(_id) {
        const {dispatch} = this.props;
        dispatch(showConfirmPopup({action: 'REMOVE_PARCEL', custom: _id, message: 'Are You sure?' }));
    }

    render() {

        const parcelsData = this.props.list.parcelsList.items;

        if (parcelsData !== undefined) {
            const items = parcelsData.map((item) => {
                return (
                    <ParcelsItem key={item._id}{...item} removeParcel={this.removeParcel} showModal={this.showModal} />
                )
            });

            return (
                <div>
                    <div className="profile_container ">
                        <h2>Parcels</h2>
                        <table className="table1">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Price</th>
                                <th>Size</th>
                              {/*  <th>Start Date</th>*/}
                                <th>Owner</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                    <Popup />
                </div>
            )
        }

        return (
            <div>Loading...</div>
        )


    }
}


const propTypes = {
    dispatch: PropTypes.func,
    parcelsList: PropTypes.object,
};
const defaultProps = {};

ParcelsList.propTypes = propTypes;
ParcelsList.defaultProps = defaultProps;