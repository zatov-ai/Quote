import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportElementToPDF(el: HTMLElement, filename = "quote.pdf") {
  const canvas = await html2canvas(el, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const ratio = pageWidth / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 20, canvas.width*ratio, canvas.height*ratio, undefined, "FAST");
  pdf.save(filename);
}