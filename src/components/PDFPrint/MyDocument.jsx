import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { LineNumberPerPage } from "../../config/config.json";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    lineHeight: "120%",
  },
  subtitle: {
    fontSize: 16,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: "justify",
  },
  tableTitle: {
    margin: 12,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "justify",
  },
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

// Create Document Component
// 20 line every page
// one Text = one Line in A4
// 90 characters = one lines
// lineContent 每行内容第一列是行号
const MyDocument = ({ subtitle, content, pageCount, fieldsString }) => (
  <Document>
    {Array.apply(null, Array(pageCount)).map((item, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View style={styles.section}>
          <Subtitle style={styles.subtitle}>{subtitle}</Subtitle>
          <Text style={styles.tableTitle}>{fieldsString}</Text>
          {content
            .slice(
              index * LineNumberPerPage,
              index * LineNumberPerPage + LineNumberPerPage
            )
            .map((lineContent, index2) => (
              <Text key={index2} style={styles.text}>
                {lineContent}
              </Text>
            ))}
        </View>
      </Page>
    ))}
  </Document>
);

export default MyDocument;
