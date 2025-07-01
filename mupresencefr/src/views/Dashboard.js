import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Button, Card, Container, Table, Spinner, Alert } from "react-bootstrap";
import "style/dashboard.css";

function Dashboard() {
  const [extractedData, setExtractedData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);
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
    setHeaders([]);
    setError(null);

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
      
      // Convert entire sheet to JSON with headers
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,  // Get raw array of arrays
        defval: "", // Empty string for empty cells
        raw: true   // Get raw values
      });

      if (jsonData.length < 2) {
        throw new Error('File must have at least 2 rows (header row + data)');
      }

      // SKIP FIRST ROW COMPLETELY (index 0)
      // Use second row (index 1) as headers
      const extractedHeaders = jsonData[2].map(h => h || ''); // Ensure no undefined headers
      
      // Start data from third row (index 2)
      const dataRows = jsonData.slice(3); 

      const processedData = dataRows.map((row, rowIndex) => {
        const obj = {};
        extractedHeaders.forEach((header, colIndex) => {
          obj[header] = row[colIndex] !== undefined ? row[colIndex] : '';
        });
        return obj;
      });

      setHeaders(extractedHeaders);
      setExtractedData(processedData);
      resolve();
    });
  };

  const downloadJson = () => {
    if (!extractedData) return;
    
    const dataToExport = {
      sheetName: fileName.replace(/\.[^/.]+$/, ""),
      headers: headers,
      data: extractedData
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace(/\.[^/.]+$/, "")}_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
   
    <Container fluid className="py-4">
      <h1>Excel Data Extractor</h1>
      <p className="mb-4">
        Click the button to select and extract data from an Excel file.
        <br />
        <small className="text-muted">
          (Skips first row completely, uses second row as headers, data starts from third row)
        </small>
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
              Processing...
            </>
          ) : (
            'Select & Extract Excel File'
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
          <Button variant="success" onClick={downloadJson}>
            Download as JSON
          </Button>
        )}
      </div>
      
      {fileName && (
        <Alert variant="info" className="mb-3">
          Selected file: <strong>{fileName}</strong>
          {extractedData && (
            <span className="ms-2">
              ({extractedData.length} records extracted)
            </span>
          )}
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      
      <Card className="mt-3">
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover className="mb-0">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header || `Column ${index + 1}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                { isLoading ? (
                      <tr>
                        <td colSpan={headers.length || 1} className="text-center py-4">
                          <Spinner animation="border" />
                          <p className="mt-2 mb-0">Processing file...</p>
                        </td>
                      </tr>
                    ) : extractedData ? (
                      extractedData.length > 0 ? (
                        <>
                          {   extractedData.slice(0, 100).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {headers.map((header, colIndex) => (
                                <td key={colIndex}>
                                  {typeof row[header] === 'object' 
                                    ? JSON.stringify(row[header])
                                    : row[header]}
                                </td>
                              ))}
                            </tr>
                           ))
                        }
                          {extractedData.length > 100 && (
                            <tr>
                              <td colSpan={headers.length} className="text-center text-muted py-2">
                                Showing first 100 of {extractedData.length} records
                              </td>
                            </tr>
                          )}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={headers.length} className="text-center text-muted py-4">
                            No data rows found after header
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={headers.length || 1} className="text-center text-muted py-4">
                          {headers.length ? "Data will appear here after extraction" : "No file selected"}
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
     </>
  );
}

export default Dashboard;