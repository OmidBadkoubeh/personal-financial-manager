export type ServerConfig = {
  port?: number;
};

export type DbConfig = {
  type: 'postgres';
  port: number;
  database: string;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
};

export type JwtConfig = {
  secret: string;
  expiresIn: number;
};

export type JwtPayload = {
  accessToken: string;
  sub: string;
};
