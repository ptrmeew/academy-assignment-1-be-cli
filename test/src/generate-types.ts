import { exec } from 'node:child_process';
import * as dotenv from 'dotenv';

dotenv.config({
  path: __dirname + '/../../.env',
});

exec(
  `npx openapi-typescript ${process.env.SUPABASE_URL}/rest/v1/?apikey=${process.env.SUPABASE_URL} --version=2 --output src/types/api.types.ts`,
  (err, out) => {
    if (err) {
      console.error(err);
    }
    console.log(out);
    exec(`npx supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > src/types/database.types.ts`, (err, out) => {
      if (err) {
        console.error(err);
      } else {
        console.log(out);
        console.log('DONE');
      }
    });
  }
);
