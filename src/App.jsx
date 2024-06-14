
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import Header from './components/Header/Header'
import Default from './components/Default/Default'
function App() {
  return (
    <>
      <div>

        <Router>
          <Routes>
            {routes.map((route) => {
              const Page =route.page
              const Layout = route.isShowHeader ? Default: Fragment
              return (
                <Route key={route.path} path= {route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
