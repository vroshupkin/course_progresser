
/**
 * Add class in classList JSX element
 */
export function add_class<T extends HTMLDivElement>(ref: React.RefObject<T>, class_name: string)
{
  if(ref.current ==  null)
  {
    return;
  }

  ref.current.classList.add(class_name);
}

/**
 * Если условие верно то добавляет класс к элементу
 */
export function toggle_class<T extends HTMLDivElement>(ref: React.RefObject<T>, class_name: string, condition: boolean) 
{
  if(ref.current ==  null)
  {
    return;
  }

  if(condition)
  {
    ref.current.classList.add(class_name);
  }
  else
  {
    ref.current.classList.remove(class_name);
  }
}

/**
 * Выбирает класс согласно условию
 */
export function class_selector<T extends HTMLDivElement>(ref: React.RefObject<T>, class_1: string, class_2: string, condition: boolean) 
{
  if(ref.current == null)
  {
    return;
  }

  if(condition)
  {
    ref.current.classList.remove(class_2);
    ref.current.classList.add(class_1);

  }
  else
  {
    ref.current.classList.remove(class_1);
    ref.current.classList.add(class_2);
  }
}
