import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Button, Card, Container, Table, Spinner, Alert, Tab, Tabs } from "react-bootstrap";
import "style/dashboard.css";
import importDataExService from "services/importDataExService";

function Dashboard() {
  const [extractedData, setExtractedData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState({
    university: "",
    place: "",
    city: "",
    description: "",
    filiere: "",
    modules: [],
    moduleIds : []
  });
  const [activeTab, setActiveTab] = useState("all");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setExtractedData(null);
    setError(null);
    setFileInfo({
      university: "",
      place: "",
      city: "",
      description: "",
      filiere: "",
      modules: [],
      moduleIds:[]
    });

    try {
      const data = await readFile(file);
      await processExcelData(data);
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err.message || 'Error processing file');
    } finally {
      setIsLoading(false);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(new Uint8Array(e.target.result));
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const processExcelData = (data) => {
    return new Promise((resolve) => {
      const workbook = XLSX.read(data, { type: 'array' });
      
      if (workbook.SheetNames.length === 0) {
        throw new Error('No sheets found in the workbook');
      }

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        raw: true
      });

      if (jsonData.length < 8) {
        throw new Error('File must have at least 8 rows (info rows + header + data)');
      }

      const moduleNames = jsonData[5].slice(4, -3);
      const moduleIds = jsonData[6].slice(4, -3);
      const info = {
        university: jsonData[0][0] || "",
        place: jsonData[1][0] || "",
        city: jsonData[2][0] || "",
        description: jsonData[3][0] || "",
        filiere: jsonData[4][0].replace("Parcours: ","") || "",
        modules: moduleNames,
        moduleIds:moduleIds
      };
      setFileInfo(info);

      const dataRows = jsonData.slice(7); 

      const processedData = dataRows.map((row) => {
        const student = {
          COD_ETU: row[0] || '',
          massarCode: row[1] || '',
          lastName: row[2] || '',
          firstName: row[3] || '',
          modules: {},
          room: row[row.length - 3] || '',
          placeNumber: row[row.length - 2] || ''
        };

        moduleNames.forEach((moduleName, index) => {
          const columnIndex = 4 + index;
          if (moduleName && row[columnIndex] !== undefined) {
            student.modules[moduleName] = row[columnIndex];
          }
        });

        return student;
      });

      setExtractedData(processedData);
      resolve();
    });
  };

  const getStudentsByModule = (moduleName) => {
    return extractedData.filter(student => 
      student.modules[moduleName] !== undefined || student.modules[moduleName] !== 'V' 
    );
  };

  const sendImportedData = () => {
    if (!extractedData) return;
    
    const dataToExport = {
      filiere:fileInfo.filiere,
      year:fileInfo.description.slice(-9),
      session:fileInfo.description.includes("rattrapage") ? "rattrapage" : "normal",
      modules: fileInfo.modules.map( (x, i) =>{
        return {"moduleName": x, "moduleId": fileInfo.moduleIds[i],students : extractedData.filter(student => 
            student.COD_ETU !== undefined && student.COD_ETU !== '' && student.modules[x] !== "V"
      )}})
    };
    importDataExService.ImportDataEx(dataToExport).then(res=>{
      alert("saving data complete succefully");
    }, 
    err =>{
      alert("error when saving data");
    })
    console.log(dataToExport)
  };

  return (
    <Container fluid className="py-4">
      <h1>Extracteur de données d'examen des étudiants</h1>
      <p className="mb-4">
        Cliquez sur le bouton pour sélectionner et extraire les données d’examen des étudiants à partir d’un fichier Excel.
      </p>
      
      <div className="d-flex gap-3 mb-4">
        <Button 
          variant="primary" 
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Traitement...
            </>
          ) : (
            'Sélectionner et extraire les données des étudiants'
          )}
        </Button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".xlsx, .xls, .csv"
          style={{ display: 'none' }}
        />
        
        {extractedData && (
          <Button variant="success" onClick={sendImportedData}>
            Télécharger les listes de modules
          </Button>
        )}
      </div>
      
      {fileName && (
        <Alert variant="info" className="mb-3">
          Fichier sélectionné: <strong>{fileName}</strong>
          {extractedData && (
            <span className="ms-2">
              ({extractedData.length} dossiers des étudiants extraits)
            </span>
          )}
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      
      {fileInfo.university && (
        <Card className="mb-3">
          <Card.Header>Informations sur le fichier</Card.Header>
          <Card.Body>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Université</th>
                  <td>{fileInfo.university}</td>
                </tr>
                <tr>
                  <th>Lieu</th>
                  <td>{fileInfo.place}</td>
                </tr>
                <tr>
                  <th>Ville</th>
                  <td>{fileInfo.city}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{fileInfo.description}</td>
                </tr>
                <tr>
                  <th>Filiere</th>
                  <td>{fileInfo.filiere}</td>
                </tr>
                <tr>
                  <th>Modules</th>
                  <td>{fileInfo.modules.join(', ')}</td>
                </tr>
                <tr>
                  <th>Modules ID's</th>
                  <td>{fileInfo.moduleIds.join(', ')}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      
      {extractedData && (
        <Card>
          <Card.Body>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="all" title="All Students">
                <div className="table-responsive mt-3">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Code d'étudiants</th>
                        <th>Code Massar</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        {fileInfo.modules.map((module, i) => (
                          <th key={i}>{module}</th>
                        ))}
                        <th>Salle</th>
                        <th>Lieu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extractedData.slice(0, 100).map((student, index) => (
                        <tr key={index}>
                          <td>{student.COD_ETU}</td>
                          <td>{student.massarCode}</td>
                          <td>{student.lastName}</td>
                          <td>{student.firstName}</td>
                          {fileInfo.modules.map((module, i) => (
                            <td key={i}>{student.modules[module] || '-'}</td>
                          ))}
                          <td>{student.room}</td>
                          <td>{student.placeNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Tab>
              
              {fileInfo.modules.map((module) => (
                <Tab key={module} eventKey={module} title={module}>
                  <div className="table-responsive mt-3">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Code d'étudiant</th>
                          <th>Massar Code</th>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Grade</th>
                          <th>Salle</th>
                          <th>Lieu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getStudentsByModule(module).map((student, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.COD_ETU}</td>
                            <td>{student.massarCode}</td>
                            <td>{student.lastName}</td>
                            <td>{student.firstName}</td>
                            <td>{student.modules[module]}</td>
                            <td>{student.room}</td>
                            <td>{student.placeNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
              ))}
            </Tabs>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Dashboard;