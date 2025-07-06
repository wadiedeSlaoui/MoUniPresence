import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import presenceService from 'services/presenceService';

  const StudentList = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [students, setStudents] = useState([]);
  useEffect(() => {
  console.log("👥 Students loaded:", students);
}, [students]);

 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('');

  const [filiereOptions, setfiliereOptions] = useState([]);
  const [moduleOptions, setmoduleOptions] = useState([]);
  const [roomOptions, setroomOptions] = useState([]);
//picture: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 10}.jpg`
  useEffect(() => {
  presenceService.listOfFiliere().then(res=>{
     const options = res.data.map(op => ({ label: op, value: op }));
        setfiliereOptions(options);
      },
      err=>{
          alert("error in getting filieres")
  });
  }, [])

  // Sample data for TreeSelect options

const [filteredStudents, setFilteredStudents] = useState([]);

const toggleAttendance = (student_code, checked) => {
  setFilteredStudents(prevStudents =>
    prevStudents.map(student =>
      student.student_code === student_code
        ? { ...student, present: checked }
        : student
    )
  );
};


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
    presenceService.submitStudentPresenceListByFilierAndModuleAndRoom(selectedModule,selectedFiliere,selectedRoom,filteredStudents).then(res=>{
      setSelectedRoom(null);
      setSelectedModule(null);
      setSelectedFiliere(null);
      setStudents([]);
      setFilteredStudents([]);
      presenceService.listOfFiliere().then(res=>{
      const options = res.data.map(op => ({ label: op, value: op }));
          setShowConfirmation(false);
          setfiliereOptions(options);
        },
        err=>{
            setShowConfirmation(false);
            alert("error in getting filieres")
       });
     
    },
  err=>{
    setShowConfirmation(false);
    alert("error when showing student list after submit presence");
  })
     // Close dialog after submission
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

const leftToolbarTemplate = () => {
  // Sample options for dropdowns
 
  const changeFilierHandler = (value) => {
    setSelectedFiliere(value);
     presenceService.listOfModuleByFilier(value).then(res=>{
          const options = res.data.map(op => ({ label: op, value: op }));
          setmoduleOptions(options);
        },
        err=>{
            alert("error in getting Modules")
        }
    );
  }
   const changeModuleHandler = (value) => {
    setSelectedModule(value)
     presenceService.listOfRoomByFilierAndModule(value,selectedFiliere).then(res=>{
          const options = res.data.map(op => ({ label: op, value: op }));
          setroomOptions(options);
        },
        err=>{
            alert("error in getting Modules")
        }
    );
  }
  const changeRoomHandler = (value)=>{
    setSelectedRoom(value);
    presenceService.listOfStudentByFilierAndModuleAndRoom(selectedModule,selectedFiliere,value)
    .then(res=>{
        const st = res.data.map((student, i) => ({
        ...student, // ✅ clone safely
        picture: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 10}.jpg`,
        present: false, // ensure default boolean
        
      }));
      setStudents(st);
      //   // Filter students based on search input
      const studentFF = st.filter(student => 
        student.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        student.lastName.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredStudents(studentFF);
        },
  err=>{
    alert("error when showing student list");
  })
  }
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

      {/* Filière Dropdown */}
      <Dropdown
        value={selectedFiliere}
        options={filiereOptions}
        onChange={(e) => changeFilierHandler(e.value)}
        placeholder="Select Filière"
        className="w-full md:w-14rem"
      />

      {/* Module Dropdown */}
      <Dropdown
        value={selectedModule}
        options={moduleOptions}
        onChange={(e) => changeModuleHandler(e.value)}
        placeholder="Select Module"
        className="w-full md:w-14rem"
      />
      {/* Room Dropdown */}
      <Dropdown
        value={selectedRoom}
        options={roomOptions}
        onChange={(e) => changeRoomHandler(e.value)}
        placeholder="Select Room"
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
          rowKey="student_code"
          emptyMessage="No students found"
        >
          <Column field="student_code" header="Student Code" style={{ minWidth: '120px' }}></Column>
          <Column field="cne" header="CNE" style={{ minWidth: '120px' }}></Column>
          <Column field="firstName" header="First Name" style={{ minWidth: '120px' }}></Column>
          <Column field="lastName" header="Last Name" style={{ minWidth: '120px' }}></Column>
          <Column header="Photo" body={imageBodyTemplate} style={{ minWidth: '80px' }}></Column>
          <Column
                header="Présent"
                body={(rowData) => (
                    <Checkbox
                     checked={!!rowData.present}
                     onChange={(e) => toggleAttendance(rowData.student_code, e.checked)}
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