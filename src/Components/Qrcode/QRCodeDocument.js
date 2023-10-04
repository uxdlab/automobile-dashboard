import React from "react";
import { Document, Page, Image, View, StyleSheet } from "@react-pdf/renderer";
import QRGenerator from "./QRGenerator";
const styles = StyleSheet.create({
  page: {
    display: "block",
  },
  view: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    width: "100%",
  },
  qrImage: {
    width: "20%",
    height: "70%",
  },
});

function QRCodePage({ id }) {
  const dataUrl = document.getElementById(id).toDataURL();
  console.log(dataUrl);
  return <Image allowDangerousPaths src={dataUrl} style={styles.qrImage} />;
}

function QRCodeDocument({ ids }) {
  return (
    <Document>
      <Page size="B8" style={styles.page}>
        <View style={styles.view}>
          {ids.map((id) => (
            <QRCodePage id={id} />
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default QRCodeDocument;
