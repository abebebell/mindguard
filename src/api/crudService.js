// Simulasi Database Sederhana (bisa diganti ke Firebase/API nanti)
let mockupData = [
  { id: 1, date: '2024-03-20', mood: 'Tenang', note: 'Hari yang produktif' },
];

export const getLogs = () => [...mockupData];

export const addLog = (newLog) => {
  const data = { ...newLog, id: Date.now() };
  mockupData.push(data);
  return data;
};

export const deleteLog = (id) => {
  mockupData = mockupData.filter(log => log.id !== id);
};