import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import RapportService from 'services/RapportService';

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {

    RapportService.getAll().then(res=>{
        res.data = res.data.map(rep=>{
          rep.dateGeneration = new Date(rep.dateGeneration).toLocaleDateString("fr-FR")
        return rep;
    })
        setReports(res.data);
    })
   
  }, []);

  return (
    <div className="card p-4">
      <h3 className="mb-4">Liste des Rapports</h3>
      <DataTable value={reports} emptyMessage="Aucun rapport disponible">
        <Column field="surveillant" header="Surveillant" />
        <Column field="filiere" header="Filière" />
        <Column field="module" header="Module" />
        <Column field="leCas" header="Cas" />
        <Column field="studentFullName" header="Nom & Prénom" />
        <Column field="nuApogee" header="N° Apogée" />
        <Column field="description" header="Description" />
        <Column field="dateGeneration" header="dateGeneration" />
      </DataTable>
    </div>
  );
};

export default ReportList;
