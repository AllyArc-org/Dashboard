import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CRow, CWidgetStatsC, CCardTitle } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilNoteAdd, cilPeople, cilWc, cilSpreadsheet } from '@coreui/icons'
import { collection, query, onSnapshot } from 'firebase/firestore'
import db from '../../firebase'

const Dashboard = () => {
  const [student, setStudent] = useState([
    {
      careContact: '1',
      careMail: '1',
      contact: '1',
      grade: '1',
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'student')), (studentSnapshot2) => {
        const studentInfoTable = []
        studentSnapshot2.forEach((studentDoc) => {
          var studentInfo = studentDoc.data()
          studentInfoTable.push({
            careContact: studentInfo.careContact,
            careMail: studentInfo.careMail,
            contact: studentInfo.contact,
            grade: studentInfo.grade,
          })
        })
        setStudent(studentInfoTable)
      }),
    [],
  )
  const [question, setQuestion] = useState([
    {
      class: '6',
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
        const questionInfoTable = []
        questionSnapshot2.forEach((questionDoc) => {
          var questionInfo = questionDoc.data()
          questionInfoTable.push({
            class: questionInfo.class,
            topic: questionInfo.topic,
            count: questionInfo.count,
            date: questionInfo.date,
            decription: questionInfo.description,
            modelAnswer: questionInfo.modelAnswer,
            question: questionInfo.question,
            score: questionInfo.score,
          })
        })
        setQuestion(questionInfoTable)
      }),
    [],
  )
  const widgetValues = {
    question: question.length,
    student: student.length,
  }
  return (
    <CRow>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3"
          icon={<CIcon icon={cilPeople} height={36} />}
          progress={{ value: 50 }}
          text="Widget helper text"
          title="Students"
          value={widgetValues.student}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3"
          icon={<CIcon icon={cilWc} height={36} />}
          color="primary"
          inverse
          progress={{ value: 50 }}
          text="Widget helper text"
          title="Classes"
          value="3"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3"
          icon={<CIcon icon={cilNoteAdd} height={36} />}
          progress={{ value: 50 }}
          text="Widget helper text"
          title="Questions"
          value={widgetValues.question}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsC
          className="mb-3"
          icon={<CIcon icon={cilSpreadsheet} height={36} />}
          color="primary"
          inverse
          progress={{ value: 50 }}
          text="Widget helper text"
          title="Topics"
          value={widgetValues.question}
        />
      </CCol>
      <CCol xs={{ cols: 2 }} md={{ cols: 2 }}>
        <CCard>
          <CCardBody>
            <CCardTitle>Question Count</CCardTitle>
            <CChart
              type="bar"
              data={{
                labels: question.map((question) => question.topic),
                datasets: [
                  {
                    label: 'Topics',
                    data: question.map((question) => question.count),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                    ],
                    borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)',
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={{ cols: 2 }} md={{ cols: 2 }}>
        <CCard>
          <CCardBody>
            <CCardTitle>Average Screen Time</CCardTitle>
            <CChart
              type="line"
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ],
                datasets: [
                  {
                    label: '6th Grade',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: [40, 44, 50, 39, 66, 56, 59, 78, 70, 64, 73, 78],
                  },
                  {
                    label: '7th Grade',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [63, 71, 69, 64, 73, 78, 59, 70, 60, 52, 40, 35],
                  },
                  {
                    label: '8th Grade',
                    backgroundColor: 'rgba(100, 60, 205, 0.2)',
                    borderColor: 'rgba(100, 60, 205, 1)',
                    pointBackgroundColor: 'rgba(100, 60, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [60, 52, 40, 35, 54, 51, 29, 60, 55, 50, 39, 66],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        {' '}
        <br />
        <Link to="/student/addStudent">
          <CButton color="primary" className="float-end" size="sm">
            Add Student
          </CButton>
        </Link>{' '}
        <Link to="/question/addCustomQuestion">
          <CButton color="primary" size="sm">
            Add Question
          </CButton>
        </Link>
      </CCol>
    </CRow>
  )
}

export default Dashboard
