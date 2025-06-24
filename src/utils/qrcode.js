import QRCode from 'qrcode';

export async function generateQRCode(link) {
  return await QRCode.toDataURL(link);
}
