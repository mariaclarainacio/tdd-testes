import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask,
  filterTasks,
  countTasks,      
  countCompleted,  
  countPending,
  validatePriority,
  filterByPriority,
  isDuplicate,
  sortTasks, 
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



// ============================================================

// 6. filterTasks (EXERCÍCIO 2)

// ============================================================

describe('filterTasks', () => {

  let tasks;



  beforeEach(() => {

    resetId();

    tasks = addTask([], 'Tarefa 1');

    tasks = addTask(tasks, 'Tarefa 2');

    tasks = addTask(tasks, 'Tarefa 3');

    tasks = tasks.map((t) => (t.id === 2 ? toggleTask(t) : t));

  });



  it('deve retornar todas as tarefas com filtro "all"', () => {

    const result = filterTasks(tasks, 'all');

    expect(result).toHaveLength(3);

  });



  it('deve retornar apenas pendentes com filtro "pending"', () => {

    const result = filterTasks(tasks, 'pending');

    expect(result).toHaveLength(2);

    result.forEach((t) => expect(t.completed).toBe(false));

  });



  it('deve retornar apenas concluídas com filtro "completed"', () => {

    const result = filterTasks(tasks, 'completed');

    expect(result).toHaveLength(1);

    expect(result[0].id).toBe(2);

  });



  it('deve retornar um NOVO array (imutabilidade)', () => {

    const result = filterTasks(tasks, 'all');

    expect(result).not.toBe(tasks);

  });

});



// ============================================================

// 7. Contagens (EXERCÍCIO 3)

// ============================================================

describe('countTasks', () => {

  it('deve retornar o total de tarefas', () => {

    const tasks = [{ id: 1 }, { id: 2 }];

    expect(countTasks(tasks)).toBe(2);

  });

});



describe('countCompleted', () => {

  it('deve contar apenas as tarefas concluídas', () => {

    const tasks = [

      { completed: true },

      { completed: false },

      { completed: true }

    ];

    expect(countCompleted(tasks)).toBe(2);

  });

});



describe('countPending', () => {

  it('deve contar apenas as tarefas pendentes', () => {

    const tasks = [

      { completed: true },

      { completed: false }

    ];

    expect(countPending(tasks)).toBe(1);

  });

});



// ============================================================

// 8. Exercício 4: Prioridade

// ============================================================

describe('Prioridade das Tarefas', () => {

  beforeEach(() => { resetId(); });



  it('deve criar tarefa com prioridade high', () => {

    const task = createTask('Estudar TDD', 'high');

    expect(task.priority).toBe('high');

  });



  it('deve usar priority medium como padrão', () => {

    const task = createTask('Tarefa Padrão');

    expect(task.priority).toBe('medium');

  });



  it('deve validar prioridades corretamente', () => {

    expect(validatePriority('low')).toBe(true);

    expect(validatePriority('urgente')).toBe(false);

  });



  it('deve filtrar tarefas por prioridade', () => {

    const t1 = createTask('T1', 'high');

    const t2 = createTask('T2', 'low');

    const tasks = [t1, t2];

   

    const highTasks = filterByPriority(tasks, 'high');

    expect(highTasks).toHaveLength(1);

    expect(highTasks[0].title).toBe('T1');

  });

});

// ============================================================
// 9. Exercício 5: Impedir Duplicatas
// ============================================================
describe('Tarefas Duplicadas', () => {
  it('deve detectar duplicata exata', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, 'Estudar')).toBe(true);
  });

  it('deve detectar duplicata case-insensitive', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, 'estudar')).toBe(true);
  });

  it('deve ignorar espaços extras ao detectar duplicatas', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, '  Estudar  ')).toBe(true);
  });

  it('deve lançar erro ao tentar adicionar tarefa com título existente', () => {
    const tasks = [{ title: 'Tarefa 1' }];
    expect(() => addTask(tasks, 'Tarefa 1')).toThrow('Tarefa duplicada');
  });
});

// ============================================================
// 10. Exercício 6: Ordenar tarefas
// ============================================================
describe('Ordenar Tarefas', () => {
  it('deve ordenar pendentes antes de concluídas', () => {
    const tasks = [
      { title: 'Concluída', completed: true },
      { title: 'Pendente', completed: false }
    ];
    const sorted = sortTasks(tasks);
    expect(sorted[0].completed).toBe(false);
    expect(sorted[1].completed).toBe(true);
  });

  it('deve retornar um NOVO array (imutabilidade)', () => {
    const tasks = [{ completed: true }, { completed: false }];
    const sorted = sortTasks(tasks);
    expect(sorted).not.toBe(tasks);
  });
});