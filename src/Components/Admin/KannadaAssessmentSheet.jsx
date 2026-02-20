import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const customStyles = `
  .table-custom-border {
    border: 2px solid #000 !important;
    border-collapse: collapse !important;
  }
  .cell-custom-border {
    border: 1px solid #000 !important;
    border-collapse: collapse !important;
  }
  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  .kannada-font {
    font-family: 'Noto Sans Kannada', sans-serif;
  }
`;

const KannadaAssessmentSheet = () => {
  const [headerData] = useState({
    lessonName: "ಪಾಠದ ಹೆಸರು:-",
    taluk: "ತಾಲ್ಲೂಕು:-",
    district: "ಜಿಲ್ಲೆ:-",
    title: "ಶಿಕ್ಷಕರ ಸಿ.ಆರ್.ಸಿ ಚಟುವಟಿಕೆ ಆಧಾರಿತ ಪ್ರಶ್ನೆಕೆ ಅಂಕಪಟ್ಟಿ 2024-25",
    subject: "ವಿಷಯ:- ಕನ್ನಡ(ಪ್ರಥಮ)",
    grade: "ತರಗತಿ: 1",
    teacherName: "ನಿಯಮ ಶಿಕ್ಷಕರ ಹೆಸರು:-"
  });

  return (
    <div className="container-fluid mt-4 kannada-font">
      <style>{customStyles}</style>
      
      {/* Header Table */}
      <Table bordered className="text-center table-custom-border">
        <thead>
          <tr>
            <th className="cell-custom-border w-50">{headerData.lessonName}</th>
            <th className="cell-custom-border w-25">{headerData.taluk}</th>
            <th className="cell-custom-border w-25">{headerData.district}</th>
          </tr>
          <tr>
            <td colSpan={3} className="text-center cell-custom-border">
              {headerData.title}
            </td>
          </tr>
          <tr>
            <td className="cell-custom-border">{headerData.subject}</td>
            <td className="cell-custom-border">{headerData.grade}</td>
            <td className="cell-custom-border">{headerData.teacherName}</td>
          </tr>
        </thead>
      </Table>

      {/* Main Assessment Table */}
      <Table bordered className="text-center table-custom-border mt-2">
        <thead>
          <tr>
            <th rowSpan={3} className="cell-custom-border vertical-text" style={{ width: "5%" }}>
              ಕ್ರ.ಸಂಖ್ಯೆ
            </th>
            <th rowSpan={3} className="cell-custom-border align-middle" style={{ width: "15%" }}>
              ಕಲಿಕೆ ಮಗುವಿನ ಹೆಸರು
              <div className="text-center mt-2">
                <span className="d-inline-block me-1 text-primary">→</span>
              </div>
            </th>
            <th colSpan={8} className="cell-custom-border">
              1 ನೇ ರಚನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ
            </th>
            <th colSpan={8} className="cell-custom-border">
              2 ನೇ ರಚನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ
            </th>
            <th rowSpan={3} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಒಟ್ಟು ಅಂಕಗಳು (150)</div>
            </th>
            <th colSpan={5} className="cell-custom-border">
              ಸಂಖ್ಯೆ-1
            </th>
          </tr>
          <tr>
            <th colSpan={6} className="cell-custom-border">
              ಪ್ರಶ್ನೆಗಳು
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಒಟ್ಟು ಅಂಕಗಳು</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಶೇಕಡಾವಾರು</div>
            </th>
            <th colSpan={6} className="cell-custom-border">
              ಪ್ರಶ್ನೆಗಳು
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಒಟ್ಟು ಅಂಕಗಳು</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಶೇಕಡಾವಾರು</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "3%" }}>
              <div className="vertical-text">ಶ್ರೇಣಿ</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "3%" }}>
              <div className="vertical-text">ಗ್ರೇಡ್</div>
            </th>
            <th colSpan={3} className="cell-custom-border">
              ಸಂಖ್ಯೆಗಳು
            </th>
          </tr>
          <tr>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              1
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              2
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              3
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              4
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              5
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              <div className="vertical-text">ಒಟ್ಟು</div>
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              1
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              2
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              3
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              4
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              5
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              <div className="vertical-text">ಒಟ್ಟು</div>
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              30
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              40
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              10
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(31).fill(null).map((_, index) => (
            <tr key={index} style={{ height: "30px" }}>
              <td className="cell-custom-border">{index + 1}</td>
              <td className="cell-custom-border"></td>
              {Array(23).fill(null).map((_, cellIndex) => (
                <td key={cellIndex} className="cell-custom-border"></td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={25} className="cell-custom-border text-start fs-6 p-2">
              ಸೂಚನೆ:- ಈ ಮೌಲ್ಯಮಾಪನದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಗಳಿಸಿರುವ ಅಂಕಗಳನ್ನು ಪರಿಗಣಿಸುತ್ತಾ, ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಗೆ ಅವರ ಅಂಕಗಳ ಪ್ರಕಾರ ಶೇಕಡಾವಾರು ಪಡೆದಿದ್ದರೆ ಈ ಮಾಹಿತಿಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಕೊಡಬೇಕು.
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default KannadaAssessmentSheet; 