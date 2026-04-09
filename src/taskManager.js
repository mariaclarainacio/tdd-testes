// ------------------------------------------------------------
// Adição com validação
// ------------------------------------------------------------
export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error(
      'Título inválido: deve ser uma string com pelo menos 3 caracteres.'
    );
  }

  const newTask = createTask(title);
  return [...tasks, newTask];
}