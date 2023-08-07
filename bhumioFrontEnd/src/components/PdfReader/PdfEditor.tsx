import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

type PdfEditorProps = {
  pdfUrl: string;
};
/**
 * Component to render pdf and save the edited pdf.
 */
export const PdfEditor = (props: PdfEditorProps) => {
  console.log(props.pdfUrl);
  const iframeRef = useRef(null);
  /**
   * Function to save pdf file after edit from the iframe.
   */
  // const savePdf = async () => {
  //   const iframe = iframeRef.current;
  //   if (iframe) {
  //     console.log(iframe);
  //     const canvas = await html2canvas(iframe, { useCORS: true });
  //     console.log(canvas);
  //     const pdf = new jsPDF("p", "px", [1140, 1131]);
  //     const imgData = canvas.toDataURL("image/png");
  //     pdf.addImage(imgData, "PNG", 15, 15, 1110, 866);
  //     pdf.save("iframe_content.pdf");
  //   }
  // };

  return (
    <>
      {/* <button onClick={savePdf}>save</button> */}
      <iframe
        ref={iframeRef}
        title="PdfEditor"
        src={props.pdfUrl}
        width="800px"
        height="500px"
      />
    </>
  );
};
