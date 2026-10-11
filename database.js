import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { buildSeedData, DEMO_PASSWORD } from './seedData';

// Lokal database oven på AsyncStorage.
// Hver "tabel" gemmes som et JSON-array under sin egen nøgle.
// Alle skrivefunktioner returnerer de opdaterede data, så context'en kan sætte state direkte.
// Fejl der skal vises for brugeren kastes som Error med en dansk besked.

export const ROLES = {
  JOBSEEKER: 'jobseeker',
  COMPANY: 'company',
};

const KEYS = {
  users: '@jobify/users',
  jobs: '@jobify/jobs',
  currentUserId: '@jobify/currentUserId',
  seeded: '@jobify/seeded',
};

// Hæves når datastrukturen ændres, så gamle data på telefonen erstattes af nye startdata.
const SEED_VERSION = '2';

const MIN_PASSWORD_LENGTH = 6;

async function read(key, fallback) {
  const raw = await AsyncStorage.getItem(key);
  return raw == null ? fallback : JSON.parse(raw);
}

async function write(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---------- Adgangskoder ----------

async function hashPassword(password, salt) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
}

async function createCredentials(password) {
  const passwordSalt = Crypto.randomUUID();
  return { passwordSalt, passwordHash: await hashPassword(password, passwordSalt) };
}

// Adgangskode-felterne må aldrig forlade databasen.
function withoutCredentials({ passwordHash, passwordSalt, ...user }) {
  return user;
}

const normalizeEmail = (email) => email.trim().toLowerCase();

// ---------- Opstart ----------

async function seed() {
  const { users, jobs } = buildSeedData();
  const seededUsers = await Promise.all(
    users.map(async (u) => ({ ...u, ...(await createCredentials(DEMO_PASSWORD)) }))
  );
  await AsyncStorage.multiSet([
    [KEYS.users, JSON.stringify(seededUsers)],
    [KEYS.jobs, JSON.stringify(jobs)],
    [KEYS.currentUserId, JSON.stringify(null)],
    [KEYS.seeded, SEED_VERSION],
  ]);
}

// Læser hele databasen. Første gang (eller ved ny SEED_VERSION) fyldes den med startdata.
export async function loadDatabase() {
  if ((await AsyncStorage.getItem(KEYS.seeded)) !== SEED_VERSION) {
    await seed();
  }
  const [users, jobs, currentUserId] = await Promise.all([
    read(KEYS.users, []),
    read(KEYS.jobs, []),
    read(KEYS.currentUserId, null),
  ]);
  return { users: users.map(withoutCredentials), jobs, currentUserId };
}

// Sletter alt og lægger startdata ind igen.
export async function resetDatabase() {
  await AsyncStorage.multiRemove(Object.values(KEYS));
  return loadDatabase();
}

// ---------- Login ----------

export async function login(email, password) {
  const users = await read(KEYS.users, []);
  const user = users.find((u) => normalizeEmail(u.email) === normalizeEmail(email));
  if (!user || (await hashPassword(password, user.passwordSalt)) !== user.passwordHash) {
    throw new Error('Forkert e-mail eller adgangskode.');
  }
  await write(KEYS.currentUserId, user.id);
  return user.id;
}

export async function logout() {
  await write(KEYS.currentUserId, null);
}

// ---------- Brugere ----------

const USER_DEFAULTS = {
  [ROLES.JOBSEEKER]: { email: '', university: '', education: '', about: '', savedJobIds: [] },
  [ROLES.COMPANY]: { email: '', location: '', about: '' },
};

function assertEmailFree(users, email, ownId) {
  if (users.some((u) => u.id !== ownId && normalizeEmail(u.email) === normalizeEmail(email))) {
    throw new Error('Der findes allerede en bruger med den e-mail.');
  }
}

// Opretter en bruger og logger den ind.
export async function createUser({ role, password, ...data }) {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Adgangskoden skal være mindst ${MIN_PASSWORD_LENGTH} tegn.`);
  }
  const users = await read(KEYS.users, []);
  assertEmailFree(users, data.email);

  const user = {
    ...USER_DEFAULTS[role],
    ...data,
    email: normalizeEmail(data.email),
    ...(await createCredentials(password)),
    role,
    id: createId('user'),
    createdAt: Date.now(),
  };
  const next = [...users, user];
  await write(KEYS.users, next);
  await write(KEYS.currentUserId, user.id);
  return { userId: user.id, users: next.map(withoutCredentials) };
}

export async function updateUser(id, { passwordHash, passwordSalt, ...changes }) {
  const users = await read(KEYS.users, []);
  if (changes.email !== undefined) {
    assertEmailFree(users, changes.email, id);
    changes.email = normalizeEmail(changes.email);
  }
  const next = users.map((u) => (u.id === id ? { ...u, ...changes, id, role: u.role } : u));
  await write(KEYS.users, next);
  return next.map(withoutCredentials);
}

export async function toggleSavedJob(userId, jobId) {
  const users = await read(KEYS.users, []);
  const next = users.map((u) => {
    if (u.id !== userId) return u;
    const saved = u.savedJobIds ?? [];
    return {
      ...u,
      savedJobIds: saved.includes(jobId) ? saved.filter((id) => id !== jobId) : [...saved, jobId],
    };
  });
  await write(KEYS.users, next);
  return next.map(withoutCredentials);
}

// ---------- Jobopslag ----------

export async function createJob(companyId, data) {
  const jobs = await read(KEYS.jobs, []);
  const job = { ...data, companyId, id: createId('job'), createdAt: Date.now() };
  const next = [...jobs, job];
  await write(KEYS.jobs, next);
  return { job, jobs: next };
}

export async function updateJob(id, changes) {
  const jobs = await read(KEYS.jobs, []);
  const next = jobs.map((j) => (j.id === id ? { ...j, ...changes, id, companyId: j.companyId } : j));
  await write(KEYS.jobs, next);
  return next;
}

// Sletter opslaget og fjerner det fra alle jobsøgendes gemte liste.
export async function deleteJob(id) {
  const [jobs, users] = await Promise.all([read(KEYS.jobs, []), read(KEYS.users, [])]);
  const nextJobs = jobs.filter((j) => j.id !== id);
  const nextUsers = users.map((u) =>
    u.savedJobIds?.includes(id) ? { ...u, savedJobIds: u.savedJobIds.filter((s) => s !== id) } : u
  );
  await Promise.all([write(KEYS.jobs, nextJobs), write(KEYS.users, nextUsers)]);
  return { jobs: nextJobs, users: nextUsers.map(withoutCredentials) };
}
