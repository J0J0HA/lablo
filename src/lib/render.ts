import jsPDF from "jspdf";
import { snapdom } from '@zumer/snapdom';

export async function renderPNG(element: HTMLElement) {
    const result = await snapdom(element, { scale: 4, embedFonts: true });
    await result.download({ type: 'png', filename: 'labels.png' });
}

export async function renderPDF(element: HTMLElement) {
    const result = await snapdom(element, { scale: 4, embedFonts: true });
    const img = (await result.toCanvas()).toDataURL("image/png");
    const pdf = new jsPDF({
        format: "a4",
        orientation: "landscape",
    });
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("labels.pdf");
}
