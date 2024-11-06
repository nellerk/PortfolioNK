<script lang="ts">
   import { onMount } from "svelte";
   import { writable } from "svelte/store";
 
   const ol = writable<Record<string, string>>({});
   const currentCountry = writable("");
   const options = writable([]);
   const feedback = writable("");
 
   function getRandomOptions(correct: string, allCountries: string[]): string[] {
     const shuffled = [...allCountries].sort(() => 0.5 - Math.random());
     const selected = shuffled.filter((c) => c !== correct).slice(0, 3);
     return [...selected, correct].sort(() => 0.5 - Math.random());
   }
 
   onMount(async () => {
     const parser = new DOMParser();
     const text = await fetch("worldmap.svg").then((res) => res.text());
     const xmlDoc = parser.parseFromString(text, "text/xml");
     const paths = xmlDoc.getElementsByTagName("svg")[0].children;
 
     const countries = {};
     for (let i = 0; i < paths.length; i++) {
       const title = paths[i].getAttribute("title");
       if (title) {
         countries[title] = paths[i].getAttribute("d");
       }
     }
 
     ol.set(countries);
     const countryNames = Object.keys(countries);
     const randomCountry = countryNames[Math.floor(Math.random() * countryNames.length)];
     currentCountry.set(randomCountry);
     options.set(getRandomOptions(randomCountry, countryNames));
   });
 
   function checkAnswer(selected: string, correct: string) {
     if (selected === correct) {
       feedback.set("Correct!");
       setTimeout(() => {
         feedback.set("");
         const countryNames = Object.keys($ol);
         const nextCountry = countryNames[Math.floor(Math.random() * countryNames.length)];
         currentCountry.set(nextCountry);
         options.set(getRandomOptions(nextCountry, countryNames));
       }, 1500);
     } else {
       feedback.set("Try Again!");
     }
   }
 </script>
 
 <main>
   <svg viewBox="0 0 1009.6727 665.96301">
     {#each Object.entries($ol) as [t, d]}
     <path
     d={d}
     fill={$currentCountry === t ? "rgb(200,255,245)" : "rgb(60,60,60)"}
     stroke-width={$currentCountry === t ? "0.5" : "0.02"}
     stroke={$currentCountry === t ? "rgb(255,200,230)" : "black"}
   >
     <title>{t}</title>
   </path>   
     {/each}
   </svg>
   <div class="guess-box">
     <h2>Which country is highlighted?</h2>
     <div class="options">
       {#each $options as option}
         <button on:click={() => checkAnswer(option, $currentCountry)}>
           {option}
         </button>
       {/each}
     </div>
     {#if $feedback}
       <p class="feedback">{$feedback}</p>
     {/if}
   </div>
 </main>
 
 <style>
   svg {
      width: 100%;
      height: auto;
      position: absolute;
      left: 0;
      top: 50px;
      overflow: hidden; 
   }
   /*body {
      margin: 0;
      padding: 0;
      overflow-x: hidden; 
   }*/
   .guess-box {
     position: fixed;
     bottom: 20px;
     left: 50%;
     transform: translateX(-50%);
     background: rgba(0, 0, 0, 0.7);
     color: white;
     padding: 20px;
     border-radius: 8px;
     text-align: center;
   }
   .options button {
     margin: 5px;
     padding: 10px 20px;
     font-size: 16px;
     background: #444;
     color: white;
     border: 1px solid #888;
     border-radius: 5px;
     cursor: pointer;
   }
   .options button:hover {
     background: #666;
   }
   .feedback {
     margin-top: 10px;
     font-size: 18px;
     font-weight: bold;
   }
 </style>
 