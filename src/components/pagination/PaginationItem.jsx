import React, { Component, PropTypes } from 'react';

export default class PaginationItem extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { handlePageClick, page } = this.props;

        handlePageClick(page);
    }

    render() {
        const {
            page,
            currentPage,
            toFirst,
            prev,
            next,
            toLast,
        } = this.props;
        let content;

        if (toFirst) {
            content = (<i onClick={this.handleClick} class="fa fa-angle-double-left" />);
        } else if (prev) {
            content = (<i onClick={this.handleClick} class="fa fa-angle-left" />);
        } else if (next) {
            content = (<i onClick={this.handleClick} class="fa fa-angle-right" />);
        } else if (toLast) {
            content = (<i onClick={this.handleClick} class="fa fa-angle-double-right" />);
        } else if (currentPage) {
            content = (<i class="disabled">{page}</i>);
        } else {
            content = (<i onClick={this.handleClick}>{page}</i>);
        }

        return (
            <li>{content}</li>
        );
    }

}

const propTypes = {
    page: PropTypes.number,
    currentPage: PropTypes.bool,
    toFirst: PropTypes.bool,
    prev: PropTypes.bool,
    next: PropTypes.bool,
    toLast: PropTypes.bool,
};
const defaultProps = {};

PaginationItem.propTypes = propTypes;
PaginationItem.defaultProps = defaultProps;
