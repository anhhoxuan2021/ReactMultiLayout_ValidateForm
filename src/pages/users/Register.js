import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUserByEmail} from '../../features/user/userLoginSlice';

import {register} from '../../api/productService'


const Register = ({socket}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        confirm_password:''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    
    useEffect(() => {
        document.body.className = 'bg-white';
    }, [])

    const handleField = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        // let name = e.target.name
        // let value = e.target.value
        // console.log('name= '+name)
        // console.log('value= '+value)
        setFormData({
            ...formData,
            [name]: value,
        });
        //removekey
        const updatedObj = Object.fromEntries(
            Object.entries(errors).filter(([key]) => key !== name)
          );

        setErrors(updatedObj);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       // await dispatch(getUserByEmail(email));
       const newErrors = validateForm(formData);
        console.log(newErrors)
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let paras = {data: formData}
            register(paras)
        } else {
            
        }
    }

    const validateForm = (data) => {
        const errors = {};
        if (!data.first_name.trim()) {
            errors.first_name = 'Username is required';
        } else if (data.first_name.length < 3) {
            errors.username = 'Firstname must be at least 3 characters long';
        }

        if (!data.last_name.trim()) {
            errors.last_name = 'Lastname is required';
        }

        if (!data.phone.trim()) {
            errors.phone = 'Phone number is required';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 3) {
            errors.password = 'Password must be at least  characters long';
        }

        if (data.confirm_password !== data.password) {
            errors.confirm_password = 'Passwords do not match';
        }

        return errors;
    };

    return(
        <div className='row justify-content-center bg-white pt-4 min-h-700'>
            <div className='col-10'>
            <form className='justify-content-center noValidate' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col'>
                        <Form.Group className="mb-3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" isInvalid={!!errors.first_name}  name="first_name" onChange={(e) => handleField(e)} />
                            {errors.first_name && (<Form.Control.Feedback type="invalid">
                                {errors.first_name}
                            </Form.Control.Feedback>
                            )}                            
                        </Form.Group>
                        
                    </div>
                    <div className='col'>
                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" isInvalid={!!errors.last_name}   name="last_name" onChange={(e) => handleField(e)} />
                            {errors.last_name && (<Form.Control.Feedback type="invalid">
                                {errors.last_name}
                            </Form.Control.Feedback>
                            )}   
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" isInvalid={!!errors.email}   name="email" onChange={(e) => handleField(e)}  />
                            {errors.email && (<Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                            )} 
                        </Form.Group>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" isInvalid={!!errors.phone}   name="phone" onChange={(e) => handleField(e)}  />
                            {errors.phone && (<Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                            )} 
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text"  name="state" onChange={(e) => handleField(e)} />
                        </Form.Group>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text"  name="city" onChange={(e) => handleField(e)}  />
                        </Form.Group>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>Zip code</Form.Label>
                            <Form.Control type="text"  name="zip" onChange={(e) => handleField(e)}  />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text"  name="address" onChange={(e) => handleField(e)}  />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  name="password" isInvalid={!!errors.password}  onChange={(e) => handleField(e)} 
                                aria-describedby="passwordHelpBlock"/>
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 8-20 characters long, contain letters and numbers.
                                </Form.Text>
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password"  name="confirm_password" isInvalid={!!errors.confirm_password}  onChange={(e) => handleField(e)}  />
                        </Form.Group>
                    </div>
                </div>

              
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-outline-primary mt-3' type="submit">Register </button>
                </div>
                
            </form>
            </div>
        </div>
    )
}

export default Register;
