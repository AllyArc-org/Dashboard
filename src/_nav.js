import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilCursor, cilPencil, cilAddressBook, cilLibraryAdd } from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    href: '#/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Question',
  },
  {
    component: CNavItem,
    name: 'Question Page',
    href: '#/question/questionPage',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Add Questiopns',
    to: '#/question',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Custom Question',
        href: '#/question/addCustomQuestion',
      },
      {
        component: CNavItem,
        name: 'Generated Question',
        href: '#/question/addGenQuestion',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Student',
  },
  {
    component: CNavItem,
    name: 'Add Student',
    href: '#/student/addStudent',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Student Page',
    href: '#/student/studentPage',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'Sample',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Page One',
  //   href: '#/sample/pageOne',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Page Two',
  //   href: '#/sample/pageTwo',
  //   icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  // },
]

export default _nav
