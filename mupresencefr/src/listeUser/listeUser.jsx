import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import UserService from 'services/UserService';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import '../listeUser/listeUser.css'
import { useEffect } from 'react';
import Loading from '../components/Loading';



const UserList = () => {
    const [loading, setLoading] = React.useState(false);
React.useEffect(() => {
    setLoading(true);
  UserService.getetUsers()
    .then((res) => {
        setLoading(false);
      setUsers(res.data.map(user => {
        user.role = user.role.replace("ROLE_","");
        return user;
      }));
    })
    .catch((err) => {
        setLoading(false);
      console.error("Erreur lors du chargement des utilisateurs", err);
    });
}, []);

  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');
  const [editingUser, setEditingUser] = React.useState(null);
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const filteredUsers = users;
//   .filter(user => {
//     const matchesSearch =
//       user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
//       user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
//       user.email.toLowerCase().includes(filter.toLowerCase());

//     const matchesType =
//       filterType === 'all' || user.type === filterType;

//     return matchesSearch && matchesType;
//   });

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-3 align-items-center">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name or email"
        />
      </span>

      <div className="flex gap-1 ml-4">
        <Button
          label="All"
          className={filterType === 'all' ? 'p-button-primary' : 'p-button-text'}
          onClick={() => setFilterType('all')}
          style={{ backgroundColor: '#074590', borderColor: '#074590', color: 'white' }} 
        />
        <Button
          label="Admins"
          className={filterType === 'admin' ? 'p-button-primary' : 'p-button-text'}
          onClick={() => setFilterType('admin')}
          style={{ backgroundColor: '#074590', borderColor: '#074590', color: 'white' }} 
        />
        <Button
          label="Users"
          className={filterType === 'user' ? 'aoa p-button-primary' : 'p-button-text' } 
          onClick={() => setFilterType('user')}
          style={{ backgroundColor: '#074590', borderColor: '#074590', color: 'white' }} 
        />
      </div>
    </div>
  );

const handleDelete = (username) => {
  confirmDialog({
    message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Oui',
    rejectLabel: 'Non',
    acceptClassName: 'p-button-danger',
    accept: () => {
      UserService.deleteUser(username)
        .then(() => {
          setUsers(users.filter(user => user.username !== username));
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression :", err);
          alert("Erreur de suppression !");
        });
    }
  });
};


  const handleEdit = (user) => {
    user.password = ''
    setEditingUser({ ...user });
    setDialogVisible(true);
  };

const handleSave = () => {
  const updatedUser = {
    ...editingUser,
    role: `ROLE_${editingUser.role.toUpperCase()}` // convert back
  };

  UserService.updateUser(editingUser.username, updatedUser)
    .then((res) => {
      setUsers(users.map(user => user.username === res.data.username ? {
        ...res.data,
        role: res.data.role.replace('ROLE_', '')
      } : user));
      setDialogVisible(false);
    })
    .catch((err) => {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Erreur lors de l'enregistrement !");
    });
};


  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" onClick={() => handleEdit(rowData)}
      style={{ backgroundColor: '#074590', borderColor: '#074590', color: 'white' }} />
      <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(rowData.username)}
      style={{ backgroundColor: 'white', borderColor: '#8B0000', color: '#8B0000' }} />
    </div>
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="card p-4">
      <Toolbar className="mb-4" left={leftToolbarTemplate} />

      <DataTable value={filteredUsers} emptyMessage="No users found">
        <Column field="role" header="Type" style={{ minWidth: '100px' }} />
        <Column field="firstName" header="First Name" style={{ minWidth: '120px' }} />
        <Column field="lastName" header="Last Name" style={{ minWidth: '120px' }} />
        <Column field="username" header="Username" style={{ minWidth: '120px' }} />
                <Column field="mail" header="Email" style={{ minWidth: '200px' }} />
        <Column header="Actions" body={actionTemplate} style={{ minWidth: '150px' }} />
      </DataTable>

      <Dialog header="Edit User" visible={dialogVisible} style={{ width: '450px' }} modal onHide={() => setDialogVisible(false)}>
        {editingUser && (
          <div className="p-fluid">
            <div className="field">
              <label>Type</label>
              <Dropdown
                value={editingUser.role}
                options={['admin', 'surveillant']}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.value })}
                placeholder="Select Type"
              />
            </div>
            <div className="field">
              <label>Username</label>
              <InputText
                value={editingUser.username}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                disabled
              />
              </div>
            <div className="field">
              <label>First Name</label>
              <InputText
                value={editingUser.firstName}
                onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <InputText
                value={editingUser.lastName}
                onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <InputText
                value={editingUser.mail}
                onChange={(e) => setEditingUser({ ...editingUser, mail: e.target.value })}
              />
            </div>
            <div className="field">
            <label htmlFor="password">Password</label>
            <div className="p-inputgroup">
                <InputText
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={editingUser.password}
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                />
                <span className="p-inputgroup-addon" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(prev => !prev)}>
                <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}></i>
                </span>
            </div>
            </div>
            <div className="flex justify-content-end mt-4">
              <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setDialogVisible(false)}
               style={{ backgroundColor: '#f5f5f5', borderColor: '#8a8a8a', color: '#8a8a8a' }} />
              <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={handleSave} autoFocus
              style={{ backgroundColor: '#074590', borderColor: '#074590', color: 'white' }} 
               />
            </div>
          </div>
        )}
      </Dialog>
      <ConfirmDialog />
    </div>
  );
};

export default UserList;
