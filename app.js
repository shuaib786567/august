document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('todo-form');
  const input=document.getElementById('todo-input');
  const list=document.getElementById('todo-list');
  const STORAGE_KEY='simple_todos_v1';

  let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render(){
    list.innerHTML='';
    if(todos.length===0){
      const el=document.createElement('li');
      el.className='empty';
      el.textContent='No todos yet';
      list.appendChild(el);
      return;
    }
    todos.forEach(todo=>{
      const li=document.createElement('li');
      li.className='todo-item';
      const span=document.createElement('span');
      span.className='todo-text';
      span.textContent=todo.text;
      const btn=document.createElement('button');
      btn.className='delete-btn';
      btn.textContent='Delete';
      btn.dataset.id=todo.id;
      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const text=input.value.trim();
    if(!text) return;
    const todo={id:Date.now().toString(),text};
    todos.push(todo);
    save();
    render();
    input.value='';
    input.focus();
  });

  list.addEventListener('click',e=>{
    const btn = e.target.closest('.delete-btn');
    if(!btn) return;
    const id = btn.dataset.id;
    todos = todos.filter(t=>t.id!==id);
    save();
    render();
  });

  render();
});
