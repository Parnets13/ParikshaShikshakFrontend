import React, { useState } from "react";
import { Button, Container, InputGroup, Row, Modal } from "react-bootstrap";
import "../BluePrint/BluePrint.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BluePrint3 = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <div>
      <div
        style={{ backgroundColor: "aliceblue", position: "sticky", top: "0px" }}
      >
        <div>
          <div>
            <div style={{ fontSize: "22px", textAlign: "center" }}>
              Section-A
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                fontSize: "20px",
              }}
            >
              <div>I. </div>
              <div>
                <b>Header</b>
              </div>
            </div>
          </div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                backgroundColor: "white",
                borderRadius: "15px",
                justifyContent: "space-between",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="Add-button"
                    onClick={handleShow1}
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="Add-button"
                    onClick={handleShow1}
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                backgroundColor: "white",
                borderRadius: "15px",
                justifyContent: "space-between",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="Add-button"
                    onClick={handleShow1}
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div style={{ fontSize: "22px", textAlign: "center" }}>
              Section-B
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                fontSize: "20px",
              }}
            >
              <div>I. </div>
              <div>
                <b>Header</b>
              </div>
            </div>
          </div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "15px",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div style={{ fontSize: "22px", textAlign: "center" }}>
              Section-C
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                fontSize: "20px",
              }}
            >
              <div>I. </div>
              <div>
                <b>Header</b>
              </div>
            </div>
          </div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                borderRadius: "15px",
                background: "white ",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "#dfdfdf",
                borderRadius: "15px",
              }}
            >
              <div className="card-container">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <h6 className="card-title">Question Number - 1</h6>
                    <h6 className="card-title">
                      {" "}
                      <b>Circle</b>
                    </h6>
                    <h6>Multiple Choise Question</h6>
                    <h6>Very Short Answer</h6>
                    <h6>Eassy</h6>
                    <h6>Marks : 1</h6>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <div style={{ margin: "10px 0" }}>
                  <Button
                    variant=""
                    className="edit-button"
                    onClick={handleShow}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    onClick={handleShow1}
                    variant=""
                    className="Add-button"
                  >
                    Add Internal Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="blueprint-box">
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                border: "1px solid lightgray",
                width: "100%",
                padding: "0 20px",
                background: "white",
                borderRadius: "15px",
              }}
            >
              <h5 style={{ padding: "10px 30px" }}>Instruction</h5>
              <CKEditor editor={ClassicEditor} className="vi_0" />

              {/* <div style={{ margin: "auto" }}>
                <Button variant='' className='edit-button'>Add</Button>
            </div> */}
            </div>
            <div className="qp-end-buttons">
              <div>
                <select
                  id="fontSelector"
                  onchange="changeFontFamily(this.value)"
                  style={{ padding: "5px 8px", borderRadius: "6px" }}
                >
                  <option value="Arial, sans-serif">Select Font Family</option>
                  <option value="Arial, sans-serif">Arial, sans-serif</option>
                  <option value="Helvetica, sans-serif">
                    Helvetica, sans-serif
                  </option>
                  <option value="Georgia, serif">Georgia, serif</option>
                  <option value="Times New Roman, serif">
                    Times New Roman, serif
                  </option>
                  <option value="Courier New, monospace">
                    Courier New, monospace
                  </option>
                  <option value="Verdana, sans-serif">
                    Verdana, sans-serif
                  </option>
                  <option value="Trebuchet MS, sans-serif">
                    Trebuchet MS, sans-serif
                  </option>
                  <option value="Palatino, serif">Palatino, serif</option>
                  <option value="Impact, sans-serif">Impact, sans-serif</option>
                  <option value="Garamond, serif">Garamond, serif</option>
                  <option value="Comic Sans MS, cursive">
                    Comic Sans MS, cursive
                  </option>
                  <option value="Arial Black, sans-serif">
                    Arial Black, sans-serif
                  </option>
                  <option value="Courier, monospace">Courier, monospace</option>
                  <option value="Lucida Console, monospace">
                    Lucida Console, monospace
                  </option>
                  <option value="Book Antiqua">Book Antiqua</option>
                  <option value="Palatino">Palatino</option>
                  <option value="Palatino Linotype, Book Antiqua, Palatino, serif">
                    Palatino Linotype
                  </option>
                  <option value="Roboto, sans-serif">Roboto, sans-serif</option>
                  <option value="Open Sans, sans-serif">
                    Open Sans, sans-serif
                  </option>
                  <option value="Montserrat, sans-serif">
                    Montserrat, sans-serif
                  </option>
                  <option value="Lato, sans-serif">Lato, sans-serif</option>
                  <option value="Cursive, fantasy">Cursive, fantasy</option>
                  <option value="Frank Ruhl Libre, serif">
                    Frank Ruhl Libre, serif
                  </option>
                  <option value="Indie Flower, cursive">
                    Indie Flower, cursive
                  </option>
                  <option value="Dancing Script, cursive">
                    Dancing Script, cursive
                  </option>
                  <option value="Avenir, sans-serif">Avenir, sans-serif</option>
                  <option value="Baskerville, Baskerville Old Face, Hoefler Text, Garamond, Times New Roman, serif">
                    Baskerville, Hoefler Text,{" "}
                  </option>
                  <option value="Helvetica Neue, Helvetica, Arial, sans-serif">
                    Helvetica Neue{" "}
                  </option>
                  <option value="Futura, sans-serif">Futura, sans-serif</option>
                </select>
              </div>
              <div>
                <select
                  id="fontSelector"
                  onchange="changeFontFamily(this.value)"
                  style={{ padding: "5px 8px", borderRadius: "6px" }}
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="12px">22px</option>
                  <option value="14px">24px</option>
                  <option value="16px">26px</option>
                  <option value="18px">28px</option>
                  <option value="20px">30px</option>
                  <option value="20px">32px</option>
                  <option value="14px">34px</option>
                  <option value="16px">36px</option>
                  <option value="18px">38px</option>
                  <option value="20px">40px</option>
                  <option value="12px">42px</option>
                  <option value="14px">44px</option>
                  <option value="16px">46px</option>
                  <option value="18px">48px</option>
                  <option value="20px">50px</option>
                  <option value="12px">52px</option>
                  <option value="14px">54px</option>
                  <option value="16px">56px</option>
                  <option value="18px">58px</option>
                  <option value="20px">60px</option>
                  <option value="20px">Small</option>
                  <option value="20px">Bold</option>
                  <option value="20px">Large</option>
                </select>
              </div>
              <div>
                <a href="/questionpaper">
                  <Button
                    variant=""
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    View
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 mb-4">
            {/* <select className='selct-cls'>
        <option>Select Question Number</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select> */}
            <input
              type="text"
              className="form-control"
              placeholder="Question : 1"
              disabled
              style={{ background: "none" }}
            />
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Chapter Name</option>
              <option>Chapter Name1</option>
              <option>Chapter Name2</option>
              <option>Chapter Name3</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Type of Question</option>
              <option>Multiple question</option>
              <option>Grammer</option>
              <option>Objectives</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Answer Level</option>
              <option>Very Short Answer</option>
              <option>Very Long Answer</option>
              <option>short Answer</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Dificulty Level</option>
              <option>Eassy</option>
              <option>Medium</option>
              <option>Dificulty</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            {/* <select className='selct-cls'>
        <option>Select Marks</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
    </select> */}
            <input
              type="text"
              className="form-control"
              placeholder="Marks : 1"
              disabled
              style={{ background: "none" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Internal question Modal  */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12 mb-4">
            {/* <select className='selct-cls'>
        <option>Select Question Number</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select> */}
            <input
              type="text"
              className="form-control"
              placeholder="Question : 1"
              disabled
              style={{ background: "none" }}
            />
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Chapter Name</option>
              <option>Chapter Name1</option>
              <option>Chapter Name2</option>
              <option>Chapter Name3</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Type of Question</option>
              <option>Multiple question</option>
              <option>Grammer</option>
              <option>Objectives</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Available Question</option>
              <option>Very Short Answer</option>
              <option>Very Long Answer</option>
              <option>short Answer</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Answer Level</option>
              <option>Very Short Answer</option>
              <option>Very Long Answer</option>
              <option>short Answer</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            <select className="selct-cls">
              <option>Select Dificulty Level</option>
              <option>Eassy</option>
              <option>Medium</option>
              <option>Dificulty</option>
            </select>
          </div>
          <div className="col-12 mb-4">
            {/* <select className='selct-cls'>
        <option>Select Marks</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
    </select> */}
            <input
              type="text"
              className="form-control"
              placeholder="Marks : 1"
              disabled
              style={{ background: "none" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BluePrint3;
