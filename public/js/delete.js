function validateForm() {
    var newPassword = document.getElementsByName("newPassword")[0].value;
    var name = document.getElementsByName("name")[0].value;
    var phonenum = document.getElementsByName("phonenum")[0].value;

    // Check if newPassword, name, and phonenum are all empty
    if (newPassword.trim() === "" && name.trim() === "" && phonenum.trim() === "") {
        // Use confirm to show a dialog with "OK" and "Cancel" buttons
        var confirmed = confirm("Are you sure you want to continue? Leaving another fields empty may result in deleting the entire account.");

        // If the user clicks "Cancel," prevent form submission
        if (!confirmed) {
            return false;
        }
    }
}