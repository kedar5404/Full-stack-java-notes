const apiUrl = "http://localhost:3000/categories";
const form = document.getElementById("categoryForm");
const categoryNameInput = document.getElementById("categoryName");
const categoryDetailsInput = document.getElementById("categoryDetails");
const submitBtn = document.getElementById("submitBtn");
const searchInput = document.createElement("input");
let editId = null;
let allCategories = [];
let sortDirection = 1;

// Search bar setup
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search by Category Name...");
searchInput.classList.add("form-control", "mb-3");
document.querySelector(".table").parentNode.insertBefore(searchInput, document.querySelector(".table"));

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allCategories.filter(cat =>
        cat.categoryName.toLowerCase().includes(searchTerm)
    );
    renderCategories(filtered);
});

// Validation
[categoryNameInput, categoryDetailsInput].forEach(input => {
    input.addEventListener("blur", () => {
        if (input.value.trim().length < 5) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });
});

function validateForm() {
    let isValid = true;
    [categoryNameInput, categoryDetailsInput].forEach(input => {
        if (input.value.trim().length < 5) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            isValid = false;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });
    return isValid;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    const category = {
        categoryName: categoryNameInput.value.trim(),
        categoryDetails: categoryDetailsInput.value.trim()
    };

    if (editId) {
        fetch(`${apiUrl}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        }).then(() => {
            fetchAndRenderCategories();
            form.reset();
            editId = null;
            submitBtn.textContent = "Add Category";
            clearValidation();
        });
    } else {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        }).then(() => {
            fetchAndRenderCategories();
            form.reset();
            clearValidation();
        });
    }
});

function clearValidation() {
    categoryNameInput.classList.remove("is-valid", "is-invalid");
    categoryDetailsInput.classList.remove("is-valid", "is-invalid");
}

function fetchAndRenderCategories() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            allCategories = data;
            renderCategories(data);
        });
}

function renderCategories(categories) {
    const tbody = document.getElementById("categoryTableBody");
    tbody.innerHTML = "";

    categories.forEach(cat => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${cat.id}</td>
      <td>${cat.categoryName}</td>
      <td>${cat.categoryDetails}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-id="${cat.id}">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${cat.id}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            loadCategoryForEdit(id);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            deleteCategory(id);
        });
    });
}

// Sorting logic on Category Name
document.querySelector("th:nth-child(2)").style.cursor = "pointer";
document.querySelector("th:nth-child(2)").addEventListener("click", () => {
    const sorted = [...allCategories].sort((a, b) =>
        a.categoryName.localeCompare(b.categoryName) * sortDirection
    );
    sortDirection *= -1;
    renderCategories(sorted);
});

function loadCategoryForEdit(id) {
    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(data => {
            categoryNameInput.value = data.categoryName;
            categoryDetailsInput.value = data.categoryDetails;
            editId = id;
            submitBtn.textContent = "Update Category";
        });
}

function deleteCategory(id) {
    if (confirm("Are you sure you want to delete this category?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        }).then(() => fetchAndRenderCategories());
    }
}

fetchAndRenderCategories();
