import { User } from '../../models';
import { raw } from 'objection';

export async function validateUserData(
  email: string,
  username: string
) {
  let emailSearch;
  let nameSearch;
  if (email) {
    emailSearch = User.query().findOne({ email });
  }
  if (username) {
    // Not allowed to use email as username
    nameSearch = User.query().findOne(
      raw(`username = '${username}' OR email = '${username}'`)
    );
  }
  if (!email && !username) {
    return false;
  }
  const values = await Promise.all([emailSearch, nameSearch]);
  for (let i = 0, len = values.length; i < len; ++i) {
    if (values[i]) {
      return false;
    }
  }
  return true;
}
