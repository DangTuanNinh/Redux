import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchListUser } from "../redux/user/user.slice";
import { useAppDispatch } from "../redux/hooks";

interface IUser {
  id: number;
  name: string;
  email: string;
}

function UserTable() {
  const [users, setUsers] = useState<IUser[]>([]);

  // const fetchUsers = async () => {
  //   const res = await fetch("http://localhost:8000/users");
  //   const data = await res.json();
  //   setUsers(data);
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  
  const dispatch= useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchListUser());
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;
