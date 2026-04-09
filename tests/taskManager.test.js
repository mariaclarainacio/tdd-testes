import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask, 
  resetId,
} from '../src/taskManager.js';

// ============================================================
// 1. validateTitle
// ============================================================
describe('validateTitle', () => {
  it('deve retornar true para um título válido', () => {
    expect(validateTitle('Estudar Vitest')).toBe(true);
  });
  it('deve retornar false para string vazia', () => {
    expect(validateTitle('')).toBe(false);
  });
  it('deve considerar o título após trim', () => {
    expect(validateTitle('  abc  ')).toBe(true);
  });
});

// ============================================================
// 2. createTask
// ============================================================
describe('createTask', () => {
  beforeEach(() => { resetId(); });
  it('deve criar uma tarefa com as propriedades corretas', () => {
    const task = createTask('Estudar TDD');
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Estudar TDD');
    expect(task).toHaveProperty('completed', false);
  });
});

// ============================================================
// 3. addTask
// ============================================================
describe('addTask', () => {
  beforeEach(() => { resetId(); });
  it('deve adicionar uma tarefa a uma lista existente', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    expect(tasks).toHaveLength(2);
  });
});

// ============================================================
// 4. toggleTask
// ============================================================
describe('toggleTask', () => {
  it('deve marcar uma tarefa pendente como concluída', () => {
    const task = { id: 1, title: 'Teste', completed: false };
    const toggled = toggleTask(task);
    expect(toggled.completed).toBe(true);
  });
});

// ============================================================
// 5. removeTask (EXERCÍCIO 1)
// ============================================================
describe('removeTask', () => {
  let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1'); 
    tasks = addTask(tasks, 'Tarefa 2'); 
    tasks = addTask(tasks, 'Tarefa 3'); 
  });

  it('deve remover uma tarefa pelo ID', () => {
    const updated = removeTask(tasks, 2);
    expect(updated).toHaveLength(2);
    expect(updated.find((t) => t.id === 2)).toBeUndefined();
  });

  it('deve manter as outras tarefas intactas', () => {
    const updated = removeTask(tasks, 2);
    expect(updated[0].title).toBe('Tarefa 1');
    expect(updated[1].title).toBe('Tarefa 3');
  });

  it('deve retornar um NOVO array (imutabilidade)', () => {
    const updated = removeTask(tasks, 1);
    expect(updated).not.toBe(tasks); 
    expect(tasks).toHaveLength(3);   
  });

  it('deve retornar a lista completa se o ID não existir', () => {
    const updated = removeTask(tasks, 999);
    expect(updated).toHaveLength(3);
  });
});