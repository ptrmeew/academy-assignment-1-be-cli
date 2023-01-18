import { EntityManager } from 'typeorm';
import { Role } from '../../entity/auth/Role';
import { Profile } from '../../entity/auth/Profile';
import { createOrUseSupabaseUser } from '../util/user-utilities';
import { PopulateScriptExecutor } from '../util/types';

export const execute: PopulateScriptExecutor = async (manager: EntityManager) => {
  const authUser1 = await createOrUseSupabaseUser('test1@mail.dk', '12345678');
  const authUser2 = await createOrUseSupabaseUser('test2@mail.dk', '12345678');

  const adminRole = await manager.findOne(Role, { where: { name: 'admin' } });
  const userRole = await manager.findOne(Role, { where: { name: 'user' } });

  const adminProfile = new Profile();
  adminProfile.first_name = 'Bob';
  adminProfile.last_name = 'Dylan';
  adminProfile.age = 20;
  adminProfile.roles = [adminRole];
  adminProfile.id = authUser1.id;

  await manager.save(adminProfile);

  const profile = new Profile();
  profile.first_name = 'Bob';
  profile.last_name = 'Marley';
  profile.age = 24;
  profile.roles = [userRole];
  profile.id = authUser2.id;

  await manager.save(profile);
};
