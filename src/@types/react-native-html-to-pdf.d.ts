declare module 'react-native-html-to-pdf' {
  interface RNHTMLtoPDFOptions {
    html: string;
    fileName?: string;
    directory?: string;
    base64?: boolean;
    height?: number;
    width?: number;
    padding?: number;
  }

  interface RNHTMLtoPDFResponse {
    filePath: string;
    base64?: string;
  }

  const RNHTMLtoPDF: {
    convert(options: RNHTMLtoPDFOptions): Promise<RNHTMLtoPDFResponse>;
  };

  export default RNHTMLtoPDF;
} 