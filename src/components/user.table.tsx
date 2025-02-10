import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchListUser } from "../redux/user/user.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import UserCreateModal from "./modal/user.create.modal";
import UserEditModal from "./modal/user.edit.modal";
import UserDeleteModal from "./modal/user.delete.modal";

function UserTable() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.user.listUser);

  useEffect(() => {
    dispatch(fetchListUser());
    toast("🦄 Wow so easy!");
  }, [dispatch]);

  const handleClick = () => {
    setIsOpenCreateModal(true);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsOpenUpdateModal(true);
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 10px",
        }}
      >
        <h2> Table Users</h2>
        <Button variant="primary" onClick={() => handleClick()}>
          Create User
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="warning"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <UserCreateModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />

      <UserEditModal
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        user={selectedUser}
      />

      <UserDeleteModal
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        user={selectedUser}
      />
    </>
  );
}

export default UserTable;
