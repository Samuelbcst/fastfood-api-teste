import { describe, it, expect } from 'vitest';
import { ClientModel } from './model';

describe('ClientModel', () => {
  it('should be defined', () => {
    expect(ClientModel).toBeDefined();
  });

  it('should create a ClientModel instance with default values', () => {
    const client = new ClientModel();
    expect(client.id).toBe(0);
    expect(client.name).toBe('');
    expect(client.email).toBe('');
    expect(client.cpf).toBe('');
    expect(client.createdAt).toBeInstanceOf(Date);
    expect(client.updatedAt).toBeInstanceOf(Date);
  });
});
