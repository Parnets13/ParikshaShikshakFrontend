import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";
import { debounce } from "lodash";
import Button2 from "../Button2";
import { Link } from "react-router-dom";
const AdminBoard = () => {
  const ThemeContext = React.createContext();
  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //   DateRange Filter
  const [data, setData] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const filterData = () => {
    if (!startDate) return alert("Please select from date");
    if (!endDate) return alert("Please select to date");
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item?.createdAt);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
    setData([...filteredData]);
  };

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  // Language Translater
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

  // Post method Integration
  const [mediumName, setmediumName] = useState("");
  const [boardName, setboardName] = useState("");
  const AddBoradname = async () => {
    try {
      if (!mediumName)
        return swal({
          title: "Opps!",
          text: "Please Enter boardName ",
          icon: "error",
          button: "Try Again!",
        });
      if (!boardName)
        return swal({
          title: "Opps!",
          text: "Please Enter boardName ",
          icon: "error",
          button: "Try Again!",
        });
      const config = {
        url: "/admin/addBoard",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          boardName: boardName,
          authId: admin?._id,
        },
      };
      const response = await axios(config);

      if (response.status === 200) {
        swal({
          title: "Success!",
          text: response.data.success,
          icon: "success",
          button: "OK!",
        });
        handleClose();
        getallboardname();
      }
    } catch (error) {
      console.error(error);
      swal({
        title: "Opps!",
        text: error.response.data.error,
        icon: "error",
        button: "Try Again!",
      });
    }
  };
  //get method for medium
  const [Medium, setMedium] = useState([]);
  // const [nochangedata, setnochangedata] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMedium(res.data.success);
        // setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get method
  const [getboardname, setboardname] = useState([]);
  const getallboardname = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllBoard"
      );
      if (res.status == 200) {
        setboardname(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // edit method
  const [updateboardname, setupdateboardname] = useState("");
  const updateallboardname = async () => {
    try {
      const config = {
        url: "/admin/updateBoard",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          boardName: boardName,
          authId: admin?._id,
          id: updateboardname?._id,
        },
      };
      const res = await axios(config);
      if (res.status == 200) {
        handleClose1();
        getallboardname();
        return swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };
  // delete method
  const [deleteA, setDeleteA] = useState("");
  const deleteboard = async () => {
    try {
      const config = {
        url: "/admin/deleteBoard/" + deleteA + "/" + admin?._id,
        baseURL: "http://localhost:8774/api",
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        getallboardname();
        return swal({
          title: "Delete!",
          text: res.data.success,
          icon: "warning",
          button: "OK!",
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getallboardname();
    getAddMedium();
  }, []);
  console.log(getboardname);
  // Pagination
  // const [pageNumber, setPageNumber] = useState(0);
  // const productPerPage = 5;
  // const visitedPage = pageNumber * productPerPage;
  // const displayPage = getboardname.slice(
  //   visitedPage,
  //   visitedPage + productPerPage
  // );
  // const pageCount = Math.ceil(getboardname.length / productPerPage);

  // newpagination
  const [data1, setData1] = useState([]);
  const [Products, setProducts] = useState();

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 6;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = getboardname.slice(firstIndex, lastIndex);
  const npages = Math.ceil(getboardname.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage(id);
  }

  function prevpage() {
    if (currenpage !== firstIndex) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage !== lastIndex) {
      setCurrentpage(currenpage + 1);
    }
  }

  // useEffect(()=>{
  //   getAddMedium();
  // })

  return (
    <>
      {/* <div className="col-lg-4 d-flex justify-content-center">
        <div class="input-group ">
          <span class="input-group-text" id="basic-addon1">
            <BsSearch />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-describedby="basic-addon1"
          />
        </div>
      </div> */}
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
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Board</h2>

          <Link onClick={handleShow}>
            <Button2 text={"Add Board"} />
          </Link>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Medium</th>
                <th>
                  <div>Name Of The Board</div>
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((val, i) => {
                return (
                  <tr key={i} style={{ textAlign: "center" }}>
                    <td>{i + 1 + firstIndex} </td>
                    <td>{val?.mediumName}</td>
                    <td>
                      <p>{val?.boardName}</p>
                    </td>

                    <td>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow1();
                              setupdateboardname(val);
                              setboardName(val?.boardName);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setDeleteA(val?._id);
                              handleShow2(val?._id);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* <Pagination style={{ float: "right" }}>
          <Pagination.First onClick={() => setPageNumber(0)} />
          <Pagination.Prev
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
          />
          {Array.from({ length: pageCount }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index === pageNumber}
              onClick={() => setPageNumber(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
            }
          />
          <Pagination.Last onClick={() => setPageNumber(pageCount - 1)} />
        </Pagination> */}

        <div>
          <nav>
            <ul className="pagination">
              <li className="not-allow">
                <span>
                  <li className="next-prev">
                    <a
                      onClick={() => {
                        prevpage();
                      }}
                    >
                      &lt;
                    </a>{" "}
                  </li>
                </span>
              </li>
              {numbers?.map((n, i) => {
                return (
                  <li className="active-next" key={i}>
                    <a
                      href="#"
                      className="inactive"
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </a>
                  </li>
                );
              })}

              <li className="not-allow">
                <span>
                  <li
                    className="next-prev"
                    onClick={() => {
                      nextpage();
                    }}
                  >
                    &gt;{" "}
                  </li>
                </span>
              </li>
            </ul>
          </nav>
        </div>

        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "white" }}>Add Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Medium</label>
                <select
                  className="vi_0"
                  onChange={(e) => setmediumName(e.target.value)}
                >
                  <option value="">--Select medium--</option>
                  {Medium?.map((item) => {
                    return (
                      <option value={item?.mediumName}>
                        {item?.mediumName}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  type="text"
                  placeholder="Enter Medium"
                  className="vi_0"
                  onChange={(e) =>
                    {
                      if(selectedLanguage == "en-t-i0-und"){
                        setmediumName(e.target.value)
                      }else onChangeHandler(e.target.value,setmediumName )
                    }                  
                  }
                />
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{mediumName}</p>} */}
              </div>
              <div className="do-sear mt-2">
                <label>Name of the Board</label>
                <input
                  type="text"
                  placeholder="Enter Board"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setboardName(e.target.value);
                    } else onChangeHandler(e.target.value, setboardName);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{boardName}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                variant=""
                className="modal-close-btn"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  AddBoradname();
                }}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "white" }}>Edit Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Medium</label>
                <select
                  className="vi_0"
                  onChange={(e) => setmediumName(e.target.value)}
                >
                  <option value="">--Select medium--</option>
                  {Medium?.map((item) => {
                    return (
                      <option value={item?.mediumName}>
                        {item?.mediumName}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  type="text"
                  placeholder="Enter Medium"
                  className="vi_0"
                  onChange={(e) =>
                    {
                      if(selectedLanguage == "en-t-i0-und"){
                        setmediumName(e.target.value)
                      }else onChangeHandler(e.target.value,setmediumName )
                    }                  
                  }
                />
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{mediumName}</p>} */}
              </div>
              <div className="do-sear mt-2">
                <label>Name of the Board</label>
                <input
                  type="text"
                  placeholder={updateboardname?.boardName}
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setboardName(e.target.value);
                    } else onChangeHandler(e.target.value, setboardName);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{boardName}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={() => {
                updateallboardname();
              }}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Warning delete modal  */}
        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure you want to delete this data?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={deleteboard}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminBoard;
