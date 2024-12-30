// Select Elements
const habitInput = document.getElementById("habit-input");
const addHabitButton = document.getElementById("add-habit-button");
const habitList = document.getElementById("habit-list");
const totalPoints = document.getElementById("total-points");
const themeToggle = document.getElementById("theme-toggle");

// Initialize Variables
let points = 0;

// Load and Save Habits with localStorage
function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
  const storedPoints = localStorage.getItem("points") || 0;

  points = parseInt(storedPoints, 10);
  totalPoints.textContent = points;

  storedHabits.forEach((habitName) => createHabitElement(habitName));
}

function saveHabits() {
  const habitNames = Array.from(habitList.children).map(
    (habit) => habit.querySelector(".habit-text").textContent
  );
  localStorage.setItem("habits", JSON.stringify(habitNames));
  localStorage.setItem("points", points);
}

// Create Habit Element
function createHabitElement(habitName) {
  const habitItem = document.createElement("li");
  habitItem.className = "habit-item";

  const habitText = document.createElement("span");
  habitText.className = "habit-text";
  habitText.textContent = habitName;

  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", () => completeHabit(habitItem));

  habitItem.appendChild(habitText);
  habitItem.appendChild(completeButton);
  habitList.appendChild(habitItem);
}

// Add Habit
function addHabit() {
  const habitName = habitInput.value.trim();
  if (habitName === "") {
    alert("Please enter a habit!");
    return;
  }

  createHabitElement(habitName);
  habitInput.value = "";
  saveHabits();
}

// Complete Habit
function completeHabit(habitItem) {
  habitItem.remove();

  points += 10;
  totalPoints.textContent = points;

  saveHabits();
}

// Dark/Light Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "" : "dark";
  saveThemePreference();
});

function saveThemePreference() {
  const theme = document.body.dataset.theme || "light";
  localStorage.setItem("theme", theme);
}

function loadThemePreference() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = theme === "dark" ? "dark" : "";
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadHabits();
  loadThemePreference();
});

addHabitButton.addEventListener("click", addHabit);
