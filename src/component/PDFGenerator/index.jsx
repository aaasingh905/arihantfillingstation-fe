import React from "react";
import { Document, Page } from "@react-pdf/renderer";
import PDFPage from "./page";

const GeneratePDF = ({ data }) => {
  return (
    <Document title="My Document" author="Me" subject="Example">
      <Page size="A4" orientation="landscape">
        <PDFPage shift={"shift1"} data={data} />
      </Page>
      <Page size="A4" orientation="landscape">
        <PDFPage shift={"shift2"} data={data} />
      </Page>
    </Document>
  );
};

export default GeneratePDF;
