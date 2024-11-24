import { getAllBlogs } from '@/helpers/data';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BsCalendarDate } from 'react-icons/bs';
import { useFetchData } from '@/hooks/useFetchData';
const BlogCard = ({
  blog
}) => {
  const {
    category,
    date,
    description,
    image,
    title,
    categoryVariant,
    id
  } = blog;
  return <Card className="bg-transparent border-0">
      <Row className="g-3">
        <Col xs={4}>
          <img className="rounded" src={image} alt="image" />
        </Col>
        <Col xs={8}>
          <Link to="" className={`badge bg-${categoryVariant} bg-opacity-10 text-${categoryVariant} mb-2 fw-bold`}>
            {category}
          </Link>
          <h5>
            <Link to={`/blogs/${id}`} className="btn-link stretched-link text-reset fw-bold">
              {title}
            </Link>
          </h5>
          <div className="d-none d-sm-inline-block">
            <p className="mb-2">{description}</p>
            <Link className="small text-secondary" to="">
              
              <BsCalendarDate size={17} className="pe-1" /> {date.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
            </Link>
          </div>
        </Col>
      </Row>
    </Card>;
};
const LatestBlogs = () => {
  const allBlogs = useFetchData(getAllBlogs);
  return <div className="bg-mode p-4">
      <h1 className="h4 mb-4">Latest blogs</h1>
      {allBlogs?.map((blog, idx) => <Fragment key={idx}>
          <BlogCard blog={blog} />
          {allBlogs.length - 1 != idx && <hr className="my-4" />}
        </Fragment>)}
      <div className="mt-4">
        <nav aria-label="navigation">
          <ul className="pagination pagination-light d-inline-block d-md-flex justify-content-center">
            <li className="page-item disabled">
              <Link className="page-link" to="">
                Prev
              </Link>
            </li>
            <li className="page-item active">
              <Link className="page-link" to="">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                2
              </Link>
            </li>
            <li className="page-item disabled">
              <Link className="page-link" to="">
                ...
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                15
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>;
};
export default LatestBlogs;