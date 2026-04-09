let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  const trimmed = title.trim();
  return trimmed.length >= 3;
}

export function createTask(title) {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
  };
}

export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }
  const newTask = createTask(title);
  return [...tasks, newTask];
}

// ------------------------------------------------------------
// Alteração de estado (EXERCÍCIO A)
// ------------------------------------------------------------
export function toggleTask(task) {
  return {
    ...task,
    completed: !task.completed,
  };
}