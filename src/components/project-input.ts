import Cmp from "./base-component";
import * as validation from "../util/validation";
import { autobind as Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}
  private gatherUserInput(): [string, string, number] | void {
    const enterdTitle = this.titleInputElement.value;
    const enterdDescription = this.descriptionInputElement.value;
    const enterdManday = this.mandayInputElement.value;
    const titleValidatable: validation.Validatable = {
      value: enterdTitle,
      required: true,
    };
    const descriptionValidatable: validation.Validatable = {
      value: enterdDescription,
      required: true,
      minlength: 5,
    };
    const mandayValidatable: validation.Validatable = {
      value: +enterdManday,
      required: true,
      max: 100,
      min: 1,
    };

    if (
      !validation.validate(titleValidatable) ||
      !validation.validate(descriptionValidatable) ||
      !validation.validate(mandayValidatable)
    ) {
      alert("入力値が正しくありません");
      return;
    } else {
      return [enterdTitle, enterdDescription, +enterdManday];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      console.log(title, desc, manday);
      this.clearInputs();
    }
  }
}
