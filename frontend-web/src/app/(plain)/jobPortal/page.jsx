import React from 'react'
import JobPage from './components/JobPage'
import Topbar from '../events/details/components/Topbar'
import Footer from '../events/details/components/Footer'
import PageMetaData from '@/components/PageMetaData';
function page() {
  return (
    <div className='w-100' style={{height:'100%'}}>
    <PageMetaData title='job portal' />
      <Topbar />
      <main className='w-100' style={{height:'100%'}}>
        <JobPage/>  
      </main>
      <Footer />
      
    </div>
  )
}

export default page