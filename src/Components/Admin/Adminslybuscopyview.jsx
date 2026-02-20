import React, { useEffect, useState, useRef } from "react";
// import Table from "react-bootstrap/Table";
import "../SyllabusCopy/SyllabusCopy.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CiSaveDown2 } from "react-icons/ci";
import { LuPrinter } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import { Row, Table } from "react-bootstrap";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { debounce } from "lodash";
import MathEditor from "./MyEditor";
import AdminQuestprops from "./AdminQuestprops";

const Adminslybuscopyview = () => {
  //Translate
  const [text, settext] = useState();

  let googleTransliterate = require("google-input-tool");
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const onChangeHandler = debounce(async (value, setData) => {
    if (!value) {
      setTranslatedValue("");
      setData("");
      return "";
    }

    let am = value.split(/\s+/); // Split by any whitespace characters
    let arr = [];
    let promises = [];

    for (let index = 0; index < am.length; index++) {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const response = await googleTransliterate(
              new XMLHttpRequest(),
              am[index],
              selectedLanguage
            );
            resolve(response[0][0]);
          } catch (error) {
            console.error("Translation error:", error);
            resolve(am[index]);
          }
        })
      );
    }

    try {
      const translations = await Promise.all(promises);
      setTranslatedValue(translations.join(" "));
      setData(translations.join(" "));
      return translations;
    } catch (error) {
      console.error("Promise.all error:", error);
    }
  }, 300); // Debounce delay in milliseconds

  const { Slybus_id } = useParams();

  const [addslybus, setaddslybus] = useState([]);

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"), {
      useCORS: true,
    });
    const img = data.toDataURL("image/png");

    const imgProperties = pdf.getImageProperties(img);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Syllabus.pdf");
  };

  const [show, setShow] = useState("");
  const aTagRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const Adminslybusbyid = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/getslybusbyid/${Slybus_id}`
      );
      if (res.status == 200) setaddslybus(res.data.succes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Adminslybusbyid();
  }, []);

  //change value for sl.no
  const [value, setValue] = useState(() => {
    // Retrieve the value from localStorage if available, otherwise use the default value
    const storedValue = localStorage.getItem("editableInputValue");
    return storedValue !== null ? storedValue : "Click to edit";
  });
  const [editable, setEditable] = useState(false);

  const handleClick = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    // Here you can perform any actions you want with the edited value, like saving it to a database.
    alert("Saved value: " + value);
    // Store the value in localStorage
    localStorage.setItem("editableInputValue", value);
  };

  //change value for month
  const [value1, setValue1] = useState(() => {
    // Retrieve the value from localStorage if available, otherwise use the default value
    const storedValue1 = localStorage.getItem("editableInputValue1");
    return storedValue1 !== null ? storedValue1 : "Click to edit";
  });
  const [editable1, setEditable1] = useState(false);

  const handleClick1 = () => {
    setEditable1(true);
  };

  const handleSave1 = () => {
    setEditable1(false);
    // Here you can perform any actions you want with the edited value, like saving it to a database.
    alert("Saved value: " + value1);
    // Store the value in localStorage
    localStorage.setItem("editableInputValue1", value1);
  };

  //change value for period
  const [value2, setValue2] = useState(() => {
    // Retrieve the value from localStorage if available, otherwise use the default value
    const storedValue2 = localStorage.getItem("editableInputValue2");
    return storedValue2 !== null ? storedValue2 : "Click to edit";
  });
  const [editable2, setEditable2] = useState(false);

  const handleClick2 = () => {
    setEditable2(true);
  };

  const handleSave2 = () => {
    setEditable2(false);
    // Here you can perform any actions you want with the edited value, like saving it to a database.
    alert("Saved value: " + value2);
    // Store the value in localStorage
    localStorage.setItem("editableInputValue2", value2);
  };
  //change value for unit no
  const [value3, setValue3] = useState(() => {
    // Retrieve the value from localStorage if available, otherwise use the default value
    const storedValue3 = localStorage.getItem("editableInputValue3");
    return storedValue3 !== null ? storedValue3 : "Click to edit";
  });
  const [editable3, setEditable3] = useState(false);

  const handleClick3 = () => {
    setEditable3(true);
  };

  const handleSave3 = () => {
    setEditable3(false);
    // Here you can perform any actions you want with the edited value, like saving it to a database.
    alert("Saved value: " + value3);
    // Store the value in localStorage
    localStorage.setItem("editableInputValue3", value3);
  };
  //change value for unit name
  const [value4, setValue4] = useState(() => {
    // Retrieve the value from localStorage if available, otherwise use the default value
    const storedValue4 = localStorage.getItem("editableInputValue4");
    return storedValue4 !== null ? storedValue4 : "Click to edit";
  });
  const [editable4, setEditable4] = useState(false);

  const handleClick4 = () => {
    setEditable4(true);
  };

  const handleSave4 = () => {
    setEditable4(false);
    // Here you can perform any actions you want with the edited value, like saving it to a database.
    alert("Saved value: " + value4);
    // Store the value in localStorage
    localStorage.setItem("editableInputValue4", value4);
  };

  useEffect(() => {
    // Update the input field value when the component mounts
    setValue(localStorage.getItem("editableInputValue"));
    setValue1(localStorage.getItem("editableInputValue1"));
    setValue2(localStorage.getItem("editableInputValue2"));
    setValue3(localStorage.getItem("editableInputValue3"));
    setValue4(localStorage.getItem("editableInputValue4"));
  }, []);
  // console.console.log("head1",data);
  let count = 1;
  return (
    <div>
      {/* first sem first page starts here  */}
      <div className="top-header">
        <div className="top-nav-display">
          <CiSaveDown2
            style={{ width: "22px", height: "40px" }}
            onClick={createPDF}
          />
          <LuPrinter
            style={{ width: "22px", height: "40px" }}
            ref={aTagRef}
            onClick={handlePrint}
          />
          <IoMdShare
            style={{ width: "22px", height: "40px" }}
            onClick={() => {
              setShow(true);
            }}
          />
        </div>
        {show ? (
          <>
            <div className="share-button">
              <div>
                <a href={"https://www.whatsapp.com/"}>
                  <IoLogoWhatsapp style={{ width: "25px", height: "35px" }} />
                </a>
              </div>
              <di>
                <a href={"https://www.gmail.com/"}>
                  <MdOutlineEmail style={{ width: "25px", height: "35px" }} />
                </a>
              </di>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2">
          <label htmlFor="">Select Langauge</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="vi_0"
            style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
          >
            <option value="en-t-i0-und">English</option>
            <option value="ne-t-i0-und">Nepali</option>
            <option value="hi-t-i0-und">Hindi</option>
            <option value="kn-t-i0-und">Kannada</option>
            <option value="ta-t-i0-und">Tamil</option>
            <option value="pa-t-i0-und">Punjabi</option>
            <option value="mr-t-i0-und">Marathi</option>
            <option value="ur-t-i0-und">Urdu</option>
            <option value="sa-t-i0-und">Sanskrit</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="">Type here to translate</label>
          <input
            type="text"
            className="vi_0"
            placeholder="Enter Chapter Name"
            onChange={(e) => {
              if (selectedLanguage == "en-t-i0-unb") {
                settext(e.target.value);
              } else onChangeHandler(e.target.value, settext);
            }}
          />
          {selectedLanguage == "en-t-i0-und" ? <></> : <p>{text}</p>}
        </div>
      </div>
      <div className="question-paper-display" style={{ width: "1024px" }}>
        <div className="details-display">
          {/* <div className="top-titles-container">
                        <div className="top-logo">
                            <div>
                                <img src="../Images/logo.png" alt="" style={{ width: "100px" }} />
                            </div>
                            <div className="title-1">
                                <h4>KARNATAKA SCHOOL EXAMINATION AND ASSESSMENT BOARD</h4>
                            </div>
                        </div>
                        <div className="title-2">
                            <h5>KSQAAC, Malleshwaram, Bengaluru-560003</h5>
                        </div>
                        <div className="title-3">
                            <h4>Assessment-March 2023 Syllabus Copy</h4>
                        </div>
                    </div> */}

          <div>
            <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
              {addslybus?.year} {addslybus?.Title}
            </h3>
            <h5 style={{ textAlign: "center" }}>
              {addslybus?.SubClass} - {addslybus?.subject}{" "}
            </h5>
            <h5 style={{ textAlign: "center" }}></h5>
          </div>
          <div>
            <Table
              responsive
              striped
              bordered
              hover
              size="sm"
              style={{ border: "1px solid" }}
            >
              <thead>
                <tr>
                  <th>
                    {editable ? (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value}
                        onClick={handleClick}
                        readOnly
                      />
                    )}
                    {editable && <button onClick={handleSave}>Save</button>}
                  </th>
                  <th>
                    {" "}
                    {editable1 ? (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value1}
                        onClick={handleClick1}
                        readOnly
                      />
                    )}
                    {editable1 && <button onClick={handleSave1}>Save</button>}
                  </th>
                  <th>
                    {" "}
                    {editable2 ? (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value2}
                        onClick={handleClick2}
                        readOnly
                      />
                    )}
                    {editable2 && <button onClick={handleSave2}>Save</button>}
                  </th>
                  <th>
                    {" "}
                    {editable3 ? (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value3}
                        onChange={(e) => setValue3(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value3}
                        onClick={handleClick3}
                        readOnly
                      />
                    )}
                    {editable3 && <button onClick={handleSave3}>Save</button>}
                  </th>
                  <th>
                    {" "}
                    {editable4 ? (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value4}
                        onChange={(e) => setValue4(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <input
                        style={{
                          backgroundColor: "#000080",
                          color: "white",
                          border: "unset",
                        }}
                        type="text"
                        value={value4}
                        onClick={handleClick4}
                        readOnly
                      />
                    )}
                    {editable4 && <button onClick={handleSave4}>Save</button>}
                  </th>
                </tr>
                <tr>
                  <th>{addslybus?.head}</th>
                  <th>{addslybus?.head1}</th>
                  <th>{addslybus?.head2}</th>
                  <th>{addslybus?.head3}</th>
                  <th>{addslybus?.head4}</th>
                </tr>
              </thead>
              <tbody>
                {addslybus?.SyllabusDetails?.sort((a, b) => {
                  // Convert the strings to numbers and then compare them
                  return (
                    parseInt(a?.unitArr[0]?.realMonth?.split("-").join("")) -
                    parseInt(b?.unitArr[0]?.realMonth?.split("-").join(""))
                  );
                }).map((item, i) => {
                  return (
                    <>
                      {" "}
                      {item?.Examinationname == "Sa-01" ||
                      item?.Examinationname == "Sa-02" ? (
                        <></>
                      ) : (
                        <tr>
                          <td>{count++}</td>

                          <td>
                            {item?.unitArr?.map((ele) => {
                              return <p>{ele?.Months}</p>;
                            })}
                          </td>
                          <td>
                            {item?.unitArr?.map((ele) => {
                              return <p>{ele?.period}</p>;
                            })}
                          </td>
                          <td>
                            {item?.unitArr?.map((ele) => {
                              return <p>{ele?.chapterno}</p>;
                            })}
                          </td>
                          <td>
                            {item?.unitArr?.map((ele) => {
                              return <p>{ele?.ChapterName}</p>;
                            })}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colspan="5">
                          <table class="table mb-0">
                            {item?.Assessment}({item?.Examinationname}){" "}
                            {item?.from} to {item?.to}
                          </table>
                        </td>
                      </tr>
                    </>
                  );
                })}

                {/* <tr>
                  <td>2</td>
                  <td>2</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>4</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>5</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>6</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>7</td>
                  <td>7</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>8</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>9</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>10</td>
                  <td>10</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>11</td>
                  <td>11</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>12</td>
                  <td>12</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>13</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>14</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>15</td>
                  <td>15</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>16</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>17</td>
                  <td>17</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>18</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>19</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>20</td>
                  <td>20</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>21</td>
                  <td>21</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>22</td>
                  <td>22</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>23</td>
                  <td>23</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>24</td>
                  <td>24</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>

                <tr>
                  <td>25</td>
                  <td>25</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>26</td>
                  <td>26</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>27</td>
                  <td>27</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>28</td>
                  <td>28</td>
                  <td>Chapter Name</td>
                  <td></td>
                  <td>10</td>
                </tr> */}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* secod sem first page starts here 
            <div className='question-paper-display'>
                <div className='details-display'>
                    <div className="top-titles-container">
                        <div className="top-logo">
                            <div>
                                <img src="../Images/logo.png" alt="" style={{ width: "100px" }} />
                            </div>
                            <div className="title-1">
                                <h4>KARNATAKA SCHOOL EXAMINATION AND ASSESSMENT BOARD</h4>
                            </div>
                        </div>
                        <div className="title-2">
                            <h5>KSQAAC, Malleshwaram, Bengaluru-560003</h5>
                        </div>
                        <div className="title-3">
                            <h4>Assessment-March 2023 Syllabus Copy</h4>
                        </div>
                    </div>

                    <div className="class-details">
                        <div className="class-data">
                            <b>Class : 8</b>
                        </div>
                        <div className="class-data">
                            <b>Subject: First Language English</b>
                        </div>
                        <div>
                            <div className="class-data">
                                <b>Marks: 40</b>
                            </div>
                            <div className="class-data">
                                <b>Time: 2 Hours</b>
                            </div>
                        </div>
                    </div>
                    <div >
                        <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Annual Lession Plan for 2024-25</h3>
                        <h5 style={{ textAlign: "center" }}>8th Standard</h5>
                        <h5 style={{ textAlign: "center" }}>2nd Semester</h5>

                    </div>
                    <div>
                        <Table responsive striped bordered hover size='sm' style={{ border: "1px solid" }}>
                            <thead>
                                <tr>
                                    <th>SL. No.</th>
                                    <th>Chapter Number</th>
                                    <th>Chapter Name</th>
                                    <th>Description</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>2</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>3</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>4</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>5</td>
                                    <td>5</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>6</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>7</td>
                                    <td>7</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>8</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>9</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>11</td>
                                    <td>11</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>12</td>
                                    <td>12</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>13</td>
                                    <td>13</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>14</td>
                                    <td>14</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>15</td>
                                    <td>15</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>16</td>
                                    <td>16</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>17</td>
                                    <td>17</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>18</td>
                                    <td>18</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>19</td>
                                    <td>19</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>20</td>
                                    <td>20</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                
                                 <tr>
                                    <td>21</td>
                                    <td>21</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>22</td>
                                    <td>22</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>23</td>
                                    <td>23</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>24</td>
                                    <td>24</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <td>25</td>
                                    <td>25</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>26</td>
                                    <td>26</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>27</td>
                                    <td>27</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>28</td>
                                    <td>28</td>
                                    <td>Chapter Name</td>
                                    <td></td>
                                    <td>10</td>
                                </tr>

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default Adminslybuscopyview;
