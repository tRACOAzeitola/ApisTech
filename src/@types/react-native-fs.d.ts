declare module 'react-native-fs' {
  export const DocumentDirectoryPath: string;
  export const DownloadDirectoryPath: string;
  export const ExternalDirectoryPath: string;
  export const ExternalStorageDirectoryPath: string;
  export const TemporaryDirectoryPath: string;
  export const LibraryDirectoryPath: string;
  export const PicturesDirectoryPath: string;
  export const CachesDirectoryPath: string;
  export const MainBundlePath: string;

  export function readFile(filepath: string, encoding?: string): Promise<string>;
  export function writeFile(filepath: string, contents: string, encoding?: string): Promise<void>;
  export function mkdir(filepath: string, options?: { NSURLIsExcludedFromBackupKey?: boolean }): Promise<void>;
  export function moveFile(filepath: string, destPath: string): Promise<void>;
  export function copyFile(filepath: string, destPath: string): Promise<void>;
  export function pathForBundle(bundleNamed: string): Promise<string>;
  export function pathForGroup(groupName: string): Promise<string>;
  export function getFSInfo(): Promise<{ totalSpace: number; freeSpace: number }>;
  export function existsAssets(filepath: string): Promise<boolean>;
  export function existsFile(filepath: string): Promise<boolean>;
  export function stat(filepath: string): Promise<{
    name: string;
    path: string;
    size: number;
    isFile: () => boolean;
    isDirectory: () => boolean;
    mtime?: Date;
    ctime?: Date;
    originPath?: string;
  }>;
  export function unlink(filepath: string): Promise<void>;
  export function downloadFile(options: {
    fromUrl: string;
    toFile: string;
    begin?: (res: { jobId: number; contentLength: number; statusCode: number }) => void;
    progress?: (res: { jobId: number; contentLength: number; bytesWritten: number }) => void;
    background?: boolean;
    progressDivider?: number;
  }): { jobId: number; promise: Promise<{ statusCode: number; bytesWritten: number }> };
} 