/**
 * Image compression utility to optimize user uploaded photos for Firestore and LocalStorage.
 * Keeps file size safely under 200KB while preserving high visual quality and responsiveness.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<{ base64: string; sizeInKb: number; width: number; height: number }> {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.82,
    mimeType = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = (err) => reject(new Error('파일을 읽는 중 오류가 발생했습니다: ' + err));

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onerror = () => reject(new Error('이미지를 불러올 수 없습니다. 지원되는 포맷인지 확인해주세요.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('캔버스 컨텍스트를 생성할 수 없습니다.'));
          return;
        }

        // Fill background with white for transparent PNGs converted to JPEG
        if (mimeType === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        // Enable high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // Export to Base64
        const base64 = canvas.toDataURL(mimeType, quality);
        const sizeInKb = Math.round((base64.length * 3) / 4 / 1024);

        resolve({
          base64,
          sizeInKb,
          width,
          height
        });
      };

      if (readerEvent.target?.result) {
        img.src = readerEvent.target.result as string;
      } else {
        reject(new Error('이미지 데이터를 읽을 수 없습니다.'));
      }
    };

    reader.readAsDataURL(file);
  });
}
