<script>
    import App from '$lib/components/App.svelte'
  </script>
  
  <div>
    <App />
  </div>
  
  <style>
    :global(body) {
      margin: 0;
    }
  
    div {
      width: 100vw;
      height: 100vh;
      /* background: rgb(35, 49, 78); */
      background: linear-gradient(180deg, rgb(164, 167, 174) 0%, rgb(50, 53, 60) 100%);
    }
  </style>