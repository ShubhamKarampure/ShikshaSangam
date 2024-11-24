import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const ReplyForm = () => {
  const replyFormSchema = yup.object({
    name: yup.string().required('please enter your name'),
    email: yup.string().email('please enter valid email').required('please enter your email'),
    comment: yup.string().required('please enter your comment')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(replyFormSchema)
  });
  return <form className="row g-3 mt-2" onSubmit={handleSubmit(() => {})}>
      <TextFormInput name="name" label="Name *" containerClassName="col-md-6" control={control} />
      <TextFormInput name="email" type="email" label="Email *" containerClassName="col-md-6" control={control} />
      <TextAreaFormInput name="comment" label="Your Comment *" rows={3} containerClassName="col-12" control={control} />
      <Col xs={12}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Save my name and email in this browser for the next time I comment.
          </label>
        </div>
      </Col>
      <Col xs={12}>
        <Button variant="primary" type="submit">
          Post comment
        </Button>
      </Col>
    </form>;
};
export default ReplyForm;