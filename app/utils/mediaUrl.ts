export function getMediaUrl(url: string | undefined | null): string {
  if (!url) return "";

  // If it's already a relative path starting with /upload, return as is
  if (url.startsWith("/upload")) {
    return url;
  }

  // If it's a full URL, extract the path
  try {
    const urlObj = new URL(url);
    // Check if the path contains /upload
    if (urlObj.pathname.includes("/upload")) {
      // Return the relative path to use Next.js rewrite proxy
      return urlObj.pathname;
    }
    return url;
  } catch {
    // If URL parsing fails, return original
    return url;
  }
}

/**
 * Get the full backend URL for media (for cases where proxy doesn't work)
 */
export function getFullMediaUrl(url: string | undefined | null): string {
  if (!url) return "";

  // If already a full URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Use the current origin for relative paths (works with rewrites)
  if (typeof window !== "undefined") {
    return `${window.location.origin}${url.startsWith("/") ? url : "/" + url}`;
  }

  return url;
}
