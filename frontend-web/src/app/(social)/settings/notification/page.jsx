import { Fragment } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
import { notifications } from './data';
import PageMetaData from '@/components/PageMetaData';
const Notification = () => {
  return <>
    <PageMetaData title='Notification' />
    <Card>
      <CardHeader className="border-0 pb-0">
        <h5 className="card-title">Notification</h5>
        <p className="mb-0">
          Tried law yet style child. The bore of true of no be deal. Frequently sufficient to be unaffected. The furnished she concluded depending
          procuring concealed.
        </p>
      </CardHeader>
      <CardBody className="pb-0">
        <ul className="list-group list-group-flush">
          {notifications.map((notification, idx) => {
            return <Fragment key={idx}>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3" key={idx}>
                  <div className="me-2">
                    <h6 className="mb-0">
                      {notification.title}
                      {notification.isPremium && <span className="badge bg-primary smaller ms-1"> Pro only</span>}
                    </h6>
                    <p className="small mb-0">{notification.description}</p>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="NotiSwitchCheckChecked" disabled={notification.isPremium} defaultChecked={notification.isChecked} />
                  </div>
                </li>
                {notification.isEmail && <li className="list-group-item custom-notification-accordion px-0 py-3">
                    <Accordion flush className="border-0" id="emailNotifications">
                      <AccordionItem eventKey="0" className="bg-transparent">
                        <AccordionHeader id="flush-headingOne">
                          <div className="mb-0 p-0 collapsed bg-transparent shadow-none" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <span>
                              <span className="mb-0 h6 d-block">Email notifications</span>
                              <small className="small mb-0 text-secondary">As hastened oh produced prospect. </small>
                            </span>
                          </div>
                        </AccordionHeader>
                        <AccordionBody className="p-0 pt-3">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="NotiSwitchCheckChecked6" defaultChecked />
                            <label className="form-check-label" htmlFor="NotiSwitchCheckChecked6">
                              Product emails
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="NotiSwitchCheckChecke7" />
                            <label className="form-check-label" htmlFor="NotiSwitchCheckChecke7">
                              Feedback emails
                            </label>
                          </div>
                          <hr />
                          <div className="mt-3">
                            <h6>Email frequency</h6>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="NotiRadio" id="NotiRadio1" />
                              <label className="form-check-label" htmlFor="NotiRadio1">
                                Daily
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="NotiRadio" id="NotiRadio2" defaultChecked />
                              <label className="form-check-label" htmlFor="NotiRadio2">
                                Weekly
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="NotiRadio" id="NotiRadio3" />
                              <label className="form-check-label" htmlFor="NotiRadio3">
                                Periodically
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="NotiRadio" id="NotiRadio4" defaultChecked />
                              <label className="form-check-label" htmlFor="NotiRadio4">
                                Off
                              </label>
                            </div>
                          </div>
                        </AccordionBody>
                      </AccordionItem>
                    </Accordion>
                  </li>}
              </Fragment>;
          })}
        </ul>
      </CardBody>
      <CardFooter className="pt-0 text-end border-0">
        <button type="submit" className="btn btn-sm btn-primary mb-0">
          Save changes
        </button>
      </CardFooter>
    </Card>
    </>;
};
export default Notification;