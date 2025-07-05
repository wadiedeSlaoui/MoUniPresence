import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

  const StudentList = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const mockStudents = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    code: `ST${String(i + 1).padStart(3, '0')}`,
    cne: `CNE${String(i + 1000).padStart(6, '0')}`,
    firstName: ['John', 'Jane', 'Mohamed', 'Anna', 'David', 'Sarah'][i % 6],
    lastName: ['Doe', 'Smith', 'Ali', 'Johnson', 'Williams', 'Brown'][i % 6],
    picture: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 10}.jpg`
  }));
  const [students, setStudents] = useState(mockStudents.map(student => ({
  ...student,
  present: false // default: absent
})));
const toggleAttendance = (id, isPresent) => {
  const updatedStudents = students.map(student =>
    student.id === id ? { ...student, present: isPresent } : student
  );
  setStudents(updatedStudents);
};
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('');



  // Sample data for TreeSelect options


  const filieres = [
    {
      key: 'filieres',
      label: 'Filières',
      children: [
        { key: 'cs', label: 'Computer Science' },
        { key: 'eng', label: 'Engineering' },
        { key: 'bus', label: 'Business' }
      ]
    }
  ];

  const modules = [
    {
      key: 'modules',
      label: 'Modules',
      children: [
        { key: 'math', label: 'Mathematics' },
        { key: 'phys', label: 'Physics' },
        { key: 'prog', label: 'Programming' }
      ]
    }
  ];
    const rooms = [
    {
      key: 'rooms',
      label: 'Rooms',
      children: [
        { key: 'room1', label: 'Room 101' },
        { key: 'room2', label: 'Room 102' },
        { key: 'room3', label: 'Room 103' }
      ]
    }
  ];


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


  const handleSubmitAttendance = () => {
    const presentStudents = students.filter(s => s.present);
    const absentStudents = students.filter(s => !s.present);
    console.log("Présents:", presentStudents);
    console.log("Absents:", absentStudents);
    setShowConfirmation(false); // Close dialog after submission
  };
  
  const confirmationDialogFooter = (
    <div>
      <Button 
        label="Non" 
        icon="pi pi-times" 
        onClick={() => setShowConfirmation(false)} 
        className="p-button-text" 
      />
      <Button 
        label="Oui" 
        icon="pi pi-check" 
        onClick={handleSubmitAttendance} 
        className="p-button-success" 
        autoFocus 
      />
    </div>
  );

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

const startToolbarTemplate = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      {/* Search input */}
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <i className="pi pi-search" style={{ marginRight: '0.5rem' }} />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name"
          style={{ padding: '0.5rem', borderRadius: '6px' }}
        />
      </span>
      <Button
        label="Enregistrer la présence"
        icon="pi pi-check"
        onClick={handleSubmitAttendance}
        style={{
          backgroundColor: '#074590',
          borderColor: '#074590',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.6rem 1rem',
          borderRadius: '6px'
        }}
      />
    </div>
  );
};

const leftToolbarTemplate = () => {
  // Sample options for dropdowns
  const roomOptions = [
    { label: 'Room 101', value: 'room1' },
    { label: 'Room 102', value: 'room2' },
    { label: 'Room 103', value: 'room3' }
  ];

  const filiereOptions = [
    { label: 'Computer Science', value: 'cs' },
    { label: 'Engineering', value: 'eng' },
    { label: 'Business', value: 'bus' }
  ];

  const moduleOptions = [
    { label: 'Mathematics', value: 'math' },
    { label: 'Physics', value: 'phys' },
    { label: 'Programming', value: 'prog' }
  ];

  return (
    <div className="flex align-items-center gap-3" style={{ flexWrap: 'wrap' }}>
      {/* Search Input */}
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name"
          style={{ width: '200px' }}
        />
      </span>

      {/* Room Dropdown */}
      <Dropdown
        value={selectedRoom}
        options={roomOptions}
        onChange={(e) => setSelectedRoom(e.value)}
        placeholder="Select Room"
        className="w-full md:w-14rem"
      />

      {/* Filière Dropdown */}
      <Dropdown
        value={selectedFiliere}
        options={filiereOptions}
        onChange={(e) => setSelectedFiliere(e.value)}
        placeholder="Select Filière"
        className="w-full md:w-14rem"
      />

      {/* Module Dropdown */}
      <Dropdown
        value={selectedModule}
        options={moduleOptions}
        onChange={(e) => setSelectedModule(e.value)}
        placeholder="Select Module"
        className="w-full md:w-14rem"
      />
    </div>
  );
};

  // Keep your existing rightToolbarTemplate
  const rightToolbarTemplate = () => (
    <Button
      label="Enregistrer la présence"
      icon="pi pi-check"
      className="p-button-success"
      onClick={() => setShowConfirmation(true)}
      style={{
        backgroundColor: "#074590",
        borderColor: "#074590",
        color: "white"
      }}
    />
  );

  return (
    <div className="card p-m-4">
      <Toolbar
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
        style={{ width: '100%', padding: '1rem', gap: '1rem' }}
      />
      
              <Dialog 
        visible={showConfirmation} 
        onHide={() => setShowConfirmation(false)}
        header="Confirmation"
        footer={confirmationDialogFooter}
        style={{ width: '350px' }}
        modal
      >
        <div className="flex align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Êtes-vous sûr de vouloir enregistrer la présence ?</span>
        </div>
      </Dialog>


        
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
          <Column
                header="Présent"
                body={(rowData) => (
                    <input
                    type="checkbox"
                    checked={rowData.present}
                    onChange={(e) => toggleAttendance(rowData.id, e.target.checked)}
                    />
                )}
                style={{ textAlign: 'center', width: '100px' }}
            />
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