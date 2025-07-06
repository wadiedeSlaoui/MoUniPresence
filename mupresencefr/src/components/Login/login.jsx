import React from 'react'

import Logo from './logo.png'
import AuthService from '../../services/AuthServices';
import '../Login/Login.css'
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading';
  
 class Login extends React.Component{
    constructor(props) {
        super(props)

      this.state = {
            id: "",
            password:"",  
            username:"",
            loading: false

        }
        this.changeusernameHandler = this.changeusernameHandler.bind(this);
        this.changepasswordHandler = this.changepasswordHandler.bind(this);
        
        this.errorRef = React.createRef();
        this.errorRoleRef = React.createRef();
        this.login = this.login.bind(this);
    }
   
   login = (e) => {
        e.preventDefault();

        // ✅ Use setState to trigger re-render
        this.setState({ loading: true }, () => 
        {
            sessionStorage.setItem('token', "");
            sessionStorage.setItem('roleUser', "");
            sessionStorage.setItem('user', "");
            sessionStorage.setItem('fullName', "");

            AuthService.login(this.state.username, this.state.password).then(res => {
            sessionStorage.setItem('token', res.data);

            AuthService.user(this.state.username).then(res => {
                sessionStorage.setItem('user', res.data.username);
                sessionStorage.setItem('fullName', res.data.firstName + " " + res.data.lastName);

                // ✅ stop loading
                this.setState({ loading: false });

                if (res.data.role.includes(sessionStorage.getItem('role'))) {
                sessionStorage.setItem('roleRole', res.data.role);
                if (sessionStorage.getItem('role') === "ADMIN") {
                    this.props.history.push('/admin/dashboard');
                } else {
                    this.props.history.push('/surv/studentlist');
                }
                } else {
               this.errorRoleRef.current.style.display = "block";
                setTimeout(() => {
                    if (this.errorRoleRef.current) this.errorRoleRef.current.style.display = "none";
                }, 2000);
                }
            });

            }).catch(err => {
            this.setState({ loading: false }); // ✅ stop loading on error
            this.errorRef.current.style.display = "block";
            setTimeout(() => {
                 if (this.errorRef.current) this.errorRef.current.style.display = "none";
            }, 2000);
        });
        });
    }
  
      changeusernameHandler= (event) => {
        this.setState({username: event.target.value});
        
    }
    changepasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }
    render() {
         
        return (
            
            
            <div className="body">
                <div style={{ position: 'relative' }}>
  <button
    className="btn btn-outline-primary"
    style={{
      color:'white',
      borderColor:'white',  
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: 10
    }}
    onClick={() => this.props.history.goBack()}
  >
    <i className="pi pi-arrow-left" style={{ marginRight: '5px' }}></i> Retour
  </button>

  {/* Card content */}
  <div className="card">
    {/* Login form */}
  </div>
</div>

                {this.state.loading && <Loading />}
                   <div className="propre-container ">
                    


                <div className="container   mx-auto">
                    <div className="">
                    <div className="card  ">
                        <div className="card-header ">
                            <img src={Logo} alt="Logo" style={{width:"50%"}}/>
                        </div>
                        <div className="card-body">
                                <div className="form-group">
                            <div className="app-name">
                                            <h4 className='nna'>{sessionStorage.getItem("role")}</h4>
                            </div>
                                    <div ref={this.errorRef} className="hidden-error text-danger" style={{ display: "none" }}>
                                            Incorrect Username/Email or password.
                                    </div>

                                    <div ref={this.errorRoleRef} className="hidden-error1 text-danger" style={{ display: "none" }}>
                                             Correct credentials but you are not {sessionStorage.getItem("role")}.
                                    </div>
                                    <form action="">
                                        <div className="container-sm element-margin">
                                             <input type="email" name="email" className="form-control" onChange={this.changeusernameHandler} placeholder="username" />
                                        </div>
                                         <div className="container-sm element-margin">
                                             <input type="password" name="password" className="form-control" onChange={this.changepasswordHandler} placeholder="Password"/>
                                            </div>
                                            <div className="container-sm element-margin">
                                             <button type="submit"  className="btn btn-primary ter" name="singIn" onClick={this.login} >Sign In</button>
                                    </div>
                               
                                
   
                              </form>
                            </div>
                          
                                <p ><a href="hy"   className="forget_password">forget password?</a></p>
                            
                        </div>
                        
                        </div>
                        </div>
                </div>

            </div>
            
            </div>
           
        );
}





}
export default withRouter(Login)