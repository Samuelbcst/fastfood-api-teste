import { describe, it, expect } from 'vitest';
import dataSource from './index';

describe('TypeORM DataSource', () => {
  it('should be defined', () => {
    expect(dataSource).toBeDefined();
  });

  it('should have postgres as type', () => {
    expect(dataSource.options.type).toBe('postgres');
  });

  it('should include CategoryModel in entities', () => {
    const entities = dataSource.options.entities as any[] | undefined;
    const entityNames = (entities || []).map(e => typeof e === 'string' ? e : e?.name);
    expect(entityNames).toContain('CategoryModel');
  });
});
