import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

const EMPTY_CONTENT_STATE = null;

export default {
  // RawDraftContentState => EditorState.
  createEditorState(rawContentState) {
    let editorState;

    if (rawContentState) {
      const contentState = convertFromRaw(rawContentState);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    return editorState;
  },

  // EditorState => RawDraftContentState.
  serialiseEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    const isEmpty = rawContentState.blocks.every(
      (block) =>
        block.text.trim().length === 0 &&
        block.entityRanges.length === 0 &&
        block.inlineStyleRanges.length === 0,
    );

    return isEmpty ? EMPTY_CONTENT_STATE : rawContentState;
  },
};
