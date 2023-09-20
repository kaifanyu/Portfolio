<!-- MyPDFViewer.svelte -->

<script>
    import pdfUrl from '$lib/assets/Resume.pdf';
	import Icon from '$lib/components/Icon.svelte';
    
    // Function to trigger the PDF download
    function downloadResume() {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Resume.pdf'; // Change the filename if needed
      link.click();
    }
    
  </script>
  <svelte:head>
	<title>Kai | Resume</title>
</svelte:head>
<br>
<br>
<div class="center-button">
    <button class='glowing-btn' on:click={downloadResume}>
      <span class='glowing-txt'>
        R<span class='faulty-letter'>es</span>um<span class='faulty-letter'>e</span>
        <Icon name="Download" width=30 height=25></Icon>
      </span>
    </button>
  </div>
  <br>
  <br>

  <div class="pdf-container">
    <object id="pdf" data={pdfUrl} type="application/pdf" width="100%" height="1150" aria-label="Embedded Resume PDF">
      <!-- Display an error message if the PDF cannot be embedded -->
      <p>Unable to display PDF. Please <a href={pdfUrl} target="_blank">download it here</a>.</p>
    </object>
    <br>
    <br>

    <!-- Center the "Resume" button horizontally -->
  </div>
  
  <style>
    :root {
  --glow-color: hsl(224, 60%, 62%);
}

.pdf-container {
    margin: 0;
    min-width: 200px;
    width: 100%;
    text-align: center; /* Center the content horizontally */
  }

  /* Center the button horizontally and at the top of the page */
  .center-button {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
.glowing-btn {
  position: relative;
  width: fit-content;
  display: flex;
  color: var(--glow-color);
  cursor: pointer;
  padding: 0.35em 1em;
  border: 0.15em solid var(--glow-color);
  border-radius: 0.45em;
  background: none;
  perspective: 2em;
  font-size: 2em;
  font-weight: 600;
  letter-spacing: .2em;

  -webkit-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
    0px 0px 0.5em 0px var(--glow-color);
  -moz-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
    0px 0px 0.5em 0px var(--glow-color);
  box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
    0px 0px 0.5em 0px var(--glow-color);
  animation: border-flicker 2s linear infinite;
}
.glowing-txt {
  float: left;
  -webkit-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
    0 0 0.45em var(--glow-color);
  -moz-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
    0 0 0.45em var(--glow-color);
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em var(--glow-color);
  animation: text-flicker 3s linear infinite;
}

.faulty-letter {
  opacity: 0.5;
  animation: faulty-flicker 2s linear infinite;
}

.glowing-btn::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.7;
  filter: blur(1em);
  transform: translateY(120%) rotateX(95deg) scale(1, 0.35);
  background: var(--glow-color);
  pointer-events: none;
}

.glowing-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: -1;
  background-color: var(--glow-color);
  box-shadow: 0 0 2em 0.2em var(--glow-color);
  transition: opacity 100ms linear;
}

.glowing-btn:hover {
  color: rgba(0, 0, 0, 0.8);
  text-shadow: none;
  animation: none;
}

.glowing-btn:hover .glowing-txt {
  animation: none;
}

.glowing-btn:hover .faulty-letter {
  animation: none;
  text-shadow: none;
  opacity: 1;
}

.glowing-btn:hover:before {
  filter: blur(1.5em);
  opacity: 1;
}

.glowing-btn:hover:after {
  opacity: 1;
}

@keyframes faulty-flicker {
  0% {
    opacity: 0.1;
  }
  2% {
    opacity: 0.1;
  }
  4% {
    opacity: 0.5;
  }
  19% {
    opacity: 0.5;
  }
  21% {
    opacity: 0.1;
  }
  23% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  83% {
    opacity: 0.4;
  }

  87% {
    opacity: 1;
  }
}

@keyframes text-flicker {
  0% {
    opacity: 0.1;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 0.1;
  }

  9% {
    opacity: 1;
  }

  12% {
    opacity: 0.1;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }

  70% {
    opacity: 0.7;
  }
  72% {
    opacity: 0.2;
  }

  77% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes border-flicker {
  0% {
    opacity: 0.1;
  }
  2% {
    opacity: 1;
  }
  4% {
    opacity: 0.1;
  }

  8% {
    opacity: 1;
  }
  70% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 600px) {
  .glowing-btn{
    font-size: 1em;
  }
}



  </style>
  