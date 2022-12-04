<script lang="ts">
  // lifecycle
  import { onMount } from "svelte";

  // utils
  import classNames from "classnames";

  // lib
  import Button from "./lib/Button";

  let num = "";

  const addNumber = (char: string) => {
    return () => {
      num += char;
    }
  }

  const addDecimalPoint = () => {
    if (num.search(/\./) !== -1) return;
    num += "."
  }

  const clear = () => {
    num = ""
  }

  const backspace = () => {
    num = num.slice(0, num.length - 1)
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
      callback: () => {},
    }),
    new Button({
      type: "operation",
      symbol: "x",
      callback: () => {},
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
      callback: () => {},
    }),
    ...createNumberRow(["4", "5", "6"]),
    new Button({
      type: "operation",
      symbol: "+",
      callback: () => {},
    }),
    ...createNumberRow(["1", "2", "3"]),
    new Button({
      type: "operation",
      symbol: "=",
      callback: () => {},
      elongated: true
    }),
    new Button({
      type: "operation",
      symbol: "%",
      callback: () => {},
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
      <button class={classNames("button", {elongated: button.elongated})} on:click={button.callback} id={"key-" + button.symbol}>{button.symbol}</button>
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