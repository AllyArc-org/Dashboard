import CIcon from '@coreui/icons-react'
import { cilPeople, cilGraph } from '@coreui/icons'
import { CChartPie } from '@coreui/react-chartjs'
import React from 'react'
import { CButton, CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import { useParams } from 'react-router-dom'
import ChatHistory from './ChatHistory'

function StudentSinglePage() {
  const handleClick = () => {
    console.log('Download IEP Report')
  }
  const handleClickAgain = () => {
    console.log('Send IEP Report')
  }
  const {
    id,
    grade,
    name,
    contact,
    careGiverEmail,
    careGiverContact,
    creativity,
    logical,
    time,
    visual,
  } = useParams()
  return (
    <>
      <CRow>
        {/* Use a single row to contain all columns */}
        <CCol xs={12} md={6}>
          {/* 1/3 width on medium+ screens */}
          <CCard className="mb-4">
            <CCardHeader component="h5" className="p-3">
              <span className="p-3">
                <CIcon icon={cilPeople} size="xxl" />
              </span>
              <span className="h3">Student Details</span>

              <p className="float-end h4 p-2">ID : {id}</p>
            </CCardHeader>
            <CCardBody style={{ fontSize: '1.2rem' }}>
              <div className="p-3">
                Student Name: <span className="float-end sm">{name}</span>
              </div>
              <div className="p-3">
                Student Contact Number: <span className="float-end">{contact}</span>
              </div>
              <div className="p-3">
                Grade: <span className="float-end">{grade}</span>
              </div>
              <div className="p-3">
                Caregiver Contact Number: <span className="float-end">{careGiverContact}</span>
              </div>
              <div className="p-3">
                Caregiver Email Address: <span className="float-end">{careGiverEmail}</span>
              </div>
              <CCol xs={12}>
                <br />
                <div className="p-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    size="md"
                    button={'value'.toString()}
                    onClick={handleClick}
                  >
                    Download IEP Report
                  </CButton>
                  <CButton
                    color="primary"
                    variant="outline"
                    size="md"
                    button={'value'.toString()}
                    onClick={handleClickAgain()}
                    className="float-end"
                    href="https://docs.google.com/document/d/1lPQbrwrYlk6wM2pHv4KEZ3IFPoellNoZWJ0HZ9kZ2N4/edit?usp=sharing"
                    as="a"
                  >
                    Create IEP Report
                  </CButton>
                </div>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader component="h5" className="p-3">
              <span className="p-3">
                <CIcon icon={cilGraph} size="xxl" />
              </span>
              <span className="h3">Progress of Student Skills</span>
            </CCardHeader>
            <CCardBody>
              <CChartPie
                width={700}
                height={500}
                className="p-2"
                data={{
                  labels: ['Creativity', 'Time management', 'Logical Skills', 'Visual Skills'],
                  datasets: [
                    {
                      backgroundColor: ['#ffc107', '#6610f2', '#00D8FF', '#DD1B16'],
                      data: [
                        parseInt(creativity),
                        parseInt(time),
                        parseInt(logical),
                        parseInt(visual),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          {/* 2/3 width on medium+ screens */}
          <ChatHistory studentContact={contact} studentGrade={grade} studentName={name} />
        </CCol>
      </CRow>
    </>
  )
}

export default StudentSinglePage
