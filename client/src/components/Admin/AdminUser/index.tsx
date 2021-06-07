import React, { useState, useEffect } from "react";
import { AdminUserDiv, AdminUserProfile, AdminUserName } from "./styled";

interface Data {
  id: string;
  photo: string;
  name: string;
}

const AdminUser = (props:Data):JSX.Element => {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setID(props.id);
    setName(props.name);
    setPhoto(props.photo);
  }, [props]);
  return (
    <AdminUserDiv id={id}>
      <AdminUserProfile src={photo} alt="Profile" />
      <AdminUserName>
        {name}
      </AdminUserName>
    </AdminUserDiv>
  );
};

export default AdminUser;
