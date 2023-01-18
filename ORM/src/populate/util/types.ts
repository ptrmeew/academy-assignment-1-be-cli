import { EntityManager } from 'typeorm';

export type PopulateScriptExecutor = (manager: EntityManager) => void;
