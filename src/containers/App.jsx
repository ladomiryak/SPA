import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
    initialization as initializationAction
} from '../actions/authorization';

@connect(
    function mapStateToProps(state) {
        return {
            state,
        };
    }
)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(initializationAction());
    }

    render() {
        const { children } = this.props;

        return (
            <div className="app">{children}</div>
        );
    }
}

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.element,
    ]),
    dispatch: PropTypes.func,
};
const defaultProps = {
    children: '',
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
