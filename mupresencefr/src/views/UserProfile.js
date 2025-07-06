import React from "react";
import AuthServices from "services/AuthServices";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  InputGroup
} from "react-bootstrap";
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function User() {
  const [role, setRole] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({}); // Add error state

  const validateForm = () => {
    const newErrors = {};
    if (!role) newErrors.role = "Veuillez sélectionner un rôle";
    if (!lastName) newErrors.lastName = "Veuillez saisir un nom";
    if (!firstName) newErrors.firstName = "Veuillez saisir un prénom";
    if (!username) newErrors.username = "Veuillez saisir un nom d'utilisateur";
    if (!mail) newErrors.mail = "Veuillez saisir un email";
    if (!password) newErrors.password = "Veuillez saisir un mot de passe";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newUser = {
      role,
      firstName,
      lastName,
      username,
      mail,
      password
    };
    
    setLoading(true);
    AuthServices.register(newUser).then(res => {
      setLoading(false);
      alert("La création de l'utilisateur est complète");   
      setRole('');
      setLastName('');
      setFirstName('');
      setUsername('');
      setMail('');
      setPassword('');
      setErrors({});
    }, error => {
      setLoading(false);
      alert("Erreur lors de la création de l'utilisateur");   
    });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="9">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Ajouter un utilisateur</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Type d'utilisateur</label>
                        <Form.Select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          isInvalid={!!errors.role}
                        >
                          <option value="" disabled hidden>Sélectionner le type</option>
                          <option value="ROLE_ADMIN">Admin</option>
                          <option value="ROLE_SURVEILLANT">Surveillant</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.role}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Nom</label>
                        <Form.Control
                          placeholder="saisir le nom"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Prénom</label>
                        <Form.Control
                          placeholder="saisir le prénom"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>User name</label>
                        <Form.Control
                          placeholder="Saisir User name"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Address email</label>
                        <Form.Control
                          placeholder="Saisir l'email"
                          type="email"
                          value={mail}
                          onChange={(e) => setMail(e.target.value)}
                          isInvalid={!!errors.mail}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.mail}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Form.Control
                            placeholder="Saisir le mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!errors.password}
                            style={{ flex: 1 }} // Takes remaining space
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ 
                              marginLeft: '10px',
                              height: '38px', 
                              width: '42px', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <span style={{ fontSize: '1rem' }}>  {/* Increased icon size */}
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleSubmit}
                  >
                    Créer
                  </Button>                 
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}export default User;
