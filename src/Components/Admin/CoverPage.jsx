import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiAnalyse, BiSpreadsheet } from 'react-icons/bi';
import { IoNewspaperOutline } from 'react-icons/io5'
import { SiBlueprint } from "react-icons/si";
import { useLocation } from 'react-router-dom';


export const CoverPage = () => {

    const location = useLocation()
    const { item } = location.state

    return (<>
        <div className='cover-page' style={{ padding: '15px', border: '2px solid #000', width: '750px', margin: 'auto', borderRadius: '20px', height: '1100px' }}>
            <div className='d-flex align-items-center mb-5 justify-content-around'>
                <div>
                    <img
                        src="../Images/asd-logo.PNG"
                        alt="adminlogo"
                        style={{ width: '170px', height: "170px", }}
                    />
                </div>
                <div className=" text-center">
                    <h2>{item?.SchoolName}</h2>
                    <h3>{item?.ExamName}</h3>
                </div>
            </div>
            <div className='d-flex justify-content-around mb-5' style={{ marginTop: '130px' }}>
                <p className='fw-bold fs-4'>{item?.Subject} :- </p>
                <p className='fw-bold fs-4'>{item?.Classs} :- </p> 
            </div>
            <div className='mb-5' style={{ marginTop: '150px' }}>
                <ul style={{ listStyle: 'none', width:'fit-content', margin:'auto', fontSize: '17px', fontStyle: 'italic' }}>
                    <li className='d-flex gap-4 align-items-center '>
                        <p><IoNewspaperOutline /></p>
                        <p>{item?.questionPaper}</p>
                    </li>
                    <li className='d-flex gap-4 align-items-center '>
                        <p><SiBlueprint /></p>
                        <p>{item?.blueprint}</p>
                    </li>
                    <li className='d-flex gap-4 align-items-center '>
                        <p><BiSpreadsheet /></p>
                        <p>{item?.answersheet}</p>
                    </li>
                    <li className='d-flex gap-4 align-items-center '>
                        <p><BiAnalyse /></p>
                        <p>{item?.questionanylys}</p>
                    </li>
                </ul>
            </div>
            <div className="d-flex justify-content-around" style={{ marginTop: '280px' }}>
                <p className='fw-bold'>{item?.SubjectTeacher} :-</p>
                <div>
                    <span className='fw-bold mb-0'>{item?.Principal}</span>
                    {/* /
                    <span className='fw-bold mb-0'>Principal</span> */}
                </div>
            </div>
        </div>

    </>
    )
}
