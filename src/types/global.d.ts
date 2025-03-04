// Global variable declarations to fix TypeScript errors
interface Window {
  __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  _REACT_DEVTOOLS_GLOBAL_HOOK_: any;
  DebuggerInternal: any;
  IS_REACT_ACT_ENVIRONMENT: boolean;
  nativeFabricUlManager: any;
  RN$enableMicrotasksInReact: any;
  reportError: any;
}

declare const console: Console;
declare const setTimeout: (callback: (...args: any[]) => void, ms?: number, ...args: any[]) => number;
declare const clearTimeout: (id: number) => void;
declare const queueMicrotask: (callback: () => void) => void;
declare const AbortController: any;
declare const fetch: typeof globalThis.fetch;
declare const Headers: typeof globalThis.Headers;
declare const Request: typeof globalThis.Request;
declare const Response: typeof globalThis.Response;
declare const FileReader: any;
declare const Blob: any;
declare const FormData: any;
declare const URLSearchParams: any;
declare const self: Window & typeof globalThis;

// React Native specific globals
declare namespace NodeJS {
  interface Global {
    HermesInternal?: {
      getRuntimeProperties?: () => Record<string, any>;
    };
    performance: {
      now: () => number;
    };
  }
}
