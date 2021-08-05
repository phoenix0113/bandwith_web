import { useContext } from "react";
import { observer } from "mobx-react";
import AdminRecordingsPage from "../recording";
import { AdminStorageContext } from "../../../services/admin";
import { PAGE_TYPE } from "./types";

const AdminNewRecordingsPage = observer((): JSX.Element => {
  const {
    availableRecordings,
    loadAvailableRecordings,
  } = useContext(AdminStorageContext);

  return (
    <AdminRecordingsPage
      title="Available "
      param="available"
      page={PAGE_TYPE}
      recordings={availableRecordings}
      onLoad={loadAvailableRecordings}
    />
  );
});

export default AdminNewRecordingsPage;
