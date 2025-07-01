import React from 'react'
//import AuthService from '../servicees/AuthServices';
import '../checkUser/ChechUser.css'
import { withRouter } from 'react-router-dom';
 class ChechUser extends React.Component{
    constructor(props) {
        super(props)
        this.admin = this.admin.bind(this);
        this.surveillant = this.surveillant.bind(this);
    }
     
    admin = (e) => {
      e.preventDefault();     
      sessionStorage.setItem('role',"ADMIN");
      this.props.history.push('/login');
    }

    surveillant = (e) => {
        e.preventDefault();     
        sessionStorage.setItem('role',"SURVEILLANT");
        this.props.history.push('/login');
    }
    render() {
        return (
            <div className="body">
                   <div class="header">FS SURVEILLANCE</div>
    
                    <div className="content-container container-fluid">
                        <div className="row h-100">
                            <div className="col-6 left-panel"  onClick={this.admin}>
                                    <i className="fa-sharp fa-solid fa-circle-user fa-7x admin" style={{color: "#073b5c"}}></i>
                                        <div className="Admin">Admin</div>

                            </div>
                            
                            <div className="col-6 right-panel" onClick={this.surveillant}>
                            <i className="fa-regular fa-circle-user fa-7x" style={{color:"#073b5c"}}></i>
                                <div className="oc">Surveillant</div>
                            </div>
                        </div>
                    </div>
            </div>
           
        );
}





}
export default withRouter(ChechUser)