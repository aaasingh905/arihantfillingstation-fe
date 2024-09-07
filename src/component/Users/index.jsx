import React, { useState } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";

function UsersLayout() {
  const [userAdded, setUserAdded] = useState(false);
  return (
    <>
      <AddUser refetch={userAdded} setRefetch={setUserAdded} />
      <UserList refetch={userAdded} setRefetch={setUserAdded} />
    </>
  );
}

export default UsersLayout;
