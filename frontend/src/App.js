import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import SigninScreen from './screens/SigninScreen';
import ShowTimeScreen from './screens/ShowTimeScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Store } from './Stores';
import SearchBox from './components/SearchBox';
import BookingScreen from './screens/BookingScreen';
import { LocationScreen } from './screens/LocationScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';
import PremiumScreen from './screens/PremiumScreen';
import HistoryScreen from './screens/HistoryScreen';
import ScreenScreen from './screens/ScreenScreen';
import Analytics from "./screens/Analytics";



export default function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('paymenMethod');
  }


  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar style={{ backgroundColor: '#9d1010', fontFamily: 'Luminari, fantasy', color: 'white' }}>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>THC Theater</Navbar.Brand>
              </LinkContainer>
              <SearchBox />
              <Nav className='me-auto'>
                {userInfo ? (
                  <NavDropdown title={userInfo.role === "Employee" ? 'Admin' : userInfo.first_name} id='basic-nav-dropdown'>
                    {userInfo.role === "Employee" ? (
                      <div>
                        <LinkContainer to='/locations'>
                          <NavDropdown.Item>Location</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/'>
                          <NavDropdown.Item>Movies</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/showtimes'>
                          <NavDropdown.Item>Showtime</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/analytics'>
                          <NavDropdown.Item>Analytics</NavDropdown.Item>
                        </LinkContainer>
                      </div>
                    ) : (
                      <div>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/history'>
                          <NavDropdown.Item>History</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/premium'>
                          <NavDropdown.Item>Premium</NavDropdown.Item>
                        </LinkContainer>
                      </div>
                    )}
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='#signout'
                      onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='nav-Link' to='/signin'>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/movie/:id' element={<MovieScreen/>}/>
            <Route path='/signin' element={<SigninScreen/>}/>
            <Route path='/showtimes/:id' element={<ShowTimeScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/bookings/:id' element={<BookingScreen/>}/>
            <Route path='/locations' element={<LocationScreen/>}/>
            <Route path='/payment' element={<PaymentScreen/>}/>
            <Route path='/analytics' element={<Analytics/>}/>
           
              <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path='/premium' element={<PremiumScreen/>}/>
            <Route path='/history' element={<HistoryScreen/>}/>
            <Route path='/locations/:id' element={<ScreenScreen/>}/>
          </Routes>
          </Container>
        </main>
        <footer>
          <Navbar style={{ backgroundColor: '#9d1010', fontFamily: 'Luminari, fantasy', color: 'white' }}>
            <Container className='d-flex justify-content-center align-items-center flex-grow-1'>
              <div className='text-center'>
                2003-2004 TCH Theater , Inc - All Right Reserver
              </div>
            </Container>
          </Navbar>
        </footer>
      </div>
    </BrowserRouter>
  )
}
