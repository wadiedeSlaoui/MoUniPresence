import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        surveillant: 'Ahmed Fassi',
        filiere: 'Informatique',
        module: 'Programmation',
        cas: "Cas de tricherie",
        fullName: "Khalid Amrani",
        apogee: "2023123456",
        description: "L'étudiant utilisait un téléphone."
      },
      {
        id: 2,
        surveillant: 'Zineb Ouardi',
        filiere: 'Génie Civil',
        module: 'Physique',
        cas: "Étudiant non inscrit",
        fullName: "Samira Lahlou",
        apogee: "2023876543",
        description: "L'étudiant ne figure pas dans la liste."
      }
    ];

    setReports(mockReports);
  }, []);

  return (
    <div className="card p-4">
      <h3 className="mb-4">Liste des Rapports</h3>
      <DataTable value={reports} emptyMessage="Aucun rapport disponible">
        <Column field="surveillant" header="Surveillant" />
        <Column field="filiere" header="Filière" />
        <Column field="module" header="Module" />
        <Column field="cas" header="Cas" />
        <Column field="fullName" header="Nom & Prénom" />
        <Column field="apogee" header="N° Apogée" />
        <Column field="description" header="Description" />
      </DataTable>
    </div>
  );
};

export default ReportList;
