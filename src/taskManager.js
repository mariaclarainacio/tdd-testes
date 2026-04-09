let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  const trimmed = title.trim();
  return trimmed.length >= 3;
}

// ------------------------------------------------------------
// Criação
// ------------------------------------------------------------
export function createTask(title, priority = 'medium') {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
    priority: priority,
  };
}

// ------------------------------------------------------------
// Adição (Atualizada para Exercício 5)
// ------------------------------------------------------------
export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  if (isDuplicate(tasks, title)) {
    throw new Error('Tarefa duplicada');
  }

  const newTask = createTask(title);
  return [...tasks, newTask];
}

// ------------------------------------------------------------
// Detecção de Duplicatas (Exercício 5)
// ------------------------------------------------------------
export function isDuplicate(tasks, title) {
  const normalizedTitle = title.trim().toLowerCase();
  return tasks.some(t => t.title.toLowerCase() === normalizedTitle);
}

// ------------------------------------------------------------
// Alteração de estado
// ------------------------------------------------------------
export function toggleTask(task) {
  return {
    ...task,
    completed: !task.completed,
  };
}

// ------------------------------------------------------------
// Remoção
// ------------------------------------------------------------
export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// ------------------------------------------------------------
// Filtros
// ------------------------------------------------------------
export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter((t) => t.completed === true);
    case 'pending':
      return tasks.filter((t) => t.completed === false);
    case 'all':
    default:
      return [...tasks];
  }
}

export function validatePriority(priority) {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority);
}

export function filterByPriority(tasks, priority) {
  return tasks.filter(t => t.priority === priority);
}

// ------------------------------------------------------------
// Contagens
// ------------------------------------------------------------
export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  return tasks.filter((t) => t.completed === true).length;
}

export function countPending(tasks) {
  return tasks.filter((t) => t.completed === false).length;
}