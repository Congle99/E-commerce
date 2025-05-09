import React from "react";
import { useParams } from "react-router-dom";
import InvoicePrintPage from "./InvoicePrintPage";

export default function InvoicePrintPageWrapper() {
  const { id } = useParams();
  return <InvoicePrintPage invoiceId={id} />;
}
