import * as SQLite from 'expo-sqlite';

const getOpenedDB = async () => await SQLite.openDatabaseAsync('sessions.db');

export const init = async () => {
  const db = await getOpenedDB();
  return await db.execAsync(`
			PRAGMA journal_mode = WAL;
			CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);
	`);
};

export const fetchSession = async () => {
  const db = await getOpenedDB();
  return await db.getFirstAsync('SELECT * FROM sessions');
};

export const insertSession = async ({ id, email, token }) => {
  const db = await getOpenedDB();
  return await db.runAsync(
    'INSERT INTO sessions (id, email, token) VALUES (?, ?, ?);',
    [id, email, token]
  );
};

export const deleteSession = async () => {
  const db = await getOpenedDB();
  return await db.runAsync('DELETE FROM sessions');
};
