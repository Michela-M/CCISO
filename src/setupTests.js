// src/setupTests.js
import { vi } from "vitest";
import "@testing-library/jest-dom";

// --- MOCK FIREBASE MODULES ---
// Must be defined BEFORE anything imports firebase.js

vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(() => ({})), // fake app
}));

vi.mock("firebase/auth", () => ({
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
    signInWithPopup: vi.fn(),
    GoogleAuthProvider: vi.fn(() => ({})),
}));

vi.mock("firebase/firestore", () => ({
    getFirestore: vi.fn(() => ({})), // <-- this fixes your current error
    getDoc: vi.fn(),
    doc: vi.fn(),
}));

vi.mock("firebase/storage", () => ({
    getStorage: vi.fn(() => ({})),
    ref: vi.fn(),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn(),
}));

// If your app imports a local firebase wrapper:
vi.mock("../firebase", () => ({
    auth: {},
    db: {},
    storage: {},
}));
