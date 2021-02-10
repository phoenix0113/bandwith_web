import { useState, useEffect, useContext } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { toJS } from "mobx";
import { BottomNavigationComponent } from "../../components/BottomNavigation";
import {
  NavigationBar, CenterItem, PageWrapper, LeftItem, RightItem, COLORS,
} from "../../components/styled";
import { ContactAccountComponent } from "./ContactAccount";

import testProfileImg from "../../assets/images/call/default_profile_image.png";

import {
  Contact, ContactContent, ContactListWrapper,
  ContactNumber, ContentBody, ContentHeader, ContactImage,
} from "./styled";
import { showErrorNotification } from "../../utils/notification";

import { OutgoingCallStorage } from "../../services/outgoingCall";
import { GlobalStorageContext, ContactItemWithStatus } from "../../services/global";
import { UserStatus } from "../../shared/socket";

const getContactNumber = (index: number) => `0${index + 1}`.slice(-2);

const getColor = (status: UserStatus): string => {
  switch (status) {
    case "online":
      return COLORS.ALTERNATIVE;
    case "offline":
      return COLORS.GREY;
    case "busy":
      return COLORS.ORANGE;
    default:
      return COLORS.GREY;
  }
};

const ContactsPage = observer((): JSX.Element => {
  const {
    logout, contacts, fetchUserContacts, profile, removeContact,
  } = useContext(GlobalStorageContext);

  console.log(toJS(contacts));

  useEffect(() => {
    if (profile) {
      // Update contacts in global storage
      fetchUserContacts();
    }
  }, [profile]);

  const [contactViewer, setContactViewer] = useState<ContactItemWithStatus>(null);

  const closeViewer = () => {
    setContactViewer(null);
  };

  const handleContactClick = (contact: ContactItemWithStatus) => {
    setContactViewer(contact);
  };

  const deleteContact = async (_id: string) => {
    try {
      if (await removeContact(_id)) {
        closeViewer();
      }
    } catch (err) {
      showErrorNotification(err.message);
    }
  };

  const callContact = (_id: string) => {
    OutgoingCallStorage.makeCall(_id);
    closeViewer();
  };

  if (contactViewer) {
    return (
      <ContactAccountComponent
        _id={contactViewer._id}
        imageUrl={contactViewer.imageUrl}
        name={contactViewer.name}
        status={contactViewer.status}
        deleteHandler={deleteContact}
        callHandler={callContact}
        closeHandler={closeViewer}
      />
    );
  }

  return (
    <PageWrapper background={COLORS.MAIN_LIGHT}>
      <NavigationBar>
        <LeftItem />
        <CenterItem>My Contacts</CenterItem>
        <RightItem>
          <LogoutOutlined onClick={logout} />
        </RightItem>
      </NavigationBar>
      <ContactListWrapper>
        {!!contacts?.length && contacts.map((contact, index) => (
          <Contact onClick={() => handleContactClick(contact)} key={contact._id}>
            <ContactNumber>{getContactNumber(index)}</ContactNumber>
            <ContactImage alt="Logo" src={contact.imageUrl || testProfileImg} />
            <ContactContent>
              <ContentHeader>{contact.name}</ContentHeader>
              <ContentBody color={getColor(contact.status)}>
                {contact.status}
              </ContentBody>
            </ContactContent>
          </Contact>
        ))}
      </ContactListWrapper>
      <BottomNavigationComponent />
    </PageWrapper>
  );
});

export default ContactsPage;
