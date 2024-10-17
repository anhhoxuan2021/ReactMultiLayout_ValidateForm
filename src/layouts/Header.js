import React, {useState, useEffect}  from 'react';
import {useSelector,useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

import * as ReactBootstrap from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { logout, setLogout} from '../features/user/userLoginSlice';

const Header = () => {
  const dispatch  = useDispatch();

  const [isShow, setIsShow] = useState(false)
  const [valFilter, setValFilter] = useState('')
  const [amountOfProduct, setAmountOfProduct] = useState(0)
  const [currentUser, setCurrentUser] = useState({first_name:'', last_name:'', id:''})

  const {userLogin} = useSelector((state)=>state.user_Login)
  
  useEffect(()=>{    
   // setCurrentUser(currentUser)
    let temp =  JSON.parse(localStorage.getItem('current_user'))
    setCurrentUser(temp)   
    
  },[userLogin])

  const textSearChange =(event) => {
    setValFilter(event.target.value)
  }

  const hiddenSearch = () => {
    setValFilter('')
    setIsShow(false)
  }

  const showModalLogin = () =>{

  }

  const search = () => {
   // setIsShow(true or false)
  }

  const handleLogout = async (e) =>{
    e.preventDefault();
    dispatch(setLogout(''))

    localStorage.setItem('current_user',JSON.stringify([]))
    localStorage.setItem('jwtToken','')
    localStorage.setItem('refreshToken','')
   // await dispatch(logout());
  }

    return (
        <>
        <header className="grid items-center">
              <div id="topbar"> </div>
              <div id="headerbar">
                  <div className='container'>
                    <div className="row h-100 justify-content-md-center justify-content-sm-start align-items-center media-flex">
                      <div className="col-md-2 col-lg-2 col-sm-7 media-xs-7 force-hidden">
                        <img className="w-167" src={require('../images/logo_1.png')} alt="anh ho"/>
                      </div>
                      <div className="col-md-7 col-lg-4 col-sm-1 block-search media-xs-1 ">
                        <input defaultValue={valFilter}  onChange={(e) => textSearChange(e)} 
                        className= {isShow? "form-control me-2 border-dark-red media-search text-search rounded-bottom-lr-none":"form-control me-2 border-dark-red media-search text-search"}
                         type="text" placeholder="Search" aria-label="Search" />
                        {
                          isShow?
                          (
                            <span className="icon-search" onClick={e => search(e)} style={{cursor: "pointer"}}>
                              <FontAwesomeIcon icon={['fab', 'fa-sistrix']} />                               
                         </span>
                          ):
                          (
                            <>
                            <span className="icon-delete" style={{cursor: "pointer"}} onClick={(e) => hiddenSearch(e)}> x</span>
                              <span className="icon-back media-is-hidden hidden-force" style={{cursor: "pointer"}}>                                   
                                  <FontAwesomeIcon icon={['fas', 'fa-angle-up fa-rotate-270']} />
                              </span>
                            </>                                
                            )                        
                        }
                        
                        
                       
                    </div>
                    <div className="col-md-1 col-lg-2 col-sm-1 media-xs-1 force-hidden">
                    <div className="  show-modal-login" onClick={e => showModalLogin(e)} style={{cursor:"pointer"}}>
                      {
                        
                        currentUser?.id !=='' && currentUser?.id !==undefined ?
                        (
                          <div className="row justify-content-center align-items-center">
                          <div className="col-md-12 col-lg-3 tooltip-media" style={{cursor: 'pointer'}} onClick={e => handleLogout(e)}>
                              <div className="circle-size-2" >
                                  <span className="c-login-success  child-box">
                                    <FontAwesomeIcon icon={['fa', 'fa-user']} />
                                  </span>
                              </div>
                              <div className="box-size-media">
                                  { currentUser?.first_name } { currentUser?.last_name }
                              </div>
                          </div>
                          <div className="col-md-0 col-lg-9 media-display-none" >
                              <div className="d-flex flex-md-column flex-sm-row">
                                  <span className="f-12 c-777" id="user-name">{ currentUser?.first_name } {currentUser?.last_name }</span>
                                  <span className="f-13 bold c-777  media-ps-15 media-color-danger" style={{cursor:"pointer"}}>
                                      Sign out
                                  </span>
                              </div>
                          </div>
                      </div>
                        ):
                        (
                          <div className="row justify-content-center align-items-center">
                              <div className="col-md-12 col-lg-3">
                                  <div className="circle-size-2">
                                      <span className="fa-color-green child-box">
                                        <FontAwesomeIcon icon={['fa', 'fa-user']} />
                                      </span>
                                  </div>
                              </div>
                              <div className="col-md-0 col-lg-9 media-display-none" >
                                  <span className="f-12 c-777">Account &nbsp;</span>
                                  <span className="f-13 bold c-777 media-ps-15">Sign in</span>

                              </div>
                          </div>
                        )
                      }                         
                        </div>
                      </div>
                      <div className="col-md-1 col-lg-2 col-sm-1 media-xs-1 force-hidden">
                          <div className="row justify-content-center align-items-center">
                              <div className="col-md-12 col-lg-3 ">
                                  <Link to="/checkout/cart" className="nav-link" exact-active-class="text-success" active-class="active">
                                  <div className="circle-size-2" style={{cursor: "pointer"}}>
                                    <span className="child-box fa-color-green">
                                    <FontAwesomeIcon icon={['fas', 'fa-shopping-cart']} />
                                          <span className="counter-cicle">
                                              <span className="child-counter-cicle amount-of-product-cart">{amountOfProduct}</span>
                                          </span>
                                      
                                    </span>
                                  </div>
                                  </Link>
                              </div>

                              <div className="col-md-0 col-lg-9 media-display-none">
                                  <span className="f-12 c-777">Cart&nbsp;</span>
                                  <span className="f-13 bold c-777"><span className="amount-of-product-cart">{amountOfProduct}</span>&nbsp; Products</span>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-1 col-lg-2 col-sm-1 media-xs-1 force-hidden no_decorate">
                        <Link to="/orders" className="row justify-content-center align-items-center">
                            <div className="col-md-12 col-lg-3">
                                <div className="circle-size-2 ">
                                    <span className="fa-color-green child-box">
                                    <FontAwesomeIcon icon={['fas', 'fa-shipping-fast']} />                                      
                                    </span>
                                  
                                </div>
                            </div>

                            <div className="col-md-0 col-lg-9  media-display-none">
                                <span className="f-12 c-777">Review &nbsp;</span>
                                <span className="f-13 bold c-777">Orders</span>
                            </div>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
              </div>
          </header>
        </>
    )
 
  }

export default Header;