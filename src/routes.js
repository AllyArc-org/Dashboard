import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Question
const AddGenQuestion = React.lazy(() => import('./views/question/addQuestion/addGenQuestion'))
const AddCustomQuestion = React.lazy(() => import('./views/question/addQuestion/addCustomQuestion'))
const QuestionPage = React.lazy(() => import('./views/question/questionPage/questionPage'))

// Student
const AddStudent = React.lazy(() => import('./views/student/addStudent/addStudent'))
const StudentPage = React.lazy(() => import('./views/student/studentPage/studentPage'))
const StudentSinglePage = React.lazy(() => import('./views/student/studentPage/studentSinglePage'))

// Sample
const PageOne = React.lazy(() => import('./views/sample/pageOne/pageOne'))
const PageTwo = React.lazy(() => import('./views/sample/pageTwo/pageTwo'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/question', name: 'Question', element: QuestionPage, exact: true },
  { path: '/question/questionPage', name: 'Question Page', element: QuestionPage },
  { path: '/question/addCustomQuestion', name: 'Custom Question', element: AddCustomQuestion },
  { path: '/question/addGenQuestion', name: 'Generated Question', element: AddGenQuestion },
  { path: '/student', name: 'Student', element: StudentPage, exact: true },
  { path: '/student/studentPage', name: 'Student Page', element: StudentPage },
  {
    path: '/student/studentSinglePage',
    name: 'Student Single Page',
    element: StudentSinglePage,
  },
  { path: '/student/addStudent', name: 'Add Student', element: AddStudent },
  { path: '/sample', name: 'Sample', element: PageOne, exact: true },
  { path: '/sample/pageOne', name: 'Page One', element: PageOne },
  { path: '/sample/pageTwo', name: 'Page Two', element: PageTwo },
]

export default routes
