import * as React from 'react';
import styled from 'styled-components/macro';
import { Editor } from 'react-draft-wysiwyg';

interface Props {
  editorState: any;
  onEditorStateChange: Function;
}

export function WysiwygEditor({ editorState, onEditorStateChange }: Props) {
  return (
    <>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="blog-content-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </EditorWrapper>
    </>
  );
}

const EditorWrapper = styled.div`
  div.rdw-editor-toolbar {
    border: 1px solid ${p => p.theme.border} !important;
  }

  div.blog-content-editor {
    height: 275px !important;
    border: 1px solid ${p => p.theme.border} !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
`;
