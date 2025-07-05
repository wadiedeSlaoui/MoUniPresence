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
  Col
} from "react-bootstrap";
import { error } from "jquery";
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import {   InputGroup } from 'react-bootstrap';
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
  const handleSubmit = async (e) => {

  e.preventDefault();

  const newUser = {
    role,
    firstName,
    lastName,
    username,
    mail,
    password
  };
  setLoading(true)
  AuthServices.register(newUser).then(res=>{
      setLoading(false)
      alert("la création de l'utilisateur est complete");   
      setRole('');
      setLastName('');
      setFirstName('');
      setUsername('');
      setMail('');
      setPassword('');
  },
  error=>{
     setLoading(false)
     alert("Erreur lors de la création de l'utilisateur");   
  }
)
  }
//   try {
//     await axios.post('http://localhost:8080/api/users', newUser);
//     alert("Utilisateur créé avec succès !");
//     // Clear form if needed:
//     setRole('');
//     setLastName('');
//     setFirstName('');
//     setUsername('');
//     setMail('');
//     setPassword('');
//   } catch (err) {
//     console.error(err);
//     alert("Erreur lors de la création de l'utilisateur");
//   }
// };



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
                         >
                         <option value="" disabled hidden>Sélectionner le type</option>
                         <option value="ROLE_ADMIN">Admin</option>
                         <option value="ROLE_USER">Surveillant</option>
                         </Form.Select>
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
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>
                          Prénom
                        </label>
                        <Form.Control
                          placeholder="saisir le prénom"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
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
                          />
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
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                      <Col md="12">
                        <Form.Group>
                          <Form.Label>Mot de passe</Form.Label>
                          <InputGroup>
                            <Form.Control
                              placeholder="Saisir le mot de passe"
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputGroup.Text
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ cursor: 'pointer',
                                       top: '50%',
                                       transform: 'translateY(-50%)',
                                       right: '0.75rem',
                                       position: 'absolute',
                                       color: '#6b7280' /* Optional: gray-500 for example */                                 
                                     }}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroup.Text>
                          </InputGroup>
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
}

export default User;
