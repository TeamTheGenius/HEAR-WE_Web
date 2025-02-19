interface FileInfo {
  base64: string;
  fileName: string;
  fileType: string;
}

export const base64ToFileList = (files: FileInfo[]) => {
  const dataTransfer = new DataTransfer();

  files.forEach(({ base64, fileName, fileType }) => {
    const base64WithMeta = base64.includes('data:') ? base64 : `data:${fileType};base64,${base64}`;
    const base64Data = base64WithMeta.split(';base64,').pop();

    if (!base64Data) return;

    const byteString = atob(base64Data);
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: fileType });
    const file = new File([blob], fileName, { type: fileType });

    dataTransfer.items.add(file);
  });

  return dataTransfer.files;
};
