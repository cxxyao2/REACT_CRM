import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from './MyDocument';

const PDFWrapper = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

export default PDFWrapper;;