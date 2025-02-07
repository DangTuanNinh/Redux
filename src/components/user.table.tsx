import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchListUser } from "../redux/user/user.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import UserCreateModal from "./modal/user.create.modal";

function UserTable() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  // const fetchUsers = async () => {
  //   const res = await fetch("http://localhost:8000/users");
  //   const data = await res.json();
  //   setUsers(data);
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.user.listUser);

  useEffect(() => {
    dispatch(fetchListUser());
    toast("🦄 Wow so easy!");
  }, [dispatch]);

  const handleClick = () => {
    setIsOpenCreateModal(true);
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
                  <Button variant="warning" style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
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
    </>
  );
}

export default UserTable;
