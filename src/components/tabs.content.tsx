import Nav from "react-bootstrap/Nav";
import UserTable from "./user.table";
import { Tab, Tabs } from "react-bootstrap";

function TabsContent() {
  return (
    <Tabs
      defaultActiveKey="user"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="user" title="Users">
        <UserTable />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
}

export default TabsContent;
