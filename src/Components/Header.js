import React from "react";
import "../Style/Header.css";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import { GoogleLogin } from 'react-google-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
        background: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            userName: undefined,
            signupModalIsOpen: false,
            signinModalIsOpen: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value })

    }
    handleNaviagte = () => {
        this.props.history.push('/')
    }
    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }
    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined })
    }
    render() {
        const { loginModalIsOpen, signupModalIsOpen, signinModalIsOpen, isLoggedIn, userName } = this.state
        return (
            <div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="header">
                        <div className="header-logo" onClick={this.handleNaviagte}>
                            <b>e!</b>
                        </div>
                        {isLoggedIn ? <div class="lg">
                            <div className="logout" onClick={this.handleLogout}>Logout</div>
                            <div className="sigin" onClick={() => this.handleModal('loginModalIsOpen', true)}>{userName}</div>
                        </div> :
                            <div class="lg">
                                <div className="reg" onClick={() => this.handleModal('signupModalIsOpen', true)}>Create an account</div>
                                <div className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            </div>}
                    </div>

                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div className="fa fa-close" style={{ float: 'right', marginLeft: "15px", color: 'red' }}
                        onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                    <button className="btn btn-primary" onClick={() => {
                        this.handleModal('loginModalIsOpen', false);
                        this.handleModal('signinModalIsOpen', true);
                    }}>Login with Credentails</button><br /><br />
                    <GoogleLogin
                        clientId="666369228311-818an1q34b2tdu0dp5s2m0u6fkmejpit.apps.googleusercontent.com"
                        buttonText="Continue with Gmail"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                </Modal>
                <Modal
                    isOpen={signinModalIsOpen}
                    style={customStyles}
                >
                    <div className="fa fa-close" style={{ float: 'right', marginLeft: "15px", color: 'red' }}
                        onClick={() => this.handleModal('signinModalIsOpen', false)}>

                    </div>
                    <form>
                        <div style={{ marginTop: '0px', marginLeft: '40%', fontSize: "20px", color: "blue" }}>Login</div>
                        <label className="form-lable">User Id</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                        <label className="form-lable">Password</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('contactNumber', event)} />
                        <button className="btn btn-danger" style={{ marginTop: '10px', marginLeft: '35%' }} onClick={this.handleLogin}>Login</button>
                    </form>


                </Modal>
                <Modal
                    isOpen={signupModalIsOpen}
                    style={customStyles}
                >
                    <div className="fa fa-close" style={{ float: 'right', marginLeft: "15px", color: 'red' }}
                        onClick={() => this.handleModal('signupModalIsOpen', false)}>

                    </div>
                    <form>
                        <div style={{ marginTop: '0px', marginLeft: '40%', fontSize: "20px", color: "blue" }}>SignUp</div>
                        <label className="form-lable">Name</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('name', event)} />
                        <label className="form-lable">Email</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                        <label className="form-lable">Password</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('password', event)} />
                        <button className="btn btn-danger" style={{ marginTop: '10px', marginLeft: '35%' }} onClick={this.handleSingup}>SignUp</button>
                    </form>


                </Modal>
            </div>

        )
    }
}
export default withRouter(Header);