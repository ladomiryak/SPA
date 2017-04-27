import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {ShowUserProfile} from '../../../../actions/users';


@connect(
    function mapStateToProps(state) {
        return {
            usersData: state.users.current,
        };
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch,
        };
    }
)
export default class UserProfileItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        const id = this.props.location.query.id;
        const { dispatch } = this.props;
        dispatch(ShowUserProfile(id));
    }

    render() {

        const {
            fullName,
            dob,
            email,
            gender,
            avatar,
            phone,
            deliveries,
            parcels,
          //  country :{name},
            rating,


    } = this.props.usersData;

        console.log(this.props.usersData);


        return (

            <div>
                <div className="profile_container ">
                   <div className="row">
                       <div className="col-xs-12 col-md-6">
                           <div className="profile_block">
                               <img src={avatar ? avatar : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'}  alt="avatar" className="profile_avatar"/>
                           </div>
                           <div className="profile_block">
                               <span>Full name</span>
                               {fullName}
                           </div>
                           <div className="profile_block">
                               <span>Date of birth</span>
                               {dob}
                           </div>
                           <div className="profile_block">
                               <span>Email</span>
                               {email}
                           </div>
                           <div className="profile_block">
                               <span>Gender</span>
                               {gender}
                           </div>
                           <div className="profile_block">
                               <span>Phone</span>
                               {phone}
                           </div>
                       </div>
                       <div className="col-xs-12 col-md-6">
                           <div className="profile_block">
                               <span>Deliveries</span>
                               {deliveries}
                           </div>
                           <div className="profile_block">
                               <span>Parcels</span>
                               {parcels}
                           </div>
                           {/* <div>{name}</div>*/}
                           <div  className="profile_block">
                               <span>Rating</span>
                               {rating}
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        )
    }
}



const propTypes = {
    usersData: PropTypes.object,
    dispatch: PropTypes.func,
};
const defaultProps = {};

UserProfileItem.propTypes = propTypes;
UserProfileItem.defaultProps = defaultProps;