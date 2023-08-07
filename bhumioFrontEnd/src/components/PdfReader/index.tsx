import React, { useState } from "react";
import { PdfEditor } from "./PdfEditor";
import axios from "axios";
import storage from "../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
/**
 * Component to capture,save and retrieve pdf from database.
 * @returns Renders UI for Pdf related components
 */
export const PdfReader = () => {
  const [fileName, setFileName] = useState<string>();
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [percent, setPercent] = useState<number>(0);
  const [id, setId] = useState<number>()
  // TODO: Implement State management and middleware for handling api.
  /**
   * Function to upload pdf file to the file storage and return url while selecting the file.
   * @param event
   */
  const handleUpload = (event: any) => {
    setId(0)
    const file = event.target.files[0];
    if (!file) {
      alert("Please choose a file first!");
    }
    if (file) {
      setFileName(file.name);
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setPdfUrl(url);
            return url;
          });
        }
      );
    }
  };
  /**
   * Function to retrieve pdf data with respect to id we are providing.
   * @param id
   */
  const loadPdf = (id: number) => {
    axios
      .get(`http://localhost:3333/pdf/${id}`)
      .then((response) => {
        setPdfUrl(response.data.pdfUrl);
        setFileName(response.data.name)
        setId(id)
        setPercent(100)
      })
      .catch((err) => {
        alert(err);
      });
  };

  /**
   * Function to submit the data to postgresql database with desired fields.
   */
  const submitData = () => {
    if (pdfUrl && fileName) {
      const data = {
        id: 1,
        name: fileName,
        pdfUrl: pdfUrl,
      };
      console.log(data);
      axios
        .post("http://localhost:3333/pdf/create", data)
        .then((response) => {
          alert("Successfully submitted...!");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  /**
   * Function used to update data when its loaded from Db and edited
   */
  const updateData = () => {
    if (pdfUrl && fileName && id) {
      const editedData = {
        id: id,
        name: fileName,
        pdfUrl: pdfUrl,
      };
      console.log(editedData);
      axios
        .put(`http://localhost:3333/pdf/${id}`, editedData)
        .then((response) => {
          alert("Successfully edited and saved...!");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
  //
  return (
    <>
      <section className="flex flex-col">
        <form action="" className="flex flex-col mb-4 items-center">
          <label className="text-xl mb-2">Choose your file</label>
          <input
            className="border-2 w-1/2 mx-auto"
            type="file"
            onChange={handleUpload}
            name="file"
            id="file"
          />
        </form>
        <div className="mx-auto space-x-5">
          <button
            className="border-1 bg-blue-600 text-white py-2 px-3 rounded-md font-bold cursor-pointer"
            onClick={() => loadPdf(3)}
          >
            Load PDF from DB
          </button>
          <button
            className={`border-1 text-white py-2 px-3 rounded-md font-bold  ${percent === 100
              ? "bg-green-600 cursor-pointer"
              : "bg-green-300 cursor-not-allowed"
              }`}
            disabled={percent !== 100}
            onClick={id ? updateData : submitData}
          >
            {
              id ? "Edit and save" : "Save to DB"
            }

          </button>
        </div>
      </section>
      <section className="flex justify-center mt-3 mb-3">
        Upload/Download progress
        <span className="text-green-500 font-semibold">
          &nbsp;{percent}%&nbsp;
        </span>
        done
      </section>
      <section className="w-[800px] h-[500px] bg-slate-200 rounded-md overflow-hidden grid place-content-center">
        {pdfUrl ? <PdfEditor pdfUrl={pdfUrl} /> : <span>No PDF file selected</span>}
      </section>
    </>
  );
};
