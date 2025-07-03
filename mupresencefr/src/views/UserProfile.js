import React from "react";

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

function User() {
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
                         aria-label="Sélectionner le type"
                         defaultValue="" // Optional: Set a default selected option
                        >
                          <option value="" disabled hidden>Sélectionner le type</option>
                          <option value="admin">Admin</option>
                          <option value="user">Surveillant</option>
                          
                       </Form.Select>
                      </Form.Group>
                     </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Nom</label>
                        <Form.Control
                          placeholder="saisr le nom"
                          type="text"
                        ></Form.Control>
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
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Address email</label>
                        <Form.Control
                          placeholder="Saisir l'email"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Mot de passe</label>
                        <Form.Control
                          placeholder="Saisir le mot de passe"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
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
