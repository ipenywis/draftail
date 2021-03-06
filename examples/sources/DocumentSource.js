import React, { Component } from "react";
import PropTypes from "prop-types";

import { RichUtils } from "draft-js";

import Modal from "../components/Modal";

class DocumentSource extends Component {
  constructor(props) {
    super(props);

    const { entity } = this.props;
    const state = {
      url: "",
    };

    if (entity) {
      const data = entity.getData();
      state.url = data.url;
    }

    this.state = state;

    this.onRequestClose = this.onRequestClose.bind(this);
    this.onAfterOpen = this.onAfterOpen.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
  }

  onConfirm(e) {
    const { editorState, entityType, onComplete } = this.props;
    const { url } = this.state;

    e.preventDefault();

    const contentState = editorState.getCurrentContent();

    const data = {
      url: url.replace(/\s/g, ""),
    };
    const contentStateWithEntity = contentState.createEntity(
      entityType.type,
      "MUTABLE",
      data,
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const nextState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey,
    );

    onComplete(nextState);
  }

  onRequestClose(e) {
    const { onClose } = this.props;
    e.preventDefault();

    onClose();
  }

  onAfterOpen() {
    if (this.inputRef) {
      this.inputRef.focus();
      this.inputRef.select();
    }
  }

  onChangeURL(e) {
    const url = e.target.value;
    this.setState({ url });
  }

  render() {
    const { url } = this.state;
    return (
      <Modal
        onRequestClose={this.onRequestClose}
        onAfterOpen={this.onAfterOpen}
        isOpen
        contentLabel="Document chooser"
      >
        <form className="DocumentSource" onSubmit={this.onConfirm}>
          <label className="form-field">
            <span className="form-field__label">Document URL</span>
            <input
              ref={(inputRef) => {
                this.inputRef = inputRef;
              }}
              type="text"
              onChange={this.onChangeURL}
              value={url}
              placeholder="www.example.com"
            />
          </label>

          <button type="submit">Save</button>
        </form>
      </Modal>
    );
  }
}

DocumentSource.propTypes = {
  editorState: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  entityType: PropTypes.object.isRequired,
  entity: PropTypes.object,
};

DocumentSource.defaultProps = {
  entity: null,
};

export default DocumentSource;
