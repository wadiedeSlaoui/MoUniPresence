import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ListExam = () => {
  const [exams, setExams] = useState([]);
  const [surveillants, setSurveillants] = useState([]);

  // Mock data on component mount
  useEffect(() => {
    // Simulated list of exams
    const mockExams = [
      { id: 1, room: 'Salle A', module: 'Mathématiques', filiere: 'Informatique', surveillant: '' },
      { id: 2, room: 'Salle B', module: 'Physique', filiere: 'Génie Civil', surveillant: '' },
      { id: 3, room: 'Salle C', module: 'Programmation', filiere: 'Informatique', surveillant: '' }
    ];

    // Simulated list of surveillants
    const mockSurveillants = [
      { label: 'Ahmed Fassi', value: 'ahmed' },
      { label: 'Zineb Ouardi', value: 'zineb' },
      { label: 'Tariq Naji', value: 'tariq' }
    ];

    setExams(mockExams);
    setSurveillants(mockSurveillants);
  }, []);

  const onSurveillantChange = (rowData, value) => {
    const updated = exams.map(exam =>
      exam.id === rowData.id ? { ...exam, surveillant: value } : exam
    );
    setExams(updated);
  };
const surveillantTemplate = (rowData) => (
  <Dropdown
    value={rowData.surveillant}
    options={surveillants}
    onChange={(e) => onSurveillantChange(rowData, e.value)}
    placeholder="Choisir"
    className="w-full"
    filter 
    showClear 
    optionLabel="label" 
  />
);
  return (
    <div className="card p-4">
      <h3 className="mb-4">Liste des Examens</h3>
      <DataTable value={exams} emptyMessage="Aucun examen trouvé">
        <Column field="room" header="Salle" style={{ minWidth: '120px' }} />
        <Column field="module" header="Module" style={{ minWidth: '150px' }} />
        <Column field="filiere" header="Filière" style={{ minWidth: '150px' }} />
        <Column header="Surveillant" body={surveillantTemplate} style={{ minWidth: '180px' }} />
      </DataTable>
    </div>
  );
};

export default ListExam;
