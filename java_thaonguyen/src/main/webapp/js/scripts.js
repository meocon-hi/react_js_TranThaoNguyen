function validateForm() {
    let isValid = true;

    // Validate tên người thuê (5-50 ký tự)
    const tenNguoiThue = document.getElementById("tenNguoiThue").value;
    const tenError = document.getElementById("tenError");
    if (tenNguoiThue.length < 5 || tenNguoiThue.length > 50) {
        tenError.textContent = "Tên người thuê phải từ 5 đến 50 ký tự.";
        isValid = false;
    } else {
        tenError.textContent = "";
    }

    // Validate số điện thoại (10 chữ số)
    const sdt = document.getElementById("sdt").value;
    const sdtError = document.getElementById("sdtError");
    const sdtRegex = /^\d{10}$/;
    if (!sdtRegex.test(sdt)) {
        sdtError.textContent = "Số điện thoại phải gồm 10 chữ số.";
        isValid = false;
    } else {
        sdtError.textContent = "";
    }

    // Validate ngày bắt đầu (phải là ngày trong tương lai và đúng định dạng dd-MM-yyyy)
    const ngayBatDau = document.getElementById("ngayBatDau").value;
    const ngayError = document.getElementById("ngayError");
    const ngayRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!ngayRegex.test(ngayBatDau)) {
        ngayError.textContent = "Ngày bắt đầu phải có định dạng dd-MM-yyyy.";
        isValid = false;
    } else {
        const parts = ngayBatDau.split("-");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Tháng trong JavaScript tính từ 0
        const year = parseInt(parts[2], 10);
        const inputDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (inputDate <= today) {
            ngayError.textContent = "Ngày bắt đầu phải là một ngày trong tương lai.";
            isValid = false;
        } else {
            ngayError.textContent = "";
        }
    }

    console.log("Validation result: " + isValid);
    return isValid;
}

function toggleSelectAll() {
    const selectAll = document.getElementById("selectAll");
    const checkboxes = document.getElementsByName("selectedIds");
    for (let checkbox of checkboxes) {
        checkbox.checked = selectAll.checked;
    }
}

function showDeleteConfirmModal() {
    const checkboxes = document.getElementsByName("selectedIds");
    let selectedIds = [];
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            selectedIds.push(checkbox.value);
        }
    }

    if (selectedIds.length === 0) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-warning alert-dismissible fade show mt-3";
        errorDiv.role = "alert";
        errorDiv.innerHTML = `
            Vui lòng chọn ít nhất một mục để xóa.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.querySelector(".container").insertBefore(errorDiv, document.querySelector(".mb-3"));
        return;
    }

    const deleteItemsList = document.getElementById("deleteItemsList");
    deleteItemsList.innerHTML = "";
    selectedIds.forEach(id => {
        const li = document.createElement("li");
        li.textContent = id;
        deleteItemsList.appendChild(li);
    });

    const deleteModal = new bootstrap.Modal(document.getElementById("deleteConfirmModal"));
    deleteModal.show();
}

function deleteSelected() {
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteConfirmModal"));
    deleteModal.hide();
    document.getElementById("deleteForm").submit();
}