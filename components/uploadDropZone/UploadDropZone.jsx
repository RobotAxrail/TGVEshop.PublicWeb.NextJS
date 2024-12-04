import { ContainedButton } from "@/components/buttons/Buttons";
import { XIcon } from "@heroicons/react/outline";
import { useDropzone } from "react-dropzone";
import { LoadingIcon } from "@/components/icons/Icons";
import classes from "./UploadDropZone.module.scss";

const UploadDropZone = ({
  onDrop,
  handleUpload,
  uploadedFiles,
  setUploadedFiles,
  uploadIsLoading,
  onDropIsLoading,
  useDropzoneProps,
  uploadProgress,
  uploadButtonLabel,
  browseButtonLabel,
  browseSubtitle,
  icon,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone(useDropzoneProps);

  return (
    <div
      className="rounded-xl flex items-center justify-center flex-col border-gray-400 border-[1px] border-dashed h-full w-full bg-gray-100"
      {...getRootProps()}
    >
      {onDropIsLoading ? (
        <div>
          {uploadProgress.fileprogress &&
            (uploadProgress.fileprogress * 100).toFixed(2) + "%"}
        </div>
      ) : (
        <>
          {" "}
          <input {...getInputProps()} />
          {uploadedFiles.length > 0 ? (
            <>
              {onDropIsLoading && (
                <div className="h-full w-full flex justify-center items-center">
                  <LoadingIcon color="text-primary" width="w-7" height="h-7" />
                </div>
              )}
              {!onDropIsLoading && (
                <div className="w-full">
                  <div className="flex flex-col justify-between items-center gap-[0.5rem] p-5">
                    <div className="relative border rounded bg-white w-[8rem] h-[8rem] flex justify-center items-center">
                      {icon}
                      <XIcon
                        onClick={() =>
                          uploadIsLoading ? null : setUploadedFiles([])
                        }
                        disabled={uploadIsLoading}
                        className={`w-6 h-6 absolute top-0 right-0 cursor-pointer ${
                          uploadIsLoading ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <label
                      className={`${
                        classes.limitTo3LinesContainer
                      } max-w-[85%] break-all ${
                        uploadIsLoading ? "text-gray-400" : "text-gray-600"
                      }
                `}
                    >
                      {uploadedFiles[0].name}
                    </label>
                    <ContainedButton
                      loading={uploadIsLoading}
                      disabled={uploadIsLoading}
                      onClick={handleUpload}
                    >
                      {uploadButtonLabel}
                    </ContainedButton>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <ContainedButton onClick={open}>
                {browseButtonLabel}
              </ContainedButton>
              <p>{browseSubtitle}</p>
            </>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default UploadDropZone;
