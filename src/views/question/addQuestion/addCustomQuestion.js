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
  CFormTextarea,
} from '@coreui/react'

function AddCustomQuestionPage() {
  const [insertGrade, setInsertGrade] = useState('')
  const [insertTopic, setInsertTopic] = useState('')
  const [insertQuestion, setInsertQuestion] = useState('')
  const [insertDescription, setInsertDescription] = useState('')
  const [insertModelAnswer, setInsertModelAnswer] = useState('')
  const [insertScore, setInsertScore] = useState('')
  // this is the insert method
  const insertRecord = async () => {
    console.log('Insert record')
    var currentdate = new Date()
    var question_date = `${currentdate.getDate()}/${
      currentdate.getMonth() + 1
    }/${currentdate.getFullYear()}`

    const getQuestionSize = await getDocs(collection(db, 'question'))
    const questionRef = collection(db, 'question')
    let questionSize = getQuestionSize.size + 1
    await setDoc(doc(questionRef, `${questionSize}`), {
      count: questionSize.toString(),
      grade: insertGrade.replace(/\D/g, ''),
      topic: insertTopic,
      question: insertQuestion,
      description: insertDescription,
      modelAnswer: insertModelAnswer,
      score: insertScore,
      date: question_date,
    })

    // clearing all the fields after backend implementation
    setInsertGrade('')
    setInsertTopic('')
    setInsertQuestion('')
    setInsertDescription('')
    setInsertModelAnswer('')
    setInsertScore('')
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
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom04" id="grade">
                    Grade
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
                  <CFormFeedback invalid>Please provide a valid grade.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom04" id="score">
                    Score
                  </CFormLabel>
                  <CFormSelect
                    id="validationCustom04"
                    value={insertScore}
                    onChange={(e) => setInsertScore(e.target.value)}
                  >
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid score.</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Chapter Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertTopic}
                    onChange={(e) => setInsertTopic(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom01">Question</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    required
                    value={insertQuestion}
                    onChange={(e) => setInsertQuestion(e.target.value)}
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom02" id="description">
                    Description
                  </CFormLabel>
                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    value={insertDescription}
                    onChange={(e) => setInsertDescription(e.target.value)}
                  ></CFormTextarea>
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom02" id="modelAnswer">
                    Model Answer
                  </CFormLabel>
                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    value={insertModelAnswer}
                    onChange={(e) => setInsertModelAnswer(e.target.value)}
                  ></CFormTextarea>
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  {' '}
                  <br />
                  <CButton color="secondary" className="text-high-emphasis float-end" type="submit">
                    ADD QUESTION
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

export default AddCustomQuestionPage
