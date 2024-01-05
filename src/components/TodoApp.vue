<template>
  <div id="app">
    <h2
      className=" font-semibold flex justify-center items-center text-7xl font-mono m-9"
    >
      Todo App
    </h2>

    <div className=" flex flex-row m-7 justify-center">
      <input
        type="text"
        id="newNotes"
        className=" font-semibold flex justify-center border-2 border-yellow-950 hover:border-2 hover:border-yellow-500 text-2xl text-center m-3 h-[6vh] rounded-xl"
        placeholder="Enter Item"
      />
      <button @click="addNewNote">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="29"
          width="29"
          viewBox="0 0 448 512"
        >
          <path
            fill="#479a23"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </button>
    </div>
    <div
      className="flex flex-col justify-center items-center  bg-yellow-700 w-[100vh]  rounded-xl ml-[60vh] shadow-2xl"
    >
      <p
        v-for="note in notes"
        :key="note.id"
        className="h-[14vh] w-[50vh] mt-10"
      >
        <b
          className="font-semibold  justify-center items-center text-3xl font-mono border-2 border-slate-950 p-3  "
          >{{ note.description }}</b
        >

        <button @click="deleteNote(note.id)" className="ml-4 items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path
              fill="#af2835"
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TodoApp",
  data() {
    return {
      newNote: "",
      notes: [],
    };
  },
  methods: {
    async refreshData() {
      const response = await axios.get("http://localhost:3001/getUsers");
      this.notes = response.data;
    },
    async addNewNote() {
      try {
        const formData = { description: this.newNote };
        await axios.post("http://localhost:3001/addUser", formData);
        this.refreshData(); // Refresh data after adding a new note
        this.newNote = ""; // Clear the input field after adding a new note
      } catch (error) {
        console.error("Error adding new note:", error);
      }
    },
    async deleteNote(id) {
      await axios.post(`http://localhost:3001/deleteUser/${id}`);
      this.refreshData();
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>
