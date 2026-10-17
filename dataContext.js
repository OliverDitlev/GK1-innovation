import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as db from './database';

export const ROLES = db.ROLES;

const DataContext = createContext(null);
//funktion herunder h¨ndtere alt data og funktioner til at opdatere data
export function DataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [rawJobs, setRawJobs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const applyDatabase = (data) => {
    setUsers(data.users);
    setRawJobs(data.jobs);
    setCurrentUserId(data.currentUserId);
  };

  useEffect(() => {
    db.loadDatabase()
      .then(applyDatabase)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const currentUser = users.find((u) => u.id === currentUserId) ?? null;

  const jobs = useMemo(() => {
    const names = Object.fromEntries(users.map((u) => [u.id, u.name]));
    return rawJobs
      .map((job) => ({ ...job, company: names[job.companyId] ?? 'Ukendt virksomhed' }))
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [rawJobs, users]);

  const value = {
    loading,
    error,
    users,
    jobs,
    currentUser,

    login: async (email, password) => setCurrentUserId(await db.login(email, password)),

    logout: async () => {
      await db.logout();
      setCurrentUserId(null);
    },

    createUser: async (data) => {
      const { userId, users: next } = await db.createUser(data);
      setUsers(next);
      setCurrentUserId(userId);
    },

    updateCurrentUser: async (changes) => setUsers(await db.updateUser(currentUserId, changes)),

    toggleSave: async (jobId) => setUsers(await db.toggleSavedJob(currentUserId, jobId)),

    createJob: async (data) => {
      const { job, jobs: next } = await db.createJob(currentUserId, data);
      setRawJobs(next);
      return job;
    },

    updateJob: async (id, changes) => setRawJobs(await db.updateJob(id, changes)),

    deleteJob: async (id) => {
      const { jobs: nextJobs, users: nextUsers } = await db.deleteJob(id);
      setRawJobs(nextJobs);
      setUsers(nextUsers);
    },

    resetDatabase: async () => applyDatabase(await db.resetDatabase()),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}

export function useSaved() {
  const { currentUser, toggleSave } = useData();
  const savedIds = useMemo(() => new Set(currentUser?.savedJobIds ?? []), [currentUser]);
  return { savedIds, toggleSave };
}
