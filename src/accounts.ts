
export const STUDENT_ACCOUNTS = Array.from({ length: 100 }, (_, i) => {
  const num = (i + 1).toString().padStart(3, '0');
  return {
    username: `HS${num}`,
    password: `pass${num}`
  };
});

// Add the DEMO account
STUDENT_ACCOUNTS.push({
  username: 'DEMO',
  password: 'demo101'
});

export const TEACHER_ACCOUNT = {
  username: 'GV001',
  password: 'GV001'
};
