function $_ (selector, node = document) {
  return node.querySelector(selector);
}

function $$_ (selector, node = document) {
  return node.querySelectorAll(selector);
}

function isInputEmpty (inputValue) {
  if (inputValue === '') {
    return true;
  } else {
    return false;
  }
}