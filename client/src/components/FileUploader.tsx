import React, { useRef } from "react";

interface FileUploaderProps {
  setPictureUrl: Function;
  setAudioName: Function;
  setFile: Function;
  accept: string;
  children: any;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  setFile,
  setPictureUrl,
  setAudioName,
  accept,
  children,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.target.files[0] && setFile(e.target.files[0]);
      (e.target.files[0]?.type === "image/jpeg")
        ? setPictureUrl(URL.createObjectURL(e.target.files[0]))
        : setAudioName(e.target.files[0]?.name);
    }
  };
  
  const ref = useRef<HTMLInputElement>();

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
