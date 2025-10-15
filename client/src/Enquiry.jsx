import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from './Enquiry/EnquiryList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'


const Enquiry = () => {

    let [enquiryList, setEnquiryList] = useState({});
    let [fromData, setFromData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        _id: '',
    });

    let saveEnquiry = (e) => {
        e.preventDefault();

        //add logic when id are avilable then update  or not then insert
        if (fromData._id) {
            //update

            axios.put(`http://localhost:8020/api/website/enquiry/update/${fromData._id}`, fromData)
                .then((res) => {
                    toast.success('Enquiry Updated Successfully')
                    setFromData({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                        _id: '',
                    })
                    getEnquiryList();
                })
        }
        else {
            axios.post('http://localhost:8020/api/website/enquiry/insert', fromData)
                .then((res) => {
                    console.log(res.data)
                    toast.success('Enquiry Submitted Successfully')
                    setFromData({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                    })
                    getEnquiryList();
                })
        }


    }

    let getEnquiryList = () => {
        axios.get('http://localhost:8020/api/website/enquiry/view')
            .then((res) => {
                return res.data;
            })
            .then((finalData) => {
                if (finalData.status) {
                    setEnquiryList(finalData.enquiryList);
                }
            })
    }

    let getValue = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let oldData = { ...fromData };

        oldData[inputName] = inputValue;
        setFromData(oldData);
    }

    useEffect(() => {
        getEnquiryList();
    }, [])

    return (
        <>
            <div className="p-6">
                <ToastContainer />
                <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

                <div className='grid grid-cols-[30%_auto] gap-10'>

                    {/* Left Form Section */}
                    <div className='bg-gray-100 p-6 rounded-xl shadow-md'>
                        <h2 className='text-[20px] font-bold mb-4'>Enquiry Form</h2>
                        <form onSubmit={saveEnquiry}>
                            <div className='mb-4'>
                                <Label htmlFor="name">Your Name</Label>
                                <TextInput
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-md"
                                    value={fromData.name}
                                    onChange={getValue}
                                    name='name'
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="email">Your Email</Label>
                                <TextInput
                                    type="email"
                                    className="bg-white border border-gray-300 rounded-md"
                                    value={fromData.email}
                                    onChange={getValue}
                                    name='email'
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="phone">Your Phone</Label>
                                <TextInput
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-md"
                                    value={fromData.phone}
                                    onChange={getValue}
                                    name='phone'
                                    placeholder="Enter Your Phone"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <Label htmlFor="message">Your Message</Label>
                                <Textarea
                                    name='message'
                                    className="bg-white border border-gray-300 rounded-md"
                                    value={fromData.message}
                                    onChange={getValue}
                                    placeholder="Comment..."
                                    required
                                    rows={4}
                                />
                            </div>

                            <div className='mt-6'>
                                <Button type="submit" className='w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md'>
                                    {fromData._id ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right List Section */}
                    <div className='bg-white p-4 rounded-xl shadow-md'>
                        <EnquiryList data={enquiryList} getEnquiryList={getEnquiryList} Swal={Swal} setFromData={setFromData} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Enquiry
