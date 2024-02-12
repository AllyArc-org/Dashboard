import { collection, setDoc, doc, getDocs } from 'firebase/firestore'
import db from '../../../firebase'
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormSelect,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
} from '@coreui/react'

function AddStudentPage() {
  const [insertName, setInsertName] = useState('')
  const [insertContact, setInsertContact] = useState('')
  const [insertGrade, setInsertGrade] = useState('')
  const [insertCaregiverContact, setInsertCaregiverContact] = useState('')
  const [insertCaregiverEmail, setInsertCaregiverEmail] = useState('')
  // this is the insert method
  const insertRecord = async () => {
    console.log('Insert record')
    const getStudentSize = await getDocs(collection(db, 'student'))
    const studentRef = collection(db, 'student')
    let studentListSize = getStudentSize.size + 1
    await setDoc(doc(studentRef, `${studentListSize}`), {
      name: insertName,
      contact: insertContact,
      grade: insertGrade.replace(/\D/g, ''),
      careGiverContact: insertCaregiverContact,
      careGiverEmail: insertCaregiverEmail,
      helpRequestCount: {
        logicalHelp: '0',
        visualHelp: '0',
      },
      skill: {
        creativity: '0',
        logical: '0',
        time: '0',
        visual: '0',
      },
    })

    // clearing all the fields after backend implementation
    setInsertName('')
    setInsertContact('')
    setInsertGrade('')
    setInsertCaregiverContact('')
    setInsertCaregiverEmail('')
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity()) {
      insertRecord()
    }
    setValidated(true)
  }
  return (
    <>
      <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Student Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertName}
                    onChange={(e) => setInsertName(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Student Contact Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertContact}
                    onChange={(e) => setInsertContact(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom04" id="measurement">
                    Class
                  </CFormLabel>
                  <CFormSelect
                    id="validationCustom04"
                    value={insertGrade}
                    onChange={(e) => setInsertGrade(e.target.value)}
                  >
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid Class.</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Caregiver Contact Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertCaregiverContact}
                    onChange={(e) => setInsertCaregiverContact(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Caregiver Email Address</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertCaregiverEmail}
                    onChange={(e) => setInsertCaregiverEmail(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  {' '}
                  <br />
                  <CButton color="secondary" className="text-high-emphasis float-end" type="submit">
                    ADD STUDENT
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddStudentPage
