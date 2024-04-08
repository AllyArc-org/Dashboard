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
import axios from 'axios'
import { OpenAI } from 'openai'

function AddQuestionPage() {
  const [insertGrade, setInsertGrade] = useState('')
  const [insertTopic, setInsertTopic] = useState('')
  const [insertContext, setInsertContext] = useState('')
  const [insertScore, setInsertScore] = useState('')

  const generateQuestionDescription = async (question) => {
    // Configure OpenAI API
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })

    try {
      // OpenAI API call to format the feedback
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Generate a short description or hint for the following question:\n\n${question}\n\nDescription:`,
          },
        ],
      })

      const description = completion.choices[0].message.content.trim()
      return description
    } catch (error) {
      console.error('Error generating question description:', error.message)
      return ''
    }
  }

  const storeQuestionInFirebase = async (questionData) => {
    try {
      const currentdate = new Date()
      const question_date = `${currentdate.getDate()}/${
        currentdate.getMonth() + 1
      }/${currentdate.getFullYear()}`

      const getQuestionSize = await getDocs(collection(db, 'question'))
      const questionRef = collection(db, 'question')
      let questionSize = getQuestionSize.size + 1

      await setDoc(doc(questionRef, `${questionSize}`), {
        count: questionSize.toString(),
        grade: questionData.grade,
        topic: questionData.topic,
        question: questionData.question,
        description: questionData.description,
        modelAnswer: questionData.modelAnswer,
        score: questionData.score,
        date: question_date,
      })

      console.log('Question stored in Firebase successfully.')
    } catch (error) {
      console.error('Error storing question in Firebase:', error.message)
    }
  }

  const generateQuestionsAndAnswers = async () => {
    const formattedContext = insertContext.replace(/\n/g, ' ')
    console.log('Generating questions and answers...')
    console.log(formattedContext)

    try {
      // Configure OpenAI API
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      })

      // Generate questions using OpenAI API
      const questionCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Generate 5 questions based on the following context:\n\n${formattedContext} \n\n  for the score of ${insertScore} at the level of a student of grade ${insertGrade} on the topic of ${insertTopic} \n\nQuestions:`,
          },
        ],
      })

      const questions = questionCompletion.choices[0].message.content.trim().split('\n')
      console.log('Generated questions:', questions)

      for (const question of questions) {
        console.log('Processing question:', question)

        try {
          // Generate answer using OpenAI API
          const answerCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `Answer the following question based on the given context:\n\nContext: ${formattedContext} \n\n for the score of ${insertScore} at the level of a student of grade ${insertGrade} on the topic of ${insertTopic} This is the question:\n\nQuestion: ${question}\n\nAnswer:`,
              },
            ],
          })

          const answer = answerCompletion.choices[0].message.content.trim()
          console.log('Generated answer:', answer)

          const description = await generateQuestionDescription(question)
          console.log('Generated description:', description)

          await storeQuestionInFirebase({
            grade: insertGrade.replace(/\D/g, ''),
            topic: insertTopic,
            question,
            description,
            modelAnswer: answer,
            score: insertScore,
          })

          console.log('Waiting for 2 seconds before processing the next question...')
          await new Promise((resolve) => setTimeout(resolve, 2000))
        } catch (error) {
          console.error('Error:', error.message)
        }
      }

      console.log('Question generation and storage completed.')

      setInsertGrade('')
      setInsertTopic('')
      setInsertContext('')
      setInsertScore('')
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity()) {
      generateQuestionsAndAnswers()
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
                  <CFormLabel htmlFor="validationCustom02" id="description">
                    Context
                  </CFormLabel>
                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    value={insertContext}
                    onChange={(e) => setInsertContext(e.target.value)}
                  ></CFormTextarea>
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  {' '}
                  <br />
                  <CButton color="secondary" className="text-high-emphasis float-end" type="submit">
                    Generate QUESTIONs
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

export default AddQuestionPage
