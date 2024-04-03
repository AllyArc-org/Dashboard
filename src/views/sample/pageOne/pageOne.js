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

function PageOne() {
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
      <div>Hello Chat World</div>
    </>
  )
}

export default PageOne
