"use client"
import { Table, Button, Spinner, Pagination } from "react-bootstrap"
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const StudentsTable = ({ students, loading, currentPage, totalPages, onEdit, onDelete, onPageChange }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading students...</p>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-5 bg-light rounded">
        <h5>No students found</h5>
        <p>Try adjusting your search criteria or add a new student</p>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Students ({students.length})</h5>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Register No.</th>
            <th>Class</th>
            <th>Father's Name</th>
            <th>Academic Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.registerNumber}</td>
              <td>{student.className}</td>
              <td>{student.fatherName}</td>
              <td>{student.academicYear}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => onEdit(student)} title="Edit Student">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(student._id)} title="Delete Student">
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
              <FaChevronLeft />
            </Pagination.Prev>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page =
                currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i
              return (
                <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
                  {page}
                </Pagination.Item>
              )
            })}

            <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
              <FaChevronRight />
            </Pagination.Next>
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default StudentsTable
