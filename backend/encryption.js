// encryption.js
import crypto from 'crypto';

export function encryptWithPassword(text, password) {
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decryptWithPassword(encryptedText, password) {
  const [ivHex, encryptedHex] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const key = crypto.scryptSync(password, 'salt', 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}
