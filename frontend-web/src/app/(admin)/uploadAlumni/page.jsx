import React from 'react'
import FileUploadComponent from './components/FileUploadComponent'
import { Col, Container } from 'react-bootstrap'
import TopHeader from '@/components/layout/TopHeader'

function page() {
    return <>
    <TopHeader />
    <main>
      <Container>
        <div><FileUploadComponent/></div>
      </Container>
    </main>
  </>;
}

export default page