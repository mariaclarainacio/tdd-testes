let _nextId = 1;

export function resetId() { _nextId = 1; }

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  return title.trim().length >= 3;
}

export function createTask(title, priority = 'medium') {
  return { id: _nextId++, title: title.trim(), completed: false, priority };
}

export function addTask(tasks, title) {
  if (!validateTitle(title)) throw new Error('Título inválido');
  if (isDuplicate(tasks, title)) throw new Error('Tarefa duplicada');
  return [...tasks, createTask(title)];
}

export function isDuplicate(tasks, title) {
  const normalized = title.trim().toLowerCase();
  return tasks.some(t => t.title.toLowerCase() === normalized);
}

export function toggleTask(task) {
  return { ...task, completed: !task.completed };
}

export function removeTask(tasks, taskId) {
  return tasks.filter((t) => t.id !== taskId);
}

export function filterTasks(tasks, status) {
  if (status === 'completed') return tasks.filter(t => t.completed);
  if (status === 'pending') return tasks.filter(t => !t.completed);
  return [...tasks];
}

export function validatePriority(p) {
  return ['low', 'medium', 'high'].includes(p);
}

export function filterByPriority(tasks, p) {
  return tasks.filter(t => t.priority === p);
}

// ------------------------------------------------------------
// EXERCÍCIO 6 e 7
// ------------------------------------------------------------
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => a.completed - b.completed);
}

export function searchTasks(tasks, query) {
  const q = query.toLowerCase();
  return tasks.filter(t => t.title.toLowerCase().includes(q));
}

// ------------------------------------------------------------
// CONTAGENS
// ------------------------------------------------------------
export function countTasks(t) { return t.length; }
export function countCompleted(t) { return t.filter(x => x.completed).length; }
export function countPending(t) { return t.filter(x => !x.completed).length; }