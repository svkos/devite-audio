import fontkit from "@pdf-lib/fontkit";
import { OrderType } from "@type/all";
import { PDFDocument } from "pdf-lib";
import { getLogoDevite, getTopString } from "../ConfirmationStep/ConfirmationStep";

export async function getFilledOrderPdf(order: OrderType, customerName: string) {
    const pdfUrl = "/order.pdf";
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    const font = "/fontCyrillic.ttf";
    const fontBytes = await fetch(font).then((res) => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);

    const name = form.getTextField("name");
    const model = form.getTextField("model");
    const caseLeft = form.getTextField("caseLeft");
    const caseRight = form.getTextField("caseRight");
    const topLeft = form.getTextField("topLeft");
    const topRight = form.getTextField("topRight");
    const logoImgLeft = form.getTextField("logoImgLeft");
    const logoImgRight = form.getTextField("logoImgRight");
    const logoDeviteLeft = form.getTextField("logoDeviteLeft");
    const logoDeviteRight = form.getTextField("logoDeviteRight");
    const cable = form.getTextField("cable");
    const boxText = form.getTextField("boxText");
    const comment = form.getTextField("comment");

    name.setText(customerName);
    name.updateAppearances(customFont);

    model.setText(order.model);
    model.updateAppearances(customFont);

    caseLeft.setText(order.left.caseColor.name);
    caseLeft.updateAppearances(customFont);

    caseRight.setText(order.right.caseColor.name);
    caseRight.updateAppearances(customFont);

    topLeft.setText(getTopString("left", order));
    topLeft.updateAppearances(customFont);

    topRight.setText(getTopString("right", order));
    topRight.updateAppearances(customFont);

    logoImgLeft.setText(order.left.logoImg ? "Загружено" : "Нет");
    logoImgLeft.updateAppearances(customFont);

    logoImgRight.setText(order.right.logoImg ? "Загружено" : "Нет");
    logoImgRight.updateAppearances(customFont);

    logoDeviteLeft.setText(getLogoDevite("left", order));
    logoDeviteLeft.updateAppearances(customFont);

    logoDeviteRight.setText(getLogoDevite("right", order));
    logoDeviteRight.updateAppearances(customFont);

    cable.setText(
        `${order.cable.black ? `Черный - ${order.cable.black}` : ""} ${order.cable.white ? `Белый - ${order.cable.white}` : ""}`,
    );
    cable.updateAppearances(customFont);

    boxText.setText(order.boxText);
    boxText.updateAppearances(customFont);

    comment.setText(order.comment);
    comment.updateAppearances(customFont);

    const bytes = await pdfDoc.save();

    return new Blob([bytes], { type: "application/pdf" });
}
