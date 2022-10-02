import { writable } from "svelte/store";

type GlobalState = "INIT" | "LOADING" | "DONE" | "ERROR" | "RESULTS";

export const globalState = writable<GlobalState>('INIT');