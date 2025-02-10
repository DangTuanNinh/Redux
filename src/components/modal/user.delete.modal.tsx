import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteAUser,
  resetDelete,
  resetUpdate,
} from "../../redux/user/user.slice";
import { toast } from "react-toastify";

const UserDeleteModal = (prop: any) => {
  const { isOpenDeleteModal, setIsOpenDeleteModal, user } = prop;
  console.log(">>Check user:", user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const isDeleteSuccess = useAppSelector((state) => state.user.isDeleteSuccess);

  useEffect(() => {
    if (isDeleteSuccess === true) {
      setIsOpenDeleteModal(false);
      setEmail("");
      setName("");
      toast("🦄 Wow so easy!");
      dispatch(resetDelete());
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    console.log(">>Check create: ", email, name);
    dispatch(deleteAUser({ email, name, id: user.id }));
  };

  return (
    <>
      <Modal
        show={isOpenDeleteModal}
        onHide={() => setIsOpenDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Delete the user: {user?.email}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setIsOpenDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDeleteModal;
