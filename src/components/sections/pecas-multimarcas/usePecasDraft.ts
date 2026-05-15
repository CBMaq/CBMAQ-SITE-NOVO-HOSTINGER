"use client";

const DB_NAME = "cbmaq-pecas-draft";
const DB_VERSION = 1;
const STORE_DRAFT = "draft";
const STORE_FILES = "files";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_DRAFT)) db.createObjectStore(STORE_DRAFT);
      if (!db.objectStoreNames.contains(STORE_FILES)) db.createObjectStore(STORE_FILES);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function putItem(db: IDBDatabase, store: string, key: string, value: unknown): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function getItem<T>(db: IDBDatabase, store: string, key: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

function clearStore(db: IDBDatabase, store: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export interface DadosEmpresa {
  empresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  cidadeEstado: string;
  nomeResponsavel: string;
}

export interface SolicitacaoItem {
  id: string;
  marcaMaquina: string;
  modeloMaquina: string;
  tipoPeca: string;
  descricaoPeca: string;
  fotosNames: string[];
  documentosNames: string[];
}

export interface DraftData {
  dadosEmpresa: DadosEmpresa;
  solicitacoes: SolicitacaoItem[];
}

export async function saveDraft(data: DraftData): Promise<void> {
  try {
    const db = await openDB();
    await putItem(db, STORE_DRAFT, "current", data);
    db.close();
  } catch { /* silent fail on draft save */ }
}

export async function loadDraft(): Promise<DraftData | undefined> {
  try {
    const db = await openDB();
    const data = await getItem<DraftData>(db, STORE_DRAFT, "current");
    db.close();
    return data;
  } catch { return undefined; }
}

export async function saveFile(key: string, file: File): Promise<void> {
  try {
    const db = await openDB();
    const buf = await file.arrayBuffer();
    await putItem(db, STORE_FILES, key, { name: file.name, type: file.type, buffer: buf });
    db.close();
  } catch { /* silent */ }
}

export async function loadFile(key: string): Promise<File | null> {
  try {
    const db = await openDB();
    const stored = await getItem<{ name: string; type: string; buffer: ArrayBuffer }>(db, STORE_FILES, key);
    db.close();
    if (!stored) return null;
    return new File([stored.buffer], stored.name, { type: stored.type });
  } catch { return null; }
}

export async function clearDraft(): Promise<void> {
  try {
    const db = await openDB();
    await clearStore(db, STORE_DRAFT);
    await clearStore(db, STORE_FILES);
    db.close();
  } catch { /* silent */ }
}
