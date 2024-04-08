/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CCallout,
} from '@coreui/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import PropTypes from 'prop-types';
import db from '../../../firebase';

function ChatHistory({ studentContact }) {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchChatHistory = () => {
      const chatSessionsRef = collection(db, 'whatsappChats');
      console.log('Fetching chat history for student contact:', studentContact);

      const formattedStudentContact = studentContact.startsWith('0')
        ? `whatsapp:+94${studentContact.substring(1)}`
        : studentContact; 
      console.log('Formatted student contact:', formattedStudentContact);

      const q = query(chatSessionsRef, where('student_contact', '==', formattedStudentContact));
      console.log('Firestore query:', q);

      onSnapshot(q, (snapshot) => {
        const fetchedChatHistory = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log('Fetched chat history:', fetchedChatHistory);
        setChatHistory(fetchedChatHistory);
      });
    };

    fetchChatHistory();
  }, [studentContact]);

  console.log('Chat history state:', chatHistory);

  return (
    <CCard className="mb-4">
      <CCardHeader component="h5">Chat History</CCardHeader>
      <CCardBody>
        <CAccordion> 
          {chatHistory.map((session) => (
            <CAccordionItem key={session.id} itemKey={session.id}> {/* Unique itemKey for accordion */}
              <CAccordionHeader>
                {session.timeStamp && session.timeStamp.start && (
                  `Timestamp: ${session.timeStamp.start.date} ${session.timeStamp.start.time}`
                )}
              </CAccordionHeader>
              <CAccordionBody>
              {session.chats &&
                  Object.entries(session.chats).map(([key, chatObj]) => {
                    const isStudentMessage = chatObj.sender === 'student';

                    return (
                      <CCallout key={key} color={isStudentMessage ? 'secondary' : 'primary'}>
                        {chatObj.message}
                      </CCallout>
                    );
                  })}
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      </CCardBody>
    </CCard>
  );
}

ChatHistory.propTypes = {
  studentContact: PropTypes.string.isRequired,
};

export default ChatHistory;
