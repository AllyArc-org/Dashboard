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
  CForm,
  CFormLabel,
  CFormTextarea,
  CButton,
  CRow,
  CCol,
} from '@coreui/react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import db from '../../../firebase';
import {  OpenAI } from 'openai';


function ChatHistory({ studentContact, studentGrade, studentName }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [feedbackInput, setFeedbackInput] = useState('');

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

  const handleFeedbackSubmit = async (e, session) => {
    e.preventDefault();
    if (feedbackInput.trim() !== '') {
      try {

  
        // Configure OpenAI API
        const openai = new OpenAI({
          apiKey: process.env.REACT_APP_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true
        });

        // OpenAI API call to format the feedback
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Format the following feedback as a system prompt for an AI model:\n\nFeedback: ${feedbackInput}\n\nFormatted Prompt:`,
            },
          ],
        });
  
        const formattedFeedback = completion.choices[0].message.content.trim();
        console.log('Formatted feedback:', formattedFeedback);
  
        const feedbackRef = collection(db, 'feedback');
        await addDoc(feedbackRef, {
          grade: studentGrade,
          name: studentName,
          contact: studentContact,
          feedback: formattedFeedback,
        });

  
        setFeedbackInput('');
      } catch (error) {
        console.error('Error adding feedback:', error);
      }
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader component="h5">Chat History</CCardHeader>
      <CCardBody>
        <CAccordion>
          {chatHistory.map((session) => (
            <CAccordionItem key={session.id} itemKey={session.id}>
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
                <CForm onSubmit={(e) => handleFeedbackSubmit(e, session)}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor={`inputFeedbackLabel-${session.id}`} className="col-sm-2 col-form-label">
                      Enter Feedback
                    </CFormLabel>
                    <CCol sm={10}>
                      <div className="d-flex align-items-center">
                        <CFormTextarea
                          id={`inputFeedbackTextArea-${session.id}`}
                          rows={3}
                          value={feedbackInput}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                        />
                        <CButton color="primary" type="submit" className="ms-2">
                          Submit
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
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
  studentGrade: PropTypes.string.isRequired,
  studentName: PropTypes.string.isRequired,
};

export default ChatHistory;