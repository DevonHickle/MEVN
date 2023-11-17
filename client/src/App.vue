<template>
  <div class="main">
    <h3>Notes</h3>
    <form class="form">
      <input
        type="text"
        placeholder="Title"
        v-model="text"
        class="input"
      />
      <input
        type="text"
        placeholder="Description"
        v-model="description"
        class="input"
      />
      <button class="submit-button" @click="addTodo">
        Add Todo
      </button>
    </form>
    <div class="todo-container">
      <ul>
        <li v-for="(todo, index) in todos" :key="todo._id">
          <h4 class="todo-name">{{ todo.title }}</h4>
          <span class="todo-description">{{ todo.description }}</span>
          <button class="delete-btn" @click="deleteTodo(todo, index)">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      description: '',
      title: '',
    }
  },
    async mounted() {
      const response = await axios.get('/api/Todolist')
      this.todos = response.data
    },
    methods: {
      async addTodo(e) {
        e.preventDefault()
        const response = await axios.post('/api/Todolist', {
          title: this.title,
          description: this.description,
        })
        this.todos.push(response.data)
        this.title = ''
        this.description = ''
      },
      async deleteTodo(item, index) {
        await axios.delete('api/Todolist/' + item._id)
        this.todos.splice(index, 1)
      },
    }
  }
</script>

<style>
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

 h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.submit-button {
  width: 400px;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.todo-description {
  max-width: 70%;
  font-size: 14px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}
</style>
