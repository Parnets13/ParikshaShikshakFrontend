import React from 'react'
import { Table } from 'react-bootstrap'
import {  useLocation } from 'react-router-dom'

function ViewHeader({ data }) {

  const location = useLocation()
  const { item } = location.state || {};
  console.log("item",item);
  return (
    <div>
    {/* new  */}
    <div className="question-paper-display">
      <div className="details-display ">
        <div className="top-titles-container">
          <div className="row">
            <div className="col-sm-2">
              
                <img
                  src="./Images/logo.png"
                  alt=""
                  style={{ width: "80px", marginTop:"24px"}}
                />
            
            </div>
            <div className="col-sm-8">
              <h4 className="mb-2"> (School Name Will Come )</h4>
              {/* <h4>{data?.Board}</h4>  title-1 */}
              {data?.Institute_Name ? (
              <h5>
                {data?.Institute_Name},{data?.SchoolAddress}
              </h5>
            ) : (
              <></>
            )}
             {/* <h6>ಎರಡನೆಯ ಸಂಕಲನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ - 2023-24</h6> */}
             <h6>Exam Type - year (will come)</h6>
            </div>
          </div>
          <div className="title-2">
            {/* {data?.Institute_Name ? (
              <h5>
                {data?.Institute_Name},{data?.SchoolAddress}
              </h5>
            ) : (
              <></>
            )} */}
          </div>
          <div className="title-3">
            {/* <h4>{data?.Exam_Name} {" "}{data?.Exam_Lavel}</h4> */}
            {/* <h6>ಎರಡನೆಯ ಸಂಕಲನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ - 2023-24</h6> */}
          </div>
        </div>

        <div className="class-details">
          <div className="class-data">
            <b>{item?.classs} : </b>
          </div>
          <div className="class-data">
            <b>{item?.subject}: </b>
          </div>
          <div>
            <div className="class-data">
              <b>{item?.marks}: </b>
            </div>
            <div className="class-data">
              <b>{item?.time}: {data?.bluePrint?.DurationOfExam} </b>
            </div>
          </div>
        </div>

        <div className="student-details-container">
          <div className="d-flex justify-content-between">
            <h5 style={{ textAlign: "center", padding: "5px 0px" }}>
            {item?.studentinfo}
            </h5>
            {/* <h6 style={{ textAlign: "center", padding: "5px 0px" }}>
            ವಿದ್ಯಾರ್ಥಿಯಿಂದ ಭರ್ತಿ ಮಾಡಬೇಕಾದ ಮಾಹಿತಿ
            </h6> */}
            <div>
              <span style={{ fontSize: "16px" }}>
              {item?.examdate}: {data?.Test_Date}
              </span>{" "}
              <br />
              <span> {item?.totalquestion}: </span>
            </div>
          </div>
          <div className="student-details">
            {/* <p style={{ margin: "0px" }}>ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು:</p> */}
            <p style={{ margin: "0px" }}>{item?.nameofstudent}:</p>
            <div className="line"></div>
          </div>

          <div className="student-number-row">
            <div style={{ margin: " auto 0" }}>
              <p>{item?.satsno}:</p>
              {/* <p>ವಿದ್ಯಾರ್ಥಿ SATS ನಂ:</p> */}
            </div>
            <div className="d-flex">
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
            </div>
            <div className="ss">
              <p>{item?.signature}:<b>__________</b></p>
              {/* <p>ವಿದ್ಯಾರ್ಥಿಯ ಸಹಿ:</p> */}
              <div className=""></div>
            </div>
          </div>
        </div>

        <div className="student-details-container">
          <h5 style={{ textAlign: "center" }}>
          {item?.roominvigilator}
          </h5>
          {/* <h6 style={{ textAlign: "center" }}>
          ರೂಮ್ ಇನ್ವಿಜಿಲೇಟರ್ ಮೂಲಕ ಭರ್ತಿ ಮಾಡಬೇಕಾದ ಮಾಹಿತಿ
          </h6> */}

          <div className="school-number-row">
            <div style={{ margin: " auto 0" }}>
              <p>{item?.idsccode}:</p>
              {/* <p>ಶಾಲೆಯ IDSE ಕೋಡ್:</p> */}
            </div>
            <div className="d-flex">
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
              <div className="number-box"></div>
            </div>
          </div>
          <div className="student-details">
            <p style={{ margin: "0px" }}>{item?.schoolname} :</p>
            {/* <p style={{ margin: "0px" }}>ಶಾಲೆಯ ಹೆಸರು:</p> */}
            <div className="line-2"></div>
          </div>
        </div>

        <div className="third-row">
          <div className="student-details">
            <p style={{ margin: "0px" }}>{item?.cluster}:</p>
            {/* <p style={{ margin: "0px" }}>ಕ್ಲಸ್ಟರ್:</p> */}
            <div className="line-3"></div>
          </div>
          <div className="student-details">
            <p style={{ margin: "0px" }}>{item?.block}:</p>
            {/* <p style={{ margin: "0px" }}>ನಿರ್ಬಂಧಿಸಿ:</p> */}
            <div className="line-3"></div>
          </div>
          <div className="student-details">
            <p style={{ margin: "0px" }}>{item?.distric}:</p>
            {/* <p style={{ margin: "0px" }}>ಜಿಲ್ಲೆ:</p> */}
            <div className="line-3"></div>
          </div>
        </div>

        <div className="fourth-row">
          {/* <div className="school-details">
           
            <p style={{ margin: "0px" }}>School Name:</p>
          </div> */}
          <div className="school-details">
            <p style={{ margin: "0px" }}>{item?.govt}.</p>
            {/* <p style={{ margin: "0px" }}>ಸರಕಾರ</p> */}
            <div className="number-box-1"></div>
          </div>
          <div className="school-details">
            {/* <p style={{ margin: "0px" }}>ನೆರವು ನೀಡಿದೆ</p> */}
            <p style={{ margin: "0px" }}>{item?.aided}</p>
            <div className="number-box-1"></div>
          </div>
          <div className="school-details">
            <p style={{ margin: "0px" }}>{item?.unaided}</p>
            {/* <p style={{ margin: "0px" }}>ಅನುದಾನರಹಿತ</p> */}
            <div className="number-box-1"></div>
          </div>
        </div>

        <div>({item?.markinfo})</div>
        {/* <div>(ಅನ್ವಯವಾಗುವ ಮಾಹಿತಿಗಾಗಿ "✓" ಗುರುತು ಹಾಕಿ)</div> */}
        <div className="student-details" style={{ padding: "10px 0" }}>
          <p style={{ margin: "0px" }}>{item?.signatureinvigilator}: </p>
          {/* <p style={{ margin: "0px" }}>ರೂಮ್ ಇನ್ವಿಜಿಲೇಟರ್ ಸಹಿ: </p> */}
          <div className="line-4"></div>
        </div>

        <div>
          <h5 style={{ textAlign: "center", padding: "5px 0px" }}>
          {item?.evaluator}
          </h5>
          {/* <h5 style={{ textAlign: "center", padding: "5px 0px" }}>
          ಮೌಲ್ಯಮಾಪನದ ಸಮಯದಲ್ಲಿ ಮೌಲ್ಯಮಾಪಕರು ತುಂಬಬೇಕಾದ ಮಾಹಿತಿ
          </h5> */}
          
          <div></div>
          <Table
            responsive
            bordered
            style={{ border: "1px solid" }}
            size="sm"
          >
            <thead>
              <tr>
                <th>{item?.questionno1}</th>
                {/* <th>ಪ್ರಶ್ನೆ ಸಂಖ್ಯೆ</th> */}
                <th>{item?.obtainedno1}</th>
                {/* <th>ಅಂಕಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ</th> */}
                <th>{item?.questionno2}</th>
                {/* <th>ಪ್ರಶ್ನೆ ಸಂಖ್ಯೆ</th> */}
                <th>{item?.obtainedno2}</th>
                {/* <th>ಅಂಕಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ</th> */}
                <th>{item?.questionno3}</th>
                {/* <th>ಪ್ರಶ್ನೆ ಸಂಖ್ಯೆ</th> */}
                {/* <th>ಅಂಕಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ</th> */}
                <th>{item?.obtainedno3}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td>11</td>
                <td></td>
                <td>21</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td>12</td>
                <td></td>
                <td>22</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td>13</td>
                <td></td>
                <td>23</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td></td>
                <td>14</td>
                <td></td>
                <td>24</td>
                <td></td>
              </tr>
              <tr>
                <td>5</td>
                <td></td>
                <td>15</td>
                <td></td>
                <td>25</td>
                <td></td>
              </tr>
              <tr>
                <td>6</td>
                <td></td>
                <td>16</td>
                <td></td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>7</td>
                <td></td>
                <td>17</td>
                <td></td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>8</td>
                <td></td>
                <td>18</td>
                <td></td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>9</td>
                <td></td>
                <td>19</td>
                <td></td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>10</td>
                <td></td>
                <td>20</td>
                <td></td>
                <td>-</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <b>{item?.totalmarks1}</b>
                  {/* <b>ಒಟ್ಟು ಅಂಕಗಳು</b> */}
                </td>
                <td></td>
                <td>
                 <b>{item?.totalmarks2}</b>
                 {/* <b>ಒಟ್ಟು ಅಂಕಗಳು</b> */}
                </td>
                <td></td>
                <td>
                   <b>{item?.totalmarks3}</b>
                   {/* <b>ಒಟ್ಟು ಅಂಕಗಳು</b> */}
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <b>{item?.grandtotal}</b>
                  {/* <b>ಗ್ರೇಡ್ ಒಟ್ಟು</b> */}
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="student-details">
          <p style={{ margin: "0px" }}>{item?.totalobtainedmarks}: </p>
          {/* <p style={{ margin: "0px" }}>ಪಡೆದ ಒಟ್ಟು ಅಂಕಗಳು (ಪದಗಳಲ್ಲಿ): </p> */}
          <div className="line-5"></div>
        </div>
        <div className="student-details">
          <p style={{ margin: "0px" }}>{item?.evaluatorsign}:</p>
          {/* <p style={{ margin: "0px" }}>ಮೌಲ್ಯಮಾಪಕರ ಸಹಿ:</p> */}
          <div className="line-6"></div>
        </div>
        <div className="student-details">
          {/* <p style={{ margin: "0px" }}>{item?.lastSign}:</p> */}
          {/* <p style={{ margin: "0px" }}>ಮೌಲ್ಯಮಾಪಕರ ಸಹಿ:</p> */}
          {/* <div className="line-6" style={{width:"69%"}}></div> */}
        </div><br/>
        <div className='d-flex justify-content-between'>
          <p>{item?.ans}</p>
          <p>{item?.or}</p>
          <p>{item?.lastSign}</p>
          <p>{item?.blueprintBoard}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ViewHeader