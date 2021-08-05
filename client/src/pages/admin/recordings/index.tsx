import { useContext, useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Input, Spin } from "antd";
import { Utils } from "avcore/client";
import { AdminStorageContext } from "../../../services/admin";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminRecording from "../../../components/Admin/AdminRecording";
import { GetRecordResponse } from "../../../shared/interfaces";
import { InputIconWrapper, LoaderWrapper } from "../../../components/styled";
import {
  AdminPageWrapper, AdminPageContent, AdminContentWrapper, AdminRecordingContent,
  AdminRecordingContentTitle, AdminScrollContent, RecordingContentWrapper, AdminSearch,
} from "../styled";
import feedIcon from "../../../assets/images/home/feed.svg";

interface IProps {
  title: string,
  param: string,
  page: string,
  recordings: Array<GetRecordResponse>,
  onLoad: () => void;
}

const { Search } = Input;

const AdminRecordingsPage = observer(({
  title, param, page, recordings, onLoad,
}: IProps): JSX.Element => {
  const {
    onLoaded,
    updateRecordingStatus,
    deleteRecording,
    setSearchRecordingsKey,
  } = useContext(AdminStorageContext);

  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const changeRecordingStatus = async (id: string, status: string) => {
    if (window.confirm(`Are you sure you wish to ${status} this call recording?`)) {
      setLoading(true);
      await updateRecordingStatus(id, status, param);
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you wish to delete this call recording?")) {
      setLoading(true);
      await deleteRecording(id, param);
      setLoading(false);
    }
  };

  const onSearch = async () => {
    setLoading(true);
    await setSearchRecordingsKey(searchKey, param);
    setLoading(false);
  };

  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    setScrollTop(scrollRef.current.scrollTop);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const createdObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrollTop(scrollRef.current.scrollTop);
          } else if (Utils.isSafari) {
            console.log(`For some reason, entry is not intersecting. May need a new method. Scrolling from ${entry.target.id} to the bottom`);
          }
        });
      }, { threshold: 0.8, root: scrollRef.current });
    }
  }, [scrollRef]);

  useEffect(() => {
    if (scrollTop + scrollRef.current.offsetHeight === heightRef.current.offsetHeight) {
      onLoad();
    }
  }, [scrollTop]);

  useEffect(() => {
    setSearchRecordingsKey("", param);
  }, []);

  return (
    <AdminPageWrapper>
      {
        (!loading || !onLoaded) ? (
          <>
            <AdminHeader />
            <AdminPageContent>
              <AdminSideBar pageType={page} />
              <AdminContentWrapper>
                <AdminRecordingContent>
                  <AdminRecordingContentTitle>
                    {title}
                    Call Recordings
                  </AdminRecordingContentTitle>
                  <AdminSearch>
                    <Input
                      placeholder="Search"
                      value={searchKey}
                      suffix={(
                        <InputIconWrapper className="cursor-pointer" onClick={onSearch}>
                          <img src={feedIcon} alt="Search" />
                        </InputIconWrapper>
                      )}
                      onChange={(e) => setSearchKey(e.target.value)}
                      autoFocus
                    />
                  </AdminSearch>
                  <AdminScrollContent
                    className="scrollbar-content"
                    ref={scrollRef}
                    onScroll={onScroll}
                  >
                    <RecordingContentWrapper ref={heightRef}>
                      {
                        recordings.map((item) => (
                          <AdminRecording
                            recording={item}
                            changeRecordingStatus={changeRecordingStatus}
                            onDelete={onDelete}
                            key={item._id}
                          />
                        ))
                      }
                    </RecordingContentWrapper>
                  </AdminScrollContent>
                </AdminRecordingContent>
              </AdminContentWrapper>
            </AdminPageContent>
          </>
        ) : (
          <LoaderWrapper>
            <Spin size="large" />
          </LoaderWrapper>
        )
      }
    </AdminPageWrapper>
  );
});

export default AdminRecordingsPage;
