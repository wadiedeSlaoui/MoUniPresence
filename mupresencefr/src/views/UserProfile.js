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

function User() {
  const [role, setRole] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
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

  AuthServices.register(newUser).then(res=>{
      alert("la création de l'utilisateur est complete");   
      setRole('');
      setLastName('');
      setFirstName('');
      setUsername('');
      setMail('');
      setPassword('');
  },
  error=>{
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



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
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
                        
                        <label>Mot de passe</label>
                        <Form.Control
                          placeholder="Saisir le mot de passe"
                          type="password"
                          value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
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
