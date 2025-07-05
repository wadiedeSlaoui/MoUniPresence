import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Listepresence = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('filiere');
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  const surveillants = [
    { name: 'Ahmed Fassi', code: 'AF' },
    { name: 'Zineb Ouardi', code: 'ZO' },
    { name: 'Mohamed Alami', code: 'MA' },
    { name: 'Fatima Zahra', code: 'FZ' },
    { name: '', code: 'UNASSIGNED' }
  ];

  const searchFields = [
    { label: 'Filière', value: 'filiere' },
    { label: 'Module', value: 'module' },
    { label: 'Lieu', value: 'lieu' },
    { label: 'Surveillant', value: 'surveillant.name' }
  ];

  // Define handleRowClick before using it
  const handleRowClick = (event) => {
    setSelectedSession(event.data);
    setDialogVisible(true);
  };

  const renderPresenceSummary = (rowData) => {
    const presentCount = rowData.students.filter(s => s.present).length;
    return (
      <div>
        <span className="text-green-500">Présents: {presentCount}</span>
        <span className="ml-2 text-red-500">Absents: {rowData.students.length - presentCount}</span>
      </div>
    );
  };

  const onSurveillantChange = (rowData, value) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === rowData.id) {
        return { ...session, surveillant: value };
      }
      return session;
    });
    setSessions(updatedSessions);
  };

  const surveillantBodyTemplate = (rowData) => {
    return (
      <Dropdown
        value={rowData.surveillant}
        options={surveillants}
        onChange={(e) => onSurveillantChange(rowData, e.value)}
        optionLabel="name"
        placeholder="Select Surveillant"
        style={{ width: '100%' }}
        filter
        showClear
      />
    );
  };

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        filiere: 'Informatique',
        module: 'Programmation',
        lieu: 'Salle A12',
        surveillant: surveillants[0],
        students: [
          { id: 1, name: 'Khalid Amrani', apogee: '2023123456', present: true },
          { id: 2, name: 'Fatima Zahra', apogee: '2023123457', present: false }
        ]
      },
      {
        id: 2,
        filiere: 'Génie Civil',
        module: 'Physique',
        lieu: 'Salle B05',
        surveillant: null,
        students: [
          { id: 3, name: 'Youssef Benali', apogee: '2023876544', present: true }
        ]
      }
    ];
    setSessions(mockData);
    setFilteredSessions(mockData);
  }, []);

  useEffect(() => {
    const filtered = sessions.filter(session => {
      const fieldValue = searchField === 'surveillant.name' 
        ? session.surveillant?.name?.toLowerCase() || ''
        : session[searchField]?.toLowerCase() || '';
      
      const matchesSearch = fieldValue.includes(searchTerm.toLowerCase());
      const matchesUnassigned = showUnassignedOnly 
        ? !session.surveillant || session.surveillant.name === '' 
        : true;
      
      return matchesSearch && matchesUnassigned;
    });
    setFilteredSessions(filtered);
  }, [searchTerm, searchField, showUnassignedOnly, sessions]);

  return (
    <div className="card p-4">
      <h3 className="mb-4">Liste des Présences</h3>
      
      <div className="flex flex-wrap align-items-center gap-3 mb-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-search" />
          </span>
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
          />
          <Dropdown
            value={searchField}
            options={searchFields}
            onChange={(e) => setSearchField(e.value)}
            optionLabel="label"
            style={{ width: '12rem' }}
          />
        </div>
        
        <div className="flex align-items-center">
          <Checkbox
            inputId="unassignedOnly"
            checked={showUnassignedOnly}
            onChange={(e) => setShowUnassignedOnly(e.checked)}
          />
          <label htmlFor="unassignedOnly" className="ml-2">
            Afficher seulement les non-assignés
          </label>
        </div>
      </div>
      
      <DataTable
        value={filteredSessions}
        emptyMessage="Aucune séance disponible"
        onRowClick={handleRowClick}
        selectionMode="single"
        rowHover
      >
        <Column field="filiere" header="Filière" />
        <Column field="module" header="Module" />
        <Column field="lieu" header="Lieu" />
        <Column header="Surveillant" body={surveillantBodyTemplate} />
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
              <h4>Surveillant: {selectedSession.surveillant?.name || 'Non assigné'}</h4>
              <p>Filière: {selectedSession.filiere} | Lieu: {selectedSession.lieu}</p>
            </div>
            
            <DataTable value={selectedSession.students}>
              <Column field="name" header="Nom" />
              <Column field="apogee" header="Apogée" />
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

export default Listepresence;