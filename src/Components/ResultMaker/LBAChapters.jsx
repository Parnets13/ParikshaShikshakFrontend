import React, { useState, useEffect } from 'react';
import {
  addLBAChapter,
  getAllLBAChapters,
  updateLBAChapter,
  deleteLBAChapter
} from '../../services/resultMakerService';

const LBAChapters = ({ selectedClassId, selectedClassNumber, lbaSettings, terms, subjects }) => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [newChapterName, setNewChapterName] = useState('');
  const [newChapterNumber, setNewChapterNumber] = useState('');
  const [editingChapter, setEditingChapter] = useState(null);
  const [editChapterName, setEditChapterName] = useState('');
  const [editChapterNumber, setEditChapterNumber] = useState('');

  useEffect(() => {
    if (selectedClassId && selectedTerm && selectedSubject) {
      fetchChapters();
    }
  }, [selectedClassId, selectedTerm, selectedSubject]);

  const fetchChapters = async () => {
    try {
      const response = await getAllLBAChapters(selectedClassId, selectedTerm, selectedSubject);
      if (response.success && response.data) {
        setChapters(response.data);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
      alert('Error fetching chapters');
    }
  };

  const handleAddChapter = async () => {
    if (!newChapterName.trim()) {
      alert('Please enter chapter name');
      return;
    }

    if (!newChapterNumber || newChapterNumber < 1) {
      alert('Please enter valid chapter number');
      return;
    }

    try {
      const response = await addLBAChapter({
        classId: selectedClassId,
        term: selectedTerm,
        subject: selectedSubject,
        chapterName: newChapterName.trim(),
        chapterNumber: parseInt(newChapterNumber)
      });

      if (response.success) {
        alert('Chapter added successfully');
        setNewChapterName('');
        setNewChapterNumber('');
        fetchChapters();
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
      alert(error.response?.data?.message || 'Error adding chapter');
    }
  };

  const handleEditChapter = (chapter) => {
    setEditingChapter(chapter._id);
    setEditChapterName(chapter.chapterName);
    setEditChapterNumber(chapter.chapterNumber);
  };

  const handleSaveEdit = async (chapterId) => {
    if (!editChapterName.trim()) {
      alert('Please enter chapter name');
      return;
    }

    if (!editChapterNumber || editChapterNumber < 1) {
      alert('Please enter valid chapter number');
      return;
    }

    try {
      const response = await updateLBAChapter(chapterId, {
        chapterName: editChapterName.trim(),
        chapterNumber: parseInt(editChapterNumber)
      });

      if (response.success) {
        alert('Chapter updated successfully');
        setEditingChapter(null);
        fetchChapters();
      }
    } catch (error) {
      console.error('Error updating chapter:', error);
      alert(error.response?.data?.message || 'Error updating chapter');
    }
  };

  const handleCancelEdit = () => {
    setEditingChapter(null);
    setEditChapterName('');
    setEditChapterNumber('');
  };

  const handleDeleteChapter = async (chapterId, chapterName) => {
    if (!window.confirm(`Are you sure you want to delete "${chapterName}"? This will also delete all marks associated with this chapter.`)) {
      return;
    }

    try {
      const response = await deleteLBAChapter(chapterId);
      if (response.success) {
        alert('Chapter deleted successfully');
        fetchChapters();
      }
    } catch (error) {
      console.error('Error deleting chapter:', error);
      alert('Error deleting chapter');
    }
  };

  if (!selectedClassId) {
    return (
      <div className="alert alert-warning">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Please select a class first
      </div>
    );
  }

  return (
    <div>
      {/* Term Selection */}
      <div className="mb-3 mx-auto" style={{ maxWidth: '600px' }}>
        <label className="form-label text-secondary fw-semibold">Select Term</label>
        <select
          className="form-select form-select-lg"
          value={selectedTerm}
          onChange={(e) => {
            setSelectedTerm(e.target.value);
            setSelectedSubject('');
            setChapters([]);
          }}
          style={{ borderColor: '#6c757d', borderWidth: '2px' }}
        >
          <option value="">Select Term</option>
          {terms && terms.map((term) => (
            <option key={term._id || term.termName} value={term.termName}>
              {term.termName}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Selection */}
      {selectedTerm && (
        <div className="mb-3 mx-auto" style={{ maxWidth: '600px' }}>
          <label className="form-label text-info fw-semibold">Select Subject</label>
          <select
            className="form-select form-select-lg"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setChapters([]);
            }}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
          >
            <option value="">Select Subject</option>
            {subjects && subjects.map((subject, index) => (
              <option key={subject._id || index} value={subject.subjectName}>
                {subject.subjectName}
              </option>
            ))}
          </select>
          {(!subjects || subjects.length === 0) && (
            <div className="alert alert-warning mt-2">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <strong>No subjects found for this class.</strong>
              <br />
              <small>Please go to <a href="/resultsheetmaker/class-settings" className="alert-link">Class Settings → Subjects</a> tab to add subjects first.</small>
            </div>
          )}
        </div>
      )}

      {/* Add Chapter Form */}
      {selectedSubject && (
        <div className="card mb-4 mx-auto" style={{ maxWidth: '800px' }}>
          <div className="card-header bg-info text-white">
            <h6 className="mb-0">
              <i className="fas fa-plus-circle me-2"></i>
              Add New Chapter
            </h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Chapter No.</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="1"
                  min="1"
                  value={newChapterNumber}
                  onChange={(e) => setNewChapterNumber(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Chapter Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter chapter name"
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button
                  className="btn btn-info text-white w-100"
                  onClick={handleAddChapter}
                >
                  <i className="fas fa-plus me-2"></i>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapters List */}
      {selectedSubject && (
        <div className="card mx-auto" style={{ maxWidth: '800px' }}>
          <div className="card-header bg-secondary text-white">
            <h6 className="mb-0">
              <i className="fas fa-list me-2"></i>
              Chapters for {selectedSubject} - {selectedTerm}
            </h6>
          </div>
          <div className="card-body p-0">
            {chapters.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="fas fa-book fa-3x mb-3"></i>
                <p>No chapters added yet</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '100px' }}>Chapter No.</th>
                      <th>Chapter Name</th>
                      <th style={{ width: '150px' }} className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters.map((chapter) => (
                      <tr key={chapter._id}>
                        {editingChapter === chapter._id ? (
                          <>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={editChapterNumber}
                                onChange={(e) => setEditChapterNumber(e.target.value)}
                                min="1"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={editChapterName}
                                onChange={(e) => setEditChapterName(e.target.value)}
                              />
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleSaveEdit(chapter._id)}
                              >
                                <i className="fas fa-check"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={handleCancelEdit}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="fw-bold">{chapter.chapterNumber}</td>
                            <td>{chapter.chapterName}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEditChapter(chapter)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteChapter(chapter._id, chapter.chapterName)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LBAChapters;
