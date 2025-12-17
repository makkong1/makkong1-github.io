// 파일 업로드 더미데이터

export const uploadResponse = () => {
  const fileId = Math.floor(Math.random() * 10000);
  return {
    id: fileId,
    url: `https://via.placeholder.com/800x600?text=Uploaded+Image+${fileId}`,
    originalName: `image_${fileId}.jpg`,
    size: Math.floor(Math.random() * 5000000) + 100000, // 100KB ~ 5MB
    mimeType: 'image/jpeg',
    uploadedAt: new Date().toISOString()
  };
};

