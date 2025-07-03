import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

const UserList = () => {
  const mockUsers = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? 'admin' : 'user',
    firstName: ['John', 'Jane', 'Ali', 'Sara', 'Omar'][i % 5],
    lastName: ['Doe', 'Smith', 'Ali', 'Brown', 'Johnson'][i % 5],
    email: `user${i + 1}@example.com`,
    password: `pass${i + 1}`
  }));

  const [users, setUsers] = useState(mockUsers);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase());

    const matchesType =
      filterType === 'all' || user.type === filterType;

    return matchesSearch && matchesType;
  });

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

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setDialogVisible(true);
  };

  const handleSave = () => {
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    setDialogVisible(false);
  };

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm p-button-warning" onClick={() => handleEdit(rowData)}
      style={{ backgroundColor: '#074590', borderColor: '#074590', color: 'white' }} />
      <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(rowData.id)}
      style={{ backgroundColor: 'white', borderColor: '#8B0000', color: '#8B0000' }} />
    </div>
  );

  return (
    <div className="card p-4">
      <Toolbar className="mb-4" left={leftToolbarTemplate} />

      <DataTable value={filteredUsers} emptyMessage="No users found">
        <Column field="type" header="Type" style={{ minWidth: '100px' }} />
        <Column field="firstName" header="First Name" style={{ minWidth: '120px' }} />
        <Column field="lastName" header="Last Name" style={{ minWidth: '120px' }} />
        <Column field="email" header="Email" style={{ minWidth: '200px' }} />
        <Column field="password" header="Password" style={{ minWidth: '150px' }} />
        <Column header="Actions" body={actionTemplate} style={{ minWidth: '150px' }} />
      </DataTable>

      <Dialog header="Edit User" visible={dialogVisible} style={{ width: '450px' }} modal onHide={() => setDialogVisible(false)}>
        {editingUser && (
          <div className="p-fluid">
            <div className="field">
              <label>Type</label>
              <Dropdown
                value={editingUser.type}
                options={['admin', 'user']}
                onChange={(e) => setEditingUser({ ...editingUser, type: e.value })}
                placeholder="Select Type"
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
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <InputText
                value={editingUser.password}
                type="password"
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              />
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
    </div>
  );
};

export default UserList;
