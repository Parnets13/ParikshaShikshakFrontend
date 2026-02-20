import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Spinner, Form, Badge } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch, BsToggleOn, BsToggleOff, BsPlusCircle } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import Button2 from "../Button2";

const SetSubscription = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => { setShow(false); resetForm(); };
  const handleShow = () => setShow(true);
  const handleClose1 = () => { setShow1(false); resetForm(); };
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Form states
  const [subscriptionName, setSubscriptionName] = useState("");
  const [selectedSubclass, setSelectedSubclass] = useState("");
  const [selectedSubclassName, setSelectedSubclassName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]); // {examId, examName, subjectId, subjectName, questionPapers}
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Temp states for adding new item
  const [tempExam, setTempExam] = useState("");
  const [tempSubject, setTempSubject] = useState("");
  const [tempPapers, setTempPapers] = useState(1);

  // Data states
  const [subclasses, setSubclasses] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [nochangedata, setNochangedata] = useState([]);
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const resetForm = () => {
    setSubscriptionName("");
    setSelectedSubclass("");
    setSelectedSubclassName("");
    setSelectedItems([]);
    setPrice("");
    setDescription("");
    setEditId("");
    setTempExam("");
    setTempSubject("");
    setTempPapers(1);
  };

  const getSubclasses = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass");
      if (res.status === 200) setSubclasses(res.data.success);
    } catch (error) { console.log(error); }
  };

  const getExaminations = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllNameExamination");
      if (res.status === 200) setExaminations(res.data.success);
    } catch (error) { console.log(error); }
  };

  const getSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllSujects");
      if (res.status === 200) setSubjects(res.data.success);
    } catch (error) { console.log(error); }
  };

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8774/api/admin/getAllSubscriptions");
      if (res.status === 200) {
        const validData = (res.data.success || []).filter((item) => item && item._id && item.subscriptionName);
        setSubscriptions(validData);
        setNochangedata(validData);
      }
    } catch (error) { console.log(error); }
    finally { setLoading(false); }
  };

  const handleSubclassChange = (e) => {
    const subclassId = e.target.value;
    setSelectedSubclass(subclassId);
    const subclass = subclasses.find((s) => s._id === subclassId);
    if (subclass) setSelectedSubclassName(subclass.subclassName);
  };

  // Add exam+subject combination
  const addExamSubjectItem = () => {
    if (!tempExam) return swal({ title: "Error", text: "Please select an examination", icon: "error" });
    if (!tempSubject) return swal({ title: "Error", text: "Please select a subject", icon: "error" });
    if (!tempPapers || tempPapers < 1) return swal({ title: "Error", text: "Please enter valid number of papers", icon: "error" });

    const exam = examinations.find((e) => e._id === tempExam);
    const subject = subjects.find((s) => s._id === tempSubject);

    // Check if this combination already exists
    const exists = selectedItems.find(
      (item) => item.examinationId === tempExam && item.subjectId === tempSubject
    );
    if (exists) return swal({ title: "Error", text: "This exam + subject combination already added", icon: "error" });

    setSelectedItems([
      ...selectedItems,
      {
        examinationId: tempExam,
        examinationName: exam?.NameExamination || "",
        subjectId: tempSubject,
        subjectName: subject?.subjectName || "",
        questionPapers: parseInt(tempPapers),
      },
    ]);

    // Reset temp fields
    setTempExam("");
    setTempSubject("");
    setTempPapers(1);
  };

  // Remove item
  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const addSubscription = async () => {
    if (!subscriptionName) return swal({ title: "Error", text: "Please enter subscription name", icon: "error" });
    if (!selectedSubclass) return swal({ title: "Error", text: "Please select a subclass", icon: "error" });
    if (selectedItems.length === 0) return swal({ title: "Error", text: "Please add at least one exam + subject", icon: "error" });
    if (!price || price < 0) return swal({ title: "Error", text: "Please enter valid price", icon: "error" });

    try {
      setLoading(true);
      const config = {
        url: "/admin/addSubscription",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
        data: {
          subscriptionName,
          subclassId: selectedSubclass,
          subclassName: selectedSubclassName,
          examinations: selectedItems,
          price: parseFloat(price),
          description,
          authId: admin?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        handleClose();
        getSubscriptions();
        swal({ title: "Success!", text: res.data.success, icon: "success" });
      }
    } catch (error) {
      console.log(error);
      swal({ title: "Error!", text: error.response?.data?.error || "Something went wrong", icon: "error" });
    } finally { setLoading(false); }
  };

  const editSubscription = async () => {
    if (!subscriptionName) return swal({ title: "Error", text: "Please enter subscription name", icon: "error" });
    if (!selectedSubclass) return swal({ title: "Error", text: "Please select a subclass", icon: "error" });
    if (selectedItems.length === 0) return swal({ title: "Error", text: "Please add at least one exam + subject", icon: "error" });
    if (!price || price < 0) return swal({ title: "Error", text: "Please enter valid price", icon: "error" });

    try {
      setLoading(true);
      const config = {
        url: "/admin/updateSubscription",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
        data: {
          id: editId,
          subscriptionName,
          subclassId: selectedSubclass,
          subclassName: selectedSubclassName,
          examinations: selectedItems,
          price: parseFloat(price),
          description,
          authId: admin?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        handleClose1();
        getSubscriptions();
        swal({ title: "Success!", text: res.data.success, icon: "success" });
      }
    } catch (error) {
      console.log(error);
      swal({ title: "Error!", text: error.response?.data?.error || "Something went wrong", icon: "error" });
    } finally { setLoading(false); }
  };

  const deleteSubscription = async () => {
    try {
      setLoading(true);
      const config = {
        url: `/admin/deleteSubscription/${deleteId}/${admin?._id}`,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        getSubscriptions();
        swal({ title: "Success!", text: res.data.success, icon: "success" });
      }
    } catch (error) {
      console.log(error);
      swal({ title: "Error!", text: error.response?.data?.error || "Something went wrong", icon: "error" });
    } finally { setLoading(false); }
  };

  const toggleStatus = async (id) => {
    try {
      setLoading(true);
      const config = {
        url: `/admin/toggleSubscriptionStatus/${id}/${admin?._id}`,
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios(config);
      if (res.status === 200) {
        getSubscriptions();
        swal({ title: "Success!", text: res.data.success, icon: "success" });
      }
    } catch (error) {
      console.log(error);
      swal({ title: "Error!", text: error.response?.data?.error || "Something went wrong", icon: "error" });
    } finally { setLoading(false); }
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value !== "") {
      const filtered = nochangedata.filter((o) =>
        Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(value.toLowerCase()))
      );
      setSubscriptions([...filtered]);
    } else {
      setSubscriptions([...nochangedata]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = subscriptions.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(subscriptions.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const prevPage = () => { if (currentPage !== 1) setCurrentPage(currentPage - 1); };
  const nextPage = () => { if (currentPage !== totalPages) setCurrentPage(currentPage + 1); };

  useEffect(() => {
    getSubclasses();
    getExaminations();
    getSubjects();
    getSubscriptions();
  }, []);

  const populateEditForm = (item) => {
    setEditId(item._id);
    setSubscriptionName(item.subscriptionName);
    setSelectedSubclass(item.subclassId?._id || item.subclassId);
    setSelectedSubclassName(item.subclassName);
    setSelectedItems(item.examinations || []);
    setPrice(item.price);
    setDescription(item.description || "");
    handleShow1();
  };

  // Filter subjects based on selected subclass
  // Shows all subjects that match the class number (e.g., "10") regardless of medium
  const getFilteredSubjects = () => {
    if (!selectedSubclass) return [];
    
    // Get the selected subclass details
    const selectedSubclassObj = subclasses.find(s => s._id === selectedSubclass);
    if (!selectedSubclassObj) return [];
    
    // Extract the class number from subclassName (e.g., "10" from "ಪ್ರೌಢಶಾಲೆ - 10 (ಕನ್ನಡ)")
    const selectedClassNumber = selectedSubclassObj.subclassName;
    
    const filtered = subjects.filter((sub) => {
      // First try exact subClass ID match
      let subClassId;
      if (sub.subClass && typeof sub.subClass === 'object') {
        subClassId = sub.subClass._id;
      } else {
        subClassId = sub.subClass;
      }
      
      if (String(subClassId || '') === String(selectedSubclass)) {
        return true;
      }
      
      // If no exact match, try matching by class number
      // Get the subclass object for this subject
      let subjectSubclassName = '';
      if (sub.subClass && typeof sub.subClass === 'object') {
        subjectSubclassName = sub.subClass.subclassName || '';
      } else {
        // Find the subclass from our list
        const subjectSubclass = subclasses.find(s => String(s._id) === String(sub.subClass));
        subjectSubclassName = subjectSubclass?.subclassName || '';
      }
      
      // Compare class numbers (e.g., both are "10")
      return subjectSubclassName === selectedClassNumber;
    });
    
    return filtered;
  };

  // Render Add Item Form
  const renderAddItemForm = () => {
    const filteredSubjects = getFilteredSubjects();
    
    return (
    <div className="p-3 mb-3" style={{ border: "2px dashed #26AAE0", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
      <h6 className="mb-3" style={{ color: "#26AAE0" }}>Add Exam + Subject</h6>
      {!selectedSubclass && (
        <p className="text-warning mb-2" style={{ fontSize: "13px" }}>⚠️ Please select a subclass first to see available subjects</p>
      )}
      <div className="row">
        <div className="col-md-4">
          <label style={{ fontSize: "13px" }}>Examination *</label>
          <select className="form-control form-control-sm" value={tempExam} onChange={(e) => setTempExam(e.target.value)}>
            <option value="">--Select Exam--</option>
            {examinations?.map((exam) => (
              <option key={exam._id} value={exam._id}>{exam.NameExamination}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label style={{ fontSize: "13px" }}>Subject *</label>
          <select 
            className="form-control form-control-sm" 
            value={tempSubject} 
            onChange={(e) => setTempSubject(e.target.value)}
            disabled={!selectedSubclass}
          >
            <option value="">--Select Subject--</option>
            {filteredSubjects?.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.subjectName}</option>
            ))}
          </select>
          {selectedSubclass && filteredSubjects.length === 0 && (
            <small className="text-muted">No subjects found for this class</small>
          )}
        </div>
        <div className="col-md-2">
          <label style={{ fontSize: "13px" }}>Papers *</label>
          <input type="number" className="form-control form-control-sm" min="1" value={tempPapers} onChange={(e) => setTempPapers(e.target.value)} />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <Button variant="success" size="sm" onClick={addExamSubjectItem} className="w-100">
            <BsPlusCircle className="me-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
  };

  // Render Selected Items
  const renderSelectedItems = () => (
    selectedItems.length > 0 && (
      <div className="mb-3">
        <label className="mb-2">Added Items:</label>
        <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "10px" }}>
          {selectedItems.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-between mb-2 p-2" style={{ backgroundColor: "#e8f5e9", borderRadius: "5px" }}>
              <div>
                <Badge bg="primary" className="me-2">{item.examinationName}</Badge>
                <Badge bg="info" className="me-2">{item.subjectName}</Badge>
                <Badge bg="success">{item.questionPapers} Papers</Badge>
              </div>
              <AiFillDelete className="text-danger" style={{ cursor: "pointer", fontSize: "18px" }} onClick={() => removeItem(idx)} />
            </div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <>
      {loading && (
        <div className="loader-container" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <div className="col-lg-4 d-flex justify-content-center mb-3">
        <div className="input-group">
          <span className="input-group-text"><BsSearch /></span>
          <input type="text" className="form-control" placeholder="Search..." onChange={handleFilter} />
        </div>
      </div>

      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c">Set Subscription</h2>
          <Button2 text={"Add Subscription"} onClick={handleShow} />
        </div>

        <div className="mb-3 mt-3">
          <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subscription Name</th>
                <th>Subclass</th>
                <th>Exams & Subjects</th>
                <th>Price (₹)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((item, i) => (
                <tr key={item._id}>
                  <td>{firstIndex + i + 1}</td>
                  <td>{item.subscriptionName}</td>
                  <td>{item.subclassName}</td>
                  <td>
                    {item.examinations?.map((exam, idx) => (
                      <div key={idx} className="mb-1">
                        <Badge bg="primary" className="me-1">{exam.examinationName}</Badge>
                        <Badge bg="info" className="me-1">{exam.subjectName}</Badge>
                        <Badge bg="success">{exam.questionPapers}P</Badge>
                      </div>
                    ))}
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <span style={{ cursor: "pointer" }} onClick={() => toggleStatus(item._id)}>
                      {item.isActive ? <BsToggleOn style={{ fontSize: "24px", color: "green" }} /> : <BsToggleOff style={{ fontSize: "24px", color: "gray" }} />}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <BiSolidEdit className="text-success" style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => populateEditForm(item)} />
                      <AiFillDelete className="text-danger" style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => { setDeleteId(item._id); handleShow2(); }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <div>
          <nav>
            <ul className="pagination">
              <li className="not-allow"><span className="next-prev" onClick={prevPage}>&lt;</span></li>
              {numbers.map((n, i) => (
                <li className="active-next" key={i}>
                  <a href="#" className={currentPage === n ? "active" : "inactive"} onClick={() => setCurrentPage(n)}>{n}</a>
                </li>
              ))}
              <li className="not-allow"><span className="next-prev" onClick={nextPage}>&gt;</span></li>
            </ul>
          </nav>
        </div>

        {/* Add Modal */}
        <Modal show={show} onHide={handleClose} size="lg" style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Add Subscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Subscription Name *</label>
                  <input type="text" className="vi_0" placeholder="Enter subscription name" value={subscriptionName} onChange={(e) => setSubscriptionName(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Select Subclass *</label>
                  <select className="vi_0" value={selectedSubclass} onChange={handleSubclassChange}>
                    <option value="">--Select Subclass--</option>
                    {subclasses?.map((item) => (
                      <option key={item._id} value={item._id}>{item.className} - {item.subclassName} ({item.mediumName})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                {renderAddItemForm()}
                {renderSelectedItems()}
              </div>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Price (₹) *</label>
                  <input type="number" className="vi_0" placeholder="Enter price" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label>Description (Optional)</label>
                  <textarea className="vi_0" placeholder="Enter description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="success" onClick={addSubscription}>Add Subscription</Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={show1} onHide={handleClose1} size="lg" style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Edit Subscription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Subscription Name *</label>
                  <input type="text" className="vi_0" placeholder="Enter subscription name" value={subscriptionName} onChange={(e) => setSubscriptionName(e.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Select Subclass *</label>
                  <select className="vi_0" value={selectedSubclass} onChange={handleSubclassChange}>
                    <option value="">--Select Subclass--</option>
                    {subclasses?.map((item) => (
                      <option key={item._id} value={item._id}>{item.className} - {item.subclassName} ({item.mediumName})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                {renderAddItemForm()}
                {renderSelectedItems()}
              </div>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Price (₹) *</label>
                  <input type="number" className="vi_0" placeholder="Enter price" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label>Description (Optional)</label>
                  <textarea className="vi_0" placeholder="Enter description" rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>Close</Button>
            <Button variant="success" onClick={editSubscription}>Update Subscription</Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}
        <Modal show={show2} onHide={handleClose2} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton><Modal.Title>Warning</Modal.Title></Modal.Header>
          <Modal.Body><p className="fs-4" style={{ color: "red" }}>Are you sure you want to delete this subscription?</p></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>Close</Button>
            <Button variant="danger" onClick={deleteSubscription}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default SetSubscription;
