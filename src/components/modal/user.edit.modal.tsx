import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetUpdate, updateAUser } from "../../redux/user/user.slice";
import { toast } from "react-toastify";

const UserEditModal = (prop: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, user } = prop;
  console.log(">>Check user:", user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const isUpdateSuccess = useAppSelector((state) => state.user.isUpdateSuccess);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setName(user.name || "");
    }

    if (isUpdateSuccess === true) {
      setIsOpenUpdateModal(false);
      setEmail("");
      setName("");
      toast("🦄 Wow so easy!");
      dispatch(resetUpdate());
    }
  }, [isUpdateSuccess, user]);

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    console.log(">>Check create: ", email, name);
    dispatch(updateAUser({ email, name, id: user.id }));
  };

  return (
    <>
      <Modal
        show={isOpenUpdateModal}
        onHide={() => setIsOpenUpdateModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
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
          <Button variant="warning" onClick={() => setIsOpenUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEditModal;
