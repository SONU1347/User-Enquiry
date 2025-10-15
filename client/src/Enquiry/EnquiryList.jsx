import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';





const EnquiryList = ({ data,getEnquiryList,Swal ,setFromData}) => {
let deleteRow=(delid)=>{
    Swal.fire({
        title: 'Do you want to Delete Data?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        
    }).then((result) => {
        if (result.isConfirmed) {

             axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
        .then((res) => {
            toast.success('Enquiry Deleted Successfully');
            getEnquiryList();
        })

            Swal.fire("Saved!","","Success")
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved","","info")}
    })

    
   
}


let editRow=(editid)=>{
   axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
   .then((res) => {
    let data = res.data;
    setFromData(data.enquiry);
   })
}
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            {/* <ToastContainer/> */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enquiry List</h2>

            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-100">
                            <TableHeadCell className="px-4 py-2">Sr No.</TableHeadCell>
                            <TableHeadCell className="px-4 py-2">Name</TableHeadCell>
                            <TableHeadCell className="px-4 py-2">Email</TableHeadCell>
                            <TableHeadCell className="px-4 py-2">Phone</TableHeadCell>
                            <TableHeadCell className="px-4 py-2">Message</TableHeadCell>
                            <TableHeadCell className="px-4 py-2 text-center">Edit</TableHeadCell>
                            <TableHeadCell className="px-4 py-2 text-center">Delete</TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {
                            data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50">
                                        <TableCell className="px-4 py-2">{index + 1}</TableCell>
                                        <TableCell className="px-4 py-2">{item.name}</TableCell>
                                        <TableCell className="px-4 py-2">{item.email}</TableCell>
                                        <TableCell className="px-4 py-2">{item.phone}</TableCell>
                                        <TableCell className="px-4 py-2">{item.message}</TableCell>
                                        <TableCell className="px-4 py-2 text-center">
                                            <button onClick={()=>editRow(item._id)} className=" bg-blue-500 text-white-600 px-4 py-1 rounded-md">Edit</button>
                                        </TableCell>
                                        <TableCell className="px-4 py-2 text-center">
                                            <button onClick={()=>deleteRow(item._id)} className="bg-red-500 text-white-600 px-4 py-1 rounded-md">Delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                        No Data Found
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default EnquiryList;
