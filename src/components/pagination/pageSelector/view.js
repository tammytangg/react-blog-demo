import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {actions as blogListActions} from '../blogList/'
import {setPage} from './actions'

import { withStyles } from '@material-ui/core/styles';
import {Toolbar} from "@material-ui/core";

require('./view.css');


const styles = theme => ({
    leftButton: {
        marginRight:theme.spacing.unit *3
    },
    rightButton:{
        marginLeft:theme.spacing.unit * 3
    },
    pageButtons:{
        marginLeft:theme.spacing.unit * 0
    },
    toolbarMy:{
        paddingLeft:0
    }
});

const defaultPage = 1;


class PageSelector extends React.Component {
    constructor() {
        super(...arguments);

        this.setUp = this.setUp.bind(this);
        this.setNext = this.setNext.bind(this);
    }


    componentDidMount() {
        //const defaultPage = 'page1';

        this.props.onSelectPage(defaultPage,null);
    }

    setUp(){
        console.log(this.props.current);
        const lastPage = this.props.current-1;
        const {archive} = this.props;
        this.props.onSelectPage(lastPage, archive);
    }

    setNext(){
        const nextPage = this.props.current+1;
        const {archive}  = this.props
        this.props.onSelectPage(nextPage, archive);
    }



    render() {
        const {current,amountPage, pageSize} = this.props;
        const {classes} = this.props;
        return (
            <Toolbar className={classes.toolbarMy}>
                <div>
                    {
                        <button key="prev"  label="上一页"
                             disabled={current <= 1} className="page-btn"
                             onClick={this.setUp}>
                            Last
                        </button>
                    }
                    {
                        <button key="next"  label="下一页"
                             disabled={current === amountPage}  className="page-btn"
                             onClick={this.setNext}>
                            Next
                        </button>
                    }
                    <span style={{color:'black'}}>
                        Page {current} of {amountPage}
                    </span>
                </div>
            </Toolbar>

        );
    }
}

PageSelector.propTypes = {
    onSelectPage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const {current,amount,pageSize} = state.pageInfo;
    console.log("amount:"+amount+", current:"+current)
    return{
        current: current,
        amountPage:Math.ceil(amount/pageSize),
        pageSize: pageSize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectPage: (page) => {
            dispatch(setPage(page))
            dispatch(blogListActions.fetchBlog(page));
        }
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PageSelector));