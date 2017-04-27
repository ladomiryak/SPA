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
            showModal

        } = this.props;

        return (
            <tr>
                <td>{title}</td>
                <td>{from.city}</td>
                <td>{to.city}</td>
                <td>{price}</td>
                <td>{size.name}</td>
               {/* <td>{startDate}</td>*/}
                <td>{owner.fullName}</td>
                <td><span onClick={()=>{showModal(_id)}}>X</span></td>
                {/*<td><span onClick={()=>{removeParcel(_id)}}>X</span></td>*/}
            </tr>

        );
    }
}
