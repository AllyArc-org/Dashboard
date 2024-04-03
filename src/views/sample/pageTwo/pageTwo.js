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

const PageTwo = () => {
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Questions List Group</CCardHeader>
          <CCardBody>
            <div>Hey</div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PageTwo
