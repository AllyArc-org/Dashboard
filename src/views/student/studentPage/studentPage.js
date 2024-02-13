import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where, updateDoc, doc } from 'firebase/firestore'
import db from '../../../firebase'
import {
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHamburgerMenu } from '@coreui/icons'
import { Link } from 'react-router-dom'

async function updateSkillLevel(student) {
  const grade = student.grade
  const studentId = student.id

  // Get all students with the same grade
  const studentCollectionRef = collection(db, 'student')
  const studentQuery = query(studentCollectionRef, where('grade', '==', grade))
  onSnapshot(studentQuery, async (studentSnapshot) => {
    const helpRequestCounts = studentSnapshot.docs
      .map((doc) => {
        const { logicalHelp, visualHelp } = doc.data().helpRequestCount
        return {
          logical: parseInt(logicalHelp),
          visual: parseInt(visualHelp),
        }
      })
      .filter((count) => !isNaN(count.logical) && !isNaN(count.visual)) // Filter out invalid values

    const meanLogical =
      helpRequestCounts.reduce((total, count) => total + count.logical, 0) /
      helpRequestCounts.length

    const meanVisual =
      helpRequestCounts.reduce((total, count) => total + count.visual, 0) / helpRequestCounts.length

    const stdDevLogical = Math.sqrt(
      helpRequestCounts.reduce(
        (total, count) => total + Math.pow(count.logical - meanLogical, 2),
        0,
      ) / helpRequestCounts.length,
    )

    const stdDevVisual = Math.sqrt(
      helpRequestCounts.reduce(
        (total, count) => total + Math.pow(count.visual - meanVisual, 2),
        0,
      ) / helpRequestCounts.length,
    )
    // Calculate the z-score for the student's help request count for logical and visual
    const zScoreLogical =
      (parseInt(student.helpRequestCount.logicalHelp) - meanLogical) / stdDevLogical
    const zScoreVisual = (parseInt(student.helpRequestCount.visualHelp) - meanVisual) / stdDevVisual
    // Determine the skill level based on the z-score
    const confirmed = doc(db, 'student', `${studentId}`)
    await updateDoc(confirmed, {
      skill: {
        logical: (zScoreLogical * 10 + 50).toString(),
        visual: (zScoreVisual * 10 + 50).toString(),
        time: student.skill.time,
        creativity: student.skill.creativity,
      },
    })
  })
}

const StudentPage = () => {
  const [student, setStudent] = useState([
    {
      id: '1',
      grade: '7',
      name: 'John Doe',
      contact: '0776792726',
      careGiverEmail: 'doe@gmail.com',
      careGiverContact: '0776792724',
      helpRequestCount: { logicalHelp: '0', visualHelp: '0' },
      skill: { creativity: '3', logical: '4', time: '4', visual: '5' },
    },
  ])
  useEffect(
    () =>
      onSnapshot(query(collection(db, 'student')), (studentSnapshot) => {
        let studentInfoTable = []
        studentSnapshot.forEach((studentDoc) => {
          var studentInfo = studentDoc.data()
          studentInfoTable.push({
            id: parseInt(studentDoc.id),
            grade: studentInfo.grade,
            name: studentInfo.name,
            contact: studentInfo.contact,
            careGiverEmail: studentInfo.careGiverEmail,
            careGiverContact: studentInfo.careGiverContact,
            helpRequestCount: {
              logicalHelp: studentInfo.helpRequestCount.logicalHelp,
              visualHelp: studentInfo.helpRequestCount.visualHelp,
            },
            skill: {
              creativity: studentInfo.skill.creativity,
              logical: studentInfo.skill.logical,
              time: studentInfo.skill.time,
              visual: studentInfo.skill.visual,
            },
          })
        })
        studentInfoTable = studentInfoTable.sort((a, b) => a.id - b.id) // sort by count
        setStudent(studentInfoTable)
      }),
    [],
  )
  console.log(student)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable align="middle" className="mb-0 border" responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilHamburgerMenu} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Student Details</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Care Giver Contact</CTableHeaderCell>
                  <CTableHeaderCell>Care Giver Email</CTableHeaderCell>
                  <CTableHeaderCell>Care Giver Details</CTableHeaderCell>
                  <CTableHeaderCell>Student Profile Page</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {student.map((student, index) => (
                  <CTableRow v-for="cust in tableItems" key={index}>
                    {/* Avatar */}
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={`https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=${student.id}`}
                      />
                    </CTableDataCell>
                    {/* Student Details */}
                    <CTableDataCell>
                      <div>{student.name}</div>
                      <div className="small text-medium-emphasis">
                        Grade : {student.grade} | Contact : {student.contact}
                      </div>
                    </CTableDataCell>
                    {/* Care giver contact */}
                    <CTableDataCell className="text-center">
                      {student.careGiverContact}
                    </CTableDataCell>
                    {/* Care giver email*/}
                    <CTableDataCell className="text-center">
                      {student.careGiverEmail}
                    </CTableDataCell>
                    {/* caregiver details */}
                    <CTableDataCell>
                      {student.careGiverContact} | {student.careGiverEmail}
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/student/${student.id}/${student.grade}/${student.name}/${student.contact}/${student.careGiverEmail}/${student.careGiverContact}/${student.skill.creativity}/${student.skill.logical}/${student.skill.time}/${student.skill.visual}`}
                      >
                        <CButton
                          color="primary"
                          variant="outline"
                          onClick={() => updateSkillLevel(student)}
                        >
                          Go to Page
                        </CButton>
                      </Link>
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

export default StudentPage
