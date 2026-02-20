import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Form,
  Modal,
  Pagination,
  Table,
  Spinner,
  Card,
  Accordion,
  Row,
  Col,
  Badge
} from "react-bootstrap";
import { AiFillDelete, AiOutlineFilter } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch, BsXCircle } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Button2 from "../Button2";
import { debounce } from "lodash";

const AdminQuestions = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State management
  const [questions, setQuestions] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    classes: [],
    boards: [],
    mediums: [],
    subjects: [],
    chapters: [],
    typeQuestions: [],
    sections: [],
    examinations: []
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 50,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    class: '',
    board: '',
    medium: '',
    subject: '',
    chapter: '',
    typeOfQuestion: '',
    section: '',
    Name_of_examination: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 50,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // UI states
  const [modals, setModals] = useState({
    show: false,
    show1: false,
    show2: false,
    show3: false
  });
  const [deleteId, setDeleteId] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [cascadingOptions, setCascadingOptions] = useState({
    boards: [],
    mediums: [],
    subjects: [],
    chapters: [],
    typeQuestions: []
  });

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (value && !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)) {
        count++;
      }
    });
    setActiveFiltersCount(count);
  }, [filters]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
    }, 500),
    []
  );

  // Handle modal operations
  const handleModal = (modalName, isOpen) => {
    setModals(prev => ({ ...prev, [modalName]: isOpen }));
  };

  // Fetch questions with filters and pagination
  const getAllQuestions = async (queryFilters = filters) => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      Object.entries(queryFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await axios.get(
        `http://localhost:8774/api/admin/getAllQuestionAdminwithpagination/${admin?._id}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setQuestions(res.data.data);
        setPagination(res.data.pagination);
        
        // Update filter options with examinations
        setFilterOptions(prev => ({
          ...prev,
          ...res.data.filters
        }));
      } 
    } catch (error) {
      console.error('Error fetching questions:', error);
      swal({
        title: "Error!",
        text: "Failed to fetch questions",
        icon: "error",
        button: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get cascading filter options based on selections
  const getCascadingOptions = async (currentFilters) => {
    try {
      const params = new URLSearchParams();
      
      // Add all relevant filters to the request
      if (currentFilters.class) params.append('class', currentFilters.class);
      if (currentFilters.board) params.append('board', currentFilters.board);
      if (currentFilters.medium) params.append('medium', currentFilters.medium);
      if (currentFilters.subject) params.append('subject', currentFilters.subject);
      if (currentFilters.chapter) params.append('chapter', currentFilters.chapter);

      const res = await axios.get(
        `http://localhost:8774/api/admin/getFilterOptions?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setCascadingOptions(prev => ({
          ...prev,
          boards: res.data.options.boards || [],
          mediums: res.data.options.mediums || [],
          subjects: res.data.options.subjects || [],
          chapters: res.data.options.chapters || [],
          typeQuestions: res.data.options.typeQuestions || []
        }));
      }
    } catch (error) {
      console.error('Error fetching cascading options:', error);
    }
  };

  // Handle filter changes
  const handleFilterChange = async (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    
    // Reset dependent filters when parent filter changes
    if (key === 'class') {
      newFilters.board = '';
      newFilters.medium = '';
      newFilters.subject = '';
      newFilters.chapter = '';
      newFilters.typeOfQuestion = '';
    } else if (key === 'board') {
      newFilters.medium = '';
      newFilters.subject = '';
      newFilters.chapter = '';
      newFilters.typeOfQuestion = '';
    } else if (key === 'medium') {
      newFilters.subject = '';
      newFilters.chapter = '';
      newFilters.typeOfQuestion = '';
    } else if (key === 'subject') {
      newFilters.chapter = '';
      newFilters.typeOfQuestion = '';
    } else if (key === 'chapter') {
      newFilters.typeOfQuestion = '';
    }

    setFilters(newFilters);
    
    // Get updated cascading options
    await getCascadingOptions(newFilters);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  // Date range filter
  const handleDateFilter = () => {
    if (!filters.startDate) return swal("Error", "Please select from date", "error");
    if (!filters.endDate) return swal("Error", "Please select to date", "error");
    
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  // Clear specific filter
  const clearFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '', page: 1 }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      search: '',
      class: '',
      board: '',
      medium: '',
      subject: '',
      chapter: '',
      typeOfQuestion: '',
      section: '',
      Name_of_examination: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 50,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setFilterOpen(false);
    setCascadingOptions({
      boards: [],
      mediums: [],
      subjects: [],
      chapters: [],
      typeQuestions: []
    });
  };

  // Delete question
  const deleteQuestion = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8774/api/admin/deleteQuestionPaper/${deleteId}/${admin?._id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        handleModal('show2', false);
        getAllQuestions();
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      swal({
        title: "Error!",
        text: "Failed to delete question",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  // Helper function to get examination names from array
  const getExaminationNames = (examArray) => {
    if (!examArray || !Array.isArray(examArray)) return '-';
    return examArray.map(exam => exam.NameExamination).filter(Boolean).join(', ') || '-';
  };

  // Effects
  useEffect(() => {
    getAllQuestions();
  }, [filters]);

  useEffect(() => {
    // Initial load with all filter options
    getAllQuestions();
  }, []);

  return (
    <>
      <div className="row p-2">
        <div className="col-lg-4 d-flex justify-content-center mt-2">
          <div className="w-100">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <BsSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by question text, exam name..."
                onChange={handleSearchChange}
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4 mt-2">
          <div className="text-container text-center">
            <h5 className="beautiful-text">
              Questions List ({pagination.totalItems})
            </h5>
          </div>
        </div>

        <div className="col-lg-4 mt-2">
          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant={filterOpen ? "primary" : "outline-primary"}
              onClick={() => setFilterOpen(!filterOpen)}
              className="d-flex align-items-center"
            >
              <AiOutlineFilter className="me-1" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge bg="danger" className="ms-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            <Link to="/adminquestiondetails">
              <Button2 text={"Add Questions"} />
            </Link>
          </div>
        </div>
      </div>

      {/* Active Filters Bar */}
      {activeFiltersCount > 0 && (
        <Card className="mb-3">
          <Card.Body className="py-2">
            <div className="d-flex align-items-center">
              <span className="me-2">Active filters:</span>
              <div className="d-flex flex-wrap gap-2">
                {filters.search && (
                  <Badge bg="primary" className="d-flex align-items-center">
                    Search: {filters.search}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('search')}
                    />
                  </Badge>
                )}
                {filters.class && (
                  <Badge bg="secondary" className="d-flex align-items-center">
                    Class: {filters.class}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('class')}
                    />
                  </Badge>
                )}
                {filters.board && (
                  <Badge bg="success" className="d-flex align-items-center">
                    Board: {filters.board}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('board')}
                    />
                  </Badge>
                )}
                {filters.medium && (
                  <Badge bg="info" className="d-flex align-items-center">
                    Medium: {filters.medium}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('medium')}
                    />
                  </Badge>
                )}
                {filters.subject && (
                  <Badge bg="warning" className="d-flex align-items-center">
                    Subject: {filters.subject}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('subject')}
                    />
                  </Badge>
                )}
                {filters.chapter && (
                  <Badge bg="danger" className="d-flex align-items-center">
                    Chapter: {filters.chapter}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('chapter')}
                    />
                  </Badge>
                )}
                {filters.typeOfQuestion && (
                  <Badge bg="dark" className="d-flex align-items-center">
                    Type: {filters.typeOfQuestion}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('typeOfQuestion')}
                    />
                  </Badge>
                )}
                {filters.Name_of_examination && (
                  <Badge bg="primary" className="d-flex align-items-center">
                    Exam: {filters.Name_of_examination}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => clearFilter('Name_of_examination')}
                    />
                  </Badge>
                )}
                {(filters.startDate || filters.endDate) && (
                  <Badge bg="secondary" className="d-flex align-items-center">
                    Date: {filters.startDate} to {filters.endDate}
                    <BsXCircle 
                      className="ms-1" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        clearFilter('startDate');
                        clearFilter('endDate');
                      }}
                    />
                  </Badge>
                )}
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Filters Accordion */}
      <Accordion activeKey={filterOpen ? "0" : null}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="d-none">Filters</Accordion.Header>
          <Accordion.Body>
            <Row className="g-3">
              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    value={filters.class}
                    onChange={(e) => handleFilterChange('class', e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {filterOptions.classes?.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Board</Form.Label>
                  <Form.Select
                    value={filters.board}
                    onChange={(e) => handleFilterChange('board', e.target.value)}
                    disabled={!filters.class}
                  >
                    <option value="">Select Board</option>
                    {cascadingOptions.boards.map((board) => (
                      <option key={board} value={board}>
                        {board}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Medium</Form.Label>
                  <Form.Select
                    value={filters.medium}
                    onChange={(e) => handleFilterChange('medium', e.target.value)}
                    disabled={!filters.board}
                  >
                    <option value="">Select Medium</option>
                    {cascadingOptions.mediums.map((medium) => (
                      <option key={medium} value={medium}>
                        {medium}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Select
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    disabled={!filters.medium}
                  >
                    <option value="">Select Subject</option>
                    {cascadingOptions.subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Chapter</Form.Label>
                  <Form.Select
                    value={filters.chapter}
                    onChange={(e) => handleFilterChange('chapter', e.target.value)}
                    disabled={!filters.subject}
                  >
                    <option value="">Select Chapter</option>
                    {cascadingOptions.chapters.map((chapter) => (
                      <option key={chapter} value={chapter}>
                        {chapter}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Type of Question</Form.Label>
                  <Form.Select
                    value={filters.typeOfQuestion}
                    onChange={(e) => handleFilterChange('typeOfQuestion', e.target.value)}
                    disabled={!filters.chapter}
                  >
                    <option value="">Select Type</option>
                    {cascadingOptions.typeQuestions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Examination Name</Form.Label>
                  <Form.Select
                    value={filters.Name_of_examination}
                    onChange={(e) => handleFilterChange('Name_of_examination', e.target.value)}
                  >
                    <option value="">Select Examination</option>
                    {filterOptions.examinations?.map((exam) => (
                      <option key={exam} value={exam}>
                        {exam}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    value={filters.section}
                    onChange={(e) => handleFilterChange('section', e.target.value)}
                  >
                    <option value="">Select Section</option>
                    {filterOptions.sections?.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col> */}

              {/* <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6} lg={3}>
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="d-flex gap-2 align-items-end">
                <Button 
                  onClick={handleDateFilter} 
                  variant="primary"
                  disabled={!filters.startDate || !filters.endDate}
                >
                  Apply Date Filter
                </Button>
                <Button onClick={clearAllFilters} variant="outline-secondary">
                  Clear All Filters
                </Button>
              </Col> */}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="customerhead p-2 mt-4">
        {loading ? (
          <div className="text-center p-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading questions...</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <Table
                bordered
                hover
                style={{ width: "100%", textAlign: "center" }}
                className="table-striped"
              >
                <thead style={{ backgroundColor: "orange" }}>
                  <tr>
                    <th>S.No</th>
                    <th>Section</th>
                    <th>Board</th>
                    <th>Medium</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Sub-Class</th>
                    <th>Chapter Name</th>
                    <th>Types of Question</th>
                    <th>Examination</th>
                    <th>View</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.length > 0 ? (
                    questions.map((val, i) => {
                      const serialNumber = (pagination.currentPage - 1) * pagination.itemsPerPage + i + 1;
                      return (
                        <tr key={val._id}>
                          <td>{serialNumber}</td>
                          <td>{val?.Section || '-'}</td>
                          <td>{val?.Board || '-'}</td>
                          <td>{val?.Medium || '-'}</td>
                          <td>{val?.Class || '-'}</td>
                          <td>{val?.Subject || '-'}</td>
                          <td>{val?.Sub_Class || '-'}</td>
                          <td>{val?.Chapter_Name || '-'}</td>
                          <td>{val?.Types_Question || '-'}</td>
                          <td>{getExaminationNames(val?.Name_of_examination) || '-'}</td>
                          <td>
                            <FaEye
                              color="blue"
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`/adminquestiondetailsview/${val?._id}`)}
                              title="View Details"
                            />
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => navigate(`/admineditquestiondetails/${val?._id}`)}
                                title="Edit Question"
                              />
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  setDeleteId(val?._id);
                                  handleModal('show2', true);
                                }}
                                title="Delete Question"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center py-4">
                        {Object.values(filters).some(filter => filter && !['page', 'limit', 'sortBy', 'sortOrder'].includes(filter)) 
                          ? "No questions match your filters. Try adjusting your search criteria."
                          : "No questions available. Add your first question!"
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Enhanced Pagination */}
            {pagination.totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <div className="mb-2">
                  <span>
                    Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
                    {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                    {pagination.totalItems} entries
                  </span>
                </div>
                <Pagination className="mb-2">
                  <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={!pagination.hasPrevPage}
                  />
                  <Pagination.Prev
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                  />
                  
                  {[...Array(pagination.totalPages).keys()].map((number) => {
                    const page = number + 1;
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= pagination.currentPage - 2 && page <= pagination.currentPage + 2)
                    ) {
                      return (
                        <Pagination.Item
                          key={page}
                          active={page === pagination.currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Pagination.Item>
                      );
                    } else if (
                      page === pagination.currentPage - 3 ||
                      page === pagination.currentPage + 3
                    ) {
                      return <Pagination.Ellipsis key={page} />;
                    }
                    return null;
                  })}
                  
                  <Pagination.Next
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                  />
                  <Pagination.Last
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={!pagination.hasNextPage}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={modals.show2} onHide={() => handleModal('show2', false)} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
            <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12 text-center">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure you want to delete this question?
                </p>
                <p>This action cannot be undone.</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleModal('show2', false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={deleteQuestion}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminQuestions;