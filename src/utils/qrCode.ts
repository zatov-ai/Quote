export function generateQRCodeURL(text: string): string {
  const size = '200x200';
  const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
  const params = new URLSearchParams({
    size,
    data: text,
    bgcolor: 'ffffff',
    color: '2563eb',
  });
  
  return `${baseUrl}?${params.toString()}`;
}