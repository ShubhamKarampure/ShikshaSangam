import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Card, CardBody, CardHeader, CardTitle, Col } from 'react-bootstrap';
import { BsFacebook, BsInstagram, BsPinterest, BsTwitter } from 'react-icons/bs';
const CreatePageForm = () => {
  const createFormSchema = yup.object({
    pageName: yup.string().required('Please enter your page name'),
    displayName: yup.string().required('Please enter your display name'),
    email: yup.string().email('Please enter valid email').required('Please enter your email'),
    url: yup.string().required('Please enter your website url'),
    phoneNo: yup.number().required('Please enter your phone no'),
    aboutPage: yup.string().required('Please enter your page description').max(300, 'character limit must less then 300')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(createFormSchema)
  });
  return <Card>
      <CardHeader className="border-0 pb-0">
        <h1 className="h4 card-title mb-0">Create a page</h1>
      </CardHeader>
      <CardBody>
        <form className="row g-3" onSubmit={handleSubmit(() => {})}>
          <Col xs={12}>
            <TextFormInput name="pageName" label="Page name" placeholder="Page name (Required)" control={control} />
            <small>Name that describes what the page is about.</small>
          </Col>
          <TextFormInput name="displayName" label="Display name" placeholder="Display name (Required)" control={control} containerClassName="col-sm-6 col-lg-4" />
          <TextFormInput name="email" label="Email" placeholder="Email (Required)" control={control} containerClassName="col-sm-6 col-lg-4" />
          <Col sm={6} lg={4}>
            <label className="form-label">Category (required)</label>
            <ChoicesFormInput className="form-select js-choice" data-search-enabled="true">
              <option value="PV">Comedy</option>
              <option value="PB">Technology</option>
              <option value="PV">Education</option>
              <option value="PV">Entertainment</option>
              <option value="PV">Hotel</option>
              <option value="PV">Travel</option>
            </ChoicesFormInput>
          </Col>
          <TextFormInput name="url" label="Website URL" placeholder="https://www.webestica.com" control={control} containerClassName="col-sm-6" />
          <TextFormInput name="phoneNo" label="Phone number" placeholder="Phone number (Required)" control={control} containerClassName="col-lg-6" />
          <Col xs={12}>
            <TextAreaFormInput name="aboutPage" label="About page" rows={3} placeholder="Description (Required)" control={control} />
            <small>Character limit: 300</small>
          </Col>
          <hr />
          <Col xs={12}>
            <CardTitle className="mb-0">Social Links</CardTitle>
          </Col>
          <Col sm={6}>
            <label className="form-label">Facebook</label>
            <div className="input-group">
              <span className="input-group-text border-0">
                
                <BsFacebook className="text-facebook" />
              </span>
              <input type="text" className="form-control" placeholder="https://www.facebook.com" />
            </div>
          </Col>
          <Col sm={6}>
            <label className="form-label">Twitter</label>
            <div className="input-group">
              <span className="input-group-text border-0">
                
                <BsTwitter className="text-twitter" />
              </span>
              <input type="text" className="form-control" placeholder="https://www.twitter.com" />
            </div>
          </Col>
          <Col sm={6}>
            <label className="form-label">Instagram</label>
            <div className="input-group">
              <span className="input-group-text border-0">
                
                <BsInstagram className="text-instagram" />
              </span>
              <input type="text" className="form-control" placeholder="https://www.instagram.com" />
            </div>
          </Col>
          <Col sm={6}>
            <label className="form-label">Pinterest</label>
            <div className="input-group">
              <span className="input-group-text border-0">
                
                <BsPinterest className="text-pinterest" />
              </span>
              <input type="text" className="form-control" placeholder="https://www.pinterest.com" />
            </div>
          </Col>
          <Col xs={12} className="text-end">
            <Button variant="primary" type="submit" className="mb-0">
              Create a page
            </Button>
          </Col>
        </form>
      </CardBody>
    </Card>;
};
export default CreatePageForm;