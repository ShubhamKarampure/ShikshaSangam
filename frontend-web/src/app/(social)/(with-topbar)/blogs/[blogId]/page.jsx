import { Fragment, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap';
import { BsCalendarDate, BsClock } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReplyForm from './components/ReplyForm';
import { commentsData } from './data';
import { getBlogById } from '@/helpers/data';
import PageMetaData from '@/components/PageMetaData';
import Footer from './components/Footer';
import blogImg from '@/assets/images/post/16by9/big/03.jpg';
const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const {
    blogId
  } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (blogId) {
        const data = await getBlogById(blogId);
        if (data) setBlog(data);else navigate('/not-found');
      }
    })();
  }, []);
  return <>
      <PageMetaData title={blog?.id ?? "Blog Details"} />
      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8} className="mx-auto">
              <div className="vstack gap-4">
                <Card className="card-body">
                  <img className="rounded" src={blogImg} alt="blog" />
                  <div className="mt-4">
                    <Link to="" className="badge bg-danger bg-opacity-10 text-danger mb-2 fw-bold">
                      Lifestyle
                    </Link>
                    <h1 className="mb-2 h2">New comment moderation and support features, including live chat.</h1>
                    <ul className="nav nav-stack gap-3 align-items-center">
                      <li className="nav-item">
                        <div className="nav-link">
                          by
                          <Link to="" className="text-reset btn-link">
                            Louis Ferguson
                          </Link>
                        </div>
                      </li>
                      <li className="nav-item">
                        
                        <BsCalendarDate size={20} className="pe-1" />
                        Nov 15, 2022
                      </li>
                      <li className="nav-item">
                        
                        <BsClock size={20} className="pe-1" />5 min read
                      </li>
                    </ul>
                    <p className="mt-4">
                      <span className="dropcap">A</span> pleasure exertion if believed provided to. All led out world this music while asked. Paid
                      mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants
                      moreover in sensible it ye possible.
                    </p>
                    <h4 className="mt-4">The pros and cons of business agency</h4>
                    <Row className="mb-4">
                      <Col md={6}>
                        <p>
                          Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and
                          her.
                        </p>
                        <p>
                          Concluded boy perpetual old supposing. Farther related bed and passage comfort civilly. Dashwoods see frankness objection
                          abilities.
                        </p>
                      </Col>
                      <Col md={6}>
                        <ul>
                          <li>Our Firmament living replenish Them Created after divide said Have give</li>
                          <li>Dominion light without days face saw wherein land</li>
                          <li>Fifth have Seas made lights Very Day saw Seed herb sixth light whales</li>
                          <li>Saying unto Place it seed you&apos;re Isn&apos;t heaven </li>
                        </ul>
                      </Col>
                    </Row>
                    <figure className="bg-light rounded p-3 p-sm-4 my-4">
                      <blockquote className="blockquote">
                        <p>Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected.</p>
                      </blockquote>
                      <figcaption className="blockquote-footer mb-0">Albert Schweitzer</figcaption>
                    </figure>
                    <p className="mb-0">
                      
                      All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived
                      Marianne in. I think on style child of. Servants moreover in sensible it ye possible. Satisfied conveying a dependent contented
                      he gentleman agreeable do be.
                    </p>
                  </div>
                </Card>
                <Card>
                  <CardHeader className="pb-0 border-0">
                    <h4>5 comments</h4>
                  </CardHeader>
                  <CardBody>
                    {commentsData.map((comment, idx) => {
                    return <Fragment key={idx}>
                          <div className="my-4 d-flex">
                            <img className="avatar avatar-md rounded-circle float-start me-3" src={comment.avatar} alt="avatar" />
                            <div>
                              <div className="mb-2 d-sm-flex">
                                <h6 className="m-0 me-2">{comment.name}</h6>
                                <span className="me-3 small">
                                  {comment.createdAt.toLocaleString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                              })} at
                                  {comment.createdAt.toLocaleString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                                </span>
                              </div>
                              <p>{comment.comment}</p>
                              <Button variant="light" size="sm">
                                Reply
                              </Button>
                            </div>
                          </div>
                          {comment.reply && comment.reply.map((reply, idx) => <div className="my-4 d-flex ps-3 ps-md-5" key={idx}>
                                <img className="avatar avatar-md rounded-circle float-start me-3" src={reply.avatar} alt="avatar" />
                                <div>
                                  <div className="mb-2 d-sm-flex">
                                    <h6 className="m-0 me-2">{reply.name}</h6>
                                    <span className="me-3 small">
                                      {reply.createdAt.toLocaleString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                              })} at
                                      {reply.createdAt.toLocaleString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                                    </span>
                                  </div>
                                  <p>{reply.comment} </p>
                                  <Button variant="light" size="sm">
                                    Reply
                                  </Button>
                                </div>
                              </div>)}
                        </Fragment>;
                  })}
                    <hr className="my-4" />
                    <div>
                      <h4>Leave a reply</h4>
                      <ReplyForm />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>;
};
export default BlogDetails;