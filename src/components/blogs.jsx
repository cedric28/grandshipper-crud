import React, { useState, useEffect, useCallback } from "react";
import { getBlogs, deleteBlog } from "../services/blogService";
import { getTypes } from "../services/typeService";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import BlogsTable from "./blogsTable";
import SearchBox from "../common/searchBox";
import PaginationBar from "../common/paginationBar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

const Blogs = ({ user }) => {
  console.log('user',user)
  const hasUser = Object.keys(user).length > 0;
  const [blogs, setBlogs] = useState([]);
  const [types, setTypes] = useState([]);
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [blogs]);

  const fetchData = async () => {
    try {
      const { data: typesData } = await getTypes();
      const types = [{ _id: "", name: "All Types" }, ...typesData];
      setTypes(types);

      const { data: blogsData } = await getBlogs();
    setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDelete = useCallback(async (id) => {
    const originalBlogs = [...blogs];
    // Optimistically update UI
    const updatedBlogs = originalBlogs.filter((blog) => blog._id !== id);

    try {
      // Attempt to delete from server
      await deleteBlog(id);
      setBlogs(updatedBlogs);
      toast.success("Blog deleted successfully");
    } catch (error) {
      // Rollback UI changes on error
      if (error.response && error.response.status === 404) {
        toast.error("This blog has already been deleted");
      }
      setBlogs(originalBlogs); // Restore original state
    }
  }, [blogs,setBlogs]);
  

  const handleToggle = (id) => {
    let updatedBlogs = [...blogs];
    let index = updatedBlogs.findIndex((blog) => blog._id === id);
    updatedBlogs[index] = { ...updatedBlogs[index] };
    updatedBlogs[index].liked = !updatedBlogs[index].liked;
    setBlogs(updatedBlogs);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTypeSelect = (type) => {
    setSearchQuery("");
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    setSortColumn(column);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedType(null);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filteredBlogs = [...blogs];
    if (searchQuery) {
      filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredBlogs =
        selectedType && selectedType._id
          ? blogs.filter((m) => m.type._id === selectedType._id)
          : blogs;
    }

    const sortedBlogs = _.orderBy(filteredBlogs, [sortColumn.path], [sortColumn.order]);
    const pagedBlogs = paginate(sortedBlogs, currentPage, pageSize);

    return { totalCount: filteredBlogs.length, data: pagedBlogs };
  };

  const { totalCount, data: pagedBlogs } = getPagedData();

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div class="mb-3" style={{ marginTop: "150px", display: 'flex', justifyContent:'center', alignItems:'center' }}>
            <div className="col-9" style={{ marginRight: "20px"}}>
              {hasUser && (
                <Link
                  to={"/blogs/new"}
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                >
                  New Blog
                </Link>
              )}

              <SearchBox value={searchQuery} onChange={handleSearchChange} />

              <h5>Showing {totalCount} blogs in the database</h5>
              <h1>Blogs</h1>

              <BlogsTable
                blogs={pagedBlogs}
                sortColumn={sortColumn}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onSort={handleSort}
              />

              <PaginationBar
                currentPage={currentPage}
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="col-3">
              <ListGroup
                selectedItem={selectedType}
                items={types}
                onItemSelect={handleTypeSelect}
              />
            </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blogs;
