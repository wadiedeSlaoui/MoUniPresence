import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'ListExam/ListExam.css'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import UserService from 'services/UserService';
import presenceService from 'services/presenceService';

const ListExam = () => {
  const [exams, setExams] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [surveillants, setSurveillants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('room');
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
   const [dialogVisible, setDialogVisible] = useState(false);

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
const surveillantTemplate = (rowData) => {
   if (rowData.submitted) {
    // Find the label from the surveillants list
    const selected = surveillants.find(s => s.value === rowData.survaillant);
    return <span>{selected?.label || '-'}</span>;
  }

  return (
    <Dropdown
      value={rowData.survaillant}
      options={surveillants}
      onChange={(e) => onSurveillantChange(rowData, e.value)}
      placeholder="Choisir"
      className="w-full"
      filter
      showClear
      optionLabel="label"
    />
  );
};
const handleRowClick = (event) => {
  // Check if the exam is submitted
  if (event.data.submitted) {
    setSelectedSession(event.data);
    presenceService.listOfStudentByFilierAndModuleAndRoomSubmitted(
      event.data.module,
      event.data.filiere,
      event.data.room,
      event.data.survaillant
    ).then(res => {
      setStudentsList(res.data);
    }, err => {
      alert("error when downloading list of students");
    });
    setDialogVisible(true);
  }
};
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
        <DataTable 
        value={filteredExams} 
        emptyMessage="Aucun examen trouvé"  
        onRowClick={handleRowClick}
        selectionMode="single"
        rowHover
        rowClassName={(rowData) => rowData.submitted ? 'clickable-row' : 'non-clickable-row'}
        >

        <Column field="filiere" header="Filière" style={{ minWidth: '150px' }} />
        <Column field="module" header="Module" style={{ minWidth: '150px' }} />
        <Column field="room" header="Salle" style={{ minWidth: '120px' }} />
        <Column header="Surveillant" body={surveillantTemplate} style={{ minWidth: '180px' }} />
      </DataTable>
      <Dialog
            header={`Détails - ${selectedSession?.module || ''}`}
            visible={dialogVisible}
            style={{ width: '50vw' }}
            onHide={() => setDialogVisible(false)}
            footer={
              <Button
                label="Fermer"
                icon="pi pi-times"
                onClick={() => setDialogVisible(false)}
                className="p-button-text"
              />
            }
        > 
          {selectedSession && (
                <div>
                  <div className="mb-4">
                    <h4>Surveillant: {surveillants.filter(suv=> suv.value == selectedSession.survaillant).map(res=> res.label)[0] || 'Non assigné'}</h4>
                    <p>Filière: {selectedSession.filiere} | Lieu: {selectedSession.room}</p>
                  </div>
                  
                  <DataTable value={studentsList}>
                    <Column field="lastName" header="Nom" />
                    <Column field="firstName" header="Prenom" />
                    <Column field="student_code" header="Apogée" />
                    <Column
                      header="Statut"
                      body={(rowData) => (
                        <i className={`pi ${rowData.present ? 'pi-check-circle text-green-500' : 'pi-times-circle text-red-500'}`} />
                      )}
                    />
                  </DataTable>
                </div>
              )}
      </Dialog>
    </div>
  );
};

export default ListExam;
 