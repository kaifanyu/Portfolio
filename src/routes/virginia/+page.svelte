<script>
  import { goto } from '$app/navigation';
  import { fade, scale } from 'svelte/transition';
  import melori from "$lib/images/valentines/melori.gif";
  import explosion from "$lib/images/valentines/explosion.gif";
  import us from "$lib/images/valentines/us.png";
  import date from "$lib/images/valentines/date.jpg";
  import cat from "$lib/images/valentines/cat.gif"
  import yummy from "$lib/images/valentines/yummy.png"
  import click from "$lib/images/valentines/click.mp3"
  import { onMount } from 'svelte';

  let noButtonPos = { top: 60, left: 50 };
  let moveCount = 0;
  let showNote = false;
  let showMines = false;
  let isExploding = false;
  let noButtonExists = true;
  let showExplorer = false;
  let selectedFile = null; 
let showRecycleBin = false;
const trashFiles = [
  { name: "Bad_Vibes.exe", icon: "🚫" },
  { name: "Other_Boys.txt", icon: "📄" },
];
  const myHeartFiles = [
    { name: "my_love.jpg", url: date },
    { name: "us.png", url: us },
    { name: "yummy.jpg", url: yummy },
    { name: "cute_cat.gif", url: cat },
  ];

// Clock Logic
  let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  onMount(() => {
    const interval = setInterval(() => {
      time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);
    return () => clearInterval(interval);
  });
  // --- MINESWEEPER LOGIC ---
  let board = [];
  const size = 8;
  const mineCount = 10;
  let gameOver = false;
  let win = false;
let flagsUsed = 0;
$: remainingMines = mineCount - flagsUsed;

function downloadNote() {
  playClick();
  const blob = new Blob([secretNoteContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Secret_Note.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
function toggleFlag(r, c) {
  if (gameOver || win || board[r][c].revealed) return;
  playClick();
  board[r][c].flagged = !board[r][c].flagged;
  flagsUsed = board.flat().filter(cell => cell.flagged).length;
  board = board; // Trigger Svelte update
}
  function initMinesweeper() {
    gameOver = false;
    win = false;
    // Create empty board
    let newBoard = Array.from({ length: size }, (_, r) => 
      Array.from({ length: size }, (_, c) => ({
        r, c, mine: false, revealed: false, flagged: false, count: 0
      }))
    );

    // Place hearts (mines)
    let placed = 0;
    while (placed < mineCount) {
      let r = Math.floor(Math.random() * size);
      let c = Math.floor(Math.random() * size);
      if (!newBoard[r][c].mine) {
        newBoard[r][c].mine = true;
        placed++;
      }
    }

    // Calculate numbers
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newBoard[r][c].mine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (newBoard[r + dr]?.[c + dc]?.mine) count++;
          }
        }
        newBoard[r][c].count = count;
      }
    }
    board = newBoard;
  }

  function reveal(r, c) {
    if (gameOver || win || board[r][c].revealed || board[r][c].flagged) return;
    
    board[r][c].revealed = true;
    if (board[r][c].mine) {
      gameOver = true;
      return;
    }

    if (board[r][c].count === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (board[r + dr]?.[c + dc]) reveal(r + dr, c + dc);
        }
      }
    }
    checkWin();
    board = board; // Trigger Svelte update
  }

  function checkWin() {
    const revealedCount = board.flat().filter(cell => cell.revealed).length;
    if (revealedCount === (size * size) - mineCount) {
      win = true;
    }
  }
let maxAttempts = 7; // Set this to whatever number you want
  const secretNoteContent = `
DEAR DIARY,

I LOVE VIRGINIA SO MUCH
SHE'S SO PRETTY AND I COULD
NOT ASK FOR SOMEONE MORE
PERFECT FOR BEING MY OTHER
HALF FOR THE REST OF MY 
LIFE. I REALLY HOPE SHE WILL
BE MY VALENTINES FOR 2026.

SHE'S SO LOVELY AND ALWAYS
BRIGHTENS BY DAY... <3`.trim();

  $: statusMessage = !noButtonExists 
    ? "Error: 'No' button process terminated." 
    : moveCount === 0 
      ? "Ready" 
      : `Warning: Unauthorized 'No' attempt (${moveCount}/7)`;

  $: yesScale = 1 + (moveCount * 0.65);
// Inside your <script>
const playClick = () => {
  const audio = new Audio(click)
  audio.volume = 0.5;
  audio.play();
};
const moveButton = () => {
    // 1. If we are already exploding or the button is gone, stop everything
    if (isExploding || !noButtonExists) return;

    // 2. Check if this hover is the final one
    if (moveCount >= maxAttempts - 1) { 
      triggerExplosion(); 
      return; 
    }

    // 3. Otherwise, move the button
    const randomTop = Math.floor(Math.random() * 70) + 15;
    const randomLeft = Math.floor(Math.random() * 70) + 15;
    
    noButtonPos = { top: randomTop, left: randomLeft };
    moveCount++;
  };

  const triggerExplosion = () => {
    // Increment count one last time so the status bar shows 5/5
    moveCount = maxAttempts;
    isExploding = true;

    // We keep noButtonExists = true for a moment so the explosion 
    // has a container to anchor to before everything vanishes
    setTimeout(() => {
      noButtonExists = false;
      isExploding = false;
    }, 1600); // Adjust this to match the length of your explosion GIF
  };

  const openMines = () => {
    initMinesweeper();
    showMines = true;
  };
</script>
<link href="https://db.onlinewebfonts.com/c/9a0e333022de677c406ee6556dc2432c?family=BDRetrocentric" rel="stylesheet"> 
<div class="retro-desktop">
<button class="desktop-icon" style="top: 20px; left: 20px;" on:click={() => { playClick(); showExplorer = true; }}>
  <div class="icon-box">📁</div>
  <span>Heart</span>
</button>

<button class="desktop-icon" style="top: 100px; left: 20px;" on:click={() => { playClick(); showNote = true; }}>
  <div class="icon-box">💌</div>
  <span>Secret Note</span>
</button>

<button class="desktop-icon" style="top: 180px; left: 20px;" on:click={() => { playClick(); openMines(); }}>
  <div class="icon-box">💣</div>
  <span>HeartSweeper</span>
</button>

<button class="desktop-icon" style="top: 260px; left: 20px;" on:click={() => { playClick(); showRecycleBin = true; }}>
  <div class="icon-box">🗑️</div>
  <span>Recycle Bin</span>
</button>

  <main in:fade class="window main-window">
    <div class="title-bar">
      <div class="title-text">💖 VALENTINE.EXE</div>
      <div class="title-controls">
        <button class="ctrl-btn">_</button><button class="ctrl-btn">X</button>
      </div>
    </div>
    <div class="window-content">
      <div class="roll-in-container"><img src={melori} alt="GIF" class="rolling-gif" /></div>
      <h1 class="pixel-text">Will you be my Valentine?</h1>
      <div class="button-group">
        <button class="retro-btn yes" style="transform: scale({yesScale});" on:click={() => {goto('/valentine'); playClick()}}>Yes!</button>
        {#if noButtonExists}
          <div class="no-wrapper" style={moveCount > 0 ? `top: ${noButtonPos.top}%; left: ${noButtonPos.left}%; position: fixed; transform: translate(-50%, -50%);` : 'position: relative;'}>
            {#if isExploding}<img src={explosion} alt="puff" class="explosion-gif" />{/if}
            <button class="retro-btn no" class:hidden={isExploding} on:mouseenter={moveButton}>No</button>
          </div>
        {/if}
      </div>
    </div>
    <div class="status-bar"><div class="status-field">{statusMessage}</div></div>
  </main>
{#if showRecycleBin}
  <div class="window explorer-window" in:scale={{ duration: 200, start: 0.9 }} style="z-index: 40;">
    <div class="title-bar">
      <div class="title-text">🗑️ Recycle Bin</div>
      <button class="ctrl-btn" on:click={() => { playClick(); showRecycleBin = false; }}>X</button>
    </div>
    <div class="explorer-toolbar">
      <span>File</span><span>Edit</span><span>View</span><span>Help</span>
    </div>
    <div class="explorer-content">
      {#each trashFiles as file}
        <div class="file-item trash" on:dblclick={() => alert('This is deleted for a reason! ❤️')}>
          <div class="file-icon">{file.icon}</div>
          <span class="file-name">{file.name}</span>
        </div>
      {/each}
    </div>
    <div class="status-bar">
      <div class="status-field">{trashFiles.length} object(s) found in bin.</div>
    </div>
  </div>
{/if}

{#if showExplorer}
    <div class="window explorer-window" in:scale={{ duration: 200, start: 0.9 }}>
      <div class="title-bar">
        <div class="title-text">📁 C:\Users\Valentine\Heart</div>
        <button class="ctrl-btn" on:click={() => {showExplorer = false; playClick()}}>X</button>
      </div>
      <div class="explorer-toolbar"><span>File</span><span>Edit</span><span>View</span><span>Help</span></div>
      <div class="explorer-content">
        {#each myHeartFiles as file}
          <div class="file-item" on:click={playClick} on:dblclick={() => {playClick(); selectedFile = file}}>
            <div class="file-icon">🖼️</div>
            <span class="file-name">{file.name}</span>
          </div>
        {/each}
      </div>
      <div class="status-bar"><div class="status-field">{myHeartFiles.length} object(s)</div></div>
    </div>
  {/if}

{#if selectedFile}
    <div class="window preview-window" in:scale={{ duration: 150, start: 0.9 }}>
      <div class="title-bar preview-header">
        <div class="title-text">🖼️ {selectedFile.name}</div>
        <button class="ctrl-btn" on:click={() => {selectedFile = null; playClick()}}>X</button>
      </div>
      <div class="preview-content">
        <img src={selectedFile.url} alt="Memory" />
      </div>
    </div>
  {/if}

  {#if showMines}
    <div class="window mines-window" in:scale={{ duration: 200, start: 0.9 }}>
      <div class="title-bar">
        <div class="title-text">💣 HeartSweeper.exe</div>
        <button class="ctrl-btn" on:click={() => {showMines = false; playClick()}}>X</button>
      </div>
      <div class="mines-body">


      <div class="mines-grid">
        {#each board as row, r}
          {#each row as cell, c}
            <button 
              class="mine-cell" 
              class:revealed={cell.revealed}
              on:click={() => reveal(r, c)}
              on:contextmenu|preventDefault={() => toggleFlag(r, c)}
            >
              {#if cell.revealed}
                {cell.mine ? '❤️' : (cell.count || '')}
              {:else if cell.flagged}
                🚩
              {/if}
            </button>
          {/each}
        {/each}
      </div>

      <div class="mines-footer">
        <div class="mine-counter">Mines: {remainingMines}</div>
        {#if gameOver}<span>GAME OVER!</span>{/if}
        {#if win}<span>YOU WIN! ❤️</span>{/if}
        <button class="retro-btn sm" on:click={initMinesweeper}>Reset</button>
      </div>


      </div>
    </div>
  {/if}

  {#if showNote}
    <div class="window notepad-window" in:scale={{ duration: 200, start: 0.9 }}>
      <div class="title-bar notepad-header">
        <div class="title-text">📝 Secret Note.txt</div>
        <button class="ctrl-btn" on:click={() => {showNote = false; playClick()}}>X</button>
      </div>
      <div class="notepad-content"><pre>{secretNoteContent}</pre></div>
      <div class="notepad-footer">
  <button class="retro-btn sm" on:click={downloadNote}>Save</button>
</div>
    </div>
  {/if}

  <div class="taskbar">
    <button class="start-btn" on:click={playClick}>
      <span class="start-icon">🏁</span> Start
    </button>
    
    <div class="taskbar-divider"></div>
<div class="active-tasks">
  <button class="task-tab active" on:click={playClick}>
    💖 Valentine
  </button>

  {#if showExplorer}
    <button class="task-tab active" on:click={() => { playClick(); showExplorer = false; }}>
      📁 My_Heart
    </button>
  {/if}

  {#if showMines}
    <button class="task-tab active" on:click={() => { playClick(); showMines = false; }}>
      💣 HeartSweeper
    </button>
  {/if}

  {#if showNote}
    <button class="task-tab active" on:click={() => { playClick(); showNote = false; }}>
      📝 Secret_Note
    </button>
  {/if}

  {#if showRecycleBin}
    <button class="task-tab active" on:click={() => { playClick(); showRecycleBin = false; }}>
      🗑️ Recycle Bin
    </button>
  {/if}
</div>

    <div class="system-tray">
      <span class="tray-icon">🔊</span>
      <span class="tray-clock">{time}</span>
    </div>
  </div>
</div>

<style>
.file-item.trash {
  opacity: 0.6;
  filter: grayscale(0.5);
}

/* Optional: Make the Yes button play the sound too! */
.retro-btn.yes:click {
  /* This is handled in the script, but adding a hover effect helps */
  filter: brightness(1.1);
}
/* --- NEW TASKBAR STYLES --- */
  .taskbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: #c0c0c0;
    border-top: 2px solid #fff;
    display: flex;
    align-items: center;
    padding: 2px;
    z-index: 999;
    box-sizing: border-box;
  }

  .start-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    padding: 2px 6px;
    height: 22px;
    background: #c0c0c0;
    border: 2px solid;
    border-color: #fff #808080 #808080 #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
  }

  .start-btn:active {
    border-color: #808080 #fff #fff #808080;
  }

  .active-tasks {
    display: flex;
    gap: 4px;
    flex-grow: 1;
    margin-left: 8px;
    height: 100%;
    align-items: center;
  }

  .task-tab {
    background: #c0c0c0;
    border: 2px solid;
    border-color: #fff #808080 #808080 #fff;
    padding: 2px 8px;
    font-size: 11px;
    height: 22px;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  .task-tab.active {
    background: #e0e0e0;
    border-color: #808080 #fff #fff #808080;
    font-weight: bold;
  }

  .system-tray {
    border: 2px inset #fff;
    background: #c0c0c0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    height: 22px;
    font-size: 11px;
    color: black;
  }

  .taskbar-divider {
    width: 2px;
    height: 20px;
    background: #808080;
    margin-left: 5px;
    border-right: 1px solid #fff;
  }

  /* Adjust desktop to account for taskbar height */
  .retro-desktop {
    padding-bottom: 30px;
    box-sizing: border-box;
  }
:global(body) { margin: 0; padding: 0; overflow: hidden; font-family: 'Tahoma', sans-serif; background-color: #008080; }
  .retro-desktop { height: 100vh; display: flex; justify-content: center; align-items: center; position: relative; }
  .desktop-icon { position: absolute; display: flex; flex-direction: column; align-items: center; color: white; font-size: 11px; cursor: pointer; background: none; border: none; width: 80px; }
  .icon-box { font-size: 32px; margin-bottom: 5px; }
/* --- EXPLORER STYLES --- */
  .explorer-window {
    position: absolute;
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    z-index: 15;
  }

  .explorer-toolbar {
    display: flex;
    gap: 10px;
    padding: 2px 10px;
    border-bottom: 1px solid #808080;
    font-size: 11px;
    background: #c0c0c0;
  }

  .explorer-content {
    background: #fff;
    flex-grow: 1;
    margin: 2px;
    border: 2px inset #808080;
    display: grid;
	color: black;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    padding: 10px;
    overflow-y: auto;
    align-content: flex-start;
  }

  .file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    text-align: center;
  }

  .file-item:hover {
    background-color: #000080;
    color: white;
  }

  .file-icon { font-size: 24px; }
  .file-name { font-size: 10px; margin-top: 4px; word-break: break-all; }

  /* --- PREVIEW WINDOW --- */
  .preview-window {
    position: absolute;
    z-index: 100;
    max-width: 350px;
    box-shadow: 10px 10px 30px rgba(0,0,0,0.5);
  }
  .preview-content {
    padding: 5px;
    background: #000;
    display: flex;
    justify-content: center;
  }
  .preview-content img {
    max-width: 100%;
    height: auto;
    border: 1px solid #808080;
  }
  .preview-header { background: #808080 !important; }
  
  /* Windows */
  .window { background: #c0c0c0; border: 2px solid; border-color: #dfdfdf #0a0a0a #0a0a0a #dfdfdf; box-shadow: 4px 4px 0px rgba(0,0,0,0.3); }
  .main-window { width: 450px; z-index: 5; }
  .notepad-window { position: absolute; width: 320px; z-index: 20; }
  .mines-window { position: absolute; z-index: 30; padding: 2px; }

  /* Minesweeper CSS */
  .mines-body { padding: 10px; background: #c0c0c0; }
  .mines-grid { 
    display: grid; 
    grid-template-columns: repeat(8, 25px); 
    grid-template-rows: repeat(8, 25px); 
    gap: 1px;
    border: 2px inset #fff;
    background: #808080;
  }
  .mine-counter {
  background: #000;
  color: #ff0000;
  font-family: 'Courier New', monospace;
  padding: 2px 5px;
  border: 1px inset #fff;
  font-weight: bold;
}
  /* Add this to the end of your <style> */
.retro-desktop::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
              linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
  z-index: 1000;
  background-size: 100% 3px, 3px 100%;
  pointer-events: none; /* Crucial so she can still click buttons */
}
  .mine-cell {
    width: 25px; height: 25px;
    background: #c0c0c0;
    border: 2px solid;
    border-color: #fff #808080 #808080 #fff;
    font-size: 12px; font-weight: bold;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; padding: 0;
  }
  .mine-cell.revealed { 
    border: 1px solid #808080; 
    background: #bdbdbd; 
  }
  .mines-footer { margin-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; }

  .title-bar { padding: 3px 6px; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(90deg, #000080, #1084d0); color: white; font-weight: bold; font-size: 12px; }
  .window-content { padding: 20px; text-align: center; }
  .pixel-text { font-size: 2rem; margin: 15px 0; font-family: "BDRetrocentric"; color:white }
  .rolling-gif { width: 140px; image-rendering: pixelated; border: 2px inset #ffffff; background: #fff; animation: rollIn 1.5s steps(15) forwards; }
  @keyframes rollIn { 0% { transform: translateX(-120vw) rotate(-720deg); } 100% { transform: translateX(0) rotate(0deg); } }
  
  .button-group { display: flex; gap: 20px; justify-content: center; margin-top: 20px; min-height: 100px; align-items: center; }
  .retro-btn { padding: 6px 20px; font-weight: bold; background: #c0c0c0; border: 2px solid; border-color: #ffffff #808080 #808080 #ffffff; cursor: pointer; }
  .retro-btn.sm { padding: 2px 8px; font-size: 10px; }
  .retro-btn:active { border-color: #808080 #ffffff #ffffff #808080; }

  .status-bar { display: flex; padding: 2px; border-top: 1px solid #808080; color:black }
  .status-field { border: 1px inset #fff; padding: 2px 5px; font-size: 11px; flex-grow: 1; text-align: left; }
  .ctrl-btn { width: 16px; height: 14px; font-size: 9px; background: #c0c0c0; border: 1px solid; border-color: #ffffff #808080 #808080 #ffffff; cursor: pointer; }
  .notepad-content { background: #fffef0; margin: 2px; border: 2px inset #808080; padding: 10px; color: black; }
  pre { white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 12px; margin: 0; }
  .hidden { visibility: hidden; }
  .no-wrapper { z-index: 100; }
  .explosion-gif { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; pointer-events: none; }
</style>