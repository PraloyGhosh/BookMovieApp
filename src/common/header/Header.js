import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    btn: {
        margin: ' auto auto auto 16px',
    },
}


const Header = (props) => {
    const { classes } = props;
    return(
        <header className="header">
            <img src={logo} alt="logo" className="logo"/>
            <div className="btn-container">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      name="Book Show" 
                      className={classes.btn}
                    >
                       Book Show
                    </Button>
                    <Button 
                      variant="contained" 
                      name={props.entry} 
                      className={classes.btn}
                    >
                       {props.entry}
                    </Button>
            </div>
        </header>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);