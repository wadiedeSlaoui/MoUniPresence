import React, { Component } from 'react'
//import collaboratorService from '../../servicees/CollaborateurServices';
import Select from 'react-select';
import '../report/report.css'
import FiliereAndModuleServices from 'services/FiliereAndModuleServices';
import RapportService from 'services/RapportService';


class ReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Module:'',
            ModuleOptions:[],
            cas:'',
            CasOptions:[{ value: "cas", label: "etudiant n'est pas inscris" },{ value: "cas1", label: "Cas de tricherie" }],
            filiere:'',
            filiereOptions:[] ,
            description:"",
            nuApogee:"",
            student:""      
        }
        
        this.changeFiliereHandler =this.changeFiliereHandler.bind(this);
        this.changeModuleHandler =this.changeModuleHandler.bind(this);
        this.changeLeCasHandler = this.changeLeCasHandler.bind(this);
        this.changeStudentHandler =this.changeStudentHandler.bind(this);
        this.changeNuApogeeHandler =this.changeNuApogeeHandler.bind(this);
        this.changeDescriptionHandler =this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateReport = this.saveOrUpdateReport.bind(this);

    }

    // get collaborator formation if user click in update
    componentDidMount(){
        this._isMounted = true;
        FiliereAndModuleServices.getAllFiliers().then(res=>{
             const options = res.data.map(op => ({ label: op, value: op }));
             this.setState({filiereOptions: options });
            },
            err=>{
                alert("error in getting filieres")

            }
        );
       
        this.state.CasOptions = [{ value: "cas", label: "etudiant n'est pas inscris" },{ value: "cas1", label: "Cas de tricherie" }]
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
        
        let rappot = {
            surveillant: sessionStorage.getItem("fullName"),
            filiere: this.state.filiere.value,
            module: this.state.Module.value,
            leCas: this.state.cas.value,
            studentFullName:this.state.student,
            nuApogee : this.state.nuApogee,
            description : this.state.description
        }
        RapportService.add(rappot).then(res=>{
            this.props.history.push('/surv/studentlist');
        },err=>{alert("error in creating rapport")});
         
    }
        
        
    
    
    changeFiliereHandler= (event) => {
        this.setState({filiere: event});
         FiliereAndModuleServices.getAllModules(event.value).then(res=>{
             const options = res.data.map(op => ({ label: op, value: op }));
             this.setState({ModuleOptions: options });
            },
            err=>{
                alert("error in getting Modules")
            }
        );
    }
    changeModuleHandler= (event) => {
        this.setState({Module: event});
    }
    changeLeCasHandler= (event) => {
        this.setState({cas: event});
    }
   
    changeNuApogeeHandler= (event) => {
        this.setState({nuApogee: event.target.value});
        
    }
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
        
    }
    changeStudentHandler= (event) => {
        this.setState({student: event.target.value});
        
    }

    cancel(){
        this.props.history.push('/surv/studentlist');

    }
    render() {
      
        return (
           
            <div>
                <br></br>
                <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                
                                <h1 style={{textAlign:"center", fontWeight:'bold'}}>Rapport</h1>
                                
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
                                                value={this.state.Module}
                                                 onChange={change=>this.changeModuleHandler(change)}
                                                 options={this.state.ModuleOptions}
                                                 />
                                               <div className="hidden-error text-danger filiere" style={{display:"none"}}>
                                                    choisir le module.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> Le cas  </label>
                                            <Select 
                                                value={this.state.cas}
                                                 onChange={change=>this.changeLeCasHandler(change)}
                                                 options={this.state.CasOptions}
                                                 />
                                               <div className="hidden-error text-danger filiere" style={{display:"none"}}>
                                                    choisir le cas.
                                                </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> nom et prénom </label>
                                            <input placeholder="Full Name" name="nom et prénom" 
                                            className="form-control" type='text'
                                            onChange={this.changeStudentHandler}
                                            value={this.state.student}
                                            />
                                        </div>
                                        <div className = "form-group">
                                            <label> N° Apogee </label>
                                            <input onChange={this.changeNuApogeeHandler} value={this.state.nuApogee} placeholder="Entrer l'apogee" name="N° Apogee" className="form-control" type='text'/>
                                        </div>          
                                       <div className = "form-group">
                                            <label>Description</label>
                                            <textarea class="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} placeholder="Entrer la description"  style={{height: "100px"}}></textarea>
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