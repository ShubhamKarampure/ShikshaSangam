import PageMetaData from '@/components/PageMetaData';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardFooter, CardHeader, CardTitle } from 'react-bootstrap';
const Communication = () => {
  return <>
      <PageMetaData title='Communications' />
      <Card>
        <CardHeader className="border-0 pb-0">
          <CardTitle>Who can connect with you?</CardTitle>
          <p className="mb-0">
            He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment
            alteration to.
          </p>
        </CardHeader>
        <CardBody>
          <Accordion defaultActiveKey="0" id="communications">
            <AccordionItem eventKey="0" className="bg-transparent">
              <AccordionHeader id="communicationOne">
                <div className="mb-0 h6">Connection request</div>
              </AccordionHeader>
              <AccordionBody>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="ComRadio" id="ComRadio5" />
                  <label className="form-check-label" htmlFor="ComRadio5">
                    Everyone on social (recommended)
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="ComRadio" id="ComRadio2" defaultChecked />
                  <label className="form-check-label" htmlFor="ComRadio2">
                    Only people who know your email address
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="ComRadio" id="ComRadio3" />
                  <label className="form-check-label" htmlFor="ComRadio3">
                    Only people who appear in your mutual connection list
                  </label>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="1" className="bg-transparent">
              <AccordionHeader id="communicationTwo">
                <div className="mb-0 h6">Who can message you</div>
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                    <div className="me-2">
                      <p className="mb-0">Enable message request notifications</p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked" />
                    </div>
                  </li>
                  <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                    <div className="me-2">
                      <p className="mb-0">Allow connections to add you on group </p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked2" defaultChecked />
                    </div>
                  </li>
                  <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                    <div className="me-2">
                      <p className="mb-0">Allow Sponsored Messages </p>
                      <p className="small">
                        Your personal information is safe with our marketing partners unless you respond to their Sponsored Messages
                      </p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked3" defaultChecked />
                    </div>
                  </li>
                </ul>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="2" className="bg-transparent">
              <AccordionHeader id="communicationThree">
                <div className="mb-0 h6">How people can find you</div>
              </AccordionHeader>
              <AccordionBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                    <div className="me-2">
                      <p className="mb-0">Allow search engines to show your profile?</p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked4" defaultChecked />
                    </div>
                  </li>
                  <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                    <div className="me-2">
                      <p className="mb-0">Allow people to search by your email address? </p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked5" />
                    </div>
                  </li>
                  <li className="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                    <div className="me-2">
                      <p className="mb-0">Allow Sponsored Messages </p>
                      <p className="small">
                        Your personal information is safe with our marketing partners unless you respond to their Sponsored Messages
                      </p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked6" defaultChecked />
                    </div>
                  </li>
                </ul>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </CardBody>
        <CardFooter className="pt-0 text-end border-0">
          <Button variant="primary" size="sm" type="submit" className="mb-0">
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </>;
};
export default Communication;