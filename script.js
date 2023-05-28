"use strict";
// khai báo biến
const submitBtn = document.getElementById("submit-btn");
const healthBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculateBMI-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

// tạo mảng chứa toàn bộ dữ liệu thú cưng
let petArr = [];

// tạo biến lưu trữ xem hiện tại đang hiển thị tất cả thú cưng hay là chỉ thú cưng khỏe mạnh.
let healthyCheck = false;

// tạo biến lưu danh sách thú cưng khỏe mạnh
let healthyPetArr = [];

// tạo sự kiện nút Submit
submitBtn.addEventListener("click", function () {
  // gán dữ liệu vào Object
  let data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    bmi: "?",
  };

  // nếu validate đúng thì gán vào petArr
  if (
    // gọi hàm Validate
    validatePet() == true
  ) {
    petArr.push(data);
    console.log({ petArr });

    // gọi hàm renderTableData
    renderTableData(petArr);

    // gọi hàm clear
    clear();
  }
});

// hàm validate dữ liệu
function validatePet() {
  // 1. Không có trường nào bị nhập thiếu dữ liệu
  if (idInput.value === "") {
    alert("Please input for ID");
    return;
  }

  // gọi hàm check trùng id, nếu id trùng thì hàm sẽ trả về true, hàm sẽ dừng lại
  if (checkId(idInput.value)) {
    return;
  }

  if (nameInput.value === "") {
    alert("Please input for Name");
    return;
  }

  if (ageInput.value === "") {
    alert("Please input for Age");
    return;
  } else {
    if (Number(ageInput.value) >= 1 && Number(ageInput.value) <= 15) {
      console.log(ageInput.value);
    } else {
      alert("Age must be between 1 and 15!");
      return;
    }
  }

  if (typeInput.value === "Select Type") {
    alert("Please select Type");
    return;
  }

  if (weightInput.value === "") {
    alert("Please input for Weight");
    return;
  } else {
    if (Number(weightInput.value) >= 1 && Number(weightInput.value) <= 15) {
      console.log(weightInput.value);
    } else {
      alert("Weight must be between 1 and 15!");
      return;
    }
  }

  if (lengthInput.value === "") {
    alert("Please input for Length");
    return;
  } else {
    if (Number(lengthInput.value) >= 1 && Number(lengthInput.value) <= 100) {
      console.log(lengthInput.value);
    } else {
      alert("Length must be between 1 and 100!");
      return;
    }
  }

  if (colorInput.value === "") {
    alert("Please input for Color");
    return;
  }

  if (breedInput.value === "Select Breed") {
    alert("Please select Breed");
    return;
  }

  return true;
}

// hàm check trùng ID
function checkId(praramId) {
  console.log(praramId);
  for (let i = 0; i < petArr.length; i++) {
    console.log(petArr[i].id);
    if (petArr[i].id == praramId) {
      alert("ID must unique!");
      return true;
    }
  }
}

// hàm renderTableData hiển thị cho người dùng
function renderTableData(petArr) {
  let tableBody = document.getElementById("tbody");
  tableBody.innerHTML = "";
  console.log(petArr);

  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `<th>${petArr[i].id}</th>
  <td>${petArr[i].name}</td>
  <td>${petArr[i].age}</td>
  <td>${petArr[i].type}</td>
  <td>${petArr[i].weight} kg</td>
  <td>${petArr[i].length} cm</td>
  <td>${petArr[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
  <td>${checkBox(petArr[i].vaccinated)}</td>
  <td>${checkBox(petArr[i].dewormed)}</td>
  <td>${checkBox(petArr[i].sterilized)}</td>
  <td>${petArr[i].bmi}</td>
  <td>${petArr[i].date}</td>
  <td><button type="button" class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
  </td>`;
    tableBody.appendChild(row);
  }
}

// hàm kiểm tra checkbox
function checkBox(valueCheckbox) {
  if (valueCheckbox) {
    return '<i class="bi bi-check-circle-fill" style=color:"green"></i>';
  } else {
    return '<i class="bi bi-x-circle-fill" style=color:"red"></i>';
  }
}

// hàm clear xóa dữ liệu người dùng vừa nhập trên form
function clear() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = "";
  dewormedInput.checked = "";
  sterilizedInput.checked = "";
}

// hàm delete
function deletePet(parramId) {
  let choinConfirm = confirm("Are you sure?");
  console.log(parramId);

  if (choinConfirm == true) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id == parramId) {
        console.log(petArr[i].id);
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
}

// tạo sự kiện nút show Healthy Pet
healthBtn.addEventListener("click", function () {
  if (healthyCheck) {
    healthBtn.innerHTML = "Show Healthy Pet";
    renderTableData(petArr);
    healthyCheck = false;
  } else {
    healthBtn.innerHTML = "Show All Pet";
    healthyPetArr = petArr.filter(function (e) {
      return e.vaccinated && e.dewormed && e.sterilized;
    });
    console.log(healthyPetArr);
    renderTableData(healthyPetArr);
    healthyCheck = true;
  }
});

// tạo sự kiện nút calculate BMI
calculateBmiBtn.addEventListener("click", function () {
  console.log("bmi");
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      let bmiDog =
        (petArr[i].weight * 703) / (petArr[i].length * petArr[i].length);
      petArr[i].bmi = Math.round(bmiDog * 100) / 100;
    } else {
      let bmiCat =
        (petArr[i].weight * 863) / (petArr[i].length * petArr[i].length);
      petArr[i].bmi = Math.round(bmiCat * 100) / 100;
    }
    renderTableData(petArr);
  }
});
