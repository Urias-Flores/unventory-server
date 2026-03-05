import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../../package.json') as { name: string; version: string };

@Injectable()
export class StatusService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getStatus() {
    const isConnected = this.dataSource.isInitialized;
    const options = this.dataSource.options as PostgresConnectionOptions;

    let dbStatus = 'disconnected';
    if (isConnected) {
      try {
        await this.dataSource.query('SELECT 1');
        dbStatus = 'connected';
      } catch {
        dbStatus = 'error';
      }
    }

    return {
      service: pkg.name,
      version: pkg.version,
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        host: options.host ?? 'unknown',
        port: options.port ?? 5432,
        name: options.database ?? 'unknown',
      },
    };
  }
}
