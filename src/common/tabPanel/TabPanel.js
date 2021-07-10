import React, { useState } from "react";
import "./TabPanel.css";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import { FormControl, 
         InputLabel, 
         Input, 
         FormHelperText,
        } from '@material-ui/core';


function TabPanel({value , closeModal , setEntry}) {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [contactNumber,setContactNuber] = useState("");
    const [reqUsername,setReqUsername] = useState("dispNone");
    const [reqPassword,setReqPassword] = useState("dispNone");
    const [reqFirstName,setReqFirstName] = useState("dispNone");
    const [reqLastName,setReqLastName] = useState("dispNone");
    const [reqEmail,setReqEmail] = useState("dispNone");
    const [reqRegisterPassword,setReqRegisterPassword] = useState("dispNone");
    const [reqContactNumber,setReqContactNuber] = useState("dispNone");
    const [registerSuccess,setRegisterSuccess] = useState("dispNone")


    const usernameHadler =(e) => {
        setUsername(e.target.value);
    }

    const passwordHadler = (e) => {
        setPassword(e.target.value);
    }

    const firstNameHadler = (e) => {
        setFirstName(e.target.value);
    }

    const lastNameHadler = (e) => {
        setLastName(e.target.value);
    }

    const emailHadler = (e) => {
        setEmail(e.target.value);
    }

    const registerPasswordHandler = (e) => {
        setRegisterPassword(e.target.value);
    }

    const contactNumberHadler = (e) => {
        setContactNuber(e.target.value);
    }

    const loginButtonHandler = async () => {
        username === "" ? setReqUsername("dispBlock") : setReqUsername("dispNone");
        password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");

        if(
            username === "" ||
            password === ""
        ) {
            return;
        }

        const param = window.btoa(`${username}:${password}`);

        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login", {
                method: 'POST',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8",
                    "authorization": `Basic ${param}`
                }
            });

            const data = await rawResponse.json();

            if(rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(data));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                closeModal();
                setEntry("Logout");
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

    const registerButtonHandler = async () => {
        firstName === "" ? setReqFirstName("dispBlock") : setReqFirstName("dispNone");
        lastName === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
        registerPassword === "" ? setReqRegisterPassword("dispBlock") : setReqRegisterPassword("dispNone");
        email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
        contactNumber === "" ? setReqContactNuber("dispBlock") : setReqContactNuber("dispNone");

        if(
            firstName === "" ||
            lastName === "" ||
            registerPassword === "" ||
            email === "" ||
            contactNumber === "" 
        ) {
            return;
        }

        const params = {
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            mobile_number: contactNumber,
            password: registerPassword
        }

        try {
            const rawResponse = await fetch("http://localhost:8085/api/v1/signup", {
                body: JSON.stringify(params),
                method: 'POST',
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const data = await rawResponse.json();

            if(rawResponse.ok) {
                setRegisterSuccess('dispBlock');
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

    return (
        <div>
            <div 
                hidden={value !== 0 }
                className="tablePanel"
            >
                {value === 0 && (
                    <div className="box">
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="username">
                                Username
                            </InputLabel>
                            <Input 
                                id="username" 
                                value={username} 
                                onChange={usernameHadler}
                            />
                            <FormHelperText className={reqUsername}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="password">
                                Password
                            </InputLabel>
                            <Input 
                                id="password" 
                                type="password"
                                value={password} 
                                onChange={passwordHadler}
                            />
                            <FormHelperText className={reqPassword}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            name="Login"
                            onClick={loginButtonHandler}
                        >
                            LOGIN
                        </Button>
                    </div>
                )}
            </div>
            <div 
                hidden={value !== 1}
                className="tablePanel"
            >
                {value === 1 && (
                    <div className="box">
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="firstName">
                                First Name
                            </InputLabel>
                            <Input 
                                id="FirstName" 
                                value={firstName} 
                                onChange={firstNameHadler}
                            />
                            <FormHelperText className={reqFirstName}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="lastName">
                                Last Name
                            </InputLabel>
                            <Input 
                                id="lastName" 
                                value={lastName} 
                                onChange={lastNameHadler}
                            />
                            <FormHelperText className={reqLastName}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="email">
                                Email
                            </InputLabel>
                            <Input 
                                id="email" 
                                type="email"
                                value={email} 
                                onChange={emailHadler}
                            />
                            <FormHelperText className={reqEmail}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="registerPassword">
                                Password
                            </InputLabel>
                            <Input 
                                id="registerPassword"
                                type="password" 
                                value={registerPassword} 
                                onChange={registerPasswordHandler}
                            />
                            <FormHelperText className={reqRegisterPassword}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl required > 
                            <InputLabel htmlFor="contactNumber">
                                ContactNumber
                            </InputLabel>
                            <Input 
                                id="contactNumber" 
                                value={contactNumber} 
                                onChange={contactNumberHadler}
                            />
                            <FormHelperText className={reqContactNumber}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <span className={registerSuccess}>Registration Successful. Please Login!</span>
                        <br />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            name="Register"
                            onClick={registerButtonHandler}
                        >
                            REGISTER
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.any.isRequired,
  };

export default TabPanel;