<script lang="ts">
  // lifecycle
  import { onMount } from "svelte";

  // utils
  import classNames from "classnames";

  // lib
  import Button from "./lib/Button";

  type ArthemticOperation = "+" | "-" | "*" | "/"

  let num = "";
  let prev_num = "";
  let reset_flag = false
  let latest_operation = "+"

  const stringToNumber = (n: string) => {
    return Number(eval(n.replace("%", "/100")))
  }

  const performOperation = (operation?: ArthemticOperation) => {
    if (operation) latest_operation = operation;
    if (reset_flag) {
      num = "";
      prev_num = "";
      reset_flag = false;
      return
    }
    if (prev_num) {
      num = window.eval(`${stringToNumber(prev_num)} ${latest_operation} ${stringToNumber(num)}`).toString()
      reset_flag = true
      return
    }
    prev_num = num.slice(0)
    num = ""
  }

  const addChar = (char: string) => {
    if (reset_flag) {
      num = char;
      reset_flag = false;
      prev_num = "";
      return;
    }
    if (num.search(/%/) !== -1) return; 
    num += char
  }

  const addNumber = (char: string) => {
    return () => {
      addChar(char);
    }
  }

  const addDecimalPoint = () => {
    if (num.search(/\./) !== -1) return;
    addChar(".")
  }

  const clear = () => {
    num = ""
  }

  const backspace = () => {
    num = num.slice(0, num.length - 1)
  }

  const addPercent = () => {
    if (num.search(/%/) !== -1) return;
    addChar("%")
  }

  const createNumberRow = (row: string[]): Button[] => {
    return row.map((n) => new Button({
      type: "number",
      symbol: n,
      callback: addNumber(n)
    }))
  }

  const buttons = [
    new Button({
      type: "operation",
      symbol: "c",
      callback: clear,
    }),
    new Button({
      type: "operation",
      symbol: "÷",
      callback: () => performOperation("/"),
    }),
    new Button({
      type: "operation",
      symbol: "x",
      callback: () => performOperation("*"),
    }),
    new Button({
      type: "operation",
      symbol: "⌫",
      callback: backspace,
    }),
    ...createNumberRow(["7", "8", "9"]),
    new Button({
      type: "operation",
      symbol: "-",
      callback: () => performOperation("-"),
    }),
    ...createNumberRow(["4", "5", "6"]),
    new Button({
      type: "operation",
      symbol: "+",
      callback: () => performOperation("+")
    }),
    ...createNumberRow(["1", "2", "3"]),
    new Button({
      type: "operation",
      symbol: "=",
      callback: () => performOperation(),
      elongated: true
    }),
    new Button({
      type: "operation",
      symbol: "%",
      callback: addPercent,
    }),
    new Button({
      type: "number",
      symbol: "0",
      callback: addNumber("0"),
    }),
    new Button({
      type: "number",
      symbol: ".",
      callback: addDecimalPoint,
    }),
  ];

  onMount(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      Array.from(Array(10)).map((_, i) => i.toString()).forEach(i => {
        if (event.key === i) addNumber(i)();
      });

      if (event.key === ".") addDecimalPoint();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Backspace") backspace();
      if (event.key.toLowerCase() === "c") clear();
    }

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });
</script>

<main class="main">
  <div class="screen">
    <span>{num}</span>
  </div>

  <div class="body"> 
    {#each buttons as button}
      <button class={classNames("button", {elongated: button.elongated})} on:click={button.callback}>{button.symbol}</button>
    {/each}
  </div>
</main>

<style>
  .main {
    height: 100vh;
    /* aspect-ratio: 9 / 16; */
    max-width: 640px;
    width: 100vw;
    background-color: #001E34;

    display: flex;
    flex-direction: column;

    font-family: sans-serif;
    font-size: 2.25rem;
  }

  .screen {
    flex: 40% 0 0;
    position: relative;
    overflow-x: hidden;
  }

  .screen span {
    position: absolute;
    right: 1rem;
    bottom: 0.5rem;
    color: #ffffff;
  }

  .body {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;
    padding: 10px;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #002B4A;
    color: #ffffff;
    cursor: pointer;
    user-select: none;
    border-radius: 0.25rem;
    border: none;
    font-size: inherit;
  }

  .button:hover {
    filter: brightness(1.2);
  }

  .button:active {
    filter: brightness(0.9);
  }

  .button.elongated {
    grid-row: span 2;
    background-color: #FFA800;
  }
</style>