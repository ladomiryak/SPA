import React, {Component, PropTypes} from 'react';

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
                    <td><img src={avatar} alt="avatar" width='100'/></td>
                    <td >{fullName}</td>
                    <td>{dob}</td>
                    <td>{email}</td>
                    <td>{gender}</td>
                    <td>{phone}</td>
                    <td>{payPalSynced ? '+' : '-'}</td>
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
