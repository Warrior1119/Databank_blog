import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { WysiwygEditor } from 'app/components/WysiwygEditor';

import draftToHtml from 'draftjs-to-html';
import { useArticleSlice } from './slice';
import { FormInput } from 'app/components/FormInput';
import { Button } from 'app/components/Button';

export function ArticleEditor({ history }) {
  const { actions } = useArticleSlice();
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();

  const onEditorStateChange: Function = state => {
    setEditorState(state);
  };

  const onPublish = () => {
    if (title.trim().length === 0) {
      return;
    }
    const articleForm = {
      title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    dispatch(actions.createArticle({ articleForm, history }));
  };

  return (
    <>
      <EditorWrapper>
        <FormInput
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <WysiwygEditor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <ControlWrapper>
          <Button onClick={onPublish}>Publish</Button>
        </ControlWrapper>
      </EditorWrapper>
    </>
  );
}

const EditorWrapper = styled.div`
  margin: 0 0 6.25rem 2.25rem;
`;

const ControlWrapper = styled.div`
  display: flex;
  margin: 1.25rem 0;
  justify-content: flex-end;
`;
