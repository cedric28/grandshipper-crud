import React, { useState, useEffect, useCallback, useRef } from "react";
import Table from "../common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

const BlogsTable = ({ blogs, onSort, sortColumn, onDelete }) => {
  const [columns, setColumns] = useState([
    {
      path: "title",
      label: "Title",
      content: blog => <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
    },
    { path: "type.name", label: "Type" },
    { path: "content", label: "Content" },
    { path: "author", label: "Author" },
  ]);

  const deleteColumnAdded = useRef(false);

  const addDeleteColumn = useCallback(() => {
    return {
      key: "delete",
      content: blog => (
        <button
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(blog._id)}
          className="btn btn-danger"
        >
          <i  style={{ marginRight: '5px' }} className={"fa fa-trash"} aria-hidden="true" />
          Delete
        </button>
      )
    };
  }, [onDelete]);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin && !deleteColumnAdded.current) {
      setColumns(columns => [...columns, addDeleteColumn()]);
      deleteColumnAdded.current = true;
    }
  }, [addDeleteColumn]);

  return (
    <Table
      data={blogs}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default BlogsTable;
