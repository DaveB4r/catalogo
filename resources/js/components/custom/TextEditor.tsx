import { Dispatch, SetStateAction } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type Props = {
    placeholder: string;
    value?: string;
    setValue?: Dispatch<SetStateAction<string>>;
};

export default function TextEditor({ placeholder, value, setValue }: Props) {
    return <ReactQuill theme="snow" value={value} onChange={setValue} placeholder={placeholder} />;
}
