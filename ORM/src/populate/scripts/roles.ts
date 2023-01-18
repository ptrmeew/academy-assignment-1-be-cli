import { EntityManager } from 'typeorm';
import { Permission } from '../../entity/auth/Permission';
import { Role } from '../../entity/auth/Role';
import { PopulateScriptExecutor } from '../util/types';

export const execute: PopulateScriptExecutor = async (manager: EntityManager) => {
  const managePermissions = new Permission();
  managePermissions.name = 'MANAGE_PERMISSIONS';

  const manageRoles = new Permission();
  manageRoles.name = 'MANAGE_ROLES';

  const adminPermissions: Permission[] = [managePermissions, manageRoles];

  const adminRole = new Role();
  adminRole.name = 'admin';
  adminRole.permissions = adminPermissions;

  await manager.save(adminRole);

  const userPermissions: Permission[] = [];
  // TODO: Insert user permissions

  const userRole = new Role();
  userRole.name = 'user';
  userRole.permissions = userPermissions;

  await manager.save(userRole);
};
