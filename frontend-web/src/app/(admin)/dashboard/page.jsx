import React from 'react'
import AdminDashboard from './components/AdminDashBoard'
import Sidebar from '@/components/layout/SideBar'
import TopHeader from '@/components/layout/TopHeader'
import { Container } from 'react-bootstrap'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function page() {
  return (

    <div className="d-flex w-100">
      <Sidebar/>
      <div className="d-flex flex-column w-100">
        <TopHeader />
        <Container className="py-4" style={{width:'80%'}}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AdminDashboard />
          </ThemeProvider>
        </Container>
      </div>
    </div>
  );
}
export default page