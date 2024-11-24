import useFileUploader from '@/hooks/useFileUploader';
import { Card, Col, FormLabel, FormText } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  icon,
  iconProps,
  showPreview,
  text,
  textClassName,
  onFileUpload
}) => {
  const {
    selectedFiles,
    handleAcceptedFiles,
    removeFile
  } = useFileUploader(showPreview);
  const Icon = icon ?? BsUpload;
  return <>
      <FormLabel className={labelClassName}>{label}</FormLabel>

      <Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, onFileUpload)} maxFiles={5}>
        {({
        getRootProps,
        getInputProps
      }) => <div className="dropzone dropzone-custom cursor-pointer">
            <div className="dz-message" {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon {...iconProps} className="display-3" />
              <p className={textClassName}>{text}</p>
            </div>
            {showPreview && selectedFiles.length > 0 && <div className="dz-preview row g-4">
                {(selectedFiles || []).map((file, idx) => <Col md={4} sm={6} key={`file-${idx}-${file.name}`}>
                    <Card className="p-2 mb-0 shadow-none border position-relative h-100">
                      {file.preview ? <img alt={file.name} src={file.preview} className="rounded bg-light" /> : <div className="rounded bg-light text-center">{file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase()}</div>}
                      <div className="mt-2">
                        <p role="button" className="text-body-secondary fw-bold">
                          {file.name}
                        </p>
                        <p className="mb-0 small">{file.formattedSize}</p>
                      </div>
                      <div className="position-absolute top-0 start-100 translate-middle">
                        <button className="btn btn-danger rounded-circle icon-sm p-0 d-flex align-items-center justify-content-center" onClick={() => removeFile(file)}>
                          <FaTimes />
                        </button>
                      </div>
                    </Card>
                  </Col>)}
              </div>}
          </div>}
      </Dropzone>

      {helpText && typeof helpText === 'string' ? <FormText>{helpText}</FormText> : helpText}
    </>;
};
export default DropzoneFormInput;