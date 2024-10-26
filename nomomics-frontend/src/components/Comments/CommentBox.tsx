// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';
// import { Quill } from 'react-quill';
// import {
//     AiOutlineBold,
//     AiOutlineItalic,
//     AiOutlineLink,
//     AiOutlineFile,
// } from 'react-icons/ai';
// import { RiSendPlaneLine } from 'react-icons/ri';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// const CommentBox = () => {
//     const [editorValue, setEditorValue] = useState<string>('');

//     const handleEditorChange = (value: string) => {
//         setEditorValue(value);
//     };

//     const modules = {
//         toolbar: [
//             [{ header: [1, 2, false] }],
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             ['link', 'image', 'video'],
//         ],
//     };

//     const handleSubmit = () => {
//         console.log('Comment:', editorValue);
//         // Implement your submit functionality here (send to backend)
//     };

//     return (
//         <div className='w-full mx-auto my-4 p-4 px-0 rounded-lg bg-white'>
//             <ReactQuill
//                 value={editorValue}
//                 onChange={handleEditorChange}
//                 modules={modules}
//                 className='h-20 rounded-xl w-full text-[16px] outline-none'
//                 placeholder='Type your comment here...'
//             />
//             <div className='flex justify-end mr-6'>
//                 <button
//                     onClick={handleSubmit}
//                     className='bg-gray-400 cursor-pointer text-white p-2 rounded-lg flex items-center space-x-1 hover:bg-gray-400'
//                 >
//                     {/* <RiSendPlaneLine /> */}
//                     <span>Send</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CommentBox;

import React, { useCallback, useState } from 'react';
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
} from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineFile,
  AiOutlinePicture,
} from 'react-icons/ai';
import { RiSendPlaneLine } from 'react-icons/ri';
import { css } from '@emotion/css';
import { Picker } from 'emoji-mart';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
] as any;

// Utility functions for handling formatting
const toggleFormat = (editor: any, format: any) => {
  const isActive = isFormatActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isFormatActive = (editor: any, format: string) => {
  const marks = Editor.marks(editor) as [];
  return marks ? marks[format as any] === true : false;
};

// Leaf component to apply formatting to text
const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.link) {
    children = (
      <a
        href={leaf.url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 underline'
      >
        {children}
      </a>
    );
  }
  return <span {...attributes}>{children}</span>;
};

// Image component
const ImageElement = ({ attributes, children, element }: any) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img src={element.url} alt='' className='max-w-full h-auto' />
      </div>
      {children}
    </div>
  );
};

// Link component
const LinkElement = ({ attributes, children, element }: any) => {
  return (
    <a href={element.url} {...attributes} className='text-blue-500 underline'>
      {children}
    </a>
  );
};

const CommentBox = () => {
  const [editor] = useState<any>(() => withReact(withHistory(createEditor())));
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'image':
        return <ImageElement {...props} />;
      case 'link':
        return <LinkElement {...props} />;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  // Function to insert an image element into the editor
  const insertImage = (url: string) => {
    const text = { text: '' };
    const image = { type: 'image', url, children: [text] };
    Transforms.insertNodes(editor, image);
  };

  // Function to insert a link
  const insertLink = () => {
    if (!linkUrl) return;

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);

    if (isCollapsed) {
      Transforms.insertNodes(editor, {
        type: 'link',
        url: linkUrl,
        children: [{ text: linkUrl }],
      } as any);
    } else {
      Transforms.wrapNodes(
        editor,
        { type: 'link', url: linkUrl, children: [] } as any,
        { split: true }
      );
      Transforms.collapse(editor, { edge: 'end' });
    }

    setLinkUrl(''); // Reset the input
    setShowLinkInput(false);
  };

  // Function to handle image file input
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event as any).target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      insertImage((reader as any).result);
    };
    reader.readAsDataURL(file); // Convert image to base64 URL
  };

  // Function to handle image URL input
  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      insertImage(imageUrl);
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const handleBold = () => {
    toggleFormat(editor, 'bold');
  };

  const handleItalic = () => {
    toggleFormat(editor, 'italic');
  };

  const handleSubmit = () => {
    console.log('Comment:', JSON.stringify(value));
  };

  const toggleLinkInput = () => {
    setShowLinkInput(!showLinkInput);
  };

  const addEmoji = (emoji: any) => {
    const { selection } = editor;
    if (selection) {
      Transforms.insertText(editor, emoji.native);
    }
  };

  return (
    <div
      className='w-full mx-auto my-3 mb-6 border border-gray-300 rounded-lg bg-white'
      onClick={() => {
        // setShowLinkInput(false);
        // setShowImageInput(false);
      }}
    >
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(newValue: any) => {
          console.log(newValue);
          setValue(newValue);
        }}
      >
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder='Type your comment...'
          className={`${css`
            min-height: 112px;
            padding: 10px;
          `} focus-within:outline-none placeholder:p-3`}
        />
        <div className='flex relative space-x-4 rounded-tr-md w-[350px] py-1 justify-between h-[46px] bg-gray-200 px-4'>
          <div className=' flex gap-4'>
            <button
              onClick={handleBold}
              className='text-gray-700  text-xl hover:text-black'
            >
              <AiOutlineBold />
            </button>
            <button
              onClick={handleItalic}
              className='text-gray-700  text-xl hover:text-black'
            >
              <AiOutlineItalic />
            </button>

            <button className='text-gray-700  text-xl hover:text-black'>
              <AiOutlineFile />
            </button>
            <button
              onClick={() => setShowImageInput(!showImageInput)}
              className='text-gray-700 text-xl hover:text-black'
            >
              <AiOutlinePicture />
            </button>
          </div>

          <div className=' flex gap-4'>
            <button
              onClick={toggleLinkInput}
              className='text-gray-700  text-xl hover:text-black'
            >
              <AiOutlineLink />
            </button>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className='text-gray-600 hover:text-black'
            >
              😊
            </button>

            <button
              onClick={handleSubmit}
              className='bg-gray-400 text-white px-2 rounded-lg flex items-center hover:bg-gray-500'
            >
              Send
            </button>
          </div>

          {showLinkInput && (
            <div className='my-2 absolute bg-black rounded-md grid h-full place-content-center place-items-center bg-opacity-20 '>
              <input
                type='text'
                placeholder='Enter URL'
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className=' px-2 py-1 rounded-lg outline-none w-full focus-within:outline-primary focus-within:outline-4 transition-all duration-500 delay-none'
              />
              <div className=' flex gap-2'>
                <button
                  onClick={insertLink}
                  className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
                >
                  Add Link
                </button>
                <button
                  onClick={() => setShowLinkInput(false)}
                  className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {showEmojiPicker && (
                        <Picker onSelect={addEmoji} className='my-2' />
                    )} */}
          {showImageInput && (
            <div className='my-2 absolute w-full bg-black rounded-md grid h-full place-content-center place-items-center bg-opacity-20 '>
              <input
                type='text'
                placeholder='Enter image URL'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className=' px-2 py-1 rounded-lg outline-none w-full focus-within:outline-primary focus-within:outline-4 transition-all duration-500 delay-none'
              />
              <div className=' flex gap-2'>
                <button
                  onClick={handleImageUrlSubmit}
                  className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
                >
                  Insert Image
                </button>
                <button
                  onClick={() => setShowImageInput(false)}
                  className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
                >
                  Close
                </button>
                <label
                  htmlFor='file-input'
                  className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
                >
                  Upload Image
                </label>
              </div>

              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
                id='file-input'
              />
            </div>
          )}
        </div>
      </Slate>
    </div>
  );
};

export default CommentBox;
