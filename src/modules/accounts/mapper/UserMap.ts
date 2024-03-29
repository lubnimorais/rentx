import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    avatar_url,
    driver_license,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      avatar_url,
      driver_license,
    });
    return user;
  }
}

export { UserMap };
