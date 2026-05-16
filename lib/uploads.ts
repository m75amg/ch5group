import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const UPLOAD_ROOT_REL = path.join("public", "uploads");

export interface UploadConfig {
  /** Subdirectory under public/uploads (e.g. "partners", "media-kit") */
  bucket: "partners" | "programs" | "media-kit";
  /** Max file size in bytes */
  maxBytes: number;
  /** Allowed MIME types */
  allowedMime: readonly string[];
  /** Allowed file extensions (lowercase, with dot) */
  allowedExt: readonly string[];
}

export const UPLOAD_CONFIGS: Record<UploadConfig["bucket"], UploadConfig> = {
  partners: {
    bucket: "partners",
    maxBytes: 2 * 1024 * 1024, // 2 MB
    allowedMime: ["image/svg+xml", "image/png", "image/jpeg", "image/webp"],
    allowedExt: [".svg", ".png", ".jpg", ".jpeg", ".webp"],
  },
  programs: {
    bucket: "programs",
    maxBytes: 5 * 1024 * 1024, // 5 MB
    allowedMime: ["image/png", "image/jpeg", "image/webp"],
    allowedExt: [".png", ".jpg", ".jpeg", ".webp"],
  },
  "media-kit": {
    bucket: "media-kit",
    maxBytes: 20 * 1024 * 1024, // 20 MB
    allowedMime: ["application/pdf"],
    allowedExt: [".pdf"],
  },
};

export interface SavedFile {
  publicPath: string; // /uploads/partners/abc.svg
  sizeKb: number;
}

export async function saveUpload(
  file: File,
  config: UploadConfig,
): Promise<SavedFile> {
  if (file.size > config.maxBytes) {
    throw new Error(
      `파일이 너무 큽니다. 최대 ${Math.round(config.maxBytes / 1024 / 1024)}MB까지 가능합니다.`,
    );
  }
  if (!config.allowedMime.includes(file.type)) {
    throw new Error(`허용되지 않은 형식입니다: ${file.type}`);
  }
  const ext = path.extname(file.name).toLowerCase();
  if (!config.allowedExt.includes(ext)) {
    throw new Error(`허용되지 않은 확장자입니다: ${ext}`);
  }

  const safeName = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const targetDir = path.join(process.cwd(), UPLOAD_ROOT_REL, config.bucket);
  await mkdir(targetDir, { recursive: true });
  const targetPath = path.join(targetDir, safeName);

  const arrayBuf = await file.arrayBuffer();
  await writeFile(targetPath, Buffer.from(arrayBuf));

  return {
    publicPath: `/uploads/${config.bucket}/${safeName}`,
    sizeKb: Math.round(file.size / 1024),
  };
}
