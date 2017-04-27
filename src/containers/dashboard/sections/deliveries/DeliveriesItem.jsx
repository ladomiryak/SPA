import React, {Component, PropTypes} from 'react';

export default class DeliveriesItem extends Component {

    render() {


        const {
            size,
            title,
            from,
            to,
            price,
            owner,
            startDate

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
            </tr>

        );
    }
}
