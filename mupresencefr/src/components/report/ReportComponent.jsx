import React, { Component } from 'react'
//import collaboratorService from '../../servicees/CollaborateurServices';
import Select from 'react-select';
import '../report/report.css'

  
class ReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filiere:{},
            filiereOptions:[{ value: "filierId", label: "Filier1" },{ value: "filierId2", label: "Filier2" }] ,
            raison:""      
        }
        
        this.changeFiliereHandler =this.changeFiliereHandler.bind(this);
        this.changeRaisonHandler =this.changeRaisonHandler.bind(this);
        this.saveOrUpdateReport = this.saveOrUpdateReport.bind(this);

    }

    // get collaborator formation if user click in update
    componentDidMount(){
        this._isMounted = true;
        this.state.filiereOptions = [{ value: "filierId", label: "Filier1" },{ value: "filierId2", label: "Filier2" }]
       
    }
    //errors for  formation not inputed
    errors = (x) =>{
           
            document.querySelector('.'+x).style.display = "block";  
            setTimeout(function(){document.querySelector("."+x).style.display = "none"},10200)
            document.querySelector(".error").style.display = "inline-block";  
            setTimeout(function(){document.querySelector(" .error").style.display = "none"},10200)

    }
    saveOrUpdateReport = (e) => {
        this._isMounted = true;
             e.preventDefault();
        if(this.state.filiere.value == undefined ){
           this.errors('filiere')
        }
         if   (this.state.raison === "" ){
           this.errors('raison')
        }
         
    }
        
        
    
    
    changeFiliereHandler= (event) => {
        this.setState({filiere: event});
    }
    changeRaisonHandler= (event) => {
        this.setState({raison: event.target.value});
    }
    
    cancel(){
        this.props.history.push('/admin');
    }
    render() {
      
        return (
           
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                
                                <h1 style={{textAlign:"center", fontWeight:'bold'}}>Report</h1>
                                
                                <div className = "card-body">
                                    <form>
                                    
                                        
                                        <div className = "form-group">
                                            <label>  surveillant: </label>
                                            <input placeholder="Surv Name" name="survience" className="form-control" 
                                                value={sessionStorage.getItem("fullName")} disabled/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Filiere: </label>
                                            <Select 
                                                value={this.state.filiere}
                                                 onChange={change=>this.changeFiliereHandler(change)}
                                                 options={this.state.filiereOptions}
                                                 />
                                               <div className="hidden-error text-danger filiere" style={{display:"none"}}>
                                                    choisir Filiere.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> Module: </label>
                                            <Select 
                                                value={this.state.module}
                                                 onChange={change=>this.changeModuleHandler(change)}
                                                 options={this.state.filiereOptions}
                                                 />
                                               <div className="hidden-error text-danger filiere" style={{display:"none"}}>
                                                    choisir le module.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> Le cas  </label>
                                            <Select 
                                                value={this.state.module}
                                                 onChange={change=>this.changeModuleHandler(change)}
                                                 options={this.state.filiereOptions}
                                                 />
                                               <div className="hidden-error text-danger filiere" style={{display:"none"}}>
                                                    choisir le cas.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> nom et prénom </label>
                                            <input placeholder="Full Name" name="nom et prénom" className="form-control" type='text'/>
                                        </div>
                                        <div className = "form-group">
                                            <label> N° Apogee </label>
                                            <input placeholder="Entrer l'apogee" name="N° Apogee" className="form-control" type='text'/>
                                        </div>          
                                       <div className = "form-group">
                                            <label>Description</label>
                                            <textarea class="form-control" placeholder="Entrer la raison" onChange={this.changepasswordHandler} style={{height: "100px"}}></textarea>
                                            <div className="hidden-error text-danger raison" style={{display:"none"}}>
                                                    saisir le texte.
                                                </div>
                                        </div>
                                        <button className="btn btn-success tre"  onClick={this.saveOrUpdateReport}>Save</button>
                                        <button className="btn btn-danger trr" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        <span className="hidden-error text-danger error" style={{display:"none" , paddingLeft:"20px"}}>Error</span>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
             
        )
    }
}

export default ReportComponent 