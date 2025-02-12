import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { changeMode } from "../redux/app/app.slice";

function Header() {
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("data-bs-theme", mode);
    }
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">Header</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form>
            <Form.Check
              defaultChecked={mode === "light" ? false : true}
              onChange={(e) => {
                console.log(">>Check e: ", e);
                dispatch(
                  changeMode(e.target.checked === true ? "dark" : "light")
                );
              }}
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
