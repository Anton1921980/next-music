import React, { useRef } from "react";

interface FileUploaderProps {
  setFile: Function;
  accept: string;
  children: any;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files[0]);
  };
  return (
    <div onClick={() => ref?.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default FileUploader;
