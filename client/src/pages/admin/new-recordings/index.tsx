import { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import AdminRecordingsPage from "../recordings";
import { AdminStorageContext } from "../../../services/admin";
import { PAGE_TYPE } from "./types";

const AdminNewRecordingsPage = observer((): JSX.Element => {
  const {
    newRecordings,
    loadNewRecordings,
  } = useContext(AdminStorageContext);

  return (
    <AdminRecordingsPage
      title="New "
      param="new"
      page={PAGE_TYPE}
      recordings={newRecordings}
      onLoad={loadNewRecordings}
    />
  );
});

export default AdminNewRecordingsPage;
