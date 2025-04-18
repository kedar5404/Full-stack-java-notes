
const apiUrl = "http://localhost:3000";
let employees = [];
let departments = [];
let sortOrder = {};

document.addEventListener("DOMContentLoaded", () => {
  loadDepartments();
  loadEmployees();
  document.getElementById("empForm").addEventListener("submit", saveEmployee);
  document.getElementById("globalSearch").addEventListener("input", searchEmployees);
  addValidationListeners();
});

function addValidationListeners() {
  ["name", "deptId", "desig", "salary", "doj"].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener("blur", () => validateField(field));
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  if (field.id === "name" || field.id === "desig") {
    isValid = value.length >= 3;
  } else if (field.id === "deptId") {
    isValid = value !== "";
  } else if (field.id === "salary") {
    isValid = parseFloat(value) > 0;
  } else if (field.id === "doj") {
    isValid = value !== "";
  }

  if (isValid) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
  }

  return isValid;
}

function loadDepartments() {
  fetch(`${apiUrl}/department`)
    .then(res => res.json())
    .then(data => {
      departments = data;
      const deptSelect = document.getElementById("deptId");
      data.forEach(dept => {
        deptSelect.innerHTML += `<option value="${dept.deptId}">${dept.deptName}</option>`;
      });
    });
}

function loadEmployees() {
  fetch(`${apiUrl}/employees`)
    .then(res => res.json())
    .then(data => {
      employees = data;
      renderTable(employees);
    });
}

function renderTable(data) {
  const tbody = document.getElementById("empTableBody");
  tbody.innerHTML = "";
  data.forEach(emp => {
    const deptName = departments.find(d => d.deptId == emp.deptId)?.deptName || "N/A";
    tbody.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${deptName}</td>
        <td>${emp.desig}</td>
        <td>${emp.salary}</td>
        <td>${emp.doj}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editEmployee(${emp.empId})"><i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.empId})"> <i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
  });
}

function saveEmployee(e) {
  e.preventDefault();
  const empId = document.getElementById("empId").value;
  const name = document.getElementById("name");
  const deptId = document.getElementById("deptId");
  const desig = document.getElementById("desig");
  const salary = document.getElementById("salary");
  const doj = document.getElementById("doj");

  const valid = [name, deptId, desig, salary, doj].every(validateField);
  if (!valid) return;

  const deptName = departments.find(d => d.deptId == deptId.value)?.deptName || "";
  const employee = {
    name: name.value.trim(),
    dept: deptName,
    desig: desig.value.trim(),
    salary: Number(salary.value),
    doj: doj.value,
    deptId: Number(deptId.value)
  };

  if (empId) {
    fetch(`${apiUrl}/employees/${empId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee)
    }).then(loadEmployees);
  } else {
    fetch(`${apiUrl}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee)
    }).then(loadEmployees);
  }

  document.getElementById("empForm").reset();
  document.getElementById("empId").value = "";
  document.querySelectorAll(".form-control, .form-select").forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
  });
}

function editEmployee(id) {
  const emp = employees.find(e => e.empId == id);
  if (!emp) return;
  document.getElementById("empId").value = emp.empId;
  document.getElementById("name").value = emp.name;
  document.getElementById("deptId").value = emp.deptId;
  document.getElementById("desig").value = emp.desig;
  document.getElementById("salary").value = emp.salary;
  document.getElementById("doj").value = emp.doj;
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`${apiUrl}/employees/${id}`, { method: "DELETE" }).then(loadEmployees);
  }
}

function sortTable(column) {
  const order = sortOrder[column] === "asc" ? "desc" : "asc";
  sortOrder[column] = order;

  const sorted = [...employees].sort((a, b) => {
    let aVal = column === "deptName"
      ? departments.find(d => d.deptId == a.deptId)?.deptName || ""
      : a[column];
    let bVal = column === "deptName"
      ? departments.find(d => d.deptId == b.deptId)?.deptName || ""
      : b[column];

    if (typeof aVal === "string") {
      return order === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }
  });

  renderTable(sorted);
}

function searchEmployees(e) {
  const value = e.target.value.toLowerCase();
  const filtered = employees.filter(emp =>
    Object.values(emp).some(val => String(val).toLowerCase().includes(value)) ||
    departments.find(d => d.deptId == emp.deptId)?.deptName.toLowerCase().includes(value)
  );
  renderTable(filtered);
}
