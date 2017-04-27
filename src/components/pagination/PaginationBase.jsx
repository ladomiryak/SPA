import React, { Component, PropTypes } from 'react';
import PaginationItem from './PaginationItem';
import {
    PAGINATION_SIZE,
} from '../../constants';

export default class Pagination extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            handlePageClick,
            currentPage,
            totalPages,
        } = this.props;
        const pagination = [
            <PaginationItem
                key={currentPage}
                currentPage
                page={currentPage}
            />,
        ];

        for (let i = 1; i <= PAGINATION_SIZE; i++) {
            const expectedNextPage = currentPage + i;
            const expectedPrevPage = currentPage - i;

            if (expectedNextPage <= totalPages) {
                pagination.push(
                    <PaginationItem
                        handlePageClick={handlePageClick}
                        key={expectedNextPage}
                        page={expectedNextPage}
                    />
                );
            }

            if (expectedPrevPage >= 1) {
                pagination.unshift(
                    <PaginationItem
                        handlePageClick={handlePageClick}
                        key={expectedPrevPage}
                        page={expectedPrevPage}
                    />
                );
            }
        }

        if (currentPage > 1) {
            pagination.unshift(
                <PaginationItem
                    handlePageClick={handlePageClick}
                    key="prev"
                    prev
                    page={currentPage - 1}
                />
            );

            pagination.unshift(
                <PaginationItem
                    handlePageClick={handlePageClick}
                    key="first"
                    toFirst
                    page={1}
                />
            );
        }

        if (currentPage < totalPages) {
            pagination.push(
                <PaginationItem
                    handlePageClick={handlePageClick}
                    key="next"
                    next
                    page={currentPage + 1}
                />
            );

            pagination.push(
                <PaginationItem
                    handlePageClick={handlePageClick}
                    key="last"
                    toLast
                    page={totalPages}
                />
            );
        }

        return (
            <ul class="pagination">{pagination}</ul>
        );
    }

}

const propTypes = {
    handlePageClick: PropTypes.func,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};
const defaultProps = {};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
