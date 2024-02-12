import { collection, query, onSnapshot } from 'firebase/firestore'
import db from '../../../firebase'
import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { CCard, CCardHeader, CCardBody, CCol, CRow } from '@coreui/react'

const ViewQuestionsPage = () => {
  const [answer, setAnswer] = useState([
    {
      description: 'This question is from the topic of chemistry and elements.',
      count: 1,
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'answer')), (answerSnapshot2) => {
        var answerInfoTable = []
        answerSnapshot2.forEach((answerDoc) => {
          var answerInfo = answerDoc.data()
          answerInfoTable.push({
            grade: answerInfo.student.grade,
            count: answerInfo.question.count,
            answer: answerInfo.answer,
            modelAnswer: answerInfo.question.modelAnswer,
            question: answerInfo.question.question,
            topic: answerInfo.question.topic,
            description: answerInfo.question.description,
            date: answerInfo.timeline.start.date,
            name: answerInfo.student.name,
            studentScore: answerInfo.score,
            orgScore: answerInfo.question.score,
            startTime: answerInfo.timeline.start.time,
            endTime: answerInfo.timeline.start.time,
          })
        })
        answerInfoTable = answerInfoTable.sort((a, b) => a.count - b.count) // sort by count
        setAnswer(answerInfoTable)
      }),
    [],
  )
  const [question, setQuestion] = useState([
    {
      grade: '6',
      topic: 'PS',
      count: 1,
      date: '27/02/2023',
      description: 'This question is from the topic of chemistry and elements.',
      modelAnswer: 'Au',
      question: 'What is the chemical symbol for gold?',
      score: '10',
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'question')), (questionSnapshot2) => {
        var questionInfoTable = []
        questionSnapshot2.forEach((questionDoc) => {
          var questionInfo = questionDoc.data()
          questionInfoTable.push({
            grade: questionInfo.grade,
            topic: questionInfo.topic,
            count: parseInt(questionInfo.count),
            date: questionInfo.date,
            description: questionInfo.description,
            modelAnswer: questionInfo.modelAnswer,
            question: questionInfo.question,
          })
        })
        questionInfoTable = questionInfoTable.sort((a, b) => a.count - b.count) // sort by count
        setQuestion(questionInfoTable)
      }),
    [],
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Questions List Group</CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Detail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Question</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Answer</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Recent Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {answer.map((ans, index) => (
                  <CTableRow v-for="ques in tableItems" key={index}>
                    <CTableHeaderCell scope="row">
                      <CAvatar
                        size="md"
                        src={`https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=${ans.count}`}
                      >
                        <div>{ans.count}</div>
                      </CAvatar>
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <div>{ans.topic} </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CAccordion flush>
                        <CAccordionItem itemKey={1}>
                          <CAccordionHeader>Question Detail</CAccordionHeader>
                          <CAccordionBody>
                            <p>
                              <b>Details of Question {ans.count}:</b>
                            </p>{' '}
                            <p>Question Number: {ans.count}</p>
                            <p>Grade: {ans.grade}</p>
                            <p>Question: {ans.question}</p>
                            <p>Description: {ans.description}</p>
                            <p>Model Answer: {ans.modelAnswer}</p>
                          </CAccordionBody>
                        </CAccordionItem>
                      </CAccordion>
                    </CTableDataCell>
                    <CTableDataCell>
                      <>
                        <CAccordion flush>
                          <CAccordionItem>
                            <CAccordionHeader>Answer Detail</CAccordionHeader>
                            <CAccordionBody key={index}>
                              <p>
                                <b>Answer for Question {ans.count}:</b>
                              </p>
                              <p>Name: {ans.name}</p>
                              <p>Student Answer: {ans.answer}</p>
                              <p>Student Grade: {ans.grade}</p>
                              <p>
                                Score: {ans.studentScore}/{ans.orgScore}
                              </p>
                              <p>Attempt Date: {ans.date}</p>
                              <p>Attempt Time: {ans.startTime}</p>
                            </CAccordionBody>
                          </CAccordionItem>
                        </CAccordion>
                      </>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        {ans.date} | {ans.endTime}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewQuestionsPage
