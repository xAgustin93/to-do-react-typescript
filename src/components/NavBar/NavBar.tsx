import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { PropsTypes } from "./NavBar.types";

export function NavBar(props: PropsTypes) {
  const { openCloseModal } = props;

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>TaskManager</Navbar.Brand>
        <Nav>
          <Button onClick={openCloseModal}>Crear tarea</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
