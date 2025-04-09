import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    //creating an object literal (empty object) to pass popupSelector (above) to the parent class
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      //add a key/value pair to the values object for each input
      //key is input.name, value is input.value
      //need to use bracket notation, not dot notation
      //because input.name is a variable, not a string
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      //pass result of getInputValues to handleFormSubmit
      this._handleFormSubmit(inputValues);
    });
  }
}

export default PopupWithForm;
