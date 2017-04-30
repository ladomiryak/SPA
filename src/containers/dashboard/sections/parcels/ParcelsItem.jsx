import React, {Component, PropTypes} from 'react';

export default class ParcelsItem extends Component {

    render() {


        const {
            _id,
            size,
            title,
            from,
            to,
            price,
            owner,
            startDate,
            removeParcel,
            showModal,
            edit

        } = this.props;

        return (
            <tr data-id={_id}>
                <td><input type="text" value={title} disabled/></td>
                <td><input type="text" value={from.city} disabled/></td>
                <td><input type="text" value={to.city} disabled/></td>
                <td><input type="text" value={price} disabled/></td>
                <td><input type="text" value={size.name} disabled/></td>
                <td><input type="text" value={owner.fullName} disabled/></td>
                <td className="text-center"><span onClick={()=>{edit(_id)}} className="icon-edit"></span></td>
                <td className="text-center"><span onClick={()=>{showModal(_id)}} className="icon-delete red"></span></td>
            </tr>

        );
    }
}
