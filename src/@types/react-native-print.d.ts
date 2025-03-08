declare module 'react-native-print' {
  interface PrintOptions {
    filePath?: string;
    html?: string;
    printerURL?: string;
    isLandscape?: boolean;
    jobName?: string;
  }

  interface SelectPrinterOptions {
    x?: number;
    y?: number;
  }

  const RNPrint: {
    print(options: PrintOptions): Promise<string>;
    printToFile(options?: PrintOptions): Promise<string>;
    printFile(options: { filePath: string }): Promise<string>;
    selectPrinter(options?: SelectPrinterOptions): Promise<string>;
  };

  export default RNPrint;
} 