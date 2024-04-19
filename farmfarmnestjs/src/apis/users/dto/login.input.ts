import { Auth } from '../entities/auth.entity';

export type LoginInput = Omit<Auth, 'uid'>;
