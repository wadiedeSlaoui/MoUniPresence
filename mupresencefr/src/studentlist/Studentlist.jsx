import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const StudentList = () => {
  const mockStudents = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    code: `ST${String(i + 1).padStart(3, '0')}`,
    cne: `CNE${String(i + 1000).padStart(6, '0')}`,
    firstName: ['John', 'Jane', 'Mohamed', 'Anna', 'David', 'Sarah'][i % 6],
    lastName: ['Doe', 'Smith', 'Ali', 'Johnson', 'Williams', 'Brown'][i % 6],
    picture: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 10}.jpg`
  }));

  const [students] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('');

  // Filter students based on search input
  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    student.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  const imageBodyTemplate = (rowData) => {
    return (
      <img 
        src={rowData.picture} 
        alt={`${rowData.firstName} ${rowData.lastName}`}
        className="student-image p-shadow-2"
        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }}
        onClick={() => {
          setSelectedStudent(rowData);
          setZoomLevel(1);
          setVisible(true);
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
        }}
      />
    );
  };

  const footerContent = (
    <div>
      <Button 
        icon="pi pi-search-minus" 
        className="p-button-rounded p-button-text" 
        onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
        tooltip="Zoom Out"
      />
      <Button 
        icon="pi pi-search-plus" 
        className="p-button-rounded p-button-text" 
        onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
        tooltip="Zoom In"
      />
      <Button 
        label="Reset" 
        icon="pi pi-refresh" 
        className="p-button-rounded p-button-text" 
        onClick={() => setZoomLevel(1)}
        tooltip="Reset Zoom"
      />
    </div>
  );

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by name"
          />
        </span>
      </div>
    );
  };

  return (
    <div className="card p-m-4">
      <Toolbar className="mb-4" left={leftToolbarTemplate} />

      <div style={{ maxHeight: '100vh', overflow: 'auto' }}>
        <DataTable 
          value={filteredStudents}
          //scrollable 
          //scrollHeight="flex"
          virtualScrollerOptions={{ itemSize: 5 }}
          emptyMessage="No students found"
        >
          <Column field="code" header="Student Code" style={{ minWidth: '120px' }}></Column>
          <Column field="cne" header="CNE" style={{ minWidth: '120px' }}></Column>
          <Column field="firstName" header="First Name" style={{ minWidth: '120px' }}></Column>
          <Column field="lastName" header="Last Name" style={{ minWidth: '120px' }}></Column>
          <Column header="Photo" body={imageBodyTemplate} style={{ minWidth: '80px' }}></Column>
        </DataTable>
      </div>

      <Dialog 
        header={`${selectedStudent?.firstName} ${selectedStudent?.lastName}`} 
        visible={visible} 
        style={{ width: '80vw' }} 
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="flex justify-content-center">
          <img 
            src={selectedStudent?.picture} 
            alt={`${selectedStudent?.firstName} ${selectedStudent?.lastName}`}
            style={{
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.3s ease',
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
            }}
          />
        </div>
        <div className="p-mt-2 p-text-center">
          <p><strong>Code:</strong> {selectedStudent?.code}</p>
          <p><strong>CNE:</strong> {selectedStudent?.cne}</p>
        </div>
      </Dialog>
      <p>Total students: {filteredStudents.length}</p>
    </div>
  );
};

export default StudentList;