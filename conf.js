var submitedOtpCode = "";
$(document).ready(function () {
  $(".otp-wrapper input")[0].focus();
  $(".otp-wrapper").on("keydown", "input", function (event) {
    if (event.keyCode == 8) {
      //backspace
      event.preventDefault();
      let value = $(this).val();
      if (value.length > 0) {
        $(this).val("");
      } else {
        focusOnPreviousInput(this);
      }
    }
  });
  $(".otp-wrapper").on("keyup", "input", function (event) {
    if (isNumberKey(event.key)) {
      // is number
      if ($(this).val().length > 0) {
        $(this).val(event.key);
        focusOnNextInput(this);
      }
    } else if (!isNonPrintableKey(event.key) && isNaN($(this).val())) {
      $(this).val("");
    }
    putCursorAtTheEnd(this);
    submitIfNewOtpCodeEntered();
  });
  $(".otp-wrapper").on("focus", "input", function (event) {
    putCursorAtTheEnd(this);
    selectAllValueInTheInputText(this);
  });
  $(".otp-wrapper").on("click", "input", function (event) {
    putCursorAtTheEnd(this);
    selectAllValueInTheInputText(this);
  });
  $(".otp-wrapper").on("paste", "input", function (event) {
    let value = event.originalEvent.clipboardData.getData("Text");
    if (value.length !== 1 || isNaN(value)) {
      $(this).val("");
    } else {
      $(this).val(value);
      event.preventDefault();
      focusOnNextInput(this);
    }
  });
  $(".otp-wrapper").on("paste", "input:nth-child(1)", function (event) {
    let value = event.originalEvent.clipboardData.getData("Text");
    if (value.length === 6) {
      $(".otp-wrapper input").each(function (index, element) {
        $(element).val(value[index]);
      });
    }
  });
});
function submitIfNewOtpCodeEntered() {
  let otpCode = getInputOtpCode();
  if (otpCode.length === 6 && submitedOtpCode != otpCode) {
    alert("SUBMIT");
    submitedOtpCode = otpCode;
  }
}
function getInputOtpCode() {
  let code = "";
  $(".otp-wrapper input").each(function () {
    code += $(this).val();
  });
  return code;
}
function putCursorAtTheEnd(input) {
  const end = input.value.length;
  input.setSelectionRange(end, end);
}
function selectAllValueInTheInputText(input) {
  $(input).select();
}
function isNumberKey(key) {
  return key >= "0" && key <= "9";
}
function isNonPrintableKey(key) {
  return key.length !== 1 || key === "\x00";
}
function focusOnPreviousInput(currentInput) {
  let currentIndex = $(currentInput).data("index");
  let previousIndex = currentIndex - 1;
  if (previousIndex >= 1) {
    previousInput = $(currentInput).siblings(
      "input[data-index=" + previousIndex + "]"
    )[0];
    previousInput.focus();
    selectAllValueInTheInputText(previousInput);
  }
}
function focusOnNextInput(currentInput) {
  let currentIndex = $(currentInput).data("index");
  let nextIndex = currentIndex + 1;
  if (nextIndex <= 6) {
    nextInput = $(currentInput).siblings(
      "input[data-index=" + nextIndex + "]"
    )[0];
    nextInput.focus();
    selectAllValueInTheInputText(nextInput);
  }
}
