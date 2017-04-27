import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';
import OutSideClick from 'react-click-outside';

@OutSideClick
export default class SelectWithPagination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openSelect: false,
            selectedValue: '',
        };
        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    componentWillMount() {
        const { initialValue, input } = this.props;

        if (initialValue) {
            this.setState({
                selectedValue: initialValue.name,
            });
            input.onChange(initialValue._id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { disabled, input } = nextProps;
        const isDisabled = this.props.disabled;

        if (disabled && !isDisabled) {
            this.setState({
                selectedValue: '',
            });
            input.onChange('');
        }
    }

    handleClickOutside() {
        this.setState({
            openSelect: false,
        });
    }

    handleSelectClick() {
        this.setState({
            openSelect: !this.state.openSelect,
        });
    }

    handleOptionClick(event) {
        const {
            input,
        } = this.props;
        const value = event.target.innerHTML;

        input.onChange(event);
        this.setState({
            selectedValue: value,
            openSelect: false,
        });
    }

    handleSearchInputChange(event) {
        const value = event.target.value;
        const {
            handlePaginationClick,
        } = this.props;

        handlePaginationClick({
            page: 1,
            search: value,
        });
    }

    handleNextClick() {
        const {
            handlePaginationClick,
            data: {
                query: {
                    page,
                },
            },
        } = this.props;

        handlePaginationClick({
            page: page + 1,
        });
    }

    handlePrevClick() {
        const {
            handlePaginationClick,
            data: {
                query: {
                    page,
                },
            },
        } = this.props;

        handlePaginationClick({
            page: page - 1,
        });
    }

    render() {
        const {
            openSelect,
            selectedValue,
        } = this.state;
        const {
            meta: {
                touched,
                error,
            },
            input,
            disabled,
            data,
        } = this.props;

        const totalPages = data.totalPages;
        const page = data.query.page;
        const disableNextButton = (page >= totalPages);
        const disablePrevButton = (page <= 1);
        const options = data.records.map((user) => {
            return (
                <option
                    key={user._id}
                    value={user._id}
                    onClick={this.handleOptionClick}
                >{user.name}</option>
            );
        });

        return (
            <div class={`dropdown ${openSelect ? 'show' : ''} ${disabled ? 'disabled' : ''}`}>
                <button {...input} class="btn table-dropdown-btn" onClick={this.handleSelectClick}>
                    {selectedValue || '...'}
                    <i class="fa fa-angle-down float-right" />
                </button>
                <div class="dropdown-menu">
                    <DebounceInput
                        debounceTimeout={300}
                        onChange={this.handleSearchInputChange}
                        type="text"
                        placeholder="Search..."
                    />
                    {options}
                    <div class="dropdown-navigation">
                        <i
                            class={`fa fa-angle-left float-left ${disablePrevButton ? 'disabled' : ''}`}
                            onClick={this.handlePrevClick}
                        />
                        <span>{page} of {totalPages}</span>
                        <i
                            class={`fa fa-angle-right float-right ${disableNextButton ? 'disabled' : ''}`}
                            onClick={this.handleNextClick}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

const propTypes = {
    name: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string,
    initialValue: PropTypes.object,
    input: PropTypes.object,
    data: PropTypes.object,
    meta: PropTypes.object,
    disabled: PropTypes.bool,
    handlePaginationClick: PropTypes.func,
};
const defaultProps = {};

SelectWithPagination.propTypes = propTypes;
SelectWithPagination.defaultProps = defaultProps;
