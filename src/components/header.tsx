import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppSelector } from "../redux/hooks";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function Header() {
  const users = useAppSelector((state) => state.user.listUser);
  const [mode, setMode] = useState("light");

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">Header {users.length}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form>
            <Form.Check
              value={mode}
              onChange={(e) =>
                setMode(e.target.value === "light" ? "dark" : "light")
              }
              type="switch"
              id="custom-switch"
              label={
                mode === "light" ? (
                  <Navbar.Text>Light mode</Navbar.Text>
                ) : (
                  <Navbar.Text>Dark mode</Navbar.Text>
                )
              }
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
