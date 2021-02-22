import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectArticle } from './slice/selectors';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { WysiwygEditor } from 'app/components/WysiwygEditor';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useArticleSlice } from './slice';
import { FormInput } from 'app/components/FormInput';
import { Button } from 'app/components/Button';

interface Props {
  articleId: string;
  history: History;
}

export function ArticleEditor({ articleId, history }) {
  const { actions } = useArticleSlice();

  const article = useSelector(selectArticle);
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();

  const onEditorStateChange: Function = state => {
    setEditorState(state);
  };

  useEffect(() => {
    dispatch(actions.loadArticle(articleId));
  }, [articleId]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      const contentState = ContentState.createFromBlockArray(
        htmlToDraft(article.content),
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [article]);

  const onUpdate = () => {
    if (title.trim().length === 0) {
      return;
    }
    const articleForm = {
      title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    dispatch(actions.updateArticle({ articleForm, history }));
  };

  const onCancel = () => {
    history.push(`/articles/${articleId}`);
  };

  return (
    <>
      {article && (
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
            <Button onClick={onUpdate}>Update</Button>
            <Button onClick={onCancel} secondary>
              Cancel
            </Button>
          </ControlWrapper>
        </EditorWrapper>
      )}
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

  ${Button} {
    margin-left: 10px;
  }
`;
