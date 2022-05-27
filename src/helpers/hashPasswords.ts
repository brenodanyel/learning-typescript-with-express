import bcrypt from 'bcryptjs';

const hashPasswords = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

export default hashPasswords;
