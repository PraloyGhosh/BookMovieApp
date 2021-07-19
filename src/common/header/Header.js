import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { Tabs, Tab } from '@material-ui/core';
import TabPanel from "../tabPanel/TabPanel";


const styles = {
    btn: {
        margin: ' auto auto auto 16px',
    },
    dispNone: {
        display: 'none'
    },
    dispBlock: {
        display: 'inlineBlock'
    }
}

const customStyles = {
    content : {
      top         : '50%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      transform   : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root');

const Header = (props) => {
    const { classes } = props;

    const [modalIsOpen,setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [entry,setEntry] = useState("Login");

    useEffect(() => {
        if(window.sessionStorage.getItem('access-token'))
            setEntry("Logout");
    },[])

    function openModal() {
        if(window.sessionStorage.length !== 0){
            logoutButtonHandler();
            return;
        }
        setIsOpen(true);
        setSelectedTab(0);
    }
    
    function closeModal(){
        setIsOpen(false);
    }

    const handleChange = (event, newSelectedTab) => {
        setSelectedTab(newSelectedTab);
    }

    const logoutButtonHandler = async () => {
        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/auth/logout", {
                method: 'POST',
                headers: {
                    "Accept": "*/*",
                    "authorization": `Bearer ${window.sessionStorage.getItem('access-token')}`
                }
            });

            const data = rawResponse.json;

            if(rawResponse.ok) {
                window.sessionStorage.clear();
                setEntry("Login");
            }
            else {
                const error = new Error();
                error.message = data.message || 'Something went wrong';
                throw error;
            }
        }
        catch(e) {
            alert(`Error : ${e.message}`);
        }
    }

    const bookShowButtonHandler = () => {
        if(window.sessionStorage.getItem('access-token')) {
            props.history.push(`/bookshow/${props.id}`)
        }
        else{
            setIsOpen(true);
            setSelectedTab(0);
        }

    }

    return(
        <header className="header">
            <img src={logo} alt="logo" className="logo"/>
            <div className="btn-container">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      name="Book Show" 
                      className={props.showBtn?classes.dispBlock : classes.dispNone}
                      onClick={bookShowButtonHandler}
                    >
                       Book Show
                    </Button>
                    <Button 
                      variant="contained" 
                      name={entry} 
                      className={classes.btn}
                      onClick={openModal}
                    >
                       {entry}
                    </Button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="LOGIN"></Tab>
                    <Tab label="REGISTER"/>

                </Tabs>

                <TabPanel value={selectedTab} closeModal={closeModal} setEntry={setEntry}/>
                
            </Modal>
        </header>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);