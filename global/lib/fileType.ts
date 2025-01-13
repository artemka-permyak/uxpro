const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
const VIDEO_EXTENSIONS = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

export default function getFileType(url: string) {
  const extension = url.split('.').pop()?.toLowerCase();

  if (extension) {
    if (IMAGE_EXTENSIONS.includes(extension)) {
      return 'image';
    } else if (VIDEO_EXTENSIONS.includes(extension)) {
      return 'video';
    }
  }

  return 'unknown';
}
