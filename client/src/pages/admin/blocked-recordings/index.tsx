import { useContext } from "react";
import { observer } from "mobx-react";
import AdminRecordingsPage from "../recording";
import { AdminStorageContext } from "../../../services/admin";
import { PAGE_TYPE } from "./types";

const AdminNewRecordingsPage = observer((): JSX.Element => {
  const {
    blockRecordings,
    loadBlockRecordings,
  } = useContext(AdminStorageContext);

  return (
    <AdminRecordingsPage
      title="Blocked "
      param="blocked"
      page={PAGE_TYPE}
      recordings={blockRecordings}
      onLoad={loadBlockRecordings}
    />
  );
});

export default AdminNewRecordingsPage;
