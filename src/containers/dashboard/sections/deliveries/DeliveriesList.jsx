import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DeliveriesItem from './DeliveriesItem'
import {fetchDeliveries} from '../../../../actions/additional';


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
export default class DeliveriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchDeliveries());
    }

    render() {

        const parcelsData = this.props.list.parcelsList.items;

        if (parcelsData !== undefined) {
            const items = parcelsData.map((item) => {
                return (
                    <DeliveriesItem key={item._id}{...item} />
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

DeliveriesList.propTypes = propTypes;
DeliveriesList.defaultProps = defaultProps;