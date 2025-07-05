import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import 'ListExam/ListExam.css'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import UserService from 'services/UserService';
import presenceService from 'services/presenceService';

const ListExam = () => {
  const [exams, setExams] = useState([]);
  const [surveillants, setSurveillants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('room');
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  // Mock data on component mount
  useEffect(() => {
    // Simulated list of exams

    presenceService.presenceList().then(res=>{

      setExams(res.data);

    },err=>{
      alert("error in getting surveillance")
    });

    UserService.getSurveillant().then(res=>{

      setSurveillants(res.data.map(surv => {return {label: surv.firstName + " " + surv.lastName, value: surv.username}}));

    },err=>{
      alert("error in getting surveillance")
    });

  }, []);

  const onSurveillantChange = (rowData, value) => {
    const updatedRow = { ...rowData, survaillant: value };

  presenceService.updateSurv(updatedRow).then(res => {
    setExams(prevExams =>
      prevExams.map(exam =>
        exam.room === updatedRow.room && exam.filiere === updatedRow.filiere && exam.module === updatedRow.module ? updatedRow : exam
      )
    );
  }, err => {
    alert("error in UPDATE surveillance");
  });

  };
const surveillantTemplate = (rowData) => (
  <Dropdown
    value={rowData.survaillant}
    options={surveillants}
    onChange={(e) => {
      onSurveillantChange(rowData, e.value)
    }
    }
    placeholder="Choisir"
    className="w-full"
    filter 
    showClear 
    optionLabel="label" 
  />
);



  const filteredExams = exams.filter((exam) => {
    const fieldValue = exam[searchField]?.toLowerCase() || '';
    const matchesSearch = fieldValue.includes(searchTerm.toLowerCase());
    const matchesUnassigned = showUnassignedOnly ? exam.survaillant === '' || exam.survaillant == undefined || exam.survaillant == null : true;

    return matchesSearch && matchesUnassigned;
  });

  const searchFieldsOptions = [
    { label: 'Salle', value: 'room' },
    { label: 'Module', value: 'module' },
    { label: 'Filière', value: 'filiere' }
  ];

  return (
    <div className="card p-4">
      <h3 className="mb-3">Liste des Examens</h3>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3" style={{ columnGap: '1rem', rowGap: '0.5rem' }}>
        <div style={{ minWidth: '150px' }}>
            <Dropdown
            value={searchField}
            options={searchFieldsOptions}
            onChange={(e) => setSearchField(e.value)}
            placeholder="Filtrer par"
            className="w-100"
            />
        </div>
        <div style={{ minWidth: '220px' }}>
            <span className="p-input-icon-left w-100">
            <i className="pi pi-search" />
            <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Rechercher par ${searchFieldsOptions.find(opt => opt.value === searchField)?.label}`}
                className="w-100"
            />
            </span>
        </div>
        <div className="d-flex align-items-center">
            <Checkbox
            inputId="unassigned"
            checked={showUnassignedOnly}
            onChange={(e) => setShowUnassignedOnly(e.checked)}
            />
            <label htmlFor="unassigned" className="ml-2 text-muted" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap',paddingLeft:'7px',paddingTop:'7px' }}>
            Seulement sans surveillant
            </label>
        </div>
      </div>

      <DataTable value={filteredExams} emptyMessage="Aucun examen trouvé">
        <Column field="filiere" header="Filière" style={{ minWidth: '150px' }} />
        <Column field="module" header="Module" style={{ minWidth: '150px' }} />
        <Column field="room" header="Salle" style={{ minWidth: '120px' }} />
        <Column header="Surveillant" body={surveillantTemplate} style={{ minWidth: '180px' }} />
      </DataTable>
    </div>
  );
};

export default ListExam;
