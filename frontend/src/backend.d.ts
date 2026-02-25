import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VisitorEntry {
    username: string;
    timestamp: bigint;
}
export interface backendInterface {
    clearVisitorLog(pass: string): Promise<boolean>;
    getNotifications(): Promise<Array<VisitorEntry>>;
    getVisitorLog(pass: string): Promise<Array<VisitorEntry> | null>;
    logVisitor(username: string): Promise<void>;
}
