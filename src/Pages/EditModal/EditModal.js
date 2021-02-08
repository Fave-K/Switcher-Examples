import React from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import is from "is_js";
import Switcher from "../../components/Switcher";

function EditModal({
  modalStatus,
  openModal,
  closeModal,
  content,
  updateRecordDetails,
  updateRecordDetailsProcess,
}) {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    updateRecordDetails(content.id, data);
  };

  return (
    <Modal
      onClose={closeModal}
      onOpen={openModal}
      open={modalStatus}
      trigger={
        <Button basic size="mini" color="blue" icon>
          <Icon name="write" />
        </Button>
      }
    >
      <Modal.Header>Edit Record</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label>Rating</label>
            <input
              name="rating"
              ref={register}
              defaultValue={is.existy(content.rating) ? content.rating : ""}
            />
          </Form.Field>

          <Form.Field>
            <label>Effect</label>
            <input
              name="effect"
              ref={register}
              defaultValue={is.existy(content.effect) ? content.effect : ""}
            />
          </Form.Field>

          <Form.Field>
            <label>Efficacy</label>
            <input
              name="efficacy"
              ref={register}
              defaultValue={is.existy(content.efficacy) ? content.efficacy : ""}
            />
          </Form.Field>

          <Form.Field>
            <label>Consensus</label>
            <input
              name="consensus"
              ref={register}
              defaultValue={
                is.existy(content.consensus) ? content.consensus : ""
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Comments</label>

            <textarea
              name="comments"
              ref={register}
              defaultValue={is.existy(content.comments) ? content.comments : ""}
            ></textarea>
          </Form.Field>

          <Form.Field>
            <Modal.Actions>
              <Button
                basic
                color="black"
                size="small"
                onClick={() => closeModal()}
              >
                Close
              </Button>

              <Switcher
                value={updateRecordDetailsProcess.status}
                IDLE={
                  <Button type="submit" content="Save" primary size="small" />
                }
                PROCESSING={
                  <Button
                    icon
                    content="Loading"
                    primary
                    loading
                    basic
                    size="small"
                    onClick={(e) => e.preventDefault()}
                  />
                }
                SUCCESS={
                  <Button
                    content="Success"
                    positive
                    size="small"
                    onClick={(e) => e.preventDefault()}
                  />
                }
                ERROR={
                  <Button
                    content="Error"
                    negative
                    size="small"
                    onClick={(e) => e.preventDefault()}
                  />
                }
              />
            </Modal.Actions>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default EditModal;

EditModal.propTypes = {
  modalStatus: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  content: PropTypes.object,
  updateRecordDetails: PropTypes.func,
  updateRecordDetailsProcess: PropTypes.object,
};
