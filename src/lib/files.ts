/**
 * Download file checks, run at build time.
 * A local download that does not exist fails the build, so the site never
 * ships a broken download link. File size is read from the file itself.
 */
import { existsSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

export interface DownloadInfo {
  url: string;
  fileName: string;
  /** true for files served from this site (public/), false for https links. */
  local: boolean;
  /** Bytes. Known for local files; for external files only if given in content. */
  size?: number | undefined;
}

export function resolveDownload(
  url: string,
  options: { publicDir?: string; declaredSize?: number | undefined } = {},
): DownloadInfo {
  const { publicDir = join(process.cwd(), 'public'), declaredSize } = options;
  if (url.startsWith('https://')) {
    const name = basename(new URL(url).pathname) || url;
    return { url, fileName: name, local: false, size: declaredSize };
  }
  const path = join(publicDir, decodeURIComponent(url));
  if (!existsSync(path) || !statSync(path).isFile()) {
    throw new Error(`Download file not found: public${url}. Add the file or fix the link.`);
  }
  return { url, fileName: basename(path), local: true, size: statSync(path).size };
}
