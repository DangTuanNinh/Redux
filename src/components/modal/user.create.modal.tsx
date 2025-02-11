import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewUser, resetCreate } from "../../redux/user/user.slice";
import { toast } from "react-toastify";

const UserCreateModal = (prop: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = prop;
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);

  useEffect(() => {
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      toast("🦄 Wow so easy!");
      dispatch(resetCreate());
    }
  }, [isCreateSuccess]);

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    console.log(">>Check create: ", email, name);
    dispatch(createNewUser({ email, name }));
  };

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        onHide={() => setIsOpenCreateModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setIsOpenCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCreateModal;
