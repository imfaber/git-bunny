import { SimpleGit } from 'simple-git/promise';
import { Chalk } from 'chalk';
import { StatusResult } from 'simple-git/typings/response.d';

export interface GBunny {
    git: SimpleGit;
    args?: string[];
}

export interface StatusHeaderArgs {
    branch?: string;
    tracking?: string | null;
    diverge?: string | null;
}

export interface PrintFilesArgs {
    title?: string;
    files: GitIndexedFile[];
    indexLength?: number;
    showIndex?: boolean;
    chalkColor?: Chalk;
}

export enum StatusCode {
    Unmodified = '',
    Added = 'A',
    Modified = 'M',
    Deleted = 'D',
    Renamed = 'R',
    Copied = 'C',
    Unmerged = 'U',
    Untracked = '?',
    Ignored = '!'
}

export type Status = keyof typeof StatusCode;

export interface GitCommand {
    args: string[] | undefined;
    canRun: boolean;
    run: (extraArgs?: string[]) => Promise<void>;
    setActiveGitEntityType: (indexType: GitEntityType) => Promise<void>;
    getActiveEntityCollection: () => Promise<GitIndexedEntityCollection>;
}

export interface GBunnyCommand {
    run: () => Promise<void> | void;
    help: () => string;
}

export enum GitEntityType {
    Branch = 'branch',
    Path = 'path',
    Tag = 'tag'
}

export type GitEntityTypeKey = keyof typeof GitEntityType;

export interface GitEntity {
    name: string;
    type: GitEntityType;
}

export interface GitBranch {
    name: string;
    current: boolean;
    commit?: string;
    label?: string;
}

export interface GitIndexedEntity extends GitEntity {
    entityIndex: number;
    [key: string]: any;
}

export interface GitIndexedFile extends GitIndexedEntity {
    status: string;
    area: GitArea;
}

export enum GitArea {
    Untracked,
    Stage,
    WorkTree,
    Unmerged
}

export interface GitIndexedEntityCollection {
    list: GitIndexedEntity[];
    printEntities: (list?: GitIndexedEntity[]) => void;
    [key: string]: any;
}

export interface EntitySelectorChoice {
    name: string;
    value: string;
}
