import {jsPDF} from 'jspdf';
// Default export is a4 paper, portrait, using millimeters for units

let doc;
const getImageSrc = (value , tagId) => {
  
    const SIZE = "300x300";

    const content = value+","+ tagId;

    const URL = `https://image-charts.com/chart?chs=${SIZE}&cht=qr&chl=${content}&choe=UTF-8`;
    // const URL = `https://image-charts.com/chart?chs=${SIZE}&cht=qr&chl=${content}&choe=UTF-8`;

    return URL;
  };

  const QRGenerator = (QrData) => {
    doc=new jsPDF();
    renderImagesPDF(QrData);
    doc.save("QrCodes.pdf");
  };

  const renderImagesPDF = (QrData) => {
    let x = 0;

    let y = 10;
    let j = 0;
    let k = 0;
    let items = 0;
    const qrSize = 50;
    const A4pageWidth = 180; // 210mm
    const A4pageHeight = 297; // 297mm
    const vPadding = 7;
    console.log(QrData)

    QrData.forEach((res)=>{
      if (items >= 20) {
        doc.addPage();
        x = 0;
        y = 10;
        j = 0;
        k = 0;
        items = 0;
      }
      let imageData = new Image(300, 300);
      imageData.src = getImageSrc(res.denomination,res.point_id);
      // doc.text("Scan me", x, y);
      doc.addImage(imageData, "PNG", x, y, qrSize, qrSize);
      doc.setFontSize(16);
      // doc.text(`Go ${res.denomination},${res.point_id}`, x + textPadding, y + qrSize - 3);

      // console.log("x,y", x, y);
      items++;
      if (x >= A4pageWidth - qrSize) {
        x = 0;
        k = 0;
        y = ++j * qrSize + vPadding;
      } else {
        x = ++k * qrSize;
      }
    
    })
     
  };
  
  export default QRGenerator;
