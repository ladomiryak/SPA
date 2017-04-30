import React, {Component, PropTypes} from 'react';
import moment from 'moment';

export default class UserItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            fullName,
            dob,
            email,
            gender,
            avatar,
            phone,
            payPalSynced,
            handleOpenProfile,
            _id,
        } = this.props;


        return (
                <tr onClick={
                        () => {
                            handleOpenProfile(_id);
                        }
                    }>
                    <td><img src={avatar} alt="avatar" width='80'/></td>
                    <td >{fullName}</td>
                    <td>{moment(dob).format('DD.MM.YYYY')}</td>
                    <td>{email}</td>
                    <td>{gender}</td>
                    <td>{phone}</td>
                    <td className="text-center">{payPalSynced ? '+' : '-'}</td>
                </tr>
        );
    }
}

const propTypes = {
    fullName: PropTypes.string,
    dob: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string,
    _id: PropTypes.string,
    handleEditItemClick: PropTypes.func,
    handleOpenProfile: PropTypes.func,
};
const defaultProps = {};

UserItem.propTypes = propTypes;
UserItem.defaultProps = defaultProps;
