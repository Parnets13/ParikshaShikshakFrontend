import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllClasses,
  getAllTerms
} from '../../services/resultMakerService';

const GenerateResult = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [terms, setTerms] = useState([]);
  
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedTermOption, setSelectedTermOption] = useState(''); // 'term1', 'term2', 'both'
  const [term1Id, setTerm1Id] = useState('');
  const [term2Id, setTerm2Id] = useState('');
  
  // Print options
  const [sheetType, setSheetType] = useState('single'); // single, both
  const [printHeader, setPrintHeader] = useState(true);
  const [printBorder, setPrintBorder] = useState(true);
  const [printWatermark, setPrintWatermark] = useState(false);
  const [printRank, setPrintRank] = useState(false);
  const [printTagline, setPrintTagline] = useState(false);
  const [printDate, setPrintDate] = useState(false);
  const [printSignature, setPrintSignature] = useState(false);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchTerms(selectedClassId);
    }
  }, [selectedClassId]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getAllClasses();
      if (response.success) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTerms = async (classId) => {
    try {
      const response = await getAllTerms(classId);
      if (response.success) {
        setTerms(response.data);
        // Auto-assign Term 1 and Term 2 if available
        if (response.data.length >= 1) {
          setTerm1Id(response.data[0]._id);
        }
        if (response.data.length >= 2) {
          setTerm2Id(response.data[1]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      setTerms([]);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleGenerateResult = () => {
    if (!selectedClassId || !selectedTermOption) {
      alert('Please select class and term option');
      return;
    }

    // Validate term selection based on option
    if (selectedTermOption === 'term1' && !term1Id) {
      alert('Please select Term 1');
      return;
    }
    if (selectedTermOption === 'term2' && !term2Id) {
      alert('Please select Term 2');
      return;
    }
    if (selectedTermOption === 'both' && (!term1Id || !term2Id)) {
      alert('Please select both Term 1 and Term 2');
      return;
    }

    // Navigate to result sheet preview/print page
    navigate('/resultsheetmaker/print-result', {
      state: {
        classId: selectedClassId,
        termOption: selectedTermOption,
        term1Id: term1Id,
        term2Id: term2Id,
        options: {
          sheetType,
          printHeader,
          printBorder,
          printWatermark,
          printRank,
          printTagline,
          printDate,
          printSignature
        }
      }
    });
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.className || classItem;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Session : 2025-2026</h5>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-question-circle fs-4"></i>
        </button>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h4 className="mb-0 fw-bold">Generate Result</h4>
      </div>

      {/* Form Container */}
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        {/* Class Dropdown */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-info">Generate Result for Class</label>
          <select
            className="form-select form-select-lg"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
            disabled={loading}
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {getClassDisplayName(classItem)}
              </option>
            ))}
          </select>
        </div>

        {/* Term Option Radio Buttons */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Select Term Option</label>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="termOption"
                id="term1Only"
                value="term1"
                checked={selectedTermOption === 'term1'}
                onChange={(e) => setSelectedTermOption(e.target.value)}
                disabled={!selectedClassId || terms.length === 0}
              />
              <label className="form-check-label" htmlFor="term1Only">
                Term 1 Only
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="termOption"
                id="term2Only"
                value="term2"
                checked={selectedTermOption === 'term2'}
                onChange={(e) => setSelectedTermOption(e.target.value)}
                disabled={!selectedClassId || terms.length === 0}
              />
              <label className="form-check-label" htmlFor="term2Only">
                Term 2 Only
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="termOption"
                id="bothTerms"
                value="both"
                checked={selectedTermOption === 'both'}
                onChange={(e) => setSelectedTermOption(e.target.value)}
                disabled={!selectedClassId || terms.length < 2}
              />
              <label className="form-check-label" htmlFor="bothTerms">
                Both Terms (Term 1 + Term 2)
              </label>
            </div>
          </div>
          {selectedClassId && terms.length === 0 && (
            <small className="text-muted d-block mt-2">
              No terms available for this class.{' '}
              <button
                className="btn btn-link p-0 text-info"
                onClick={() => navigate('/resultsheetmaker/exam-settings')}
                style={{ textDecoration: 'underline', fontSize: 'inherit' }}
              >
                Add terms here
              </button>
            </small>
          )}
          {selectedClassId && terms.length === 1 && (
            <small className="text-muted d-block mt-2">
              Only one term available. Add Term 2 to enable "Both Terms" option.
            </small>
          )}
        </div>

        {/* Term 1 Dropdown - Show when term1 or both is selected */}
        {(selectedTermOption === 'term1' || selectedTermOption === 'both') && (
          <div className="mb-3">
            <label className="form-label fw-semibold text-info">Select Term 1</label>
            <select
              className="form-select form-select-lg"
              value={term1Id}
              onChange={(e) => setTerm1Id(e.target.value)}
              style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
              disabled={terms.length === 0}
            >
              <option value="">Select Term 1</option>
              {terms.map((term) => (
                <option key={term._id} value={term._id}>
                  {term.termName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Term 2 Dropdown - Show when term2 or both is selected */}
        {(selectedTermOption === 'term2' || selectedTermOption === 'both') && (
          <div className="mb-4">
            <label className="form-label fw-semibold text-info">Select Term 2</label>
            <select
              className="form-select form-select-lg"
              value={term2Id}
              onChange={(e) => setTerm2Id(e.target.value)}
              style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
              disabled={terms.length === 0}
            >
              <option value="">Select Term 2</option>
              {terms.map((term) => (
                <option key={term._id} value={term._id}>
                  {term.termName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sheet Type Radio Buttons */}
        <div className="mb-4">
          <div className="d-flex gap-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sheetType"
                id="singleSided"
                value="single"
                checked={sheetType === 'single'}
                onChange={(e) => setSheetType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="singleSided">
                Single Sided
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sheetType"
                id="bothSided"
                value="both"
                checked={sheetType === 'both'}
                onChange={(e) => setSheetType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="bothSided">
                Both Sided
              </label>
            </div>
          </div>
        </div>

        {/* Print Options - Row 1 */}
        <div className="row mb-3">
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printHeader"
                checked={printHeader}
                onChange={(e) => setPrintHeader(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printHeader">
                Print Header
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printBorder"
                checked={printBorder}
                onChange={(e) => setPrintBorder(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printBorder">
                Print Border
              </label>
            </div>
          </div>
        </div>

        {/* Print Options - Row 2 */}
        <div className="row mb-3">
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printWatermark"
                checked={printWatermark}
                onChange={(e) => setPrintWatermark(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printWatermark">
                Print Watermark
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printRank"
                checked={printRank}
                onChange={(e) => setPrintRank(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printRank">
                Print Rank
              </label>
            </div>
          </div>
        </div>

        {/* Print Options - Row 3 */}
        <div className="row mb-3">
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printTagline"
                checked={printTagline}
                onChange={(e) => setPrintTagline(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printTagline">
                Print Tagline
              </label>
            </div>
          </div>
        </div>

        {/* Print Options - Row 4 */}
        <div className="row mb-3">
          <div className="col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printDate"
                checked={printDate}
                onChange={(e) => setPrintDate(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printDate">
                Print Date
              </label>
            </div>
          </div>
        </div>

        {/* Print Options - Row 5 */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="printSignature"
                checked={printSignature}
                onChange={(e) => setPrintSignature(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printSignature">
                Print Principal Signature
              </label>
            </div>
          </div>
        </div>

        {/* Generate Result Button */}
        <button
          className="btn btn-info text-white w-100 py-3 fw-bold"
          onClick={handleGenerateResult}
          disabled={!selectedClassId || !selectedTermOption}
        >
          GENERATE RESULT
        </button>
      </div>
    </div>
  );
};

export default GenerateResult;
