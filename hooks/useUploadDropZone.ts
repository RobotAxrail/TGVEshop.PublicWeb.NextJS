import { uploadFileToS3 } from "@/utils/util";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const useUploadDropZone = (
  imageUrl: string,
  supportedFileType: any,
  generateUploadPresignedUrl: (fileName: string) => Promise<string>
) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [onDropIsLoading, setOnDropIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ fileprogress: 0 });

  const uploadFileToS3WithPresignedURL = async (
    uploadPresignedUrl,
    filesParams,
    acceptedFiles,
    index
  ) => {
    const s3UploadRes = await uploadFileToS3(
      uploadPresignedUrl,
      acceptedFiles[index],
      setUploadProgress
    );

    setUploadProgress({ fileprogress: 1 });
    if (s3UploadRes && s3UploadRes.status === 204) {
      setUploadedFiles([...acceptedFiles]);
      return true;
    } else {
      return false;
    }
  };

  const onDrop = async (
    acceptedFiles
  ): Promise<{ message: string; status: "success" | "failed" }> => {
    try {
      setOnDropIsLoading(true);
      setUploadProgress({ fileprogress: 0 });
      const checkFileType = acceptedFiles.map(
        (item) => item.type.substring(0, 6) !== supportedFileType
      );

      if (checkFileType.includes(true)) {
        let filesParams = [];

        if (acceptedFiles.length > 0) {
          for (let index in acceptedFiles) {
            const fileNameSplitList = acceptedFiles[index].name.split(".");

            filesParams.push(
              `${imageUrl}/${uuid()}.${
                fileNameSplitList[fileNameSplitList.length - 1]
              }`
            );
          }
        }

        for (let index in acceptedFiles) {
          if (
            typeof acceptedFiles[index] === "object" &&
            acceptedFiles &&
            acceptedFiles.length > 0
          ) {
            const uploadPresignedUrl = await generateUploadPresignedUrl(
              filesParams[index]
            );

            const uploadRes = await uploadFileToS3WithPresignedURL(
              uploadPresignedUrl,
              filesParams,
              acceptedFiles,
              index
            );

            if (uploadRes) {
              setFilePath(filesParams[index]);
            }
          }
        }
        setOnDropIsLoading(false);
        return {
          status: "success",
          message: "Successfully uploaded.",
        };
      } else {
        setOnDropIsLoading(false);
        return {
          status: "failed",
          message: "Only .pdf, .jpg, .png file format are supported",
        };
      }
    } catch (error) {
      setOnDropIsLoading(false);
      return {
        status: "failed",
        message:
          "Something went wrong when trying to upload file, please try again.",
      };
    }
  };

  return {
    filePath,
    uploadedFiles,
    setUploadedFiles,
    onDropIsLoading,
    uploadProgress,
    onDrop,
  };
};

export default useUploadDropZone;
